import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import TrendingPage from './pages/TrendingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PricingPage from './pages/PricingPage';
import ForOwnersPage from './pages/ForOwnersPage';
import ListYourSpotPage from './pages/ListYourSpotPage';
import BlogPage from './pages/BlogPage';
import OwnerDashboardPage from './pages/OwnerDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// Pages that should NOT show the Navbar/Footer
const AUTH_PAGES = ['/login', '/register', '/forgot-password'];

function AppLayout() {
  const location = useLocation();
  const isAuthPage = AUTH_PAGES.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f3f0]">
      <ScrollToTop />
      {!isAuthPage && <Navbar />}
      <main className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/restaurants/:slug" element={<RestaurantDetailPage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/for-owners" element={<ForOwnersPage />} />
          <Route path="/list-your-spot" element={<ListYourSpotPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<LoginPage />} />

          {/* Protected */}
          <Route path="/dashboard" element={<OwnerDashboardPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />

          {/* Static Pages */}
          <Route path="/about" element={<SimpleStaticPage title="About Us" />} />
          <Route path="/contact" element={<SimpleStaticPage title="Contact Us" />} />
          <Route path="/privacy" element={<SimpleStaticPage title="Privacy Policy" />} />
          <Route path="/terms" element={<SimpleStaticPage title="Terms of Service" />} />
          <Route path="/cookies" element={<SimpleStaticPage title="Cookie Policy" />} />
          <Route path="/advertise" element={<SimpleStaticPage title="Advertise With Us" />} />
          <Route path="/profile" element={<SimpleStaticPage title="My Profile" />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

function SimpleStaticPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen pt-24 bg-[#f7f3f0] px-4">
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="font-playfair text-3xl font-semibold text-[#1a1a1a] mb-4">{title}</h1>
        <div className="bg-white rounded-2xl p-8 border border-gray-100">
          <p className="text-gray-500 text-sm leading-relaxed">
            This page is part of the AffordableRestaurantsCalabar.com platform. Content for this section will be added as part of the backend integration.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed mt-3">
            AffordableCalabar is the premier restaurant discovery platform for Calabar, Cross River State, Nigeria. We help food lovers find the best affordable dining experiences across the city.
          </p>
          <div className="mt-6 p-4 bg-[#f7f3f0] rounded-xl">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} AffordableRestaurantsCalabar.com · Calabar, Cross River State, Nigeria
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </Router>
  );
}
