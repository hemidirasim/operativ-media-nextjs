import { NextResponse } from 'next/server'
import { getVideoPosts } from '@/lib/database'

export async function GET() {
  try {
    const videoNews = await getVideoPosts(10)
    
    // Format for frontend
    const formattedNews = videoNews.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      subTitle: item.subTitle,
      videoUrl: item.videoUrl,
      youtubeLink: item.youtubeLink,
      youtubeImage: item.youtubeImage,
      publishedDate: item.publishedDate,
      viewCount: item.viewCount,
      isVideo: true
    }))

    return NextResponse.json(formattedNews)
  } catch (error) {
    console.error('Error fetching video news:', error)
    return NextResponse.json({ error: 'Failed to fetch video news' }, { status: 500 })
  }
}
