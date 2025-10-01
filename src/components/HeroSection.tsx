import { getPostsByCategory } from '@/lib/database';
import HeroSlider from './HeroSlider';

interface HeroArticle {
  id: number;
  title: string;
  date: string;
  category: string;
  slug: string;
  imageUrl?: string;
}

const HeroSection = async () => {
  try {
    // Server-side data fetching - get slider category posts (last 5)
    const sliderArticles = await getPostsByCategory(13, 5); // Assuming slider category ID is 13

    // Transform data for the slider
    const transformedArticles: HeroArticle[] = sliderArticles.map(article => ({
      id: article.id,
      title: article.title,
      date: new Date(article.publishedDate).toLocaleDateString('az-AZ'),
      category: 'Slayder',
      slug: article.slug,
      imageUrl: article.imageUrl
    }));

    return <HeroSlider articles={transformedArticles} />;
  } catch (error) {
    console.error('Error fetching hero articles:', error);
    // Return empty slider on error
    return <HeroSlider articles={[]} />;
  }
};

export default HeroSection;