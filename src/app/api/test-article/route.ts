import { query } from '@/lib/database';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  
  if (!slug) {
    return Response.json({ error: 'Slug parameter required' }, { status: 400 });
  }
  
  try {
    console.log('Testing article fetch for slug:', slug);
    
    // Try different search methods
    const results: {
      byId: any[] | null;
      bySlug: any[] | null;
      byTitle: any[] | null;
    } = {
      byId: null,
      bySlug: null,
      byTitle: null
    };
    
    // Try by ID
    const numericId = parseInt(slug);
    if (!isNaN(numericId)) {
      const byId = await query(
        `SELECT p.id, p.title, p.slug, p.status, p.publish
         FROM operaj_db1.posts p 
         WHERE p.id = $1`,
        [numericId]
      );
      results.byId = byId;
    }
    
    // Try by slug
    try {
      const bySlug = await query(
        `SELECT p.id, p.title, p.slug, p.status, p.publish
         FROM operaj_db1.posts p 
         WHERE p.slug = $1`,
        [slug]
      );
      results.bySlug = bySlug;
    } catch {
      results.bySlug = { error: 'Slug field does not exist' };
    }
    
    // Try by title
    const byTitle = await query(
      `SELECT p.id, p.title, p.slug, p.status, p.publish
       FROM operaj_db1.posts p 
       WHERE p.title ILIKE $1`,
      [`%${slug}%`]
    );
    results.byTitle = byTitle;
    
    return Response.json({
      slug,
      results
    });
  } catch (error) {
    console.error('Test article error:', error);
    return Response.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
