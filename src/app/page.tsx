import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { MenuSection } from '@/components/sections/MenuSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FAQNewsletterSection } from '@/components/sections/FAQNewsletterSection';
import { FoodGalleryMarquee } from '@/components/sections/FoodGalleryMarquee';
import { TrialFormSection } from '@/components/sections/TrialFormSection';
import { MobileStickyCTA } from '@/components/ui/MobileStickyCTA';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF7E8] text-[#173F32]">
      {/* 01. Sticky Responsive Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 02. Hero Section */}
        <HeroSection />

        {/* 03. Why FitBowl / 4 Core Benefits */}
        <BenefitsSection />

        {/* 04. Explore Our 14 Bowls (Menu Catalog & Filters) */}
        <MenuSection />

        {/* 05. Subscription Plans & Pricing */}
        <PricingSection />

        {/* 06. How It Works (4-Step Sequential Process) */}
        <HowItWorksSection />

        {/* 07. Customer Testimonials (4 Verified Reviews) */}
        <TestimonialsSection />

        {/* 08 & 09. Newsletter & Frequently Asked Questions (Wireframe Split Layout) */}
        <FAQNewsletterSection />

        {/* 09. Fresh food photo marquee */}
        <FoodGalleryMarquee />

        {/* 10. Free Trial Booking Form (Interactive Validation & Area Check) */}
        <TrialFormSection />
      </main>

      {/* 11. Global Footer */}
      <Footer />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyCTA />
    </div>
  );
}

