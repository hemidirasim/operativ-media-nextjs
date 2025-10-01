import { query } from '@/lib/database';

export async function GET() {
  try {
    // Test database connection
    const testQuery = await query('SELECT COUNT(*) as count FROM operaj_db1.posts WHERE status = true AND publish = true');
    
    // Get sample posts
    const samplePosts = await query(`
      SELECT p.id, p.title, p.slug, p.status, p.publish, p.created_at
      FROM operaj_db1.posts p 
      WHERE p.status = true AND p.publish = true
      ORDER BY p.created_at DESC
      LIMIT 5
    `);
    
    return Response.json({
      success: true,
      totalPosts: testQuery[0]?.count || 0,
      samplePosts: samplePosts
    });
  } catch (error) {
    console.error('Debug API error:', error);
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
