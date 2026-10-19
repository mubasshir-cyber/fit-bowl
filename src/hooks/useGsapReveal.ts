'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealOptions {
  selector?: string;
  y?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
}

export function useGsapReveal<T extends HTMLElement = HTMLDivElement>({
  selector = '[data-reveal]',
  y = 24,
  duration = 0.7,
  stagger = 0.12,
  delay = 0,
  start = 'top 85%',
}: RevealOptions = {}) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const targets = containerRef.current?.querySelectorAll(selector);
      if (!targets || targets.length === 0) return;

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: y,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            once: true,
          },
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [selector, y, duration, stagger, delay, start]);

  return containerRef;
}
