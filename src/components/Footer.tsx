import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-[#fdf0ec] to-[#fae8e3] py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1a1a1a] mb-3">
            Are you a restaurant owner?
          </h2>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Join hundreds of local spots and reach more hungry customers in Calabar.
          </p>
          <Link
            to="/list-your-spot"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#b5341c] text-white font-semibold rounded-full hover:bg-[#8B2615] transition-colors text-sm sm:text-base"
          >
            List Your Restaurant →
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#b5341c] flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <span className="font-semibold text-lg">
                <span className="text-[#b5341c]">Affordable</span>
                <span className="text-[#1a1a1a]">Calabar</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Helping you navigate the flavors of Calabar without breaking the bank. From Marian to Satellite Town, we've got you covered.
            </p>
            <div className="flex items-center gap-1 mt-4 text-xs text-gray-400">
              <MapPin size={12} className="text-[#b5341c]" />
              <span>Calabar, Cross River State, Nigeria</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#f5e8e5] hover:text-[#b5341c] transition-colors text-xs font-bold">
                IG
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#f5e8e5] hover:text-[#b5341c] transition-colors text-xs font-bold">
                TW
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#f5e8e5] hover:text-[#b5341c] transition-colors text-xs font-bold">
                FB
              </a>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Popular Categories
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Native Food Spots', href: '/restaurants?category=native-food' },
                { label: 'Late Night Lounges', href: '/restaurants?category=lounges' },
                { label: 'Rooftop Dining', href: '/restaurants?category=rooftop' },
                { label: 'Student Deals', href: '/restaurants?category=student-friendly' },
                { label: 'Shawarma Spots', href: '/restaurants?category=shawarma' },
                { label: 'Fast Food', href: '/restaurants?category=fast-food' },
              ].map(item => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-[#1a1a1a] hover:text-[#b5341c] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Pricing & Plans', href: '/pricing' },
                { label: 'Owner Dashboard', href: '/dashboard' },
                { label: 'Calabar Food Blog', href: '/blog' },
                { label: 'Admin Portal', href: '/admin' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map(item => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-[#1a1a1a] hover:text-[#b5341c] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Cookie Policy', href: '/cookies' },
                { label: 'Advertise', href: '/advertise' },
              ].map(item => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-[#1a1a1a] hover:text-[#b5341c] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                Newsletter
              </h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 min-w-0 px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#b5341c] bg-white"
                />
                <button className="px-3 py-2 bg-[#b5341c] text-white text-xs font-semibold rounded-lg hover:bg-[#8B2615] transition-colors whitespace-nowrap">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {currentYear} AffordableRestaurantsCalabar.com · All rights reserved
          </p>
          <p className="text-xs text-gray-400">
            Made with ❤️ in Calabar, Nigeria 🇳🇬
          </p>
        </div>
      </div>
    </footer>
  );
}
