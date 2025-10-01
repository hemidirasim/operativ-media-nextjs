import { NextRequest, NextResponse } from 'next/server'
import { getPosts, getPostsByCategory, getHomepagePosts } from '@/lib/database'

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    const homepage = searchParams.get('homepage') === 'true'
    const featured = searchParams.get('featured') === 'true'
    const search = searchParams.get('search')

    let articles

    if (search) {
      // Search functionality
      articles = await getPosts(limit, false, search, offset)
    } else if (featured) {
      // Get featured/pinned posts
      articles = await getPosts(limit, true, undefined, offset)
    } else if (homepage) {
      articles = await getHomepagePosts(limit)
    } else if (categoryId) {
      articles = await getPostsByCategory(parseInt(categoryId), limit, offset)
    } else {
      articles = await getPosts(limit, false, undefined, offset)
    }

    return NextResponse.json({ articles }, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60'
      }
    })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}