import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { authService } from '../services/authService';
import type { LoginCredentials, SignupCredentials } from '../types/User';

export function useAuth() {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.getCurrentUser(),
    staleTime: Infinity,
  });

  const invalidateUser = () => {
    void queryClient.invalidateQueries({ queryKey: ['currentUser'] });
  };

  const signInMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authService.signInWithPassword(credentials),
    onSuccess: invalidateUser,
  });

  const signUpMutation = useMutation({
    mutationFn: (credentials: SignupCredentials) =>
      authService.signUpWithPassword(credentials),
    onSuccess: invalidateUser,
  });

  const signInWithGoogleMutation = useMutation({
    mutationFn: () => authService.signInWithGoogle(),
  });

  const signOutMutation = useMutation({
    mutationFn: () => authService.signOut(),
    onSuccess: () => {
      invalidateUser();
      queryClient.clear();
    },
  });

  useEffect(() => {
    const {
      data: { subscription },
    } = authService.onAuthStateChange((nextUser) => {
      queryClient.setQueryData(['currentUser'], nextUser);
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  return {
    user: user ?? null,
    isLoading,
    isAuthenticated: Boolean(user?.id),
    error,
    signIn: signInMutation.mutateAsync,
    signUp: signUpMutation.mutateAsync,
    signInWithGoogle: signInWithGoogleMutation.mutateAsync,
    signOut: signOutMutation.mutateAsync,
    isSigningIn: signInMutation.isPending,
    isSigningUp: signUpMutation.isPending,
    isSigningOut: signOutMutation.isPending,
  };
}
