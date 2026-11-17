export const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency", currency: "IDR", maximumFractionDigits: 0,
    }).format(value);

export const areaCenter: [number, number] = [95.366, 5.568];

import type { Property } from "@/types/property";
export type RentPeriod = "monthly" | "sixMonths" | "yearly";
export const periodLabels: Record<RentPeriod, string> = { monthly: "Bulanan", sixMonths: "6 Bulan", yearly: "Tahunan" };
export const periodSuffix: Record<RentPeriod, string> = { monthly: "bulan", sixMonths: "6 bulan", yearly: "tahun" };
export const periodMonths: Record<RentPeriod, number> = { monthly: 1, sixMonths: 6, yearly: 12 };
export function periodPrice(property: Pick<Property, "price" | "periodPrices">, period: RentPeriod): number | undefined {
    return period === "monthly" ? property.price : property.periodPrices?.[period];
}

export const availabilityLabel = (count?: number) => count === undefined ? "Cek ketersediaan" : count > 0 ? "Kamar tersedia" : "Kamar penuh";

export function matchesBudget(price: number, budget: string) {
    if (budget === "Semua Harga") return true;
    const limit = Number(budget.replace(/[^0-9]/g, ""));
    if (!limit) return true;
    return budget.startsWith("Di atas") ? price > limit : price <= limit;
}
