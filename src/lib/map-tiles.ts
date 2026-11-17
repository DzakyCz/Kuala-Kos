import type { Map, TileLayer } from "leaflet";

export function addMapTiles(L: typeof import("leaflet"), map: Map, onError: (failed: boolean) => void): TileLayer {
    let failures = 0;
    const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> kontributor',
    });
    tiles.on("loading", () => { failures = 0; });
    tiles.on("tileerror", () => { failures += 1; onError(true); });
    tiles.on("load", () => { if (failures === 0) onError(false); });
    return tiles.addTo(map);
}
