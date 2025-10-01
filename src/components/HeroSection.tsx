import { getPostsByCategory } from '@/lib/database';
import HeroSlider from './HeroSlider';

interface HeroArticle {
  id: number;
  title: string;
  publishedDate: string;
  categoryId?: number;
  slug: string;
  imageUrl?: string;
}

const HeroSection = async () => {
  // Server-side data fetching - get slider category posts (last 5)
  const sliderArticles = await getPostsByCategory(13, 5); // Assuming slider category ID is 13

  // Transform data for the slider
  const transformedArticles: HeroArticle[] = sliderArticles.map(article => ({
    id: article.id,
    title: article.title,
    publishedDate: article.publishedDate,
    categoryId: article.categoryId,
    slug: article.slug,
    imageUrl: article.imageUrl,
    category: 'Slayder',
    date: new Date(article.publishedDate).toLocaleDateString('az-AZ')
  }));

  return <HeroSlider articles={transformedArticles} />;
};

export default HeroSection;