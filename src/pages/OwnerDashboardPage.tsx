import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Eye, MessageSquare, Users, TrendingUp, Upload, Plus, Edit3, BarChart2, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { RESTAURANTS } from '../data/restaurants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const chartData = [
  { day: 'M', clicks: 42 },
  { day: 'T', clicks: 67 },
  { day: 'W', clicks: 55 },
  { day: 'T', clicks: 89 },
  { day: 'F', clicks: 134 },
  { day: 'S', clicks: 178 },
  { day: 'S', clicks: 145 },
];

const stats = [
  { icon: Eye, label: 'Profile Views', value: '1,248', change: '+14%', positive: true },
  { icon: MessageSquare, label: 'WhatsApp Clicks', value: '342', change: '+22%', positive: true },
  { icon: Users, label: 'Call Leads', value: '98', change: '+9%', positive: true },
  { icon: TrendingUp, label: 'Reservations', value: '56', change: '+31%', positive: true },
];

const menuItems = [
  { name: 'Afang Soup + Pounded Yam', price: 3200 },
  { name: 'Edikang Ikong + Garri', price: 2800 },
  { name: 'Ekpang Nkukwo', price: 2500 },
  { name: 'Jollof Rice & Plantain', price: 2000 },
];

const photos = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=80',
  'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=300&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&q=80',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=300&q=80',
];

export default function OwnerDashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const [chartRange] = useState('Last 7 days');
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState({ name: '', price: '' });
  const [menuList, setMenuList] = useState(menuItems);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: { pathname: '/dashboard' } }} replace />;
  }

  if (user?.role !== 'owner' && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const restaurant = RESTAURANTS.find(r => r.id === (user.restaurantId || 1)) || RESTAURANTS[0];

  const handleAddMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMenuItem.name && newMenuItem.price) {
      setMenuList([...menuList, { name: newMenuItem.name, price: Number(newMenuItem.price) }]);
      setNewMenuItem({ name: '', price: '' });
      setShowAddMenu(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'listing', label: 'My Listing' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'leads', label: 'Leads' },
    { id: 'billing', label: 'Billing' },
  ];

  return (
    <div className="min-h-screen pt-16 bg-[#f7f3f0]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-[#b5341c] uppercase tracking-wider mb-1">OWNER DASHBOARD</p>
            <h1 className="font-playfair text-2xl sm:text-3xl font-semibold text-[#1a1a1a]">
              Welcome back, {restaurant.name}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">Here's how your listing performed this week.</p>
          </div>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#b5341c] text-white font-semibold rounded-full hover:bg-[#8B2615] transition-colors text-sm whitespace-nowrap self-start sm:self-center"
          >
            ✨ Promote Listing
          </Link>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto mt-4 flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#1a1a1a] text-white'
                  : 'text-gray-500 hover:text-[#1a1a1a]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {stats.map((stat, i) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <BarChart2 size={16} className="text-[#1a1a1a]" />
                <h2 className="font-semibold text-[#1a1a1a]">Daily Clicks</h2>
              </div>
              <button className="flex items-center gap-1 text-xs border border-gray-200 px-3 py-1.5 rounded-full">
                {chartRange} <ChevronDown size={12} />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  cursor={{ fill: '#fdf0ec' }}
                />
                <Bar dataKey="clicks" fill="#b5341c" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Current Plan */}
          <div className="bg-[#1a1a1a] rounded-2xl p-5 text-white">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">CURRENT PLAN</p>
            <h2 className="font-playfair text-3xl font-bold text-white mb-1">Premium</h2>
            <p className="text-xs text-gray-400 mb-5">Renews March 12, 2026</p>
            <ul className="space-y-2 mb-6">
              {[
                'Featured in category pages',
                'Unlimited photos',
                'WhatsApp + reservations',
                'Performance analytics',
              ].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-green-400">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link
              to="/pricing"
              className="block w-full py-3 bg-[#b5341c] text-white text-sm font-semibold rounded-full text-center hover:bg-[#8B2615] transition-colors"
            >
              Upgrade to Featured
            </Link>
          </div>
        </div>

        {/* Photos & Menu */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {/* Photos */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">📷</span>
                <h2 className="font-semibold text-[#1a1a1a]">Photos</h2>
              </div>
              <button className="flex items-center gap-1 text-sm font-medium text-[#b5341c] hover:underline">
                <Upload size={13} /> Upload
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {photos.map((photo, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
                  <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Edit3 size={14} className="text-white" />
                  </div>
                </div>
              ))}
              <button className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center hover:border-[#b5341c] transition-colors">
                <Plus size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Menu */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">✏️</span>
                <h2 className="font-semibold text-[#1a1a1a]">Menu</h2>
              </div>
              <button
                onClick={() => setShowAddMenu(true)}
                className="flex items-center gap-1 text-sm font-medium text-[#b5341c] hover:underline"
              >
                <Plus size={13} /> Item
              </button>
            </div>

            {showAddMenu && (
              <form onSubmit={handleAddMenuItem} className="mb-4 p-3 bg-[#f7f3f0] rounded-xl">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Item name"
                    value={newMenuItem.name}
                    onChange={e => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#b5341c]"
                    required
                  />
                  <input
                    type="number"
                    placeholder="₦ Price"
                    value={newMenuItem.price}
                    onChange={e => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                    className="w-24 px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#b5341c]"
                    required
                  />
                  <button type="submit" className="px-3 py-2 bg-[#b5341c] text-white text-sm rounded-lg">Add</button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {menuList.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-[#1a1a1a]">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#b5341c]">₦{item.price.toLocaleString()}</span>
                    <button className="text-gray-400 hover:text-[#b5341c] transition-colors">
                      <Edit3 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="mt-4 bg-white rounded-2xl p-5 border border-gray-100">
          <h2 className="font-semibold text-[#1a1a1a] mb-4">Recent Customer Leads</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact</th>
                  <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { type: 'Reservation', name: 'Amaka Osei', contact: '08012345678', date: 'Jan 15', status: 'Pending' },
                  { type: 'WhatsApp', name: 'Emeka Tunde', contact: 'via WhatsApp', date: 'Jan 14', status: 'Contacted' },
                  { type: 'Call', name: 'Blessing Nwosu', contact: '08087654321', date: 'Jan 14', status: 'Done' },
                  { type: 'Reservation', name: 'Chidi Okafor', contact: '09011223344', date: 'Jan 13', status: 'Confirmed' },
                ].map((lead, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 text-sm">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        lead.type === 'Reservation' ? 'bg-[#fdf0ec] text-[#b5341c]' :
                        lead.type === 'WhatsApp' ? 'bg-green-50 text-green-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {lead.type}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-[#1a1a1a] font-medium">{lead.name}</td>
                    <td className="py-3 text-sm text-gray-500">{lead.contact}</td>
                    <td className="py-3 text-sm text-gray-500">{lead.date}</td>
                    <td className="py-3">
                      <span className={`text-xs font-medium ${
                        lead.status === 'Pending' ? 'text-orange-600' :
                        lead.status === 'Confirmed' ? 'text-green-600' :
                        lead.status === 'Done' ? 'text-blue-600' :
                        'text-gray-600'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
