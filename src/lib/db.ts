import { PrismaClient } from "@prisma/client";

// Satu instance PrismaClient dipakai bersama agar hot-reload di `next dev`
// tidak membuka koneksi baru setiap kali file berubah.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
