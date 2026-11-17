import { prisma } from "@/lib/db";
import { HttpError, ok, readJson, route } from "@/lib/api";
import { getCurrentUser, requireUser } from "@/lib/auth";
import { buildOrderBy, buildWhere, imageRows, propertyInclude, resolveFacilityIds, toProperty } from "@/lib/property-service";
import { createPropertySchema, parsePropertyQuery } from "@/lib/validators";

// GET /api/properties?keyword=&city=&kosType=&period=&minPrice=&maxPrice=&feature=room:AC&page=1&limit=12
// Publik: hanya kos berstatus PUBLISHED. scope=mine (pemilik) / scope=all (admin) butuh login.
export const GET = route(async (req) => {
    const q = parsePropertyQuery(new URL(req.url).searchParams);
    const user = q.scope === "public" ? await getCurrentUser() : await requireUser(["OWNER", "ADMIN"]);
    const where = buildWhere(q, user);
    const [total, rows] = await prisma.$transaction([
        prisma.property.count({ where }),
        prisma.property.findMany({ where, include: propertyInclude, orderBy: buildOrderBy(q), skip: (q.page - 1) * q.limit, take: q.limit }),
    ]);
    return ok({ data: rows.map(toProperty), meta: { page: q.page, limit: q.limit, total, totalPages: Math.max(1, Math.ceil(total / q.limit)) } });
});

// POST /api/properties -> tambah kos (OWNER / ADMIN)
export const POST = route(async (req) => {
    const user = await requireUser(["OWNER", "ADMIN"]);
    const input = createPropertySchema.parse(await readJson(req));
    if (input.ownerId && user.role !== "ADMIN") throw new HttpError(403, "Hanya admin yang boleh menentukan pemilik.");
    const { facilities, images, ownerId, ...fields } = input;

    const created = await prisma.$transaction(async (tx) => {
        const facilityIds = facilities ? await resolveFacilityIds(tx, facilities) : [];
        return tx.property.create({
            data: {
                ...fields,
                ownerId: ownerId ?? user.id,
                facilities: { connect: facilityIds },
                images: { create: imageRows(images ?? []) },
            },
            include: propertyInclude,
        });
    });
    return ok({ data: toProperty(created) }, 201);
});
