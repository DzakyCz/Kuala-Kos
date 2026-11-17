import { prisma } from "@/lib/db";
import { HttpError, ok, readJson, route } from "@/lib/api";
import { createSession, dummyHash, verifyPassword } from "@/lib/auth";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { loginSchema } from "@/lib/validators";

// POST /api/auth/login -> set cookie sesi
export const POST = route(async (req) => {
    rateLimit(`login:${clientIp(req)}`, 10, 15 * 60 * 1000);
    const input = loginSchema.parse(await readJson(req));
    const user = await prisma.user.findUnique({ where: { email: input.email } });
    const valid = await verifyPassword(input.password, user?.passwordHash ?? (await dummyHash()));
    if (!user || !valid) throw new HttpError(401, "Email atau kata sandi salah.");
    await createSession(user.id);
    return ok({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});
