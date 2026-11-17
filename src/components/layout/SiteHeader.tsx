"use client";
import Image from "next/image";
import DesktopNav from "@/components/layout/DesktopNav";
import Link from "next/link";
import MobileNav from "@/components/layout/MobileNav";
import { useState } from "react";
import Offcanvas from "@/components/ui/Offcanvas";

export default function SiteHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return <>
        <header className="header style-default header-fixed"><div className="tf-container w-xxl"><div className="row"><div className="col-12"><div className="header-inner">
            <Link href="/" className="site-logo" aria-label="Kuala Kos, beranda"><Image src="/assets/images/logo/kos-logo.svg" alt="Kuala Kos" className="main-logo" width={222} height={48} priority /></Link>
            <DesktopNav />
            <div className="header-right d-flex align-items-center gap_20">
                <Link href="/login" className="link text-button text_primary-color">Masuk<span className="d-none d-sm-inline"> / Daftar</span></Link>
                <Link href="/contacts" className="tf-btn"><span>Hubungi Kami</span><span className="bg-effect" /></Link>
                <button type="button" className="mobile-button d-xl-none" onClick={() => setIsMenuOpen(true)} aria-label="Buka menu" aria-expanded={isMenuOpen} style={{background:"transparent",border:0,padding:0}}><span className="burger"><span /><span /><span /></span></button>
            </div>
        </div></div></div></div></header>
        <div className="mobile-nav-wrap"><Offcanvas isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
            <div className="offcanvas-header top-nav-mobile">
                <Link href="/" className="site-logo"><Image src="/assets/images/logo/kos-logo.svg" alt="Kuala Kos" width={193} height={44} /></Link>
                <button type="button" className="btn-close-menu" aria-label="Tutup menu" onClick={() => setIsMenuOpen(false)}><i className="icon-times-solid" /></button>
            </div>
            <div className="offcanvas-body inner-mobile-nav"><div className="mb-body"><MobileNav onNavigate={() => setIsMenuOpen(false)} /><div className="support">
                <Link href="/contacts" className="tf-btn"><span>Hubungi Kami</span><span className="bg-effect" /></Link>
                <p className="text-need">Butuh bantuan mencari atau menawarkan kos?</p>
                <p>Banda Aceh dan Aceh Besar</p>
            </div></div></div>
        </Offcanvas></div>
    </>;
}
