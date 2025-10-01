'use client';

import { ChevronLeft, ChevronRight, Camera, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

interface GalleryItem {
  id: number;
  title: string;
  slug: string;
  imageUrl?: string;
  publishedDate: string;
}

const PhotoGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotoGallery();
  }, []);

  const fetchPhotoGallery = async () => {
    try {
      const response = await fetch('/api/articles?limit=12'); // Foto galeri için haberler
      const data = await response.json();
      setGalleryItems(data.articles || []);
    } catch (error) {
      console.error('Error fetching photo gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const currentItem = galleryItems[currentSlide];

  if (loading) {
    return (
      <div className="gallery-section">
        <div className="gallery-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="gallery-icon">
              <Camera size={24} />
            </div>
            <h2 className="gallery-title">Foto Qalereya</h2>
          </div>
        </div>
        <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
          Yüklənir...
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-section">
      {/* Section Header */}
      <div className="gallery-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="gallery-icon">
            <Camera size={24} />
          </div>
          <h2 className="gallery-title">Foto Qalereya</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button className="gallery-all-btn">
            <ExternalLink size={16} />
            Hamısı
          </button>
          <div className="gallery-nav">
            <button onClick={prevSlide} className="gallery-nav-btn">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextSlide} className="gallery-nav-btn">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Modern Gallery Content */}
      <div className="gallery-content">
        <div className="gallery-main-image">
          <div className="gallery-image-overlay">
            <div className="gallery-image-placeholder">
              <Camera size={48} />
              <span>Gallery Image</span>
            </div>
          </div>
          
          {/* Image Info Overlay */}
          <div className="gallery-image-info">
            <div className="gallery-slide-counter">
              {currentSlide + 1} / {galleryItems.length}
            </div>
          </div>
        </div>
        
        <div className="gallery-details">
          <h3 className="gallery-item-title">
            {currentItem?.title || 'Yüklənir...'}
          </h3>
          {currentItem && (
            <div className="gallery-meta">
              <span className="gallery-date">
                {new Date(currentItem.publishedDate).toLocaleDateString('az-AZ', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
              <span className="gallery-dot">•</span>
              <span className="gallery-photos">Foto Qalereya</span>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {galleryItems.length > 1 && (
        <div className="gallery-thumbnails">
          {galleryItems.slice(0, 5).map((item, index) => (
            <button
              key={item.id}
              className={`gallery-thumbnail ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            >
              <div className="thumbnail-image">
                <Camera size={16} />
              </div>
            </button>
          ))}
          {galleryItems.length > 5 && (
            <div className="gallery-more">
              +{galleryItems.length - 5}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;