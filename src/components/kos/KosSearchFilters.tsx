"use client";
import { useId, useState } from "react";
import { budgetOptionsByPeriod, cityOptions } from "@/data/filter-options";
import { periodLabels, type RentPeriod } from "@/lib/kos";
import { activeKosFilters, kosTypes, type KosFilters } from "@/lib/kos-search";
import styles from "@/components/kos/KosSearchFilters.module.css";
import KosSelect from "@/components/ui/KosSelect";
import FacilityDialog from "@/components/kos/FacilityDialog";

export default function KosSearchFilters({filters,onChange,onSearch}:{filters:KosFilters;onChange:(filters:KosFilters)=>void;onSearch:()=>void}) {
    const id=useId();
    const [open,setOpen]=useState(false);
    const count=activeKosFilters(filters).filter(item=>!["keyword","city","kosType","budget","period"].includes(item.key)).length;
    const update=(patch:Partial<KosFilters>)=>onChange({...filters,...patch});
    const select=(label:string,key:"city"|"kosType"|"budget",options:string[])=><KosSelect id={`${id}-${key}`} name={key} label={label} value={filters[key]} options={options} onChange={value=>update({[key]:value})} />;
    return <div className="flat-tab flat-tab-form">
        <div className="wg-filter"><form action="/listing-topmap-grid" method="get" onSubmit={event=>{event.preventDefault();onSearch();}}>
            <div className="form-title"><div className={`wrap-fill tf-grid-layout md-col-2 ${styles.fields}`}>
                <div><label htmlFor={`${id}-keyword`} className="text-button text_primary-color mb_8">Cari Kos</label><input type="text" className={styles.keyword} id={`${id}-keyword`} name="keyword" placeholder="Nama kos atau kawasan" value={filters.keyword} maxLength={200} onChange={event=>update({keyword:event.target.value})} /></div>
                {select("Lokasi","city",cityOptions)}{select("Tipe Kos","kosType",kosTypes)}
                <KosSelect id={`${id}-period`} label="Periode Sewa" value={filters.period} options={(Object.keys(periodLabels) as RentPeriod[]).map(value => ({value,label:periodLabels[value]}))} onChange={value => update({period:value as RentPeriod,budget:"Semua Harga",minPrice:null,maxPrice:null})} />
                {select("Harga","budget",budgetOptionsByPeriod[filters.period])}
            </div><div className={`wrap-btn ${styles.actions}`}>
                <button type="button" className={styles.filtersButton} aria-haspopup="dialog" aria-expanded={open} onClick={()=>setOpen(true)}><i className="icon-Faders" aria-hidden="true" /><span>Fasilitas &amp; Aturan</span>{count>0&&<span className={styles.count} aria-label={`${count} filter aktif`}>{count}</span>}</button>
                <button type="submit" className="tf-btn btn-px-28 btn-bg-1"><span>Cari</span><span className="bg-effect" /></button>
            </div></div>
        </form></div>
        <FacilityDialog open={open} filters={filters} onClose={()=>setOpen(false)} onApply={onChange} />
    </div>;
}
