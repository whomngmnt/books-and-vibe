import { supabase } from '../../api/supabase';

interface AdvisorBook {
  id: string;
  name: string;
  author: string;
  slug: string;
  description: string;
  price: number | null;
}

interface BookAdvisorPayload {
  genre: string;
  lastBook: string;
  books: AdvisorBook[];
  language: string;
}

export const bookAdvisorService = {
  async getRecommendations(payload: BookAdvisorPayload) {
    const { data, error } = await supabase.functions.invoke('book-advisor', {
      body: payload,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
};
