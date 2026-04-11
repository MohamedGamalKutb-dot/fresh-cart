"use client";

import { useEffect, useState, useRef } from "react";

export function useAdBannersLogic() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set visibility based on whether it is in view or not
        // This allows the animation to re-trigger every time the user scrolls to it
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return {
    isVisible,
    containerRef
  };
}
