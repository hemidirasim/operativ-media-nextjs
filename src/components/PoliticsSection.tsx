'use client';

import { Link as LinkIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface PoliticsArticle {
  id: number;
  title: string;
  slug: string;
  subTitle?: string;
  content?: string;
  imageUrl?: string;
  publishedDate: string;
  viewCount?: number;
}

const PoliticsSection = () => {
  const [mainArticle, setMainArticle] = useState<PoliticsArticle | null>(null);
  const [sideArticles, setSideArticles] = useState<PoliticsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPoliticsArticles();
  }, []);

  const fetchPoliticsArticles = async () => {
    try {
      const response = await fetch('/api/articles?categoryId=1&limit=5');
      const data = await response.json();
      
      if (data.articles && data.articles.length > 0) {
        setMainArticle(data.articles[0]); // İlk məqalə əsas məqalə
        setSideArticles(data.articles.slice(1, 5)); // Qalan 4 məqalə yan məqalələr
      }
    } catch (error) {
      console.error('Error fetching politics articles:', error);
      setMainArticle(null);
      setSideArticles([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="news-section">
        <div className="section-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 className="section-title">Siyasət</h2>
            <LinkIcon size={16} style={{ color: '#6b7280' }} />
          </div>
        </div>
        <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
          Yüklənir...
        </div>
      </div>
    );
  }

  return (
    <div className="news-section">
      {/* Section Header */}
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 className="section-title">Siyasət</h2>
          <LinkIcon size={16} style={{ color: '#6b7280' }} />
        </div>
      </div>

      {/* Politics Layout - Main Article + Side Articles */}
      <div className="politics-layout" style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '24px',
        marginTop: '24px'
      }}>
        {/* Main Article (Left) */}
        {mainArticle && (
          <Link href={`/post/${mainArticle.id}/${mainArticle.slug || `post-${mainArticle.id}`}`} className="politics-main-article" style={{ 
            background: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ 
              aspectRatio: '16/9',
              background: 'linear-gradient(135deg, #e5e7eb, #d1d5db)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
              fontSize: '18px',
              position: 'relative'
            }}>
              <span>Main Article Image</span>
            </div>
            
            <div style={{ padding: '20px' }}>
              <p style={{ 
                fontSize: '14px', 
                color: '#6b7280', 
                marginBottom: '12px' 
              }}>
                {new Date(mainArticle.publishedDate).toLocaleDateString('az-AZ', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              
              <h3 style={{ 
                fontSize: '20px',
                fontWeight: '700',
                color: '#1f2937',
                lineHeight: '1.4',
                marginBottom: '12px'
              }}>
                {mainArticle.title}
              </h3>
              
              {mainArticle.subTitle && (
                <p style={{ 
                  fontSize: '16px',
                  color: '#4b5563',
                  lineHeight: '1.5'
                }}>
                  {mainArticle.subTitle}
                </p>
              )}
            </div>
          </Link>
        )}

        {/* Side Articles (Right) - 2x2 Grid */}
        <div className="politics-side-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '16px' 
        }}>
          {sideArticles.map((article) => (
            <Link key={article.id} href={`/post/${article.id}/${article.slug || `post-${article.id}`}`} className="politics-side-article" style={{ 
              background: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ 
                aspectRatio: '1',
                background: 'linear-gradient(135deg, #e5e7eb, #d1d5db)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280',
                fontSize: '14px',
                position: 'relative'
              }}>
                <span>Article Image</span>
              </div>
              
              <div style={{ padding: '12px' }}>
                <p style={{ 
                  fontSize: '12px', 
                  color: '#6b7280', 
                  marginBottom: '8px' 
                }}>
                  {new Date(article.publishedDate).toLocaleDateString('az-AZ', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                
                <h4 style={{ 
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1f2937',
                  lineHeight: '1.4',
                  marginBottom: '8px'
                }}>
                  {article.title}
                </h4>
                
                {article.viewCount && (
                  <p style={{ 
                    fontSize: '11px', 
                    color: '#9ca3af' 
                  }}>
                    {article.viewCount} baxış
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PoliticsSection;
