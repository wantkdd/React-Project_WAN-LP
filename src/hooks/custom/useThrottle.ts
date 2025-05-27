import { useEffect, useRef, useState } from 'react';

function useThrottle<T>(value: T, delay: number = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);

  const lastExcuted = useRef<number>(Date.now());

  useEffect(() => {
    if (Date.now() >= lastExcuted.current + delay) {
      lastExcuted.current = Date.now();
      setThrottledValue(value);
    } else {
      const timerId = setTimeout(() => {
        lastExcuted.current = Date.now();
        setThrottledValue(value);
      }, delay);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [value, delay]);
  return throttledValue;
}

export default useThrottle;
