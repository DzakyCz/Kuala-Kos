import HeroSection from "@/components/home/HeroSection";
import LocationsSection from "@/components/home/LocationsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FeaturedKosSection from "@/components/home/FeaturedKosSection";
import KosShowcaseSection from "@/components/home/KosShowcaseSection";
import RentalGuideSection from "@/components/home/RentalGuideSection";
import SiteLayout from "@/components/layout/SiteLayout";

export default function Home() {
    return (
        <SiteLayout>
            <HeroSection />
            <FeaturedKosSection />
            <KosShowcaseSection />
            <LocationsSection />
            <HowItWorksSection />
            <RentalGuideSection />
        </SiteLayout>
    );
}
