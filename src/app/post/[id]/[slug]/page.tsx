import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsFeed from '@/components/NewsFeed';
import SelectedNews from '@/components/SelectedNews';
import { query } from '@/lib/database';
import { Calendar, Eye, User } from 'lucide-react';

interface PostPageProps {
  params: Promise<{ id: string; slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id, slug } = await params;
  
  const getArticle = async (articleId: string) => {
    try {
      console.log('Fetching article with ID:', articleId, 'and slug:', slug);
      
      // Try to get article by ID first
      let queryText = `
        SELECT 
          p.id,
          p.title,
          p.slug,
          p.sub_title as "subTitle",
          p.content,
          p.image_url as "imageUrl",
          p.created_at as "publishedDate",
          p.view_count as "viewCount",
          'Operativ Media' as author,
          cp.category_id as "categoryId"
        FROM operaj_db1.posts p
        LEFT JOIN operaj_db1.category_post cp ON p.id = cp.post_id
        WHERE p.id = $1 AND p.status = true AND p.publish = true
        LIMIT 1
      `;
      
      let result = await query(queryText, [articleId]);
      console.log('First query result:', result);
      console.log('Result type:', typeof result);
      console.log('Result.rows type:', typeof result?.rows);
      console.log('Result.rows length:', result?.rows?.length);
      console.log('Result is array:', Array.isArray(result));
      console.log('Result length:', result?.length);
      
      // Check if result is directly an array or has rows property
      const rows = Array.isArray(result) ? result : (result?.rows || []);
      console.log('Rows to check:', rows);
      console.log('Rows length:', rows.length);
      
      if (rows && rows.length > 0) {
        console.log('Article found by ID:', rows[0]);
        return rows[0];
      }
      
      console.log('No result by ID, trying by slug...');
      // If not found by ID, try by slug
      queryText = `
        SELECT 
          p.id,
          p.title,
          p.slug,
          p.sub_title as "subTitle",
          p.content,
          p.image_url as "imageUrl",
          p.created_at as "publishedDate",
          p.view_count as "viewCount",
          'Operativ Media' as author,
          cp.category_id as "categoryId"
        FROM operaj_db1.posts p
        LEFT JOIN operaj_db1.category_post cp ON p.id = cp.post_id
        WHERE p.slug = $1 AND p.status = true AND p.publish = true
        LIMIT 1
      `;
      
      result = await query(queryText, [slug]);
      console.log('Second query result:', result);
      
      // Update rows for second query
      const secondRows = Array.isArray(result) ? result : (result?.rows || []);
      console.log('Second rows to check:', secondRows);
      console.log('Second rows length:', secondRows.length);
      
      if (secondRows && secondRows.length > 0) {
        console.log('Article found by slug:', secondRows[0]);
        return secondRows[0];
      }
      
      console.log('No article found');
      return null;
    } catch (error) {
      console.error('Error fetching article:', error);
      return null;
    }
  };

  const article = await getArticle(id);
  
  if (!article) {
    notFound();
  }

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <Header />
      
      <main className="main">
        {/* Main Layout with News Feed and Content */}
        <div className="news-layout">
          {/* Left Sidebar - News Feed */}
          <div className="news-feed-section" style={{ width: '300px', background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <NewsFeed />
          </div>

          {/* Center Content Area - Article */}
          <div className="content-area">
            {/* Article Content */}
            <div className="top-content">
              <div style={{ 
                background: 'white', 
                borderRadius: '12px', 
                padding: '20px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                marginBottom: '20px'
              }}>
                {/* Article Header */}
                <div style={{ marginBottom: '20px' }}>
                  <h1 style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold', 
                    color: '#1f2937',
                    marginBottom: '10px',
                    lineHeight: '1.3'
                  }}>
                    {article.title}
                  </h1>
                  
                  {article.subTitle && (
                    <p style={{ 
                      fontSize: '1.1rem', 
                      color: '#6b7280',
                      marginBottom: '15px',
                      lineHeight: '1.4'
                    }}>
                      {article.subTitle}
                    </p>
                  )}
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '20px',
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '20px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={16} />
                      {new Date(article.publishedDate).toLocaleDateString('az-AZ', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    
                    {article.viewCount && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Eye size={16} />
                        {article.viewCount} baxış
                      </div>
                    )}
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <User size={16} />
                      {article.author}
                    </div>
                  </div>
                </div>

                {/* Article Image */}
                {article.imageUrl && (
                  <div style={{ marginBottom: '20px' }}>
                    <img 
                      src={`http://operativmedia.az/frontend/img/${article.imageUrl}`}
                      alt={article.title}
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                )}

                {/* Article Content */}
                <div 
                  style={{ 
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: '#374151'
                  }}
                  dangerouslySetInnerHTML={{ __html: article.content || '' }}
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar - Selected News */}
          <div className="secilmis-xeberler" style={{ width: '300px', background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <SelectedNews />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
