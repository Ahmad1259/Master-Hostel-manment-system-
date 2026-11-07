import { useRef, useCallback } from "react";

export function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delayMs: number = 800
): (...args: Parameters<T>) => void {
  const lastRan = useRef<number>(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastRan.current >= delayMs) {
        callback(...args);
        lastRan.current = now;
      }
    },
    [callback, delayMs]
  );
}
