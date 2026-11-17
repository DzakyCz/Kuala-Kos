import SiteLayout from "@/components/layout/SiteLayout";
import KosListing from "@/components/kos/KosListing";
import { getPublishedProperties } from "@/lib/property-queries";

export const dynamic = "force-dynamic";

// Server Component: data dibaca langsung dari database, lalu difilter di browser oleh KosListing.
// Untuk ribuan data, pindahkan filter ke GET /api/properties (sudah mendukung semua filter yang sama).
export default async function page() {
    const properties = await getPublishedProperties(200);
    return (
        <SiteLayout>
            <KosListing properties={properties} />
        </SiteLayout>
    );
}
