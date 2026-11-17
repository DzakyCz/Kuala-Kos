import ServiceAreaMap from "@/components/maps/ServiceAreaMap";
import SiteLayout from "@/components/layout/SiteLayout";
import ContactForm from "@/components/contact/ContactForm";
import ContactPageHeading from "@/components/contact/ContactPageHeading";
import React from "react";

export default function page() {
    return (
        <SiteLayout>
            <ContactPageHeading />
            <div className="tf-container section-contact tf-spacing-1">
                <div className="map-box ">
                    <ServiceAreaMap />
                </div>
                <ContactForm />
            </div>
        </SiteLayout>
    );
}
