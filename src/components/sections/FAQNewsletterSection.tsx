'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MapPin,
  Gift,
  ShieldCheck,
  Loader2,
  Users,
  MessageCircle,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../ui/Container';
import { AccordionItem } from '../ui/Accordion';
import { FAQS_DATA } from '@/data/faqs';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function FAQNewsletterSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const newsletterPanelRef = useRef<HTMLDivElement | null>(null);
  const faqPanelRef = useRef<HTMLDivElement | null>(null);
  const newsletterHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const newsletterPerksRef = useRef<HTMLDivElement | null>(null);
  const newsletterFormRef = useRef<HTMLFormElement | null>(null);
  const faqHeadingRef = useRef<HTMLDivElement | null>(null);
  const faqGridRef = useRef<HTMLDivElement | null>(null);
  const leafIconRef = useRef<SVGSVGElement | null>(null);

  const [mobileInput, setMobileInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Default to first FAQ open for a welcoming preview
  const [openId, setOpenId] = useState<string | null>('pause-plan');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Coordinated Section Entrance Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // 1. Reveal Newsletter panel from left offset & FAQ panel from right offset
      if (newsletterPanelRef.current && faqPanelRef.current) {
        tl.fromTo(
          newsletterPanelRef.current,
          { opacity: 0, x: -24, y: 12 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(newsletterPanelRef.current, { clearProps: 'transform' });
            },
          }
        ).fromTo(
          faqPanelRef.current,
          { opacity: 0, x: 24, y: 12 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(faqPanelRef.current, { clearProps: 'transform' });
            },
          },
          '<+=0.08'
        );
      }

      // 2. Newsletter Detail Reveal
      if (newsletterHeadingRef.current) {
        tl.fromTo(
          newsletterHeadingRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          '-=0.45'
        );
      }

      if (newsletterPerksRef.current) {
        const perkItems = newsletterPerksRef.current.children;
        tl.fromTo(
          perkItems,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
          '-=0.35'
        );
      }

      if (newsletterFormRef.current) {
        tl.fromTo(
          newsletterFormRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          '-=0.25'
        );
      }

      if (leafIconRef.current) {
        tl.fromTo(
          leafIconRef.current,
          { opacity: 0, scale: 0.85, rotate: -10 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(1.5)' },
          '-=0.4'
        );
      }

      // 3. FAQ Detail Reveal & Card Stagger
      if (faqHeadingRef.current) {
        tl.fromTo(
          faqHeadingRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          '-=0.5'
        );
      }

      const faqCards = faqGridRef.current?.children;
      if (faqCards && faqCards.length > 0) {
        tl.fromTo(
          faqCards,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(faqCards, { clearProps: 'transform' });
            },
          },
          '-=0.35'
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = mobileInput.trim();

    // Normalize phone number: strip +91, 91, or leading 0, plus any spaces or hyphens
    const cleaned = raw.replace(/^(\+91|91|0)/, '').replace(/[\s-]/g, '');
    const isPhoneValid = /^[6-9]\d{9}$/.test(cleaned);

    if (!isPhoneValid) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number (e.g. 98201 98201).');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    // Simulated async submission (with transparent UI notice)
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setMobileInput('');
    }, 600);
  };

  return (
    <section
      id="faqs"
      ref={sectionRef}
      aria-labelledby="faq-section-heading"
      className="py-14 sm:py-18 lg:py-24 relative overflow-hidden bg-transparent"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-stretch relative z-10">
          {/* ============================================================== */}
          {/* Left Column: Stay in the Loop (Deep Forest Green - 5 cols lg)  */}
          {/* ============================================================== */}
          <div
            ref={newsletterPanelRef}
            className="lg:col-span-5 bg-[#173F32] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1F4E3F] via-[#173F32] to-[#0E2820] rounded-[32px] p-7 sm:p-9 lg:p-10 text-white shadow-xl flex flex-col justify-between relative overflow-hidden border border-white/10"
          >
            {/* Ambient orange glow */}
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#F47738]/12 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Subtle decorative leaf motif watermark */}
            <svg
              ref={leafIconRef}
              className="absolute -bottom-10 -right-10 w-52 h-52 text-[#DCEBCF]/8 pointer-events-none"
              viewBox="0 0 120 120"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 110 C 30 70, 70 30, 110 10 C 110 50, 70 90, 10 110 Z"
                fill="currentColor"
              />
              <path
                d="M10 110 C 50 70, 80 40, 110 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            {/* Header & Perks Area */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCEBCF]/15 border border-[#DCEBCF]/25 text-[#DCEBCF] text-[11px] font-black uppercase tracking-wider mb-3.5">
                <Sparkles className="w-3 h-3 text-[#F47738]" />
                <span>COMMUNITY UPDATES</span>
              </div>

              <h2
                id="newsletter-heading"
                ref={newsletterHeadingRef}
                className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#FFF7E8] tracking-tight font-bricolage mb-2.5 leading-tight"
              >
                Stay in the Loop
              </h2>

              <p className="text-xs sm:text-sm text-[#DCEBCF] font-medium leading-relaxed">
                Be the first to know about new bowls, special offers and when we
                expand to your area in Mumbai.
              </p>

              {/* VIP Insider Benefits (Eliminates dead empty space with real value) */}
              <div
                ref={newsletterPerksRef}
                className="space-y-3.5 my-6 py-4.5 border-y border-white/10"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#F47738]/20 border border-[#F47738]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#F47738]">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-[13px] font-bold text-[#FFF7E8]">
                      Secret Menu Drops
                    </p>
                    <p className="text-[11px] sm:text-xs text-[#DCEBCF]/80 leading-snug">
                      Priority access to seasonal chef bowls before they sell out.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#DCEBCF]/20 border border-[#DCEBCF]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#DCEBCF]">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-[13px] font-bold text-[#FFF7E8]">
                      Mumbai Hub Expansion
                    </p>
                    <p className="text-[11px] sm:text-xs text-[#DCEBCF]/80 leading-snug">
                      Instant WhatsApp alert when we launch delivery in your PIN code.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#F47738]/20 border border-[#F47738]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#F47738]">
                    <Gift className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-[13px] font-bold text-[#FFF7E8]">
                      VIP Welcome Surprise
                    </p>
                    <p className="text-[11px] sm:text-xs text-[#DCEBCF]/80 leading-snug">
                      Special insider perks applied directly to your subscription.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form & Feedback Area */}
            <div className="relative z-10 pt-1 mt-auto">
              {isSubmitted ? (
                <div className="p-4.5 rounded-2xl bg-white/10 border border-[#DCEBCF]/30 text-[#FFF7E8] space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#4ADE80] shrink-0" />
                    <span className="font-bold text-sm">You&apos;re on the insider list!</span>
                  </div>
                  <p className="text-xs text-[#DCEBCF] leading-relaxed">
                    (Simulated demo) We&apos;ll notify you on WhatsApp/SMS when we launch new bowls or expand delivery zones.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-bold text-[#F47738] underline hover:text-white transition-colors cursor-pointer pt-1"
                  >
                    Submit another number
                  </button>
                </div>
              ) : (
                <form
                  ref={newsletterFormRef}
                  onSubmit={handleNewsletterSubmit}
                  noValidate
                  className="space-y-2.5"
                >
                  <label htmlFor="newsletter-mobile" className="sr-only">
                    Mobile Number
                  </label>

                  {/* Luxury Unified Input Bar */}
                  <div className="relative bg-white rounded-2xl sm:rounded-full p-1.5 shadow-lg border border-white/20 transition-all focus-within:ring-2 focus-within:ring-[#F47738]">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <div className="flex items-center pl-3 pr-2 text-[#173F32] font-bold text-xs sm:text-sm shrink-0 border-b sm:border-b-0 sm:border-r border-[#E3D8C4] py-1.5 sm:py-0 gap-1.5">
                        <svg
                          className="w-4 h-3 rounded-[2px] shrink-0 shadow-xs overflow-hidden"
                          viewBox="0 0 640 480"
                          aria-label="India flag"
                        >
                          <path fill="#FF9933" d="M0 0h640v160H0z" />
                          <path fill="#FFFFFF" d="M0 160h640v160H0z" />
                          <path fill="#128807" d="M0 320h640v160H0z" />
                          <circle cx="320" cy="240" r="32" fill="#000088" />
                          <circle cx="320" cy="240" r="28" fill="#FFFFFF" />
                          <circle cx="320" cy="240" r="8" fill="#000088" />
                        </svg>
                        <span className="font-extrabold">+91</span>
                      </div>
                      <input
                        id="newsletter-mobile"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={mobileInput}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setMobileInput(val);
                          if (errorMsg) setErrorMsg('');
                        }}
                        placeholder="Enter 10-digit mobile"
                        aria-label="Enter your mobile number"
                        aria-invalid={Boolean(errorMsg)}
                        aria-describedby={errorMsg ? 'newsletter-error' : undefined}
                        className="flex-1 bg-transparent px-2.5 py-2 text-xs sm:text-sm text-[#173F32] placeholder-[#7E9287] font-medium focus:outline-none"
                        disabled={isLoading}
                      />
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="whitespace-nowrap px-6 py-2.5 rounded-xl sm:rounded-full bg-[#F47738] hover:bg-[#E06324] text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98] disabled:opacity-60"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-1.5">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Sending...</span>
                          </span>
                        ) : (
                          <>
                            <span>Notify Me</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {errorMsg && (
                    <div
                      id="newsletter-error"
                      className="flex items-center gap-1.5 text-xs text-[#FCA5A5] font-semibold pl-2 pt-0.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Trust & Privacy Micro-copy */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-[#DCEBCF]/75 pt-1.5 px-2 gap-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#4ADE80] shrink-0" />
                      <span>No spam • 1 update/week</span>
                    </span>
                    <span className="flex items-center gap-1 text-[#DCEBCF]/60">
                      <Users className="w-3.5 h-3.5 text-[#F47738] shrink-0" />
                      <span>3,400+ Mumbai foodies joined</span>
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* ============================================================== */}
          {/* Right Column: Frequently Asked Questions (White Card - 7 cols)  */}
          {/* ============================================================== */}
          <div
            ref={faqPanelRef}
            className="lg:col-span-7 bg-white rounded-[32px] p-6 sm:p-8 lg:p-9 border border-[#E3D8C4] shadow-md flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div ref={faqHeadingRef} className="mb-5 sm:mb-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#173F32]/6 text-[#173F32] text-[11px] font-black uppercase tracking-wider mb-2">
                  <MessageCircle className="w-3 h-3 text-[#F47738]" />
                  <span>CLEAR ANSWERS</span>
                </div>
                <h2
                  id="faq-section-heading"
                  className="text-xl sm:text-2xl lg:text-[28px] font-black text-[#173F32] tracking-tight font-bricolage leading-tight"
                >
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-[#63786F] font-medium mt-1">
                  Everything you need to know about plans, delivery, and fresh preparation.
                </p>
              </div>

              {/* 2-Column Grid of 8 Self-Contained Card Tiles */}
              <div
                ref={faqGridRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5"
              >
                {FAQS_DATA.map((item) => (
                  <AccordionItem
                    key={item.id}
                    item={item}
                    isOpen={openId === item.id}
                    onToggle={() => toggleFAQ(item.id)}
                  />
                ))}
              </div>
            </div>

            {/* Direct WhatsApp Quick Help Footer */}
            <div className="mt-6 pt-4 border-t border-[#E3D8C4]/70 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-[#63786F]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="font-medium text-[#334A40]">
                  Have a specific diet or delivery question?
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
