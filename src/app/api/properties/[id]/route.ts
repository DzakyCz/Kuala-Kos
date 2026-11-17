import { prisma } from "@/lib/db";
import { HttpError, ok, parseId, readJson, route } from "@/lib/api";
import { getCurrentUser, requireUser } from "@/lib/auth";
import { assertCanManage, imageRows, propertyInclude, resolveFacilityIds, toProperty } from "@/lib/property-service";
import { updatePropertySchema } from "@/lib/validators";

type Ctx = { params: Promise<{ id: string }> };

// GET /api/properties/:id -> detail. Kos non-PUBLISHED hanya terlihat oleh pemilik/admin.
export const GET = route(async (_req, { params }: Ctx) => {
    const id = parseId((await params).id);
    const row = await prisma.property.findUnique({ where: { id }, include: propertyInclude });
    if (!row) throw new HttpError(404, "Kos tidak ditemukan.");
    if (row.status !== "PUBLISHED") {
        const user = await getCurrentUser();
        if (!user || (user.role !== "ADMIN" && user.id !== row.ownerId)) throw new HttpError(404, "Kos tidak ditemukan.");
    }
    return ok({ data: toProperty(row) });
});

// PATCH /api/properties/:id -> ubah sebagian field. `images` dan `facilities`, bila dikirim, MENGGANTIKAN seluruh isi lama.
export const PATCH = route(async (req, { params }: Ctx) => {
    const user = await requireUser(["OWNER", "ADMIN"]);
    const id = parseId((await params).id);
    const existing = await prisma.property.findUnique({ where: { id }, select: { ownerId: true } });
    if (!existing) throw new HttpError(404, "Kos tidak ditemukan.");
    assertCanManage(user, existing.ownerId);

    const input = updatePropertySchema.parse(await readJson(req));
    if (input.ownerId !== undefined && user.role !== "ADMIN") throw new HttpError(403, "Hanya admin yang boleh mengganti pemilik.");
    const { facilities, images, ...fields } = input;

    const updated = await prisma.$transaction(async (tx) => {
        const facilityIds = facilities ? await resolveFacilityIds(tx, facilities) : undefined;
        if (images) await tx.propertyImage.deleteMany({ where: { propertyId: id } });
        return tx.property.update({
            where: { id },
            data: {
                ...fields,
                ...(facilityIds ? { facilities: { set: facilityIds } } : {}),
                ...(images ? { images: { create: imageRows(images) } } : {}),
            },
            include: propertyInclude,
        });
    });
    return ok({ data: toProperty(updated) });
});

// DELETE /api/properties/:id -> hapus kos (pesan terkait tetap ada, propertyId jadi null)
export const DELETE = route(async (_req, { params }: Ctx) => {
    const user = await requireUser(["OWNER", "ADMIN"]);
    const id = parseId((await params).id);
    const existing = await prisma.property.findUnique({ where: { id }, select: { ownerId: true } });
    if (!existing) throw new HttpError(404, "Kos tidak ditemukan.");
    assertCanManage(user, existing.ownerId);
    await prisma.property.delete({ where: { id } });
    return ok({ ok: true });
});
