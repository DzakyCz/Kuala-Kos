import { areaCenter } from "@/lib/kos";

export default function AreaMapFallback({
    coordinates = areaCenter,
    showMarker = false,
}: {
    coordinates?: [number, number];
    showMarker?: boolean;
}) {
    const [longitude, latitude] = coordinates;
    const bounds = [longitude - 0.018, latitude - 0.012, longitude + 0.018, latitude + 0.012].join(",");
    const query = new URLSearchParams({ bbox: bounds, layer: "mapnik" });
    if (showMarker) query.set("marker", `${latitude},${longitude}`);
    return (
        <iframe
            title={showMarker ? "Peta lokasi ilustrasi kos" : "Peta kawasan kos"}
            src={`https://www.openstreetmap.org/export/embed.html?${query.toString()}`}
            style={{ width: "100%", height: "100%", minHeight: 300, border: 0 }}
            loading="lazy"
        />
    );
}
