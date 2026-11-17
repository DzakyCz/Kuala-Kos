"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import type { Property } from "@/types/property";
import KosCard from "@/components/kos/KosCard";
import Link from "next/link";

export default function FeaturedKosSection({ properties }: { properties: Property[] }) {
    return <section className="section-features-property-4 tf-spacing-1 pt-0">
        <div className="tf-container">
            <div className="heading-section justify-content-center text-center mb_46">
                <span className="sub text-uppercase fw-6 text_secondary-color-2">Pilihan Kos</span>
                <h3>Kamar Nyaman untuk Keseharian Anda</h3>
                <p>Bandingkan lokasi, fasilitas, dan biaya bulanan dalam satu tempat.</p>
            </div>
            {properties.length === 0 && <p className="text-center mb_40" role="status">Belum ada kos yang ditayangkan.</p>}
            <div className="d-none d-md-block"><div className="tf-grid-layout lg-col-3 md-col-2">{properties.slice(0, 6).map(property => <KosCard key={property.id} property={property} />)}</div></div>
            <div className="d-md-none"><Swiper modules={[Pagination]} spaceBetween={15} slidesPerView={1} pagination={{ clickable: true }} style={{ paddingBottom: 40 }}>{properties.slice(0,6).map(property => <SwiperSlide key={property.id}><KosCard property={property} /></SwiperSlide>)}</Swiper></div>
            <Link href="/listing-topmap-grid" className="tf-btn btn-bg-1 mx-auto btn-px-32"><span>Lihat Semua Kos</span><span className="bg-effect" /></Link>
        </div>
    </section>;
}
