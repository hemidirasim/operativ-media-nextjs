'use client';

import { useState, useEffect } from 'react';

interface EconomyData {
  totalImpressions: string;
  averageCTR: string;
  averagePosition: string;
}

export default function EconomyDashboard() {
  const [data, setData] = useState<EconomyData>({
    totalImpressions: '17.6K',
    averageCTR: '1.3%',
    averagePosition: '25.2'
  });

  const [currentSlide, setCurrentSlide] = useState(1);

  const nextSlide = () => {
    setCurrentSlide(prev => prev === 4 ? 1 : prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev === 1 ? 4 : prev - 1);
  };

  return (
    <div className="economy-dashboard">
      <div className="dashboard-header">
        <div className="date-filter">
          <span>Date: Last 6 months</span>
          <button className="new-btn">+ NEW</button>
        </div>
        <div className="dashboard-title">İQTİSADİYYAT</div>
      </div>

      <div className="dashboard-content">
        <div className="metrics-grid">
          <div className="metric-card blue">
            <div className="metric-label">Total impressions</div>
            <div className="metric-value">{data.totalImpressions}</div>
          </div>
          <div className="metric-card green">
            <div className="metric-label">Average CTR</div>
            <div className="metric-value">{data.averageCTR}</div>
          </div>
          <div className="metric-card purple">
            <div className="metric-label">Average position</div>
            <div className="metric-value">{data.averagePosition}</div>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-placeholder">
            <div className="chart-lines">
              <div className="line blue-line"></div>
              <div className="line green-line"></div>
              <div className="line purple-line"></div>
            </div>
            <div className="chart-dates">
              <span>3/10/19</span>
              <span>3/24/19</span>
              <span>4/7/19</span>
              <span>4/21/19</span>
              <span>5/5/19</span>
              <span>5/19/19</span>
            </div>
          </div>
        </div>

        <div className="chart-pagination">
          <div className="pagination-dots">
            {[1, 2, 3, 4].map((dot) => (
              <button
                key={dot}
                className={`pagination-dot ${currentSlide === dot ? 'active' : ''}`}
                onClick={() => setCurrentSlide(dot)}
              >
                {dot}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-navigation">
        <button className="nav-arrow left" onClick={prevSlide}>
          ‹
        </button>
        <button className="nav-arrow right" onClick={nextSlide}>
          ›
        </button>
      </div>
    </div>
  );
}

