import { useMutation } from '@tanstack/react-query';

import { bookAdvisorService } from '../services/book-advisor/bookAdvisor.service';

export const useBookAdvisor = () => {
  return useMutation({
    mutationFn: bookAdvisorService.getRecommendations,
  });
};
