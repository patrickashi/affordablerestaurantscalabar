import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, MapPin, Camera, Menu, BarChart2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const steps = [
  { id: 1, title: 'Basic Info', desc: 'Restaurant name, category, location' },
  { id: 2, title: 'Details', desc: 'Hours, description, contact' },
  { id: 3, title: 'Photos', desc: 'Upload up to 3 photos (free tier)' },
  { id: 4, title: 'Review', desc: 'Check and submit' },
];

const categories = ['Native Food', 'Shawarma', 'Lounges', 'Rooftop', 'Student-Friendly', 'Fast Food', 'Cafeteria', 'Bakery', 'Seafood'];
const priceRanges = [
  { id: 'N', label: '₦ Budget (Under ₦2,000)' },
  { id: 'NN', label: '₦₦ Moderate (₦2,000–₦5,000)' },
  { id: 'NNN', label: '₦₦₦ Mid-range (₦5,000–₦15,000)' },
  { id: 'NNNN', label: '₦₦₦₦ Premium (₦15,000+)' },
];

export default function ListYourSpotPage() {
  const { isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: '',
    category: '',
    priceRange: '',
    address: '',
    phone: '',
    whatsapp: '',
    description: '',
    openDays: '',
    openTime: '',
    closeTime: '',
    hasReservations: false,
    hasDelivery: false,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 bg-[#f7f3f0] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 border border-gray-100">
          <div className="text-4xl mb-4">🏪</div>
          <h1 className="font-playfair text-2xl font-semibold text-[#1a1a1a] mb-2">List Your Restaurant</h1>
          <p className="text-gray-500 text-sm mb-6">
            Create a free account to list your restaurant and reach thousands of hungry customers in Calabar.
          </p>
          <div className="space-y-3">
            <Link
              to="/register?role=owner"
              className="block w-full py-3.5 bg-[#b5341c] text-white font-semibold rounded-full text-center hover:bg-[#8B2615] transition-colors"
            >
              Create Free Owner Account
            </Link>
            <Link
              to="/login"
              className="block w-full py-3.5 border border-gray-200 text-[#1a1a1a] font-semibold rounded-full text-center hover:border-gray-300 transition-colors"
            >
              Sign in to existing account
            </Link>
          </div>
          <div className="mt-6 p-4 bg-[#f7f3f0] rounded-2xl text-left">
            <p className="text-xs font-semibold text-[#1a1a1a] mb-2">Free listing includes:</p>
            {['Basic profile page', 'Up to 3 photos', 'Map pin', 'Customer reviews'].map(f => (
              <div key={f} className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                <Check size={12} className="text-green-500" /> {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 bg-[#f7f3f0] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-white rounded-3xl p-10 border border-gray-100">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-500" />
          </div>
          <h1 className="font-playfair text-2xl font-semibold text-[#1a1a1a] mb-2">Listing Submitted!</h1>
          <p className="text-gray-500 text-sm mb-6">
            Your restaurant <strong>{form.name}</strong> has been submitted for review. We'll approve it within 24 hours.
          </p>
          <div className="space-y-3">
            <Link
              to="/dashboard"
              className="block w-full py-3 bg-[#b5341c] text-white font-semibold rounded-full hover:bg-[#8B2615] transition-colors text-sm"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/pricing"
              className="block w-full py-3 border border-gray-200 text-[#1a1a1a] font-semibold rounded-full text-sm hover:border-[#b5341c] transition-colors"
            >
              Upgrade to Premium →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(s => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(s => s - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-20 bg-[#f7f3f0]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair text-3xl sm:text-4xl font-semibold text-[#1a1a1a] mb-2">
            List Your Restaurant
          </h1>
          <p className="text-gray-500 text-sm">
            Start with a <span className="text-[#b5341c] font-semibold">free listing</span> — no credit card needed.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { icon: MapPin, label: 'Map Pin' },
            { icon: Camera, label: '3 Free Photos' },
            { icon: Menu, label: 'Menu Display' },
            { icon: BarChart2, label: 'Basic Analytics' },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-2xl p-3 text-center border border-gray-100">
              <item.icon size={20} className="text-[#b5341c] mx-auto mb-1" />
              <p className="text-xs font-medium text-[#1a1a1a]">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Step indicator */}
        <div className="flex items-center mb-6">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentStep > step.id ? 'bg-green-500 text-white' :
                  currentStep === step.id ? 'bg-[#b5341c] text-white' :
                  'bg-gray-200 text-gray-400'
                }`}>
                  {currentStep > step.id ? <Check size={12} /> : step.id}
                </div>
                <span className="text-xs text-gray-500 mt-1 hidden sm:block text-center max-w-16">{step.title}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 transition-all ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-[#1a1a1a] mb-1">{steps[currentStep - 1].title}</h2>
          <p className="text-xs text-gray-500 mb-5">{steps[currentStep - 1].desc}</p>

          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">Restaurant Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Calabar Kitchen"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#b5341c]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">Category *</label>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setForm({ ...form, category: cat })}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                        form.category === cat ? 'bg-[#b5341c] text-white border-[#b5341c]' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">Price Range *</label>
                <div className="space-y-2">
                  {priceRanges.map(pr => (
                    <button
                      key={pr.id}
                      type="button"
                      onClick={() => setForm({ ...form, priceRange: pr.id })}
                      className={`w-full py-2.5 px-4 rounded-xl text-sm text-left border transition-all ${
                        form.priceRange === pr.id ? 'bg-[#fdf0ec] border-[#b5341c] text-[#b5341c] font-medium' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {pr.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">Address *</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  placeholder="e.g. 12 Marian Road, Calabar South"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#b5341c]"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe your restaurant, specialties, and what makes it unique..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#b5341c] resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="+234 800 000 0000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#b5341c]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">WhatsApp Number</label>
                <input
                  type="tel"
                  value={form.whatsapp}
                  onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                  placeholder="+234 800 000 0000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#b5341c]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">Opening Time</label>
                  <input
                    type="time"
                    value={form.openTime}
                    onChange={e => setForm({ ...form, openTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#b5341c]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">Closing Time</label>
                  <input
                    type="time"
                    value={form.closeTime}
                    onChange={e => setForm({ ...form, closeTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#b5341c]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Services Offered</label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.hasReservations}
                      onChange={e => setForm({ ...form, hasReservations: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-600">Table Reservations</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.hasDelivery}
                      onChange={e => setForm({ ...form, hasDelivery: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-600">Delivery</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="p-4 bg-[#f7f3f0] rounded-2xl mb-2">
                <p className="text-sm font-medium text-[#1a1a1a] mb-1">Free tier: Up to 3 photos</p>
                <p className="text-xs text-gray-500">Upgrade to Premium for unlimited photos</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-[#b5341c] transition-colors flex flex-col items-center justify-center cursor-pointer bg-[#f7f3f0]">
                    <Camera size={24} className="text-gray-400 mb-1" />
                    <span className="text-xs text-gray-400">Photo {i}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center">Click to upload photos from your device</p>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="bg-[#f7f3f0] rounded-2xl p-4">
                <h3 className="font-semibold text-[#1a1a1a] mb-3">Listing Preview</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name</span>
                    <span className="font-medium">{form.name || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category</span>
                    <span className="font-medium">{form.category || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price Range</span>
                    <span className="font-medium">{form.priceRange || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Address</span>
                    <span className="font-medium text-right max-w-40 truncate">{form.address || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone</span>
                    <span className="font-medium">{form.phone || 'Not set'}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 border border-green-100 rounded-2xl">
                <p className="text-sm font-semibold text-green-700 mb-1">✅ Free Listing</p>
                <p className="text-xs text-green-600">
                  Your listing will be reviewed and approved within 24 hours. Upgrade to Premium for more features.
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-3 border border-gray-200 rounded-full text-sm font-medium hover:border-gray-300 transition-colors"
              >
                Back
              </button>
            )}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 py-3 bg-[#b5341c] text-white font-semibold rounded-full hover:bg-[#8B2615] transition-colors flex items-center justify-center gap-2 text-sm"
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 py-3 bg-[#b5341c] text-white font-semibold rounded-full hover:bg-[#8B2615] transition-colors text-sm"
              >
                Submit Listing →
              </button>
            )}
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="mt-6 p-5 bg-[#1a1a1a] rounded-2xl text-white text-center">
          <p className="font-semibold mb-1">Want more visibility?</p>
          <p className="text-sm text-gray-400 mb-3">Upgrade to Premium for WhatsApp leads, unlimited photos, and analytics.</p>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-1 px-5 py-2.5 bg-[#b5341c] text-white text-sm font-semibold rounded-full hover:bg-[#8B2615] transition-colors"
          >
            See plans <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
