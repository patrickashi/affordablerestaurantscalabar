import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';
import { Restaurant } from '../data/restaurants';

interface RestaurantCardProps {
  restaurant: Restaurant;
  size?: 'default' | 'small';
}

export default function RestaurantCard({ restaurant, size = 'default' }: RestaurantCardProps) {
  const formatPrice = (min: number, max: number) => {
    if (max >= 25000) return `₦${(min / 1000).toFixed(0)}k – ₦${(max / 1000).toFixed(0)}k+`;
    if (max >= 1000) return `₦${(min / 1000).toFixed(1).replace('.0', '')}k – ₦${(max / 1000).toFixed(1).replace('.0', '')}k`;
    return `₦${min} – ₦${max}`;
  };

  if (size === 'small') {
    return (
      <Link to={`/restaurants/${restaurant.slug}`} className="block group">
        <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3]">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Price badge */}
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-lg">
              {formatPrice(restaurant.priceMin, restaurant.priceMax)}
            </span>
          </div>

          {/* Sponsored badge */}
          {restaurant.isSponsored && (
            <div className="absolute top-2 right-2">
              <span className="px-2 py-1 bg-[#b5341c] text-white text-xs font-bold rounded-lg">
                SPONSORED
              </span>
            </div>
          )}

          {/* Rating */}
          <div className="absolute bottom-2 right-2">
            <span className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm text-[#1a1a1a] text-xs font-bold rounded-lg">
              <Star size={10} className="fill-[#b5341c] text-[#b5341c]" />
              {restaurant.rating}
            </span>
          </div>
        </div>

        <div className="mt-2">
          <h3 className="font-semibold text-[#1a1a1a] text-sm truncate">{restaurant.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5 truncate">{restaurant.category} · {restaurant.distance}km away</p>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/restaurants/${restaurant.slug}`} className="block group card-hover">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Price badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
              {formatPrice(restaurant.priceMin, restaurant.priceMax)}
            </span>
          </div>

          {/* Sponsored badge */}
          {restaurant.isSponsored && (
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 bg-[#b5341c] text-white text-xs font-bold rounded-full">
                SPONSORED
              </span>
            </div>
          )}

          {/* Rating */}
          <div className="absolute bottom-3 right-3">
            <span className="flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-[#1a1a1a]">
              <Star size={11} className="fill-[#b5341c] text-[#b5341c]" />
              {restaurant.rating}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-[#1a1a1a] text-base mb-1 group-hover:text-[#b5341c] transition-colors">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-xs font-semibold ${
              restaurant.isOpen
                ? restaurant.isClosingSoon ? 'text-orange-500' : 'text-green-600'
                : 'text-red-500'
            }`}>
              {restaurant.isOpen
                ? restaurant.isClosingSoon ? 'Closing Soon' : 'Open Now'
                : 'Closed'}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-500">{restaurant.category}</span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-0.5 text-xs text-gray-500">
              <MapPin size={10} />
              {restaurant.distance}km away
            </span>
          </div>

          {/* Hours */}
          <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
            <Clock size={10} />
            <span>{restaurant.days} · {restaurant.hours}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
