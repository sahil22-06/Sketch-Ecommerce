import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for safe window size detection
 * Provides window dimensions with fallback for SSR
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

/**
 * Custom hook for safe intersection observer usage
 * Replaces react-intersection-observer with a more stable implementation
 * @param {Object} options - Options for intersection observer
 * @returns {Array} [ref, inView] - Same interface as useInView but more stable
 */
export const useSafeInView = (options = {}) => {
  const [inView, setInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers without IntersectionObserver support
      setInView(true);
      return;
    }

    let observer;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const isIntersecting = entry.isIntersecting;
          
          if (isIntersecting && (!options.triggerOnce || !hasTriggered)) {
            setInView(true);
            
            if (options.triggerOnce) {
              setHasTriggered(true);
              observer.disconnect();
            }
          } else if (!isIntersecting && !options.triggerOnce) {
            setInView(false);
          }
        },
        {
          threshold: options.threshold || 0.1,
          root: options.root || null,
          rootMargin: options.rootMargin || '0px',
        }
      );

      observer.observe(element);
    } catch (error) {
      console.warn('IntersectionObserver failed, using fallback:', error);
      // Fallback behavior - assume element is in view
      setInView(true);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [options.threshold, options.triggerOnce, options.root, options.rootMargin, hasTriggered]);

  return [ref, inView];
}; 