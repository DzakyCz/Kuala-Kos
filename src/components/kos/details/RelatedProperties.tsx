"use client";
import type { Property } from "@/types/property";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import KosCard from "@/components/kos/KosCard";
import "swiper/css";
import "swiper/css/pagination";
export default function RelatedProperties({ properties }: { properties: Property[] }) {
    if (properties.length === 0) return null;
    return <section className="tf-container sw-layout tf-spacing-1 pt-0">
        <div className="heading-section mb_48"><h3>Pilihan Kos Lainnya</h3></div>
        <Swiper modules={[Pagination]} pagination={{clickable:true}} spaceBetween={24} breakpoints={{0:{slidesPerView:1},768:{slidesPerView:2},1200:{slidesPerView:3}}} style={{paddingBottom:40}}>
            {properties.slice(0,6).map(property => <SwiperSlide key={property.id}><KosCard property={property} /></SwiperSlide>)}
        </Swiper>
    </section>;
}
