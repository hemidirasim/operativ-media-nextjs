'use client';

import { Link as LinkIcon, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VideoArticle {
  id: number;
  title: string;
  slug: string;
  subTitle?: string;
  content?: string;
  imageUrl?: string;
  videoUrl?: string;
  publishedDate: string;
  viewCount?: number;
}

const VideoNewsSection = () => {
  const [videos, setVideos] = useState<VideoArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideoNews();
  }, []);

  const fetchVideoNews = async () => {
    try {
      const response = await fetch('/api/articles?limit=8'); // Video içerikli haberler
      const data = await response.json();
      setVideos((data.articles || []).slice(0, 4)); // İlk 4 videonu götür
    } catch (error) {
      console.error('Error fetching video news:', error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="news-section">
        <div className="section-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 className="section-title">Video xəbərlər</h2>
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
          <h2 className="section-title">Video xəbərlər</h2>
          <LinkIcon size={16} style={{ color: '#6b7280' }} />
        </div>
      </div>

      {/* Video Grid - 4 videos in a row */}
      <div className="video-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '20px',
        marginTop: '24px'
      }}>
        {videos.map((video) => (
          <div key={video.id} className="video-card" style={{ 
            background: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}>
            {/* Video Thumbnail */}
            <div style={{ 
              position: 'relative',
              aspectRatio: '16/9',
              background: 'linear-gradient(135deg, #1f2937, #374151)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px'
            }}>
              {/* Play Button */}
              <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                background: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <Play size={16} fill="white" />
              </div>
              
              {/* Video Thumbnail Placeholder */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, #1f2937, #374151)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9ca3af',
                fontSize: '12px'
              }}>
                Video Thumbnail
              </div>
            </div>
            
            {/* Video Info */}
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
                {video.title}
              </h3>
              
              <p style={{ 
                fontSize: '12px', 
                color: '#6b7280',
                marginBottom: '8px'
              }}>
                {new Date(video.publishedDate).toLocaleDateString('az-AZ', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              
              {video.viewCount && (
                <p style={{ 
                  fontSize: '11px', 
                  color: '#9ca3af' 
                }}>
                  {video.viewCount} baxış
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoNewsSection;
