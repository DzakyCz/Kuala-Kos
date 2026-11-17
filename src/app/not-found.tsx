import SiteLayout from "@/components/layout/SiteLayout";
import Link from "next/link";

export default function NotFound() {
    return <SiteLayout><section className="tf-container tf-spacing-1 text-center">
        <h2 className="mb_20">Halaman tidak ditemukan</h2>
        <p className="mb_24">Alamat yang Anda cari tidak tersedia. Silakan lihat pilihan kos lainnya.</p>
        <Link href="/listing-topmap-grid" className="tf-btn btn-bg-1"><span>Cari Kos</span><span className="bg-effect" /></Link>
    </section></SiteLayout>;
}
