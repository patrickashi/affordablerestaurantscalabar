import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Heart, Share2, Phone, Calendar, ChevronLeft, Shield } from 'lucide-react';
import { RESTAURANTS } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import { useAuth } from '../context/AuthContext';

export default function RestaurantDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [liked, setLiked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showReservation, setShowReservation] = useState(false);
  const [reservationForm, setReservationForm] = useState({ name: '', phone: '', date: '', time: '', guests: '2', notes: '' });
  const [reservationSuccess, setReservationSuccess] = useState(false);

  const restaurant = RESTAURANTS.find(r => r.slug === slug);

  if (!restaurant) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">🍽️</div>
          <h1 className="font-playfair text-2xl font-semibold mb-2">Restaurant not found</h1>
          <p className="text-gray-500 mb-6">This spot might have moved or been removed.</p>
          <Link to="/restaurants" className="px-6 py-3 bg-[#b5341c] text-white rounded-full font-semibold text-sm">
            Browse all restaurants
          </Link>
        </div>
      </div>
    );
  }

  const similar = RESTAURANTS
    .filter(r => r.id !== restaurant.id && r.categories.some(c => restaurant.categories.includes(c)))
    .slice(0, 3);

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${restaurant.whatsapp}?text=Hi! I found your restaurant on AffordableCalabar. I'd like to make a reservation.`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${restaurant.phone}`, '_self');
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: restaurant.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReservationSuccess(true);
    setTimeout(() => { setShowReservation(false); setReservationSuccess(false); }, 2000);
  };

  const renderStars = (rating: number, size = 16) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star
          key={s}
          size={size}
          className={s <= Math.floor(rating) ? 'fill-[#b5341c] text-[#b5341c]' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen pt-16 bg-[#f7f3f0]">
      {/* Gallery */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 pt-4">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#b5341c] transition-colors mb-3"
          >
            <ChevronLeft size={16} /> Back to results
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 rounded-2xl overflow-hidden">
            <div className="md:col-span-2 aspect-[16/9] md:aspect-auto">
              <img
                src={restaurant.gallery[activeImage] || restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
                style={{ minHeight: '250px', maxHeight: '420px' }}
              />
            </div>
            {restaurant.gallery.length > 1 && (
              <div className="hidden md:grid grid-rows-2 gap-2">
                {restaurant.gallery.slice(1, 3).map((img, i) => (
                  <div
                    key={i}
                    className="overflow-hidden cursor-pointer"
                    onClick={() => setActiveImage(i + 1)}
                  >
                    <img
                      src={img}
                      alt={`${restaurant.name} ${i + 2}`}
                      className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                      style={{ minHeight: '120px' }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile gallery dots */}
          {restaurant.gallery.length > 1 && (
            <div className="flex items-center gap-2 justify-center mt-2 md:hidden">
              {restaurant.gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === activeImage ? 'bg-[#b5341c] w-4' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="bg-white rounded-2xl p-5 mb-4 border border-gray-100">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-[#b5341c] uppercase tracking-wider">
                      {restaurant.category}
                    </span>
                    {restaurant.verificationBadge && (
                      <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        <Shield size={10} /> Verified
                      </span>
                    )}
                  </div>
                  <h1 className="font-playfair text-2xl sm:text-3xl font-semibold text-[#1a1a1a] mb-2">
                    {restaurant.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-[#b5341c] text-[#b5341c]" />
                      <span className="font-semibold">{restaurant.rating}</span>
                      <span className="text-gray-400">({restaurant.reviewCount} reviews)</span>
                    </div>
                    <span className="text-gray-300">·</span>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin size={13} />
                      <span>{restaurant.location}</span>
                    </div>
                    <span className="text-gray-300">·</span>
                    <span className={`font-semibold text-sm ${
                      restaurant.isOpen
                        ? restaurant.isClosingSoon ? 'text-orange-500' : 'text-green-600'
                        : 'text-red-500'
                    }`}>
                      {restaurant.isOpen
                        ? restaurant.isClosingSoon ? 'Closing Soon' : 'Open'
                        : 'Closed'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                      liked ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <Heart size={16} className={liked ? 'fill-red-500' : ''} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors text-gray-500"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{restaurant.description}</p>
            </div>

            {/* Menu Highlights */}
            <div className="bg-white rounded-2xl p-5 mb-4 border border-gray-100">
              <h2 className="font-playfair text-xl font-semibold text-[#1a1a1a] mb-4">Menu Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {restaurant.menuHighlights.map(item => (
                  <div key={item.id} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-[#1a1a1a] text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                      </div>
                      <span className="text-[#b5341c] font-bold text-sm whitespace-nowrap">
                        ₦{item.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-5 mb-4 border border-gray-100">
              <h2 className="font-playfair text-xl font-semibold text-[#1a1a1a] mb-4">What guests are saying</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {restaurant.reviews.map(review => (
                  <div key={review.id} className="border border-gray-100 rounded-2xl p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(review.rating, 13)}
                    </div>
                    <p className="text-sm text-gray-600 mb-3 italic">"{review.comment}"</p>
                    <p className="text-xs font-semibold text-[#1a1a1a]">{review.author}</p>
                  </div>
                ))}
              </div>

              {isAuthenticated && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h3 className="font-semibold text-[#1a1a1a] mb-3 text-sm">Leave a review</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button key={s}>
                        <Star size={22} className="text-gray-200 hover:fill-[#b5341c] hover:text-[#b5341c] transition-colors" />
                      </button>
                    ))}
                  </div>
                  <textarea
                    placeholder="Share your experience..."
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-[#b5341c] resize-none h-20"
                  />
                  <button className="mt-2 px-5 py-2 bg-[#b5341c] text-white text-sm font-semibold rounded-full hover:bg-[#8B2615] transition-colors">
                    Submit Review
                  </button>
                </div>
              )}
            </div>

            {/* Directions / Map */}
            <div className="bg-white rounded-2xl p-5 mb-4 border border-gray-100">
              <h2 className="font-playfair text-xl font-semibold text-[#1a1a1a] mb-4">Directions</h2>
              <div className="relative bg-gradient-to-br from-[#fdf0ec] to-[#f5ebe7] rounded-xl overflow-hidden h-52 map-grid border border-gray-100 mb-3">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-[#b5341c] text-white flex items-center justify-center mx-auto mb-2 shadow-lg">
                      <MapPin size={18} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">{restaurant.address}</p>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(restaurant.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium px-4 py-2 border border-gray-200 rounded-full hover:border-[#b5341c] transition-colors flex items-center gap-1"
                >
                  <MapPin size={13} /> Open in Google Maps
                </a>
              </div>
            </div>

            {/* Similar Restaurants */}
            {similar.length > 0 && (
              <div className="mb-4">
                <h2 className="font-playfair text-xl font-semibold text-[#1a1a1a] mb-4">Similar restaurants</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {similar.map(r => (
                    <RestaurantCard key={r.id} restaurant={r} size="small" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sticky CTA */}
          <div className="lg:w-80 shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* Booking Card */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">AVG. SPEND</p>
                  </div>
                  <span className="font-playfair text-2xl font-bold text-[#b5341c]">
                    ₦{restaurant.priceMax >= 25000 ? `${(restaurant.priceMax / 1000).toFixed(0)}k+` : `${(restaurant.priceMax / 1000).toFixed(0)}k`}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                  <Clock size={14} />
                  <span>{restaurant.days} · {restaurant.hours}</span>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={handleWhatsApp}
                    className="w-full py-3.5 bg-[#25D366] text-white font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-[#1da851] transition-colors"
                  >
                    <span className="text-lg">💬</span> WhatsApp
                  </button>
                  <button
                    onClick={handleCall}
                    className="w-full py-3.5 bg-[#1a1a1a] text-white font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-black transition-colors"
                  >
                    <Phone size={16} /> Call now
                  </button>
                  {restaurant.hasReservations && (
                    <button
                      onClick={() => setShowReservation(true)}
                      className="w-full py-3.5 bg-[#b5341c] text-white font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-[#8B2615] transition-colors"
                    >
                      <Calendar size={16} /> Reserve Table
                    </button>
                  )}
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-[#f7f3f0] rounded-2xl p-4 border border-gray-100">
                <p className="text-sm font-semibold text-[#1a1a1a] mb-1">Social proof</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {restaurant.socialProof.monthlyVisits}+ visits this month ·{' '}
                  {restaurant.socialProof.repeatCustomers} repeat customers{' '}
                  {restaurant.socialProof.blogFeatures > 0 && `· featured in ${restaurant.socialProof.blogFeatures} blog posts`}
                </p>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100">
                <h3 className="font-semibold text-[#1a1a1a] mb-3 text-sm">Opening Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{restaurant.days}</span>
                    <span className="font-medium text-[#1a1a1a]">{restaurant.hours}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status</span>
                    <span className={`font-semibold ${restaurant.isOpen ? 'text-green-600' : 'text-red-500'}`}>
                      {restaurant.isOpen ? 'Open Now' : 'Closed'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Modal */}
      {showReservation && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-0 sm:pb-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowReservation(false)} />
          <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 animate-fade-in">
            <h2 className="font-playfair text-xl font-semibold mb-1">Reserve a Table</h2>
            <p className="text-sm text-gray-500 mb-4">at {restaurant.name}</p>

            {reservationSuccess ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">✅</div>
                <p className="font-semibold text-[#1a1a1a]">Reservation Request Sent!</p>
                <p className="text-sm text-gray-500 mt-1">We'll confirm via WhatsApp shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleReservationSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={reservationForm.name}
                  onChange={e => setReservationForm({ ...reservationForm, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#b5341c]"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={reservationForm.phone}
                  onChange={e => setReservationForm({ ...reservationForm, phone: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#b5341c]"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={reservationForm.date}
                    onChange={e => setReservationForm({ ...reservationForm, date: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#b5341c]"
                  />
                  <input
                    type="time"
                    value={reservationForm.time}
                    onChange={e => setReservationForm({ ...reservationForm, time: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#b5341c]"
                  />
                </div>
                <select
                  value={reservationForm.guests}
                  onChange={e => setReservationForm({ ...reservationForm, guests: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#b5341c] bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
                <textarea
                  placeholder="Special requests (optional)"
                  value={reservationForm.notes}
                  onChange={e => setReservationForm({ ...reservationForm, notes: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#b5341c] resize-none"
                />
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReservation(false)}
                    className="flex-1 py-3 border border-gray-200 rounded-full text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#b5341c] text-white rounded-full text-sm font-semibold hover:bg-[#8B2615] transition-colors"
                  >
                    Confirm Reservation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
