import SiteLayout from "@/components/layout/SiteLayout";
import PropertyDetails from "@/components/kos/details/PropertyDetails";
import RelatedProperties from "@/components/kos/details/RelatedProperties";
import { getPublishedProperty, getRelatedProperties, parseIdParam } from "@/lib/property-queries";
import React from "react";
import { notFound } from "next/navigation";

// Data dibaca dari database pada setiap permintaan (kos baru/ubahan langsung tampil).
export const dynamic = "force-dynamic";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function Page({ params }: PageProps) {
    const { id: rawId } = await params;
    const id = parseIdParam(rawId);
    if (id === null) notFound();

    const property = await getPublishedProperty(id);
    if (!property) notFound();
    const related = await getRelatedProperties(id, 6);

    return (
        <SiteLayout>
            <PropertyDetails property={property} />
            <RelatedProperties properties={related} />
        </SiteLayout>
    );
}
