import { readFile } from "node:fs/promises";
import path from "node:path";
import { HttpError, route } from "@/lib/api";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");
const TYPES: Record<string, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" };

// GET /api/uploads/:filename -> sajikan gambar yang sudah diunggah.
// Nama file dibatasi ketat (uuid + ekstensi) sehingga tidak mungkin keluar dari folder uploads/.
export const GET = route(async (_req, { params }: { params: Promise<{ filename: string }> }) => {
    const { filename } = await params;
    const match = /^[0-9a-f-]{36}\.(jpg|png|webp)$/.exec(filename);
    if (!match) throw new HttpError(404, "File tidak ditemukan.");
    const bytes = await readFile(path.join(UPLOAD_DIR, filename)).catch(() => null);
    if (!bytes) throw new HttpError(404, "File tidak ditemukan.");
    return new Response(new Uint8Array(bytes), {
        headers: {
            "Content-Type": TYPES[match[1]],
            "Cache-Control": "public, max-age=31536000, immutable",
            "X-Content-Type-Options": "nosniff",
        },
    });
});
