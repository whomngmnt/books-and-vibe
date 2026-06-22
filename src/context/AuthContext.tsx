import { createContext, useContext, type ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import type { User } from '../types/User';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<unknown>;
  signUp: (
    email: string,
    password: string,
    fullName?: string,
  ) => Promise<unknown>;
  signInWithGoogle: () => Promise<unknown>;
  signOut: () => Promise<void>;
  isSigningIn: boolean;
  isSigningUp: boolean;
  isSigningOut: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  const value: AuthContextType = {
    user: auth.user,
    isLoading: auth.isLoading,
    isAuthenticated: auth.isAuthenticated,
    signIn: (email, password) => auth.signIn({ email, password }),
    signUp: (email, password, fullName) =>
      auth.signUp({ email, password, full_name: fullName }),
    signInWithGoogle: () => auth.signInWithGoogle(),
    signOut: () => auth.signOut(),
    isSigningIn: auth.isSigningIn,
    isSigningUp: auth.isSigningUp,
    isSigningOut: auth.isSigningOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
