import Link from 'next/link'
import React from 'react'

export default function AboutIntro() {
  return (
    <>
         <div id="tentang-kami" className="section-about-1 tf-spacing-1">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="heading-section mb_20">
                                <span
                                    className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">Tentang Kami</span>
                                <h3 className="split-text effect-blur-fade">Membantu Anda Menemukan Kos yang Tepat</h3>
                            </div>
                            <p className="text-body-2 split-text split-lines-transform">Kami membantu pencari kos menemukan tempat tinggal yang sesuai, sekaligus memudahkan pemilik kos menjangkau calon penghuni.</p>
                            <Link href={'/listing-topmap-grid'} className="tf-btn btn-bg-1 btn-px-32">
                                <span>Lihat Pilihan Kos</span>
                                <span className="bg-effect"></span>
                            </Link>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <ul className="list">
                                <li className="d-flex gap_20 scrolling-effect effectRight">
                                    <span className="h4 number">01.</span>
                                    <div className="content">
                                        <h5 className="mb_8">Cari Kos</h5>
                                        <p>Temukan pilihan kos berdasarkan lokasi dan kebutuhan Anda.</p>
                                    </div>
                                </li>
                                <li className="d-flex gap_20 scrolling-effect effectRight">
                                    <span className="h4 number">02.</span>
                                    <div className="content">
                                        <h5 className="mb_8">Kenali Fasilitas</h5>
                                        <p>Lihat informasi dan fasilitas sebelum memilih tempat tinggal.</p>
                                    </div>
                                </li>
                                <li className="d-flex gap_20 scrolling-effect effectRight">
                                    <span className="h4 number">03.</span>
                                    <div className="content">
                                        <h5 className="mb_8">Untuk Pemilik Kos</h5>
                                        <p>Hubungi kami untuk informasi tentang kerja sama dan pengelolaan kos.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}
