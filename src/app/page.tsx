import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsFeed from '@/components/NewsFeed';
import SelectedNews from '@/components/SelectedNews';
import HeroSection from '@/components/HeroSection';
import NewsSection from '@/components/NewsSection';
import PoliticsSection from '@/components/PoliticsSection';
import VideoNewsSection from '@/components/VideoNewsSection';
import EconomySection from '@/components/EconomySection';
import AgendaSection from '@/components/AgendaSection';
import JsonLd, { websiteJsonLd } from '@/components/JsonLd';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Enhanced metadata for homepage
export const metadata: Metadata = {
  title: 'Ana Səhifə',
  description: 'Azərbaycanın ən etibarlı xəbər portalı. Son xəbərlər, siyasət, iqtisadiyyat, idman, mədəniyyət və daha çox sahədə ən aktual məlumatlar. Operativ Media-dan gündəlik xəbərlər.',
  keywords: [
    'ana səhifə',
    'xəbərlər',
    'azərbaycan',
    'son xəbərlər',
    'siyasət',
    'iqtisadiyyat',
    'idman',
    'mədəniyyət',
    'operativ media',
    'aktual xəbərlər',
    'gündəm'
  ],
  openGraph: {
    title: 'Operativ Media - Azərbaycanın ən etibarlı xəbər portalı',
    description: 'Azərbaycanın ən etibarlı xəbər portalı. Son xəbərlər, siyasət, iqtisadiyyat, idman, mədəniyyət və daha çox sahədə ən aktual məlumatlar.',
    type: 'website',
    locale: 'az_AZ',
    url: 'https://operativmedia.az',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Operativ Media - Azərbaycanın ən etibarlı xəbər portalı',
    description: 'Azərbaycanın ən etibarlı xəbər portalı. Son xəbərlər, siyasət, iqtisadiyyat, idman, mədəniyyət və daha çox sahədə ən aktual məlumatlar.',
  },
  alternates: {
    canonical: 'https://operativmedia.az',
  },
};

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <JsonLd data={websiteJsonLd} />
      <Header />
      
      <main className="main">
        {/* Main Layout with News Feed and Content */}
        <div className="main-layout">
          {/* Left Sidebar - News Feed */}
          <div className="news-feed-section">
            <NewsFeed />
          </div>

          {/* Right Content Area */}
          <div className="content-area">
            {/* Top Section - Hero */}
            <div className="top-content">
              <HeroSection />
            </div>

            {/* Bottom Section - Son Xəbərlər and Seçilmiş xəbərlər */}
            <div className="bottom-content">
              <div className="son-xeberler">
                {/* 6 News in Grid */}
                <div className="son-xeberler-grid">
                  <NewsSection 
                    title="" 
                    categoryId={13}
                    limit={6}
                    showNavigation={false}
                    offset={5}
                  />
                </div>
              </div>
              
              <div className="secilmis-xeberler">
                <SelectedNews />
              </div>
            </div>
          </div>
        </div>

        {/* News Sections */}
        <div>
          {/* Agenda Section */}
          <AgendaSection />

          {/* Politics Section */}
          <PoliticsSection />

          {/* Video News Section */}
          <VideoNewsSection />

          {/* Economy Section */}
          <EconomySection />

          {/* Culture Section */}
          <NewsSection 
            title="Mədəniyyət" 
            categoryId={3}
            limit={6}
          />

          {/* World Section */}
          <NewsSection 
            title="Dünya" 
            categoryId={4}
            limit={6}
          />

          {/* Sports Section */}
          <NewsSection 
            title="İdman" 
            categoryId={5}
            limit={6}
          />

          {/* Society Section */}
          <NewsSection 
            title="Cəmiyyət" 
            categoryId={6}
            limit={6}
          />

          {/* Interview Section */}
          <NewsSection 
            title="Müsahibə" 
            categoryId={8}
            limit={6}
          />

          {/* Country Section */}
          <NewsSection 
            title="Ölkə" 
            categoryId={9}
            limit={6}
          />

          {/* IKT Section */}
          <NewsSection 
            title="İKT" 
            categoryId={10}
            limit={6}
          />

          {/* Health Section */}
          <NewsSection 
            title="Səhiyyə" 
            categoryId={11}
            limit={6}
          />

          {/* Military Section */}
          <NewsSection 
            title="Hərbi" 
            categoryId={12}
            limit={6}
          />

        </div>
      </main>

      <Footer />
    </div>
  );
}