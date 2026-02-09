import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PainPointsSection } from "@/components/pain-points-section"
import { FeaturesSection } from "@/components/features-section"
import { MidCtaSection } from "@/components/mid-cta-section"
import { ScheduleSection } from "@/components/schedule-section"
import { GallerySection } from "@/components/gallery-section"
import { AccessSection } from "@/components/access-section"
import { FaqSection } from "@/components/faq-section"
import { ContactFormSection } from "@/components/contact-form-section"
import { FloatingCta } from "@/components/floating-cta"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main>
      <Header />
      <HeroSection />
      <PainPointsSection />
      <FeaturesSection />
      <MidCtaSection />
      <ScheduleSection />
      <GallerySection />
      <AccessSection />
      <ContactFormSection />
      <FaqSection />
      <Footer />
      <FloatingCta />
    </main>
  )
}
