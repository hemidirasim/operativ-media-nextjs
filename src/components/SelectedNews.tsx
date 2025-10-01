'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface SelectedNewsItem {
  id: number;
  title: string;
  slug?: string;
  content?: string;
  imageUrl?: string;
  publishedDate: string;
  categoryId?: number;
}

const SelectedNews = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedNews, setSelectedNews] = useState<SelectedNewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSelectedNews();
  }, []);

  const fetchSelectedNews = async () => {
    try {
      const response = await fetch('/api/articles?featured=true&limit=7');
      const data = await response.json();
      
      // Filter out invalid articles
      const validArticles = (data.articles || []).filter((article: any) => 
        article && 
        article.id && 
        article.title && 
        article.publishedDate
      );
      
      setSelectedNews(validArticles);
    } catch (error) {
      console.error('Error fetching selected news:', error);
      setSelectedNews([]);
    } finally {
      setLoading(false);
    }
  };

  if (isCollapsed) {
    return (
      <div className="sidebar">
        <div className="sidebar-header" onClick={() => setIsCollapsed(false)} style={{ cursor: 'pointer' }}>
          <span className="sidebar-title">Seçilmiş xəbərlər</span>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">Seçilmiş xəbərlər</span>
        </div>
        <div className="sidebar-content">
          <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
            Yüklənir...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">Seçilmiş xəbərlər</span>
      </div>
      
      <div className="sidebar-content" style={{ 
        maxHeight: '600px', 
        overflowY: 'auto',
        paddingRight: '8px'
      }}>
        {selectedNews
          .filter(item => item && item.id && item.title)
          .filter((item, index, self) => index === self.findIndex(t => t.id === item.id))
          .map((item, index) => {
          // Different background colors for each news item
          const backgroundColors = [
            'linear-gradient(135deg, #dbeafe, #bfdbfe)', // Light blue
            'linear-gradient(135deg, #dcfce7, #bbf7d0)', // Light green  
            'linear-gradient(135deg, #fef3c7, #fde68a)', // Light yellow
            'linear-gradient(135deg, #fce7f3, #fbcfe8)', // Light pink
            'linear-gradient(135deg, #e0e7ff, #c7d2fe)', // Light purple
            'linear-gradient(135deg, #f3e8ff, #e9d5ff)', // Light violet
            'linear-gradient(135deg, #ecfdf5, #d1fae5)'  // Light emerald
          ];
          
          const backgroundColor = backgroundColors[index % backgroundColors.length];
          
          // Güvenli slug oluşturma
          let safeSlug = 'post';
          if (item.slug && typeof item.slug === 'string' && item.slug.trim() !== '') {
            safeSlug = item.slug;
          } else if (item.id) {
            safeSlug = `post-${item.id}`;
          }
          
          return (
            <Link key={`selected-news-${item.id}-${index}`} href={`/post/${item.id}/${safeSlug}`} className="news-item">
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '12px',
                background: backgroundColor,
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#1f2937', 
                    lineHeight: '1.4', 
                    marginBottom: '4px' 
                  }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>
                    {new Date(item.publishedDate).toLocaleDateString('az-AZ')}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SelectedNews;