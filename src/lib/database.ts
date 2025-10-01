import { Pool } from 'pg'

// Only create pool if DATABASE_URL is available
let pool: Pool | null = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
    maxUses: 7500, // Close (and replace) a connection after it has been used 7500 times
  })
}

export const db = pool

// Generic query function
export async function query(text: string, params?: (string | number | boolean)[]) {
  if (!pool) {
    throw new Error('Database not configured. Please set DATABASE_URL environment variable.');
  }
  
  const client = await pool.connect()
  try {
    const res = await client.query(text, params)
    return res.rows
  } finally {
    client.release()
  }
}

// Məqalələri əldə et
export async function getPosts(limit: number = 10, featured: boolean = false, search?: string, offset: number = 0) {
  let query = `
    SELECT 
      p.id,
      p.title,
      COALESCE(p.slug, 'post-' || p.id) as slug,
      p.sub_title as "subTitle",
      p.content,
      p.image_url as "imageUrl",
      p.video_url as "videoUrl",
      p.youtube_link as "youtubeLink",
      p.published_date as "publishedDate",
      p.view_count as "viewCount",
      p.pinned,
      p.showhomepage,
      cp.category_id as "categoryId"
    FROM operaj_db1.posts p
    LEFT JOIN operaj_db1.category_post cp ON p.id = cp.post_id
    WHERE p.status = true AND p.publish = true
  `
  
  const params: (string | number)[] = []
  
  if (featured) {
    query += ` AND p.pinned > 0`
  }
  
  if (search) {
    query += ` AND (p.title ILIKE $${params.length + 1} OR p.sub_title ILIKE $${params.length + 1} OR p.content ILIKE $${params.length + 1})`
    params.push(`%${search}%`)
  }
  
  query += ` ORDER BY p.published_date DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
  params.push(limit, offset)
  
  const result = await pool.query(query, params)
  return result.rows
}

// Ana səhifə üçün məqalələri əldə et
export async function getHomepagePosts(limit: number = 6) {
  const query = `
    SELECT 
      p.id,
      p.title,
      COALESCE(p.slug, 'post-' || p.id) as slug,
      p.sub_title as "subTitle",
      p.content,
      p.image_url as "imageUrl",
      p.video_url as "videoUrl",
      p.youtube_link as "youtubeLink",
      p.published_date as "publishedDate",
      p.view_count as "viewCount",
      p.pinned,
      p.showhomepage,
      cp.category_id as "categoryId"
    FROM operaj_db1.posts p
    LEFT JOIN operaj_db1.category_post cp ON p.id = cp.post_id
    WHERE p.status = true AND p.publish = true AND p.showhomepage = true
    ORDER BY p.published_date DESC
    LIMIT $1
  `
  
  const result = await pool.query(query, [limit])
  return result.rows
}

// Xəbər lenti üçün məqalələri əldə et
export async function getNewsFeed(limit: number = 10) {
  const query = `
    SELECT 
      p.id,
      p.title,
      COALESCE(p.slug, 'post-' || p.id) as slug,
      p.published_date as "publishedDate",
      p.pinned
    FROM operaj_db1.posts p
    WHERE p.status = true AND p.publish = true
    ORDER BY p.published_date DESC
    LIMIT $1
  `
  
  const result = await pool.query(query, [limit])
  return result.rows
}

// Seçilmiş xəbərləri əldə et
export async function getSelectedNews(limit: number = 5) {
  const query = `
    SELECT 
      p.id,
      p.title,
      COALESCE(p.slug, 'post-' || p.id) as slug,
      p.image_url as "imageUrl",
      p.published_date as "publishedDate"
    FROM operaj_db1.posts p
    WHERE p.status = true AND p.publish = true AND p.pinned > 0
    ORDER BY p.pinned DESC, p.published_date DESC
    LIMIT $1
  `
  
  const result = await pool.query(query, [limit])
  return result.rows
}

// Kateqoriyalara görə məqalələri əldə et
export async function getPostsByCategory(categoryId: number, limit: number = 10, offset: number = 0) {
  const query = `
    SELECT 
      p.id,
      p.title,
      COALESCE(p.slug, 'post-' || p.id) as slug,
      p.sub_title as "subTitle",
      p.content,
      p.image_url as "imageUrl",
      p.video_url as "videoUrl",
      p.youtube_link as "youtubeLink",
      p.published_date as "publishedDate",
      p.view_count as "viewCount",
      p.pinned,
      p.showhomepage,
      cp.category_id as "categoryId"
    FROM operaj_db1.posts p
    INNER JOIN operaj_db1.category_post cp ON p.id = cp.post_id
    WHERE p.status = true AND p.publish = true AND cp.category_id = $1
    ORDER BY p.published_date DESC
    LIMIT $2 OFFSET $3
  `
  
  const result = await pool.query(query, [categoryId, limit, offset])
  return result.rows
}

// Video xəbərləri əldə et
export async function getVideoPosts(limit: number = 10) {
  const query = `
    SELECT 
      p.id,
      p.title,
      COALESCE(p.slug, 'post-' || p.id) as slug,
      p.sub_title as "subTitle",
      p.video_url as "videoUrl",
      p.youtube_link as "youtubeLink",
      p.youtube_image as "youtubeImage",
      p.published_date as "publishedDate",
      p.view_count as "viewCount"
    FROM operaj_db1.posts p
    WHERE p.status = true AND p.publish = true 
    AND (p.video_url IS NOT NULL OR p.youtube_link IS NOT NULL)
    ORDER BY p.published_date DESC
    LIMIT $1
  `
  
  const result = await pool.query(query, [limit])
  return result.rows
}

// Foto qalereya üçün məqalələri əldə et
export async function getPhotoGallery(limit: number = 10) {
  const query = `
    SELECT 
      p.id,
      p.title,
      COALESCE(p.slug, 'post-' || p.id) as slug,
      p.image_url as "imageUrl",
      p.published_date as "publishedDate"
    FROM operaj_db1.posts p
    WHERE p.status = true AND p.publish = true AND p.image_url IS NOT NULL
    ORDER BY p.published_date DESC
    LIMIT $1
  `
  
  const result = await pool.query(query, [limit])
  return result.rows
}

// Kateqoriyaları əldə et
export async function getCategories() {
  const query = `
    SELECT DISTINCT 
      cp.category_id as "id",
      'Kateqoriya ' || cp.category_id as "name"
    FROM operaj_db1.category_post cp
    ORDER BY cp.category_id
  `
  
  const result = await pool.query(query)
  return result.rows
}
