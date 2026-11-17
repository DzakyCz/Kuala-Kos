import { ok, route } from "@/lib/api";
import { requireUser } from "@/lib/auth";

// GET /api/auth/me -> pengguna yang sedang login (401 bila belum)
export const GET = route(async () => ok({ user: await requireUser() }));
