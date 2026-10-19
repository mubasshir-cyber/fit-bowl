'use client';

import React from 'react';
import Image from 'next/image';
import { Plus, Flame, Dumbbell } from 'lucide-react';
import { BowlItem } from '@/types/menu';
import { Badge } from './Badge';

interface BowlCardProps {
  bowl: BowlItem;
  onOpenDetails: (bowl: BowlItem) => void;
  priority?: boolean;
}

export function BowlCard({ bowl, onOpenDetails, priority = false }: BowlCardProps) {
  const isVeg = bowl.type === 'veg';

  const handleClick = () => {
    onOpenDetails(bowl);
  };

  return (
    <article
      data-bowl-card
      className="group relative flex flex-col justify-between bg-white rounded-3xl border border-[#E3D8C4] shadow-[0_4px_20px_rgba(23,63,50,0.04)] hover:shadow-[0_20px_40px_rgba(23,63,50,0.1)] hover:border-[#173F32]/30 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-pointer h-full"
      onClick={handleClick}
    >
      <div>
        {/* Bowl Image Window */}
        <div className="relative w-full h-52 sm:h-56 bg-[#F3EAD8] overflow-hidden">
          <Image
            src={bowl.image}
            alt={`${bowl.name} - ${isVeg ? 'Vegetarian' : 'Non-Vegetarian'} Healthy Meal Bowl`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
            className="object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
          />

          {/* Subtle gradient vignette at bottom of photo */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

          {/* Badges Overlaid on Image */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
            <Badge variant={isVeg ? 'veg' : 'non-veg'}>
              {isVeg ? 'Veg' : 'Non-Veg'}
            </Badge>

            {bowl.isFridayOnly && (
              <Badge variant="friday">Fridays Only</Badge>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col space-y-3">
          {/* Bowl Name */}
          <h3 className="font-heading text-lg sm:text-[19px] font-black text-[#173F32] group-hover:text-[#F47738] transition-colors duration-200 line-clamp-1 leading-snug tracking-tight">
            {bowl.name}
          </h3>

          {/* Nutrition Badges */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#173F32] bg-[#173F32]/6 px-2.5 py-0.5 rounded-full">
              <Flame className="w-3.5 h-3.5 text-[#F47738]" aria-hidden="true" />
              {bowl.nutrition.calories} kcal
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#173F32] bg-[#173F32]/6 px-2.5 py-0.5 rounded-full">
              <Dumbbell className="w-3.5 h-3.5 text-[#173F32]" aria-hidden="true" />
              {bowl.nutrition.protein}g protein
            </span>
          </div>

          {/* Original Ingredient Description */}
          <p className="text-xs sm:text-[13px] text-[#4A6356] leading-relaxed line-clamp-2 min-h-[38px] font-medium">
            {bowl.ingredients}
          </p>

          {/* Compact Ingredient Visual Chips */}
          {bowl.ingredientList && (
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5" aria-label="Key Ingredients">
              {bowl.ingredientList.slice(0, 3).map((ing) => (
                <span
                  key={ing}
                  className="inline-flex items-center text-[10.5px] font-semibold text-[#173F32]/85 bg-[#FFF7E8] border border-[#E3D8C4] px-2 py-0.5 rounded-md"
                >
                  {ing}
                </span>
              ))}
              {bowl.ingredientList.length > 3 && (
                <span className="text-[10px] font-bold text-[#63786F] self-center">
                  +{bowl.ingredientList.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Card Action Row */}
      <div className="px-5 pb-5 pt-3 border-t border-[#E3D8C4]/60 flex items-center justify-between mt-auto">
        <span className="text-[11px] font-extrabold text-[#63786F] uppercase tracking-wider">
          {isVeg ? '100% Plant & Dairy' : 'Lean Animal Protein'}
        </span>

        {/* Circular Plus Button for Details Dialog */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(bowl);
          }}
          className="w-9 h-9 rounded-full bg-[#FFF7E8] text-[#173F32] border border-[#E3D8C4] hover:bg-[#F47738] hover:text-white hover:border-[#F47738] flex items-center justify-center transition-all duration-200 shadow-2xs active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F32] group/btn cursor-pointer"
          title={`View full nutrition and ingredients for ${bowl.name}`}
          aria-label={`View full nutrition and ingredients for ${bowl.name}`}
        >
          <Plus className="w-4 h-4 transition-transform duration-200 group-hover/btn:rotate-90" />
        </button>
      </div>
    </article>
  );
}
