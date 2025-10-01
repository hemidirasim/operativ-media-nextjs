'use client';

import { Link as LinkIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface EconomyArticle {
  id: number;
  title: string;
  slug: string;
  subTitle?: string;
  content?: string;
  imageUrl?: string;
  publishedDate: string;
  viewCount?: number;
}

const EconomySection = () => {
  const [articles, setArticles] = useState<EconomyArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchEconomyArticles();
  }, []);

  const fetchEconomyArticles = async () => {
    try {
      const response = await fetch('/api/articles?categoryId=2&limit=8');
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Error fetching economy articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    if (!articles || articles.length === 0) return;
    setCurrentPage(prev => (prev + 1) % Math.ceil(articles.length / 4));
  };

  const prevPage = () => {
    if (!articles || articles.length === 0) return;
    setCurrentPage(prev => prev === 0 ? Math.ceil(articles.length / 4) - 1 : prev - 1);
  };

  const getCurrentArticles = () => {
    if (!articles || articles.length === 0) return [];
    const startIndex = currentPage * 4;
    return articles.slice(startIndex, startIndex + 4);
  };

  if (loading) {
    return (
      <div className="economy-section">
        <div className="economy-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 className="economy-title">İqtisadiyyat</h2>
            <LinkIcon size={16} style={{ color: '#6b7280' }} />
          </div>
          <div className="economy-navigation">
            <button className="nav-button" disabled>
              <ChevronLeft size={20} />
            </button>
            <button className="nav-button" disabled>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
          Yüklənir...
        </div>
      </div>
    );
  }

  return (
    <div className="economy-section">
      {/* Section Header */}
      <div className="economy-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 className="economy-title">İqtisadiyyat</h2>
          <LinkIcon size={16} style={{ color: 'white' }} />
        </div>
        <div className="economy-navigation">
          <button className="nav-button" onClick={prevPage}>
            <ChevronLeft size={20} />
          </button>
          <button className="nav-button" onClick={nextPage}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="economy-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '20px',
        marginTop: '24px'
      }}>
        {getCurrentArticles().map((article) => (
          <Link key={article.id} href={`/post/${article.id}/${article.slug || `post-${article.id}`}`} className="economy-card" style={{ 
            background: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}>
            {/* Article Image */}
            <div style={{ 
              aspectRatio: '16/9',
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
            
            {/* Article Info */}
            <div style={{ padding: '16px' }}>
              <h3 style={{ 
                fontSize: '14px',
                fontWeight: '600',
                color: '#1f2937',
                lineHeight: '1.4',
                marginBottom: '8px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {article.title}
              </h3>
              
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
  );
};

export default EconomySection;
