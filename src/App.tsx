import { useState, useEffect } from 'react';
import { Search, X, Building, MapPin, Landmark, Star, Moon, Compass } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Listings from './pages/Listings';
import Details from './pages/Details';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';

// Data models
import { PROPERTIES } from './data';

interface SearchFiltersState {
  location: string;
  type: string;
  price: string;
  bedrooms: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');

  // Initial filters for listings page, passed when user searches from home page hero
  const [initialFilters, setInitialFilters] = useState<SearchFiltersState | null>(null);

  // Global Quick Search modal state
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);
  const [quickSearchInput, setQuickSearchInput] = useState('');

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleSetInitialFilters = (filters: SearchFiltersState) => {
    setInitialFilters(filters);
  };

  const handleClearInitialFilters = () => {
    setInitialFilters(null);
  };

  const handleViewPropertyDetails = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setCurrentPage('details');
  };

  const handleBackToListings = () => {
    setCurrentPage('listings');
  };

  // Filter properties in real time inside global quick search modal
  const quickSearchResults = PROPERTIES.filter((p) => {
    const input = quickSearchInput.toLowerCase().trim();
    if (!input) return false;
    return (
      p.title.toLowerCase().includes(input) ||
      p.city.toLowerCase().includes(input) ||
      p.location.toLowerCase().includes(input) ||
      p.type.toLowerCase().includes(input)
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden">
      {/* 1. BRAND GLOBAL HEADER */}
      <Header
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onOpenQuickSearch={() => setIsQuickSearchOpen(true)}
      />

      {/* 2. DYNAMIC PAGE DISPATCHER */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <Home
            onPageChange={handlePageChange}
            onViewDetails={handleViewPropertyDetails}
            onSetInitialFilters={handleSetInitialFilters}
          />
        )}

        {currentPage === 'listings' && (
          <Listings
            onViewDetails={handleViewPropertyDetails}
            initialFilters={initialFilters}
            onClearInitialFilters={handleClearInitialFilters}
          />
        )}

        {currentPage === 'details' && (
          <Details
            propertyId={selectedPropertyId}
            onBackToListings={handleBackToListings}
            onPageChange={handlePageChange}
          />
        )}

        {currentPage === 'gallery' && (
          <Gallery onViewPropertyDetails={handleViewPropertyDetails} />
        )}

        {currentPage === 'about' && <About onPageChange={handlePageChange} />}

        {currentPage === 'contact' && <Contact />}
      </main>

      {/* 3. BRAND GLOBAL FOOTER */}
      <Footer onPageChange={handlePageChange} />

      {/* ================= GLOBAL QUICK SEARCH MODAL OVERLAY ================= */}
      {isQuickSearchOpen && (
        <div
          id="global-quick-search-backdrop"
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-100 flex items-start justify-center pt-[15vh] px-4"
        >
          {/* Box Container */}
          <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative animate-fade-in text-left">
            {/* Header Search Field */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <Search className="w-5 h-5 text-amber-500 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Recherche instantanée (Ex: Saint-Tropez, Duplex, Villa...)"
                  value={quickSearchInput}
                  onChange={(e) => setQuickSearchInput(e.target.value)}
                  className="w-full bg-transparent text-sm text-white focus:outline-none border-none placeholder:text-slate-500"
                />
              </div>
              <button
                id="btn-close-quick-search"
                onClick={() => {
                  setIsQuickSearchOpen(false);
                  setQuickSearchInput('');
                }}
                className="p-1.5 rounded-full bg-white/5 text-slate-450 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results pane */}
            <div className="max-h-[380px] overflow-y-auto p-4 space-y-2 text-slate-300">
              {quickSearchInput.trim() === '' ? (
                <div className="text-center py-10 space-y-3">
                  <Compass className="w-8 h-8 text-slate-600 mx-auto animate-spin-slow" />
                  <p className="text-xs text-slate-400">Saisissez un mot ou une de nos destinations clés pour lancer l'exploration.</p>
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {['Villa Lou', 'Monaco', 'Saint-Tropez', 'Penthouse', 'Paris'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuickSearchInput(tag)}
                        className="px-3 py-1 bg-white/5 border border-white/10 hover:border-amber-500/20 text-[10px] uppercase font-semibold text-slate-300 hover:text-amber-400 rounded-full cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : quickSearchResults.length > 0 ? (
                <div className="space-y-2">
                  <div className="text-[10px] tracking-wider uppercase text-slate-500 px-2 font-mono font-bold">
                    PROPRIÉTÉS EXCLUSIVES ({quickSearchResults.length})
                  </div>
                  {quickSearchResults.map((property) => (
                    <button
                      id={`search-result-item-${property.id}`}
                      key={property.id}
                      onClick={() => {
                        handleViewPropertyDetails(property.id);
                        setIsQuickSearchOpen(false);
                        setQuickSearchInput('');
                      }}
                      className="w-full flex items-center space-x-4 p-2.5 rounded-xl bg-white/0 hover:bg-white/5 text-left border border-transparent hover:border-white/5 transition-all group cursor-pointer"
                    >
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-white group-hover:text-amber-400 transition-colors truncate">
                          {property.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 flex items-center truncate">
                          <MapPin className="w-3 h-3 text-amber-550 mr-1" />
                          {property.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-amber-500 font-mono font-semibold">
                          {new Intl.NumberFormat('fr-FR', {
                            style: 'currency',
                            currency: 'EUR',
                            maximumFractionDigits: 0
                          }).format(property.price)}
                        </span>
                        <p className="text-[8px] uppercase tracking-wider text-slate-400 mt-0.5">{property.type}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 space-y-2">
                  <p className="text-xs text-white">Aucun résultat confidentialisé</p>
                  <p className="text-[10px] text-slate-400">Élargissez la formulation ou recherchez 'Villa' ou 'Apartment'.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
