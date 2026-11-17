import HeroSection from "@/components/home/HeroSection";
import LocationsSection from "@/components/home/LocationsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FeaturedKosSection from "@/components/home/FeaturedKosSection";
import KosShowcaseSection from "@/components/home/KosShowcaseSection";
import RentalGuideSection from "@/components/home/RentalGuideSection";
import SiteLayout from "@/components/layout/SiteLayout";
import { getPublishedProperties } from "@/lib/property-queries";

// Data kos dibaca dari database pada setiap permintaan, bukan dibekukan saat build.
export const dynamic = "force-dynamic";

export default async function Home() {
    const properties = await getPublishedProperties(6);
    return (
        <SiteLayout>
            <HeroSection />
            <FeaturedKosSection properties={properties} />
            <KosShowcaseSection properties={properties} />
            <LocationsSection />
            <HowItWorksSection />
            <RentalGuideSection />
        </SiteLayout>
    );
}
