// Mengisi database dengan akun admin, akun pemilik demo, dan 12 kos dari src/data/properties.ts.
// Jalankan: npm run db:seed   (aman diulang; kos di-upsert berdasarkan id yang sama)
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { properties } from "../src/data/properties";

const prisma = new PrismaClient();

async function main() {
    const password = process.env.SEED_PASSWORD ?? "ChangeMe123!";
    if (process.env.NODE_ENV === "production" && password === "ChangeMe123!") {
        throw new Error("Atur SEED_PASSWORD yang kuat sebelum seed di produksi.");
    }
    const passwordHash = await bcrypt.hash(password, 12);

    const admin = await prisma.user.upsert({
        where: { email: process.env.ADMIN_EMAIL ?? "admin@kualakos.test" },
        update: {},
        create: { name: "Admin Kuala Kos", email: process.env.ADMIN_EMAIL ?? "admin@kualakos.test", passwordHash, role: "ADMIN" },
    });
    const owner = await prisma.user.upsert({
        where: { email: "pemilik@kualakos.test" },
        update: {},
        create: { name: "Pengelola Kos Demo", email: "pemilik@kualakos.test", passwordHash, role: "OWNER" },
    });

    for (const p of properties) {
        const [longitude, latitude] = p.coordinates;
        const images = [p.imgSrc, p.imgSrc2, p.imgSrc3]
            .filter((url): url is string => Boolean(url))
            .map((url, sortOrder) => ({ url, alt: p.alt ?? null, sortOrder }));
        const facilityRows = [
            ...(p.roomFacilities ?? []).map((name) => ({ scope: "room", name })),
            ...(p.sharedFacilities ?? []).map((name) => ({ scope: "shared", name })),
            ...(p.rules ?? []).map((name) => ({ scope: "rule", name })),
        ];
        const facilityIds: { id: number }[] = [];
        for (const row of facilityRows) {
            const facility = await prisma.facility.upsert({ where: { scope_name: row }, update: {}, create: row });
            facilityIds.push({ id: facility.id });
        }

        const data = {
            title: p.title,
            kosType: p.categories,
            address: p.address,
            city: p.city,
            latitude,
            longitude,
            description: p.description ?? null,
            priceMonthly: p.price,
            priceSixMonths: p.periodPrices?.sixMonths ?? null,
            priceYearly: p.periodPrices?.yearly ?? null,
            areaM2: p.sqft ?? null,
            roomWidth: p.roomWidth ?? null,
            roomLength: p.roomLength ?? null,
            bathroomType: p.bathroomType ?? "Luar/Bersama",
            electricityIncluded: p.electricityIncluded ?? false,
            availableRooms: p.availableRooms ?? 0,
            status: "PUBLISHED",
            ownerId: owner.id,
        };
        await prisma.property.upsert({
            where: { id: p.id },
            update: { ...data, facilities: { set: facilityIds }, images: { deleteMany: {}, create: images } },
            create: { id: p.id, ...data, facilities: { connect: facilityIds }, images: { create: images } },
        });
    }
    console.log(`Seed selesai: ${properties.length} kos, admin ${admin.email}, pemilik ${owner.email}`);
    console.log("Kata sandi akun seed diambil dari SEED_PASSWORD di .env (jangan dipakai di produksi).");
}

main()
    .catch((error) => { console.error(error); process.exit(1); })
    .finally(() => prisma.$disconnect());
