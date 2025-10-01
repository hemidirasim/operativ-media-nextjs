import { NextResponse } from 'next/server'
import { getPhotoGallery } from '@/lib/database'

export async function GET() {
  try {
    const photoGallery = await getPhotoGallery(10)
    
    // Format for frontend
    const formattedGallery = photoGallery.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      imageUrl: item.imageUrl,
      publishedDate: item.publishedDate
    }))

    return NextResponse.json(formattedGallery)
  } catch (error) {
    console.error('Error fetching photo gallery:', error)
    return NextResponse.json({ error: 'Failed to fetch photo gallery' }, { status: 500 })
  }
}
