import { supabase } from '../api/supabase';
import type { LoginCredentials, SignupCredentials, User } from '../types/User';

type AuthUser = {
  id: string;
  email?: string | null;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
};

type ProfileRecord = {
  id: string;
  email?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  phone?: string | null;
  address?: string | null;
  favorite_genres?: string[] | null;
};

export const authService = {
  async signInWithPassword(credentials: LoginCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;
    return data;
  },

  async signUpWithPassword(credentials: SignupCredentials) {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: { full_name: credentials.full_name || '' },
        emailRedirectTo: `${window.location.origin}/#/auth/callback`,
      },
    });

    if (error) throw error;

    if (data.user) {
      await this.ensureProfile(data.user);
    }

    return data;
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://arthur-s-children.github.io/nice-book-project/',
      },
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser(): Promise<User | null> {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) return null;

    const profile = await this.ensureProfile(user);
    return this.mapUser(user, profile);
  },

  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        callback(null);
        return;
      }

      if (event !== 'SIGNED_IN' || !session?.user) {
        return;
      }

      const profile = await this.ensureProfile(session.user);
      callback(this.mapUser(session.user, profile));
    });
  },

  async ensureProfile(user: AuthUser): Promise<ProfileRecord | null> {
    const { data: existingProfile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (error) throw error;
    if (existingProfile) return existingProfile as ProfileRecord;

    const fallbackProfile = {
      id: user.id,
      email: user.email || '',
      full_name: user.user_metadata?.full_name || '',
    };

    const { error: insertError } = await supabase
      .from('profiles')
      .insert(fallbackProfile);

    if (insertError) throw insertError;

    return fallbackProfile as ProfileRecord;
  },

  mapUser(authUser: AuthUser, profile: ProfileRecord | null): User {
    return {
      id: authUser.id,
      email: profile?.email || authUser.email || '',
      full_name: profile?.full_name || authUser.user_metadata?.full_name || '',
      avatar_url:
        profile?.avatar_url || authUser.user_metadata?.avatar_url || '',
      phone: profile?.phone || '',
      address: profile?.address || '',
      favorite_genres: profile?.favorite_genres || [],
    };
  },
};
