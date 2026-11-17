import SiteLayout from "@/components/layout/SiteLayout";
import KosListing from "@/components/kos/KosListing";
import React from "react";


export default function page() {
    return (
        <SiteLayout>
            <KosListing />
        </SiteLayout>
    );
}
