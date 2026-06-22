import { useQuery } from '@tanstack/react-query';
import { supabase } from '../api/supabase';

interface DeliveryItem {
  ref: string;
  name: string;
}

export function useSupabaseDeliveryCities(search: string) {
  const cleanSearch = search.trim();

  return useQuery<DeliveryItem[]>({
    queryKey: ['supabase-delivery-cities', cleanSearch],
    queryFn: async () => {
      if (cleanSearch.length < 2) return [];

      const { data, error } = await supabase.functions.invoke('nova-poshta', {
        body: { action: 'getCities', search: cleanSearch },
      });

      if (error) {
        console.error('Edge Function Error (Cities):', error);
        throw new Error(error.message);
      }

      return data || [];
    },

    enabled: cleanSearch.length >= 2,

    staleTime: 1000 * 60 * 5,
  });
}

export function useSupabaseDeliveryWarehouses(
  cityRef: string,
  type: 'warehouse' | 'postomat',
) {
  return useQuery<DeliveryItem[]>({
    queryKey: ['supabase-delivery-warehouses', cityRef, type],
    queryFn: async () => {
      if (!cityRef) return [];

      const { data, error } = await supabase.functions.invoke('nova-poshta', {
        body: { action: 'getWarehouses', cityRef, type },
      });

      if (error) {
        console.error('Edge Function Error (Warehouses):', error);
        throw new Error(error.message);
      }

      return data || [];
    },

    enabled: Boolean(cityRef),

    staleTime: 1000 * 60 * 10,
  });
}
