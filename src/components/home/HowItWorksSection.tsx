import React from "react";

export default function HowItWorksSection() {
    return (
        <div className="section-process-1">
            <div
                className="parallaxie"
                style={{
                    background: 'url("/images/kos/section-banner-3.jpg")',
                }}
            >
                <div className="tf-container">
                    <div className="box scrolling-effect effectFade">
                        <div className="heading-section mb_32">
                            <span className="sub text-uppercase fw-6 text_secondary-color-2">
                                Cara Kerja
                            </span>
                            <h3>Langkah Mencari Kos</h3>
                        </div>
                        <div className="wrap-process">
                            <div className="process-item style-1">
                                <span className="number h5">01.</span>
                                <div className="content">
                                    <h5 className="mb_8">
                                        Temukan Pilihan Kos
                                    </h5>
                                    <p>
                                        Jelajahi pilihan kos sesuai lokasi dan kebutuhan Anda.
                                    </p>
                                </div>
                            </div>
                            <div className="process-item style-1">
                                <span className="number h5">02.</span>
                                <div className="content">
                                    <h5 className="mb_8">Hubungi Pengelola</h5>
                                    <p>
                                        Tanyakan ketersediaan dan jadwalkan kunjungan dengan pengelola.
                                    </p>
                                </div>
                            </div>
                            <div className="process-item style-1">
                                <span className="number h5">03.</span>
                                <div className="content">
                                    <h5 className="mb_8">Pilih Kos Anda</h5>
                                    <p>
                                        Pastikan informasi dan ketentuan sebelum menyewa kos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
