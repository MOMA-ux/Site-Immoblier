import { useState } from 'react';
import { LayoutGrid, ZoomIn, Eye, ArrowRight } from 'lucide-react';
import { PROPERTIES } from '../data';
import Lightbox from '../components/Lightbox';

interface GalleryProps {
  onViewPropertyDetails: (id: string) => void;
}

export default function Gallery({ onViewPropertyDetails }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'villa' | 'apartment' | 'office' | 'commercial'>('all');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);

  // Flatten all images with parent metadata for interactive routing
  const galleryItems = PROPERTIES.flatMap((p) =>
    p.images.map((img, index) => ({
      url: img,
      propertyId: p.id,
      title: p.title,
      type: p.type,
      city: p.city,
      imgIndex: index,
    }))
  );

  // Filter gallery items based on current category
  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.type === selectedCategory);

  // Open Lightbox relative to selected item in the filtered array
  const handleOpenLightbox = (imageUrl: string) => {
    // Find absolute index of that image URL in the full PROPERTIES dataset
    const allImages = galleryItems.map(item => item.url);
    const targetIdx = allImages.indexOf(imageUrl);
    setLightboxInitialIndex(targetIdx >= 0 ? targetIdx : 0);
    setIsLightboxOpen(true);
  };

  return (
    <div id="gallery-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-12">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-amber-500 font-semibold">
          Notre Galerie & Médias de Prestige
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
          Portfolio de l'Immobilier d'Art
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Parcourez en haute définition les envolées architecturales, les finitions et les ambiances lumineuses captées au sein de nos domaines.
        </p>
      </div>

      {/* Categories Toggle Buttons Navigation */}
      <div className="flex flex-wrap items-center justify-start gap-2.5 border-b border-white/5 pb-6">
        {[
          { id: 'all', label: 'Toutes les photos' },
          { id: 'villa', label: 'Villas de Rêve' },
          { id: 'apartment', label: 'Appartements & Lofts' },
          { id: 'office', label: 'Sièges & Bureaux' },
          { id: 'commercial', label: 'Boutiques de luxe' },
        ].map((tab) => {
          const isActive = selectedCategory === tab.id;
          return (
            <button
              id={`tab-gallery-${tab.id}`}
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'bg-white/5 text-slate-300 border border-white/5 hover:border-amber-500/30'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Masonry-Style / Beautiful Responsive Column Grid */}
      {filteredItems.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, idx) => (
            <div
              id={`gallery-item-${idx}`}
              key={`${item.url}-${idx}`}
              className="break-inside-avoid relative rounded-2xl overflow-hidden border border-white/5 group bg-slate-900 transition-all shadow-md hover:shadow-2xl hover:border-amber-500/20"
            >
              {/* Image element */}
              <img
                src={item.url}
                alt={`${item.title}`}
                referrerPolicy="no-referrer"
                className="w-full object-cover rounded-2xl h-auto transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Hover Darkening Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6" />

              {/* Text & Icon over overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 space-y-3 pointer-events-auto text-left">
                <div className="space-y-1">
                  <span className="text-[10px] tracking-widest text-amber-400 font-mono font-bold uppercase">
                    {item.type.toUpperCase()} • {item.city.toUpperCase()}
                  </span>
                  <h4 className="text-white text-base font-semibold leading-snug">
                    {item.title}
                  </h4>
                </div>

                {/* Photo details & click action triggers */}
                <div className="flex items-center space-x-2.5">
                  <button
                    id={`btn-gallery-zoom-${idx}`}
                    onClick={() => handleOpenLightbox(item.url)}
                    className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-transform hover:scale-105 cursor-pointer flex items-center space-x-1"
                    title="Zoom d'artiste"
                  >
                    <ZoomIn className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1">Zoom</span>
                  </button>

                  <button
                    id={`btn-gallery-goto-${idx}`}
                    onClick={() => onViewPropertyDetails(item.propertyId)}
                    className="py-2 px-3 rounded-xl bg-slate-950/90 border border-white/15 text-white hover:text-amber-400 font-semibold text-[10px] tracking-widest uppercase transition-all flex items-center space-x-1.5"
                    title="Fiche Technique"
                  >
                    <span>Fiche bien</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div id="no-gallery-items" className="text-center py-16 bg-slate-900/40 rounded-3xl border border-white/5">
          <p className="text-sm text-slate-400">Aucune photo pour cette catégorie disponible.</p>
        </div>
      )}

      {/* ================= LIGHTBOX PREVIEW SYSTEM ================= */}
      {isLightboxOpen && (
        <Lightbox
          images={galleryItems.map(item => item.url)}
          initialIndex={lightboxInitialIndex}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </div>
  );
}
