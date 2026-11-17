import React from "react";
import PropertyLocationMap from "@/components/maps/PropertyLocationMap";

type Property = {
    id: number;
    imgSrc: string;
    alt?: string;
    address: string;
    title: string;
    beds?: number;
    baths?: number;
    sqft?: number;
    categories: string;
    type: string;
    lat?: number;
    long?: number;
    price: number;
    coordinates: [number, number];
    garages: number;
    city: string;
};

export default function PropertyLocation({ property }: { property: Property }) {
    return (
        <>
            <h5 className="properties-title mb_20">Lokasi Kos</h5>
            <div className="heading d-flex align-items-center justify-content-between flex-wrap gap_12 mb_16">
                <div className=" d-flex align-items-center gap_4 text-button fw-7 text_primary-color flex-wrap">
                    <i className="icon-MapPin"></i>{property.address}
                </div>
                <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${property.coordinates[1]},${property.coordinates[0]}`}
                    className="hover-underline-link text-button fw-7 text_primary-color"
                >
                    Petunjuk Arah
                </a>
            </div>
            <div className="wrap-map">
                <PropertyLocationMap
                    property={{
                        ...property,
                        lat: property.lat ?? property.coordinates?.[1] ?? 0,
                        long: property.long ?? property.coordinates?.[0] ?? 0,
                    }}
                />
            </div>
        </>
    );
}
