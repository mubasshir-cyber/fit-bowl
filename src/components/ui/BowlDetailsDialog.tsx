'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Flame, Dumbbell, Sparkles, Wheat, Droplets, CheckCircle, ArrowRight } from 'lucide-react';
import { BowlItem } from '@/types/menu';
import { Badge } from './Badge';

interface BowlDetailsDialogProps {
  bowl: BowlItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectForTrial: (bowl: BowlItem) => void;
}

export function BowlDetailsDialog({
  bowl,
  isOpen,
  onClose,
  onSelectForTrial,
}: BowlDetailsDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape & Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Stop Lenis smooth scroll and lock body/html overflow
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    lenis?.stop();

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    // Auto-focus close button
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      lenis?.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !bowl) return null;

  const isVeg = bowl.type === 'veg';

  const handleClaim = () => {
    onSelectForTrial(bowl);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0F2C23]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Surface */}
      <div
        ref={dialogRef}
        data-lenis-prevent="true"
        className="relative bg-white rounded-3xl sm:rounded-[28px] border border-[#E3D8C4] shadow-2xl w-full max-w-2xl overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200 overscroll-contain"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-md border border-[#E3D8C4] text-[#173F32] hover:bg-[#F47738] hover:text-white hover:border-[#F47738] flex items-center justify-center transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F32]"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Media Window Header */}
        <div className="relative w-full h-56 sm:h-72 bg-[#F3EAD8] overflow-hidden">
          <Image
            src={bowl.image}
            alt={bowl.name}
            fill
            sizes="(max-width: 640px) 100vw, 672px"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Badges Overlaid */}
          <div className="absolute bottom-4 left-4 sm:left-6 flex flex-wrap items-center gap-2 z-10">
            <Badge variant={isVeg ? 'veg' : 'non-veg'}>
              {isVeg ? '100% Vegetarian' : 'Non-Vegetarian'}
            </Badge>

            {bowl.isFridayOnly && (
              <Badge variant="friday">Available Fridays Only</Badge>
            )}

            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-[#173F32]/80 text-[#FFF7E8] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#F47738]" />
              {isVeg ? 'Plant & Dairy' : 'Lean Animal Protein'}
            </span>
          </div>
        </div>

        {/* Dialog Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title & Tagline */}
          <div>
            <h2
              id="dialog-title"
              className="font-heading text-2xl sm:text-3xl font-black text-[#173F32] tracking-tight leading-snug"
            >
              {bowl.name}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#334A40] leading-relaxed">
              {bowl.detailedDescription || bowl.ingredients}
            </p>
          </div>

          {/* Macro Nutrition Grid */}
          <div className="bg-[#FFF7E8] rounded-2xl p-4 sm:p-5 border border-[#E3D8C4]">
            <p className="text-xs font-black uppercase tracking-wider text-[#173F32]/70 mb-3">
              Macro Nutritional Breakdown (Per Bowl)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl p-3 border border-[#E3D8C4]/60 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FFEDD5] text-[#F47738] flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#63786F] font-semibold">Calories</div>
                  <div className="text-sm sm:text-base font-black text-[#173F32]">
                    {bowl.nutrition.calories} kcal
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 border border-[#E3D8C4]/60 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#DCEBCF] text-[#173F32] flex items-center justify-center shrink-0">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#63786F] font-semibold">Protein</div>
                  <div className="text-sm sm:text-base font-black text-[#173F32]">
                    {bowl.nutrition.protein}g
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 border border-[#E3D8C4]/60 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FFF7E8] text-[#9A3412] flex items-center justify-center shrink-0 border border-[#E3D8C4]">
                  <Wheat className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#63786F] font-semibold">Carbs</div>
                  <div className="text-sm sm:text-base font-black text-[#173F32]">
                    {bowl.nutrition.carbs || 45}g
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 border border-[#E3D8C4]/60 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center shrink-0">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#63786F] font-semibold">Healthy Fats</div>
                  <div className="text-sm sm:text-base font-black text-[#173F32]">
                    {bowl.nutrition.fats || 16}g
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Ingredients */}
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-[#173F32]/70 mb-2.5">
              Key Ingredients
            </p>
            <div className="flex flex-wrap gap-2">
              {(bowl.ingredientList || bowl.ingredients.split(',')).map((ing, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#173F32] bg-white border border-[#E3D8C4] shadow-2xs"
                >
                  <CheckCircle className="w-3 h-3 text-[#2E7D32]" />
                  {ing.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Dialog Action Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleClaim}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#F47738] text-white font-extrabold text-sm sm:text-base shadow-[0_4px_16px_rgba(244,119,56,0.32)] hover:bg-[#E06324] hover:shadow-[0_6px_22px_rgba(244,119,56,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F32] transition-all cursor-pointer group"
            >
              <span>Choose This Bowl for Your Free Trial</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#E3D8C4] text-[#173F32] font-bold text-sm hover:bg-[#FFF7E8] transition-colors cursor-pointer"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
