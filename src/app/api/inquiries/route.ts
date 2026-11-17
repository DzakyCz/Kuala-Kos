import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { HttpError, ok, readJson, route } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { INQUIRY_STATUSES, inquirySchema } from "@/lib/validators";

// POST /api/inquiries -> kirim pesan dari form kontak / halaman detail kos (publik, tanpa login)
export const POST = route(async (req) => {
    rateLimit(`inquiry:${clientIp(req)}`, 5, 10 * 60 * 1000);
    const input = inquirySchema.parse(await readJson(req));

    // Honeypot: bot mengisi field tersembunyi. Pura-pura sukses agar bot tidak belajar.
    if (input.website) return ok({ ok: true }, 201);

    if (input.propertyId) {
        const property = await prisma.property.findFirst({ where: { id: input.propertyId, status: "PUBLISHED" }, select: { id: true } });
        if (!property) throw new HttpError(404, "Kos yang dituju tidak ditemukan.");
    }
    await prisma.inquiry.create({
        data: { name: input.name, email: input.email, phone: input.phone, message: input.message, propertyId: input.propertyId },
    });
    return ok({ ok: true }, 201);
});

const listQuery = z.object({
    status: z.enum(INQUIRY_STATUSES).optional(),
    page: z.coerce.number().int().min(1).max(10_000).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
});

// GET /api/inquiries -> daftar pesan. Admin: semua. Pemilik: hanya pesan untuk kos miliknya.
export const GET = route(async (req) => {
    const user = await requireUser(["ADMIN", "OWNER"]);
    const params = new URL(req.url).searchParams;
    const q = listQuery.parse(Object.fromEntries([...params].filter(([, value]) => value !== "")));
    const where: Prisma.InquiryWhereInput = {
        ...(q.status ? { status: q.status } : {}),
        ...(user.role === "ADMIN" ? {} : { property: { ownerId: user.id } }),
    };
    const [total, data] = await prisma.$transaction([
        prisma.inquiry.count({ where }),
        prisma.inquiry.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: (q.page - 1) * q.limit,
            take: q.limit,
            include: { property: { select: { id: true, title: true } } },
        }),
    ]);
    return ok({ data, meta: { page: q.page, limit: q.limit, total, totalPages: Math.max(1, Math.ceil(total / q.limit)) } });
});
