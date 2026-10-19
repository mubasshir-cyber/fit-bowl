'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import {
  Gift,
  CheckCircle2,
  AlertCircle,
  Calendar,
  MapPin,
  User,
  ArrowRight,
  Info,
  Loader2,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../ui/Container';
import { TrialFormData, FormValidationErrors, DeliveryHub } from '@/types/trial';
import {
  validateFullName,
  validateMobile,
  validateDeliveryArea,
  validateDeliveryDate,
  getTomorrowDateString,
  getMaxDateString,
} from '@/utils/validation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type SubmissionState = 'idle' | 'validating' | 'submitting' | 'success' | 'error';

const emptySubscribe = () => () => {};

export function TrialFormSection() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const minDate = isClient ? getTomorrowDateString() : '';
  const maxDate = isClient ? getMaxDateString(14) : '';

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const formCardRef = useRef<HTMLDivElement | null>(null);
  const formFieldsRef = useRef<HTMLFormElement | null>(null);
  const successPanelRef = useRef<HTMLDivElement | null>(null);

  // Field refs for accessible focus management
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const mobileInputRef = useRef<HTMLInputElement | null>(null);
  const areaSelectRef = useRef<HTMLSelectElement | null>(null);
  const vegBtnRef = useRef<HTMLButtonElement | null>(null);
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<TrialFormData>({
    fullName: '',
    mobile: '',
    deliveryArea: '',
    foodPreference: 'veg',
    deliveryDate: '',
    customAreaNotes: '',
  });

  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [isWaitlistSubmission, setIsWaitlistSubmission] = useState(false);

  const isOutOfArea = formData.deliveryArea === 'other';

  // Section Entrance Scroll Animation
  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // 1. Reveal header elements
      if (headerRef.current) {
        tl.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out' }
        );
      }

      // 2. Reveal form card container
      if (formCardRef.current) {
        tl.fromTo(
          formCardRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(formCardRef.current, { clearProps: 'transform' });
            },
          },
          '-=0.35'
        );
      }

      // 3. Stagger field groups
      if (formFieldsRef.current) {
        const fieldElements = formFieldsRef.current.querySelectorAll('.form-field-group');
        if (fieldElements.length > 0) {
          tl.fromTo(
            fieldElements,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.05,
              ease: 'power2.out',
              onComplete: () => {
                gsap.set(fieldElements, { clearProps: 'transform' });
              },
            },
            '-=0.3'
          );
        }
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Success Panel Entrance Animation
  useEffect(() => {
    if (submissionState !== 'success' || !successPanelRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const elements = successPanelRef.current?.children;

      if (elements && elements.length > 0) {
        tl.fromTo(
          elements[0], // checkmark icon
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
        ).fromTo(
          Array.from(elements).slice(1),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' },
          '-=0.25'
        );
      }
    }, successPanelRef);

    return () => {
      ctx.revert();
    };
  }, [submissionState]);

  const handleInputChange = (field: keyof TrialFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field-specific error as user edits
    if (errors[field as keyof FormValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    setSubmissionState('validating');
    const newErrors: FormValidationErrors = {};

    const nameErr = validateFullName(formData.fullName);
    if (nameErr) newErrors.fullName = nameErr;

    const mobileErr = validateMobile(formData.mobile);
    if (mobileErr) newErrors.mobile = mobileErr;

    const areaErr = validateDeliveryArea(formData.deliveryArea);
    if (areaErr) newErrors.deliveryArea = areaErr;

    if (!formData.foodPreference) {
      newErrors.foodPreference = 'Please choose a meal preference.';
    }

    // Only validate delivery date if within supported areas
    if (!isOutOfArea) {
      const dateErr = validateDeliveryDate(formData.deliveryDate || minDate);
      if (dateErr) newErrors.deliveryDate = dateErr;
    }

    setErrors(newErrors);

    // Focus first invalid field for keyboard & screen-reader accessibility
    if (Object.keys(newErrors).length > 0) {
      setSubmissionState('idle');
      if (newErrors.fullName) {
        nameInputRef.current?.focus();
      } else if (newErrors.mobile) {
        mobileInputRef.current?.focus();
      } else if (newErrors.deliveryArea) {
        areaSelectRef.current?.focus();
      } else if (newErrors.foodPreference) {
        vegBtnRef.current?.focus();
      } else if (newErrors.deliveryDate) {
        dateInputRef.current?.focus();
      }
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submissions while already pending
    if (submissionState === 'submitting') return;

    if (!validateForm()) {
      return;
    }

    // Auto-fill tomorrow date if not explicitly picked
    if (!formData.deliveryDate && minDate && !isOutOfArea) {
      setFormData((prev) => ({ ...prev, deliveryDate: minDate }));
    }

    setSubmissionState('submitting');
    setIsWaitlistSubmission(isOutOfArea);

    // Simulated submission delay (approx 1,000ms) with explicit demo disclaimer
    setTimeout(() => {
      setSubmissionState('success');
    }, 1000);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      mobile: '',
      deliveryArea: '',
      foodPreference: 'veg',
      deliveryDate: '',
      customAreaNotes: '',
    });
    setErrors({});
    setSubmissionState('idle');
    setIsWaitlistSubmission(false);
  };

  return (
    <section
      id="trial-form"
      ref={sectionRef}
      aria-labelledby="trial-section-heading"
      className="py-16 sm:py-20 lg:py-28 relative overflow-hidden bg-transparent"
    >
      <Container size="narrow">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col items-center text-center space-y-3 mb-10 sm:mb-12 max-w-xl mx-auto"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#173F32]/8 text-[#173F32] text-xs font-black uppercase tracking-wider">
            <span>FREE TRIAL</span>
          </div>

          <h2
            id="trial-section-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#173F32] tracking-tight font-bricolage leading-tight"
          >
            Claim Your Free Trial Meal
          </h2>

          <p className="text-sm sm:text-base text-[#334A40] max-w-lg font-medium leading-relaxed">
            No credit card required. 100% free freshly cooked lunch or dinner bowl
            delivered to your home or office.
          </p>
        </div>

        {/* Booking Form Card / Dedicated In-Place Success Panel */}
        <div
          ref={formCardRef}
          className="bg-white rounded-[32px] p-6 sm:p-9 lg:p-10 border border-[#E3D8C4] shadow-xl relative overflow-hidden min-h-[580px] flex flex-col justify-between"
        >
          {submissionState === 'success' ? (
            /* ============================================================== */
            /* Dedicated In-Place Success Panel                               */
            /* ============================================================== */
            <div
              ref={successPanelRef}
              className="flex flex-col items-center text-center py-2 sm:py-4 h-full justify-between"
              role="alert"
              aria-live="polite"
            >
              {/* Soft-green circular success icon */}
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mb-4 ring-8 ring-[#E8F5E9]/50 shadow-xs">
                <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10" />
              </div>

              {/* Success Heading & Copy */}
              <div className="space-y-2 mb-6">
                <h3 className="text-2xl sm:text-3xl font-black text-[#173F32] font-bricolage tracking-tight">
                  You&apos;re on your way to better lunches!
                </h3>
                <p className="text-xs sm:text-sm text-[#334A40] max-w-md mx-auto font-medium leading-relaxed">
                  {isWaitlistSubmission
                    ? 'Your interest registration is complete. We’ll alert you when FitBowl expands to your area.'
                    : 'Your form demo is complete. No booking has been sent to the FitBowl team yet.'}
                </p>
              </div>

              {/* Concise Submission Summary Box */}
              <div className="w-full bg-[#FFF7E8] rounded-2xl p-4 sm:p-5 border border-[#E3D8C4] text-left space-y-2.5 mb-5 text-xs sm:text-sm">
                <div className="flex justify-between border-b border-[#E3D8C4]/70 pb-2">
                  <span className="text-[#63786F] font-bold">Recipient:</span>
                  <span className="font-extrabold text-[#173F32]">
                    {formData.fullName}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#E3D8C4]/70 pb-2">
                  <span className="text-[#63786F] font-bold">Mobile:</span>
                  <span className="font-extrabold text-[#173F32]">
                    +91 {formData.mobile}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#E3D8C4]/70 pb-2">
                  <span className="text-[#63786F] font-bold">Delivery Area:</span>
                  <span className="font-extrabold text-[#173F32]">
                    {formData.deliveryArea === 'other'
                      ? `Outside Area ${formData.customAreaNotes ? `(${formData.customAreaNotes})` : ''}`
                      : formData.deliveryArea === 'andheri'
                      ? 'Andheri (East / West)'
                      : formData.deliveryArea === 'bandra'
                      ? 'Bandra (West / BKC)'
                      : formData.deliveryArea === 'powai'
                      ? 'Powai (Hiranandani)'
                      : formData.deliveryArea === 'lower-parel'
                      ? 'Lower Parel'
                      : formData.deliveryArea}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#E3D8C4]/70 pb-2">
                  <span className="text-[#63786F] font-bold">Meal Preference:</span>
                  <span className="font-extrabold text-[#173F32] flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        formData.foodPreference === 'veg'
                          ? 'bg-[#2E7D32]'
                          : 'bg-[#C2410C]'
                      }`}
                    />
                    <span>
                      {formData.foodPreference === 'veg'
                        ? 'Vegetarian'
                        : 'Non-Vegetarian'}
                    </span>
                  </span>
                </div>
                {!isWaitlistSubmission && (
                  <div className="flex justify-between pt-0.5">
                    <span className="text-[#63786F] font-bold">
                      Preferred Date:
                    </span>
                    <span className="font-extrabold text-[#F47738]">
                      {(() => {
                        const raw = formData.deliveryDate || minDate;
                        try {
                          const d = new Date(raw + 'T00:00:00');
                          return isNaN(d.getTime())
                            ? raw
                            : d.toLocaleDateString('en-IN', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              });
                        } catch {
                          return raw;
                        }
                      })()}
                    </span>
                  </div>
                )}
              </div>

              {/* Refined Prototype Demo Notice */}
              <div className="w-full p-3.5 sm:p-4 rounded-2xl bg-[#F7F2E7] border border-[#E2D8C6] text-left flex items-start gap-3 mb-6">
                <div className="w-6 h-6 rounded-full bg-[#173F32]/10 text-[#173F32] flex items-center justify-center shrink-0 mt-0.5">
                  <Info className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#173F32]">
                    Prototype Simulation Notice
                  </p>
                  <p className="text-[11.5px] sm:text-xs text-[#52665D] leading-relaxed font-medium">
                    FitBowl free trial booking flow was validated successfully. As this is a portfolio demonstration, no actual meal delivery has been scheduled and no SMS notifications were dispatched.
                  </p>
                </div>
              </div>

              {/* Reset Action */}
              <button
                type="button"
                onClick={handleResetForm}
                className="w-full py-3.5 px-6 rounded-full bg-[#173F32] hover:bg-[#0F2C23] text-[#FFF7E8] font-bold text-sm sm:text-base shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173F32] focus-visible:ring-offset-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Book Another Trial</span>
              </button>
            </div>
          ) : (
            /* ============================================================== */
            /* Active Booking Form                                            */
            /* ============================================================== */
            <>
              <div>
                {/* Top Trust & Policy Strip */}
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#E3D8C4]/70">
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-[#F47738]" />
                    <span className="text-xs sm:text-sm font-extrabold text-[#173F32]">
                      1 Free Trial Per Customer
                    </span>
                  </div>
                  <span className="text-xs text-[#63786F] font-semibold">
                    Mon – Sat Deliveries Only
                  </span>
                </div>

                <form
                  ref={formFieldsRef}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5 sm:space-y-6"
                >
                  {/* Field 1: Full Name */}
                  <div className="form-field-group">
                    <label
                      htmlFor="trial-fullName"
                      className="block text-xs font-bold text-[#173F32] uppercase tracking-wider mb-2"
                    >
                      Full Name <span className="text-[#F47738]">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#63786F] pointer-events-none" />
                      <input
                        ref={nameInputRef}
                        id="trial-fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange('fullName', e.target.value)
                        }
                        placeholder="e.g. Karan Mehta"
                        aria-required="true"
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={
                          errors.fullName ? 'fullName-error' : undefined
                        }
                        className={`w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm bg-white border text-[#173F32] placeholder-[#7E9287] font-medium focus:outline-none focus:ring-2 transition-all ${
                          errors.fullName
                            ? 'border-[#DC2626] focus:ring-[#DC2626]/20 bg-[#FEF2F2]'
                            : 'border-[#E3D8C4] focus:border-[#F47738] focus:ring-[#F47738]/20'
                        }`}
                        disabled={submissionState === 'submitting'}
                      />
                    </div>
                    {errors.fullName && (
                      <p
                        id="fullName-error"
                        className="flex items-center gap-1.5 text-xs text-[#DC2626] font-semibold mt-1.5 pl-1"
                        role="alert"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Field 2: Mobile Number (with locked +91 prefix) */}
                  <div className="form-field-group">
                    <label
                      htmlFor="trial-mobile"
                      className="block text-xs font-bold text-[#173F32] uppercase tracking-wider mb-2"
                    >
                      Mobile Number <span className="text-[#F47738]">*</span>
                    </label>
                    <div
                      className={`relative flex rounded-xl border overflow-hidden transition-all focus-within:ring-2 ${
                        errors.mobile
                          ? 'border-[#DC2626] focus-within:ring-[#DC2626]/20 bg-[#FEF2F2]'
                          : 'border-[#E3D8C4] focus-within:border-[#F47738] focus-within:ring-[#F47738]/20'
                      }`}
                    >
                      {/* Locked +91 Addon */}
                      <span className="inline-flex items-center gap-1.5 px-3 bg-[#FFF7E8] text-[#173F32] text-xs sm:text-sm font-extrabold border-r border-[#E3D8C4] select-none">
                        <svg
                          className="w-4 h-3 rounded-[2px] shrink-0 overflow-hidden shadow-2xs"
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
                        <span>+91</span>
                      </span>
                      <input
                        ref={mobileInputRef}
                        id="trial-mobile"
                        name="mobile"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={formData.mobile}
                        onChange={(e) => {
                          const val = e.target.value
                            .replace(/^(\+91|91|0)/, '')
                            .replace(/\D/g, '')
                            .slice(0, 10);
                          handleInputChange('mobile', val);
                        }}
                        placeholder="98201 98201"
                        aria-required="true"
                        aria-invalid={Boolean(errors.mobile)}
                        aria-describedby={
                          errors.mobile ? 'mobile-error' : undefined
                        }
                        className="flex-1 px-3.5 py-3 sm:py-3.5 text-xs sm:text-sm bg-white text-[#173F32] placeholder-[#7E9287] font-medium focus:outline-none"
                        disabled={submissionState === 'submitting'}
                      />
                    </div>
                    {errors.mobile && (
                      <p
                        id="mobile-error"
                        className="flex items-center gap-1.5 text-xs text-[#DC2626] font-semibold mt-1.5 pl-1"
                        role="alert"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.mobile}</span>
                      </p>
                    )}
                  </div>

                  {/* Field 3: Delivery Area Dropdown */}
                  <div className="form-field-group">
                    <label
                      htmlFor="trial-deliveryArea"
                      className="block text-xs font-bold text-[#173F32] uppercase tracking-wider mb-2"
                    >
                      Delivery Area (Mumbai) <span className="text-[#F47738]">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#63786F] pointer-events-none" />
                      <select
                        ref={areaSelectRef}
                        id="trial-deliveryArea"
                        name="deliveryArea"
                        value={formData.deliveryArea}
                        onChange={(e) =>
                          handleInputChange(
                            'deliveryArea',
                            e.target.value as DeliveryHub
                          )
                        }
                        aria-required="true"
                        aria-invalid={Boolean(errors.deliveryArea)}
                        aria-describedby={
                          errors.deliveryArea ? 'area-error' : undefined
                        }
                        className={`w-full pl-11 pr-10 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm bg-white border text-[#173F32] focus:outline-none focus:ring-2 appearance-none transition-all cursor-pointer font-medium ${
                          errors.deliveryArea
                            ? 'border-[#DC2626] focus:ring-[#DC2626]/20 bg-[#FEF2F2]'
                            : 'border-[#E3D8C4] focus:border-[#F47738] focus:ring-[#F47738]/20'
                        }`}
                        disabled={submissionState === 'submitting'}
                      >
                        <option value="" disabled>
                          Select your delivery neighborhood
                        </option>
                        <option value="andheri">
                          Andheri (East / West / SEEPZ)
                        </option>
                        <option value="bandra">
                          Bandra (West / BKC)
                        </option>
                        <option value="powai">
                          Powai (Hiranandani / IIT Area)
                        </option>
                        <option value="lower-parel">
                          Lower Parel (One World / Kamala Mills / Worli)
                        </option>
                        <option value="other">
                          Other (Outside Mumbai Service Areas)
                        </option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#63786F] text-xs">
                        ▼
                      </div>
                    </div>
                    {errors.deliveryArea && (
                      <p
                        id="area-error"
                        className="flex items-center gap-1.5 text-xs text-[#DC2626] font-semibold mt-1.5 pl-1"
                        role="alert"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.deliveryArea}</span>
                      </p>
                    )}
                  </div>

                  {/* Out-of-Area Notice & Expansion Interest */}
                  {isOutOfArea && (
                    <div className="p-4 rounded-2xl bg-[#FFF7E8] border border-[#F47738]/40 text-left space-y-2.5 transition-all">
                      <div className="flex items-start gap-2.5">
                        <Info className="w-5 h-5 text-[#F47738] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-[#173F32]">
                            We&apos;re not delivering to your area yet
                          </h4>
                          <p className="text-xs text-[#334A40] leading-relaxed mt-0.5">
                            We currently deliver in <strong>Andheri, Bandra, Powai, and Lower Parel</strong>.
                            Leave your details to express interest in future expansion!
                          </p>
                        </div>
                      </div>

                      <div className="pt-1">
                        <label
                          htmlFor="trial-customAreaNotes"
                          className="block text-[11px] font-bold text-[#63786F] uppercase tracking-wider mb-1"
                        >
                          Your Locality / Pin Code (Optional)
                        </label>
                        <input
                          id="trial-customAreaNotes"
                          name="customAreaNotes"
                          type="text"
                          value={formData.customAreaNotes || ''}
                          onChange={(e) =>
                            handleInputChange('customAreaNotes', e.target.value)
                          }
                          placeholder="e.g. Malad West, 400064"
                          className="w-full px-3.5 py-2 rounded-lg text-xs bg-white border border-[#E3D8C4] text-[#173F32] placeholder-[#7E9287] focus:outline-none focus:border-[#F47738]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Field 4: Meal Preference (Veg vs. Non-Veg) */}
                  <div className="form-field-group">
                    <label className="block text-xs font-bold text-[#173F32] uppercase tracking-wider mb-2">
                      Meal Preference <span className="text-[#F47738]">*</span>
                    </label>
                    <div
                      className="grid grid-cols-2 gap-3"
                      role="radiogroup"
                      aria-label="Meal Preference"
                    >
                      <button
                        ref={vegBtnRef}
                        type="button"
                        role="radio"
                        aria-checked={formData.foodPreference === 'veg'}
                        onClick={() => handleInputChange('foodPreference', 'veg')}
                        className={`flex items-center justify-center gap-2 p-3 sm:p-3.5 rounded-xl border-2 font-bold text-xs sm:text-sm transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D32] ${
                          formData.foodPreference === 'veg'
                            ? 'border-[#2E7D32] bg-[#E8F5E9] text-[#1B5E20] shadow-xs'
                            : 'border-[#E3D8C4] bg-white text-[#334A40] hover:border-[#173F32]'
                        }`}
                        disabled={submissionState === 'submitting'}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32]" />
                        <span>Vegetarian</span>
                      </button>

                      <button
                        type="button"
                        role="radio"
                        aria-checked={formData.foodPreference === 'non-veg'}
                        onClick={() =>
                          handleInputChange('foodPreference', 'non-veg')
                        }
                        className={`flex items-center justify-center gap-2 p-3 sm:p-3.5 rounded-xl border-2 font-bold text-xs sm:text-sm transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] ${
                          formData.foodPreference === 'non-veg'
                            ? 'border-[#C2410C] bg-[#FFEDD5] text-[#9A3412] shadow-xs'
                            : 'border-[#E3D8C4] bg-white text-[#334A40] hover:border-[#173F32]'
                        }`}
                        disabled={submissionState === 'submitting'}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-[#C2410C]" />
                        <span>Non-Vegetarian</span>
                      </button>
                    </div>
                    {errors.foodPreference && (
                      <p
                        className="flex items-center gap-1.5 text-xs text-[#DC2626] font-semibold mt-1.5 pl-1"
                        role="alert"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.foodPreference}</span>
                      </p>
                    )}
                  </div>

                  {/* Field 5: Preferred Delivery Date (Hidden if Out of Area) */}
                  {!isOutOfArea && (
                    <div className="form-field-group">
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="trial-deliveryDate"
                          className="block text-xs font-bold text-[#173F32] uppercase tracking-wider"
                        >
                          Preferred Date (Mon–Sat) <span className="text-[#F47738]">*</span>
                        </label>
                        <span className="text-[11px] font-semibold text-[#63786F]">
                          Mon – Sat only • No Sundays
                        </span>
                      </div>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#63786F] pointer-events-none" />
                        <input
                          ref={dateInputRef}
                          id="trial-deliveryDate"
                          name="deliveryDate"
                          type="date"
                          min={minDate}
                          max={maxDate}
                          value={formData.deliveryDate || minDate}
                          onChange={(e) =>
                            handleInputChange('deliveryDate', e.target.value)
                          }
                          aria-required="true"
                          aria-invalid={Boolean(errors.deliveryDate)}
                          aria-describedby={
                            errors.deliveryDate ? 'date-error' : undefined
                          }
                          className={`w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm bg-white border text-[#173F32] focus:outline-none focus:ring-2 transition-all cursor-pointer font-medium ${
                            errors.deliveryDate
                              ? 'border-[#DC2626] focus:ring-[#DC2626]/20 bg-[#FEF2F2]'
                              : 'border-[#E3D8C4] focus:border-[#F47738] focus:ring-[#F47738]/20'
                          }`}
                          disabled={submissionState === 'submitting'}
                        />
                      </div>
                      {errors.deliveryDate && (
                        <p
                          id="date-error"
                          className="flex items-center gap-1.5 text-xs text-[#DC2626] font-semibold mt-1.5 pl-1"
                          role="alert"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.deliveryDate}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Primary CTA Submit Button */}
                  <div className="pt-2 form-field-group">
                    <button
                      type="submit"
                      disabled={submissionState === 'submitting'}
                      className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-[#F47738] hover:bg-[#E06324] text-white font-extrabold text-sm sm:text-base shadow-[0_4px_14px_rgba(244,119,56,0.35)] hover:shadow-[0_6px_20px_rgba(244,119,56,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-60 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F47738] focus-visible:ring-offset-2"
                    >
                      {submissionState === 'submitting' ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>
                            {isOutOfArea
                              ? 'Registering Interest...'
                              : 'Booking Your Trial...'}
                          </span>
                        </span>
                      ) : (
                        <>
                          <span>
                            {isOutOfArea
                              ? 'Register Expansion Interest'
                              : 'Book My Free Trial'}
                          </span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-center text-xs text-[#63786F] font-semibold mt-3">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Zero credit card required • No hidden charges</span>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
