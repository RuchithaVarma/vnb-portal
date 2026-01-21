import Hero from '@/components/Hero';
import ValueProps from '@/components/ValueProps';
import FeaturedProducts from '@/components/FeaturedProducts';
import SpecialtyCards from '@/components/SpecialtyCards';
import CategoryGrid from '@/components/CategoryGrid';
import Testimonials from '@/components/Testimonials';
import Certifications from '@/components/Certifications';
import InstagramFeed from '@/components/InstagramFeed';

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProps />
      <FeaturedProducts />
      <SpecialtyCards />
      <CategoryGrid />
      <Testimonials />
      <InstagramFeed />
      <Certifications />
    </>
  );
}
