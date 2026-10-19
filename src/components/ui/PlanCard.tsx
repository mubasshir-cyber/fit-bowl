'use client';

import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { SubscriptionPlan, PlanId } from '@/types/pricing';
import { smoothScrollTo } from '@/utils/scroll';

interface PlanCardProps {
  plan: SubscriptionPlan;
  onSelectPlan?: (planId: PlanId) => void;
  popularBadgeRef?: React.RefObject<HTMLDivElement | null>;
}

export function PlanCard({ plan, onSelectPlan, popularBadgeRef }: PlanCardProps) {
  const handleSelect = () => {
    if (onSelectPlan) {
      onSelectPlan(plan.id);
    } else {
      smoothScrollTo('#trial-form');
    }
  };

  const isPopular = Boolean(plan.isPopular);

  const ctaLabel =
    plan.id === 'starter'
      ? 'Choose Starter'
      : plan.id === 'regular'
      ? 'Choose Regular'
      : 'Choose Pro';

  return (
    <div
      className={`relative flex flex-col justify-between rounded-[26px] p-6 sm:p-7 md:p-6 xl:p-8 h-full transition-colors duration-300 ${
        isPopular
          ? 'bg-white border-2 border-[#F47738] shadow-xl md:shadow-2xl pricing-card-regular z-10'
          : 'bg-[#FCFBF8] border border-[#E3D8C4] shadow-md pricing-card-standard'
      }`}
    >
      {/* MOST POPULAR Pill Badge floating above the card */}
      {isPopular && (
        <div
          ref={popularBadgeRef}
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <span className="inline-block bg-[#F47738] text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-sm whitespace-nowrap">
            MOST POPULAR
          </span>
        </div>
      )}

      <div>
        {/* Plan Header */}
        <div className="pb-4 border-b border-[#E3D8C4]/60">
          <h3 className="text-2xl sm:text-[26px] font-black text-[#173F32] font-bricolage tracking-tight">
            {plan.name}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-[#63786F] mt-1">
            {plan.mealsPerMonth} meals/month
          </p>
        </div>

        {/* Pricing Block */}
        <div className="py-4 sm:py-5 border-b border-[#E3D8C4]/60">
          <div className="flex items-baseline gap-1">
            <span
              className={`text-3xl sm:text-4xl font-black font-bricolage tracking-tight ${
                isPopular ? 'text-[#F47738]' : 'text-[#173F32]'
              }`}
            >
              ₹{plan.totalPrice.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-[#63786F] mt-1">
            ₹{plan.pricePerMeal} per meal
          </p>
        </div>

        {/* Features Checklist */}
        <ul className="py-4 sm:py-5 space-y-3 sm:space-y-3.5" aria-label={`${plan.name} plan features`}>
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334A40]">
              <div
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  isPopular
                    ? 'bg-[#F47738] text-white shadow-xs'
                    : 'bg-[#DCEBCF] text-[#173F32]'
                }`}
                aria-hidden="true"
              >
                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
              </div>
              <span className="leading-snug font-medium text-[#294237]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Plan Action CTA */}
      <div className="pt-4 mt-auto">
        <button
          type="button"
          onClick={handleSelect}
          aria-label={`${ctaLabel} for ₹${plan.totalPrice.toLocaleString('en-IN')}`}
          className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-sm transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 select-none ${
            isPopular
              ? 'bg-[#F47738] hover:bg-[#E06324] text-white shadow-md hover:shadow-lg focus-visible:ring-[#F47738]'
              : 'border border-[#173F32]/20 text-[#173F32] bg-[#FFF7E8]/75 hover:bg-[#173F32] hover:text-[#FFF7E8] hover:border-[#173F32] focus-visible:ring-[#173F32]'
          }`}
        >
          <span>{ctaLabel}</span>
          <ArrowRight
            className={`w-4 h-4 transition-transform duration-200 ${
              isPopular ? 'group-hover:translate-x-1.5' : 'group-hover:translate-x-1'
            }`}
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}
