import { useEffect, useState } from 'react';

export const useTimeCounter = (
  target: number,
  durationInSeconds = 1,
  start = true,
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) {
      return;
    }

    let frameId: number;
    let startTime: number | null = null;

    const duration = durationInSeconds * 1000;

    const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;

      const progress = Math.min(elapsed / duration, 1);

      setCount(Math.round(target * easeOutQuint(progress)));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [target, durationInSeconds, start]);

  return count;
};
