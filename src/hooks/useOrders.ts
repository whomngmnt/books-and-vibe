import { useQuery } from '@tanstack/react-query';
import { orderService } from '../services/orderService';

export function useOrders(userId: string | undefined) {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orders', userId],
    queryFn: () => (userId ? orderService.getOrders(userId) : []),
    enabled: Boolean(userId),
    staleTime: 5 * 60 * 1000,
  });

  return {
    orders: orders ?? [],
    isLoading,
    error,
  };
}
