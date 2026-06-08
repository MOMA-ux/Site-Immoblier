import { BedDouble, Bath, Ruler, MapPin, Eye, Star } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  key?: string;
  property: Property;
  onViewDetails: (id: string) => void;
}

export default function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  // Format the price in Euro
  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(property.price);

  // Map property type to French labels
  const getFrenchType = (type: string) => {
    switch (type) {
      case 'villa': return 'Villa d\'Exception';
      case 'apartment': return 'Appartement Prestige';
      case 'office': return 'Bureau Prestige';
      case 'commercial': return 'Espace Commercial';
      default: return type;
    }
  };

  return (
    <div
      id={`property-card-${property.id}`}
      className="group bg-slate-900 rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-amber-500/5 aspect-auto"
    >
      {/* Property Image Container */}
      <div className="relative overflow-hidden aspect-[4/3] w-full bg-slate-800">
        <img
          src={property.images[0]}
          alt={property.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-100" />

        {/* Floating status & type badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <span className="px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-amber-500 text-slate-950 shadow-md">
            {getFrenchType(property.type)}
          </span>
          {property.isFeatured && (
            <span className="px-3 py-1 bg-slate-950/90 text-amber-400 border border-amber-500/30 rounded-full text-[9px] font-bold tracking-wider uppercase flex items-center space-x-1 shadow-md w-fit">
              <Star className="w-2.5 h-2.5 fill-amber-400" />
              <span>Exclusivité</span>
            </span>
          )}
        </div>

        {/* Price Tag overlay bottom right */}
        <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl shadow-lg">
          <span className="text-amber-400 font-mono font-semibold text-base sm:text-lg">
            {formattedPrice}
          </span>
        </div>
      </div>

      {/* Property Information */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs text-slate-300 font-medium font-mono">
              {property.rating}/5 Rating Elite
            </span>
          </div>

          <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-amber-400 transition-colors line-clamp-1">
            {property.title}
          </h3>

          <div className="flex items-center text-xs text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-amber-550 mr-1 shrink-0" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
        </div>

        {/* Features / Characteristics (Beds/Baths/Area) */}
        <div className="grid grid-cols-3 gap-2 border-t border-b border-white/5 py-4 my-4 text-slate-400 text-xs">
          {/* Conditional Bed showing */}
          {property.type !== 'office' && property.type !== 'commercial' ? (
            <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-white/2 hover:bg-white/5 transition-colors">
              <BedDouble className="w-4 h-4 text-amber-550 mb-1" />
              <span className="font-mono text-white font-medium">{property.bedrooms}</span>
              <span className="text-[10px] text-slate-400">Chambres</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-white/2 hover:bg-white/5 transition-colors">
              <Star className="w-4 h-4 text-amber-550 mb-1" />
              <span className="font-mono text-white font-medium">Bâtiment</span>
              <span className="text-[10px] text-slate-400">Prestige</span>
            </div>
          )}

          <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-white/2 hover:bg-white/5 transition-colors">
            <Bath className="w-4 h-4 text-amber-550 mb-1" />
            <span className="font-mono text-white font-medium">{property.bathrooms}</span>
            <span className="text-[10px] text-slate-400">Salles de bain</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-white/2 hover:bg-white/5 transition-colors">
            <Ruler className="w-4 h-4 text-amber-550 mb-1" />
            <span className="font-mono text-white font-medium">{property.area} m²</span>
            <span className="text-[10px] text-slate-400">Surface</span>
          </div>
        </div>

        {/* Action button */}
        <button
          id={`btn-view-${property.id}`}
          onClick={() => onViewDetails(property.id)}
          className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl border border-amber-500/40 text-amber-400 bg-amber-500/0 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-amber-550 transition-all duration-300 font-semibold text-xs tracking-widest uppercase cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          <span>Voir les détails</span>
        </button>
      </div>
    </div>
  );
}
