import { useState, FormEvent } from 'react';
import { Search, MapPin, Building, KeyRound, Euro, ArrowRight, CheckCircle2, Quote, Star } from 'lucide-react';
import { Property } from '../types';
import { PROPERTIES, TESTIMONIALS, STATS } from '../data';
import PropertyCard from '../components/PropertyCard';

interface HomeProps {
  onPageChange: (page: string) => void;
  onViewDetails: (id: string) => void;
  onSetInitialFilters: (filters: {
    location: string;
    type: string;
    price: string;
    bedrooms: string;
  }) => void;
}

export default function Home({ onPageChange, onViewDetails, onSetInitialFilters }: HomeProps) {
  // Local quick search filters state
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [searchPrice, setSearchPrice] = useState('all');
  const [searchBedrooms, setSearchBedrooms] = useState('all');

  // Handle local query submission
  const handleHeroSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSetInitialFilters({
      location: searchLocation,
      type: searchType,
      price: searchPrice,
      bedrooms: searchBedrooms
    });
    onPageChange('listings');
  };

  const featuredProperties = PROPERTIES.filter(p => p.isFeatured).slice(0, 3);

  // Quick select lists
  const locationsList = ['Tout Pays', 'Paris', 'Saint-Tropez', 'Monaco', 'Megève', 'Bordeaux', 'Cap d\'Antibes'];

  return (
    <div id="home-page-container" className="space-y-24 pb-8">
      {/* 1. HERO SECTION WITH IMAGE & SEARCH */}
      <section
        id="hero-section"
        className="relative min-h-[95vh] flex items-center justify-center bg-slate-950 pt-24 overflow-hidden"
      >
        {/* Background Image with modern parallax feel */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury Villa Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-60 scale-102"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-slate-950/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center md:text-left flex flex-col md:flex-row items-center gap-12 pt-8">
          <div className="flex-1 space-y-6">
            {/* Tagline */}
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-full text-amber-400 text-xs tracking-widest uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Cercle Privé d'Immobilier d'Exception</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-white leading-tight">
              Trouvez la propriété <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                de vos rêves
              </span>{' '}
              aujourd'hui
            </h1>

            {/* Description */}
            <p className="text-slate-300 max-w-xl text-sm sm:text-base leading-relaxed">
              Elite Immo transcende la simple recherche immobilière en un parcours d'excellence unique. Découvrez notre collection de villas, appartements de prestige et domaines confidentiels.
            </p>

            {/* Micro achievements */}
            <div className="hidden sm:flex items-center space-x-8 text-white pt-2 text-xs">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500" />
                <span>Biens d'exception vérifiés</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500" />
                <span>Régions les plus convoitées</span>
              </div>
            </div>
          </div>

          {/* Elegant Search Panel Card */}
          <div className="w-full md:max-w-md bg-slate-900/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl space-y-6 animate-fade-in">
            <div className="space-y-1">
              <h3 className="text-lg font-serif text-white font-medium">Recherche Exclusive</h3>
              <p className="text-xs text-slate-400">Configurez vos critères métriques de recherche</p>
            </div>

            <form onSubmit={handleHeroSearchSubmit} className="space-y-4">
              {/* Location Select filter */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                  Destination
                </label>
                <select
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-950 border border-white/10 text-white rounded-xl px-3.5 py-3 focus:outline-none focus:border-amber-500"
                >
                  <option value="">Sélectionnez une destination</option>
                  {locationsList.slice(1).map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}, France
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Property Type Select filter */}
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium flex items-center">
                    <Building className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                    Type de bien
                  </label>
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-slate-950 border border-white/10 text-white rounded-xl px-3.5 py-3 focus:outline-none focus:border-amber-500"
                  >
                    <option value="all">Tous types</option>
                    <option value="villa">Villas</option>
                    <option value="apartment">Appartements</option>
                    <option value="office">Bureaux</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                {/* Bedrooms select filter */}
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium flex items-center">
                    <KeyRound className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                    Chambres
                  </label>
                  <select
                    value={searchBedrooms}
                    onChange={(e) => setSearchBedrooms(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-slate-950 border border-white/10 text-white rounded-xl px-3.5 py-3 focus:outline-none focus:border-amber-500"
                  >
                    <option value="all">Peu importe</option>
                    <option value="1">1+ chambres</option>
                    <option value="3">3+ chambres</option>
                    <option value="5">5+ chambres</option>
                  </select>
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium flex items-center text-amber-55">
                  <Euro className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                  Budget Maximum
                </label>
                <select
                  value={searchPrice}
                  onChange={(e) => setSearchPrice(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-950 border border-white/10 text-white rounded-xl px-3.5 py-3 focus:outline-none focus:border-amber-500"
                >
                  <option value="all">Pas de limite</option>
                  <option value="3000000">Jusqu'à 3 000 000 €</option>
                  <option value="6000000">Jusqu'à 6 000 000 €</option>
                  <option value="10000000">Jusqu'à 10 000 000 €</option>
                  <option value="15000000">Jusqu'à 15 000 000 €</option>
                </select>
              </div>

              {/* Search Submit button */}
              <button
                id="btn-hero-search-submit"
                type="submit"
                className="w-full mt-4 flex items-center justify-center space-x-2 py-3.5 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-amber-500/10 cursor-pointer"
              >
                <Search className="w-4 h-4 font-bold" />
                <span>Rechercher les Biens</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 2. LOGOS / TRUST METRICS STRIP */}
      <section id="trust-metrics-strip" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/60 rounded-3xl p-8 sm:p-12 border border-white/5 shadow-inner">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
            {STATS.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-3xl sm:text-4xl font-serif text-amber-400 font-bold tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES SECTION */}
      <section id="featured-properties-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="text-xs tracking-widest uppercase font-semibold text-amber-500">
              Sélection d'élite
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white tracking-tight">
              Propriétés de prestige à la une
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl">
              Une anthologie exclusive de nos pépites architecturales les plus extraordinaires sélectionnées pour vous par nos courtiers.
            </p>
          </div>
          <button
            id="btn-show-all-properties"
            onClick={() => onPageChange('listings')}
            className="flex items-center space-x-2 text-sm text-amber-400 hover:text-amber-300 font-medium group transition-colors focus:outline-none shrink-0"
          >
            <span>Voir toute la collection</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Responsive Grid list of properties using PropertyCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </section>

      {/* 4. CHOOSE US / STATS BRAND STATEMENT */}
      <section id="brand-statement-section" className="bg-slate-900/40 border-t border-b border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs tracking-widest text-amber-500 uppercase font-semibold">
              Signature Elite Immo
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white leading-snug">
              Pourquoi nous confier vos projets d'acquisition d'actifs prestigieux ?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Depuis quinze ans, Elite Immo redessine les codes de la recherche immobilière haut de gamme. Notre équipe d'experts est animée par un objectif unique : l'élaboration de solutions patrimoniales sur-mesure d'une discrétion absolue.
            </p>
            <div className="pt-4">
              <button
                id="btn-discover-agency"
                onClick={() => onPageChange('about')}
                className="px-6 py-3 rounded-full bg-slate-800 border border-white/10 hover:border-amber-500/50 hover:bg-slate-850 text-white text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer"
              >
                Découvrir l'agence
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif font-bold text-lg">
                01
              </div>
              <h4 className="text-base text-white font-medium">Confidentialité Totale</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Plus de 35% de nos transactions s'effectuent sous forme d'off-market non référencées publiquement sur internet.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif font-bold text-lg">
                02
              </div>
              <h4 className="text-base text-white font-medium">Réseau d'Élite International</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Un accès privilégié aux banques privées, cabinets de gestion de fortune et ambassades mondiales.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif font-bold text-lg">
                03
              </div>
              <h4 className="text-base text-white font-medium">Conciergerie Dédiée</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                De la signature de l'acte aux raccordements de domotique complexes de la villa, nous orchestrons tout à votre place.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif font-bold text-lg">
                04
              </div>
              <h4 className="text-base text-white font-medium">Conseil Juridique Expert</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Structuration via des holdings familiales, SCI à l'impôt sur les sociétés et optimisations fiscales internationales légales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GORGEOUS TESTIMONIALS */}
      <section id="testimonials-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="text-xs tracking-widest uppercase font-semibold text-amber-500">
            Témoignages et Confidences
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
            Ils nous ont fait confiance
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Découvrez les retours confidentiels de nos acquéreurs et investisseurs d'exception.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-white/5 rounded-2xl p-8 flex flex-col justify-between space-y-6 relative hover:border-amber-500/25 transition-all"
            >
              {/* Absolutes quotes decoration */}
              <Quote className="absolute right-6 top-6 w-12 h-12 text-white/5 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating */}
                <div className="flex text-amber-400">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-white/5">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-[10px] text-amber-400 tracking-wider uppercase">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION ESTIMATION FOR BUYERS */}
      <section id="cta-estimation-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 p-8 sm:p-16 text-center space-y-6 z-10 shadow-2xl">
          {/* Background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-slate-950/20 to-lime-500/10 -z-10" />
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif text-white">
              Vous souhaitez expertiser ou céder une propriété prestigieuse ?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Nos estimateurs chevronnés réalisent sous un délai de 48 heures ouvrées un avis de valeur confidentiel conforme aux dernières pulsations du marché d'exception.
            </p>
            <div className="pt-4">
              <button
                id="btn-cta-estimate-now"
                onClick={() => onPageChange('contact')}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-550 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-amber-500/15 cursor-pointer"
              >
                Solliciter une expertise confidentielle
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
