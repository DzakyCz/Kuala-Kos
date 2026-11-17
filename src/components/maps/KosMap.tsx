"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Map as LeafletMap, Marker, TileLayer } from "leaflet";
import "leaflet/dist/leaflet.css";
import { areaCenter, formatRupiah, periodPrice, periodSuffix, type RentPeriod } from "@/lib/kos";
import styles from "@/components/maps/KosMap.module.css";
import { addMapTiles } from "@/lib/map-tiles";

interface Property {
    id: number | string;
    address: string;
    title: string;
    coordinates?: [number, number];
    lat?: number;
    long?: number;
    price?: number;
    periodPrices?: { sixMonths?: number; yearly?: number };
    imgSrc: string;
}

export default function KosMap({ sorted, period = "monthly", searchOverlay = true, emptyLabel = "Tidak ada lokasi kos yang sesuai filter." }: { sorted: Property[]; period?: RentPeriod; searchOverlay?: boolean; emptyLabel?: string }) {
    const container = useRef<HTMLDivElement>(null);
    const map = useRef<LeafletMap | null>(null);
    const library = useRef<typeof import("leaflet") | null>(null);
    const tiles = useRef<TileLayer | null>(null);
    const [ready, setReady] = useState(false);
    const [error, setError] = useState(false);
    const [tileError, setTileError] = useState(false);

    useEffect(() => {
        let cancelled = false;
        let resizeObserver: ResizeObserver | undefined;
        import("leaflet").then((L) => {
            if (cancelled || !container.current) return;
            library.current = L;
            const instance = L.map(container.current, { scrollWheelZoom: false, zoomControl: false })
                .setView([areaCenter[1], areaCenter[0]], 13);
            map.current = instance;
            L.control.zoom({ position: "topright", zoomInTitle: "Perbesar peta", zoomOutTitle: "Perkecil peta" }).addTo(instance);
            tiles.current = addMapTiles(L, instance, setTileError);
            resizeObserver = new ResizeObserver(() => instance.invalidateSize({ pan: false }));
            resizeObserver.observe(container.current);
            setReady(true);
        }).catch(() => { if (!cancelled) setError(true); });
        return () => {
            cancelled = true;
            resizeObserver?.disconnect();
            map.current?.remove();
            map.current = null;
            tiles.current = null;
        };
    }, []);

    useEffect(() => {
        const L = library.current;
        const instance = map.current;
        if (!ready || !L || !instance) return;
        const group = L.featureGroup().addTo(instance);
        const markers = new Map<string, Marker>();
        const properties = sorted.filter((property) => {
            const coordinates = property.coordinates ?? [property.long, property.lat];
            return coordinates.every((value) => typeof value === "number" && Number.isFinite(value));
        });

        properties.forEach((property, index) => {
            const [longitude, latitude] = property.coordinates ?? [property.long!, property.lat!];
            const icon = L.divIcon({
                className: styles.marker,
                html: `<span class="${styles.pin}"><i class="icon-HouseLine" aria-hidden="true"></i><span>${index + 1}</span></span>`,
                iconSize: [48, 48], iconAnchor: [24, 48], popupAnchor: [0, -48],
            });
            const marker = L.marker([latitude, longitude], {
                icon, title: property.title, alt: `Lokasi ${property.title}`, keyboard: true,
            }).addTo(group);
            const content = document.createElement("div");
            content.className = styles.popup;
            const image = document.createElement("img");
            image.src = property.imgSrc;
            image.alt = property.title;
            image.width = 240; image.height = 120;
            const title = document.createElement("h6");
            title.textContent = property.title;
            const address = document.createElement("p");
            address.textContent = property.address;
            const price = document.createElement("strong");
            const amount = property.price === undefined ? undefined : periodPrice({ price: property.price, periodPrices: property.periodPrices }, period);
            price.textContent = amount === undefined ? "Hubungi pengelola" : `${formatRupiah(amount)}/${periodSuffix[period]}`;
            const link = document.createElement("a");
            link.href = `/property-details-2/${encodeURIComponent(property.id)}`;
            link.textContent = "Lihat Detail Kos";
            content.append(image, title, address, price, link);
            marker.bindPopup(content, {
                maxWidth: 260, minWidth: 220,
                autoPanPaddingTopLeft: [20, searchOverlay ? 105 : 20],
                autoPanPaddingBottomRight: [20, searchOverlay ? 160 : 20],
            });
            markers.set(String(property.id), marker);
        });

        if (properties.length) {
            instance.fitBounds(group.getBounds(), {
                paddingTopLeft: [65, searchOverlay ? 130 : 65], paddingBottomRight: [65, searchOverlay ? 170 : 65],
                maxZoom: 15, animate: false,
            });
        } else {
            instance.setView([areaCenter[1], areaCenter[0]], 13);
        }
        const showCardLocation = (event: Event) => {
            if (!(event.target instanceof Element)) return;
            const card = event.target.closest<HTMLElement>(".card-house[data-id]");
            if (!card) return;
            if (event instanceof MouseEvent && event.relatedTarget instanceof Node && card.contains(event.relatedTarget)) return;
            const marker = markers.get(card.dataset.id ?? "");
            if (marker) { instance.panTo(marker.getLatLng()); marker.openPopup(); }
        };
        document.addEventListener("mouseover", showCardLocation);
        document.addEventListener("focusin", showCardLocation);
        return () => {
            document.removeEventListener("mouseover", showCardLocation);
            document.removeEventListener("focusin", showCardLocation);
            group.eachLayer((layer) => { if (layer instanceof L.Marker) layer.unbindPopup(); });
            group.remove();
        };
    }, [sorted, ready, searchOverlay, period]);

    return (
        <div className={styles.wrapper} style={{"--map-caption-top": searchOverlay ? "106px" : "16px", "--map-control-top": searchOverlay ? "100px" : "10px"} as CSSProperties}>
            <div ref={container} className={styles.map} aria-label="Peta pilihan kos di Banda Aceh dan sekitarnya" />
            {(error || tileError || sorted.length === 0) && <div className={styles.caption} role="status">
                {error ? "Peta belum dapat dimuat. Silakan muat ulang halaman." : tileError ? <>Sebagian peta belum dapat dimuat. <button type="button" className={styles.retry} onClick={() => tiles.current?.redraw()}>Coba lagi</button></> : emptyLabel}
            </div>}
        </div>
    );
}
