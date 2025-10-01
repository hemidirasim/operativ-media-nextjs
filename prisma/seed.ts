import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'siyaset' },
      update: {},
      create: {
        name: 'Siyasət',
        slug: 'siyaset',
        description: 'Siyasi xəbərlər',
        color: '#dc2626'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'iqtisadiyyat' },
      update: {},
      create: {
        name: 'İqtisadiyyat',
        slug: 'iqtisadiyyat',
        description: 'İqtisadi xəbərlər',
        color: '#059669'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'idman' },
      update: {},
      create: {
        name: 'İdman',
        slug: 'idman',
        description: 'İdman xəbərləri',
        color: '#2563eb'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'medeniyyet' },
      update: {},
      create: {
        name: 'Mədəniyyət',
        slug: 'medeniyyet',
        description: 'Mədəniyyət xəbərləri',
        color: '#7c3aed'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'dunya' },
      update: {},
      create: {
        name: 'Dünya',
        slug: 'dunya',
        description: 'Dünya xəbərləri',
        color: '#6b7280'
      }
    })
  ])

  // Create articles
  const articles = await Promise.all([
    prisma.article.upsert({
      where: { slug: 'azerbaycan-xin-absh-prezidentinin-qezza-munaqisesine-dair-hell-planini-alqislayir' },
      update: {},
      create: {
        title: 'Azərbaycan XİN ABŞ Prezidentinin Qəzza münaqişəsinə dair həll planını alqışlayır',
        slug: 'azerbaycan-xin-absh-prezidentinin-qezza-munaqisesine-dair-hell-planini-alqislayir',
        content: 'Azərbaycan Xarici İşlər Nazirliyi ABŞ Prezidentinin Qəzza münaqişəsinə dair həll planını alqışlayır...',
        excerpt: 'Azərbaycan Xarici İşlər Nazirliyi ABŞ Prezidentinin Qəzza münaqişəsinə dair həll planını alqışlayır...',
        categoryId: categories[0].id,
        featured: true,
        published: true,
        publishedAt: new Date()
      }
    }),
    prisma.article.upsert({
      where: { slug: 'baki-yeni-metro-stansiyasi-acilib' },
      update: {},
      create: {
        title: 'Bakıda yeni metro stansiyası açılıb',
        slug: 'baki-yeni-metro-stansiyasi-acilib',
        content: 'Bakıda yeni metro stansiyası açılıb və vətəndaşlar üçün xidmətə başlayıb...',
        excerpt: 'Bakıda yeni metro stansiyası açılıb və vətəndaşlar üçün xidmətə başlayıb...',
        categoryId: categories[1].id,
        featured: false,
        published: true,
        publishedAt: new Date()
      }
    })
  ])

  // Create news feed items
  await Promise.all([
    prisma.newsFeed.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: 'Azərbaycan XİN ABŞ Prezidentinin Qəzza münaqişəsinə dair həll planını alqışlayır',
        content: 'Xarici İşlər Nazirliyi rəsmi bəyanat yayıb',
        isVerified: true
      }
    }),
    prisma.newsFeed.upsert({
      where: { id: 2 },
      update: {},
      create: {
        title: 'Bakıda yeni metro stansiyası açılıb',
        content: 'Yeni metro stansiyası vətəndaşlar üçün xidmətə başlayıb',
        isVerified: true
      }
    }),
    prisma.newsFeed.upsert({
      where: { id: 3 },
      update: {},
      create: {
        title: 'İqtisadiyyat naziri yeni investisiya layihələrini təqdim edib',
        content: 'Yeni investisiya layihələri təqdim edilib',
        isVerified: false
      }
    })
  ])

  // Create selected news items
  await Promise.all([
    prisma.selectedNews.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: 'Azərbaycan Prezidenti yeni təşəbbüsləri elan edib',
        content: 'Prezident yeni təşəbbüsləri elan edib',
        timeAgo: '4 gün əvvəl'
      }
    }),
    prisma.selectedNews.upsert({
      where: { id: 2 },
      update: {},
      create: {
        title: 'Bakıda yeni texnoloji park açılıb',
        content: 'Yeni texnoloji park açılıb',
        timeAgo: '6 gün əvvəl'
      }
    })
  ])

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
