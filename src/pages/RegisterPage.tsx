import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';
import { useAuth, UserRole } from '../context/AuthContext';

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const defaultRole = (searchParams.get('role') as UserRole) || 'user';

  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>(defaultRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (!agreed) {
      setError('Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);
    try {
      await register(name, email, password, role);
      if (role === 'owner') navigate('/dashboard');
      else navigate('/');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    {
      id: 'user' as UserRole,
      title: 'Food Explorer',
      description: 'Discover restaurants, leave reviews, make reservations',
      emoji: '🍽️',
    },
    {
      id: 'owner' as UserRole,
      title: 'Restaurant Owner',
      description: 'List and manage your restaurant, reach more customers',
      emoji: '🏪',
    },
  ];

  const getPasswordStrength = () => {
    if (!password) return { label: '', color: '' };
    if (password.length < 6) return { label: 'Too short', color: 'bg-red-400' };
    if (password.length < 8) return { label: 'Weak', color: 'bg-orange-400' };
    if (password.length < 12) return { label: 'Good', color: 'bg-yellow-400' };
    return { label: 'Strong', color: 'bg-green-500' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-[#f7f3f0] flex flex-col">
      {/* Header */}
      <div className="px-4 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link to="/login" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#b5341c] transition-colors">
            <ArrowLeft size={16} />
            Back to login
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#b5341c] flex items-center justify-center text-white text-xs font-bold">A</div>
            <span className="font-semibold text-sm">
              <span className="text-[#1a1a1a]">Affordable</span><span className="text-[#b5341c]">Calabar</span>
            </span>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            {/* Progress */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2].map(s => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step > s ? 'bg-green-500 text-white' : step === s ? 'bg-[#b5341c] text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step > s ? <Check size={12} /> : s}
                  </div>
                  {s < 2 && <div className={`flex-1 h-0.5 w-8 ${step > s ? 'bg-green-500' : 'bg-gray-200'}`} />}
                </div>
              ))}
              <span className="ml-auto text-xs text-gray-400">Step {step} of 2</span>
            </div>

            {step === 1 && (
              <>
                <div className="text-center mb-6">
                  <h1 className="font-playfair text-3xl font-semibold text-[#1a1a1a] mb-2">Join AffordableCalabar</h1>
                  <p className="text-gray-500 text-sm">How will you use the platform?</p>
                </div>

                <div className="space-y-3 mb-6">
                  {roleOptions.map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setRole(opt.id)}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                        role === opt.id
                          ? 'border-[#b5341c] bg-[#fdf5f3]'
                          : 'border-gray-100 hover:border-gray-200 bg-[#f7f3f0]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{opt.emoji}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-[#1a1a1a] text-sm">{opt.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{opt.description}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          role === opt.id ? 'border-[#b5341c] bg-[#b5341c]' : 'border-gray-300'
                        }`}>
                          {role === opt.id && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Free tier info for owners */}
                {role === 'owner' && (
                  <div className="mb-6 p-4 bg-[#f0fdf4] border border-green-100 rounded-2xl">
                    <p className="text-xs font-semibold text-green-700 mb-2">✅ Free Listing Included</p>
                    <ul className="space-y-1">
                      {['Basic profile page', 'Up to 3 photos', 'Map pin on Calabar map', 'Customer reviews'].map(f => (
                        <li key={f} className="flex items-center gap-2 text-xs text-green-700">
                          <Check size={12} /> {f}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-green-600 mt-2 font-medium">Upgrade to Premium anytime for ₦12,000/mo</p>
                  </div>
                )}

                <button
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 bg-[#b5341c] text-white font-semibold rounded-full hover:bg-[#8B2615] transition-colors"
                >
                  Continue →
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="text-center mb-6">
                  <h1 className="font-playfair text-2xl font-semibold text-[#1a1a1a] mb-1">
                    Create your account
                  </h1>
                  <p className="text-gray-500 text-sm">
                    {role === 'owner' ? 'Set up your restaurant owner profile' : 'Join thousands of food lovers'}
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                    ⚠️ {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                      {role === 'owner' ? 'Restaurant / Business Name' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      placeholder={role === 'owner' ? 'e.g. Calabar Kitchen' : 'e.g. Amaka Okonkwo'}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#b5341c] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">Email address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#b5341c] transition-colors"
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
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#b5341c] transition-colors pr-11"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {password && (
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${strength.color}`}
                            style={{ width: password.length < 6 ? '25%' : password.length < 8 ? '50%' : password.length < 12 ? '75%' : '100%' }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{strength.label}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 border rounded-xl text-sm outline-none focus:border-[#b5341c] transition-colors ${
                        confirmPassword && password !== confirmPassword ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">Passwords don't match</p>
                    )}
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <div
                      onClick={() => setAgreed(!agreed)}
                      className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 transition-all ${
                        agreed ? 'bg-[#b5341c] border-[#b5341c]' : 'border-gray-300'
                      }`}
                    >
                      {agreed && <Check size={12} className="text-white" />}
                    </div>
                    <span className="text-xs text-gray-500 leading-relaxed">
                      I agree to the{' '}
                      <Link to="/terms" className="text-[#b5341c] hover:underline">Terms of Service</Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-[#b5341c] hover:underline">Privacy Policy</Link>
                    </span>
                  </label>

                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-3 border border-gray-200 rounded-full text-sm font-medium hover:border-gray-300 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || (!!confirmPassword && password !== confirmPassword)}
                      className="flex-1 py-3 bg-[#b5341c] text-white font-semibold rounded-full hover:bg-[#8B2615] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Creating...
                        </>
                      ) : (
                        role === 'owner' ? 'Create & List Restaurant' : 'Create Account'
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="text-[#b5341c] font-semibold hover:underline">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
