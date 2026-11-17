import type { Property } from "@/types/property";
import { budgetOptionsByPeriod, cityOptions } from "@/data/filter-options";
import { formatRupiah, matchesBudget, periodLabels, periodPrice, type RentPeriod } from "@/lib/kos";

export const kosTypes = ["Semua Tipe", "Kos Putra", "Kos Putri"];
export const bathroomTypes = ["Semua Kamar Mandi", "Dalam", "Luar/Bersama"];
export const electricityOptions = ["Semua Biaya Listrik", "Termasuk Sewa", "Bayar Terpisah"];
export const facilityGroups = [
    { id: "room", label: "Fasilitas Kamar", items: ["AC", "Wi-Fi", "Tempat Tidur", "Lemari", "Meja", "Kursi", "Kipas Angin", "Jendela", "Kloset Duduk", "Air Panas", "TV"] },
    { id: "shared", label: "Fasilitas Bersama", items: ["Wi-Fi", "Dapur Bersama", "Parkir Motor", "Parkir Mobil", "Mesin Cuci", "Laundry", "Kulkas", "Penjaga Kos", "Musala", "Dispenser", "Ruang Bersama", "TV", "Air Bersih", "CCTV", "Pagar"] },
    { id: "rule", label: "Aturan dan Akses", items: ["Akses 24 Jam", "Jam Malam", "Tamu Menginap Diizinkan"] },
] as const;
const availableFeatures = facilityGroups.flatMap(group => group.items.map(item => `${group.id}:${item}`));
const legacyNames: Record<string, string> = {
    "WiFi": "room:Wi-Fi", "Wi-Fi": "room:Wi-Fi", "AC": "room:AC", "Tempat Tidur": "room:Tempat Tidur", "Lemari": "room:Lemari",
    "Dapur Bersama": "shared:Dapur Bersama", "Parkir Motor": "shared:Parkir Motor", "Parkir Mobil": "shared:Parkir Mobil",
    "Air Bersih": "shared:Air Bersih", "CCTV": "shared:CCTV", "Pagar": "shared:Pagar", "Akses 24 Jam": "rule:Akses 24 Jam",
};
export type KosFilters = {
    keyword: string; city: string; kosType: string; budget: string; period: RentPeriod;
    bathroomType: string; electricity: string; minArea: number;
    minPrice: number | null; maxPrice: number | null;
    availableOnly: boolean; features: string[];
};
export const defaultKosFilters: KosFilters = {
    keyword: "", city: "Semua Lokasi", kosType: kosTypes[0], budget: "Semua Harga", period: "monthly",
    bathroomType: bathroomTypes[0], electricity: electricityOptions[0], minArea: 0,
    minPrice: null, maxPrice: null, availableOnly: false, features: [],
};
const amount = (value: string | null) => {
    if (value === null || !/^\d{1,9}$/.test(value)) return null;
    return Number(value);
};
export function readKosFilters(query: URLSearchParams): KosFilters {
    const pick = (key: string, options: readonly string[], fallback: string) => {
        const value = query.get(key);
        return value && options.includes(value) ? value : fallback;
    };
    const legacyBathroom = query.getAll("feature").includes("Kamar Mandi Dalam") ? "Dalam" : bathroomTypes[0];
    const minArea = Number.parseInt(query.get("minArea") ?? query.get("minSize") ?? "0", 10);
    const period = pick("period", ["monthly", "sixMonths", "yearly"], "monthly") as RentPeriod;
    return {
        keyword: (query.get("keyword") ?? "").slice(0, 200), city: pick("city", cityOptions, defaultKosFilters.city),
        kosType: pick("kosType", kosTypes, defaultKosFilters.kosType), period, budget: pick("budget", budgetOptionsByPeriod[period], defaultKosFilters.budget),
        bathroomType: pick("bathroomType", bathroomTypes, legacyBathroom), electricity: pick("electricity", electricityOptions, defaultKosFilters.electricity),
        minArea: [9,12,15,16].includes(minArea) ? minArea : 0,
        minPrice: amount(query.get("minPrice")), maxPrice: amount(query.get("maxPrice")), availableOnly: query.get("availableOnly") === "1",
        features: [...new Set(query.getAll("feature").map(item => legacyNames[item] ?? item))].filter(item => availableFeatures.includes(item)),
    };
}
export function writeKosFilters(filters: KosFilters) {
    const query = new URLSearchParams();
    for (const key of ["keyword", "city", "kosType", "period", "budget", "bathroomType", "electricity"] as const)
        if (filters[key] !== defaultKosFilters[key]) query.set(key, filters[key]);
    if (filters.minArea) query.set("minArea", String(filters.minArea));
    if (filters.minPrice !== null) query.set("minPrice", String(filters.minPrice));
    if (filters.maxPrice !== null) query.set("maxPrice", String(filters.maxPrice));
    if (filters.availableOnly) query.set("availableOnly", "1");
    filters.features.forEach(feature => query.append("feature", feature));
    return query;
}
const normalize = (value: string) => value.toLocaleLowerCase("id-ID").replace(/[-\s]+/g, " ").trim();
function hasFacility(property: Property, feature: string) {
    const [scope, ...parts] = feature.split(":");
    const name = parts.join(":");
    if (scope === "room") return (property.roomFacilities ?? property.features ?? []).includes(name);
    if (scope === "shared") return (property.sharedFacilities ?? (name === "Wi-Fi" ? [] : property.features) ?? []).includes(name);
    if (scope === "rule") return (property.rules ?? property.features ?? []).includes(name);
    return false;
}
export function filterKos(properties: Property[], filters: KosFilters) {
    const keyword = normalize(filters.keyword);
    return properties.filter(property => {
        if (filters.city !== "Semua Lokasi" && property.city !== filters.city) return false;
        if (filters.kosType !== kosTypes[0] && property.categories !== filters.kosType) return false;
        const price = periodPrice(property, filters.period);
        if (price === undefined || !matchesBudget(price, filters.budget)) return false;
        if (filters.minPrice !== null && price < filters.minPrice) return false;
        if (filters.maxPrice !== null && price > filters.maxPrice) return false;
        if (filters.bathroomType !== bathroomTypes[0] && property.bathroomType !== filters.bathroomType) return false;
        if (filters.electricity !== electricityOptions[0] && property.electricityIncluded !== (filters.electricity === "Termasuk Sewa")) return false;
        if (filters.availableOnly && !(property.availableRooms && property.availableRooms > 0)) return false;
        if (filters.minArea && (property.sqft === undefined || property.sqft < filters.minArea)) return false;
        if (!filters.features.every(feature => hasFacility(property, feature))) return false;
        return !keyword || normalize(`${property.title} ${property.address}`).includes(keyword);
    });
}
export function activeKosFilters(filters: KosFilters): { key: keyof KosFilters; label: string; feature?: string }[] {
    const items: { key: keyof KosFilters; label: string; feature?: string }[] = [];
    if (filters.period !== "monthly") items.push({key:"period",label:`Sewa ${periodLabels[filters.period]}`});
    for (const key of ["keyword", "city", "kosType", "budget", "bathroomType", "electricity"] as const) {
        if (filters[key] !== defaultKosFilters[key]) items.push({key, label: key === "keyword" ? `Pencarian: ${filters[key]}` : key === "bathroomType" ? `KM ${filters[key]}` : key === "electricity" ? `Listrik: ${filters[key]}` : filters[key]});
    }
    if (filters.minArea) items.push({key:"minArea",label:`Minimal ${filters.minArea} m\u00b2`});
    if (filters.minPrice !== null) items.push({key:"minPrice",label:`Min. ${formatRupiah(filters.minPrice)}`});
    if (filters.maxPrice !== null) items.push({key:"maxPrice",label:`Maks. ${formatRupiah(filters.maxPrice)}`});
    if (filters.availableOnly) items.push({key:"availableOnly",label:"Kamar tersedia"});
    filters.features.forEach(feature => { const [scope,...name] = feature.split(":"); items.push({key:"features",label:`${name.join(":")} \u00b7 ${scope === "room" ? "Kamar" : scope === "shared" ? "Bersama" : "Aturan"}`,feature}); });
    return items;
}
