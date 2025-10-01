import { query } from '@/lib/database';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check if operaj_db1 schema exists
    const schemaCheck = await query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name = 'operaj_db1'
    `);
    
    if (schemaCheck.length === 0) {
      return Response.json({
        success: false,
        message: 'operaj_db1 schema not found',
        suggestion: 'Database might be named differently or schema is not public'
      });
    }
    
    // Check tables in operaj_db1 schema
    const tables = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'operaj_db1'
    `);
    
    return Response.json({
      success: true,
      schema: 'operaj_db1',
      tables: tables.map(t => t.table_name),
      message: 'Schema and tables found successfully'
    });
    
  } catch (error) {
    console.error('Table check error:', error);
    
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to check tables'
    }, { status: 500 });
  }
}
