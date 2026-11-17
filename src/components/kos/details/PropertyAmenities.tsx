import type { Property } from "@/types/property";

export default function PropertyAmenities({ property, features = [] }: { property?: Property; features?: string[] }) {
    const room = property?.roomFacilities ?? [];
    const shared = property?.sharedFacilities ?? [];
    const groups = property && (property.roomFacilities || property.sharedFacilities || property.rules)
        ? [
            { title: "Fasilitas Kamar", items: [...(property.bathroomType === "Dalam" ? ["Kamar Mandi Dalam"] : []), ...room] },
            { title: "Fasilitas Bersama", items: shared },
            { title: "Aturan dan Akses", items: property.rules ?? [] },
        ]
        : [{ title: "Fasilitas Kos", items: property?.features ?? features }];
    const visible = groups.filter(group => group.items.length > 0);
    return <><h5 className="properties-title mb_20">Fasilitas Kos</h5><div className="tf-grid-layout md-col-3">{visible.map(group => <div className="col-utility" key={group.title}>
        <h6 className="mb_16">{group.title}</h6>{group.items.map(item => <div className="item d-flex justify-content-between" key={item}><div className="d-flex align-items-center gap_8 text-body-default text_primary-color"><i className={item === "Wi-Fi" ? "icon-WifiHigh" : "icon-HouseSimple"} />{item}</div><span className="text-button text_primary-color">Ada</span></div>)}
    </div>)}</div>{visible.length === 0 && <p>Informasi fasilitas belum tersedia.</p>}</>;
}
