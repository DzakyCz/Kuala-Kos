import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/types/property";
import { formatRupiah, availabilityLabel, periodPrice, periodSuffix, type RentPeriod } from "@/lib/kos";
import KosFacilities from "@/components/kos/KosFacilities";
import styles from "@/components/kos/KosCard.module.css";

export default function KosCard({ property, period = "monthly" }: { property: Property; period?: RentPeriod }) {
    const price = periodPrice(property, period);
    return <article className="card-house style-default hover-image" data-id={property.id}>
        <div className={`img-style mb_20 ${styles.photo}`}>
            <Image src={property.imgSrc} width={820} height={615} alt={`Ilustrasi bangunan ${property.title}`} sizes="(max-width: 767px) 92vw, (max-width: 1199px) 46vw, 410px" />
            <div className="wrap-tag d-flex gap_8 mb_12">
                <span className={`tag ${property.availableRooms ? "rent" : "sale"} text-button-small fw-6 text_primary-color`}>{availabilityLabel(property.availableRooms)}</span>
                <span className="tag categoreis text-button-small fw-6 text_primary-color">{property.categories}</span>
            </div>
            <Link href={`/property-details-2/${property.id}`} className="overlay-link" aria-label={`Lihat ${property.title}`} />
        </div>
        <div className="content">
            <h4 className="price mb_12">{price === undefined ? "Harga belum tersedia" : <>{formatRupiah(price)}<span className="text_secondary-color text-body-default">/{periodSuffix[period]}</span></>}</h4>
            <Link href={`/property-details-2/${property.id}`} className="title mb_8 h5 link text_primary-color">{property.title}</Link>
            <p className={styles.address}>{property.address}</p>
            <KosFacilities property={property} />
            <p className={styles.cost}>{property.electricityIncluded === undefined ? "Biaya listrik perlu dikonfirmasi" : property.electricityIncluded ? "Listrik termasuk biaya sewa" : "Biaya listrik terpisah"}</p>
        </div>
    </article>;
}
