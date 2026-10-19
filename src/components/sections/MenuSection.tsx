'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X, UtensilsCrossed, ArrowRight, ChevronUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { BowlCard } from '../ui/BowlCard';
import { BowlDetailsDialog } from '../ui/BowlDetailsDialog';
import { FreeTrialCtaStrip } from '../ui/FreeTrialCtaStrip';
import { BOWLS_DATA } from '@/data/bowls';
import { BowlItem, MenuFilterType } from '@/types/menu';
import { smoothScrollTo } from '@/utils/scroll';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function MenuSection() {
  const [activeFilter, setActiveFilter] = useState<MenuFilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedBowl, setSelectedBowl] = useState<BowlItem | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const viewAllBtnRef = useRef<HTMLButtonElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsAnimationRef = useRef<gsap.core.Tween | null>(null);

  // Filter and search logic with smart multi-word matching
  const filteredBowls = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const queryWords = query.split(/\s+/).filter(Boolean);

    return BOWLS_DATA.filter((bowl) => {
      // Dietary filter check
      const matchesFilter =
        activeFilter === 'all' ? true : bowl.type === activeFilter;

      if (queryWords.length === 0) {
        return matchesFilter;
      }

      // Multi-word searchable index: name, ingredients, detailed description, key ingredients, type, availability
      const searchableText = [
        bowl.name,
        bowl.ingredients,
        bowl.detailedDescription || '',
        ...(bowl.ingredientList || []),
        bowl.type,
        bowl.type === 'veg' ? 'veg vegetarian plant' : 'non-veg nonveg non-vegetarian chicken meat fish egg mutton keema',
        bowl.isFridayOnly ? 'friday fridays' : '',
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch = queryWords.every((word) =>
        searchableText.includes(word)
      );

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  // Total matches across all bowls regardless of active category filter (for empty state recommendations)
  const globalSearchMatches = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return BOWLS_DATA.length;
    const queryWords = query.split(/\s+/).filter(Boolean);
    return BOWLS_DATA.filter((bowl) => {
      const text = [
        bowl.name,
        bowl.ingredients,
        bowl.detailedDescription || '',
        ...(bowl.ingredientList || []),
        bowl.type,
        bowl.type === 'veg' ? 'veg vegetarian plant' : 'non-veg nonveg non-vegetarian chicken meat fish egg mutton keema',
        bowl.isFridayOnly ? 'friday fridays' : '',
      ]
        .join(' ')
        .toLowerCase();
      return queryWords.every((w) => text.includes(w));
    }).length;
  }, [searchQuery]);

  const isSearching = searchQuery.trim() !== '';

  // Displayed bowls:
  // - When searching: show ALL matching bowls so user never misses a result
  // - When expanded: show ALL matching bowls in current filter
  // - Default: show 4 bowls
  const displayedBowls = useMemo(() => {
    if (isSearching || isExpanded) {
      return filteredBowls;
    }
    return filteredBowls.slice(0, 4);
  }, [filteredBowls, isSearching, isExpanded]);

  const vegCount = BOWLS_DATA.filter((b) => b.type === 'veg').length;
  const nonVegCount = BOWLS_DATA.filter((b) => b.type === 'non-veg').length;

  // Header entrance GSAP animation
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(
          [
            eyebrowRef.current,
            headingRef.current,
            copyRef.current,
            viewAllBtnRef.current,
            controlsRef.current,
          ],
          { opacity: 1, y: 0, clipPath: 'none' }
        );
        return;
      }

      // Initial states
      gsap.set(eyebrowRef.current, { opacity: 0, y: 14 });
      gsap.set(headingRef.current, { clipPath: 'inset(0 0 100% 0)', y: 8 });
      gsap.set(copyRef.current, { opacity: 0, y: 10 });
      gsap.set(viewAllBtnRef.current, { opacity: 0, y: 8 });
      gsap.set(controlsRef.current, { opacity: 0, y: 14 });

      const headerTL = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      headerTL
        .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.45 })
        .to(headingRef.current, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.55 }, '-=0.2')
        .to(copyRef.current, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3')
        .to(viewAllBtnRef.current, { opacity: 1, y: 0, duration: 0.35 }, '-=0.25')
        .to(controlsRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.35');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Cards enter sequentially when the category or visible result count changes.
  // Search typing stays immediate so results don't flicker while the user types.
  const prevFilterRef = useRef(activeFilter);
  const prevExpandedRef = useRef(isExpanded);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !gridRef.current) return;

    const filterChanged = prevFilterRef.current !== activeFilter;
    const expandChanged = prevExpandedRef.current !== isExpanded;
    prevFilterRef.current = activeFilter;
    prevExpandedRef.current = isExpanded;

    // Skip heavy stagger on keystrokes so typing in the search bar is instant and fluid
    if (!filterChanged && !expandChanged) {
      return;
    }

    cardsAnimationRef.current?.kill();
    const cards = Array.from(gridRef.current.querySelectorAll('[data-bowl-card]'));
    if (cards.length === 0) return;

    cardsAnimationRef.current = gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 14, transition: 'none', willChange: 'opacity, transform' },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.52,
        stagger: { each: 0.09, from: 'start' },
        ease: 'power3.out',
        overwrite: 'auto',
        clearProps: 'opacity,visibility,transform,transition,willChange',
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      }
    );

    return () => {
      cardsAnimationRef.current?.kill();
      cardsAnimationRef.current = null;
    };
  }, [activeFilter, isExpanded]);

  // Synchronize ScrollTrigger coordinates and Lenis bounds whenever menu height changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.refresh();
        const lenis = (window as unknown as { lenis?: { resize: () => void } }).lenis;
        lenis?.resize();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isExpanded, displayedBowls.length]);

  const handleOpenDetails = (bowl: BowlItem) => {
    setSelectedBowl(bowl);
  };

  const handleSelectForTrial = (_bowl: BowlItem) => {
    void _bowl;
    setSelectedBowl(null);
    smoothScrollTo('#trial-form');
  };

  const handleResetFilters = () => {
    setActiveFilter('all');
    setSearchQuery('');
    setIsExpanded(false);
  };

  const handleToggleExpand = () => {
    if (isExpanded) {
      setIsExpanded(false);
      smoothScrollTo('#menu');
    } else {
      setIsExpanded(true);
      // Clear search if user explicitly requests to browse all
      if (searchQuery) {
        setSearchQuery('');
      }
    }
  };

  return (
    <section
      id="menu"
      ref={sectionRef}
      aria-labelledby="menu-heading"
      className="pt-8 sm:pt-10 lg:pt-12 pb-10 sm:pb-12 lg:pb-14 relative overflow-hidden"
    >
      {/* Subtle Restrained Botanical Edge Accents */}
      <div
        className="absolute -top-10 right-0 w-72 h-72 pointer-events-none opacity-20 select-none -z-10"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full text-[#173F32] fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M40,160 C50,110 80,70 140,40 C120,90 90,130 40,160 Z" opacity="0.35" />
          <path d="M70,180 C90,130 130,100 180,80 C150,130 110,160 70,180 Z" opacity="0.25" />
          <path d="M20,130 C40,90 70,60 120,40 C90,80 60,110 20,130 Z" opacity="0.2" />
        </svg>
      </div>
      <div
        className="absolute bottom-12 -left-16 w-72 h-72 pointer-events-none opacity-20 select-none -z-10"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full text-[#173F32] fill-current -scale-x-100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M40,160 C50,110 80,70 140,40 C120,90 90,130 40,160 Z" opacity="0.35" />
          <path d="M70,180 C90,130 130,100 180,80 C150,130 110,160 70,180 Z" opacity="0.25" />
        </svg>
      </div>

      <Container>
        {/* Header Row: Left Title + Button & Right Filters + Search */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          {/* Left: Kicker, Title, Subtitle, and View All / Show 4 Toggle */}
          <div className="flex flex-col items-start space-y-3 max-w-xl text-left">
            <div ref={eyebrowRef}>
              <Badge variant="kicker">OUR MENU</Badge>
            </div>

            <div className="overflow-hidden">
              <h2
                id="menu-heading"
                ref={headingRef}
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#173F32] tracking-tight leading-tight"
              >
                Explore Our <span className="text-[#F47738]">14 Bowls</span>
              </h2>
            </div>

            <p
              ref={copyRef}
              className="text-base text-[#334A40] font-medium leading-relaxed"
            >
              From Indian classics to global flavours, there&apos;s a chef-crafted
              macro-balanced bowl for every mood.
            </p>

            {/* Operational note from client brief: Monday rotation & daily slots */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#173F32] bg-[#DCEBCF]/60 px-3.5 py-1.5 rounded-full border border-[#DCEBCF] shadow-2xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F47738] shrink-0" />
                Menu changes every Monday
              </span>
              <span className="text-[#63786F] hidden sm:inline">•</span>
              <span className="text-[#334A40] font-semibold">
                Delivery slots: Lunch 12–2 pm, Dinner 7–9 pm
              </span>
            </div>

            {/* Toggle Button: View All 14 Bowls vs Show Less (4 Bowls) */}
            <button
              ref={viewAllBtnRef}
              type="button"
              onClick={handleToggleExpand}
              aria-expanded={isExpanded}
              aria-label={
                isExpanded
                  ? 'Show 4 featured bowls'
                  : `View all ${filteredBowls.length} bowls`
              }
              className="mt-1 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E3D8C4] hover:border-[#173F32] text-[#173F32] font-extrabold text-xs sm:text-sm shadow-2xs transition-all hover:bg-[#FFF7E8] cursor-pointer group"
            >
              <span>
                {isExpanded
                  ? 'Show Less (4 Bowls)'
                  : `View All ${filteredBowls.length} Bowls`}
              </span>
              {isExpanded ? (
                <ChevronUp
                  className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5 text-[#F47738]"
                  aria-hidden="true"
                />
              ) : (
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-[#F47738]"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>

          {/* Right: Dietary Segmented Tabs & Live Search Bar */}
          <div
            ref={controlsRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto"
          >
            {/* Dietary Tabs */}
            <div
              role="tablist"
              aria-label="Filter menu by dietary preference"
              className="grid w-full grid-cols-3 items-stretch gap-1 p-1 bg-white rounded-2xl border border-[#E3D8C4] shadow-2xs sm:flex sm:w-auto sm:items-center"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === 'all'}
                onClick={() => setActiveFilter('all')}
                className={`flex min-w-0 items-center justify-center whitespace-nowrap text-[11px] sm:block sm:text-sm font-black px-1.5 sm:px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-[#173F32] text-white shadow-xs'
                    : 'text-[#334A40] hover:text-[#173F32]'
                }`}
              >
                All ({BOWLS_DATA.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === 'veg'}
                onClick={() => setActiveFilter('veg')}
                className={`flex min-w-0 items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap text-[11px] sm:text-sm font-black px-1.5 sm:px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                  activeFilter === 'veg'
                    ? 'bg-[#173F32] text-white shadow-xs'
                    : 'text-[#1B5E20] hover:bg-[#E8F5E9]'
                }`}
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#2E7D32] shrink-0" aria-hidden="true" />
                Veg ({vegCount})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === 'non-veg'}
                onClick={() => setActiveFilter('non-veg')}
                className={`flex min-w-0 items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap text-[11px] sm:text-sm font-black px-1.5 sm:px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                  activeFilter === 'non-veg'
                    ? 'bg-[#173F32] text-white shadow-xs'
                    : 'text-[#9A3412] hover:bg-[#FFEDD5]'
                }`}
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#C2410C] shrink-0" aria-hidden="true" />
                Non-Veg ({nonVegCount})
              </button>
            </div>

            {/* Responsive Live Search Input Box */}
            <div className="relative w-full sm:w-64 lg:w-72">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#63786F] pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bowls, ingredients..."
                aria-label="Search bowls by name, ingredients, or flavours"
                className="w-full pl-9 pr-9 py-2.5 text-xs sm:text-sm bg-white rounded-2xl border border-[#E3D8C4] text-[#173F32] placeholder-[#63786F] focus:outline-none focus:border-[#F47738] focus:ring-2 focus:ring-[#F47738]/15 shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#63786F] hover:text-[#173F32] p-1 cursor-pointer rounded-full hover:bg-black/5 transition-colors"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Live Search Active Feedback */}
        {isSearching && (
          <div className="flex items-center justify-between bg-white/80 border border-[#E3D8C4] rounded-2xl px-4 py-2.5 mb-6 shadow-2xs">
            <p className="text-xs sm:text-sm text-[#334A40] font-medium">
              Showing <span className="font-bold text-[#173F32]">{displayedBowls.length}</span> matching bowl{displayedBowls.length === 1 ? '' : 's'} for &ldquo;<span className="font-bold text-[#F47738]">{searchQuery}</span>&rdquo;
              {activeFilter !== 'all' && (
                <span className="text-[#63786F]"> in {activeFilter === 'veg' ? 'Veg' : 'Non-Veg'}</span>
              )}
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs font-extrabold text-[#F47738] hover:text-[#D95F20] hover:underline cursor-pointer flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Clear Search
            </button>
          </div>
        )}

        {/* Live Filter Result Status for Assistive Tech */}
        <p className="sr-only" aria-live="polite">
          Showing {displayedBowls.length} of {filteredBowls.length} matching bowls.
        </p>

        {/* Bowls Grid or Empty State */}
        {displayedBowls.length > 0 ? (
          <>
            <div
              id="menu-grid"
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 scroll-mt-24"
            >
              {displayedBowls.map((bowl, index) => (
                <BowlCard
                  key={bowl.id}
                  bowl={bowl}
                  onOpenDetails={handleOpenDetails}
                  priority={index < 4}
                />
              ))}
            </div>

            {/* Bottom Collapse Button when expanded */}
            {isExpanded && !isSearching && filteredBowls.length > 4 && (
              <div className="flex justify-center mt-10">
                <button
                  type="button"
                  onClick={handleToggleExpand}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#E3D8C4] hover:border-[#173F32] text-[#173F32] font-extrabold text-xs sm:text-sm shadow-2xs transition-all hover:bg-[#FFF7E8] cursor-pointer group"
                >
                  <span>Show Less (Show 4 Bowls)</span>
                  <ChevronUp
                    className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5 text-[#F47738]"
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty Search Results State */
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white/70 rounded-3xl border border-[#E3D8C4]">
            <div className="w-16 h-16 rounded-full bg-[#DCEBCF]/70 text-[#173F32] flex items-center justify-center mb-4">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#173F32] mb-1">
              No matching bowls found
            </h3>
            <p className="text-sm text-[#63786F] max-w-md mb-5 font-medium leading-relaxed">
              We couldn&apos;t find any {activeFilter !== 'all' ? `${activeFilter} ` : ''}bowls matching &ldquo;{searchQuery}&rdquo;.
              {globalSearchMatches > 0 && activeFilter !== 'all' && (
                <span className="block mt-2 font-semibold text-[#173F32]">
                  Good news: {globalSearchMatches} matching bowl{globalSearchMatches > 1 ? 's are' : ' is'} available in the other category!
                </span>
              )}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {globalSearchMatches > 0 && activeFilter !== 'all' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveFilter('all')}
                >
                  View All Matching Bowls ({globalSearchMatches})
                </Button>
              )}
              <Button variant="secondary" size="sm" onClick={handleResetFilters}>
                Reset Filters & Search
              </Button>
            </div>
          </div>
        )}

        {/* Redesigned Editorial Free Trial CTA Strip */}
        <FreeTrialCtaStrip className="mt-14 sm:mt-16" />
      </Container>

      {/* Accessible Interactive Bowl Details Modal Dialog */}
      <BowlDetailsDialog
        bowl={selectedBowl}
        isOpen={Boolean(selectedBowl)}
        onClose={() => setSelectedBowl(null)}
        onSelectForTrial={handleSelectForTrial}
      />
    </section>
  );
}
