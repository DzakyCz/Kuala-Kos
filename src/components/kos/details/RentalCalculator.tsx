"use client";
import { useState } from "react";
import type { Property } from "@/types/property";
import { formatRupiah, periodLabels, periodMonths, periodPrice, type RentPeriod } from "@/lib/kos";
import KosSelect from "@/components/ui/KosSelect";
import styles from "@/components/kos/details/RentalCalculator.module.css";

export default function RentalCalculator({ property }: { property: Property }) {
    const [period, setPeriod] = useState<RentPeriod>("monthly");
    const [count, setCount] = useState(1);
    const [utilities, setUtilities] = useState(0);
    const [deposit, setDeposit] = useState(0);
    const [estimate, setEstimate] = useState<{rent:number; extras:number; total:number} | null>(null);
    const price = periodPrice(property, period)!;
    const periods = (["monthly", "sixMonths", "yearly"] as RentPeriod[]).filter(item => periodPrice(property, item) !== undefined);
    return <div>
        <h5 className="properties-title mb_20">Estimasi Biaya Kos</h5>
        <div className="wrap-form">
            <form className={styles.form} onSubmit={event => {
                event.preventDefault();
                const rent = price * count;
                const extras = utilities * count * periodMonths[period] + deposit;
                setEstimate({rent, extras, total:rent + extras});
            }}>
                <div className={styles.fields}>
                    <KosSelect id="rent-period" label="Periode Sewa" value={period} options={periods.map(value => ({value,label:periodLabels[value]}))} onChange={value => {setPeriod(value as RentPeriod); setEstimate(null);}} />
                    <fieldset><label htmlFor="rent-count" className="text-body-default text_primary-color mb_8">Jumlah Periode</label><input id="rent-count" type="number" min={1} max={120} step={1} required value={count} onChange={event => {setCount(Number(event.target.value)); setEstimate(null);}} /></fieldset>
                    <fieldset><label htmlFor="rent-utilities" className="text-body-default text_primary-color mb_8">Tambahan per Bulan (Rp)</label><input id="rent-utilities" type="number" min={0} step={1000} required value={utilities} onChange={event => {setUtilities(Number(event.target.value)); setEstimate(null);}} /></fieldset>
                    <fieldset><label htmlFor="rent-deposit" className="text-body-default text_primary-color mb_8">Uang Jaminan (Rp)</label><input id="rent-deposit" type="number" min={0} step={1000} required value={deposit} onChange={event => {setDeposit(Number(event.target.value)); setEstimate(null);}} /></fieldset>
                </div>
                <div className={styles.actions}>
                    <p>Harga {periodLabels[period].toLowerCase()}: {formatRupiah(price)}. Tambahan bulanan dihitung untuk {count * periodMonths[period]} bulan.</p>
                    <button className="tf-btn btn-bg-1 btn-px-28" type="submit"><span>Hitung Estimasi</span><span className="bg-effect" /></button>
                </div>
            </form>
            {estimate && <ul className={`info tf-grid-layout sm-col-3 gap_8 ${styles.results}`} aria-live="polite">{([["Total Sewa", estimate.rent], ["Tambahan dan Uang Jaminan", estimate.extras], ["Estimasi Total", estimate.total]] as const).map(([label, amount]) => <li key={label}><p className="mb_4">{label}:</p><div className="text-button text_primary-color fw-7">{formatRupiah(amount)}</div></li>)}</ul>}
            <p>Konfirmasikan biaya listrik, air, uang jaminan, dan ketentuan sewa kepada pengelola.</p>
        </div>
    </div>;
}
