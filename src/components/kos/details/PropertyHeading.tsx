import type { Property } from "@/types/property";
import { availabilityLabel, formatRupiah, periodPrice, periodLabels, type RentPeriod } from "@/lib/kos";
import KosFacilities from "@/components/kos/KosFacilities";
export default function PropertyHeading({ property }: { property: Property }) {
    return <div>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap_12">
            <div><div className="wrap-tag d-flex gap_8 mb_12"><span className="tag rent text-button-small fw-6">{availabilityLabel(property.availableRooms)}</span><span className="tag categoreis text-button-small fw-6">{property.categories}</span></div><h4>{property.title}</h4></div>
            <h3 className="price">{formatRupiah(property.price)}<span className="text_secondary-color text-body-1">/bulan</span></h3>
        </div>
        <div className="mt_20" aria-label="Pilihan harga sewa"><p className="text-body-default mb_8">Pilihan harga sewa</p><div className="d-flex flex-wrap gap_16">{(["monthly", "sixMonths", "yearly"] as RentPeriod[]).map(period => { const price = periodPrice(property, period); return price === undefined ? null : <span key={period}>{periodLabels[period]}: <strong>{formatRupiah(price)}</strong></span>; })}</div></div>
        <div className="wrap-info d-flex justify-content-between align-items-end flex-wrap gap_20">
            <div><div className="text-body-default mb_12">Fasilitas utama</div><KosFacilities property={property} /></div>
            <div className="location"><div className="text-body-default mb_12">Lokasi</div><h6 className="d-flex align-items-center gap_8"><i className="icon-MapPin" />{property.address}</h6></div>
        </div>
    </div>;
}
