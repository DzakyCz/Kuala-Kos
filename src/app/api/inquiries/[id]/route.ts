import { prisma } from "@/lib/db";
import { HttpError, ok, parseId, readJson, route } from "@/lib/api";
import { requireUser, type CurrentUser } from "@/lib/auth";
import { inquiryStatusSchema } from "@/lib/validators";

type Ctx = { params: Promise<{ id: string }> };

async function loadForUser(idRaw: string, user: CurrentUser) {
    const id = parseId(idRaw);
    const inquiry = await prisma.inquiry.findUnique({ where: { id }, include: { property: { select: { ownerId: true } } } });
    if (!inquiry) throw new HttpError(404, "Pesan tidak ditemukan.");
    // Pemilik hanya boleh mengurus pesan untuk kos miliknya; pesan tanpa kos hanya untuk admin.
    if (user.role !== "ADMIN" && inquiry.property?.ownerId !== user.id) throw new HttpError(404, "Pesan tidak ditemukan.");
    return inquiry;
}

// PATCH /api/inquiries/:id  body: { "status": "READ" | "ARCHIVED" | "NEW" }
export const PATCH = route(async (req, { params }: Ctx) => {
    const user = await requireUser(["ADMIN", "OWNER"]);
    const inquiry = await loadForUser((await params).id, user);
    const { status } = inquiryStatusSchema.parse(await readJson(req));
    const updated = await prisma.inquiry.update({ where: { id: inquiry.id }, data: { status } });
    return ok({ data: updated });
});

// DELETE /api/inquiries/:id (admin saja)
export const DELETE = route(async (_req, { params }: Ctx) => {
    const user = await requireUser(["ADMIN"]);
    const inquiry = await loadForUser((await params).id, user);
    await prisma.inquiry.delete({ where: { id: inquiry.id } });
    return ok({ ok: true });
});
