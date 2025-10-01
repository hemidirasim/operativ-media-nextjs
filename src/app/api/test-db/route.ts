import { query } from '@/lib/database';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Test database connection
    const result = await query('SELECT current_database(), current_user');
    
    return Response.json({
      success: true,
      database: result[0]?.current_database,
      user: result[0]?.current_user,
      message: 'Database connection successful'
    });
  } catch (error) {
    console.error('Database connection error:', error);
    
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Database connection failed'
    }, { status: 500 });
  }
}
