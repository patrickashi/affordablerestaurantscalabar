import { Link } from 'react-router-dom';
import { Check, ArrowRight, Star, TrendingUp, MessageSquare, BarChart2, Shield, Users } from 'lucide-react';

export default function ForOwnersPage() {
  return (
    <div className="min-h-screen pt-20 bg-[#f7f3f0]">
      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#fdf0ec] to-[#f7f3f0]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold text-[#b5341c] uppercase tracking-widest">FOR RESTAURANT OWNERS</span>
          <h1 className="font-playfair text-4xl sm:text-5xl font-semibold text-[#1a1a1a] mt-3 mb-4 leading-tight">
            Grow your restaurant<br />in <span className="text-[#b5341c] italic">Calabar</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Join the platform trusted by 120+ restaurants in Calabar to reach more customers, manage reservations, and grow their business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/register?role=owner"
              className="px-8 py-4 bg-[#b5341c] text-white font-semibold rounded-full hover:bg-[#8B2615] transition-colors"
            >
              Start Free — No Credit Card
            </Link>
            <Link
              to="/pricing"
              className="px-8 py-4 border border-gray-300 text-[#1a1a1a] font-semibold rounded-full hover:border-gray-400 transition-colors"
            >
              View Pricing →
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-3">Free forever · Upgrade anytime</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: '120+', label: 'Restaurants Listed' },
            { value: '5,000+', label: 'Monthly Users' },
            { value: '40%', label: 'Avg Reservation Increase' },
            { value: '₦0', label: 'To Get Started' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="font-playfair text-3xl font-bold text-[#b5341c] mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-playfair text-3xl font-semibold text-[#1a1a1a] mb-2">
              Everything you need to grow
            </h2>
            <p className="text-gray-500 text-sm">Built specifically for Calabar restaurants</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Users,
                title: 'Reach More Customers',
                description: 'Get discovered by thousands of hungry users actively searching for food in Calabar.',
              },
              {
                icon: MessageSquare,
                title: 'WhatsApp Lead Generation',
                description: 'Direct WhatsApp button on your profile converts visitors into paying customers instantly.',
              },
              {
                icon: Star,
                title: 'Build Your Reputation',
                description: 'Collect authentic reviews that build trust and attract new customers to your restaurant.',
              },
              {
                icon: BarChart2,
                title: 'Track Performance',
                description: 'See how many people view your profile, click your WhatsApp, and make reservations.',
              },
              {
                icon: TrendingUp,
                title: 'Premium Placement',
                description: 'Featured listings appear at the top of search results and on the homepage carousel.',
              },
              {
                icon: Shield,
                title: 'Verified Badge',
                description: 'Get a verification badge after we confirm your restaurant details — builds customer trust.',
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-11 h-11 rounded-2xl bg-[#fdf0ec] flex items-center justify-center mb-4">
                  <feature.icon size={20} className="text-[#b5341c]" />
                </div>
                <h3 className="font-semibold text-[#1a1a1a] mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-playfair text-3xl font-semibold text-[#1a1a1a] mb-2">How it works</h2>
            <p className="text-gray-500 text-sm">Get listed in under 10 minutes</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Create Free Account',
                description: 'Sign up as a restaurant owner — it\'s completely free and takes less than 2 minutes.',
              },
              {
                step: '2',
                title: 'Complete Your Listing',
                description: 'Add your restaurant info, photos, menu, and contact details using our simple form.',
              },
              {
                step: '3',
                title: 'Start Getting Customers',
                description: 'Once approved (within 24 hours), customers can find and contact you directly.',
              },
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                <div className="w-12 h-12 rounded-full bg-[#b5341c] text-white font-playfair text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                {i < 2 && (
                  <div className="hidden sm:block absolute top-6 left-3/4 w-1/2 h-0.5 bg-gray-200" />
                )}
                <h3 className="font-semibold text-[#1a1a1a] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials from owners */}
      <section className="py-14 px-4 bg-[#fdf0ec]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair text-3xl font-semibold text-[#1a1a1a] mb-8 text-center">
            What owners are saying
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                name: 'Amaka Nwankwo',
                restaurant: 'Calabar Kitchen',
                quote: 'Our reservations increased by 40% in the first month. The WhatsApp button alone gets us 50+ new customers weekly.',
                rating: 5,
              },
              {
                name: 'Femi Adeleye',
                restaurant: 'Diamond Lounge',
                quote: 'The analytics dashboard shows exactly where our customers are coming from. I can see what\'s working and optimize accordingly.',
                rating: 5,
              },
              {
                name: 'Blessing Ita',
                restaurant: 'Satellite Bites',
                quote: 'Started on the free plan and upgraded to Premium after seeing the results. Best ₦12,000 I spend monthly on marketing.',
                rating: 5,
              },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} className="fill-[#b5341c] text-[#b5341c]" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed mb-4">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-[#1a1a1a] text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.restaurant}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-3xl sm:text-4xl font-semibold text-[#1a1a1a] mb-3">
            Ready to grow your restaurant?
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Start with a free listing today. No credit card, no contract.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/list-your-spot"
              className="px-8 py-4 bg-[#b5341c] text-white font-semibold rounded-full hover:bg-[#8B2615] transition-colors flex items-center gap-2"
            >
              List Your Restaurant <ArrowRight size={16} />
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium text-[#b5341c] hover:underline"
            >
              Compare plans →
            </Link>
          </div>

          {/* Free features list */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {['Basic profile', '3 photos free', 'Map pin', 'Customer reviews', 'No credit card'].map(f => (
              <div key={f} className="flex items-center gap-1.5 text-xs text-gray-500">
                <Check size={12} className="text-green-500" /> {f}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
