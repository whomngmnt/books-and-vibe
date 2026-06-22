export type CartItem = {
  productId: string;
  quantity: number;
};

const STORAGE_KEY = 'nice-book-cart';

export const cartService = {
  getAll: (): CartItem[] => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  },

  add: (productId: string) => {
    const items = cartService.getAll();
    const existing = items.find((item) => item.productId === productId);

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ productId, quantity: 1 });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },

  remove: (productId: string) => {
    const items = cartService
      .getAll()
      .filter((item) => item.productId !== productId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },

  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      cartService.remove(productId);
      return;
    }

    const items = cartService.getAll();
    const item = items.find((i) => i.productId === productId);

    if (item) {
      item.quantity = quantity;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  },
};
