import ServiceAreaMap from "@/components/maps/ServiceAreaMap";
import SiteLayout from "@/components/layout/SiteLayout";
import ContactForm from "@/components/contact/ContactForm";
import ContactPageHeading from "@/components/contact/ContactPageHeading";
import { getPublishedPropertySummary, parseIdParam } from "@/lib/property-queries";
import React from "react";

type PageProps = { searchParams: Promise<{ kos?: string | string[] }> };

export default async function page({ searchParams }: PageProps) {
    // /contacts?kos=3 -> pesan otomatis ditautkan ke kos nomor 3 (dari tombol "Tanyakan Informasi Kos").
    const { kos } = await searchParams;
    const kosId = parseIdParam(Array.isArray(kos) ? kos[0] : kos);
    const property = kosId === null ? null : await getPublishedPropertySummary(kosId);

    return (
        <SiteLayout>
            <ContactPageHeading />
            <div className="tf-container section-contact tf-spacing-1">
                <div className="map-box ">
                    <ServiceAreaMap />
                </div>
                <ContactForm property={property ?? undefined} />
            </div>
        </SiteLayout>
    );
}
