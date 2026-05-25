import {
  AboutBrand,
  Benefits,
  BrandStory,
  Categories,
  Comparison,
  FAQ,
  FeaturedProducts,
  Testimonials,
} from "@/components/home/sections";
import { Hero } from "@/components/home/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStory />
      <Categories />
      <FeaturedProducts />
      <Benefits />
      <Comparison />
      <AboutBrand />
      <Testimonials />
      <FAQ />
    </>
  );
}
