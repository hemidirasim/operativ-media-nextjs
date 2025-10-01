'use client';

import { ChevronLeft, ChevronRight, Link as LinkIcon, Play } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  subTitle?: string;
  content?: string;
  imageUrl?: string;
  videoUrl?: string;
  youtubeLink?: string;
  youtubeImage?: string;
  publishedDate: string;
  viewCount?: number;
  categoryId?: number;
  isVideo?: boolean;
}

interface NewsSectionProps {
  title: string;
  categoryId?: number;
  showNavigation?: boolean;
  isVideoSection?: boolean;
  isPhotoGallery?: boolean;
  limit?: number;
  offset?: number;
}

const NewsSection = ({ 
  title, 
  categoryId, 
  showNavigation = false, 
  isVideoSection = false,
  isPhotoGallery = false,
  limit = 3,
  offset = 0
}: NewsSectionProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = useCallback(async () => {
    try {
      let url = '/api/articles';
      
      if (isVideoSection) {
        url = '/api/video-news';
      } else if (isPhotoGallery) {
        url = '/api/photo-gallery';
      } else if (categoryId) {
        url = `/api/articles?categoryId=${categoryId}&limit=${limit}&offset=${offset}`;
      } else {
        url = `/api/articles?limit=${limit}&offset=${offset}`;
      }
      
      console.log('NewsSection fetching from:', url);
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('NewsSection received data:', { dataLength: data.articles?.length, data });
      
      // API-dən gələn məlumat formatına görə parse et
      if (isVideoSection || isPhotoGallery) {
        setNewsItems(data || []);
      } else {
        setNewsItems(data.articles || []);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setNewsItems([]);
    } finally {
      setLoading(false);
    }
  }, [categoryId, limit, offset, isVideoSection, isPhotoGallery]);

  useEffect(() => {
    console.log('NewsSection useEffect triggered:', { categoryId, limit, offset });
    fetchArticles();
  }, [fetchArticles]);

  // For category pages, show all items without internal pagination
  const itemsPerPage = categoryId ? newsItems.length : 3;
  const totalPages = categoryId ? 1 : Math.ceil((newsItems?.length || 0) / itemsPerPage);
  const currentItems = categoryId ? (newsItems || []) : (newsItems || []).slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const nextPage = () => {
    if (!categoryId) {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }
  };

  const prevPage = () => {
    if (!categoryId) {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    }
  };

  if (loading) {
    return (
      <div className="news-section">
        <div className="section-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 className="section-title">{title}</h2>
            <LinkIcon size={16} style={{ color: '#6b7280' }} />
          </div>
        </div>
        <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '8px',
            marginBottom: '16px'
          }}>
            <div style={{ 
              width: '16px', 
              height: '16px', 
              border: '2px solid #e5e7eb',
              borderTop: '2px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            Yüklənir...
          </div>
          {/* Skeleton grid */}
          <div className="news-grid">
            {Array.from({ length: limit || 3 }).map((_, i) => (
              <div key={i} style={{ 
                background: '#f3f4f6',
                borderRadius: '8px',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                padding: '16px'
              }}>
                <div style={{ 
                  background: '#e5e7eb',
                  height: '120px',
                  borderRadius: '4px',
                  marginBottom: '12px'
                }}></div>
                <div style={{ 
                  background: '#e5e7eb',
                  height: '16px',
                  borderRadius: '4px',
                  marginBottom: '8px'
                }}></div>
                <div style={{ 
                  background: '#e5e7eb',
                  height: '14px',
                  borderRadius: '4px',
                  width: '60%'
                }}></div>
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="news-section">
      {/* Section Header */}
      {title && (
        <div className="section-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 className="section-title">{title}</h2>
            <LinkIcon size={16} style={{ color: '#6b7280' }} />
          </div>
          {showNavigation && totalPages > 1 && (
            <div className="section-nav">
              <button onClick={prevPage} className="nav-btn">
                <ChevronLeft size={16} />
              </button>
              <button onClick={nextPage} className="nav-btn">
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* News Grid */}
      <div className="news-grid">
        {currentItems.map((item) => (
          <Link key={item.id} href={`/post/${item.id}/${item.slug || `post-${item.id}`}`} className="news-card">
            <div className="news-image">
              {isVideoSection && (
                <div className="video-overlay">
                  <div className="play-btn">
                    <Play size={24} style={{ marginLeft: '2px' }} />
                  </div>
                </div>
              )}
              <span>News Image</span>
              
              {isVideoSection && (
                <div className="video-tag">
                  VIDEO
                </div>
              )}
            </div>
            
            <div className="news-content">
              <h3 className="news-card-title">
                {item.title}
              </h3>
              {item.subTitle && (
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                  {item.subTitle}
                </p>
              )}
              <p className="news-date">
                {new Date(item.publishedDate).toLocaleDateString('az-AZ')}
              </p>
              {item.viewCount && (
                <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                  {item.viewCount} baxış
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;