import { MetadataRoute } from 'next'
import { getPosts, getCategories } from '@/lib/database'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://operativmedia.az'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Category pages - use predefined categories
  const categoryMap: { [key: string]: string } = {
    'siyaset': 'Siyasət',
    'iqtisadiyyat': 'İqtisadiyyat',
    'medeniyyet': 'Mədəniyyət',
    'dunya': 'Dünya',
    'idman': 'İdman',
    'cemiyyet': 'Cəmiyyət',
    'gundem': 'Gündəm',
    'musahibe': 'Müsahibə',
    'olke': 'Ölkə',
    'ikt': 'İKT',
    'sehiyye': 'Səhiyyə',
    'herbi': 'HƏRBİ',
    'slayder': 'Slayder'
  };

  const categoryPages: MetadataRoute.Sitemap = Object.keys(categoryMap).map(slug => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Article pages
  const articlePages: MetadataRoute.Sitemap = []
  
  try {
    const posts = await getPosts(1000) // Get more posts for sitemap
    posts.forEach((post: any) => {
      // Only include posts with valid slug and ID
      if (post.slug && post.id && typeof post.slug === 'string' && post.slug.trim() !== '') {
        articlePages.push({
          url: `${baseUrl}/post/${post.id}/${post.slug}`,
          lastModified: new Date(post.publishedDate),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        })
      }
    })
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error)
  }

  return [...staticPages, ...categoryPages, ...articlePages]
}
