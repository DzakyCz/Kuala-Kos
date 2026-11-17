"use client";
import type { Property } from "@/types/property";
import KosCard from "@/components/kos/KosCard";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import Pagination from "@/components/ui/Pagination";
import KosSearchFilters from "@/components/kos/KosSearchFilters";
import KosMap from "@/components/maps/KosMap";
import KosSelect from "@/components/ui/KosSelect";
import { activeKosFilters, defaultKosFilters, filterKos, readKosFilters, writeKosFilters, type KosFilters } from "@/lib/kos-search";
import filterStyles from "@/components/kos/KosSearchFilters.module.css";
import { periodPrice } from "@/lib/kos";

export default function KosListing({ properties }: { properties: Property[] }) {
    const [filters, setFilters] = useState(defaultKosFilters);
    const [sortingOption, setSortingOption] = useState("Urutan Awal");
    const [page, setPage] = useState(1);
    const [loaded, setLoaded] = useState(false);
    const itemPerPage = 9;
    useEffect(() => {
        const readUrl = () => {
            const query = new URLSearchParams(window.location.search);
            setFilters(readKosFilters(query));
            const sort = query.get("sort");
            setSortingOption(sort === "Harga Terendah" || sort === "Harga Tertinggi" ? sort : "Urutan Awal");
            setPage(1);
            setLoaded(true);
        };
        readUrl();
        window.addEventListener("popstate", readUrl);
        return () => window.removeEventListener("popstate", readUrl);
    }, []);
    useEffect(() => {
        if (!loaded) return;
        const query = writeKosFilters(filters);
        if (sortingOption !== "Urutan Awal") query.set("sort", sortingOption);
        const suffix = query.toString();
        window.history.replaceState(window.history.state, "", `${window.location.pathname}${suffix ? `?${suffix}` : ""}${window.location.hash}`);
    }, [filters, sortingOption, loaded]);
    const updateFilters = (next: KosFilters) => { setFilters(next); setPage(1); };
    const sorted = useMemo(() => {
        const results = filterKos(properties, filters);
        if (sortingOption === "Harga Terendah") results.sort((a, b) => periodPrice(a, filters.period)! - periodPrice(b, filters.period)!);
        if (sortingOption === "Harga Tertinggi") results.sort((a, b) => periodPrice(b, filters.period)! - periodPrice(a, filters.period)!);
        return results;
    }, [properties, filters, sortingOption]);
    const currentPage = Math.min(page, Math.max(1, Math.ceil(sorted.length / itemPerPage)));
    const activeFilters = activeKosFilters(filters);

    return (
        <>
            <div className="flat-map">
                <div className="mapbox-3">
                    <KosMap sorted={sorted} period={filters.period} />
                </div>
                <div className="tf-container">
                    <KosSearchFilters filters={filters} onChange={updateFilters} onSearch={() => {
                        document.querySelector(".section-properties")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }} />
                </div>
            </div>
            <div className="section-properties tf-spacing-1" style={{ scrollMarginTop: 100 }}>
                <div className="tf-container">
                    <div className="box-title mb_40">
                        <div>
                            <ul className="breadcrumb style-1 text-button fw-4 mb_4">
                                <li>
                                    <Link href="/">
                                        Beranda
                                    </Link>
                                </li>
                                <li>Daftar Kos</li>
                            </ul>
                            <h4>Daftar Kos</h4><p>Temukan kos sesuai lokasi, fasilitas, dan biaya sewa Anda.</p>
                        </div>
                        <div className="right d-flex gap_12">
                            <div style={{minWidth: 195}}><KosSelect label="Urutkan Kos" hideLabel value={sortingOption} onChange={(value) => {setSortingOption(value);setPage(1);}} options={["Urutan Awal","Harga Terendah","Harga Tertinggi"]} /></div>
                        </div>
                    </div>
                    <p className={filterStyles.resultCount} role="status">{sorted.length} kos ditemukan{activeFilters.length ? ` dengan ${activeFilters.length} filter aktif` : ""}</p>
                    {activeFilters.length > 0 && <div className={filterStyles.summary} aria-label="Filter aktif">
                        {activeFilters.map((item) => <button type="button" key={item.feature ?? item.key} className={filterStyles.chip} aria-label={`Hapus filter ${item.label}`} onClick={() => updateFilters(item.key === "period" ? { ...filters, period: "monthly", budget: "Semua Harga", minPrice: null, maxPrice: null } : { ...filters, [item.key]: item.feature ? filters.features.filter((feature) => feature !== item.feature) : defaultKosFilters[item.key] })}>{item.label} <span aria-hidden="true">&#215;</span></button>)}
                        <button type="button" className={filterStyles.reset} onClick={() => updateFilters({ ...defaultKosFilters, features: [] })}>Atur Ulang</button>
                    </div>}
                    {sorted.length === 0 && <p role="status">Belum ada kos yang sesuai. Coba ubah lokasi, harga, atau fasilitas pilihan Anda.</p>}
                    <div className="tf-grid-layout lg-col-3 md-col-2">
                        {sorted.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map(property => <KosCard key={property.id} property={property} period={filters.period} />)}
                    </div>

                    <div className="d-flex justify-content-center">
                        <Pagination
                            currentPage={currentPage}
                            setPage={setPage}
                            itemLength={sorted.length}
                            itemPerPage={itemPerPage}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
