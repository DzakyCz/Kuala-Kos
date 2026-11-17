import { prisma } from "@/lib/db";
import type { Property } from "@/types/property";
import { propertyInclude, toPublicProperty } from "@/lib/property-service";

// Fungsi baca data untuk halaman publik (Server Component). Hanya kos berstatus PUBLISHED.
// Urutan id naik = urutan yang sama dengan data statis sebelumnya.

export async function getPublishedProperties(limit = 100): Promise<Property[]> {
    const rows = await prisma.property.findMany({
        where: { status: "PUBLISHED" },
        include: propertyInclude,
        orderBy: { id: "asc" },
        take: limit,
    });
    return rows.map(toPublicProperty);
}

export async function getPublishedProperty(id: number): Promise<Property | null> {
    const row = await prisma.property.findFirst({ where: { id, status: "PUBLISHED" }, include: propertyInclude });
    return row ? toPublicProperty(row) : null;
}

export async function getRelatedProperties(excludeId: number, limit = 6): Promise<Property[]> {
    const rows = await prisma.property.findMany({
        where: { status: "PUBLISHED", id: { not: excludeId } },
        include: propertyInclude,
        orderBy: { id: "asc" },
        take: limit,
    });
    return rows.map(toPublicProperty);
}

export async function getPublishedPropertySummary(id: number) {
    return prisma.property.findFirst({ where: { id, status: "PUBLISHED" }, select: { id: true, title: true } });
}

// Ubah parameter URL menjadi id angka yang aman; null bila tidak valid.
export function parseIdParam(raw: string | undefined): number | null {
    return raw && /^\d{1,9}$/.test(raw) ? Number(raw) : null;
}
