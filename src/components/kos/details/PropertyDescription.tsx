import type { Property } from "@/types/property";
export default function PropertyDescription({property}: {property?: Property}) {
    return <div><h5 className="properties-title mb_20">Tentang Kos</h5><p className="mb_8 text-body-2">{property?.description ?? "Bandingkan fasilitas kamar, biaya bulanan, dan ketentuan penghuni sebelum menentukan pilihan."}</p><p className="mb_20 text-body-2">Pastikan ukuran kamar, kondisi fasilitas, dan biaya tambahan langsung kepada pengelola sebelum menyewa.</p></div>;
}
