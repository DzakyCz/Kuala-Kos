import type { Property } from "@/types/property";
import styles from "@/components/kos/KosFacilities.module.css";

export default function KosFacilities({ property }: { property: Pick<Property, "bathroomType" | "features" | "roomFacilities" | "sharedFacilities"> }) {
    const features = property.features ?? [];
    const room = property.roomFacilities ?? features;
    const shared = property.sharedFacilities ?? features;
    const amenities = [
        property.bathroomType ? { icon: "icon-Bathtub", label: property.bathroomType === "Dalam" ? "Kamar mandi dalam" : "Kamar mandi bersama" } : null,
        room.includes("AC") ? { icon: "icon-Snowflake", label: "AC" }
            : room.includes("Wi-Fi") ? { icon: "icon-WifiHigh", label: "Wi-Fi kamar" }
                : shared.includes("Wi-Fi") ? { icon: "icon-WifiHigh", label: "Wi-Fi bersama" } : null,
        shared.includes("CCTV") ? { icon: "icon-SecurityCamera", label: "CCTV" }
            : shared.includes("Pagar") ? { icon: "icon-HouseLine", label: "Berpagar" }
                : shared.includes("Parkir Motor") ? { icon: "icon-HouseSimple", label: "Parkir motor" } : null,
    ].filter((item): item is { icon: string; label: string } => item !== null);
    return <ul className={`info d-flex ${styles.facilities}`} aria-label="Fasilitas utama">
        {amenities.map((item) => <li key={item.label}><i className={item.icon} aria-hidden="true" /><span>{item.label}</span></li>)}
    </ul>;
}
