'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface MainNewsItem {
  id: number;
  title: string;
  slug: string;
  publishedDate: string;
  imageUrl?: string;
}

export default function MainNews() {
  const [news, setNews] = useState<MainNewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMainNews = async () => {
      try {
        const response = await fetch('/api/articles?featured=true&limit=1');
        const data = await response.json();
        
        if (data.success && data.articles && data.articles.length > 0) {
          setNews(data.articles[0]);
        }
      } catch (error) {
        console.error('Error fetching main news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMainNews();
  }, []);

  if (loading) {
    return (
      <div className="main-news">
        <div className="main-news-content">
          <div className="news-date">Loading...</div>
          <div className="news-title">Loading...</div>
        </div>
        <button className="news-nav-arrow">›</button>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="main-news">
        <div className="main-news-content">
          <div className="news-date">No news available</div>
          <div className="news-title">No news available</div>
        </div>
        <button className="news-nav-arrow">›</button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
      'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className="main-news">
      <Link href={`/post/${news.id}/${news.slug}`} className="main-news-link">
        <div className="main-news-content">
          <div className="news-date">{formatDate(news.publishedDate)}</div>
          <div className="news-title">{news.title}</div>
        </div>
      </Link>
      <button className="news-nav-arrow">›</button>
    </div>
  );
}
