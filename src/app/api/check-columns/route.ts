import { query } from '@/lib/database';

export async function GET() {
  try {
    // Check what columns exist in posts table
    const columnsQuery = await query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'operaj_db1' 
      AND table_name = 'posts'
      ORDER BY ordinal_position
    `);
    
    // Get sample data to see what's available
    const sampleData = await query(`
      SELECT * FROM operaj_db1.posts 
      WHERE status = true AND publish = true 
      LIMIT 1
    `);
    
    return Response.json({
      success: true,
      columns: columnsQuery,
      sampleData: sampleData[0] || null
    });
  } catch (error) {
    console.error('Check columns error:', error);
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
