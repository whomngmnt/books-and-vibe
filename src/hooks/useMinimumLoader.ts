import { useEffect, useState } from 'react';

export const useMinimumLoader = (isLoading: boolean, delay = 1000) => {
  const [showLoader, setShowLoader] = useState(isLoading);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowLoader(isLoading);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isLoading, delay]);

  return isLoading || showLoader;
};
