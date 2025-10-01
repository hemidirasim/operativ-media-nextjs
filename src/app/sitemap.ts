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

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = []
  
  try {
    const categories = await getCategories()
    categories.forEach((category: any) => {
      categoryPages.push({
        url: `${baseUrl}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      })
    })
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error)
  }

  // Article pages
  const articlePages: MetadataRoute.Sitemap = []
  
  try {
    const posts = await getPosts(1000) // Get more posts for sitemap
    posts.forEach((post: any) => {
      if (post.slug) {
        articlePages.push({
          url: `${baseUrl}/post/${post.id}/${post.slug}`,
          lastModified: new Date(post.publishedDate),
          changeFrequency: 'weekly',
          priority: 0.6,
        })
      }
    })
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error)
  }

  return [...staticPages, ...categoryPages, ...articlePages]
}
