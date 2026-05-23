import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen pt-20 bg-[#f7f3f0] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="font-playfair text-8xl font-bold text-[#b5341c] mb-4">404</div>
        <h1 className="font-playfair text-2xl font-semibold text-[#1a1a1a] mb-3">
          Page not found
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-3 bg-[#b5341c] text-white font-semibold rounded-full hover:bg-[#8B2615] transition-colors text-sm"
          >
            Back to Home
          </Link>
          <Link
            to="/restaurants"
            className="px-6 py-3 border border-gray-200 text-[#1a1a1a] font-semibold rounded-full hover:border-gray-300 transition-colors text-sm"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    </div>
  );
}
