import { NextResponse } from 'next/server'
import { getNewsFeed } from '@/lib/database'

// Cache for 30 seconds
export const revalidate = 30;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const newsFeed = await getNewsFeed(limit)
    
    // Format for frontend
    const formattedNews = newsFeed.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      content: item.content,
      isVerified: item.pinned > 0,
      publishedAt: item.publishedDate
    }))

    return NextResponse.json(formattedNews, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60'
      }
    })
  } catch (error) {
    console.error('Error fetching news feed:', error)
    return NextResponse.json({ error: 'Failed to fetch news feed' }, { status: 500 })
  }
}