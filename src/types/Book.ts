export type BookType = 'kindle' | 'paperback' | 'audiobook';

export type BookLanguage = 'en' | 'uk';

export interface Book {
  id: string;

  type: BookType;

  namespace_id: string;

  name: string;
  slug: string;
  author: string;

  lang: BookLanguage;

  lang_available: BookLanguage[];

  category: string[];
  images: string[];

  price_regular: number;
  price_discount: number | null;

  publication_year: number;

  publication: string;

  description: string;

  cover_type: string | null;
  number_of_pages: number | null;
  format: string | null;
  illustrations: boolean | null;

  narrator: string | null;
  listening_length: number | null;

  created_at: string;
  updated_at: string;
}
