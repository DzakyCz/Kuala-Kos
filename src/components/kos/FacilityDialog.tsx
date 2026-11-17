"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useId, useState } from "react";
import { bathroomTypes, defaultKosFilters, electricityOptions, facilityGroups, type KosFilters } from "@/lib/kos-search";
import KosSelect from "@/components/ui/KosSelect";
import styles from "@/components/kos/FacilityDialog.module.css";

export default function FacilityDialog({ open, filters, onClose, onApply }: {
    open: boolean; filters: KosFilters; onClose: () => void; onApply: (value: KosFilters) => void;
}) {
    const id = useId();
    const [draft, setDraft] = useState<KosFilters>(filters);
    useEffect(() => { if (open) setDraft({ ...filters, features: [...filters.features] }); }, [open, filters]);
    const update = (patch: Partial<KosFilters>) => setDraft(current => ({ ...current, ...patch }));
    const invalidPrice = draft.minPrice !== null && draft.maxPrice !== null && draft.minPrice > draft.maxPrice;
    const numberInput = (key: "minPrice" | "maxPrice", value: string) => {
        const parsed = value === "" ? null : Number(value);
        update({ [key]: parsed !== null && Number.isFinite(parsed) ? Math.min(999999999, Math.max(0, Math.floor(parsed))) : null });
    };
    return <Dialog open={open} onClose={onClose} className={styles.dialog}>
        <DialogBackdrop className={styles.backdrop} />
        <div className={styles.position}>
            <DialogPanel className={styles.panel}>
                <div className={styles.header}>
                    <div><DialogTitle className={styles.title}>Fasilitas &amp; Aturan</DialogTitle><p>Pilih kebutuhan Anda. Gulir untuk melihat semua pilihan.</p></div>
                    <button type="button" onClick={onClose} className={styles.close} aria-label="Tutup filter"><span aria-hidden="true">&#215;</span></button>
                </div>
                <div className={styles.body}>
                    <div className={styles.fields}>
                        <KosSelect id={`${id}-bathroom`} label="Kamar Mandi" value={draft.bathroomType} options={bathroomTypes} onChange={value => update({bathroomType:value})} />
                        <KosSelect id={`${id}-electricity`} label="Biaya Listrik" value={draft.electricity} options={electricityOptions} onChange={value => update({electricity:value})} />
                        <KosSelect id={`${id}-area`} label="Luas Kamar Minimum" value={String(draft.minArea)} options={[{value:"0",label:"Semua Luas"}, ...[9,12,15,16].map(area => ({value:String(area),label:`${area} m²`}))]} onChange={value => update({minArea:Number(value)})} />
                    </div>
                    <fieldset className={styles.group}>
                        <legend>Rentang Harga {draft.period === "monthly" ? "per Bulan" : draft.period === "sixMonths" ? "per 6 Bulan" : "per Tahun"}</legend>
                        <div className={styles.priceFields}>
                            <label htmlFor={`${id}-min-price`}>Minimal (Rp)<input id={`${id}-min-price`} type="number" min="0" max="999999999" step="1000" inputMode="numeric" placeholder="Tanpa batas" value={draft.minPrice ?? ""} onChange={event => numberInput("minPrice",event.target.value)} /></label>
                            <label htmlFor={`${id}-max-price`}>Maksimal (Rp)<input id={`${id}-max-price`} type="number" min="0" max="999999999" step="1000" inputMode="numeric" placeholder="Tanpa batas" value={draft.maxPrice ?? ""} onChange={event => numberInput("maxPrice",event.target.value)} /></label>
                        </div>
                        <p className={styles.hint}>Rentang ini digunakan bersama pilihan harga pada pencarian utama.</p>
                        {invalidPrice && <p className={styles.error} role="alert">Harga minimal tidak boleh lebih besar dari harga maksimal.</p>}
                    </fieldset>
                    <label className={styles.available}><input type="checkbox" checked={draft.availableOnly} onChange={event => update({availableOnly:event.target.checked})} />Hanya tampilkan kamar tersedia</label>
                    {facilityGroups.map(group => <fieldset className={styles.group} key={group.id}>
                        <legend>{group.label}</legend>
                        <div className={styles.checks}>{group.items.map(feature => {
                            const key = `${group.id}:${feature}`;
                            return <label className={styles.check} key={key}><input type="checkbox" aria-label={`${feature} - ${group.label}`} checked={draft.features.includes(key)} onChange={() => update({features:draft.features.includes(key) ? draft.features.filter(item => item !== key) : [...draft.features,key]})} /><span>{feature}</span></label>;
                        })}</div>
                    </fieldset>)}
                    <p className={styles.hint}>Kos harus memenuhi semua pilihan yang dicentang.</p>
                </div>
                <div className={styles.footer}>
                    <button type="button" className={styles.clear} onClick={() => setDraft(current => ({...current,bathroomType:defaultKosFilters.bathroomType,electricity:defaultKosFilters.electricity,minArea:0,minPrice:null,maxPrice:null,availableOnly:false,features:[]}))}>Hapus Pilihan</button>
                    <button type="button" className="tf-btn btn-bg-1 btn-px-28" disabled={invalidPrice} onClick={() => { if (!invalidPrice) { onApply(draft); onClose(); } }}><span>Terapkan Filter</span><span className="bg-effect" /></button>
                </div>
            </DialogPanel>
        </div>
    </Dialog>;
}
