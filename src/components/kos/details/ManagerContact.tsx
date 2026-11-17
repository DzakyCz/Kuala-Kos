import type { Property } from "@/types/property";
import Link from "next/link";
export default function ManagerContact({property}: {property?: Property}) {
    return <><h5 className="mb_24">Hubungi Pengelola</h5><div className="author mb_28"><div className="author-info d-flex flex-column"><h6 className="mb_8">{property?.title ?? "Informasi Kos"}</h6><p className="mb_20">Tanyakan ketersediaan kamar, biaya masuk, dan waktu kunjungan sebelum menentukan pilihan.</p><p>{property?.address}</p></div></div><Link href="/contacts" className="tf-btn btn-bg-1 w-full"><span>Tanyakan Informasi Kos</span><span className="bg-effect" /></Link></>;
}
