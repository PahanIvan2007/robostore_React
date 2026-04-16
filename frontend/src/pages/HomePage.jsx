import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import CategoriesSection from '../components/home/CategoriesSection';
import PopularProducts from '../components/home/PopularProducts';
import FaqSection from '../components/home/FaqSection';
import NewsletterSection from '../components/home/NewsletterSection';
import MainLayout from '../components/layout/MainLayout';

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <PopularProducts />
      <FaqSection />
      <NewsletterSection />
    </MainLayout>
  );
}
