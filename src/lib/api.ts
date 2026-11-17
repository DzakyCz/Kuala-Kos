import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export class HttpError extends Error {
    constructor(public status: number, message: string, public details?: unknown) {
        super(message);
    }
}

export const ok = <T,>(data: T, status = 200) => NextResponse.json(data, { status });

// Bungkus semua route handler supaya error selalu menjadi JSON { error, details? }
// dan detail internal tidak bocor ke klien.
export function route<C = unknown>(handler: (req: Request, ctx: C) => Promise<Response>) {
    return async (req: Request, ctx: C): Promise<Response> => {
        try {
            return await handler(req, ctx);
        } catch (error) {
            if (error instanceof HttpError) {
                return NextResponse.json({ error: error.message, details: error.details }, { status: error.status });
            }
            if (error instanceof ZodError) {
                const details = error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message }));
                return NextResponse.json({ error: "Data tidak valid.", details }, { status: 422 });
            }
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2025") return NextResponse.json({ error: "Data tidak ditemukan." }, { status: 404 });
                if (error.code === "P2002") return NextResponse.json({ error: "Data sudah ada." }, { status: 409 });
            }
            console.error("[api]", error);
            return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
        }
    };
}

// Baca body JSON dengan pemeriksaan tipe dan ukuran.
export async function readJson(req: Request, maxBytes = 100_000): Promise<unknown> {
    if (!req.headers.get("content-type")?.includes("application/json")) {
        throw new HttpError(415, "Content-Type harus application/json.");
    }
    const length = Number(req.headers.get("content-length") ?? 0);
    if (length > maxBytes) throw new HttpError(413, "Data terlalu besar.");
    try {
        return await req.json();
    } catch {
        throw new HttpError(400, "Body bukan JSON yang valid.");
    }
}

export function parseId(raw: string): number {
    if (!/^\d{1,9}$/.test(raw)) throw new HttpError(404, "Data tidak ditemukan.");
    return Number(raw);
}
