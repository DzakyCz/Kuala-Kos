import type { Metadata } from "next";
import Link from "next/link";
import AboutIntro from "@/components/about/AboutIntro";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeading from "@/components/ui/PageHeading";
import styles from "./page.module.css";

export const metadata: Metadata = {
    title: "Tentang Kami | Kuala Kos",
    description: "Kenali Kuala Kos, platform pencarian kos untuk Banda Aceh dan Aceh Besar yang membantu Anda membandingkan lokasi, fasilitas, dan biaya sewa.",
};

export default function AboutPage() {
    return (
        <SiteLayout>
            <PageHeading title="Tentang Kami" />
            <AboutIntro />
            <section className={`tf-container ${styles.section}`} aria-labelledby="about-area-title">
                <div className={styles.panel}>
                    <div>
                        <span className="sub text-uppercase text_secondary-color-2">Lebih Dekat dengan Kebutuhan Anda</span>
                        <h3 id="about-area-title">Berawal dari Banda Aceh dan Aceh Besar</h3>
                        <p>Kuala Kos berfokus pada informasi hunian di Banda Aceh dan Aceh Besar. Kami ingin memudahkan Anda mengenali pilihan kos, membandingkan biaya sewa, dan memahami fasilitas sebelum menentukan tempat tinggal.</p>
                        <p>Untuk pemilik kos, kami membuka kesempatan pendataan agar informasi hunian dapat dikenalkan kepada calon penghuni.</p>
                    </div>
                    <div className={styles.note}>
                        <i className="icon-HouseLine" aria-hidden="true" />
                        <h5>Kenali sebelum memilih</h5>
                        <p>Pastikan ketersediaan kamar, kondisi fasilitas, biaya tambahan, dan aturan sewa langsung kepada pengelola. Kunjungi kos sebelum mengambil keputusan.</p>
                    </div>
                </div>
                <div className={styles.contact}>
                    <div>
                        <h4>Punya Pertanyaan atau Ingin Mengenalkan Kos?</h4>
                        <p>Pelajari informasi layanan dan pendataan kos melalui halaman kontak kami.</p>
                    </div>
                    <Link href="/contacts" className="tf-btn btn-bg-1"><span>Hubungi Kami</span><span className="bg-effect" /></Link>
                </div>
            </section>
        </SiteLayout>
    );
}
