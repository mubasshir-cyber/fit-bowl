'use client';

import React, { useEffect, useRef } from 'react';
import { UtensilsCrossed, ClipboardCheck, Truck, Smile, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { smoothScrollTo } from '@/utils/scroll';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StepItem {
  id: string;
  stepNumber: string;
  badgeNumber: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  actionLabel?: string;
  actionTarget?: string;
}

const STEPS: StepItem[] = [
  {
    id: 'step-1',
    stepNumber: '1',
    badgeNumber: '01',
    title: 'Choose Your Bowl',
    description: 'Pick from 14 delicious options.',
    icon: UtensilsCrossed,
    actionLabel: 'View Menu',
    actionTarget: '#menu',
  },
  {
    id: 'step-2',
    stepNumber: '2',
    badgeNumber: '02',
    title: 'Book Your Free Trial',
    description: 'Fill in a quick form.',
    icon: ClipboardCheck,
    actionLabel: 'Claim Trial',
    actionTarget: '#trial-form',
  },
  {
    id: 'step-3',
    stepNumber: '3',
    badgeNumber: '03',
    title: 'We Deliver',
    description: 'Fresh to your home or office (Lunch 12–2 pm, Dinner 7–9 pm).',
    icon: Truck,
    actionLabel: 'Mumbai Hubs',
    actionTarget: undefined,
  },
  {
    id: 'step-4',
    stepNumber: '4',
    badgeNumber: '04',
    title: 'Enjoy',
    description: 'Tasty, healthy and hassle-free.',
    icon: Smile,
    actionLabel: 'Read Reviews',
    actionTarget: '#reviews',
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const subtextRef = useRef<HTMLParagraphElement | null>(null);
  const desktopProgressRef = useRef<HTMLDivElement | null>(null);
  const mobileProgressRef = useRef<HTMLDivElement | null>(null);
  const desktopStepsRef = useRef<HTMLDivElement | null>(null);
  const mobileStepsRef = useRef<HTMLDivElement | null>(null);

  const desktopBadgeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mobileBadgeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const desktopIconRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileIconRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      if (desktopProgressRef.current) {
        desktopProgressRef.current.style.transform = 'scaleX(1)';
      }
      if (mobileProgressRef.current) {
        mobileProgressRef.current.style.transform = 'scaleY(1)';
      }
      // Set all badges to active state
      desktopBadgeRefs.current.forEach((badge) => {
        if (badge) {
          badge.style.backgroundColor = '#F47738';
          badge.style.color = '#FFFFFF';
        }
      });
      mobileBadgeRefs.current.forEach((badge) => {
        if (badge) {
          badge.style.backgroundColor = '#F47738';
          badge.style.color = '#FFFFFF';
        }
      });
      return;
    }

    const ctx = gsap.context(() => {
      const activateStep = (stepIndex: number) => {
        // Desktop badge activation
        const dBadge = desktopBadgeRefs.current[stepIndex];
        if (dBadge) {
          gsap.to(dBadge, {
            backgroundColor: '#F47738',
            color: '#FFFFFF',
            borderColor: 'transparent',
            boxShadow: '0 4px 14px rgba(244, 119, 56, 0.45)',
            scale: 1.15,
            duration: 0.18,
            yoyo: true,
            repeat: 1,
            ease: 'back.out(1.8)',
          });
        }

        // Mobile badge activation
        const mBadge = mobileBadgeRefs.current[stepIndex];
        if (mBadge) {
          gsap.to(mBadge, {
            backgroundColor: '#F47738',
            color: '#FFFFFF',
            borderColor: 'transparent',
            boxShadow: '0 4px 14px rgba(244, 119, 56, 0.45)',
            scale: 1.15,
            duration: 0.18,
            yoyo: true,
            repeat: 1,
            ease: 'back.out(1.8)',
          });
        }

        // Desktop icon container border accent
        const dIcon = desktopIconRefs.current[stepIndex];
        if (dIcon) {
          gsap.to(dIcon, {
            borderColor: '#F47738',
            boxShadow: '0 12px 28px -6px rgba(244, 119, 56, 0.28)',
            duration: 0.35,
            ease: 'power2.out',
          });
        }

        // Mobile icon container border accent
        const mIcon = mobileIconRefs.current[stepIndex];
        if (mIcon) {
          gsap.to(mIcon, {
            borderColor: '#F47738',
            boxShadow: '0 8px 20px -4px rgba(244, 119, 56, 0.25)',
            duration: 0.35,
            ease: 'power2.out',
          });
        }
      };

      const resetSteps = () => {
        // Reset steps 1, 2, 3 (indices 1, 2, 3) to pending state; step 0 stays active
        [1, 2, 3].forEach((idx) => {
          const dBadge = desktopBadgeRefs.current[idx];
          if (dBadge) {
            gsap.set(dBadge, {
              backgroundColor: '#FFF7E8',
              color: '#173F32',
              borderColor: 'rgba(23, 63, 50, 0.25)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              scale: 1,
            });
          }
          const mBadge = mobileBadgeRefs.current[idx];
          if (mBadge) {
            gsap.set(mBadge, {
              backgroundColor: '#FFF7E8',
              color: '#173F32',
              borderColor: 'rgba(23, 63, 50, 0.25)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              scale: 1,
            });
          }
          const dIcon = desktopIconRefs.current[idx];
          if (dIcon) {
            gsap.set(dIcon, {
              borderColor: '#E3D8C4',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.08)',
            });
          }
          const mIcon = mobileIconRefs.current[idx];
          if (mIcon) {
            gsap.set(mIcon, {
              borderColor: '#E3D8C4',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.08)',
            });
          }
        });
      };

      // Master Timeline triggered when the section reaches the viewport
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'restart none none none',
          onEnter: () => {
            resetSteps();
            activateStep(0);
          },
        },
      });

      // 1. Heading & Eyebrow Reveal
      if (eyebrowRef.current) {
        masterTl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
      }

      if (headingRef.current) {
        masterTl.fromTo(
          headingRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.25'
        );
      }

      if (subtextRef.current) {
        masterTl.fromTo(
          subtextRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          '-=0.3'
        );
      }

      // 2. Step Containers Entrance Reveal
      const desktopSteps = desktopStepsRef.current?.querySelectorAll('[data-step-item]');
      if (desktopSteps && desktopSteps.length > 0) {
        masterTl.fromTo(
          desktopSteps,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(desktopSteps, { clearProps: 'transform' });
            },
          },
          '-=0.2'
        );
      }

      const mobileSteps = mobileStepsRef.current?.querySelectorAll('[data-mobile-step]');
      if (mobileSteps && mobileSteps.length > 0) {
        masterTl.fromTo(
          mobileSteps,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.1,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(mobileSteps, { clearProps: 'transform' });
            },
          },
          '-=0.2'
        );
      }

      // 3. Progress Line Drawing & Sequential Step Activation
      // Desktop Progress (scaleX 0 -> 0.333 -> 0.666 -> 1.0)
      if (desktopProgressRef.current) {
        masterTl
          .fromTo(
            desktopProgressRef.current,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 0.333,
              duration: 0.38,
              ease: 'power1.inOut',
              onComplete: () => activateStep(1),
            },
            '+=0.1'
          )
          .to(desktopProgressRef.current, {
            scaleX: 0.666,
            duration: 0.38,
            ease: 'power1.inOut',
            onComplete: () => activateStep(2),
          })
          .to(desktopProgressRef.current, {
            scaleX: 1.0,
            duration: 0.38,
            ease: 'power1.inOut',
            onComplete: () => activateStep(3),
          });
      }

      // Mobile Progress (scaleY 0 -> 0.333 -> 0.666 -> 1.0)
      if (mobileProgressRef.current) {
        masterTl
          .fromTo(
            mobileProgressRef.current,
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 0.333,
              duration: 0.38,
              ease: 'power1.inOut',
              onComplete: () => activateStep(1),
            },
            desktopProgressRef.current ? '<' : '+=0.1'
          )
          .to(mobileProgressRef.current, {
            scaleY: 0.666,
            duration: 0.38,
            ease: 'power1.inOut',
            onComplete: () => activateStep(2),
          })
          .to(mobileProgressRef.current, {
            scaleY: 1.0,
            duration: 0.38,
            ease: 'power1.inOut',
            onComplete: () => activateStep(3),
          });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleNavigate = (targetId?: string) => {
    if (!targetId) return;
    smoothScrollTo(targetId);
  };

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      aria-labelledby="how-it-works-heading"
      className="py-16 sm:py-20 lg:py-28 relative overflow-hidden"
    >
      {/* Subtle organic background ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[340px] bg-[#DCEBCF]/25 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <Container size="wide">
        {/* Section Heading Area */}
        <div className="flex flex-col items-center text-center space-y-3 mb-14 sm:mb-18 lg:mb-22">
          <div ref={eyebrowRef} className="inline-flex items-center gap-1.5">
            <Badge variant="kicker" className="shadow-xs">
              IT&apos;S SIMPLE
            </Badge>
          </div>

          <h2
            id="how-it-works-heading"
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#173F32] tracking-tight font-bricolage"
          >
            How It Works
          </h2>

          <p
            ref={subtextRef}
            className="text-base sm:text-lg text-[#334A40] max-w-xl font-medium leading-relaxed"
          >
            Your free trial meal in{' '}
            <span className="text-[#F47738] font-bold">4 simple steps</span>.
          </p>
        </div>

        {/* 1. Desktop & Tablet Horizontal Timeline (md and above) */}
        <div ref={desktopStepsRef} className="hidden md:block relative">
          {/* Connecting Track between the 4 icon circles (starts at 1st center: 12.5%, ends at 4th center: 87.5%) */}
          <div
            className="absolute top-10 sm:top-12 left-[12.5%] right-[12.5%] h-[3px] -z-0 pointer-events-none"
            aria-hidden="true"
          >
            {/* Base Dashed Line */}
            <div className="w-full h-full border-t-2 border-dashed border-[#173F32]/25" />
            {/* Animated Orange Progress Line */}
            <div
              ref={desktopProgressRef}
              className="absolute top-0 left-0 w-full h-[3px] bg-[#F47738] rounded-full shadow-[0_0_12px_rgba(244,119,56,0.55)] origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>

          {/* 4 Steps Columns */}
          <div className="grid grid-cols-4 gap-6 lg:gap-8 relative z-10">
            {STEPS.map((step, idx) => {
              const IconComponent = step.icon;
              const isClickable = Boolean(step.actionTarget);
              const isInitialActive = idx === 0;

              return (
                <div
                  key={step.id}
                  data-step-item
                  className="flex flex-col items-center text-center group"
                >
                  {/* Circular Icon Container */}
                  <div className="relative mb-5">
                    <button
                      ref={(el) => {
                        desktopIconRefs.current[idx] = el;
                      }}
                      type="button"
                      onClick={() => handleNavigate(step.actionTarget)}
                      disabled={!isClickable}
                      aria-label={`${step.title} — ${step.description}`}
                      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 ${
                        isInitialActive
                          ? 'border-[#F47738] shadow-md'
                          : 'border-[#E3D8C4] shadow-sm'
                      } flex items-center justify-center relative how-step-icon select-none transition-all duration-300 ${
                        isClickable
                          ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173F32] focus-visible:ring-offset-2'
                          : 'cursor-default'
                      }`}
                    >
                      <IconComponent className="w-8 h-8 sm:w-9 sm:h-9 text-[#173F32] group-hover:text-[#F47738] transition-colors duration-300" />
                    </button>

                    {/* Orange Number Badge */}
                    <span
                      ref={(el) => {
                        desktopBadgeRefs.current[idx] = el;
                      }}
                      className={`absolute -top-1.5 -right-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full font-black text-xs sm:text-sm flex items-center justify-center shadow-md ring-2 ring-[#FFF7E8] pointer-events-none select-none transition-colors duration-300 ${
                        isInitialActive
                          ? 'bg-[#F47738] text-white border-transparent'
                          : 'bg-[#FFF7E8] text-[#173F32] border border-[#173F32]/25'
                      }`}
                    >
                      {step.badgeNumber}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-lg sm:text-xl font-black text-[#173F32] font-bricolage tracking-tight mb-1.5 group-hover:text-[#F47738] transition-colors duration-200">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs sm:text-sm text-[#556D63] max-w-[210px] mx-auto leading-relaxed font-medium">
                    {step.description}
                  </p>

                  {/* Optional Action Prompt / Link */}
                  {step.actionLabel && (
                    <button
                      type="button"
                      onClick={() => handleNavigate(step.actionTarget)}
                      disabled={!isClickable}
                      className={`inline-flex items-center gap-1 mt-2.5 text-xs font-extrabold text-[#F47738] transition-transform duration-200 ${
                        isClickable
                          ? 'cursor-pointer hover:translate-x-0.5 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F47738] rounded-sm'
                          : 'cursor-default opacity-80'
                      }`}
                    >
                      <span>{step.actionLabel}</span>
                      {isClickable && <ArrowRight className="w-3 h-3" aria-hidden="true" />}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Mobile Vertical Timeline (screens < md) */}
        <div ref={mobileStepsRef} className="md:hidden relative pl-2 sm:pl-4">
          {/* Vertical Track Line */}
          <div
            className="absolute top-7 bottom-7 left-[35px] sm:left-[39px] w-[3px] -z-0 pointer-events-none"
            aria-hidden="true"
          >
            {/* Base Vertical Dashed Line */}
            <div className="w-full h-full border-l-2 border-dashed border-[#173F32]/25" />
            {/* Animated Vertical Orange Progress Line */}
            <div
              ref={mobileProgressRef}
              className="absolute top-0 left-0 w-[3px] h-full bg-[#F47738] rounded-full shadow-[0_0_12px_rgba(244,119,56,0.55)] origin-top"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          {/* Vertical Step Rows */}
          <div className="space-y-7 relative z-10">
            {STEPS.map((step, idx) => {
              const IconComponent = step.icon;
              const isClickable = Boolean(step.actionTarget);
              const isInitialActive = idx === 0;

              return (
                <div
                  key={step.id}
                  data-mobile-step
                  className="flex items-start gap-4 group"
                >
                  {/* Left Circular Icon Container */}
                  <div className="relative shrink-0">
                    <button
                      ref={(el) => {
                        mobileIconRefs.current[idx] = el;
                      }}
                      type="button"
                      onClick={() => handleNavigate(step.actionTarget)}
                      disabled={!isClickable}
                      aria-label={`${step.title} — ${step.description}`}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-2 ${
                        isInitialActive
                          ? 'border-[#F47738] shadow-md'
                          : 'border-[#E3D8C4] shadow-sm'
                      } flex items-center justify-center relative how-step-icon select-none transition-all duration-300 ${
                        isClickable
                          ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173F32]'
                          : 'cursor-default'
                      }`}
                    >
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-[#173F32] group-hover:text-[#F47738] transition-colors" />
                    </button>

                    {/* Orange Number Badge */}
                    <span
                      ref={(el) => {
                        mobileBadgeRefs.current[idx] = el;
                      }}
                      className={`absolute -top-1 -right-1 w-6 h-6 rounded-full font-black text-xs flex items-center justify-center shadow-sm ring-2 ring-[#FFF7E8] pointer-events-none transition-colors duration-300 ${
                        isInitialActive
                          ? 'bg-[#F47738] text-white border-transparent'
                          : 'bg-[#FFF7E8] text-[#173F32] border border-[#173F32]/25'
                      }`}
                    >
                      {step.badgeNumber}
                    </span>
                  </div>

                  {/* Right Step Details */}
                  <div className="pt-1 flex-1">
                    <h3 className="text-base sm:text-lg font-black text-[#173F32] font-bricolage tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#556D63] mt-0.5 leading-relaxed font-medium">
                      {step.description}
                    </p>
                    {step.actionLabel && (
                      <button
                        type="button"
                        onClick={() => handleNavigate(step.actionTarget)}
                        disabled={!isClickable}
                        className={`inline-flex items-center gap-1 mt-1.5 text-xs font-extrabold text-[#F47738] ${
                          isClickable ? 'cursor-pointer hover:underline' : 'cursor-default opacity-80'
                        }`}
                      >
                        <span>{step.actionLabel}</span>
                        {isClickable && <ArrowRight className="w-3 h-3" aria-hidden="true" />}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
