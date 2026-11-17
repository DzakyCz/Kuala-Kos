import type { Property } from "@/types/property";
export default function PropertyOverview({property}: {property?: Property}) {
    const shared = property?.sharedFacilities ?? property?.features ?? [];
    const parking = [shared.includes("Parkir Motor") && "Motor", shared.includes("Parkir Mobil") && "mobil"].filter(Boolean).join(" dan ") || "Tidak tercantum";
    const security = [shared.includes("Pagar") && "Berpagar", shared.includes("CCTV") && "CCTV", shared.includes("Penjaga Kos") && "penjaga kos"].filter(Boolean).join(", ") || "Tidak tercantum";
    const items = [
        ["icon-HouseSimple", "Jenis Kos", property?.categories ?? "Kos"],
        ["icon-Ruler", "Ukuran Kamar", property?.roomWidth && property.roomLength ? `${property.roomWidth} × ${property.roomLength} m (${property.sqft} m²)` : "Konfirmasi pengelola"],
        ["icon-Shower", "Kamar Mandi", property?.bathroomType === "Dalam" ? "Di dalam kamar" : property?.bathroomType === "Luar/Bersama" ? "Bersama" : "Belum diketahui"],
        ["icon-Warehouse", "Parkir", parking],
        ["icon-HouseLine", "Kawasan", property?.city ?? "Konfirmasi pengelola"],
        ["icon-SolarPanel", "Biaya Listrik", property?.electricityIncluded === undefined ? "Belum diketahui" : property.electricityIncluded ? "Termasuk sewa" : "Bayar terpisah"],
        ["icon-Bed", "Ketersediaan", property?.availableRooms === undefined ? "Belum diketahui" : property.availableRooms > 0 ? `${property.availableRooms} kamar tersedia` : "Kamar penuh"],
        ["icon-SecurityCamera", "Keamanan", security],
    ];
    return <><h5 className="properties-title mb_20">Informasi Kamar</h5><div className="wrap-overview">{items.map(([icon,label,value]) => <div className="item d-flex gap_16" key={label}><i className={`icon ${icon}`} /><div className="d-flex flex-column gap"><span className="text-body-default">{label}</span><span className="text-title fw-6 text_primary-color">{value}</span></div></div>)}</div></>;
}
