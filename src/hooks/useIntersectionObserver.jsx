import { useState, useEffect, useRef } from 'react';

function useIntersectionObserver({
  enabled = true,
  threshold = 0.1,
  rootMargin = '0px'
} = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    if (!enabled || !ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold, rootMargin }
    );
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [enabled, threshold, rootMargin]);
  
  return [ref, isIntersecting];
}

export default useIntersectionObserver;