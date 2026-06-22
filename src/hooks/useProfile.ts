import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../services/profileService';
import type { ProfileUpdate } from '../types/User';

export function useProfile(userId: string | undefined) {
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => (userId ? profileService.getProfile(userId) : null),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (updates: ProfileUpdate) => {
      if (!userId) throw new Error('User ID is required');
      return profileService.updateProfile(userId, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: (file: File) => {
      if (!userId) throw new Error('User ID is required');
      return profileService.uploadAvatar(userId, file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });

  return {
    profile: profile || null,
    isLoading,
    error,
    updateProfile: updateProfileMutation.mutateAsync,
    uploadAvatar: uploadAvatarMutation.mutateAsync,
    isUpdating: updateProfileMutation.isPending,
    isUploading: uploadAvatarMutation.isPending,
  };
}
