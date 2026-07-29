import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { FaqSection } from "@/components/FaqSection";
import { Hero } from "@/components/sections/Hero";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { TestimonialsStaggerSection } from "@/components/sections/TestimonialsStaggerSection";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <ComparisonSection />
        <ShowcaseSection />
        <HowItWorks />
        <FeaturesSection />
        <UseCasesSection />
        <TestimonialsStaggerSection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
