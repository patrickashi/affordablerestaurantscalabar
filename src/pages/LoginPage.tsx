import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = (role: 'user' | 'owner' | 'admin') => {
    const demos = {
      user: { email: 'user@demo.com', password: 'password123' },
      owner: { email: 'owner@demo.com', password: 'password123' },
      admin: { email: 'admin@demo.com', password: 'password123' },
    };
    setEmail(demos[role].email);
    setPassword(demos[role].password);
  };

  return (
    <div className="min-h-screen bg-[#f7f3f0] flex flex-col">
      {/* Header */}
      <div className="px-4 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#b5341c] transition-colors">
            <ArrowLeft size={16} />
            Back to home
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#b5341c] flex items-center justify-center text-white text-xs font-bold">A</div>
            <span className="font-semibold text-sm">
              <span className="text-[#1a1a1a]">Affordable</span><span className="text-[#b5341c]">Calabar</span>
            </span>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h1 className="font-playfair text-3xl font-semibold text-[#1a1a1a] mb-2">Welcome back</h1>
              <p className="text-gray-500 text-sm">Sign in to your AffordableCalabar account</p>
            </div>

            {/* Demo Accounts */}
            <div className="mb-6 p-4 bg-[#f7f3f0] rounded-2xl">
              <p className="text-xs text-gray-500 font-medium mb-2 text-center">Quick Demo Login</p>
              <div className="flex gap-2">
                {(['user', 'owner', 'admin'] as const).map(role => (
                  <button
                    key={role}
                    onClick={() => fillDemo(role)}
                    className="flex-1 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:border-[#b5341c] hover:text-[#b5341c] transition-colors bg-white capitalize"
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#b5341c] transition-colors bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#b5341c] transition-colors pr-11 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Link to="/forgot-password" className="text-xs text-[#b5341c] hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#b5341c] text-white font-semibold rounded-full hover:bg-[#8B2615] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : 'Sign in'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#b5341c] font-semibold hover:underline">
                  Create one free
                </Link>
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                Are you a restaurant owner?{' '}
                <Link to="/register?role=owner" className="text-[#b5341c] font-medium hover:underline">
                  List your restaurant →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
