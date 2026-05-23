import { TrendingUp, Flame } from 'lucide-react';
import { RESTAURANTS } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';

export default function TrendingPage() {
  const trending = [...RESTAURANTS].sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen pt-20 bg-[#f7f3f0]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Flame size={20} className="text-[#b5341c]" />
            <span className="text-xs font-semibold text-[#b5341c] uppercase tracking-widest">Hot Right Now</span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl font-semibold text-[#1a1a1a] mb-3">
            Trending in Calabar
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            The most-visited, highest-rated, and most-talked-about food spots this week.
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {trending.slice(0, 3).map((r, i) => (
            <div key={r.id} className={`relative ${i === 0 ? 'sm:order-2' : i === 1 ? 'sm:order-1' : 'sm:order-3'}`}>
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-md ${
                i === 0 ? 'bg-yellow-400 text-yellow-900' : i === 1 ? 'bg-gray-300 text-gray-700' : 'bg-amber-600 text-white'
              }`}>
                {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
              </div>
              <div className={`pt-6 ${i === 0 ? 'transform sm:scale-105' : ''}`}>
                <RestaurantCard restaurant={r} />
              </div>
            </div>
          ))}
        </div>

        {/* Rest of trending */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={18} className="text-[#b5341c]" />
            <h2 className="font-semibold text-[#1a1a1a]">More trending spots</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trending.slice(3).map(r => (
              <RestaurantCard key={r.id} restaurant={r} size="small" />
            ))}
          </div>
        </div>

        {/* Trending Categories */}
        <div className="mt-12">
          <h2 className="font-playfair text-2xl font-semibold text-[#1a1a1a] mb-5">Trending Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { emoji: '🍲', label: 'Native Food', count: 24, trend: '+34%' },
              { emoji: '🥙', label: 'Shawarma', count: 18, trend: '+28%' },
              { emoji: '🍸', label: 'Lounges', count: 15, trend: '+19%' },
              { emoji: '🏙️', label: 'Rooftop', count: 8, trend: '+45%' },
              { emoji: '🎓', label: 'Student-Friendly', count: 32, trend: '+12%' },
              { emoji: '🍔', label: 'Fast Food', count: 27, trend: '+8%' },
            ].map((cat, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-[#b5341c] transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{cat.emoji}</span>
                  <span className="text-xs font-semibold text-green-600">{cat.trend}</span>
                </div>
                <h3 className="font-semibold text-[#1a1a1a] text-sm">{cat.label}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{cat.count} spots</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
