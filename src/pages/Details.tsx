import { useState, FormEvent } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, BedDouble, Bath, Ruler, Check, Calendar, Star, Phone, Mail, Landmark, Send, Map, ZoomIn, Eye } from 'lucide-react';
import { Property } from '../types';
import { PROPERTIES } from '../data';
import Lightbox from '../components/Lightbox';

interface DetailsProps {
  propertyId: string;
  onBackToListings: () => void;
  onPageChange: (page: string) => void;
}

export default function Details({ propertyId, onBackToListings, onPageChange }: DetailsProps) {
  // Find the exact property
  const property = PROPERTIES.find((p) => p.id === propertyId) || PROPERTIES[0];

  // Image slider active index
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Lightbox control
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Contact agent form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(`Bonjour, je souhaite obtenir de plus amples informations concernant la propriété d’exception "${property.title}" située à ${property.city}. Merci.`);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Mock Map options
  const [mapZoom, setMapZoom] = useState(14);
  const [mapType, setMapType] = useState('satellite'); // road, satellite

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (fullName.trim() && email.trim() && phone.trim()) {
      setFormSubmitted(true);
      // Clean form fields
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setTimeout(() => {
        setFormSubmitted(false);
      }, 6000);
    }
  };

  const handleNextImg = () => {
    setActiveImgIndex((prev) => (prev + 1) % property.images.length);
  };

  const handlePrevImg = () => {
    setActiveImgIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(property.price);

  return (
    <div id="details-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-12">
      {/* Back button link */}
      <div>
        <button
          id="btn-back-to-listings"
          onClick={onBackToListings}
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-amber-500 hover:text-amber-400 font-bold transition-all focus:outline-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Retour aux propriétés</span>
        </button>
      </div>

      {/* Main Title & General Header Info */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-3 text-left">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest bg-amber-500 text-slate-950 uppercase">
              {property.type === 'villa' ? 'Villa' : property.type === 'apartment' ? 'Appartement' : property.type === 'office' ? 'Bureau' : 'Commercial'}
            </span>
            <span className="text-xs text-slate-400 font-mono tracking-wider">REF: {property.id.toUpperCase()}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight leading-tight">
            {property.title}
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed font-sans flex items-center">
            {property.location}
          </p>
        </div>

        {/* Pricing / Booking display */}
        <div className="text-left md:text-right space-y-1">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-medium">Prix d'acquisition</p>
          <div className="text-2xl sm:text-3xl font-mono text-amber-400 font-bold">
            {formattedPrice}
          </div>
          <p className="text-[10px] text-emerald-400 font-medium tracking-wide">Frais de mutation et notariés exclus</p>
        </div>
      </div>

      {/* 1. LARGE GALLERY SLIDER & VIEWER */}
      <section id="details-gallery-slider" className="relative group rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="aspect-[16/9] w-full max-h-[650px] bg-slate-950 relative overflow-hidden">
          {/* Main Slide Image */}
          <img
            src={property.images[activeImgIndex]}
            alt={`${property.title} - Vue ${activeImgIndex + 1}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all"
          />

          {/* Slider controls Overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-6 flex justify-between items-end">
            {/* Image counter indicator */}
            <span className="px-3 py-1.5 rounded-lg bg-slate-900/85 backdrop-blur-md border border-white/10 text-[10px] font-mono font-medium text-slate-300">
              VUE {activeImgIndex + 1} DE {property.images.length}
            </span>

            {/* Click to fullscreen prompt instruction */}
            <button
              id="btn-open-lightbox-slider"
              onClick={() => setIsLightboxOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs tracking-wider uppercase flex items-center space-x-2 shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Agrandir l'image</span>
            </button>
          </div>

          {/* Left Arrow Button */}
          <button
            id="btn-slider-prev"
            onClick={handlePrevImg}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            id="btn-slider-next"
            onClick={handleNextImg}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Small thumbnail sliders underneath */}
        <div className="bg-slate-900/80 border-t border-white/5 p-4 flex items-center gap-3 overflow-x-auto">
          {property.images.map((img, idx) => (
            <button
              id={`thumbnail-select-${idx}`}
              key={idx}
              onClick={() => setActiveImgIndex(idx)}
              className={`w-24 aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                idx === activeImgIndex ? 'border-amber-400 scale-102 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Miniature ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </section>

      {/* Grid of details, features, stats, versus broker panel card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
        {/* ================= LEFT & MIDDLE COLUMN: SPECIFICATIONS ================= */}
        <div className="lg:col-span-2 space-y-10 text-left">
          {/* Key characteristics metric items banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-900/50 p-6 rounded-2xl border border-white/5">
            <div className="space-y-1">
              <span className="text-slate-400 text-[10px] tracking-widest uppercase">Surface</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-xl font-mono text-white font-bold">{property.area}</span>
                <span className="text-xs text-slate-300">m²</span>
              </div>
            </div>

            {property.type !== 'office' && property.type !== 'commercial' ? (
              <div className="space-y-1 border-l border-white/5 pl-4 sm:pl-6">
                <span className="text-slate-400 text-[10px] tracking-widest uppercase">Chambres</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-xl font-mono text-white font-bold">{property.bedrooms}</span>
                  <span className="text-xs text-slate-350">p.</span>
                </div>
              </div>
            ) : (
              <div className="space-y-1 border-l border-white/5 pl-4 sm:pl-6">
                <span className="text-slate-400 text-[10px] tracking-widest uppercase">Plafond</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-lg font-mono text-white font-bold">Haut</span>
                  <span className="text-[9px] text-amber-400 font-bold uppercase">Prestige</span>
                </div>
              </div>
            )}

            <div className="space-y-1 border-l border-white/5 pl-4 sm:pl-6">
              <span className="text-slate-400 text-[10px] tracking-widest uppercase">Sdb / Toilettes</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-xl font-mono text-white font-bold">{property.bathrooms}</span>
                <span className="text-xs text-slate-350">sdb.</span>
              </div>
            </div>

            <div className="space-y-1 border-l border-white/5 pl-4 sm:pl-6">
              <span className="text-slate-400 text-[10px] tracking-widest uppercase">Construction</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-xl font-mono text-white font-bold">{property.yearBuilt}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-white tracking-tight">
              Description de la Propriété
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Features and Amenities section */}
          <div className="space-y-6 pt-4 border-t border-white/5">
            <h3 className="text-2xl font-serif text-white tracking-tight">
              Prestations exclusives & Équipements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 text-slate-300 text-sm">
                  <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ================= INTERACTIVE MOCK GEOLOCATION MAP ================= */}
          <div id="property-map-panel" className="space-y-6 pt-8 border-t border-white/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 text-left">
                <h3 className="text-2xl font-serif text-white tracking-tight">Situation Géographique</h3>
                <p className="text-xs text-slate-400">Emplacement approximatif de la propriété d'exception</p>
              </div>

              {/* Map controls */}
              <div className="flex items-center space-x-2 text-xs">
                <button
                  id="btn-map-type-satellite"
                  onClick={() => setMapType('satellite')}
                  className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                    mapType === 'satellite'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                      : 'bg-slate-900 text-slate-300 border-white/10 hover:border-white/20'
                  }`}
                >
                  Satellite
                </button>
                <button
                  id="btn-map-type-road"
                  onClick={() => setMapType('road')}
                  className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                    mapType === 'road'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                      : 'bg-slate-900 text-slate-300 border-white/10 hover:border-white/20'
                  }`}
                >
                  Plan de situation
                </button>
              </div>
            </div>

            {/* Simulated Live Google Maps Integration with dynamic visuals */}
            <div className="w-full rounded-2xl border border-white/10 overflow-hidden relative shadow-lg aspect-[16/9] min-h-[350px] bg-slate-950">
              {/* Map display placeholder */}
              <div className="absolute inset-0 z-0">
                <img
                  src={
                    mapType === 'satellite'
                      ? 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200'
                      : 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200'
                  }
                  referrerPolicy="no-referrer"
                  alt="Fond de carte"
                  className="w-full h-full object-cover opacity-35 filter saturate-50 blur-xs"
                />

                {/* Drawn stylized layout of grids to simulate streets and coordinates */}
                <div className="absolute inset-0 bg-slate-950/70" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#090d16_80%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
              </div>

              {/* Dynamic location marker pinpoint */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                {/* Marker ring animations */}
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full bg-amber-500/20 animate-ping" />
                  <div className="absolute -inset-8 rounded-full bg-amber-550/10 animate-pulse" />
                  <div className="relative w-10 h-10 rounded-full bg-slate-950/90 border border-amber-500 flex items-center justify-center text-amber-400 font-serif font-bold h-10 w-10 shadow-xl">
                    <Landmark className="w-5 h-5 text-amber-500 animate-bounce" />
                  </div>
                </div>

                <div className="mt-4 bg-slate-900/90 border border-white/10 px-4 py-2.5 rounded-xl text-center shadow-2xl backdrop-blur-md max-w-xs">
                  <h4 className="text-xs font-semibold text-white tracking-wide">{property.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{property.city} (Latitude: {property.coordinates.lat}° N)</p>
                </div>
              </div>

              {/* Map Zoom UI overlay bottom right */}
              <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1.5">
                <button
                  id="btn-map-zoomin"
                  onClick={() => setMapZoom(prev => Math.min(prev + 1, 18))}
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 text-white font-mono font-bold flex items-center justify-center hover:bg-slate-800"
                >
                  +
                </button>
                <button
                  id="btn-map-zoomout"
                  onClick={() => setMapZoom(prev => Math.max(prev - 1, 10))}
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 text-white font-mono font-bold flex items-center justify-center hover:bg-slate-800"
                >
                  -
                </button>
              </div>

              {/* Map Info overlay top left */}
              <div className="absolute top-4 left-4 z-20 bg-slate-900/90 border border-white/10 px-3.5 py-2.5 rounded-xl text-left text-[10px] font-mono text-slate-400 space-y-0.5 shadow-md">
                <div className="text-white font-semibold flex items-center space-x-1">
                  <Map className="w-3.5 h-3.5 text-amber-500" />
                  <span>Interactive Map Grounding</span>
                </div>
                <div>LATIT: {property.coordinates.lat} N</div>
                <div>LONGIT: {property.coordinates.lng} E</div>
                <div>ECHELLE: {mapZoom}x ZOOM</div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: BROKER AGENCY DETAILED CARD ================= */}
        <aside className="space-y-8">
          {/* Main Agent Details & Contact Form Card */}
          <div className="bg-slate-900 rounded-2xl border border-amber-500/10 p-6 sm:p-8 space-y-6 shadow-xl sticky top-30">
            <h4 className="text-xs font-mono font-bold tracking-widest text-amber-500 uppercase border-b border-white/5 pb-3">
              Courtier en charge
            </h4>

            {/* Agent portrait & contact shortcuts */}
            <div className="flex items-center space-x-4">
              <img
                src={property.agent.image}
                referrerPolicy="no-referrer"
                alt={property.agent.name}
                className="w-14 h-14 rounded-full object-cover border border-amber-500/20"
              />
              <div className="text-left">
                <h4 className="text-base font-semibold text-white">{property.agent.name}</h4>
                <p className="text-xs text-amber-400 uppercase tracking-wider">{property.agent.role}</p>
                <p className="text-[10px] text-slate-400">Elite Immo Paris - Riviera</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                id="agent-call-link"
                href={`tel:${property.agent.phone}`}
                className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>Téléphone</span>
              </a>
              <a
                id="agent-email-link"
                href={`mailto:${property.agent.email}`}
                className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition"
              >
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <span>Email</span>
              </a>
            </div>

            {/* Contact Form fields */}
            <form onSubmit={handleContactSubmit} className="space-y-4 pt-4 border-t border-white/5 text-left">
              <h5 className="text-xs font-semibold text-white tracking-wide">Solliciter une consultation privée</h5>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-medium">Nom & Prénom</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Christian Dior"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-medium">Adresse Email</label>
                <input
                  type="email"
                  required
                  placeholder="Ex: c.dior@haute-couture.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-medium">Numéro de Téléphone</label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: +33 6 12 34 56 78"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-medium">Message personnalisé</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 resize-none font-sans"
                />
              </div>

              {formSubmitted ? (
                <div id="contact-success-agent" className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
                  <p className="text-xs text-emerald-400 font-medium animate-pulse">
                    Demande transmise avec succès. Votre courtier d'élite vous recontactera sous 4 heures ouvrées.
                  </p>
                </div>
              ) : (
                <button
                  id="btn-details-form-submit"
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-550 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl transition shadow hover:shadow-amber-500/15 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Envoyer la demande</span>
                </button>
              )}
            </form>
          </div>
        </aside>
      </div>

      {/* ================= LIGHTBOX PREVIEW MODAL ================= */}
      {isLightboxOpen && (
        <Lightbox
          images={property.images}
          initialIndex={activeImgIndex}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </div>
  );
}
