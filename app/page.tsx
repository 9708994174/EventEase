import HeroSection from "@/components/hero-section"
import HowItWorks from "@/components/how-it-works"
import FeaturedCategories from "@/components/featured-categories"
import WhyChooseUs from "@/components/why-choose-us"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import TrustIndicators from "@/components/trust-indicators"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <FeaturedCategories />
      <WhyChooseUs />
      <TestimonialsCarousel />
      <TrustIndicators />
    </div>
  )
}
