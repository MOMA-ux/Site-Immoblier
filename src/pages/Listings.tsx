import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronRight, X, ArrowUpDown, RefreshCw, KeyRound, Building, Square, BedDouble, Bath } from 'lucide-react';
import { Property } from '../types';
import { PROPERTIES, ALL_FEATURES_LIST, CITIES } from '../data';
import PropertyCard from '../components/PropertyCard';

interface ListingsProps {
  onViewDetails: (id: string) => void;
  initialFilters?: {
    location: string;
    type: string;
    price: string;
    bedrooms: string;
  } | null;
  onClearInitialFilters?: () => void;
}

const ITEMS_PER_PAGE = 6;

export default function Listings({ onViewDetails, initialFilters, onClearInitialFilters }: ListingsProps) {
  // Advanced filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [maxPrice, setMaxPrice] = useState<number>(20000000);
  const [minArea, setMinArea] = useState<number>(0);
  const [selectedBedrooms, setSelectedBedrooms] = useState('all');
  const [selectedBathrooms, setSelectedBathrooms] = useState('all');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Sorting
  const [sortBy, setSortBy] = useState('popularity'); // popularity, priceAsc, priceDesc, areaDesc

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Is mobile filters panel open?
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Apply initial filters passed from home search bar
  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.location) {
        setSelectedCity(initialFilters.location);
      }
      if (initialFilters.type && initialFilters.type !== 'all') {
        setSelectedType(initialFilters.type);
      }
      if (initialFilters.price && initialFilters.price !== 'all') {
        setMaxPrice(parseInt(initialFilters.price, 10));
      }
      if (initialFilters.bedrooms && initialFilters.bedrooms !== 'all') {
        setSelectedBedrooms(initialFilters.bedrooms);
      }
      // Reset page
      setCurrentPage(1);

      // Clean up filters once consumed
      if (onClearInitialFilters) {
        onClearInitialFilters();
      }
    }
  }, [initialFilters]);

  // Clean all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCity('all');
    setMaxPrice(20000000);
    setMinArea(0);
    setSelectedBedrooms('all');
    setSelectedBathrooms('all');
    setSelectedFeatures([]);
    setSortBy('popularity');
    setCurrentPage(1);
  };

  // Toggle checklist features
  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
    setCurrentPage(1);
  };

  // Core Filtering Logic
  const filteredProperties = PROPERTIES.filter((property) => {
    // 1. Text Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = property.title.toLowerCase().includes(query);
      const matchesDesc = property.description.toLowerCase().includes(query);
      const matchesLocation = property.location.toLowerCase().includes(query);
      if (!matchesTitle && !matchesDesc && !matchesLocation) return false;
    }

    // 2. Property Type
    if (selectedType !== 'all' && property.type !== selectedType) {
      return false;
    }

    // 3. City
    if (selectedCity !== 'all' && property.city !== selectedCity) {
      return false;
    }

    // 4. Max Price
    if (property.price > maxPrice) {
      return false;
    }

    // 5. Min Area
    if (property.area < minArea) {
      return false;
    }

    // 6. Bedrooms
    if (selectedBedrooms !== 'all') {
      const minBeds = parseInt(selectedBedrooms, 10);
      if (property.bedrooms < minBeds) return false;
    }

    // 7. Bathrooms
    if (selectedBathrooms !== 'all') {
      const minBaths = parseInt(selectedBathrooms, 10);
      if (property.bathrooms < minBaths) return false;
    }

    // 8. Selected Features checklist
    if (selectedFeatures.length > 0) {
      const hasAllFeatures = selectedFeatures.every(f => property.features.includes(f));
      if (!hasAllFeatures) return false;
    }

    return true;
  });

  // Sorting logic
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    if (sortBy === 'areaDesc') return b.area - a.area;
    if (sortBy === 'newest') return b.yearBuilt - a.yearBuilt;
    // default popularity / rating
    return b.rating - a.rating;
  });

  // Pagination bounds calculation
  const totalItems = sortedProperties.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProperties = sortedProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Format currency helpers for controls
  const formatEuroCompact = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      notation: 'compact'
    }).format(value);
  };

  return (
    <div id="listings-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-12">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-amber-500 font-semibold">
          Notre Catalogue Immobilier
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
          Propriétés & Actes de Prestige
        </h1>
        <p className="text-sm text-slate-450 max-w-2xl">
          Filtrez notre collection prestigieuse de biens et explorez l'accord parfait de l'architecture moderne et de l'art de vivre.
        </p>
      </div>

      {/* Main Container: Grid of Filters (Left Pane Desktop) and Cards (Right Pane) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
        {/* ================= DESKTOP FILTERS SIDE PANEL ================= */}
        <aside className="hidden lg:block bg-slate-900/90 rounded-2xl border border-white/5 p-6 space-y-8 sticky top-30">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-base font-serif text-white flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <span>Filtres Avancés</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center space-x-1 transition-colors cursor-pointer focus:outline-none"
              title="Réinitialiser"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Effacer</span>
            </button>
          </div>

          {/* Search text filter */}
          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium">Mot-clé ou Référence</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Ex: Villa, Terrasse, Saint-Tropez..."
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 pl-10 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Type filter */}
          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium">Type de Propriété</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'all', label: 'Tous' },
                { id: 'villa', label: 'Villas' },
                { id: 'apartment', label: 'Appartements' },
                { id: 'office', label: 'Bureaux' },
                { id: 'commercial', label: 'Boutiques' },
              ].map((tp) => (
                <button
                  key={tp.id}
                  onClick={() => { setSelectedType(tp.id); setCurrentPage(1); }}
                  className={`py-2 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedType === tp.id
                      ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                      : 'bg-slate-950/60 text-slate-300 border-white/10 hover:border-white/20'
                  }`}
                >
                  {tp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Destination filter */}
          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium">Ville / Région</label>
            <select
              value={selectedCity}
              onChange={(e) => { setSelectedCity(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
            >
              <option value="all">Toutes les destinations</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Budget filter slider input combo */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="text-slate-300 font-medium">Budget Maximum</label>
              <span className="text-amber-400 font-mono font-semibold">{formatEuroCompact(maxPrice)}</span>
            </div>
            <input
              type="range"
              min={1000000}
              max={20000000}
              step={500000}
              value={maxPrice}
              onChange={(e) => { setMaxPrice(parseInt(e.target.value, 10)); setCurrentPage(1); }}
              className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Area slider selector */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="text-slate-300 font-medium">Surface Minimale</label>
              <span className="text-amber-400 font-mono font-semibold">{minArea} m²</span>
            </div>
            <input
              type="range"
              min={0}
              max={600}
              step={50}
              value={minArea}
              onChange={(e) => { setMinArea(parseInt(e.target.value, 10)); setCurrentPage(1); }}
              className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Chambres & Bathrooms */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-slate-300 font-medium">Min. Chambres</label>
              <select
                value={selectedBedrooms}
                onChange={(e) => { setSelectedBedrooms(e.target.value); setCurrentPage(1); }}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="all">Tout</option>
                <option value="1">1+</option>
                <option value="3">3+</option>
                <option value="5">5+</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-300 font-medium">Min. Salles de Bain</label>
              <select
                value={selectedBathrooms}
                onChange={(e) => { setSelectedBathrooms(e.target.value); setCurrentPage(1); }}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="all">Tout</option>
                <option value="2">2+</option>
                <option value="4">4+</option>
                <option value="6">6+</option>
              </select>
            </div>
          </div>

          {/* Amenities / Equipment checklist */}
          <div className="space-y-3 pt-2">
            <label className="text-xs text-slate-300 font-medium block">Prestations & Équipements</label>
            <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin">
              {ALL_FEATURES_LIST.map((feature) => {
                const isChecked = selectedFeatures.includes(feature);
                return (
                  <label key={feature} className="flex items-center space-x-2.5 text-xs text-slate-400 hover:text-slate-250 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleFeatureToggle(feature)}
                      className="rounded border-white/10 bg-slate-950 text-amber-500 focus:ring-opacity-0 h-4 s-4"
                    />
                    <span>{feature}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ================= RESULTS & SORTING AREA ================= */}
        <div className="lg:col-span-3 space-y-8">
          {/* Action Bar: result count, sorting select list, and mobile filter triggers */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-white/5">
            <div className="text-slate-300 text-xs font-medium font-mono">
              <span className="text-amber-400 font-bold text-sm mr-1">{filteredProperties.length}</span>PROPRIÉTÉS CONFIDENTIELLES CORRESPONDENT
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Trigger Button */}
              <button
                id="btn-mobile-filter-trigger"
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden flex items-center justify-center space-x-2 bg-slate-950 border border-white/10 px-4 py-2.5 rounded-xl text-xs text-slate-300 hover:text-white"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
                <span>Filtrer</span>
              </button>

              {/* Sorting Selection combo */}
              <div className="relative flex items-center space-x-1.5 flex-1 sm:flex-initial">
                <ArrowUpDown className="w-3.5 h-3.5 text-amber-500 absolute left-3 top-3.5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-48 bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 pl-9 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="popularity">Trier par: Popularité</option>
                  <option value="priceAsc">Trier par: Prix croissants</option>
                  <option value="priceDesc">Trier par: Prix décroissants</option>
                  <option value="areaDesc">Trier par: Surface</option>
                  <option value="newest">Trier par: Plus récent</option>
                </select>
              </div>
            </div>
          </div>

          {/* Properties Grid results lists */}
          {paginatedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {paginatedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          ) : (
            <div id="no-results-panel" className="text-center p-16 bg-slate-900/40 rounded-3xl border border-white/5 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-800/80 mx-auto flex items-center justify-center text-amber-500">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif text-white font-semibold">Aucun bien ne correspond</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Vos critères de sélections d'exception sont très précis. Veuillez réinitialiser ou élargir vos critères de budget ou prestations.
              </p>
              <button
                id="btn-no-results-reset"
                onClick={resetFilters}
                className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full hover:bg-amber-400 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 pt-6">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isCurrent = currentPage === pageNum;
                return (
                  <button
                    id={`btn-page-${pageNum}`}
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 150, behavior: 'smooth' });
                    }}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-semibold font-mono transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-white/5 text-slate-300 border border-white/5 hover:border-amber-500/30'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ================= MOBILE FILTERS DRAWER (COLLAPSIBLE OVERLAY) ================= */}
      {isMobileFiltersOpen && (
        <div id="filter-drawer-overlay" className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileFiltersOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Drawer content */}
          <div className="w-full max-w-sm bg-slate-950 border-l border-white/10 h-full overflow-y-auto p-6 space-y-6 relative flex flex-col justify-between z-10">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="text-base font-serif text-white">Filtres de recherche</h3>
                <button
                  id="btn-close-filter-drawer"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 rounded-full bg-white/5 text-slate-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form fields */}
              <div className="space-y-5 text-left">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-xs text-slate-300 font-medium">Recherche texte</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    placeholder="Maison, piscine..."
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white"
                  />
                </div>

                {/* Type dropdown */}
                <div className="space-y-2">
                  <label className="text-xs text-slate-300 font-medium">Type de bien</label>
                  <select
                    value={selectedType}
                    onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white"
                  >
                    <option value="all">Tous types</option>
                    <option value="villa">Villas d'Exception</option>
                    <option value="apartment">Appartements de Prestige</option>
                    <option value="office">Bureaux Prestige</option>
                    <option value="commercial">Secteur Commercial</option>
                  </select>
                </div>

                {/* City dropdown */}
                <div className="space-y-2">
                  <label className="text-xs text-slate-300 font-medium">Ville</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => { setSelectedCity(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white"
                  >
                    <option value="all">Toutes les villes</option>
                    {CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="text-slate-300 font-medium">Budget Max</label>
                    <span className="text-amber-400 font-mono font-semibold">{formatEuroCompact(maxPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min={1000000}
                    max={20000000}
                    step={500000}
                    value={maxPrice}
                    onChange={(e) => { setMaxPrice(parseInt(e.target.value, 10)); setCurrentPage(1); }}
                    className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Clear and Apply Buttons inside drawer */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
              <button
                id="btn-mobile-reset-filters"
                onClick={() => { resetFilters(); setIsMobileFiltersOpen(false); }}
                className="py-3 rounded-xl border border-white/10 text-xs text-slate-400"
              >
                Tout effacer
              </button>
              <button
                id="btn-mobile-apply-filters"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase"
              >
                Appliquer ({filteredProperties.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
