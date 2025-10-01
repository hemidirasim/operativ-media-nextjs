import { NextResponse } from 'next/server'
import { getCategories } from '@/lib/database'

export async function GET() {
  try {
    const categories = await getCategories()
    
    // Map category IDs to proper names
    const categoryNames: { [key: number]: string } = {
      1: 'Siyasət',
      2: 'İqtisadiyyat', 
      3: 'Mədəniyyət',
      4: 'Dünya',
      5: 'İdman',
      6: 'Cəmiyyət',
      7: 'Gündəm',
      8: 'Müsahibə',
      9: 'Ölkə',
      10: 'İKT',
      11: 'Səhiyyə',
      12: 'HƏRBİ'
    }

    // Map category IDs to slugs matching original site
    const categorySlugs: { [key: number]: string } = {
      1: 'siyaset',
      2: 'iqtisadiyyat',
      3: 'medeniyyet',
      4: 'dunya',
      5: 'idman',
      6: 'cemiyyet',
      7: 'gundem',
      8: 'musahibe',
      9: 'olke',
      10: 'ikt',
      11: 'sehiyye',
      12: 'herbi'
    }

    const formattedCategories = categories.map(cat => ({
      id: cat.id,
      name: categoryNames[cat.id] || `Kateqoriya ${cat.id}`,
      slug: categorySlugs[cat.id] || `category-${cat.id}`
    }))

    return NextResponse.json({
      success: true,
      categories: formattedCategories
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch categories' 
    }, { status: 500 })
  }
}