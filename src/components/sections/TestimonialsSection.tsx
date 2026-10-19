'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Star, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { TESTIMONIALS_DATA } from '@/data/testimonials';
import { smoothScrollTo } from '@/utils/scroll';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingWrapperRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const subtextRef = useRef<HTMLParagraphElement | null>(null);
  const galleryWrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);

  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Animation A — Section Heading Reveal
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      if (eyebrowRef.current) {
        headingTl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
      }

      if (headingRef.current) {
        headingTl.fromTo(
          headingRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.25'
        );
      }

      if (subtextRef.current) {
        headingTl.fromTo(
          subtextRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.3'
        );
      }

      // Animation D — Card Initial Entrance Stagger
      const desktopCards = trackRef.current?.querySelectorAll('[data-editorial-card]');
      if (desktopCards && desktopCards.length > 0) {
        headingTl.fromTo(
          desktopCards,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(desktopCards, { clearProps: 'y' });
            },
          },
          '-=0.2'
        );
      }

      // Animation B — Desktop Horizontal Scroll Gallery with Viewport-Fit Pinning
      if (isDesktop && trackRef.current && sectionRef.current) {
        const getDistance = () => {
          if (!trackRef.current) return 0;
          const cards = trackRef.current.querySelectorAll('[data-editorial-card]');
          if (!cards || cards.length === 0) return 0;
          const lastCard = cards[cards.length - 1] as HTMLElement;
          if (!lastCard) return 0;

          const rightEdgeOfLastCard = lastCard.offsetLeft + lastCard.offsetWidth;
          const rightMargin = Math.max(48, (window.innerWidth - 1280) / 2 + 32);
          const targetViewportRight = window.innerWidth - rightMargin;

          return Math.max(0, rightEdgeOfLastCard - targetViewportRight);
        };

        const distance = getDistance();

        if (distance > 0) {
          gsap.to(trackRef.current, {
            x: () => -getDistance(),
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              pin: true,
              start: 'top top',
              end: () => `+=${getDistance() + 100}`,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              fastScrollEnd: true,
            },
          });

          // Animation C — Restrained parallax on food images during horizontal traversal
          const foodImages = trackRef.current.querySelectorAll('.editorial-food-img');
          if (foodImages.length > 0) {
            gsap.to(foodImages, {
              x: -20,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: () => `+=${getDistance() + 100}`,
                scrub: 1.2,
                fastScrollEnd: true,
              },
            });
          }
        }
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleScrollToMenu = () => {
    smoothScrollTo('#menu');
  };

  const handleMobileScroll = (direction: 'prev' | 'next') => {
    if (!mobileTrackRef.current) return;
    const cardWidth = 340;
    const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
    mobileTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    setActiveMobileIndex((prev) => {
      if (direction === 'next') {
        return Math.min(TESTIMONIALS_DATA.length - 1, prev + 1);
      }
      return Math.max(0, prev - 1);
    });
  };

  return (
    <section
      id="reviews"
      ref={sectionRef}
      aria-labelledby="reviews-heading"
      className="relative overflow-hidden bg-transparent lg:h-screen lg:max-h-screen lg:flex lg:flex-col lg:justify-between pt-16 sm:pt-20 lg:pt-20 pb-12 sm:pb-16 lg:pb-6"
    >
      {/* Background ambient editorial depth glow */}
      <div
        className="absolute top-1/4 -right-40 w-[550px] h-[550px] rounded-full bg-[#F47738]/6 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -left-40 w-[550px] h-[550px] rounded-full bg-[#DCEBCF]/20 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Section Introduction Header */}
      <Container size="wide" className="shrink-0">
        <div
          ref={headingWrapperRef}
          className="flex flex-col items-start lg:items-center text-left lg:text-center space-y-2 mb-4 lg:mb-3"
        >
          <div ref={eyebrowRef} className="inline-flex items-center gap-1.5">
            <Badge variant="kicker" className="shadow-xs tracking-wider text-[11px] py-0.5 px-3">
              REAL PEOPLE. REAL EXPERIENCES.
            </Badge>
          </div>

          <div className="overflow-hidden">
            <h2
              id="reviews-heading"
              ref={headingRef}
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-black text-[#173F32] tracking-tight font-bricolage leading-tight"
            >
              Hear From the Community
            </h2>
          </div>

          <p
            ref={subtextRef}
            className="text-xs sm:text-sm lg:text-[15px] text-[#334A40] max-w-xl font-medium leading-relaxed"
          >
            Good food{' '}
            <span className="text-[#F47738] font-bold underline decoration-[#F47738]/40 underline-offset-4">
              becomes part of your routine
            </span>
            . Here&apos;s what our customers have to say.
          </p>
        </div>
      </Container>

      {/* ============================================================== */}
      {/* 1. Desktop Horizontal Scroll Gallery Track (Screens >= 1024px) */}
      {/* ============================================================== */}
      <div
        ref={galleryWrapperRef}
        className="hidden lg:flex flex-1 items-center relative w-full overflow-visible my-auto py-2"
      >
        <div
          ref={trackRef}
          className="flex items-center gap-6 xl:gap-8 pl-[max(2rem,calc((100vw-1280px)/2+2rem))] pr-8 lg:pr-12 w-max will-change-transform"
        >
          {TESTIMONIALS_DATA.map((item) => {
            const isLong = item.quote.length > 140;

            return (
              <div
                key={item.id}
                data-editorial-card
                style={{
                  backgroundColor: item.bgColor,
                  borderColor: item.borderColor,
                  transform: `rotate(${item.rotationDeg}deg)`,
                }}
                className="editorial-review-card relative shrink-0 w-[400px] xl:w-[440px] h-[450px] xl:h-[480px] rounded-[28px] p-6 xl:p-7 border-2 shadow-xl flex flex-col justify-between overflow-hidden select-none"
              >
                {/* Decorative Subtle Background Watermark Quote */}
                <Quote
                  className="absolute -top-3 -right-3 w-28 h-28 text-[#173F32]/5 pointer-events-none rotate-12"
                  aria-hidden="true"
                />

                {/* Top Card Meta Row: Locality Pill & 5 Golden Stars */}
                <div className="flex items-center justify-between relative z-10 shrink-0">
                  <span className="text-[10.5px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full bg-[#173F32]/8 text-[#173F32] border border-[#173F32]/10">
                    {item.locality}, Mumbai
                  </span>

                  <div
                    className="flex items-center gap-0.5"
                    aria-label={`${item.rating} out of 5 stars`}
                  >
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#F47738] text-[#F47738]"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>

                {/* Center Food Photo Frame with Dish Pill */}
                <div className="relative w-full h-32 xl:h-36 rounded-xl overflow-hidden my-3 border border-black/8 shadow-inner bg-black/5 shrink-0">
                  <Image
                    src={item.dishImage || '/images/bowls/korean-chicken-bowl.jpg'}
                    alt={`${item.dishName || 'FitBowl'} ordered by ${item.name}`}
                    fill
                    sizes="(max-width: 1440px) 400px, 440px"
                    className="editorial-food-img object-cover will-change-transform"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#173F32]/90 backdrop-blur-md text-[#FFF7E8] text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    {item.dishName || 'FitBowl Special'}
                  </div>
                </div>

                {/* Exact Customer Testimonial Text */}
                <div className="relative z-10 flex-1 flex flex-col justify-center overflow-y-auto pr-1 no-scrollbar my-1">
                  <p
                    className={`${
                      isLong
                        ? 'text-xs xl:text-[13px] leading-relaxed font-medium text-[#253D33]'
                        : 'text-base xl:text-lg font-bold font-bricolage text-[#173F32] leading-snug tracking-tight'
                    }`}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Card Bottom: Customer Profile & Verified Badge */}
                <div className="flex items-center justify-between pt-3 mt-auto border-t border-[#173F32]/15 relative z-10 shrink-0">
                  <div className="flex items-center gap-2.5">
                    {/* Customer Monogram Avatar */}
                    <div className="w-8 h-8 rounded-full bg-[#173F32] text-[#FFF7E8] font-black text-xs flex items-center justify-center shadow-xs">
                      {item.initials}
                    </div>
                    <div>
                      <h3 className="text-xs xl:text-sm font-black text-[#173F32] font-bricolage leading-tight">
                        {item.name}, {item.age}
                      </h3>
                      <p className="text-[11px] text-[#556D63] font-semibold">
                        {item.locality} Hub
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#1B5E20] bg-[#E8F5E9] px-2 py-0.5 rounded-full border border-[#C8E6C9]">
                    <CheckCircle2 className="w-3 h-3 text-[#2E7D32]" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. Mobile & Tablet Swipeable Touch Gallery (< 1024px)          */}
      {/* ============================================================== */}
      <div className="lg:hidden relative w-full my-6">
        <div
          ref={mobileTrackRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 pb-6 pt-2 no-scrollbar"
        >
          {TESTIMONIALS_DATA.map((item) => {
            const isLong = item.quote.length > 140;

            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: item.bgColor,
                  borderColor: item.borderColor,
                }}
                className="snap-center shrink-0 w-[86vw] max-w-[360px] sm:max-w-[400px] rounded-[28px] p-6 border-2 shadow-lg flex flex-col justify-between"
              >
                {/* Top Card Meta: Locality & Stars */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#173F32]/8 text-[#173F32]">
                    {item.locality}, Mumbai
                  </span>

                  <div className="flex items-center gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#F47738] text-[#F47738]"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>

                {/* Food Image Crop */}
                <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden mb-3 border border-black/8 shadow-inner">
                  <Image
                    src={item.dishImage || '/images/bowls/korean-chicken-bowl.jpg'}
                    alt={`${item.dishName || 'FitBowl'} ordered by ${item.name}`}
                    fill
                    sizes="360px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#173F32]/90 backdrop-blur-sm text-[#FFF7E8] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {item.dishName || 'FitBowl Special'}
                  </div>
                </div>

                {/* Review Text */}
                <div className="flex-1 my-2">
                  <p
                    className={`${
                      isLong
                        ? 'text-xs sm:text-[13px] leading-relaxed font-medium text-[#253D33]'
                        : 'text-base sm:text-lg font-bold font-bricolage text-[#173F32] leading-snug tracking-tight'
                    }`}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#173F32]/15">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#173F32] text-[#FFF7E8] font-black text-xs flex items-center justify-center">
                      {item.initials}
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-[#173F32] font-bricolage leading-tight">
                        {item.name}, {item.age}
                      </h3>
                      <p className="text-[11px] text-[#556D63] font-semibold">
                        {item.locality} Hub
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#1B5E20] bg-[#E8F5E9] px-2 py-0.5 rounded-full border border-[#C8E6C9]">
                    <CheckCircle2 className="w-3 h-3 text-[#2E7D32]" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Navigation Controls */}
        <div className="flex items-center justify-center gap-3 mt-2">
          <button
            type="button"
            onClick={() => handleMobileScroll('prev')}
            aria-label="Previous review"
            className="w-9 h-9 rounded-full border border-[#173F32]/25 bg-white text-[#173F32] flex items-center justify-center hover:bg-[#FFF7E8] active:scale-95 transition-all shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 px-2">
            {TESTIMONIALS_DATA.map((_, dotIdx) => (
              <span
                key={dotIdx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  dotIdx === activeMobileIndex
                    ? 'w-6 bg-[#F47738]'
                    : 'w-2 bg-[#173F32]/20'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleMobileScroll('next')}
            aria-label="Next review"
            className="w-9 h-9 rounded-full border border-[#173F32]/25 bg-white text-[#173F32] flex items-center justify-center hover:bg-[#FFF7E8] active:scale-95 transition-all shadow-xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. Supporting Action CTA below gallery                         */}
      {/* ============================================================== */}
      <Container size="wide" className="shrink-0">
        <div className="mt-2 lg:mt-1 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <button
            type="button"
            onClick={handleScrollToMenu}
            className="inline-flex items-center gap-2 px-6 py-2.5 lg:py-2.5 rounded-full font-black text-xs sm:text-sm text-white bg-[#173F32] hover:bg-[#0F2C23] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173F32] focus-visible:ring-offset-2 group"
          >
            <span>Explore Our Bowls</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </Container>
    </section>
  );
}
