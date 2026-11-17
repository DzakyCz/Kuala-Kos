import Image from "next/image";
import Link from "next/link";
export default function RentalGuideSection() {
    return <section className="section-testimonials tf-spacing-1"><div className="tf-container"><div className="row align-items-center">
        <div className="col-lg-6"><span className="sub text-uppercase">Pilihan yang Lebih Terarah</span><h3 className="mb_24">Pahami Kos Sebelum Memilih</h3><p className="mb_20">Perhatikan fasilitas kamar, biaya tambahan, aturan penghuni, dan akses lingkungan sebelum menentukan pilihan.</p><p className="mb_24">Hubungi pengelola untuk memastikan kamar masih tersedia dan mengatur waktu kunjungan.</p><Link href="/listing-topmap-grid" className="tf-btn btn-bg-1"><span>Jelajahi Pilihan Kos</span><span className="bg-effect" /></Link></div>
        <div className="col-lg-6"><Image src="/images/kos/section-properties-gallery-1.jpg" alt="Ilustrasi interior hunian" width={635} height={635} sizes="(max-width: 767px) 92vw, 600px" style={{width:"100%",height:"auto",aspectRatio:"1",objectFit:"cover",borderRadius:16}} /></div>
    </div></div></section>;
}
