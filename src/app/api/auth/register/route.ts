import { prisma } from "@/lib/db";
import { ok, readJson, route } from "@/lib/api";
import { createSession, hashPassword } from "@/lib/auth";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { registerSchema } from "@/lib/validators";

// POST /api/auth/register  -> daftar akun (SEEKER atau OWNER) dan langsung login
export const POST = route(async (req) => {
    rateLimit(`register:${clientIp(req)}`, 5, 60 * 60 * 1000);
    const input = registerSchema.parse(await readJson(req));
    const user = await prisma.user.create({
        data: { name: input.name, email: input.email, phone: input.phone, role: input.role, passwordHash: await hashPassword(input.password) },
        select: { id: true, name: true, email: true, role: true },
    }); // email ganda -> P2002 -> 409 oleh route()
    await createSession(user.id);
    return ok({ user }, 201);
});
