import { footerSections } from "@/data/footer";
import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
    return <footer className="footer"><div className="tf-container">
        <div className="footer-body"><div className="row">
            <div className="col-lg-4 col-md-6"><div className="footer-about footer-item">
                <Link href="/" className="footer-logo mb_17"><Image src="/assets/images/logo/kos-logo-light.svg" alt="Kuala Kos" width={222} height={48} /></Link>
                <p className="text_color-1 mb_16">Temukan kamar kos berdasarkan lokasi, fasilitas, dan biaya bulanan yang sesuai.</p>
                <p className="text_white">Banda Aceh dan Aceh Besar</p>
            </div></div>
            <div className="col-lg-4 col-md-6"><div className="footer-content footer-item d-flex justify-content-between">
                {footerSections.map(section => <div key={section.className}><h6 className="footer-heading text-title text_white mb_16">{section.heading}</h6><ul className="footer-menu-list d-grid gap_12">{section.links.map(link => <li key={link.href} className="text-body-default text_color-1"><Link href={link.href} className="link">{link.label}</Link></li>)}</ul></div>)}
            </div></div>
            <div className="col-lg-4"><div className="footer-item"><h6 className="footer-heading text-title text_white mb_16">Punya Kos untuk Ditawarkan?</h6><p className="text_color-1 mb_20">Kenalkan kos Anda kepada calon penghuni. Hubungi kami untuk membahas pendataan kos.</p><Link href="/contacts" className="tf-btn"><span>Hubungi Kami</span><span className="bg-effect" /></Link></div></div>
        </div></div>
        <div className="footer-bottom d-flex align-items-center justify-content-between"><p className="text_muted-color">Hak cipta 2026 Kuala Kos.</p><Link href="/privacy-policy" className="text_white">Kebijakan Privasi</Link></div>
    </div></footer>;
}
