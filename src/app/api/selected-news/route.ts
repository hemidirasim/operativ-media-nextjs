import { NextResponse } from 'next/server'
import { getSelectedNews } from '@/lib/database'

export async function GET() {
  try {
    const selectedNews = await getSelectedNews(5)
    
    // Format for frontend
    const formattedNews = selectedNews.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      content: item.content,
      imageUrl: item.imageUrl,
      timeAgo: getTimeAgo(item.publishedDate),
      createdAt: item.publishedDate
    }))

    return NextResponse.json(formattedNews)
  } catch (error) {
    console.error('Error fetching selected news:', error)
    return NextResponse.json({ error: 'Failed to fetch selected news' }, { status: 500 })
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'indi'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} dəqiqə əvvəl`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} saat əvvəl`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} gün əvvəl`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} ay əvvəl`
  return `${Math.floor(diffInSeconds / 31536000)} il əvvəl`
}