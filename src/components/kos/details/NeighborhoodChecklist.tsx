export default function NeighborhoodChecklist() {
    const groups=[["Warung makan","Minimarket","Laundry"],["Masjid atau musala","Apotek","Akses transportasi"],["Akses jalan","Tempat parkir","Lingkungan sekitar"]];
    return <><h5 className="properties-title mb_20">Periksa Lingkungan Sekitar</h5><p className="text-body-2">Saat berkunjung, periksa akses dan fasilitas di sekitar kos sesuai aktivitas sehari-hari Anda.</p><div className="wrap">{groups.map((items,index)=><ul key={index} className="col-nearby d-flex flex-column gap_8">{items.map(item=><li key={item}><span className="text-body-default">{item}</span></li>)}</ul>)}</div></>;
}
