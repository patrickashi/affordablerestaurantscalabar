import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, User } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    slug: '10-must-try-dishes-calabar',
    title: '10 Must-Try Native Dishes in Calabar (2025)',
    excerpt: 'From Afang Soup to Ekpang Nkukwo, here are the dishes you cannot leave Calabar without trying. A food lover\'s guide to the city of tourism.',
    category: 'Guide',
    author: 'Amaka Osei',
    readTime: '5 min read',
    date: 'January 15, 2025',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    featured: true,
  },
  {
    id: 2,
    slug: 'affordable-spots-unical',
    title: 'Best Affordable Spots Near UNICAL Campus',
    excerpt: 'On a student budget? These spots serve great food for under ₦1,500 per meal. From the canteen classics to hidden gems.',
    category: 'Student Deals',
    author: 'Emeka Tunde',
    readTime: '4 min read',
    date: 'January 12, 2025',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&q=80',
    featured: false,
  },
  {
    id: 3,
    slug: 'late-night-dining-calabar',
    title: 'Late Night Dining: Where to Eat After 10 PM in Calabar',
    excerpt: 'Calabar never truly sleeps. Discover the best spots open late for night owls, from Suya spots to all-night diners.',
    category: 'Nightlife',
    author: 'Blessing Nwosu',
    readTime: '6 min read',
    date: 'January 10, 2025',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80',
    featured: false,
  },
  {
    id: 4,
    slug: 'rooftop-dining-calabar',
    title: 'Top 5 Rooftop Dining Experiences in Calabar',
    excerpt: 'Elevate your dining experience — literally. The best rooftop restaurants with stunning views of Calabar and the Cross River.',
    category: 'Rooftop',
    author: 'Nsikan Udoh',
    readTime: '5 min read',
    date: 'January 8, 2025',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    featured: false,
  },
  {
    id: 5,
    slug: 'shawarma-battle-calabar',
    title: 'The Great Calabar Shawarma Battle: Who Makes It Best?',
    excerpt: 'We visited 10 shawarma spots across Calabar and ranked them. The results might surprise you!',
    category: 'Review',
    author: 'Chidi Okafor',
    readTime: '7 min read',
    date: 'January 5, 2025',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=600&q=80',
    featured: false,
  },
  {
    id: 6,
    slug: 'calabar-carnival-food-guide',
    title: 'The Ultimate Calabar Carnival Food Guide',
    excerpt: 'Carnival season in Calabar is magical — and so is the food. Here\'s everything you need to eat before the festivities begin.',
    category: 'Events',
    author: 'Amaka Osei',
    readTime: '8 min read',
    date: 'December 28, 2024',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
    featured: false,
  },
];

const CATEGORIES = ['All', 'Guide', 'Student Deals', 'Nightlife', 'Rooftop', 'Review', 'Events'];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const featured = BLOG_POSTS.find(p => p.featured);
  const filtered = BLOG_POSTS.filter(p => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory && !p.featured;
  });

  return (
    <div className="min-h-screen pt-20 bg-[#f7f3f0]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-semibold text-[#b5341c] uppercase tracking-widest">BLOG</span>
          <h1 className="font-playfair text-3xl sm:text-4xl font-semibold text-[#1a1a1a] mt-2 mb-2">
            Calabar Food Stories
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
            Restaurant guides, food reviews, and local dining culture from the city of tourism.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto flex items-center bg-[#f7f3f0] rounded-full px-4 py-2.5 gap-2 border border-gray-200">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category filters */}
        <div className="flex items-center gap-2 overflow-x-auto mb-8 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                activeCategory === cat
                  ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                  : 'bg-white text-[#1a1a1a] border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featured && activeCategory === 'All' && !search && (
          <div className="mb-8">
            <Link to={`/blog/${featured.slug}`} className="group block">
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="aspect-video md:aspect-auto overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      style={{ minHeight: '250px' }}
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-[#fdf0ec] text-[#b5341c] text-xs font-semibold rounded-full">
                        {featured.category}
                      </span>
                      <span className="text-xs text-gray-400">Featured</span>
                    </div>
                    <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-[#1a1a1a] mb-3 group-hover:text-[#b5341c] transition-colors line-clamp-3">
                      {featured.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{featured.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <User size={12} /> {featured.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} /> {featured.readTime}
                      </div>
                      <span>{featured.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Post Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm card-hover h-full flex flex-col">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-[#b5341c]">{post.category}</span>
                    </div>
                    <h2 className="font-semibold text-[#1a1a1a] mb-2 line-clamp-2 group-hover:text-[#b5341c] transition-colors flex-1">
                      {post.title}
                    </h2>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-auto">
                      <div className="flex items-center gap-1">
                        <User size={11} /> {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={11} /> {post.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">📝</div>
            <p className="text-gray-500">No articles found</p>
          </div>
        )}
      </div>
    </div>
  );
}
