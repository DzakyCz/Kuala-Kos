import { z } from "zod";
import { facilityGroups } from "@/lib/kos-search";

export const KOS_TYPES = ["Kos Putra", "Kos Putri", "Kos Campur"] as const;
export const BATHROOM_TYPES = ["Dalam", "Luar/Bersama"] as const;
export const PROPERTY_STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;
export const INQUIRY_STATUSES = ["NEW", "READ", "ARCHIVED"] as const;
export const PERIODS = ["monthly", "sixMonths", "yearly"] as const;

// ---------- Auth ----------
const email = z.string().trim().toLowerCase().email().max(254);
// bcrypt hanya memakai 72 byte pertama, jadi dibatasi 72 karakter.
const password = z.string().min(8, "Kata sandi minimal 8 karakter.").max(72);

export const registerSchema = z.object({
    name: z.string().trim().min(2).max(80),
    email,
    password,
    phone: z.string().trim().regex(/^[0-9+\-\s]{8,20}$/, "Nomor telepon tidak valid.").optional(),
    // Admin tidak boleh dibuat lewat pendaftaran publik.
    role: z.enum(["SEEKER", "OWNER"]).default("SEEKER"),
});
export const loginSchema = z.object({ email, password: z.string().min(1).max(72) });

// ---------- Properti ----------
// Batas koordinat sama dengan validasi di src/app/api/routes/route.ts (kawasan Banda Aceh & Aceh Besar).
const latitude = z.number().min(5.2).max(5.9);
const longitude = z.number().min(94.9).max(95.8);
// Hanya path lokal (hasil unggahan /api/uploads/... atau /images/...). Host luar akan ditolak next/image.
const imageUrl = z.string().max(500).regex(/^\/(?!\/)/, "URL gambar harus berupa path lokal, mis. /api/uploads/xxx.jpg");

const allowedFacilities: Record<string, Set<string>> = Object.fromEntries(
    facilityGroups.map((group) => [group.id, new Set<string>(group.items)]),
);
const facilityList = (scope: string) =>
    z.array(z.string().trim()).max(30)
        .refine((names) => names.every((name) => allowedFacilities[scope].has(name)), "Ada fasilitas yang tidak dikenal.")
        .transform((names) => [...new Set(names)]);

const propertyBase = z.object({
    title: z.string().trim().min(3).max(120),
    kosType: z.enum(KOS_TYPES),
    address: z.string().trim().min(5).max(300),
    city: z.string().trim().min(2).max(80),
    latitude,
    longitude,
    description: z.string().trim().max(5000).nullish(),
    priceMonthly: z.number().int().positive().max(100_000_000),
    priceSixMonths: z.number().int().positive().max(1_000_000_000).nullish(),
    priceYearly: z.number().int().positive().max(1_000_000_000).nullish(),
    areaM2: z.number().int().positive().max(1000).nullish(),
    roomWidth: z.number().positive().max(100).nullish(),
    roomLength: z.number().positive().max(100).nullish(),
    bathroomType: z.enum(BATHROOM_TYPES),
    electricityIncluded: z.boolean(),
    availableRooms: z.number().int().min(0).max(1000),
    status: z.enum(PROPERTY_STATUSES),
    images: z.array(z.object({ url: imageUrl, alt: z.string().trim().max(200).nullish() })).max(12),
    facilities: z.object({
        room: facilityList("room").default([]),
        shared: facilityList("shared").default([]),
        rule: facilityList("rule").default([]),
    }),
    // Hanya admin yang boleh menetapkan pemilik lain.
    ownerId: z.number().int().positive(),
});

export const createPropertySchema = propertyBase.partial({
    description: true, priceSixMonths: true, priceYearly: true, areaM2: true, roomWidth: true, roomLength: true,
    electricityIncluded: true, availableRooms: true, status: true, images: true, facilities: true, ownerId: true, bathroomType: true,
});
export const updatePropertySchema = propertyBase.partial().refine((value) => Object.keys(value).length > 0, "Tidak ada data yang diubah.");
export type PropertyInput = z.infer<typeof createPropertySchema>;

// ---------- Query daftar kos ----------
// Nama parameter sengaja sama dengan yang ditulis frontend (lihat writeKosFilters di kos-search.ts).
export const propertyQuerySchema = z.object({
    keyword: z.string().trim().max(200).optional(),
    city: z.string().trim().max(80).optional(),
    kosType: z.enum(KOS_TYPES).optional(),
    bathroomType: z.enum(BATHROOM_TYPES).optional(),
    electricity: z.enum(["Termasuk Sewa", "Bayar Terpisah"]).optional(),
    period: z.enum(PERIODS).default("monthly"),
    budget: z.string().max(40).optional(), // mis. "Maks. Rp750.000" / "Di atas Rp1.500.000"
    minPrice: z.coerce.number().int().min(0).max(1_000_000_000).optional(),
    maxPrice: z.coerce.number().int().min(0).max(1_000_000_000).optional(),
    minArea: z.coerce.number().int().min(0).max(1000).optional(),
    availableOnly: z.enum(["1", "true"]).optional(),
    feature: z.array(z.string().regex(/^(room|shared|rule):.{1,60}$/)).max(20).default([]),
    scope: z.enum(["public", "mine", "all"]).default("public"),
    sort: z.enum(["newest", "priceAsc", "priceDesc"]).default("newest"),
    page: z.coerce.number().int().min(1).max(10_000).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(12),
});
export type PropertyQuery = z.infer<typeof propertyQuerySchema>;

export function parsePropertyQuery(params: URLSearchParams): PropertyQuery {
    const raw: Record<string, unknown> = {};
    for (const key of new Set(params.keys())) {
        if (key === "feature") continue;
        const value = params.get(key) ?? "";
        // Nilai kosong dan pilihan default dropdown frontend ("Semua Lokasi", "Semua Harga", ...) dianggap tidak ada.
        if (value === "" || value.startsWith("Semua ")) continue;
        raw[key] = value;
    }
    raw.feature = params.getAll("feature");
    return propertyQuerySchema.parse(raw);
}

// ---------- Pesan / inquiry ----------
export const inquirySchema = z.object({
    name: z.string().trim().min(2).max(80),
    email,
    phone: z.string().trim().regex(/^[0-9+\-\s]{8,20}$/, "Nomor telepon tidak valid.").optional(),
    message: z.string().trim().min(10, "Pesan minimal 10 karakter.").max(2000),
    propertyId: z.number().int().positive().optional(),
    website: z.string().max(200).optional(), // honeypot: harus kosong, diisi bot
});
export const inquiryStatusSchema = z.object({ status: z.enum(INQUIRY_STATUSES) });
