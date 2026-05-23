import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, MapPin, RotateCcw } from 'lucide-react';
import { CATEGORIES, RESTAURANTS } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';

type PriceFilter = 'N' | 'NN' | 'NNN' | 'NNNN' | null;
type RatingFilter = 4.5 | 4.0 | 3.5 | null;
type DistanceFilter = 1 | 3 | 5 | null;

export default function RestaurantsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>(null);
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>(null);
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>(null);
  const [openNow, setOpenNow] = useState(false);
  const [hasReservations, setHasReservations] = useState(false);
  const [hasDelivery, setHasDelivery] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 6;

  useEffect(() => {
    const cat = searchParams.get('category');
    const q = searchParams.get('q');
    if (cat) setActiveCategory(cat);
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) params.set('q', searchQuery);
    else params.delete('q');
    setSearchParams(params);
    setCurrentPage(1);
  };

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    const params = new URLSearchParams(searchParams);
    if (catId !== 'all') params.set('category', catId);
    else params.delete('category');
    setSearchParams(params);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setPriceFilter(null);
    setRatingFilter(null);
    setDistanceFilter(null);
    setOpenNow(false);
    setHasReservations(false);
    setHasDelivery(false);
    setCurrentPage(1);
  };

  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter(r => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q);

      const matchesCategory = activeCategory === 'all' ||
        r.categories.includes(activeCategory);

      const matchesPrice = !priceFilter || r.priceRange === priceFilter;
      const matchesRating = !ratingFilter || r.rating >= ratingFilter;
      const matchesDistance = !distanceFilter || r.distance <= distanceFilter;
      const matchesOpen = !openNow || r.isOpen;
      const matchesReservations = !hasReservations || r.hasReservations;
      const matchesDelivery = !hasDelivery || r.hasDelivery;

      return matchesSearch && matchesCategory && matchesPrice &&
        matchesRating && matchesDistance && matchesOpen &&
        matchesReservations && matchesDelivery;
    });
  }, [searchQuery, activeCategory, priceFilter, ratingFilter, distanceFilter, openNow, hasReservations, hasDelivery]);

  const totalPages = Math.ceil(filteredRestaurants.length / PER_PAGE);
  const paginatedRestaurants = filteredRestaurants.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const hasActiveFilters = priceFilter || ratingFilter || distanceFilter || openNow || hasReservations || hasDelivery;

  const mapPins = [
    { id: 1, x: '30%', y: '35%' },
    { id: 2, x: '45%', y: '48%' },
    { id: 3, x: '62%', y: '55%' },
    { id: 4, x: '38%', y: '65%' },
    { id: 5, x: '75%', y: '38%' },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Search Bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="flex-1 flex items-center bg-[#f7f3f0] rounded-full px-4 py-2.5 gap-2">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Suya, Afang, Lounges..."
                className="flex-1 bg-transparent outline-none text-sm text-[#1a1a1a] placeholder-gray-400"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')}>
                  <X size={14} className="text-gray-400" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#b5341c] text-white font-semibold rounded-full text-sm hover:bg-[#8B2615] transition-colors"
            >
              Search
            </button>
            {/* Mobile filter toggle */}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`md:hidden p-2.5 rounded-full border transition-colors ${
                hasActiveFilters ? 'bg-[#b5341c] border-[#b5341c] text-white' : 'border-gray-200 text-gray-600'
              }`}
            >
              <SlidersHorizontal size={16} />
            </button>
          </form>

          {/* Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto mt-3 pb-1 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                    : 'bg-white text-[#1a1a1a] border-gray-200 hover:border-gray-300'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-36">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-[#1a1a1a]" />
                  <span className="font-semibold text-[#1a1a1a]">Filters</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-xs font-semibold text-[#b5341c] hover:underline flex items-center gap-1"
                  >
                    <RotateCcw size={12} /> Reset
                  </button>
                )}
              </div>

              <FilterContent
                priceFilter={priceFilter} setPriceFilter={setPriceFilter}
                ratingFilter={ratingFilter} setRatingFilter={setRatingFilter}
                distanceFilter={distanceFilter} setDistanceFilter={setDistanceFilter}
                openNow={openNow} setOpenNow={setOpenNow}
                hasReservations={hasReservations} setHasReservations={setHasReservations}
                hasDelivery={hasDelivery} setHasDelivery={setHasDelivery}
              />
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          {showFilters && (
            <div className="md:hidden fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto animate-slide-in-right">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-semibold text-[#1a1a1a]">Filters</span>
                  <div className="flex items-center gap-3">
                    {hasActiveFilters && (
                      <button onClick={resetFilters} className="text-xs text-[#b5341c] font-semibold">Reset</button>
                    )}
                    <button onClick={() => setShowFilters(false)}>
                      <X size={20} />
                    </button>
                  </div>
                </div>
                <FilterContent
                  priceFilter={priceFilter} setPriceFilter={setPriceFilter}
                  ratingFilter={ratingFilter} setRatingFilter={setRatingFilter}
                  distanceFilter={distanceFilter} setDistanceFilter={setDistanceFilter}
                  openNow={openNow} setOpenNow={setOpenNow}
                  hasReservations={hasReservations} setHasReservations={setHasReservations}
                  hasDelivery={hasDelivery} setHasDelivery={setHasDelivery}
                />
                <button
                  onClick={() => setShowFilters(false)}
                  className="mt-4 w-full py-3 bg-[#b5341c] text-white font-semibold rounded-full"
                >
                  Show {filteredRestaurants.length} results
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Map placeholder */}
            <div className="relative bg-gradient-to-br from-[#fdf0ec] to-[#f5ebe7] rounded-2xl overflow-hidden h-64 mb-6 map-grid border border-gray-100">
              {/* Pins */}
              {mapPins.map(pin => (
                <div
                  key={pin.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: pin.x, top: pin.y }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#b5341c] text-white text-xs font-bold flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                    {pin.id}
                  </div>
                </div>
              ))}
              {/* Center marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <MapPin size={32} className="text-[#b5341c] mx-auto mb-1" />
                <div className="bg-white rounded-xl px-3 py-1.5 shadow-sm">
                  <p className="text-sm font-semibold text-[#1a1a1a]">Calabar food map</p>
                  <p className="text-xs text-gray-500">Google Maps integration · {filteredRestaurants.length} pins</p>
                </div>
              </div>
            </div>

            {/* Results header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="font-playfair text-2xl font-semibold text-[#1a1a1a]">
                  {activeCategory === 'all' ? 'All restaurants' :
                    CATEGORIES.find(c => c.id === activeCategory)?.label || 'Restaurants'}
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  {filteredRestaurants.length} spot{filteredRestaurants.length !== 1 ? 's' : ''} in Calabar
                </p>
              </div>
            </div>

            {/* Grid */}
            {paginatedRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paginatedRestaurants.map(restaurant => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="font-semibold text-[#1a1a1a] mb-2">No restaurants found</h3>
                <p className="text-sm text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                <button onClick={resetFilters} className="text-sm text-[#b5341c] font-semibold">
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-full disabled:opacity-40 hover:border-[#b5341c] transition-colors"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 text-sm font-medium rounded-full transition-colors ${
                      currentPage === i + 1
                        ? 'bg-[#b5341c] text-white'
                        : 'border border-gray-200 hover:border-[#b5341c]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-full disabled:opacity-40 hover:border-[#b5341c] transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

interface FilterContentProps {
  priceFilter: PriceFilter; setPriceFilter: (v: PriceFilter) => void;
  ratingFilter: RatingFilter; setRatingFilter: (v: RatingFilter) => void;
  distanceFilter: DistanceFilter; setDistanceFilter: (v: DistanceFilter) => void;
  openNow: boolean; setOpenNow: (v: boolean) => void;
  hasReservations: boolean; setHasReservations: (v: boolean) => void;
  hasDelivery: boolean; setHasDelivery: (v: boolean) => void;
}

function FilterContent({
  priceFilter, setPriceFilter,
  ratingFilter, setRatingFilter,
  distanceFilter, setDistanceFilter,
  openNow, setOpenNow,
  hasReservations, setHasReservations,
  hasDelivery, setHasDelivery,
}: FilterContentProps) {
  const pillClass = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
      active ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'border-gray-200 text-[#1a1a1a] hover:border-gray-400'
    }`;

  return (
    <div className="space-y-5">
      {/* Price Range */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Price Range</h3>
        <div className="flex flex-wrap gap-2">
          {(['N', 'NN', 'NNN', 'NNNN'] as PriceFilter[]).map(p => (
            <button
              key={p}
              onClick={() => setPriceFilter(priceFilter === p ? null : p)}
              className={pillClass(priceFilter === p)}
            >
              <span className={priceFilter === p ? '' : 'line-through text-gray-400'}>{p}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Rating</h3>
        <div className="flex flex-wrap gap-2">
          {([4.5, 4.0, 3.5] as RatingFilter[]).map(r => (
            <button
              key={r}
              onClick={() => setRatingFilter(ratingFilter === r ? null : r)}
              className={pillClass(ratingFilter === r)}
            >
              {r}+ ★
            </button>
          ))}
        </div>
      </div>

      {/* Distance */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Distance</h3>
        <div className="flex flex-wrap gap-2">
          {([1, 3, 5] as DistanceFilter[]).map(d => (
            <button
              key={d}
              onClick={() => setDistanceFilter(distanceFilter === d ? null : d)}
              className={pillClass(distanceFilter === d)}
            >
              &lt;{d} km
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Availability</h3>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setOpenNow(!openNow)} className={pillClass(openNow)}>Open Now</button>
          <button onClick={() => setHasReservations(!hasReservations)} className={pillClass(hasReservations)}>Reservations</button>
          <button onClick={() => setHasDelivery(!hasDelivery)} className={pillClass(hasDelivery)}>Delivery</button>
        </div>
      </div>
    </div>
  );
}
