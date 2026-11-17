import { HttpError } from "@/lib/api";

// Pembatas laju sederhana di memori. Cukup untuk satu server / pengembangan.
// Bila di-deploy ke banyak instance (serverless), ganti dengan Redis/Upstash.
const hits = new Map<string, number[]>();

export function clientIp(req: Request) {
    return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

export function rateLimit(key: string, limit: number, windowMs: number) {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
    if (recent.length >= limit) {
        hits.set(key, recent);
        throw new HttpError(429, "Terlalu banyak permintaan. Coba lagi beberapa saat lagi.");
    }
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 10_000) hits.clear(); // cegah memori membengkak
}
