import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import PagesManagement from './components/pages/PagesManagement';
import PageEditor from './components/pages/PageEditor';
import FormsManagement from './components/forms/FormsManagement';
import ContentManagement from './components/content/ContentManagement';
import UserManagement from './components/users/UserManagement';
import SitesManagement from './components/sites/SitesManagement';
import Settings from './components/settings/Settings';
import Layout from './components/layout/Layout';

// Auth Context
interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock authentication
    if (email === 'admin@example.com' && password === 'password') {
      setUser({
        id: '1',
        name: 'John Admin',
        email: 'admin@example.com',
        role: 'super_admin'
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/pages" element={<PagesManagement />} />
                      <Route path="/pages/edit/:id" element={<PageEditor />} />
                      <Route path="/pages/homepage" element={<PageEditor />} />
                      <Route path="/forms" element={<FormsManagement />} />
                      <Route path="/content/*" element={<ContentManagement />} />
                      <Route path="/users" element={<UserManagement />} />
                      <Route path="/sites" element={<SitesManagement />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}