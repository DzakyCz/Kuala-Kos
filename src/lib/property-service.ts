import { Prisma } from "@prisma/client";
import type { Property } from "@/types/property";
import type { CurrentUser } from "@/lib/auth";
import { HttpError } from "@/lib/api";
import type { PropertyInput, PropertyQuery } from "@/lib/validators";

// Data yang selalu ikut diambil bersama sebuah kos.
export const propertyInclude = {
    images: { orderBy: { sortOrder: "asc" } },
    facilities: true,
    owner: { select: { id: true, name: true } },
} satisfies Prisma.PropertyInclude;

type PropertyRow = Prisma.PropertyGetPayload<{ include: typeof propertyInclude }>;
export type PropertyDto = Property & { status: string; ownerId: number; images: { url: string; alt: string | null }[] };

// Ubah baris database menjadi bentuk `Property` yang sudah dipakai komponen frontend,
// sehingga halaman daftar/detail bisa pindah dari data statis tanpa mengubah komponennya.
// Versi publik: tanpa status dan id pemilik, aman dikirim ke halaman publik.
export function toPublicProperty(row: PropertyRow): Property {
    const names = (scope: string) => row.facilities.filter((item) => item.scope === scope).map((item) => item.name);
    const room = names("room");
    const shared = names("shared");
    const rules = names("rule");
    const [first, second, third] = row.images;
    return {
        id: row.id,
        imgSrc: first?.url ?? "/images/kos/home-home-1.jpg",
        imgSrc2: second?.url,
        imgSrc3: third?.url,
        alt: first?.alt ?? `Foto ${row.title}`,
        address: row.address,
        title: row.title,
        categories: row.kosType,
        type: "Rent",
        beds: 1,
        baths: 1,
        sqft: row.areaM2 ?? undefined,
        roomWidth: row.roomWidth ?? undefined,
        roomLength: row.roomLength ?? undefined,
        bathroomType: row.bathroomType as Property["bathroomType"],
        electricityIncluded: row.electricityIncluded,
        availableRooms: row.availableRooms,
        lat: row.latitude,
        long: row.longitude,
        coordinates: [row.longitude, row.latitude],
        filterOptions: [row.kosType],
        features: [...new Set([...room, ...shared, ...rules])],
        roomFacilities: room,
        sharedFacilities: shared,
        rules,
        price: row.priceMonthly,
        periodPrices: { sixMonths: row.priceSixMonths ?? undefined, yearly: row.priceYearly ?? undefined },
        garages: shared.some((name) => name.startsWith("Parkir")) ? 1 : 0,
        description: row.description ?? undefined,
        city: row.city,
        authorName: row.owner.name,
        authorPosition: "Pengelola Kos",
    };
}

// Versi lengkap untuk API (admin/pemilik): menambah status, id pemilik, dan daftar gambar.
export function toProperty(row: PropertyRow): PropertyDto {
    return {
        ...toPublicProperty(row),
        status: row.status,
        ownerId: row.ownerId,
        images: row.images.map((image) => ({ url: image.url, alt: image.alt })),
    };
}

const priceField = { monthly: "priceMonthly", sixMonths: "priceSixMonths", yearly: "priceYearly" } as const;

// "Maks. Rp750.000" -> { max: 750000 }, "Di atas Rp1.500.000" -> { above: 1500000 } (sama seperti matchesBudget di kos.ts)
function parseBudget(budget?: string): { above?: number; max?: number } | null {
    if (!budget) return null;
    const limit = Number(budget.replace(/[^0-9]/g, ""));
    if (!limit) return null;
    return budget.startsWith("Di atas") ? { above: limit } : { max: limit };
}

export function buildWhere(q: PropertyQuery, user: CurrentUser | null): Prisma.PropertyWhereInput {
    const and: Prisma.PropertyWhereInput[] = [];

    // Visibilitas: publik hanya melihat PUBLISHED; pemilik melihat miliknya; admin boleh semuanya.
    if (q.scope === "public") and.push({ status: "PUBLISHED" });
    else if (q.scope === "mine") and.push({ ownerId: user!.id });
    else if (user?.role !== "ADMIN") throw new HttpError(403, "Hanya admin yang boleh memakai scope=all.");

    const field = priceField[q.period];
    if (q.period !== "monthly") and.push({ [field]: { not: null } } as Prisma.PropertyWhereInput); // sama seperti filterKos: kos tanpa harga periode itu disembunyikan
    const budget = parseBudget(q.budget);
    const min = Math.max(q.minPrice ?? 0, budget?.above !== undefined ? budget.above + 1 : 0);
    const maxCandidates = [q.maxPrice, budget?.max].filter((v): v is number => v !== undefined);
    const max = maxCandidates.length ? Math.min(...maxCandidates) : undefined;
    if (min > 0 || max !== undefined) and.push({ [field]: { ...(min > 0 ? { gte: min } : {}), ...(max !== undefined ? { lte: max } : {}) } } as Prisma.PropertyWhereInput);

    if (q.city) and.push({ city: q.city });
    if (q.kosType) and.push({ kosType: q.kosType });
    if (q.bathroomType) and.push({ bathroomType: q.bathroomType });
    if (q.electricity) and.push({ electricityIncluded: q.electricity === "Termasuk Sewa" });
    if (q.availableOnly) and.push({ availableRooms: { gt: 0 } });
    if (q.minArea) and.push({ areaM2: { gte: q.minArea } });
    // Catatan: di SQLite `contains` tidak membedakan huruf besar/kecil untuk ASCII.
    // Di PostgreSQL tambahkan `mode: "insensitive"`.
    if (q.keyword) and.push({ OR: [{ title: { contains: q.keyword } }, { address: { contains: q.keyword } }] });
    for (const feature of q.feature) {
        const [scope, ...rest] = feature.split(":");
        and.push({ facilities: { some: { scope, name: rest.join(":") } } });
    }
    return { AND: and };
}

export function buildOrderBy(q: PropertyQuery): Prisma.PropertyOrderByWithRelationInput[] {
    const field = priceField[q.period];
    if (q.sort === "priceAsc") return [{ [field]: "asc" } as Prisma.PropertyOrderByWithRelationInput, { id: "asc" }];
    if (q.sort === "priceDesc") return [{ [field]: "desc" } as Prisma.PropertyOrderByWithRelationInput, { id: "asc" }];
    return [{ createdAt: "desc" }, { id: "desc" }];
}

// Pastikan tiap fasilitas ada di tabel Facility, lalu kembalikan id-nya.
export async function resolveFacilityIds(tx: Prisma.TransactionClient, facilities: NonNullable<PropertyInput["facilities"]>) {
    const ids: { id: number }[] = [];
    for (const scope of ["room", "shared", "rule"] as const) {
        for (const name of facilities[scope] ?? []) {
            const facility = await tx.facility.upsert({ where: { scope_name: { scope, name } }, update: {}, create: { scope, name } });
            ids.push({ id: facility.id });
        }
    }
    return ids;
}

export const imageRows = (images: NonNullable<PropertyInput["images"]>) =>
    images.map((image, index) => ({ url: image.url, alt: image.alt ?? null, sortOrder: index }));

// Boleh mengubah/menghapus bila admin atau pemilik kos tersebut.
export function assertCanManage(user: CurrentUser, ownerId: number) {
    if (user.role !== "ADMIN" && user.id !== ownerId) throw new HttpError(403, "Anda tidak punya akses ke kos ini.");
}
