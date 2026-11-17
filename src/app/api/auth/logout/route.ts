import { ok, route } from "@/lib/api";
import { destroySession } from "@/lib/auth";

// POST /api/auth/logout -> hapus cookie sesi
export const POST = route(async () => {
    await destroySession();
    return ok({ ok: true });
});
