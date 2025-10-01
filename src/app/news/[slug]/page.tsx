import { notFound } from 'next/navigation';
import { query } from '@/lib/database';
import Link from 'next/link';
import { ArrowLeft, Calendar, Eye, User } from 'lucide-react';
import NewsFeed from '@/components/NewsFeed';
import SelectedNews from '@/components/SelectedNews';
import Header from '@/components/Header';

interface NewsDetailProps {
  params: {
    slug: string;
  };
}

interface Article {
  id: number;
  title: string;
  slug: string;
  subTitle?: string;
  content?: string;
  imageUrl?: string;
  publishedDate: string;
  viewCount?: number;
  author?: string;
  categoryId?: number;
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    console.log('Fetching article for slug:', slug);
    
    let articles;
    
    // Əvvəlcə sadə query ilə axtar
    const numericId = parseInt(slug);
    if (!isNaN(numericId)) {
      console.log('Searching by ID:', numericId);
      articles = await query(
        `SELECT p.id, p.title, p.slug, p.sub_title as "subTitle", 
                p.content, p.image_url as "imageUrl", p.created_at as "publishedDate", 
                p.view_count as "viewCount", 'Operativ Media' as author
         FROM operaj_db1.posts p 
         WHERE p.id = $1 AND p.status = true AND p.publish = true
         LIMIT 1`,
        [numericId]
      );
    } else if (slug.startsWith('post-')) {
      const id = slug.replace('post-', '');
      console.log('Searching by post- ID:', id);
      articles = await query(
        `SELECT p.id, p.title, p.slug, p.sub_title as "subTitle", 
                p.content, p.image_url as "imageUrl", p.created_at as "publishedDate", 
                p.view_count as "viewCount", 'Operativ Media' as author
         FROM operaj_db1.posts p 
         WHERE p.id = $1 AND p.status = true AND p.publish = true
         LIMIT 1`,
        [parseInt(id)]
      );
    } else {
      console.log('Searching by title:', slug);
      // Title ilə axtar
      articles = await query(
        `SELECT p.id, p.title, p.slug, p.sub_title as "subTitle", 
                p.content, p.image_url as "imageUrl", p.created_at as "publishedDate", 
                'Operativ Media' as author
         FROM operaj_db1.posts p 
         WHERE p.title ILIKE $1 AND p.status = true AND p.publish = true
         LIMIT 1`,
        [`%${slug}%`]
      );
      
      // Əgər title ilə tapılmadısa, slug ilə cəhd et
      if (!articles || articles.length === 0) {
        console.log('Title search failed, trying slug search');
        try {
          articles = await query(
            `SELECT p.id, p.title, p.slug, p.sub_title as "subTitle", 
                    p.content, p.image_url as "imageUrl", p.created_at as "publishedDate", 
                    p.view_count as "viewCount", 'Operativ Media' as author
             FROM operaj_db1.posts p 
             WHERE p.slug = $1 AND p.status = true AND p.publish = true
             LIMIT 1`,
            [slug]
          );
        } catch (error) {
          console.log('Slug search also failed:', error);
        }
      }
    }
    
    console.log('Found articles:', articles?.length || 0);
    if (articles && articles.length > 0) {
      console.log('Article title:', articles[0].title);
    }
    return articles?.[0] || null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Enable static generation for better performance
export const revalidate = 60; // Revalidate every 60 seconds

export default async function NewsDetail({ params }: NewsDetailProps) {
  const { slug } = await params;
  
  console.log('NewsDetail component - slug:', slug);
  
  // Parallel data fetching for better performance
  const [article] = await Promise.all([
    getArticle(slug)
  ]);

  console.log('Article found:', !!article);
  
  if (!article) {
    console.log('Article not found, showing 404');
    notFound();
  }

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      {/* Header */}
      <Header />

      {/* Main Content with Sidebars */}
      <main className="main">
        <div className="news-layout">
          {/* Left Sidebar - News Feed */}
          <div className="news-feed-section" style={{ width: '300px', background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <NewsFeed />
          </div>

          {/* Center - Article Content */}
          <div className="content-area">
            <div className="top-content" style={{ padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {/* Article Header */}
        <div style={{ 
          marginBottom: '32px'
        }}>
          {article.categoryId && (
            <div style={{ 
              display: 'inline-block',
              background: '#3b82f6',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              Kateqoriya {article.categoryId}
            </div>
          )}
          
          <h1 style={{ 
            fontSize: '32px',
            fontWeight: '800',
            color: '#1f2937',
            lineHeight: '1.2',
            marginBottom: '16px'
          }}>
            {article.title}
          </h1>
          
          {article.subTitle && (
            <p style={{ 
              fontSize: '20px',
              color: '#4b5563',
              lineHeight: '1.4',
              marginBottom: '24px'
            }}>
              {article.subTitle}
            </p>
          )}
          
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            color: '#6b7280',
            fontSize: '14px',
            marginBottom: '32px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={16} />
              <span>
                {new Date(article.publishedDate).toLocaleDateString('az-AZ', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            
            {article.viewCount && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={16} />
                <span>{article.viewCount} baxış</span>
              </div>
            )}
            
            {article.author && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={16} />
                <span>{article.author}</span>
              </div>
            )}
          </div>
        </div>

        {/* Article Image */}
        <div style={{ 
          aspectRatio: '16/9',
          background: 'linear-gradient(135deg, #e5e7eb, #d1d5db)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6b7280',
          fontSize: '18px',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <span>Article Image</span>
        </div>

        {/* Article Content */}
        <div style={{ 
          fontSize: '18px',
          lineHeight: '1.7',
          color: '#374151',
          marginBottom: '40px'
        }}>
          {article.content ? (
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          ) : (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px',
              padding: '20px',
              background: '#f9fafb',
              borderRadius: '8px'
            }}>
              <div style={{ height: '20px', background: '#e5e7eb', borderRadius: '4px', width: '100%' }}></div>
              <div style={{ height: '20px', background: '#e5e7eb', borderRadius: '4px', width: '80%' }}></div>
              <div style={{ height: '20px', background: '#e5e7eb', borderRadius: '4px', width: '90%' }}></div>
            </div>
          )}
        </div>

            </div>
          </div>

          {/* Right Sidebar - Selected News */}
          <div className="secilmis-xeberler" style={{ width: '300px', background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <SelectedNews />
          </div>
        </div>
      </main>
    </div>
  );
}
