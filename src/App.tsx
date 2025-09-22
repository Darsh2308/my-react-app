import React, { createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';
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
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Function to determine user role
const getUserRole = (email: string): 'super_admin' | 'admin' | 'editor' => {
  if (email.includes('admin') || email === 'admin@example.com') {
    return 'super_admin';
  }
  if (email.includes('manager')) {
    return 'admin';
  }
  return 'editor';
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerkAuth();

  // Transform Clerk user to our User interface
  const user: User | null = React.useMemo(() => {
    if (!isLoaded || !clerkUser) return null;
    
    return {
      id: clerkUser.id,
      name: clerkUser.fullName || clerkUser.firstName || 'User',
      email: clerkUser.primaryEmailAddress?.emailAddress || '',
      role: getUserRole(clerkUser.primaryEmailAddress?.emailAddress || ''),
    };
  }, [clerkUser, isLoaded]);

  const logout = async () => {
    await signOut();
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
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

function AppContent() {
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

export default function App() {
  // Get Clerk publishable key from environment
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!clerkPubKey || clerkPubKey === 'pk_test_your_clerk_publishable_key_here') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Configuration Error</h1>
          <p className="text-muted-foreground">
            Please set up your Clerk publishable key in the environment variables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <AppContent />
    </ClerkProvider>
  );
}