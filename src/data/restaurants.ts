export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Restaurant {
  id: number;
  slug: string;
  name: string;
  category: string;
  categories: string[];
  location: string;
  address: string;
  rating: number;
  reviewCount: number;
  priceMin: number;
  priceMax: number;
  priceRange: 'N' | 'NN' | 'NNN' | 'NNNN';
  isOpen: boolean;
  isClosingSoon: boolean;
  isSponsored: boolean;
  isFeatured: boolean;
  distance: number;
  description: string;
  phone: string;
  whatsapp: string;
  hours: string;
  days: string;
  image: string;
  gallery: string[];
  menuHighlights: MenuItem[];
  reviews: Review[];
  lat: number;
  lng: number;
  hasReservations: boolean;
  hasDelivery: boolean;
  verificationBadge: boolean;
  socialProof: {
    monthlyVisits: number;
    repeatCustomers: number;
    blogFeatures: number;
  };
}

export const CATEGORIES = [
  { id: 'all', label: 'All Spots', emoji: '✨' },
  { id: 'native-food', label: 'Native Food', emoji: '🍲' },
  { id: 'shawarma', label: 'Shawarma', emoji: '🥙' },
  { id: 'lounges', label: 'Lounges', emoji: '🍸' },
  { id: 'rooftop', label: 'Rooftop', emoji: '🏙️' },
  { id: 'student-friendly', label: 'Student-Friendly', emoji: '🎓' },
  { id: 'fast-food', label: 'Fast Food', emoji: '🍔' },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    slug: 'calabar-kitchen',
    name: 'Calabar Kitchen',
    category: 'Native Food',
    categories: ['native-food', 'student-friendly'],
    location: 'Marian Road, Calabar',
    address: '12 Marian Road, Calabar South, Cross River',
    rating: 4.8,
    reviewCount: 312,
    priceMin: 2500,
    priceMax: 5000,
    priceRange: 'NN',
    isOpen: true,
    isClosingSoon: false,
    isSponsored: true,
    isFeatured: true,
    distance: 1.2,
    description: 'Authentic Calabar native food experience. Serving the best Afang, Edikang Ikong, and Ekpang Nkukwo in town. Family-owned since 2010.',
    phone: '+2348012345678',
    whatsapp: '2348012345678',
    hours: '8:00 AM – 9:00 PM',
    days: 'Mon–Sun',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
    ],
    menuHighlights: [
      { id: 1, name: 'Afang Soup + Pounded Yam', price: 3200, description: 'Traditional Efik delicacy' },
      { id: 2, name: 'Edikang Ikong + Garri', price: 2800, description: 'Rich vegetable soup' },
      { id: 3, name: 'Ekpang Nkukwo', price: 2500, description: 'Cocoyam & seafood delight' },
      { id: 4, name: 'Jollof Rice & Plantain', price: 2000, description: 'Party-style jollof' },
    ],
    reviews: [
      { id: 1, author: 'Imaobong E.', rating: 5, comment: 'The afang here is the closest to my grandma\'s. Worth every Naira.', date: '2025-01-15' },
      { id: 2, author: 'Daniel O.', rating: 5, comment: 'Quick service, generous portions. Will come back with friends.', date: '2025-01-12' },
      { id: 3, author: 'Aisha K.', rating: 4, comment: 'Loved the ambience, prices are very fair for the quality.', date: '2025-01-10' },
      { id: 4, author: 'Chinedu A.', rating: 5, comment: 'Best ₦2,500 plate in Calabar. Period.', date: '2025-01-08' },
    ],
    lat: 4.9757,
    lng: 8.3417,
    hasReservations: true,
    hasDelivery: false,
    verificationBadge: true,
    socialProof: { monthlyVisits: 164, repeatCustomers: 66, blogFeatures: 3 },
  },
  {
    id: 2,
    slug: 'basement-lounge',
    name: 'Basement Lounge',
    category: 'Lounges',
    categories: ['lounges'],
    location: 'Diamond Hill, Calabar',
    address: '5 Diamond Hill Road, Calabar Municipality',
    rating: 4.4,
    reviewCount: 164,
    priceMin: 5000,
    priceMax: 25000,
    priceRange: 'NNNN',
    isOpen: false,
    isClosingSoon: false,
    isSponsored: false,
    isFeatured: false,
    distance: 2.1,
    description: 'Premium vibes, affordable entry. Cocktails, low light, weekend DJs.',
    phone: '+2348098765432',
    whatsapp: '2348098765432',
    hours: '7:00 PM – 3:00 AM',
    days: 'Wed–Sun',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80',
      'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80',
    ],
    menuHighlights: [
      { id: 1, name: 'Signature Old Fashioned', price: 3800, description: 'House classic.' },
      { id: 2, name: 'Bottle Service', price: 25000, description: 'Reserve VIP table.' },
      { id: 3, name: 'Cocktail Platter', price: 8500, description: 'Mix of house cocktails' },
    ],
    reviews: [
      { id: 1, author: 'Emeka T.', rating: 5, comment: 'Best lounge in Calabar, the DJ never misses!', date: '2025-01-14' },
      { id: 2, author: 'Grace I.', rating: 4, comment: 'Lovely ambience and great cocktails.', date: '2025-01-11' },
    ],
    lat: 4.9821,
    lng: 8.3512,
    hasReservations: true,
    hasDelivery: false,
    verificationBadge: false,
    socialProof: { monthlyVisits: 164, repeatCustomers: 66, blogFeatures: 3 },
  },
  {
    id: 3,
    slug: 'marina-resort-rooftop',
    name: 'Marina Resort Rooftop',
    category: 'Rooftop',
    categories: ['rooftop', 'lounges'],
    location: 'Marina Resort, Calabar',
    address: 'Marina Resort Road, Calabar',
    rating: 4.9,
    reviewCount: 89,
    priceMin: 8000,
    priceMax: 30000,
    priceRange: 'NNNN',
    isOpen: true,
    isClosingSoon: false,
    isSponsored: false,
    isFeatured: true,
    distance: 3.5,
    description: 'Stunning sunset views over the Cross River estuary. Premium rooftop dining with live music on weekends.',
    phone: '+2348034567890',
    whatsapp: '2348034567890',
    hours: '5:00 PM – 12:00 AM',
    days: 'Tue–Sun',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80',
    ],
    menuHighlights: [
      { id: 1, name: 'Grilled Seafood Platter', price: 15000, description: 'Fresh catch of the day' },
      { id: 2, name: 'Sunset Cocktail', price: 4500, description: 'Signature rooftop drink' },
    ],
    reviews: [
      { id: 1, author: 'Blessing N.', rating: 5, comment: 'The view is absolutely breathtaking!', date: '2025-01-13' },
    ],
    lat: 4.9698,
    lng: 8.3389,
    hasReservations: true,
    hasDelivery: false,
    verificationBadge: true,
    socialProof: { monthlyVisits: 89, repeatCustomers: 42, blogFeatures: 5 },
  },
  {
    id: 4,
    slug: 'freddies-bistro',
    name: "Freddie's Bistro",
    category: 'Fast Food',
    categories: ['fast-food', 'student-friendly'],
    location: 'Satellite Town, Calabar',
    address: '23 Satellite Town Road, Calabar',
    rating: 4.5,
    reviewCount: 203,
    priceMin: 1500,
    priceMax: 3000,
    priceRange: 'NN',
    isOpen: true,
    isClosingSoon: true,
    isSponsored: false,
    isFeatured: false,
    distance: 2.5,
    description: 'Fast, fresh, and affordable. Your go-to spot for quick bites in Calabar.',
    phone: '+2348056789012',
    whatsapp: '2348056789012',
    hours: '7:00 AM – 10:00 PM',
    days: 'Mon–Sat',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    ],
    menuHighlights: [
      { id: 1, name: 'Chicken Burger', price: 1800, description: 'Juicy grilled chicken' },
      { id: 2, name: 'Jollof & Chicken', price: 2000, description: 'Classic Nigerian combo' },
    ],
    reviews: [
      { id: 1, author: 'Favour A.', rating: 4, comment: 'Great value for students, always fresh!', date: '2025-01-10' },
    ],
    lat: 4.9834,
    lng: 8.3601,
    hasReservations: false,
    hasDelivery: true,
    verificationBadge: false,
    socialProof: { monthlyVisits: 312, repeatCustomers: 189, blogFeatures: 1 },
  },
  {
    id: 5,
    slug: 'efik-shawarma-hub',
    name: 'Efik Shawarma Hub',
    category: 'Shawarma',
    categories: ['shawarma', 'fast-food', 'student-friendly'],
    location: 'Marian Market Area, Calabar',
    address: '8 Marian Market Road, Calabar',
    rating: 4.7,
    reviewCount: 445,
    priceMin: 1200,
    priceMax: 2500,
    priceRange: 'N',
    isOpen: true,
    isClosingSoon: false,
    isSponsored: true,
    isFeatured: false,
    distance: 1.0,
    description: 'The #1 shawarma spot in Calabar. Crispy, juicy, and loaded. Made fresh every hour.',
    phone: '+2348078901234',
    whatsapp: '2348078901234',
    hours: '10:00 AM – 11:00 PM',
    days: 'Mon–Sun',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&q=80',
      'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80',
    ],
    menuHighlights: [
      { id: 1, name: 'Mega Chicken Shawarma', price: 2200, description: 'Double wrap, extra sauce' },
      { id: 2, name: 'Beef Shawarma', price: 1800, description: 'Classic fan favorite' },
      { id: 3, name: 'Shawarma + Juice Combo', price: 2500, description: 'Meal deal' },
    ],
    reviews: [
      { id: 1, author: 'Obinna K.', rating: 5, comment: 'Best shawarma in Calabar, no contest!', date: '2025-01-15' },
      { id: 2, author: 'Amaka P.', rating: 5, comment: 'Fresh, hot, and affordable. I come here every week.', date: '2025-01-12' },
    ],
    lat: 4.9756,
    lng: 8.3445,
    hasReservations: false,
    hasDelivery: true,
    verificationBadge: true,
    socialProof: { monthlyVisits: 445, repeatCustomers: 298, blogFeatures: 2 },
  },
  {
    id: 6,
    slug: 'unical-student-canteen',
    name: 'UNICAL Student Canteen',
    category: 'Student-Friendly',
    categories: ['student-friendly', 'native-food', 'fast-food'],
    location: 'UNICAL Campus, Calabar',
    address: 'University of Calabar Campus, Calabar',
    rating: 4.1,
    reviewCount: 678,
    priceMin: 500,
    priceMax: 1500,
    priceRange: 'N',
    isOpen: true,
    isClosingSoon: false,
    isSponsored: false,
    isFeatured: false,
    distance: 4.2,
    description: 'Budget-friendly meals for students. Hot food all day, every day.',
    phone: '+2348091234567',
    whatsapp: '2348091234567',
    hours: '7:00 AM – 8:00 PM',
    days: 'Mon–Fri',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80',
    ],
    menuHighlights: [
      { id: 1, name: 'Rice & Stew', price: 500, description: 'Student special' },
      { id: 2, name: 'Beans & Bread', price: 400, description: 'Daily special' },
    ],
    reviews: [
      { id: 1, author: 'Sunday E.', rating: 4, comment: 'Affordable and filling. Perfect for students.', date: '2025-01-09' },
    ],
    lat: 4.9612,
    lng: 8.3278,
    hasReservations: false,
    hasDelivery: false,
    verificationBadge: false,
    socialProof: { monthlyVisits: 890, repeatCustomers: 567, blogFeatures: 0 },
  },
  {
    id: 7,
    slug: 'palm-wine-garden',
    name: 'Palm Wine Garden',
    category: 'Native Food',
    categories: ['native-food', 'lounges'],
    location: 'Watt Market Area, Calabar',
    address: '4 Watt Market Road, Calabar South',
    rating: 4.6,
    reviewCount: 234,
    priceMin: 800,
    priceMax: 3000,
    priceRange: 'NN',
    isOpen: true,
    isClosingSoon: false,
    isSponsored: false,
    isFeatured: false,
    distance: 1.8,
    description: 'Outdoor garden dining with fresh palm wine, pepper soup, and grilled fish. Calabar culture at its finest.',
    phone: '+2348023456789',
    whatsapp: '2348023456789',
    hours: '12:00 PM – 11:00 PM',
    days: 'Mon–Sun',
    image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80',
    ],
    menuHighlights: [
      { id: 1, name: 'Fresh Palm Wine', price: 800, description: 'Straight from the tap' },
      { id: 2, name: 'Pepper Soup (Cat Fish)', price: 2500, description: 'Spicy local delight' },
    ],
    reviews: [
      { id: 1, author: 'Nsikan U.', rating: 5, comment: 'Authentic Calabar experience. Love this place!', date: '2025-01-11' },
    ],
    lat: 4.9789,
    lng: 8.3356,
    hasReservations: false,
    hasDelivery: false,
    verificationBadge: false,
    socialProof: { monthlyVisits: 234, repeatCustomers: 156, blogFeatures: 1 },
  },
  {
    id: 8,
    slug: 'cross-river-grill',
    name: 'Cross River Grill',
    category: 'Fast Food',
    categories: ['fast-food', 'native-food'],
    location: 'Bogobiri, Calabar',
    address: '15 Bogobiri Street, Calabar Municipality',
    rating: 4.3,
    reviewCount: 156,
    priceMin: 1200,
    priceMax: 4000,
    priceRange: 'NN',
    isOpen: false,
    isClosingSoon: false,
    isSponsored: false,
    isFeatured: false,
    distance: 3.1,
    description: 'Grilled meats and local favorites. Suya, kilishi, and barbecue chicken.',
    phone: '+2348045678901',
    whatsapp: '2348045678901',
    hours: '4:00 PM – 12:00 AM',
    days: 'Tue–Sun',
    image: 'https://images.unsplash.com/photo-1544025162-d76538015a55?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544025162-d76538015a55?w=800&q=80',
    ],
    menuHighlights: [
      { id: 1, name: 'Suya Platter', price: 2500, description: 'Spicy skewered beef' },
      { id: 2, name: 'BBQ Chicken', price: 3500, description: 'Half chicken, grilled' },
    ],
    reviews: [
      { id: 1, author: 'Ekpe M.', rating: 4, comment: 'Great suya! Best I\'ve had since Lagos.', date: '2025-01-08' },
    ],
    lat: 4.9845,
    lng: 8.3523,
    hasReservations: false,
    hasDelivery: false,
    verificationBadge: false,
    socialProof: { monthlyVisits: 156, repeatCustomers: 89, blogFeatures: 0 },
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Imaobong Effiong',
    role: 'Food Blogger, Calabar',
    comment: 'AffordableCalabar helped me discover hidden gems I never knew existed in my own city. The search filters are amazing!',
    rating: 5,
    avatar: 'IE',
  },
  {
    id: 2,
    name: 'Chukwuemeka Obi',
    role: 'UNICAL Student',
    comment: 'As a student, I rely on this app every day. Found amazing spots within my budget. The student-friendly filter is a lifesaver.',
    rating: 5,
    avatar: 'CO',
  },
  {
    id: 3,
    name: 'Amaka Nwankwo',
    role: 'Restaurant Owner, Calabar Kitchen',
    comment: 'My reservations increased by 40% after listing on AffordableCalabar. Best investment for my business!',
    rating: 5,
    avatar: 'AN',
  },
];
