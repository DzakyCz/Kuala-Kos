import type { Property } from "@/types/property";
export default function RoomDimensions({property}: {property?: Property}) {
    return <div><h5 className="properties-title mb_20">Ukuran Satu Kamar</h5><p className="text-body-2 mb_20">Ukuran kamar: <strong>{property?.roomWidth ?? 3} × {property?.roomLength ?? 3} meter</strong>. Konfirmasikan pengukuran kamar dan kamar mandi kepada pengelola.</p><div style={{maxWidth:360,padding:24,border:"2px solid #c4d0c0",borderRadius:12,background:"#f3f6ef",textAlign:"center",aspectRatio:`${property?.roomWidth ?? 3}/${property?.roomLength ?? 3}`,display:"grid",placeItems:"center"}}><div><i className="icon-Bed" style={{fontSize:40}} /><h6>Satu kamar kos</h6><p>{property?.sqft ?? 9} m²</p></div></div></div>;
}
