"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import HomeSearch from "@/components/home/HomeSearch";
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="page-title style-1 sw-layout">
            <div className="tf-container w-1830">
                <div className="content">
                    <h1 className="title split-text split-lines-rotation-x">
                        Temukan Kos <br /> yang Sesuai
                    </h1>
                    <div>
                        <p className="h6 text_secondary-color mb_12 split-text split-lines-transform">
                            Cari kamar kos di Banda Aceh dan Aceh Besar sesuai kebutuhan Anda.
                        </p>
                        <p className="h6 text_secondary-color mb_24 split-text split-lines-transform">
                            Bandingkan lokasi, fasilitas, dan biaya bulanan sebelum menghubungi pengelola.
                        </p>
                        <Link
                            href={"/listing-topmap-grid"}
                            className="tf-btn btn-px-32 btn-bg-1"
                        >
                            <span>Lihat Pilihan Kos</span>
                            <span className="bg-effect"></span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="thumbs effect-content-slide">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                        nextEl: ".nav-next-layout",
                        prevEl: ".nav-prev-layout",
                    }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    spaceBetween={10}
                    loop={true}
                    className="swiper"
                >
                    <SwiperSlide>
                        <div className="slide-inner effect-img-zoom ">
                            <Image
                                className="img-zoom"
                                src="/images/kos/page-title-page-title-2.jpg"
                                width={1920}
                                height={680}
                                alt="Ilustrasi hunian nyaman"
                                sizes="100vw"
                                priority
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide-inner effect-img-zoom ">
                            <Image
                                className="img-zoom"
                                src="/images/kos/page-title-page-title-3.jpg"
                                width={1920}
                                height={680}
                                alt="Ilustrasi hunian nyaman"
                                sizes="100vw"
                                priority
                            />
                        </div>
                    </SwiperSlide>
                    <div className="sw-button nav-prev-layout">
                        <i className="icon-CaretLeft"></i>
                    </div>
                    <div className="sw-button nav-next-layout">
                        <i className="icon-CaretRight"></i>
                    </div>
                </Swiper>
            </div>

            <HomeSearch />
        </div>
    );
}
