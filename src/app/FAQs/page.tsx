import SiteLayout from "@/components/layout/SiteLayout";
import PageHeading from "@/components/ui/PageHeading";
const items=[
    ["Bagaimana cara mencari kos?","Buka Cari Kos, lalu pilih kawasan, tipe kos, dan biaya bulanan. Gunakan pilihan tambahan untuk membandingkan fasilitas."],
    ["Apa arti kamar mandi dalam dan bersama?","Kamar mandi dalam berada di dalam kamar. Kamar mandi bersama digunakan bersama penghuni lain; pastikan letak dan ketentuannya kepada pengelola."],
    ["Apakah biaya listrik termasuk sewa?","Setiap kos memiliki ketentuan berbeda. Periksa informasi biaya listrik dan tanyakan pula biaya air, uang jaminan, serta biaya tambahan lainnya."],
    ["Bagaimana memastikan informasi kos sebelum menyewa?","Konfirmasikan ketersediaan, fasilitas, biaya, dan ketentuan langsung kepada pengelola. Jadwalkan kunjungan untuk melihat kondisi kamar."],
    ["Bagaimana cara menawarkan kos?","Hubungi kami melalui halaman Kontak untuk membahas pendataan. Fitur akun pemilik dan pengelolaan kos sedang disiapkan."],
    ["Apakah bisa memesan dan membayar melalui situs?","Pemesanan dan pembayaran belum tersedia. Alur layanan masih dalam tahap pengembangan."],
];
export default function Page(){return <SiteLayout><PageHeading title="Pertanyaan Umum" /><section className="tf-container tf-spacing-1"><div style={{maxWidth:850,margin:"0 auto"}}>{items.map(([question,answer])=><details key={question} style={{padding:22,border:"1px solid #dce2dd",borderRadius:12,marginBottom:16}}><summary style={{fontWeight:600,cursor:"pointer"}}>{question}</summary><p style={{marginTop:16,lineHeight:1.8}}>{answer}</p></details>)}</div></section></SiteLayout>;}
