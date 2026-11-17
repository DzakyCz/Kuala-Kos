import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { HttpError } from "@/lib/api";

export type Role = "ADMIN" | "OWNER" | "SEEKER";
export type CurrentUser = { id: number; name: string; email: string; role: Role };

const COOKIE = "kos_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

function secret() {
    const value = process.env.AUTH_SECRET;
    if (!value || value.length < 32) throw new Error("AUTH_SECRET belum diatur (minimal 32 karakter). Lihat .env.example.");
    return new TextEncoder().encode(value);
}

export const hashPassword = (password: string) => bcrypt.hash(password, 12);
export const verifyPassword = (password: string, hash: string) => bcrypt.compare(password, hash);

// Hash cadangan untuk menyamakan waktu respons login saat email tidak terdaftar.
let dummy: string | undefined;
export async function dummyHash() {
    return (dummy ??= await bcrypt.hash("kuala-kos-dummy-password", 12));
}

export async function createSession(userId: number) {
    const token = await new SignJWT({})
        .setProtectedHeader({ alg: "HS256" })
        .setSubject(String(userId))
        .setIssuedAt()
        .setExpirationTime(`${MAX_AGE}s`)
        .sign(secret());
    (await cookies()).set(COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: MAX_AGE,
    });
}

export async function destroySession() {
    (await cookies()).delete(COOKIE);
}

// Ambil pengguna dari cookie lalu cek ulang ke database, sehingga akun yang dihapus
// atau diubah rolenya langsung berlaku tanpa menunggu token kedaluwarsa.
export async function getCurrentUser(): Promise<CurrentUser | null> {
    const token = (await cookies()).get(COOKIE)?.value;
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, secret());
        const id = Number(payload.sub);
        if (!Number.isInteger(id)) return null;
        const user = await prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, role: true } });
        return user ? { ...user, role: user.role as Role } : null;
    } catch {
        return null;
    }
}

export async function requireUser(roles?: Role[]): Promise<CurrentUser> {
    const user = await getCurrentUser();
    if (!user) throw new HttpError(401, "Silakan login terlebih dahulu.");
    if (roles && !roles.includes(user.role)) throw new HttpError(403, "Anda tidak punya akses untuk tindakan ini.");
    return user;
}
