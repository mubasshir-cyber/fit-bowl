'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { FAQItem } from '@/types/feedback';

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div
      className={`rounded-2xl transition-all duration-300 border ${
        isOpen
          ? 'bg-[#FFFDF9] border-[#173F32]/35 shadow-xs ring-1 ring-[#173F32]/10'
          : 'bg-[#FAF7F2] hover:bg-[#F4EFE6] border-[#E8DFC7] hover:border-[#D5CABB]'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left p-3.5 sm:p-4 rounded-2xl group cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47738] focus-visible:ring-offset-1"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-question-${item.id}`}
      >
        <span className="text-xs sm:text-[13.5px] lg:text-[14px] font-bold text-[#173F32] group-hover:text-[#F47738] transition-colors pr-2 leading-snug font-bricolage">
          {item.question}
        </span>
        <span
          className={`w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen
              ? 'bg-[#F47738] text-white rotate-45 shadow-sm'
              : 'bg-white text-[#173F32] border border-[#E3D8C4] group-hover:border-[#173F32] group-hover:bg-[#FFF7E8]'
          }`}
          aria-hidden="true"
        >
          <Plus className="w-3 h-3 stroke-[2.5]" />
        </span>
      </button>

      <div
        id={`faq-answer-${item.id}`}
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 px-3.5 sm:px-4 pb-3.5' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-2 border-t border-[#E8DFC7]/70 text-xs sm:text-[13px] text-[#334A40] leading-relaxed font-medium flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F47738] mt-1.5 shrink-0" aria-hidden="true" />
            <span>{item.answer}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
