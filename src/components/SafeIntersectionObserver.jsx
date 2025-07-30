import React, { useState, useEffect, useRef } from 'react';

/**
 * Safe Intersection Observer Component
 * 
 * A safer alternative to react-intersection-observer that handles
 * potential errors and provides fallback behavior.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {Object} props.options - Intersection observer options
 * @param {Function} props.onIntersect - Callback when element intersects
 * @param {boolean} props.triggerOnce - Whether to trigger only once
 * @param {number} props.threshold - Intersection threshold (0-1)
 * @returns {JSX.Element} Component with intersection observer functionality
 */
const SafeIntersectionObserver = ({ 
  children, 
  options = {}, 
  onIntersect = () => {}, 
  triggerOnce = false,
  threshold = 0.1 
}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers without IntersectionObserver support
      setIsInView(true);
      if (onIntersect) onIntersect(true);
      return;
    }

    let observer;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const isIntersecting = entry.isIntersecting;
          
          if (isIntersecting && !hasTriggered) {
            setIsInView(true);
            if (onIntersect) onIntersect(true);
            
            if (triggerOnce) {
              setHasTriggered(true);
              observer.disconnect();
            }
          } else if (!isIntersecting && !triggerOnce) {
            setIsInView(false);
            if (onIntersect) onIntersect(false);
          }
        },
        {
          threshold,
          ...options
        }
      );

      observer.observe(element);
    } catch (error) {
      console.warn('IntersectionObserver failed, using fallback:', error);
      // Fallback behavior
      setIsInView(true);
      if (onIntersect) onIntersect(true);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [options, onIntersect, triggerOnce, threshold, hasTriggered]);

  // If children is a function, call it with the ref and inView state
  if (typeof children === 'function') {
    return children(elementRef, isInView);
  }

  // Otherwise, clone the child and add the ref
  return React.cloneElement(children, { ref: elementRef });
};

export default SafeIntersectionObserver; 