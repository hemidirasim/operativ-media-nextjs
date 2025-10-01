import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsSection from '@/components/NewsSection';
import Pagination from '@/components/Pagination';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

// Category ID mapping - match original site format
const categoryMap: { [key: string]: number } = {
  'siyaset': 1,
  'iqtisadiyyat': 2,
  'medeniyyet': 3,
  'dunya': 4,
  'idman': 5,
  'cemiyyet': 6,
  'gundem': 7,
  'musahibe': 8,
  'olke': 9,
  'ikt': 10,
  'sehiyye': 11,
  'herbi': 12,
  'slayder': 13
};

// Category name mapping
const categoryNames: { [key: number]: string } = {
  1: 'Siyasət',
  2: 'İqtisadiyyat',
  3: 'Mədəniyyət',
  4: 'Dünya',
  5: 'İdman',
  6: 'Cəmiyyət',
  7: 'Gündəm',
  8: 'Müsahibə',
  9: 'Ölkə',
  10: 'İKT',
  11: 'Səhiyyə',
  12: 'HƏRBİ',
  13: 'Slayder'
};

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page } = await searchParams;
  const categoryId = categoryMap[slug];
  
  if (!categoryId) {
    notFound();
  }

  const categoryName = categoryNames[categoryId];
  const currentPage = parseInt(page || '1');
  const itemsPerPage = 50;
  const offset = (currentPage - 1) * itemsPerPage;

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <Header />
      
      <main className="main">
        {/* Category Content Only */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '20px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#1f2937',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {categoryName}
          </h1>
          
          <NewsSection 
            title="" 
            categoryId={categoryId}
            limit={itemsPerPage}
            offset={offset}
            showNavigation={false}
          />
          
          {/* Pagination */}
          <Pagination 
            currentPage={currentPage}
            totalItems={1000} // We'll calculate this dynamically
            itemsPerPage={itemsPerPage}
            baseUrl={`/category/${slug}`}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
