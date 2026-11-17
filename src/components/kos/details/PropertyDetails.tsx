import React from "react";
import NeighborhoodChecklist from "@/components/kos/details/NeighborhoodChecklist";
import type { Property } from "@/types/property";
import PropertyHeading from "@/components/kos/details/PropertyHeading";
import Image from "next/image";
import PropertyDescription from "@/components/kos/details/PropertyDescription";
import PropertyOverview from "@/components/kos/details/PropertyOverview";
import PropertyAmenities from "@/components/kos/details/PropertyAmenities";
import PropertyTabs from "@/components/kos/details/PropertyTabs";
import RentalCalculator from "@/components/kos/details/RentalCalculator";
import ManagerContact from "@/components/kos/details/ManagerContact";
import RouteCard from "@/components/kos/details/RouteCard";


export default function PropertyDetails({ property }: { property: Property }) {
    return (
        <>
            <div className="properties-details tf-spacing-1">
                <div className="tf-container">
                    <div className="properties-title v2">
                        <PropertyHeading property={property} />
                    </div>
                    <div className="tf-spacing-8">
                        <div className="properties-thumbs ">
                            <Image
                                width={1290}
                                height={680}
                                src="/images/kos/section-properties-details-4.jpg"
                                alt={`Ilustrasi hunian ${property.title}`}
                                sizes="(max-width: 1290px) 94vw, 1290px"
                                style={{width:"100%",height:"auto",aspectRatio:"1290/680",objectFit:"cover"}}
                                priority
                            />
                        </div>
                    </div>
                    <div className="row wrap-properties">
                        <div className="col-lg-6">
                            <PropertyDescription property={property} />
                        </div>
                        <div className="col-lg-5 offset-xl-1">
                            <div className="properties-overview v2">
                                <PropertyOverview property={property} />
                            </div>
                        </div>
                    </div>
                    <div className="properties-utility v2 tf-spacing-8">
                        <PropertyAmenities property={property} />
                    </div>
                    <div className="properties-menutab">
                        <PropertyTabs property={property} />
                    </div>
                    <div className="tf-spacing-8"><RouteCard key={property.id} origin={property.coordinates} /></div>
                    <div className="properties-calculator tf-spacing-8">
                        <RentalCalculator key={property.id} property={property} />
                    </div>
                    <div className="properties-nearby tf-spacing-8 pt-0">
                        <NeighborhoodChecklist />
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-5">
                            <div className="box-sellers style-1">
                                <ManagerContact property={property} />
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-7">
                            <div className="properties-comment">
                                <h5 className="mb_20">Sebelum Menyewa</h5><ul className="d-grid gap_16"><li>Pastikan fasilitas kamar sesuai kebutuhan.</li><li>Tanyakan biaya listrik, air, deposit, dan biaya tambahan.</li><li>Periksa aturan tamu, jam akses, serta ketentuan penghuni.</li><li>Jadwalkan kunjungan dan lihat kondisi kamar secara langsung.</li></ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
