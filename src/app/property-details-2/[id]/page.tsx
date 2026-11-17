import SiteLayout from "@/components/layout/SiteLayout";
import PropertyDetails from "@/components/kos/details/PropertyDetails";
import RelatedProperties from "@/components/kos/details/RelatedProperties";
import { allProperties } from "@/data/properties";
import React from "react";
import { notFound } from "next/navigation";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    const property = allProperties.find((elm) => String(elm.id) === id);
    if (!property) notFound();

    return (
        <SiteLayout>
            <PropertyDetails property={property} />
            <RelatedProperties />
        </SiteLayout>
    );
}

export async function generateStaticParams() {
    return allProperties.map((property) => ({
        id: String(property.id),
    }));
}
