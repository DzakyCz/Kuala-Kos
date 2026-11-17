import { NextResponse } from "next/server";

// The public routing server is used only for this prototype and only on demand.
let lastRequestAt = 0;
function coordinate(value: string | null): [number, number] | null {
    if (!value) return null;
    const parts = value.split(",");
    if (parts.length !== 2 || parts.some((part) => !part.trim())) return null;
    const [longitude, latitude] = parts.map(Number);
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) return null;
    if (longitude < 94.9 || longitude > 95.8 || latitude < 5.2 || latitude > 5.9) return null;
    return [longitude, latitude];
}

export async function GET(request: Request) {
    const params = new URL(request.url).searchParams;
    const from = coordinate(params.get("from"));
    const to = coordinate(params.get("to"));
    const mode = params.get("mode") ?? "car";
    if (!from || !to || !["car", "foot", "bike", "motorcycle"].includes(mode)) return NextResponse.json({ error: "Lokasi atau moda perjalanan tidak valid." }, { status: 400 });
    const now = Date.now();
    if (now - lastRequestAt < 1000) return NextResponse.json({ error: "Tunggu sebentar sebelum menghitung rute lagi." }, { status: 429 });
    lastRequestAt = now;
    try {
        const service = mode === "foot" ? "https://routing.openstreetmap.de/routed-foot" : mode === "bike" ? "https://routing.openstreetmap.de/routed-bike" : "https://router.project-osrm.org";
        const url = new URL(`${service}/route/v1/driving/${from.join(",")};${to.join(",")}`);
        url.search = new URLSearchParams({ overview: "full", geometries: "geojson", steps: "false" }).toString();
        const response = await fetch(url, { signal: AbortSignal.timeout(10000), cache: "no-store", headers: { "User-Agent": "KualaKos-Development/0.1 (local prototype)" } });
        if (!response.ok) throw new Error("Routing service unavailable");
        const body = await response.json();
        const route = body?.routes?.[0];
        if (body?.code !== "Ok" || !route || !Number.isFinite(route.distance) || !Number.isFinite(route.duration) || route.geometry?.type !== "LineString" || !Array.isArray(route.geometry.coordinates)) {
            return NextResponse.json({ error: "Rute belum ditemukan untuk lokasi ini." }, { status: 422 });
        }
        return NextResponse.json({ distance: route.distance, duration: route.duration, coordinates: route.geometry.coordinates });
    } catch {
        return NextResponse.json({ error: "Rute belum dapat dimuat. Silakan coba lagi." }, { status: 503 });
    }
}
