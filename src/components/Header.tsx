'use client';

import { Search, Menu, X, ArrowLeft, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface SearchResult {
  id: number;
  title: string;
  slug: string;
  publishedDate: string;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        
        if (data.success) {
          // Filter to show only the main categories (1-9) and limit to reasonable number
          const mainCategories = data.categories
            .filter((cat: any) => parseInt(cat.id) <= 9)
            .slice(0, 9);
          setCategories(mainCategories);
        } else {
          // Fallback to hardcoded categories if API fails
          setCategories([
            { id: 1, name: 'Siyasət', slug: 'siyaset' },
            { id: 2, name: 'İqtisadiyyat', slug: 'iqtisadiyyat' },
            { id: 3, name: 'Mədəniyyət', slug: 'medeniyyet' },
            { id: 4, name: 'Dünya', slug: 'dunya' },
            { id: 5, name: 'İdman', slug: 'idman' },
            { id: 6, name: 'Cəmiyyət', slug: 'cemiyyet' },
            { id: 7, name: 'Gündəm', slug: 'gundem' },
            { id: 8, name: 'Müsahibə', slug: 'musahibe' },
            { id: 9, name: 'Ölkə', slug: 'olke' },
            { id: 10, name: 'İKT', slug: 'ikt' },
            { id: 11, name: 'Səhiyyə', slug: 'sehiyye' },
            { id: 12, name: 'HƏRBİ', slug: 'herbi' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to hardcoded categories
        setCategories([
          { id: 1, name: 'Siyasət', slug: 'siyaset' },
          { id: 2, name: 'İqtisadiyyat', slug: 'iqtisadiyyat' },
          { id: 3, name: 'Mədəniyyət', slug: 'medeniyyet' },
          { id: 4, name: 'Dünya', slug: 'dunya' },
          { id: 5, name: 'İdman', slug: 'idman' },
          { id: 6, name: 'Cəmiyyət', slug: 'cemiyyet' },
          { id: 7, name: 'Gündəm', slug: 'gundem' },
          { id: 8, name: 'Müsahibə', slug: 'musahibe' },
          { id: 9, name: 'Ölkə', slug: 'olke' },
          { id: 10, name: 'İKT', slug: 'ikt' },
          { id: 11, name: 'Səhiyyə', slug: 'sehiyye' },
          { id: 12, name: 'HƏRBİ', slug: 'herbi' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Search functionality
  const performSearch = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/articles?search=${encodeURIComponent(query)}&limit=5`);
      const data = await response.json();
      setSearchResults(data.articles || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('.header-actions')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen]);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <div className="logo-section">
          <Link href="/" className="logo">
            <img 
              src="http://operativmedia.az/frontend/img/loqo.svg" 
              alt="Operativ Media Logo"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav" style={{ display: isSearchOpen ? 'none' : 'flex' }}>
          {loading ? (
            <div className="nav-item">Yüklənir...</div>
          ) : (
            categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="nav-item"
              >
                {category.name}
              </Link>
            ))
          )}
        </nav>

        {/* Right side icons */}
        <div className="header-actions">
          <div className="search-container" ref={searchRef}>
            {isSearchOpen ? (
                  <div className="search-input-container" style={{ minWidth: '400px' }}>
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Xəbər axtar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                <button 
                  className="search-close-btn"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                >
                  <X size={16} />
                </button>
                
                {/* Search Results */}
                {(searchResults.length > 0 || isSearching) && (
                  <div className="search-results">
                    {isSearching ? (
                      <div className="search-loading">
                        <div className="loading-spinner"></div>
                        Axtarılır...
                      </div>
                    ) : searchResults.length > 0 ? (
                      searchResults.map((result) => (
                        <Link
                          key={result.id}
                          href={`/post/${result.id}/${result.slug}`}
                          className="search-result-item"
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                            setSearchResults([]);
                          }}
                        >
                          <div className="search-result-title">{result.title}</div>
                          <div className="search-result-date">
                            {new Date(result.publishedDate).toLocaleDateString('az-AZ')}
                          </div>
                        </Link>
                      ))
                    ) : searchQuery.length >= 2 && (
                      <div className="search-no-results">
                        Nəticə tapılmadı
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <button 
                className="search-btn"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={20} />
              </button>
            )}
          </div>
          
          <button 
            className="menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Modal */}
      {isMenuOpen && (
        <div 
          style={{ 
            position: 'absolute',
            top: '100%',
            right: '50px',
            zIndex: 1000,
            marginTop: '8px'
          }}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
              width: '350px',
              maxHeight: '70vh',
              overflowY: 'auto',
              position: 'relative'
            }}
          >
            
            <div style={{ padding: '20px' }}>
            {/* Kateqoriyalar */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '700', 
                color: '#1f2937', 
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Kateqoriyalar
              </h3>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {loading ? (
                  <div className="nav-item">Yüklənir...</div>
                ) : (
                  categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="nav-item"
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        transition: 'background-color 0.2s ease'
                      }}
                    >
                      {category.name}
                    </Link>
                  ))
                )}
              </nav>
            </div>

            {/* Səhifələr */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '700', 
                color: '#1f2937', 
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Səhifələr
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRadius: '6px', transition: 'background-color 0.2s ease' }}>
                  <div style={{ width: '20px', height: '20px', background: '#6b7280', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 'bold' }}>i</div>
                  <span style={{ fontSize: '14px', color: '#374151' }}>Haqqımızda</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRadius: '6px', transition: 'background-color 0.2s ease' }}>
                  <Mail size={20} style={{ color: '#6b7280' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Əlaqə</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRadius: '6px', transition: 'background-color 0.2s ease' }}>
                  <div style={{ width: '20px', height: '20px', background: '#10b981', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                      <path d="M2 17L12 22L22 17"/>
                      <path d="M2 12L12 17L22 12"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: '14px', color: '#374151' }}>Məxfilik Siyasəti</span>
                </div>
              </div>
            </div>

            {/* Əlaqə */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '700', 
                color: '#1f2937', 
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Əlaqə
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px' }}>
                  <Mail size={16} style={{ color: '#6b7280' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>info@operativmedia.az</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px' }}>
                  <Phone size={16} style={{ color: '#6b7280' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>+994 12 XXX XX XX</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px' }}>
                  <MapPin size={16} style={{ color: '#6b7280' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Bakı, Azərbaycan</span>
                </div>
              </div>
            </div>

            {/* Bizi İzləyin */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '700', 
                color: '#1f2937', 
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Bizi İzləyin
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRadius: '6px', transition: 'background-color 0.2s ease' }}>
                  <Facebook size={20} style={{ color: '#1877f2' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Facebook</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRadius: '6px', transition: 'background-color 0.2s ease' }}>
                  <Instagram size={20} style={{ color: '#e4405f' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Instagram</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRadius: '6px', transition: 'background-color 0.2s ease' }}>
                  <Twitter size={20} style={{ color: '#1da1f2' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Twitter</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRadius: '6px', transition: 'background-color 0.2s ease' }}>
                  <Youtube size={20} style={{ color: '#ff0000' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>YouTube</span>
                </div>
              </div>
            </div>

            {/* Telefon Nömrəsi */}
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f0fdf4', borderRadius: '8px' }}>
                <Phone size={20} style={{ color: '#10b981' }} />
                <span style={{ fontSize: '16px', color: '#374151', fontWeight: '500' }}>+994 12 345 67 89</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
    </header>
  );
};

export default Header;