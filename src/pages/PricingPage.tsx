import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'FREE LISTING',
    price: 0,
    period: '',
    tagline: 'Get discovered',
    features: [
      'Basic profile page',
      'Photos (up to 3)',
      'Map pin on Calabar map',
      'Customer reviews',
    ],
    cta: 'Start free',
    ctaLink: '/register?role=owner',
    dark: false,
    highlight: false,
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    price: 12000,
    period: '/month · Most popular',
    tagline: '',
    features: [
      'Everything in Free',
      'Unlimited photos',
      'WhatsApp & call buttons',
      'Menu editor',
      'Performance analytics',
      'Reservation requests',
    ],
    cta: 'Go Premium',
    ctaLink: '/register?role=owner&plan=premium',
    dark: true,
    highlight: true,
  },
  {
    id: 'featured',
    name: 'FEATURED',
    price: 35000,
    period: '/month',
    tagline: '',
    features: [
      'Everything in Premium',
      'Top of category pages',
      'Homepage carousel',
      'Sponsored badge',
      'Priority support',
      'Blog feature once a quarter',
    ],
    cta: 'Get Featured',
    ctaLink: '/register?role=owner&plan=featured',
    dark: false,
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-20 bg-[#f7f3f0]">
      {/* Header */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-semibold text-[#b5341c] uppercase tracking-widest">PRICING</span>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1a1a1a] mt-3 mb-4 leading-tight">
            Plans built for{' '}
            <span className="text-[#b5341c] italic">Calabar</span>{' '}
            restaurants.
          </h1>
          <p className="text-gray-500 text-base sm:text-lg">
            Start free. Upgrade when you're ready to fill more tables.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map(plan => (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col transition-all ${
                  plan.dark
                    ? 'bg-[#1a1a1a] text-white'
                    : 'bg-white border border-gray-100 text-[#1a1a1a]'
                } ${plan.highlight ? 'md:-mt-4 md:mb-4 shadow-2xl' : 'shadow-sm'}`}
              >
                <div className="mb-6">
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${plan.dark ? 'text-gray-400' : 'text-gray-400'}`}>
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className={`font-playfair text-5xl font-bold ${plan.dark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                      ₦{plan.price === 0 ? '0' : plan.price.toLocaleString()}
                    </span>
                  </div>
                  {plan.period && (
                    <p className={`text-sm mt-1 ${plan.dark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {plan.period}
                    </p>
                  )}
                  {plan.tagline && (
                    <p className={`text-sm mt-1 ${plan.dark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {plan.tagline}
                    </p>
                  )}
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        plan.dark ? 'bg-white/10' : 'bg-[#f0fdf4]'
                      }`}>
                        <Check size={10} className={plan.dark ? 'text-white' : 'text-green-600'} />
                      </div>
                      <span className={`text-sm ${plan.dark ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.ctaLink}
                  className={`w-full py-4 rounded-full font-semibold text-center text-sm transition-all block ${
                    plan.highlight
                      ? 'bg-[#b5341c] text-white hover:bg-[#8B2615]'
                      : plan.dark
                      ? 'bg-[#b5341c] text-white hover:bg-[#8B2615]'
                      : 'bg-[#1a1a1a] text-white hover:bg-black'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Feature comparison */}
          <div className="mt-16 bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-playfair text-2xl font-semibold text-[#1a1a1a]">Feature Comparison</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="bg-[#f7f3f0]">
                    <th className="text-left px-6 py-3 text-sm font-semibold text-[#1a1a1a]">Feature</th>
                    <th className="text-center px-4 py-3 text-sm font-semibold text-gray-500">Free</th>
                    <th className="text-center px-4 py-3 text-sm font-semibold text-[#1a1a1a] bg-[#f5e8e5]">Premium</th>
                    <th className="text-center px-4 py-3 text-sm font-semibold text-gray-500">Featured</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { feature: 'Basic Profile', free: true, premium: true, featured: true },
                    { feature: 'Photos', free: '3', premium: 'Unlimited', featured: 'Unlimited' },
                    { feature: 'Map Pin', free: true, premium: true, featured: true },
                    { feature: 'Customer Reviews', free: true, premium: true, featured: true },
                    { feature: 'WhatsApp Button', free: false, premium: true, featured: true },
                    { feature: 'Call Button', free: false, premium: true, featured: true },
                    { feature: 'Menu Editor', free: false, premium: true, featured: true },
                    { feature: 'Analytics Dashboard', free: false, premium: true, featured: true },
                    { feature: 'Reservation Requests', free: false, premium: true, featured: true },
                    { feature: 'Top of Category Pages', free: false, premium: false, featured: true },
                    { feature: 'Homepage Carousel', free: false, premium: false, featured: true },
                    { feature: 'Sponsored Badge', free: false, premium: false, featured: true },
                    { feature: 'Blog Feature', free: false, premium: false, featured: 'Quarterly' },
                    { feature: 'Priority Support', free: false, premium: false, featured: true },
                  ].map(row => (
                    <tr key={row.feature} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 text-sm text-[#1a1a1a]">{row.feature}</td>
                      {[row.free, row.premium, row.featured].map((val, i) => (
                        <td key={i} className={`text-center px-4 py-3 ${i === 1 ? 'bg-[#fdf8f7]' : ''}`}>
                          {val === true ? (
                            <Check size={16} className="text-green-500 mx-auto" />
                          ) : val === false ? (
                            <span className="text-gray-300 text-lg">—</span>
                          ) : (
                            <span className="text-xs font-medium text-[#b5341c]">{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-12">
            <h2 className="font-playfair text-2xl font-semibold text-[#1a1a1a] mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  q: 'How does the free listing work?',
                  a: 'Your restaurant gets a basic profile page with up to 3 photos, a map pin, and the ability to collect reviews. No credit card required.',
                },
                {
                  q: 'Can I cancel my subscription anytime?',
                  a: 'Yes! You can cancel Premium or Featured at any time. Your listing reverts to the Free tier at the end of your billing period.',
                },
                {
                  q: 'How is payment processed?',
                  a: 'We use Paystack — Nigeria\'s most trusted payment processor. We accept cards, bank transfers, and USSD.',
                },
                {
                  q: 'What is a sponsored badge?',
                  a: 'Featured restaurants get a "SPONSORED" badge on search results and appear at the top of relevant category pages.',
                },
              ].map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100">
                  <h3 className="font-semibold text-[#1a1a1a] text-sm mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
