"use client";

import { useEffect, useRef, useState } from "react";
import type { LayerGroup, Map as LeafletMap, Marker, TileLayer } from "leaflet";
import "leaflet/dist/leaflet.css";
import KosSelect from "@/components/ui/KosSelect";
import { routeDestinations } from "@/data/route-destinations";
import styles from "@/components/kos/details/RouteCard.module.css";
import { addMapTiles } from "@/lib/map-tiles";

type Coordinates = [number, number];
type RouteResult = { distance: number; duration: number; coordinates: Coordinates[] };

export default function RouteCard({ origin }: { origin: Coordinates }) {
    const [selected, setSelected] = useState(routeDestinations[0].id);
    const [mode, setMode] = useState("car");
    const [destination, setDestination] = useState<Coordinates | null>(routeDestinations[0].coordinates);
    const [result, setResult] = useState<RouteResult | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [mapReady, setMapReady] = useState(false);
    const [tileError, setTileError] = useState(false);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const mapNode = useRef<HTMLDivElement>(null);
    const map = useRef<LeafletMap | null>(null);
    const leaflet = useRef<typeof import("leaflet") | null>(null);
    const tiles = useRef<TileLayer | null>(null);
    const destinationMarker = useRef<Marker | null>(null);
    const routeLayer = useRef<LayerGroup | null>(null);
    const controller = useRef<AbortController | null>(null);
    const originKey = origin.join(",");

    useEffect(() => {
        let cancelled = false;
        let observer: ResizeObserver | undefined;
        import("leaflet").then((L) => {
            if (cancelled || !mapNode.current) return;
            leaflet.current = L;
            const instance = L.map(mapNode.current, { scrollWheelZoom: false }).setView([origin[1], origin[0]], 14);
            map.current = instance;
            tiles.current = addMapTiles(L, instance, setTileError);
            L.marker([origin[1], origin[0]], { icon: L.divIcon({ className: styles.origin, iconSize: [20, 20], iconAnchor: [10, 10] }), title: "Lokasi kos" }).addTo(instance).bindPopup("Lokasi kos");
            routeLayer.current = L.layerGroup().addTo(instance);
            instance.on("click", (event) => {
                controller.current?.abort();
                setLoading(false);
                setSelected("custom");
                const lat = event.latlng.lat.toFixed(6);
                const lng = event.latlng.lng.toFixed(6);
                setLatitude(lat);
                setLongitude(lng);
                setDestination([Number(lng), Number(lat)]);
                setResult(null);
                setError("");
            });
            observer = new ResizeObserver(() => instance.invalidateSize({ pan: false }));
            observer.observe(mapNode.current);
            setMapReady(true);
        }).catch(() => { if (!cancelled) setError("Peta belum dapat dimuat."); });
        return () => { cancelled = true; controller.current?.abort(); observer?.disconnect(); map.current?.remove(); map.current = null; tiles.current = null; destinationMarker.current = null; routeLayer.current = null; };
        // originKey changes only when the location changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [originKey]);

    useEffect(() => {
        const L = leaflet.current;
        const instance = map.current;
        if (!mapReady || !L || !instance) return;
        destinationMarker.current?.remove();
        routeLayer.current?.clearLayers();
        if (!destination) return;
        destinationMarker.current = L.marker([destination[1], destination[0]], { icon: L.divIcon({ className: styles.destination, iconSize: [20, 20], iconAnchor: [10, 10] }), title: "Titik tujuan pada peta" }).addTo(instance).bindPopup("Tujuan");
        const points: [number, number][] = result
            ? result.coordinates.map(([lng, lat]) => [lat, lng])
            : [[origin[1], origin[0]], [destination[1], destination[0]]];
        if (result && routeLayer.current) L.polyline(points, { color: "#315d3b", weight: 5, opacity: 0.85 }).addTo(routeLayer.current);
        instance.fitBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 15, animate: false });
    }, [destination, result, originKey, origin, mapReady]);

    const selectDestination = (value: string) => {
        controller.current?.abort();
        setLoading(false); setResult(null); setError(""); setSelected(value);
        setLatitude(""); setLongitude("");
        setDestination(routeDestinations.find((item) => item.id === value)?.coordinates ?? null);
    };

    const changeCoordinates = (lat: string, lng: string) => {
        controller.current?.abort();
        setLoading(false); setResult(null); setError("");
        setLatitude(lat); setLongitude(lng);
        const y = Number(lat), x = Number(lng);
        setDestination(lat.trim() && lng.trim() && Number.isFinite(y) && Number.isFinite(x) && y >= 5.2 && y <= 5.9 && x >= 94.9 && x <= 95.8 ? [x, y] : null);
    };

    const calculate = async () => {
        if (!destination) { setError("Pilih titik di peta atau masukkan koordinat tujuan di sekitar Banda Aceh."); return; }
        if (mode === "transit") return;
        controller.current?.abort();
        const request = new AbortController();
        controller.current = request;
        setLoading(true); setError(""); setResult(null);
        try {
            const query = new URLSearchParams({ from: origin.join(","), to: destination.join(","), mode });
            const response = await fetch(`/api/routes?${query}`, { signal: request.signal });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Rute belum dapat dimuat.");
            if (!request.signal.aborted) setResult(data);
        } catch (cause) {
            if (!request.signal.aborted) setError(cause instanceof Error ? cause.message : "Rute belum dapat dimuat.");
        } finally {
            if (controller.current === request) { controller.current = null; setLoading(false); }
        }
    };

    const mapsMode = mode === "foot" ? "walking" : mode === "bike" ? "bicycling" : mode === "motorcycle" ? "two-wheeler" : mode === "transit" ? "transit" : "driving";
    const mapsUrl = destination && `https://www.google.com/maps/dir/?api=1&origin=${origin[1]},${origin[0]}&destination=${destination[1]},${destination[0]}&travelmode=${mapsMode}`;
    return <section className={styles.card} aria-labelledby="route-title">
        <h5 id="route-title">Rute dari Kos</h5>
        <p className={styles.intro}>Pilih tujuan atau klik lokasi lain pada peta untuk melihat perkiraan perjalanan.</p>
        <div className={styles.controls}>
            <KosSelect id="route-destination" label="Tujuan" value={selected} onChange={selectDestination} options={[...routeDestinations.map((item) => ({ value: item.id, label: item.label })), { value: "custom", label: "Pilih lokasi di peta" }]} />
            <KosSelect id="route-mode" label="Moda Perjalanan" value={mode} onChange={(value) => { controller.current?.abort(); setLoading(false); setResult(null); setError(""); setMode(value); }} options={[{ value: "car", label: "Mobil" }, { value: "motorcycle", label: "Sepeda motor" }, { value: "bike", label: "Sepeda" }, { value: "foot", label: "Jalan kaki" }, { value: "transit", label: "Trans Koetaradja" }]} />
            {mode === "transit" ? (mapsUrl ? <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="tf-btn btn-bg-1 btn-px-28"><span>Cek angkutan umum</span><span className="bg-effect" /></a> : <button type="button" className="tf-btn btn-bg-1 btn-px-28" onClick={calculate}><span>Pilih tujuan</span><span className="bg-effect" /></button>) : <button type="button" className="tf-btn btn-bg-1 btn-px-28" disabled={loading} onClick={calculate}><span>{loading ? "Menghitung..." : "Lihat Rute"}</span><span className="bg-effect" /></button>}
        </div>
        {selected === "custom" && <div className={styles.custom}>
            <p className={styles.hint}>Klik titik pada peta atau masukkan koordinat tujuan.</p>
            <div className={styles.coordinateFields}>
                <label>Lintang<input type="number" step="any" min="5.2" max="5.9" value={latitude} onChange={(event) => changeCoordinates(event.target.value, longitude)} placeholder="Contoh: 5.569257" /></label>
                <label>Bujur<input type="number" step="any" min="94.9" max="95.8" value={longitude} onChange={(event) => changeCoordinates(latitude, event.target.value)} placeholder="Contoh: 95.371226" /></label>
            </div>
        </div>}
        <div ref={mapNode} className={styles.map} aria-label="Peta rute dari lokasi kos ke tujuan" />
        {tileError && <p className={styles.hint} role="status">Sebagian peta belum dapat dimuat. <button type="button" className={styles.retry} onClick={() => tiles.current?.redraw()}>Coba lagi</button></p>}
        <div className={styles.info} aria-live="polite">
            {result && <div className={styles.summary}><span><strong>{Math.max(1, Math.round(result.duration / 60))} menit</strong> {mode === "foot" ? "berjalan kaki" : mode === "bike" ? "bersepeda" : mode === "motorcycle" ? "mengikuti estimasi mobil" : "dengan mobil"}</span><span><strong>{(result.distance / 1000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} km</strong></span></div>}
            {error && <p className={styles.error} role="alert">{error}</p>}
            {mapsUrl && mode !== "transit" && <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="hover-underline-link text-button fw-7">Buka petunjuk arah</a>}
            {mode === "transit" && <p>Rute dan jadwal Trans Koetaradja untuk perjalanan ini belum dapat dipastikan di sini. Periksa angkutan umum di Google Maps dan <a href="https://dishub.acehprov.go.id/services/uptd-trans-k/" target="_blank" rel="noopener noreferrer" className="hover-underline-link">informasi resmi Trans Koetaradja</a>.</p>}
        </div>
        <p className={styles.hint}>{mode === "motorcycle" ? "Rute dan waktu menggunakan perkiraan mobil; aturan dan kondisi khusus sepeda motor belum diperhitungkan. Petunjuk arah sepeda motor di Google Maps bergantung pada ketersediaan wilayah." : mode === "transit" ? "Ketersediaan rute angkutan umum di Google Maps bergantung pada data penyedia peta." : mode === "foot" ? "Perkiraan berjalan kaki dapat berubah sesuai kondisi jalan." : mode === "bike" ? "Perkiraan bersepeda dapat berubah sesuai kondisi jalan." : "Perkiraan perjalanan mobil tanpa data kemacetan langsung."} Titik kos dan tujuan perlu dikonfirmasi sebelum berangkat.</p>
    </section>;
}
