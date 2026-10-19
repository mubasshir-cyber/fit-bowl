'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Leaf, Clock, Salad, Truck, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../ui/Container';
import { smoothScrollTo } from '@/utils/scroll';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Benefit data ──────────────────────────────────────────────── */
const BENEFITS = [
  {
    id: 'tasty',
    icon: Leaf,
    pill: 'Macro-Balanced',
    title: 'Tasty & Healthy',
    description:
      'Flavour-packed bowls with chef-calculated protein, carbs, and healthy fats that never feel like a diet.',
    image: '/images/benefits/tasty-healthy.jpg',
    imageAlt: 'Vibrant quinoa bowl with cherry tomatoes, avocado, spinach and chickpeas',
    ctaText: 'Explore Bowls',
    target: '#menu',
    accentColor: '#173F32',
    accentBg: '#DCEBCF',
  },
  {
    id: 'busy',
    icon: Clock,
    pill: 'Zero Prep Time',
    title: 'Made for Busy You',
    description:
      'Save 5+ hours every week. Fresh, ready-to-eat gourmet meals delivered directly on your schedule.',
    image: '/images/benefits/busy-you.jpg',
    imageAlt: 'Grilled paneer bowl with broccoli, brown rice and edamame',
    ctaText: 'View Plans',
    target: '#plans',
    accentColor: '#F47738',
    accentBg: '#FFEDD5',
  },
  {
    id: 'real',
    icon: Salad,
    pill: '100% Whole Food',
    title: 'Real Ingredients',
    description:
      'Zero artificial preservatives, no refined seed oils, and absolutely no hidden sugars. Honest nutrition.',
    image: '/images/benefits/real-ingredients.jpg',
    imageAlt: 'Fresh ingredients flat-lay: tomatoes, basil, avocado, chickpeas and herbs',
    ctaText: 'See The Menu',
    target: '#menu',
    accentColor: '#173F32',
    accentBg: '#DCEBCF',
  },
  {
    id: 'delivery',
    icon: Truck,
    pill: 'Mumbai Wide',
    title: 'Convenient Delivery',
    description:
      'Prompt daily drops right to your home doorstep or office desk in temperature-sealed eco packaging.',
    image: '/images/benefits/delivery.jpg',
    imageAlt: 'Premium kraft delivery bag with a sealed healthy meal bowl beside it',
    ctaText: 'Get Free Trial',
    target: '#trial-form',
    accentColor: '#F47738',
    accentBg: '#FFEDD5',
  },
] as const;

/* ─── Component ─────────────────────────────────────────────────── */
export function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      /* ── 1. Section header entrance ── */
      if (prefersReduced) {
        gsap.set([eyebrowRef.current, headingRef.current, copyRef.current], {
          opacity: 1,
          y: 0,
          clipPath: 'none',
        });
      } else {
        gsap.set(eyebrowRef.current, { opacity: 0, y: 16 });
        gsap.set(headingRef.current, { clipPath: 'inset(0 0 100% 0)', y: 6 });
        gsap.set(copyRef.current, { opacity: 0, y: 12 });

        const introTL = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
          defaults: { ease: 'power3.out' },
        });

        introTL
          .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.45 })
          .to(headingRef.current, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.55 }, '-=0.2')
          .to(copyRef.current, { opacity: 1, y: 0, duration: 0.45 }, '-=0.25');
      }

      /* ── 2. Cards stagger entrance ── */
      if (!prefersReduced && cardsRef.current) {
        const cards = Array.from(cardsRef.current.querySelectorAll('[data-benefit-card]'));
        gsap.set(cards, { opacity: 0, y: 28 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 82%',
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    smoothScrollTo(id);
  };

  return (
    <section
      id="benefits"
      ref={sectionRef}
      aria-labelledby="benefits-heading"
      className="relative pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 lg:pb-12 bg-[#FFF7E8] overflow-hidden"
    >
      {/* ── Soft organic background ambient glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#DCEBCF]/20 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] rounded-full bg-[#F47738]/5 blur-[90px]" />
      </div>

      <Container size="wide">
        {/* ─────────── Section introduction ─────────── */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-14">
          {/* Eyebrow */}
          <div ref={eyebrowRef} style={{ opacity: 0 }}>
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-extrabold text-[#173F32] bg-[#DCEBCF] px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F47738] animate-pulse" />
              Why FitBowl
            </span>
          </div>

          {/* Heading with clip-path mask */}
          <div
            ref={headingRef}
            className="overflow-hidden mt-4"
            style={{ clipPath: 'inset(0 0 100% 0)' }}
          >
            <h2
              id="benefits-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-[#173F32]"
            >
              Good Food, <span className="text-[#F47738]">Zero Stress.</span>
            </h2>
          </div>

          {/* Supporting copy */}
          <p
            ref={copyRef}
            className="mt-3.5 text-base sm:text-lg text-[#4A6356] font-medium max-w-xl leading-relaxed"
            style={{ opacity: 0 }}
          >
            Gourmet taste meets honest macros — freshly prepared daily and delivered across Mumbai.
          </p>
        </div>

        {/* ─────────── Four benefit cards ─────────── */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {BENEFITS.map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} onNavigate={scrollTo} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── Benefit Card Sub-component ───────────────────────────────── */
function BenefitCard({
  benefit,
  onNavigate,
}: {
  benefit: (typeof BENEFITS)[number];
  onNavigate: (target: string) => void;
}) {
  const IconComponent = benefit.icon;

  return (
    <div
      data-benefit-card
      className="group relative flex flex-col bg-white rounded-3xl border border-[#E3D8C4] hover:border-[#173F32]/35 shadow-[0_4px_20px_rgba(23,63,50,0.04)] hover:shadow-[0_20px_40px_rgba(23,63,50,0.1)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
    >
      {/* Top Media Window */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#F3EAD8]">
        <Image
          src={benefit.image}
          alt={benefit.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

        {/* Floating Pill Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md bg-white/95 text-[#173F32] shadow-xs">
            <IconComponent
              className="w-3.5 h-3.5"
              style={{ color: benefit.accentColor }}
              aria-hidden="true"
            />
            {benefit.pill}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1 bg-white">
        <h3 className="text-xl font-black text-[#173F32] group-hover:text-[#F47738] transition-colors duration-200 tracking-tight leading-snug">
          {benefit.title}
        </h3>

        <p className="mt-2 text-sm text-[#4A6356] leading-relaxed font-medium flex-1">
          {benefit.description}
        </p>

        {/* Action Row */}
        <div className="mt-5 pt-4 border-t border-[#E3D8C4]/60 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate(benefit.target)}
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#173F32] group-hover:text-[#F47738] transition-colors duration-200 cursor-pointer"
            aria-label={`${benefit.ctaText} - ${benefit.title}`}
          >
            <span>{benefit.ctaText}</span>
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#63786F]/60">
            Mumbai
          </span>
        </div>
      </div>
    </div>
  );
}
