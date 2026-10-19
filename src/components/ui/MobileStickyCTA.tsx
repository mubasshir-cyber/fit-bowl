'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { smoothScrollTo } from '@/utils/scroll';

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const trialSection = document.getElementById('trial-form');

      // Only show after scrolling past hero (~350px)
      if (scrollY < 350) {
        setIsVisible(false);
        return;
      }

      // If trial section is in viewport or close to it, hide sticky CTA to prevent redundancy
      if (trialSection) {
        const rect = trialSection.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInViewport) {
          setIsVisible(false);
          return;
        }
      }

      setIsVisible(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTrial = () => {
    smoothScrollTo('#trial-form');
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Quick Action Bar"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-[#E3D8C4] px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom"
    >
      <div className="flex items-center gap-3">
        <Button
          variant="primary"
          size="md"
          onClick={scrollToTrial}
          className="w-full justify-center font-extrabold shadow-lg flex items-center gap-2 py-3 rounded-full text-sm bg-[#F47738] hover:bg-[#E06324]"
        >
          <span>Book My Free Trial Meal</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </aside>
  );
}
