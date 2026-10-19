'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../ui/Container';
import { HeroMarquee } from './HeroMarquee';
import { smoothScrollTo } from '@/utils/scroll';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TRUST_POINTS = [
  'One meal free — no card needed.',
  'Freshly prepared every day.',
  'Delivered to your home or office.',
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLDivElement>(null);
  const headlineLine2Ref = useRef<HTMLDivElement>(null);
  const tasteWordRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const primaryCtaRef = useRef<HTMLButtonElement>(null);
  const trustRef = useRef<HTMLUListElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageSrcRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    smoothScrollTo(id);
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      // --- Set everything invisible at start ---
      const allTargets = [
        eyebrowRef.current,
        headlineLine1Ref.current,
        headlineLine2Ref.current,
        subtitleRef.current,
        primaryCtaRef.current,
        imageWrapRef.current,
        badgeRef.current,
      ].filter(Boolean);

      const trustItems = trustRef.current
        ? Array.from(trustRef.current.querySelectorAll('[data-trust-item]'))
        : [];

      if (prefersReduced) {
        // Reduced motion: just ensure everything is visible immediately
        gsap.set([...allTargets, ...trustItems], { opacity: 1, y: 0, scale: 1, clipPath: 'none' });
        return;
      }

      // Initial hidden states
      gsap.set(eyebrowRef.current, { opacity: 0, y: 14 });
      gsap.set(headlineLine1Ref.current, { clipPath: 'inset(0 0 100% 0)', y: 8 });
      gsap.set(headlineLine2Ref.current, { clipPath: 'inset(0 0 100% 0)', y: 8 });
      gsap.set(tasteWordRef.current, { opacity: 0.4 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 12 });
      gsap.set(primaryCtaRef.current, { opacity: 0, y: 10 });
      gsap.set(trustItems, { opacity: 0, y: 10 });
      gsap.set(imageWrapRef.current, { opacity: 0, scale: 0.94, y: 20 });
      gsap.set(badgeRef.current, { opacity: 0, y: 12, scale: 0.96 });

      // --- Master entrance timeline ---
      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: 'power3.out' } });

      // 1. Eyebrow pill
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.45 });

      // 2. Headline line 1 clip-path reveal
      tl.to(
        headlineLine1Ref.current,
        { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.55 },
        '-=0.15'
      );

      // 3. Headline line 2 (slightly staggered)
      tl.to(
        headlineLine2Ref.current,
        { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.55 },
        '-=0.38'
      );

      // 4. Orange "taste" emphasis — delayed pop after line 2 lands
      tl.to(tasteWordRef.current, { opacity: 1, duration: 0.3 }, '-=0.1');

      // 5. Food image entrance
      tl.to(
        imageWrapRef.current,
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.6'
      );

      // 6. Supporting badge
      tl.to(badgeRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.4 }, '-=0.3');

      // 7. Subtitle
      tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.45 }, '-=0.35');

      // 8. Primary CTA
      tl.to(primaryCtaRef.current, { opacity: 1, y: 0, duration: 0.4 }, '-=0.25');

      // 9. Trust points stagger
      tl.to(trustItems, { opacity: 1, y: 0, duration: 0.38, stagger: 0.1 }, '-=0.15');

      // --- Scroll-linked parallax for food image (subtle) ---
      if (imageSrcRef.current && sectionRef.current) {
        gsap.to(imageSrcRef.current, {
          yPercent: -7,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.4,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="FitBowl Hero — Healthy Meal Subscription Mumbai"
      className="relative min-h-screen flex items-center pt-20 sm:pt-24 lg:pt-0 pb-12 sm:pb-16 lg:pb-0 overflow-hidden bg-[#FFF7E8]"
    >
      <HeroMarquee targetRef={imageSrcRef} />

      {/* ── Background organic shapes ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Large cream-green wash — top left */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#DCEBCF]/35 blur-[90px]" />
        {/* Warm orange accent — right */}
        <div className="absolute top-1/4 right-0 translate-x-1/3 w-[520px] h-[520px] rounded-full bg-[#F47738]/8 blur-[80px]" />
        {/* Tiny lower-left leaf wash */}
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-[#DCEBCF]/25 blur-[60px]" />
      </div>

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] lg:gap-0 items-center min-h-[calc(100vh-80px)] lg:min-h-screen">

          {/* ─────────── LEFT COLUMN ─────────── */}
          <div className="flex flex-col items-start justify-center py-12 lg:py-20 lg:pr-12 xl:pr-20 max-w-2xl lg:max-w-none">

            {/* Eyebrow */}
            <div ref={eyebrowRef} style={{ opacity: 0 }}>
              <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-extrabold text-[#173F32] bg-[#DCEBCF] px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F47738] animate-pulse" />
                Fresh Bowls · Mumbai
              </span>
            </div>

            {/* Headline — two lines for clip-path reveal */}
            <h1 className="mt-5 sm:mt-6 font-black text-[#173F32] leading-[1.05] tracking-tight" aria-label="Healthy doesn't have to taste healthy.">
              {/* Line 1 */}
              <div
                ref={headlineLine1Ref}
                className="block overflow-hidden"
                style={{ clipPath: 'inset(0 0 100% 0)' }}
              >
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px]">
                  Healthy doesn&apos;t have to
                </span>
              </div>

              {/* Line 2 — includes orange "taste" */}
              <div
                ref={headlineLine2Ref}
                className="block overflow-hidden"
                style={{ clipPath: 'inset(0 0 100% 0)' }}
              >
                <span className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4 text-4xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px]">
                  <span
                    ref={tasteWordRef}
                    className="relative inline-block text-[#F47738]"
                    style={{ opacity: 0.4 }}
                  >
                    taste
                    {/* Animated underline drawn in SVG */}
                    <svg
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 w-full overflow-visible"
                      viewBox="0 0 100 10"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <path
                        d="M1 7 Q25 2 50 6 Q75 10 99 5"
                        stroke="#F47738"
                        strokeOpacity="0.35"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span className="text-[#173F32]">healthy.</span>
                </span>
              </div>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-[#334A40] font-medium leading-relaxed max-w-lg"
              style={{ opacity: 0 }}
            >
              Delicious, freshly prepared bowls delivered to your home or office.
            </p>

            {/* Primary CTA */}
            <div className="mt-7 sm:mt-8 flex items-center">
              <button
                ref={primaryCtaRef}
                type="button"
                onClick={() => scrollTo('#trial-form')}
                aria-label="Claim your free trial meal — scroll to booking form"
                className="group inline-flex items-center justify-center gap-2.5 bg-[#F47738] text-white font-extrabold text-sm sm:text-base px-7 py-3.5 sm:px-8 sm:py-4 rounded-full shadow-[0_6px_24px_rgba(244,119,56,0.38)] hover:bg-[#E06324] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(244,119,56,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47738] focus-visible:ring-offset-2 active:scale-[0.98] transition-all duration-200 cursor-pointer select-none"
                style={{ opacity: 0 }}
              >
                <span>Claim Your Free Trial Meal</span>
                <ArrowRight
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Trust points */}
            <ul
              ref={trustRef}
              className="mt-6 sm:mt-7 flex flex-col gap-2"
              aria-label="Why FitBowl"
            >
              {TRUST_POINTS.map((point, i) => (
                <li
                  key={i}
                  data-trust-item
                  className="flex items-center gap-2.5 text-sm text-[#334A40] font-medium"
                  style={{ opacity: 0 }}
                >
                  <CheckCircle
                    className="w-4 h-4 text-[#173F32] shrink-0"
                    aria-hidden="true"
                    strokeWidth={2.2}
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* ─────────── RIGHT COLUMN — food image ─────────── */}
          <div
            ref={imageWrapRef}
            className="relative flex justify-center items-center lg:justify-end py-8 lg:py-16 lg:pl-6"
            style={{ opacity: 0, scale: 0.94 }}
          >
            {/* Glow backdrop */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div className="w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] lg:w-[520px] lg:h-[520px] xl:w-[580px] xl:h-[580px] rounded-full bg-gradient-to-br from-[#DCEBCF]/70 via-[#FFF0DC]/50 to-transparent blur-[50px]" />
            </div>

            {/* Parallax-linked image container */}
            <div
              ref={imageSrcRef}
              className="relative z-10"
            >
              {/* Main image */}
              <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[430px] md:h-[430px] lg:w-[480px] lg:h-[480px] xl:w-[540px] xl:h-[540px]">
                {/* Outer botanical ring — SVG clip decoration */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 sm:-inset-5 rounded-full border border-[#DCEBCF]/60 pointer-events-none z-0"
                />
                <div
                  aria-hidden="true"
                  className="absolute -inset-8 sm:-inset-10 rounded-full border border-[#DCEBCF]/30 pointer-events-none z-0"
                />

                {/* Photo */}
                <Image
                  src="/images/hero/hero-bowl.jpg"
                  alt="FitBowl — Gourmet healthy meal bowl with grilled paneer, avocado, chickpeas, cherry tomatoes, fresh greens, and brown rice"
                  fill
                  priority
                  sizes="(max-width: 640px) 300px, (max-width: 768px) 380px, (max-width: 1024px) 430px, (max-width: 1280px) 480px, 540px"
                  className="object-cover rounded-full shadow-[0_24px_80px_rgba(23,63,50,0.18)] ring-[5px] ring-white"
                />

                {/* Ingredient dots — decorative botanical sprigs around the image */}
                <BotanicalSprig position="topLeft" />
                <BotanicalSprig position="bottomRight" />

                {/* "Real ingredients. Real flavours." badge */}
                <div
                  ref={badgeRef}
                  className="absolute top-14 right-2 md:-top-4 md:-right-5 z-20"
                  style={{ opacity: 0 }}
                >
                  <div className="bg-white border border-[#E3D8C4] rounded-2xl px-2.5 py-2 md:px-4 md:py-3 shadow-xl rotate-2 hover:rotate-0 transition-transform duration-300">
                    <p className="text-[10px] md:text-xs font-extrabold uppercase tracking-wider text-[#173F32] leading-tight">
                      Real ingredients.
                    </p>
                    <p className="text-[10px] md:text-xs font-extrabold text-[#F47738] leading-tight mt-0.5 flex items-center gap-1">
                      Real flavours.
                      <span aria-hidden="true">✦</span>
                    </p>
                  </div>
                </div>

                {/* Macro pill — bottom left */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-10 left-2 md:-bottom-5 md:-left-6 z-20 bg-[#173F32] text-white rounded-2xl px-2.5 py-2 md:px-4 md:py-3 shadow-xl -rotate-2"
                >
                  <p className="text-[9px] md:text-[11px] font-black text-[#DCEBCF] uppercase tracking-wider leading-none">
                    From
                  </p>
                  <p className="text-base md:text-xl font-black text-[#FFF7E8] leading-none mt-0.5">
                    430 kcal
                  </p>
                  <p className="text-[9px] md:text-[11px] font-semibold text-[#DCEBCF]/80 leading-none mt-0.5">
                    macro-balanced
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── Small decorative botanical sprig SVGs ── */
type SprigPosition = 'topLeft' | 'bottomRight';

function BotanicalSprig({ position }: { position: SprigPosition }) {
  const positionClasses: Record<SprigPosition, string> = {
    topLeft: '-top-8 -left-10 rotate-[-20deg]',
    bottomRight: '-bottom-8 -right-10 rotate-[160deg]',
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute z-0 hidden opacity-75 md:block ${positionClasses[position]}`}
    >
      <svg width="64" height="96" viewBox="0 0 64 96" fill="none">
        <path d="M32 92 Q34 60 32 4" stroke="#4F8562" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M32 76C20 66 19 52 32 64 32 64 32 76 32 76Z" fill="#5B9A71" />
        <path d="M32 76C44 66 45 52 32 64Z" fill="#4F8562" />
        <path d="M32 56C20 46 19 32 32 44 32 44 32 56 32 56Z" fill="#6EAE85" />
        <path d="M32 56C44 46 45 32 32 44Z" fill="#5B9A71" />
        <path d="M32 38C22 28 21 16 32 26Z" fill="#4F8562" />
        <path d="M32 38C42 28 43 16 32 26Z" fill="#6EAE85" />
        <circle cx="32" cy="6" r="3" fill="#F47738" opacity="0.5" />
      </svg>
    </div>
  );
}
