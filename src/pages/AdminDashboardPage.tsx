import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Users, Store, Star, DollarSign, Eye, Check, X, AlertTriangle, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { RESTAURANTS } from '../data/restaurants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

const weeklyData = [
  { day: 'Mon', views: 1200, leads: 45 },
  { day: 'Tue', views: 1450, leads: 62 },
  { day: 'Wed', views: 1100, leads: 38 },
  { day: 'Thu', views: 1800, leads: 89 },
  { day: 'Fri', views: 2200, leads: 124 },
  { day: 'Sat', views: 2800, leads: 178 },
  { day: 'Sun', views: 2400, leads: 145 },
];

const pendingRestaurants = [
  { id: 101, name: 'Marina Grill House', owner: 'Ekpe Marcus', category: 'Native Food', submitted: 'Jan 15, 2025' },
  { id: 102, name: 'Satellite Bites', owner: 'Grace Ita', category: 'Fast Food', submitted: 'Jan 14, 2025' },
  { id: 103, name: 'Diamond Lounge', owner: 'Femi Adeleye', category: 'Lounges', submitted: 'Jan 13, 2025' },
];

export default function AdminDashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [pending, setPending] = useState(pendingRestaurants);

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleApprove = (id: number) => {
    setPending(prev => prev.filter(r => r.id !== id));
  };

  const handleReject = (id: number) => {
    setPending(prev => prev.filter(r => r.id !== id));
  };

  const tabs = ['overview', 'restaurants', 'users', 'reviews', 'ads', 'revenue'];

  const adminStats = [
    { icon: Store, label: 'Total Restaurants', value: '128', change: '+12', positive: true },
    { icon: Users, label: 'Registered Users', value: '5,234', change: '+342', positive: true },
    { icon: Star, label: 'Reviews This Week', value: '89', change: '+23', positive: true },
    { icon: DollarSign, label: 'Monthly Revenue', value: '₦485k', change: '+18%', positive: true },
  ];

  return (
    <div className="min-h-screen pt-16 bg-[#f7f3f0]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-[#b5341c] uppercase tracking-wider mb-1">ADMIN PORTAL</p>
              <h1 className="font-playfair text-2xl sm:text-3xl font-semibold text-[#1a1a1a]">
                AffordableCalabar Admin
              </h1>
            </div>
            <div className="flex items-center gap-2">
              {pending.length > 0 && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-100 rounded-full text-xs font-semibold text-orange-600">
                  <AlertTriangle size={12} />
                  {pending.length} pending approval
                </span>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mt-4 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all capitalize ${
                  activeTab === tab ? 'bg-[#1a1a1a] text-white' : 'text-gray-500 hover:text-[#1a1a1a]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {adminStats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-full bg-[#fdf0ec] flex items-center justify-center">
                  <stat.icon size={16} className="text-[#b5341c]" />
                </div>
                <span className={`text-xs font-semibold ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="font-playfair text-2xl font-bold text-[#1a1a1a]">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Eye size={16} className="text-[#1a1a1a]" />
              <h2 className="font-semibold text-[#1a1a1a]">Weekly Views</h2>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="views" stroke="#b5341c" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-[#1a1a1a]" />
              <h2 className="font-semibold text-[#1a1a1a]">Weekly Leads</h2>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyData} barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="leads" fill="#b5341c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pending Approvals */}
        {pending.length > 0 && (
          <div className="bg-white rounded-2xl p-5 border border-gray-100 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={16} className="text-orange-500" />
              <h2 className="font-semibold text-[#1a1a1a]">Pending Restaurant Approvals</h2>
              <span className="ml-auto text-xs font-medium px-2 py-0.5 bg-orange-50 text-orange-600 rounded-full">
                {pending.length} waiting
              </span>
            </div>
            <div className="space-y-3">
              {pending.map(r => (
                <div key={r.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#f7f3f0] rounded-xl">
                  <div>
                    <p className="font-semibold text-[#1a1a1a] text-sm">{r.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Owner: {r.owner} · {r.category} · Submitted {r.submitted}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(r.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white text-xs font-semibold rounded-full hover:bg-green-600 transition-colors"
                    >
                      <Check size={12} /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(r.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-red-500 text-white text-xs font-semibold rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={12} /> Reject
                    </button>
                    <button className="px-4 py-2 border border-gray-200 text-xs font-medium rounded-full hover:border-gray-300 transition-colors">
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Restaurant Management */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-semibold text-[#1a1a1a]">All Restaurants</h2>
            <span className="text-xs text-gray-500">{RESTAURANTS.length} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-[#f7f3f0] border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Restaurant</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {RESTAURANTS.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={r.image} alt={r.name} className="w-9 h-9 rounded-lg object-cover" />
                        <div>
                          <p className="font-medium text-[#1a1a1a] text-sm">{r.name}</p>
                          <p className="text-xs text-gray-500">{r.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{r.category}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm">
                        <Star size={12} className="fill-[#b5341c] text-[#b5341c]" />
                        <span className="font-medium">{r.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        r.isFeatured ? 'bg-yellow-50 text-yellow-700' :
                        r.isSponsored ? 'bg-[#fdf0ec] text-[#b5341c]' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {r.isFeatured ? 'Featured' : r.isSponsored ? 'Premium' : 'Free'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${r.isOpen ? 'text-green-600' : 'text-red-500'}`}>
                        {r.isOpen ? 'Active' : 'Closed'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-xs text-[#b5341c] hover:underline font-medium">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Premium Subscriptions', count: 34, revenue: '₦408,000', color: 'bg-[#fdf0ec] text-[#b5341c]' },
            { label: 'Featured Listings', count: 8, revenue: '₦280,000', color: 'bg-yellow-50 text-yellow-700' },
            { label: 'Ad Placements', count: 12, revenue: '₦144,000', color: 'bg-blue-50 text-blue-700' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.color}`}>{item.label}</span>
              <p className="font-playfair text-2xl font-bold text-[#1a1a1a] mt-3">{item.revenue}</p>
              <p className="text-xs text-gray-500 mt-1">{item.count} active</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
