'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface HeroArticle {
  id: number;
  title: string;
  date: string;
  category: string;
  slug: string;
  imageUrl?: string;
}

interface HeroSliderProps {
  articles: HeroArticle[];
}

const HeroSlider = ({ articles }: HeroSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (!articles || articles.length === 0) {
    return (
      <div className="hero">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '400px',
          background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
          borderRadius: '12px',
          color: '#6b7280',
          fontSize: '18px'
        }}>
          Hero məqalələri yoxdur
        </div>
      </div>
    );
  }

  const currentArticle = articles[currentSlide];

  return (
    <div className="hero">
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="hero-nav prev"
      >
        <ChevronLeft size={20} />
      </button>
      
      <button
        onClick={nextSlide}
        className="hero-nav next"
      >
        <ChevronRight size={20} />
      </button>

      {/* Main Article */}
      <Link href={`/post/${currentArticle?.id}/${currentArticle?.slug}`} className="hero-link">
        <div className="hero-image">
          {currentArticle?.imageUrl ? (
            <img src={currentArticle.imageUrl} alt={currentArticle.title} />
          ) : (
            <span>Featured Image</span>
          )}
        </div>
        
        {/* Category Tag */}
        <div className="category-tag">
          {currentArticle?.category}
        </div>

        {/* Date */}
        <div className="hero-date">
          {currentArticle?.date}
        </div>

        {/* Article Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            {currentArticle?.title}
          </h1>
        </div>
      </Link>

      {/* Pagination Dots */}
      <div className="hero-dots">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
