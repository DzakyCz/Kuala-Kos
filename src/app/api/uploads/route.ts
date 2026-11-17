import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { HttpError, ok, route } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");
const MAX_BYTES = 3 * 1024 * 1024; // 3 MB

// Jenis file ditentukan dari isi file (magic bytes), bukan dari nama/Content-Type kiriman klien.
function detectType(bytes: Uint8Array): "jpg" | "png" | "webp" | null {
    if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg";
    if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "png";
    const ascii = (from: number, to: number) => String.fromCharCode(...bytes.slice(from, to));
    if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "webp";
    return null;
}

// POST /api/uploads (multipart/form-data, field "file") -> { url: "/api/uploads/<uuid>.jpg" }
// URL itu lalu dipakai pada field images[].url saat membuat/mengubah kos.
// Untuk produksi, ganti penyimpanan lokal ini dengan Cloudinary / S3 / Supabase Storage.
export const POST = route(async (req) => {
    const user = await requireUser(["OWNER", "ADMIN"]);
    rateLimit(`upload:${user.id}`, 30, 60 * 60 * 1000);
    if (Number(req.headers.get("content-length") ?? 0) > MAX_BYTES + 100_000) throw new HttpError(413, "Ukuran file maksimal 3 MB.");

    const form = await req.formData().catch(() => null);
    const file = form?.get("file");
    if (!(file instanceof File)) throw new HttpError(400, 'Kirim file pada field "file".');
    if (file.size === 0 || file.size > MAX_BYTES) throw new HttpError(413, "Ukuran file harus di bawah 3 MB.");

    const bytes = new Uint8Array(await file.arrayBuffer());
    const type = detectType(bytes);
    if (!type) throw new HttpError(415, "Hanya gambar JPG, PNG, atau WebP yang diizinkan.");

    const name = `${randomUUID()}.${type}`;
    await mkdir(UPLOAD_DIR, { recursive: true });
    await writeFile(path.join(UPLOAD_DIR, name), bytes);
    return ok({ url: `/api/uploads/${name}` }, 201);
});
