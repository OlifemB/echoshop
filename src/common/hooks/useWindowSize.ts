'use client'

import { useState,useEffect,useMemo } from "react";

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize(): { width: number | undefined; height: number | undefined; isMobile: boolean } {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize(); // Set initial size
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const isMobile = useMemo(() => {
    return windowSize.width ? windowSize.width < 1024 : false; // Assuming 1024px as the breakpoint for 'lg'
  }, [windowSize.width]);

  return { ...windowSize, isMobile };
}