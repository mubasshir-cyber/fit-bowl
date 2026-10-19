'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../ui/Container';
import { PlanCard } from '../ui/PlanCard';
import { SUBSCRIPTION_PLANS } from '@/data/plans';
import { smoothScrollTo } from '@/utils/scroll';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function PricingSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const subtextRef = useRef<HTMLParagraphElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const annotationRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const popularCardRef = useRef<HTMLDivElement | null>(null);
  const popularBadgeRef = useRef<HTMLDivElement | null>(null);
  const foodVisualRef = useRef<HTMLDivElement | null>(null);
  const foodImageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Master Scroll-Triggered Entrance Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });

      // 1. Reveal eyebrow and heading with subtle upward movement & opacity
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
        );
      }

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
          '-=0.3'
        );
      }

      // 2. Fade in supporting text
      if (subtextRef.current) {
        tl.fromTo(
          subtextRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.35'
        );
      }

      // 3. Reveal divider from left to right
      if (dividerRef.current) {
        tl.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.65, ease: 'power2.inOut' },
          '-=0.3'
        );
      }

      // 4. Bring in handwritten annotation with small rotation & fade
      if (annotationRef.current) {
        tl.fromTo(
          annotationRef.current,
          { opacity: 0, y: 14, rotate: -8, scale: 0.93 },
          {
            opacity: 1,
            y: 0,
            rotate: -3,
            scale: 1,
            duration: 0.55,
            ease: 'back.out(1.5)',
          },
          '-=0.35'
        );
      }

      // Small orange arrow next to the header annotation
      if (arrowRef.current) {
        tl.fromTo(
          arrowRef.current,
          { opacity: 0, scale: 0.7, rotate: -4 },
          { opacity: 1, scale: 1, rotate: 6, duration: 0.45, ease: 'power2.out' },
          '-=0.3'
        );
      }

      // 5. Reveal pricing cards in sequence (y: ~32px below, stagger 0.14s)
      const cards = cardsContainerRef.current?.querySelectorAll('[data-plan-card]');
      if (cards && cards.length > 0) {
        tl.fromTo(
          cards,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.14,
            ease: 'power2.out',
            onComplete: () => {
              // Clear inline transform so CSS hover (translateY) isn't overridden
              gsap.set(cards, { clearProps: 'transform' });
            },
          },
          '-=0.2'
        );
      }

      // 6. Regular plan emphasis
      // - Reveal the MOST POPULAR badge with a small upward movement
      if (popularBadgeRef.current) {
        tl.fromTo(
          popularBadgeRef.current,
          { opacity: 0, y: 8, scale: 0.82 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.7)' },
          '-=0.15'
        );
      }

      // - Apply a brief restrained orange accent transition to Regular card border
      if (popularCardRef.current) {
        tl.fromTo(
          popularCardRef.current,
          {
            borderColor: 'rgba(244, 119, 56, 0.4)',
            boxShadow: '0 4px 14px rgba(244, 119, 56, 0.08)',
          },
          {
            borderColor: '#F47738',
            boxShadow: '0 20px 40px -10px rgba(244, 119, 56, 0.32)',
            duration: 0.65,
            ease: 'power2.out',
            clearProps: 'transform',
          },
          '-=0.3'
        );
      }

      // 7. Animation E — Supporting food image reveal (fade & scale gently)
      if (foodVisualRef.current) {
        tl.fromTo(
          foodVisualRef.current,
          { opacity: 0, y: 22, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power2.out' },
          '-=0.45'
        );
      }

      // Subtle scroll-linked parallax for the food image (small motion, no pinning)
      if (foodImageRef.current) {
        gsap.to(foodImageRef.current, {
          y: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleSelectPlan = () => {
    smoothScrollTo('#trial-form');
  };

  return (
    <section
      id="plans"
      ref={sectionRef}
      aria-labelledby="pricing-heading"
      className="pt-6 sm:pt-8 lg:pt-10 pb-16 sm:pb-20 lg:pb-28 relative"
    >
      <Container size="wide">
        {/* Large Forest-Green Surface against warm cream page background */}
        <div className="bg-[#173F32] bg-gradient-to-b from-[#173F32] to-[#123328] rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] p-6 sm:p-10 lg:p-12 xl:p-14 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle green & orange ambient tonal depth */}
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#F47738]/8 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#DCEBCF]/8 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Section Heading & Handwritten Annotation Area */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
            <div>
              <span
                ref={eyebrowRef}
                className="inline-block text-[#DCEBCF] text-[11px] sm:text-xs font-black tracking-widest uppercase mb-1.5"
              >
                FRESH MEALS. FLEXIBLE PLANS.
              </span>
              <h2
                id="pricing-heading"
                ref={headingRef}
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FFF7E8] tracking-tight font-bricolage"
              >
                Choose a Plan
              </h2>
              <p
                ref={subtextRef}
                className="text-sm sm:text-base text-[#DCEBCF] max-w-xl font-medium mt-2 leading-relaxed"
              >
                Fresh meals, flexible plans. Most people go for the{' '}
                <span className="text-[#F47738] font-bold">10-meal plan</span>.
              </p>
            </div>

            {/* Handwritten Script Annotation with Arrow pointing toward cards */}
            <div
              ref={annotationRef}
              className="inline-flex items-center gap-2.5 self-start lg:self-end pb-1"
            >
              <span className="font-script text-2xl sm:text-3xl text-[#FFF7E8] font-bold tracking-wide -rotate-3 select-none">
                Good food Great value!
              </span>
              {/* Restrained curved orange SVG arrow */}
              <svg
                ref={arrowRef}
                className="w-10 h-10 sm:w-12 sm:h-12 text-[#F47738] shrink-0"
                viewBox="0 0 54 44"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 10 C 20 6, 42 12, 38 32"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M28 28 L 38 34 L 42 22"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Thin, low-contrast divider below heading area */}
          <div
            ref={dividerRef}
            className="h-[1px] bg-white/12 my-7 sm:my-9 w-full"
            aria-hidden="true"
          />

          {/* Main Grid: 3 Pricing Cards + Supporting Food Visual on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            {/* 3 Pricing Cards (9 cols on lg, full width on mobile/tablet) */}
            <div
              ref={cardsContainerRef}
              className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch"
            >
              {SUBSCRIPTION_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  data-plan-card
                  ref={plan.isPopular ? popularCardRef : undefined}
                  className="flex flex-col h-full"
                >
                  <PlanCard
                    plan={plan}
                    onSelectPlan={handleSelectPlan}
                    popularBadgeRef={plan.isPopular ? popularBadgeRef : undefined}
                  />
                </div>
              ))}
            </div>

            {/* Desktop Supporting Food Visual beside cards (3 cols on lg) */}
            <div
              ref={foodVisualRef}
              className="hidden lg:flex lg:col-span-3 flex-col items-center justify-center text-center pl-2 xl:pl-4 relative"
            >
              <p className="font-script text-xl xl:text-2xl text-[#FFF7E8] font-bold leading-snug mb-2 -rotate-2 max-w-[210px] select-none">
                Same great taste. Different bowls every week.
              </p>

              {/* Small hand-drawn orange arrow */}
              <svg
                className="w-6 h-6 text-[#F47738] mb-3 opacity-90"
                viewBox="0 0 36 36"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M18 4 C 18 14, 18 20, 18 28"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M12 22 L 18 28 L 24 22"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Food-bowl circular organic crop */}
              <div
                ref={foodImageRef}
                className="relative w-44 h-44 xl:w-56 xl:h-56 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-500 will-change-transform"
              >
                <Image
                  src="/images/hero/hero-bowl.jpg"
                  alt="FitBowl weekly fresh meal bowl"
                  fill
                  sizes="(max-width: 1280px) 180px, 230px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Supporting Visual (below cards, cleanly centered) */}
          <div className="lg:hidden mt-10 pt-8 border-t border-white/10 flex flex-col items-center text-center relative z-10">
            <p className="font-script text-xl sm:text-2xl text-[#FFF7E8] font-bold leading-tight mb-2 -rotate-2">
              Same great taste. Different bowls every week.
            </p>
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-3 border-white/20 shadow-xl overflow-hidden mt-2">
              <Image
                src="/images/hero/hero-bowl.jpg"
                alt="FitBowl weekly fresh meal bowl"
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
