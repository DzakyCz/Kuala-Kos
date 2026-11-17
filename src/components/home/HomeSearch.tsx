"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import KosSearchFilters from "@/components/kos/KosSearchFilters";
import { defaultKosFilters, writeKosFilters } from "@/lib/kos-search";
import styles from "@/components/kos/KosSearchFilters.module.css";

export default function HomeSearch() {
    const router = useRouter();
    const [filters, setFilters] = useState(defaultKosFilters);
    return <div className={styles.homeContainer}>
        <KosSearchFilters filters={filters} onChange={setFilters} onSearch={() => {
            const query = writeKosFilters(filters).toString();
            router.push(`/listing-topmap-grid${query ? `?${query}` : ""}`);
        }} />
    </div>;
}
