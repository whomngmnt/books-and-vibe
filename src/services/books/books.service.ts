import { supabase } from '../../api/supabase';
import type { Book } from '../../types/Book.ts';

export const booksService = {
  async getBooks(): Promise<Book[]> {
    const { data, error } = await supabase.from('books').select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  async getBookBySlug(slug: string): Promise<Book> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
};
