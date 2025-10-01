'use client';

import { AlertTriangle, Video, Camera, Newspaper } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  content?: string;
  isVerified: boolean;
  publishedAt: string;
}

const NewsFeed = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsFeed();
  }, []);

  const fetchNewsFeed = async () => {
    try {
      const response = await fetch('/api/news-feed?limit=30');
      const data = await response.json();
      setNewsItems(data);
    } catch (error) {
      console.error('Error fetching news feed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isCollapsed) {
    return (
      <div className="sidebar">
        <div className="sidebar-header" onClick={() => setIsCollapsed(false)} style={{ cursor: 'pointer' }}>
          <span className="sidebar-title">XƏBƏR LENTİ</span>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">XƏBƏR LENTİ</span>
        </div>
        <div className="sidebar-content">
          <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
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
            {/* Skeleton loading */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ 
                marginBottom: '12px', 
                padding: '8px',
                background: '#f3f4f6',
                borderRadius: '4px',
                height: '40px'
              }}></div>
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
    <div className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">XƏBƏR LENTİ</span>
      </div>
      
      <div className="sidebar-content">
        {newsItems.slice(0, 10).map((item, index) => {
          // Farklı icon tipleri için rastgele seçim
          const iconTypes = [
            { type: 'alert', color: '#ef4444', icon: AlertTriangle, size: 12 },
            { type: 'video', color: '#3b82f6', icon: Video, size: 12 },
            { type: 'photo', color: '#10b981', icon: Camera, size: 12 },
            { type: 'news', color: '#6b7280', icon: Newspaper, size: 12 }
          ];
          const randomIcon = iconTypes[index % iconTypes.length];
          const IconComponent = randomIcon.icon;
          
          return (
            <Link key={item.id} href={`/post/${item.id}/${item.slug}`} className="news-item">
              <div style={{ 
                marginBottom: '12px',
                padding: '12px',
                borderRadius: '8px',
                transition: 'background-color 0.2s ease',
                background: '#f9fafb'
              }}>
                {/* Üst kısım - Saat ve İcon */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  {/* Timestamp */}
                  <div style={{
                    background: '#e5e7eb',
                    color: '#6b7280',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    whiteSpace: 'nowrap'
                  }}>
                    {new Date(item.publishedAt).toLocaleTimeString('az-AZ', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  
                  {/* Icon */}
                  <div style={{
                    background: randomIcon.color,
                    borderRadius: '4px',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <IconComponent size={randomIcon.size} />
                  </div>
                </div>
                
                {/* Alt kısım - Başlık */}
                <div>
                  <h4 style={{ 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: index === 0 ? '#ef4444' : '#1f2937', // İlk haber kırmızı
                    lineHeight: '1.4', 
                    margin: 0,
                    textTransform: 'capitalize'
                  }}>
                    {item.title}
                  </h4>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NewsFeed;