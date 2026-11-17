"use client";
import Image from "next/image";
import { properties } from "@/data/properties";
import Link from "next/link";
import React, { useState, useRef } from "react";

const propertiesData = properties.slice(0, 5).map((property) => ({
    id: `tab${property.id}`,
    propertyId: property.id,
    title: property.title,
    address: property.address,
    img: property.imgSrc,
}));

export default function KosShowcaseSection() {
    const [activeTab, setActiveTab] = useState("tab1");
    const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = (tabId: string) => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        hoverTimer.current = setTimeout(() => {
            setActiveTab(tabId);
        }, 100);
    };

    const handleMouseLeave = () => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };

    return (
        <div className="section-features-property tf-spacing-1">
            <div className="tf-container">
                <div className="tf-grid-layout lg-col-2 tabs-hover-wrap align-items-center">
                    <div className="box">
                        {propertiesData.map((property) => (
                            <div
                                key={property.id}
                                className={`process-item item scrolling-effect effectLeft${
                                    activeTab === property.id ? " active" : ""
                                }`}
                                data-tab={property.id}
                                onMouseEnter={() =>
                                    handleMouseEnter(property.id)
                                }
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="property-item">
                                    <div className="dots"></div>
                                    <div className="content">
                                        <h4 className="title mb_8">
                                            <Link
                                                href={`/property-details-2/${property.propertyId}`}
                                                className="link"
                                            >
                                                {property.title}
                                            </Link>
                                        </h4>
                                        <p>{property.address}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="tab-content-wrap">
                        {propertiesData.map((property) => (
                            <div
                                key={property.id}
                                id={property.id}
                                className={`tab-content${
                                    activeTab === property.id ? " active" : ""
                                }`}
                            >
                                <Link href={`/property-details-2/${property.propertyId}`} className="img-style">
                                    <Image
                                        src={property.img}
                                        width={645}
                                        height={645}
                                        alt={`Ilustrasi bangunan ${property.title}`}
                                        sizes="(max-width: 767px) 92vw, 645px"
                                        style={{width:"100%",height:"auto",aspectRatio:"1",objectFit:"cover"}}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
