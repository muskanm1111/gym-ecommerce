import About from "@/components/about";
import ContactSection from "@/components/contact-section";
import Feature from "@/components/feature";
import Gallery from "@/components/gallery";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import ProductCarousel from "@/components/product-carousel";

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <HeroCarousel />
      <Feature />
      <Gallery />
      <ProductCarousel />
      <About />
      <ContactSection />
    </>
  );
}
