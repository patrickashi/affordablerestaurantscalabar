import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'user' | 'owner' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  restaurantId?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: (User & { password: string })[] = [
  { id: 1, name: 'Amaka Okonkwo', email: 'user@demo.com', password: 'password123', role: 'user' },
  { id: 2, name: 'Calabar Kitchen', email: 'owner@demo.com', password: 'password123', role: 'owner', restaurantId: 1 },
  { id: 3, name: 'Admin User', email: 'admin@demo.com', password: 'password123', role: 'admin' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('arc_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('arc_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!found) {
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }
    const { password: _, ...userData } = found;
    setUser(userData);
    localStorage.setItem('arc_user', JSON.stringify(userData));
    setIsLoading(false);
  };

  const register = async (name: string, email: string, _password: string, role: UserRole) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const exists = MOCK_USERS.find(u => u.email === email);
    if (exists) {
      setIsLoading(false);
      throw new Error('An account with this email already exists');
    }
    const newUser: User = { id: Date.now(), name, email, role };
    setUser(newUser);
    localStorage.setItem('arc_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('arc_user');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem('arc_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
