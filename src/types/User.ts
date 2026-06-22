export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  address?: string;
  favorite_genres?: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  full_name?: string;
}

export interface ProfileUpdate {
  full_name?: string;
  phone?: string;
  address?: string;
  avatar_url?: string;
  favorite_genres?: string[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  book_id: string;
  book_slug: string;
  book_name: string;
  book_author: string;
  book_image: string;
  quantity: number;
  price: number;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total_price: number;
  shipping_address?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}
