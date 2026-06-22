import { useQuery, useQueryClient } from '@tanstack/react-query';

import { cartService, type CartItem } from '../services/cart/cart.service.ts';

import { cartKeys } from '../services/cart/cart.keys';

export function useCart() {
  const queryClient = useQueryClient();

  const { data: items = [] } = useQuery<CartItem[]>({
    queryKey: cartKeys.all,
    queryFn: cartService.getAll,
    staleTime: Infinity,
  });

  const cartIds = items.map((item) => item.productId);

  const addToCart = (id: string) => {
    cartService.add(id);

    queryClient.setQueryData(cartKeys.all, cartService.getAll());
  };

  const removeFromCart = (id: string) => {
    cartService.remove(id);

    queryClient.setQueryData(cartKeys.all, cartService.getAll());
  };

  const updateQuantity = (id: string, quantity: number) => {
    cartService.updateQuantity(id, quantity);

    queryClient.setQueryData(cartKeys.all, cartService.getAll());
  };

  const clearCart = () => {
    localStorage.removeItem('nice-book-cart');

    queryClient.setQueryData(cartKeys.all, []);
  };

  return {
    items,
    cartIds,
    cartCount: items.length,

    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}
