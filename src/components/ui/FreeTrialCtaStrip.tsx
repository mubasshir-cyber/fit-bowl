'use client';

import React, { useRef, useEffect } from 'react';
import { ArrowRight, Gift } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { smoothScrollTo } from '@/utils/scroll';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FreeTrialCtaStripProps {
  onClaim?: () => void;
  className?: string;
}

export function FreeTrialCtaStrip({ onClaim, className = '' }: FreeTrialCtaStripProps) {
  const containerRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const highlightBgRef = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        // Reduced motion: make everything visible immediately
        gsap.set(
          [containerRef.current, iconRef.current, textRef.current, buttonRef.current],
          { opacity: 1, y: 0, scale: 1, rotate: 0 }
        );
        if (highlightBgRef.current) gsap.set(highlightBgRef.current, { scaleX: 1 });
        if (underlineRef.current) gsap.set(underlineRef.current, { strokeDashoffset: 0 });
        return;
      }

      // Initial hidden states
      gsap.set(containerRef.current, { opacity: 0, y: 16 });
      gsap.set(iconRef.current, { opacity: 0, scale: 0.6, rotate: -20 });
      gsap.set(textRef.current, { opacity: 0, y: 8 });
      gsap.set(buttonRef.current, { opacity: 0, y: 10 });
      if (highlightBgRef.current) {
        gsap.set(highlightBgRef.current, { scaleX: 0, transformOrigin: 'left center' });
      }
      if (underlineRef.current) {
        gsap.set(underlineRef.current, { strokeDashoffset: 100 });
      }

      // Entrance animation timeline triggered on viewport entry
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 88%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      tl
        // 1. Strip entrance: fade and lift
        .to(containerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.65,
        })
        // 2. Sparkle icon: subtle bounce and rotation
        .to(
          iconRef.current,
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.5,
            ease: 'back.out(1.8)',
          },
          '-=0.45'
        )
        // 3. Text copy opacity and position reveal
        .to(
          textRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
          },
          '-=0.35'
        )
        // 4. Highlight & underline draw on "100% Free Trial"
        .to(
          highlightBgRef.current,
          {
            scaleX: 1,
            duration: 0.4,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        .to(
          underlineRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.45,
            ease: 'power2.inOut',
          },
          '-=0.3'
        )
        // 5. Button upward entrance
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
          },
          '-=0.35'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleClick = () => {
    if (onClaim) {
      onClaim();
      return;
    }
    smoothScrollTo('#trial-form');
  };

  return (
    <aside
      ref={containerRef}
      aria-label="Free Trial Offer"
      className={`relative w-full max-w-4xl mx-auto ${className}`}
      style={{ opacity: 0 }}
    >
      <div className="relative bg-white rounded-2xl sm:rounded-[22px] border border-[#E3D8C4] shadow-[0_4px_24px_rgba(23,63,50,0.06)] px-5 py-4 sm:px-7 sm:py-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 overflow-hidden">
        {/* Subtle warm decorative gradient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FFF7E8]/70 via-white to-[#FFF0E6]/40"
        />

        {/* Left side: Icon + Copy */}
        <div className="relative z-10 flex items-center gap-3 sm:gap-3.5 text-center sm:text-left">
          {/* Free Trial Gift Icon */}
          <div
            ref={iconRef}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FFF0E6] text-[#F47738] flex items-center justify-center shrink-0 border border-[#F47738]/20 shadow-xs"
            aria-hidden="true"
          >
            <Gift className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </div>

          {/* Main Copy */}
          <p
            ref={textRef}
            className="font-heading text-sm sm:text-[15px] lg:text-base font-bold text-[#173F32] leading-snug tracking-tight"
          >
            <span>Can&apos;t decide? Pick any bowl for your </span>
            <span className="relative inline-block px-2 py-0.5 mx-0.5 text-[#D85918] font-black z-0">
              {/* Highlight background pill */}
              <span
                ref={highlightBgRef}
                aria-hidden="true"
                className="absolute inset-0 rounded-md bg-[#F47738]/12 -z-10"
                style={{ transform: 'scaleX(0)' }}
              />
              {/* Subtle curved underline draw */}
              <svg
                aria-hidden="true"
                className="absolute -bottom-1 left-0 w-full overflow-visible pointer-events-none"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  ref={underlineRef}
                  d="M1 5 Q 50 1 99 4"
                  stroke="#F47738"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                />
              </svg>
              100% Free Trial
            </span>
            <span> meal.</span>
          </p>
        </div>

        {/* Right side: Primary CTA Button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={handleClick}
          aria-label="Claim your 100% free trial meal — scroll to booking form"
          className="relative z-10 shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-6.5 sm:py-3.5 rounded-full bg-[#F47738] text-white font-extrabold text-sm tracking-wide shadow-[0_4px_16px_rgba(244,119,56,0.32)] hover:bg-[#E06324] hover:shadow-[0_6px_22px_rgba(244,119,56,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F32] focus-visible:ring-offset-2 transition-all duration-200 cursor-pointer select-none group disabled:opacity-50 disabled:pointer-events-none"
        >
          <span>Claim Free Trial</span>
          <ArrowRight
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </div>
    </aside>
  );
}
