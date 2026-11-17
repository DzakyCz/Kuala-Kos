import Image from "next/image";
import React from "react";

export default function LocationsSection() {
    return (
        <div className="section-location tf-spacing-1">
            <div className="tf-container">
                <div className="heading-section justify-content-center text-center mb_48">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
                        Kawasan Pilihan
                    </span>
                    <h3 className="split-text effect-blur-fade">
                        Cari Kos di Kawasan Pilihan
                    </h3>
                </div>
                <div className="wrap-location">
                    <div className="tf-grid-layout lg-col-2">
                        <div className="d-flex gap_30">
                            <div
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.2"
                            >
                                <a href={"/listing-topmap-grid?city=" + encodeURIComponent("Kopelma Darussalam")} className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/images/kos/home-home-1.jpg"
                                        alt="Ilustrasi hunian di kawasan pilihan"
                                        style={{objectFit:"cover",width:"100%",height:"auto",aspectRatio:"1"}}
                                        sizes="(max-width: 767px) 46vw, 630px"
                                    />
                                </a>
                                <div className="content">
                                    <a
                                        href={"/listing-topmap-grid?city=" + encodeURIComponent("Kopelma Darussalam")}
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                        Kopelma Darussalam
                                    </a>
                                    <p>2 pilihan kos</p>
                                </div>
                            </div>
                            <div
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.3"
                            >
                                <a href={"/listing-topmap-grid?city=" + encodeURIComponent("Rukoh")} className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/images/kos/home-home-2.jpg"
                                        alt="Ilustrasi hunian di kawasan pilihan"
                                        style={{objectFit:"cover",width:"100%",height:"auto",aspectRatio:"1"}}
                                        sizes="(max-width: 767px) 46vw, 630px"
                                    />
                                </a>
                                <div className="content">
                                    <a
                                        href={"/listing-topmap-grid?city=" + encodeURIComponent("Rukoh")}
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                        Rukoh
                                    </a>
                                    <p>2 pilihan kos</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="location-item hover-image scrolling-effect effectFade"
                            data-delay="0.4"
                        >
                            <a href={"/listing-topmap-grid?city=" + encodeURIComponent("Tungkop")} className="img-style mb_18">
                                <Image
                                    width={630}
                                    height={300}
                                    src="/images/kos/home-home-3.jpg"
                                    alt="Ilustrasi hunian di kawasan pilihan"
                                        style={{objectFit:"cover",width:"100%",height:"auto",aspectRatio:"2.1"}}
                                        sizes="(max-width: 767px) 46vw, 630px"
                                />
                            </a>
                            <div className="content">
                                <a
                                    href={"/listing-topmap-grid?city=" + encodeURIComponent("Tungkop")}
                                    className="mb_4 link h5 text_primary-color"
                                >
                                    Tungkop
                                </a>
                                <p>2 pilihan kos</p>
                            </div>
                        </div>
                    </div>
                    <div className="tf-grid-layout lg-col-2">
                        <div
                            className="location-item hover-image scrolling-effect effectFade"
                            data-delay="0.4"
                        >
                            <a href={"/listing-topmap-grid?city=" + encodeURIComponent("Lamnyong")} className="img-style mb_18">
                                <Image
                                    width={630}
                                    height={300}
                                    src="/images/kos/home-home-4.jpg"
                                    alt="Ilustrasi hunian di kawasan pilihan"
                                        style={{objectFit:"cover",width:"100%",height:"auto",aspectRatio:"2.1"}}
                                        sizes="(max-width: 767px) 46vw, 630px"
                                />
                            </a>
                            <div className="content">
                                <a
                                    href={"/listing-topmap-grid?city=" + encodeURIComponent("Lamnyong")}
                                    className="mb_4 link h5 text_primary-color"
                                >
                                    Lamnyong
                                </a>
                                <p>2 pilihan kos</p>
                            </div>
                        </div>
                        <div className="d-flex gap_30">
                            <div
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.3"
                            >
                                <a href={"/listing-topmap-grid?city=" + encodeURIComponent("Tanjung Selamat")} className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/images/kos/home-home-5.jpg"
                                        alt="Ilustrasi hunian di kawasan pilihan"
                                        style={{objectFit:"cover",width:"100%",height:"auto",aspectRatio:"1"}}
                                        sizes="(max-width: 767px) 46vw, 630px"
                                    />
                                </a>
                                <div className="content">
                                    <a
                                        href={"/listing-topmap-grid?city=" + encodeURIComponent("Tanjung Selamat")}
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                        Tanjung Selamat
                                    </a>
                                    <p>2 pilihan kos</p>
                                </div>
                            </div>
                            <div
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.2"
                            >
                                <a href={"/listing-topmap-grid?city=" + encodeURIComponent("Limpok")} className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/images/kos/home-home-6.jpg"
                                        alt="Ilustrasi hunian di kawasan pilihan"
                                        style={{objectFit:"cover",width:"100%",height:"auto",aspectRatio:"1"}}
                                        sizes="(max-width: 767px) 46vw, 630px"
                                    />
                                </a>
                                <div className="content">
                                    <a
                                        href={"/listing-topmap-grid?city=" + encodeURIComponent("Limpok")}
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                        Limpok
                                    </a>
                                    <p>2 pilihan kos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
