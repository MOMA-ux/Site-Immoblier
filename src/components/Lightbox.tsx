import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface LightboxProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex = 0, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);

  // Reset scale when image changes
  useEffect(() => {
    setScale(1);
  }, [index]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index]);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.75));
  };

  return (
    <div
      id="lightbox-backdrop"
      className="fixed inset-0 bg-slate-950/98 backdrop-blur-md z-50 flex flex-col items-center justify-between p-4"
    >
      {/* Top Header Controls */}
      <div className="w-full max-w-7xl flex items-center justify-between text-white py-2 z-10">
        <div className="text-xs font-mono tracking-widest text-slate-400">
          IMAGE {index + 1} SUR {images.length}
        </div>
        <div className="flex items-center space-x-4">
          <button
            id="lightbox-zoomin"
            onClick={handleZoomIn}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Agrandir"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            id="lightbox-zoomout"
            onClick={handleZoomOut}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Réduire"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            id="lightbox-close"
            onClick={onClose}
            className="p-2 rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all cursor-pointer"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Viewport */}
      <div className="relative flex-1 w-full flex items-center justify-center max-h-[80vh]">
        {/* Navigation Left */}
        <button
          id="lightbox-prev"
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 z-15 p-3 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white border border-white/10 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Display Image */}
        <div className="overflow-hidden max-w-full max-h-full flex items-center justify-center rounded-xl">
          <img
            src={images[index]}
            alt={`Image ${index + 1}`}
            referrerPolicy="no-referrer"
            style={{ transform: `scale(${scale})` }}
            className="max-w-full max-h-[75vh] object-contain transition-transform duration-200 shadow-2xl"
          />
        </div>

        {/* Navigation Right */}
        <button
          id="lightbox-next"
          onClick={handleNext}
          className="absolute right-2 sm:right-4 z-15 p-3 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white border border-white/10 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Thumbnail Selector */}
      <div className="w-full max-w-5xl overflow-x-auto py-2 flex justify-center space-x-2 scrollbar-none z-10">
        {images.map((img, idx) => (
          <button
            id={`lightbox-thumbnail-${idx}`}
            key={idx}
            onClick={() => setIndex(idx)}
            className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all transition-transform hover:scale-105 cursor-pointer ${
              idx === index ? 'border-amber-500 scale-105' : 'border-transparent opacity-60'
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
    </div>
  );
}
