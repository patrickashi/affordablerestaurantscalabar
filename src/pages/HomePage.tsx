import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Star, TrendingUp, ChevronRight } from 'lucide-react';
import { CATEGORIES, RESTAURANTS, TESTIMONIALS } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    navigate(`/restaurants?${params.toString()}`);
  };

  const featured = RESTAURANTS.filter(r => r.isFeatured).slice(0, 4);
  const trending = RESTAURANTS.filter(r => r.rating >= 4.5).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#fdf0ec] via-[#f7f3f0] to-[#f7f3f0] pt-28 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-gray-600 font-medium">120+ restaurants live in Calabar</span>
          </div>

          {/* Headline */}
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1a1a1a] leading-tight mb-5">
            Find affordable<br />
            restaurants in{' '}
            <span className="text-[#b5341c] italic">Calabar</span>
          </h1>

          <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Discover the best native food, rooftop lounges and student-friendly spots across the city of tourism.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-4">
            <div className="flex items-center bg-white rounded-full shadow-md border border-gray-100 p-2 gap-2">
              <Search size={18} className="text-gray-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Suya, Afang, Lounges..."
                className="flex-1 bg-transparent outline-none text-[#1a1a1a] placeholder-gray-400 text-sm sm:text-base py-2"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#b5341c] text-white font-semibold rounded-full hover:bg-[#8B2615] transition-colors text-sm sm:text-base shrink-0"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mb-8">
            <MapPin size={12} className="text-[#b5341c]" />
            <span>Calabar, Cross River</span>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start md:justify-center scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  navigate(`/restaurants?category=${cat.id}`);
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
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
      </section>

      {/* Featured Restaurants */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-[#1a1a1a]">
                Featured Spots
              </h2>
              <p className="text-sm text-gray-500 mt-1">Handpicked favorites in Calabar</p>
            </div>
            <Link
              to="/restaurants"
              className="flex items-center gap-1 text-sm font-medium text-[#b5341c] hover:gap-2 transition-all"
            >
              See all <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((restaurant, i) => (
              <div key={restaurant.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={18} className="text-[#b5341c]" />
                <span className="text-xs font-semibold text-[#b5341c] uppercase tracking-wider">Hot right now</span>
              </div>
              <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-[#1a1a1a]">
                Trending in Calabar
              </h2>
            </div>
            <Link
              to="/trending"
              className="flex items-center gap-1 text-sm font-medium text-[#b5341c] hover:gap-2 transition-all"
            >
              View all <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {trending.map((restaurant, i) => (
              <div key={restaurant.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <RestaurantCard restaurant={restaurant} size="small" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: '120+', label: 'Restaurants Listed' },
              { value: '5,000+', label: 'Monthly Users' },
              { value: '4.8★', label: 'Average Rating' },
              { value: '12+', label: 'Neighborhoods' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore by Category */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-[#1a1a1a] mb-2">
            Explore by Category
          </h2>
          <p className="text-gray-500 text-sm mb-6">Find exactly what you're craving</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.filter(c => c.id !== 'all').map((cat, i) => (
              <Link
                key={cat.id}
                to={`/restaurants?category=${cat.id}`}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#b5341c] hover:shadow-md transition-all group"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-xs font-medium text-[#1a1a1a] text-center group-hover:text-[#b5341c] transition-colors">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 bg-[#fdf0ec]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-[#1a1a1a] mb-2">
              Loved by Calabar
            </h2>
            <p className="text-gray-500 text-sm">What our community is saying</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} className="fill-[#b5341c] text-[#b5341c]" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">"{t.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#b5341c] flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a1a]">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AffordableCalabar */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-[#1a1a1a] mb-2">
              Why AffordableCalabar?
            </h2>
            <p className="text-gray-500 text-sm">Your trusted guide to the flavors of Calabar</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: '🎯',
                title: 'Hyper-Local Focus',
                description: 'We cover every neighborhood in Calabar — from Marian Market to Satellite Town and beyond.',
              },
              {
                icon: '💰',
                title: 'Budget-Friendly Picks',
                description: 'Every restaurant is categorized by price so you always know what to expect before you go.',
              },
              {
                icon: '✅',
                title: 'Verified Listings',
                description: 'Our team visits and verifies top listings to ensure quality and accuracy for every user.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-[#f7f3f0] border border-gray-100"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-[#1a1a1a] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Teaser */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-[#1a1a1a]">
                Calabar Food Blog
              </h2>
              <p className="text-sm text-gray-500 mt-1">Tips, guides, and food stories</p>
            </div>
            <Link to="/blog" className="flex items-center gap-1 text-sm font-medium text-[#b5341c]">
              All posts <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                tag: 'Guide',
                title: '10 Must-Try Native Dishes in Calabar (2025)',
                excerpt: 'From Afang to Ekpang Nkukwo, here are the dishes you cannot leave Calabar without trying.',
                readTime: '5 min read',
                image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
              },
              {
                tag: 'Student Deals',
                title: 'Best Affordable Spots Near UNICAL Campus',
                excerpt: 'On a student budget? These spots serve great food for under ₦1,500 per meal.',
                readTime: '4 min read',
                image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&q=80',
              },
              {
                tag: 'Nightlife',
                title: 'Late Night Dining Guide: Where to Eat After 10 PM',
                excerpt: 'Calabar never truly sleeps. Discover the best spots open late for night owls.',
                readTime: '6 min read',
                image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&q=80',
              },
            ].map((post, i) => (
              <Link key={i} to="/blog" className="group block">
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm card-hover">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold text-[#b5341c] uppercase tracking-wider">{post.tag}</span>
                    <h3 className="font-semibold text-[#1a1a1a] text-sm mt-1 mb-2 line-clamp-2 group-hover:text-[#b5341c] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">{post.excerpt}</p>
                    <span className="text-xs text-gray-400">{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Near Me CTA */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-3xl p-8 text-center text-white">
            <div className="text-3xl mb-3">📍</div>
            <h2 className="font-playfair text-2xl sm:text-3xl font-semibold mb-2">
              Find Restaurants Near You
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Enable location to discover the closest spots to you right now.
            </p>
            <Link
              to="/restaurants?near=me"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#b5341c] text-white font-semibold rounded-full hover:bg-[#8B2615] transition-colors"
            >
              <MapPin size={16} />
              Use My Location
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
