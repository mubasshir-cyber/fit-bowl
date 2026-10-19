# FitBowl — Development Roadmap & Phase Implementation Plan

**Document Version:** 1.0.0  
**Document Status:** Approved for Implementation  
**Last Updated:** 2026-10-18  
**Author:** Lead Technical Program Manager & Senior Software Architect  
**Deadline:** 48-Hour Assignment Window (Target: 6–8 Active Engineering Hours)  
**Cross-References:** [brd.md](file:///e:/company/practice/fitbowl/docs/brd.md), [frd.md](file:///e:/company/practice/fitbowl/docs/frd.md), [architecture.md](file:///e:/company/practice/fitbowl/docs/architecture.md), [ui-ux-specification.md](file:///e:/company/practice/fitbowl/docs/ui-ux-specification.md), [wireframe.md](file:///e:/company/practice/fitbowl/docs/wireframe.md), [rule.md](file:///e:/company/practice/fitbowl/docs/rule.md), [seo.md](file:///e:/company/practice/fitbowl/docs/seo.md)

---

## Table of Contents
1. [Development Principles & Execution Strategy](#1-development-principles--execution-strategy)
2. [Prioritization & Milestone Overview](#2-prioritization--milestone-overview)
3. [Phase 0 — Repository Audit & Planning](#phase-0--repository-audit--planning)
4. [Phase 1 — Project Foundation & Design System](#phase-1--project-foundation--design-system)
5. [Phase 2 — Navbar & Hero Section](#phase-2--navbar--hero-section)
6. [Phase 3 — Menu Catalog & Pricing Plans](#phase-3--menu-catalog--pricing-plans)
7. [Phase 4 — Supporting Content Sections](#phase-4--supporting-content-sections)
8. [Phase 5 — Free Trial Booking & Conversion Flow](#phase-5--free-trial-booking--conversion-flow)
9. [Phase 6 — Animation, Responsive QA, Accessibility & Performance](#phase-6--animation-responsive-qa-accessibility--performance)
10. [Phase 7 — SEO, Testing & Production Polish](#phase-7--seo-testing--production-polish)
11. [Phase 8 — Documentation, Git History & Live Deployment](#phase-8--documentation-git-history--live-deployment)
12. [Comprehensive Release & Verification Checklist](#12-comprehensive-release--verification-checklist)

---

## 1. Development Principles & Execution Strategy

To deliver an exceptional, production-grade landing page within the 48-hour timeline (estimated 6–8 active engineering hours), implementation strictly follows these principles:
- **Design & Content Fidelity:** Build directly from the approved wireframe ([wireframe.md](file:///e:/company/practice/fitbowl/docs/wireframe.md)) and design specification ([ui-ux-specification.md](file:///e:/company/practice/fitbowl/docs/ui-ux-specification.md)) using the official FitBowl logo, Bricolage Grotesque headings, Nunito body text, and the four official brand colors (`#173F32`, `#F47738`, `#FFF7E8`, `#DCEBCF`).
- **Verbatim Source Content:** Use the exact 14 signature bowls (with calories, protein, and Friday rule), the 3 subscription tiers, all 4 customer testimonials, and all 8 FAQs verbatim.
- **Incremental Git Checkpoints:** Every phase concludes with explicit verification commands, tests, and a standardized conventional Git commit.
- **Honest Simulation Transparency:** Clearly disclose that the booking process is a frontend simulation; never mislead users into believing a real order was placed.
- **Strict Verification:** No task or phase may be marked "Completed" without passing actual verification steps.

---

## 2. Prioritization & Milestone Overview

### 2.1 Prioritization Hierarchy
1. **P0 (Mandatory Core):** Foundation, 14 menu bowls, 3 plans, trial booking form with validation, out-of-area waitlist handling, responsive layout.
2. **P1 (High Trust & Conversion):** Testimonials, 8 FAQs, benefits, How It Works, mobile sticky bar, SEO metadata, clean production build.
3. **P2 (Delight & Motion):** Restrained GSAP entrance reveals, hover micro-interactions, reduced-motion adaptations.
4. **P3 (Optional Polish):** Interactive bowl-preference quiz/finder (build only if core schedule permits; must not block delivery).

### 2.2 Milestone Summary Table

| Phase | Title | Priority | Active Effort | Dependencies | Status |
|---|---|---|---|---|---|
| **Phase 0** | Repository Audit & Planning | P0 | 45 min | None | **Completed** |
| **Phase 1** | Foundation & Design System | P0 | 45 min | Phase 0 | **Completed** |
| **Phase 2** | Navbar & Hero Section | P0 | 60 min | Phase 1 | **Completed** |
| **Phase 3** | Menu Catalog & Pricing Plans | P0 | 75 min | Phase 1 | **Completed** |
| **Phase 4** | Supporting Content Sections | P1 | 60 min | Phase 2, 3 | **Completed** |
| **Phase 5** | Free Trial Booking & Conversion | P0 | 75 min | Phase 1, 3 | **Completed** |
| **Phase 6** | Animation, Responsive QA & a11y | P1 | 60 min | Phase 2–5 | **Completed** |
| **Phase 7** | SEO, Testing & Production Polish | P0 | 45 min | Phase 2–6 | **Completed** |
| **Phase 8** | Documentation, Git & Deployment | P0 | 45 min | Phase 7 | **Completed** |
| **Total** | Full Implementation Cycle | — | **~7.5 hours** | — | **Completed** |

---

## Phase 0 — Repository Audit & Planning

### Objective
Inspect the existing codebase, dependencies, assets, and Git history. Confirm technical choices and catalog missing visual assets before writing application code.

### Prerequisites and Dependencies
- Existing Git repository cloned locally.

### Detailed Implementation Tasks
1. Audit `package.json` to verify Next.js 16.4.2, React 19.3.0, Tailwind CSS v4, TypeScript 5, and GSAP 3.15.
2. Inspect `public/` and `src/` to catalog existing files, fonts, and styles.
3. Extract and organize brand image requirements (FitBowl logo SVG, hero bowl photo, 14 dish photos, 4 avatar photos).
4. Review assignment documentation requirements and establish the `docs/` architecture.

### Files or Components Expected to Change
- `docs/*` (documentation files created)
- `README.md` (audit baseline)

### Acceptance Criteria
- [x] Existing codebase integrity preserved; no destructive overwrites.
- [x] Confirmed Tailwind v4 `@theme` compatibility with React 19.
- [x] Verified GSAP and Lucide React versions.
- [x] Initial architectural decisions documented in `docs/architecture.md`.

### Verification Steps
```bash
npm run build
git status
```

### Git Commit Checkpoint
`chore(audit): verify repository dependencies, structure, and create documentation baseline`

### Estimated Effort
45 minutes

### Risks and Blockers
- Missing vector logo asset (Mitigation: Construct pixel-perfect inline SVG matching the approved brand mark).

### Definition of Done
Full repository baseline established, documentation suite generated, and clean build confirmed.

---

## Phase 1 — Project Foundation & Design System

### Objective
Configure brand tokens, typography, global layout styles, and shared UI primitives in Next.js 16 and Tailwind CSS v4.

### Prerequisites and Dependencies
- Phase 0 completed.

### Detailed Implementation Tasks
1. Configure `Bricolage_Grotesque` and `Nunito` in `src/app/layout.tsx` via `next/font/google`.
2. Define design tokens in `src/app/globals.css` using Tailwind v4 `@theme inline`:
   - Forest Green: `#173F32`
   - Orange: `#F47738`
   - Warm Cream: `#FFF7E8`
   - Soft Leaf Green: `#DCEBCF`
   - Dark Forest: `#0F2C23`
3. Create TypeScript domain types in `src/types/` (`menu.ts`, `pricing.ts`, `trial.ts`).
4. Build reusable UI primitives in `src/components/ui/`:
   - `Button.tsx` (primary orange, secondary green outline, ghost)
   - `Badge.tsx` (veg, non-veg, promo pill)
   - `Container.tsx` (max-w-7xl responsive wrapper)

### Files or Components Expected to Change
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/types/menu.ts`, `src/types/pricing.ts`, `src/types/trial.ts`
- `src/components/ui/Button.tsx`, `src/components/ui/Badge.tsx`

### Acceptance Criteria
- [x] Both Google fonts load with zero layout shift (CLS = 0).
- [x] Tailwind utility classes reference official brand token variables.
- [x] Types compile without errors (`npx tsc --noEmit`).
- [x] Background displays `#FFF7E8` and text renders `#173F32`.

### Verification Steps
```bash
npx tsc --noEmit
npm run dev # Visual inspection in browser at http://localhost:3000
```

### Git Commit Checkpoint
`feat(design-system): configure typography, brand tokens, and core UI primitives`

### Estimated Effort
45 minutes

### Risks and Blockers
- Tailwind v4 `@theme` syntax differences from v3 (Mitigation: Follow CSS-first `@theme inline` structure documented in `architecture.md`).

### Definition of Done
Tokens, typography, base layout, and UI primitives verified in running development server.

---

## Phase 2 — Navbar & Hero Section

### Objective
Implement the responsive navigation bar with the official logo and the high-conversion hero section with headline, trust badges, dual CTAs, and hero food imagery.

### Prerequisites and Dependencies
- Phase 1 completed.

### Detailed Implementation Tasks
1. Build `Navbar.tsx`:
   - FitBowl brand logo lockup (SVG).
   - Navigation links: Menu, Plans, How It Works, Reviews, FAQs.
   - CTA button: `Claim Free Trial ->` scrolling to `#trial-form`.
   - Mobile hamburger drawer toggle with smooth slide-in.
   - Sticky scroll listener adding backdrop blur after 50px.
2. Build `HeroSection.tsx`:
   - Location pill: `FRESH BOWLS • MUMBAI`.
   - Headline: `Healthy doesn't have to taste healthy.` with orange "taste".
   - Subtitle: `Delicious, freshly prepared bowls delivered to your home or office.`
   - 4 Trust Badges: One meal free, Freshly prepared, Delivered to home/office, No artificial stuff.
   - Dual CTAs: Primary `Claim Your Free Trial Meal ->` and secondary `Watch How It Works (01:30 min)`.
   - Hero bowl image with floating graphic badges ("Real Ingredients", "Good Food Busy Life Sorted!").

### Files or Components Expected to Change
- `src/components/layout/Navbar.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/app/page.tsx`

### Acceptance Criteria
- [x] Navbar remains sticky on scroll with backdrop blur.
- [x] Headline highlights "taste" in `#F47738`.
- [x] Both CTAs smoothly navigate to their respective destinations.
- [x] Hero image preloads with `priority` attribute.
- [x] Mobile hamburger drawer opens, closes, and navigates seamlessly.

### Verification Steps
```bash
npx tsc --noEmit
npm run lint
```

### Git Commit Checkpoint
`feat(hero): build responsive navbar, hero section, trust badges, and hero imagery`

### Estimated Effort
60 minutes

### Risks and Blockers
- Mobile layout overflow on narrow 360px–390px screens (Mitigation: Use flexible wrap and responsive font scaling).

### Definition of Done
Navbar and Hero sections fully responsive and verified on desktop (1440px) and mobile (390px).

---

## Phase 3 — Menu Catalog & Pricing Plans

### Objective
Implement all 14 signature bowls with dietary filters and live search, plus the 3 subscription pricing tiers emphasizing the Regular plan.

### Prerequisites and Dependencies
- Phase 1 completed.

### Detailed Implementation Tasks
1. Create `src/data/bowls.ts` with all 14 bowls, exact calorie counts, protein grams, descriptions, and dietary classifications.
2. Build `MenuSection.tsx`:
   - Kicker `OUR MENU`, H2 `Explore Our 14 Bowls`, subtitle.
   - Filter bar (`All`, `Veg`, `Non-Veg`) with active indicator pill.
   - Case-insensitive live search input matching dish title and ingredients.
   - 14 `BowlCard.tsx` items displaying image, veg/non-veg tag, calories, protein, description, and `+` action.
   - Prominent `Fridays Only` badge on Mutton Keema Bowl (#14).
   - Empty state when search yields no matches.
3. Create `src/data/plans.ts` with Starter (₹1,450), Regular (₹2,700), and Pro (₹5,000).
4. Build `PricingSection.tsx`:
   - Dark Forest Green `#173F32` container.
   - Section header with editorial flair: *"Good food Great value!"*.
   - 3 pricing cards with meal counts, prices, price-per-meal, and feature checklists.
   - `Most Popular` badge and orange border highlighting the Regular plan.
   - `Get Started ->` CTAs navigating to `#trial-form`.

### Files or Components Expected to Change
- `src/data/bowls.ts`, `src/data/plans.ts`
- `src/components/sections/MenuSection.tsx`, `src/components/ui/BowlCard.tsx`
- `src/components/sections/PricingSection.tsx`, `src/components/ui/PlanCard.tsx`
- `src/app/page.tsx`

### Acceptance Criteria
- [x] Exactly 14 bowls rendered; filtering by Veg yields 7 dishes, Non-Veg yields 7 dishes.
- [x] Mutton Keema Bowl displays `Fridays Only`.
- [x] Pricing matches exact figures: ₹1,450 (₹290/meal), ₹2,700 (₹270/meal), ₹5,000 (₹250/meal).
- [x] Regular plan visually emphasized as "Most Popular".

### Verification Steps
```bash
npx tsc --noEmit
# Manual verification of 14 dishes and 3 pricing cards in browser
```

### Git Commit Checkpoint
`feat(menu-pricing): implement 14-bowl catalog with dietary filters and 3 subscription tiers`

### Estimated Effort
75 minutes

### Risks and Blockers
- Typo in nutritional values (Mitigation: Validate against assignment source table in `ui-ux-specification.md`).

### Definition of Done
Menu filtering, live search, and pricing tiers verified and bug-free.

---

## Phase 4 — Supporting Content Sections

### Objective
Implement the Why FitBowl benefits, 4-step How It Works process, 4 customer testimonials, newsletter retention box, and 8-question FAQ accordion.

### Prerequisites and Dependencies
- Phases 2 and 3 completed.

### Detailed Implementation Tasks
1. Build `BenefitsSection.tsx` (4 cards: Tasty & Healthy, Made for Busy You, Real Ingredients, Convenient Delivery).
2. Build `HowItWorksSection.tsx` (4 steps: Choose Your Bowl, Book Your Free Trial, We Deliver, Enjoy).
3. Create `src/data/testimonials.ts` and build `TestimonialsSection.tsx`:
   - Exactly 4 verified reviews: Riya S. (Marketing), Karan M. (Product Manager), Sneha P. (Consultant), Arjun K. (Software Engineer).
   - 5-star rating presentation and customer role metadata.
4. Build `NewsletterSection.tsx` (`Stay in the Loop` retention capture with phone/email validation).
5. Create `src/data/faqs.ts` and build `FAQSection.tsx`:
   - All 8 verified questions and answers.
   - 2-column desktop layout, single-column mobile stack.
   - Accessible keyboard-driven accordion (`aria-expanded`, smooth height transition).

### Files or Components Expected to Change
- `src/data/testimonials.ts`, `src/data/faqs.ts`
- `src/components/sections/BenefitsSection.tsx`, `src/components/sections/HowItWorksSection.tsx`
- `src/components/sections/TestimonialsSection.tsx`, `src/components/sections/NewsletterSection.tsx`
- `src/components/sections/FAQSection.tsx`, `src/components/ui/Accordion.tsx`
- `src/app/page.tsx`

### Acceptance Criteria
- [x] All 4 benefits, 4 steps, 4 testimonials, and 8 FAQs render with exact assigned copy.
- [x] FAQ accordion toggles smoothly with full keyboard accessibility.
- [x] Newsletter provides instant simulated feedback.

### Verification Steps
```bash
npx tsc --noEmit
npm run lint
```

### Git Commit Checkpoint
`feat(content): implement benefits, how-it-works, testimonials, newsletter, and 8 FAQs`

### Estimated Effort
60 minutes

### Risks and Blockers
- Missing or inaccurate FAQ copy (Mitigation: Check against `wireframe.md` Section 9).

### Definition of Done
All content sections assembled and accessible via page anchor links.

---

## Phase 5 — Free Trial Booking & Conversion Flow

### Objective
Build the Free Trial Booking Form with client-side validation, delivery area routing, Sunday blocker, out-of-area waitlist handling, and simulated async submission.

### Prerequisites and Dependencies
- Phase 1 and 3 completed.

### Detailed Implementation Tasks
1. Create `src/utils/validation.ts`:
   - Full name validation (`min 2 chars`, letters and spaces).
   - Indian mobile validation (`/^[6-9]\d{9}$/`).
   - Delivery date validation (disallows past dates and Sundays).
2. Build `TrialFormSection.tsx`:
   - Full Name input.
   - Mobile Number input with locked `+91` prefix.
   - Delivery Area select: Andheri, Bandra, Powai, Lower Parel, Other.
   - Food Preference toggle: Veg vs. Non-Veg.
   - Date picker with Sunday disabled.
3. Implement Out-of-Area Dynamic Routing:
   - When user selects "Other", update CTA to `Join Expansion Waitlist ->`.
   - Display clear notification of supported zones.
4. Implement Simulated Submission Engine:
   - Show loading spinner for 1200ms on submit.
   - Display rich confirmation modal with booking details and prominent demo disclosure: *"Simulated Demo Booking — No actual meal order was placed."*
5. Build `MobileStickyCTA.tsx`:
   - Appears when scroll offset > 400px.
   - Clicking smoothly scrolls to `#trial-form` and focuses name input.
   - Auto-hides when `#trial-form` is in view.

### Files or Components Expected to Change
- `src/utils/validation.ts`
- `src/components/sections/TrialFormSection.tsx`
- `src/components/ui/MobileStickyCTA.tsx`
- `src/components/ui/Modal.tsx`
- `src/app/page.tsx`

### Acceptance Criteria
- [x] Form rejects invalid phone numbers (e.g. non-10 digit or non-Indian start digit).
- [x] Sunday delivery dates cannot be selected.
- [x] Selecting "Other" dynamically pivots to the waitlist flow.
- [x] Loading spinner displays for 1.2s on submit.
- [x] Success modal explicitly states the demo/simulation status.
- [x] Mobile sticky bottom bar functions on small viewports.

### Verification Steps
```bash
# Manual browser test:
# 1. Enter invalid phone -> check error message
# 2. Select "Other" -> check button label changes to "Join Expansion Waitlist"
# 3. Select valid details -> submit -> verify 1.2s spinner and demo confirmation modal
```

### Git Commit Checkpoint
`feat(trial-form): build free trial booking form with validation, area routing, and simulated submission`

### Estimated Effort
75 minutes

### Risks and Blockers
- User confusion regarding whether food will actually be delivered (Mitigation: Prominent demo disclaimer in confirmation dialog).

### Definition of Done
Complete booking funnel operational with validation, error states, and honest simulation feedback.

---

## Phase 6 — Animation, Responsive QA, Accessibility & Performance

### Objective
Integrate restrained GSAP ScrollTrigger reveals, ensure lifecycle cleanup, support `prefers-reduced-motion`, verify responsive breakpoints, and optimize performance.

### Prerequisites and Dependencies
- Phases 2 through 5 completed.

### Detailed Implementation Tasks
1. Implement `useGsapReveal.ts` with `gsap.context()` and automatic `revert()` cleanup.
2. Add subtle entrance animations:
   - Hero headline, subtitle, and badges staggered reveal.
   - Benefit cards and bowl cards staggered fade-in.
   - Pricing container gentle entrance.
3. Add `prefers-reduced-motion` check bypassing GSAP transforms when enabled.
4. Build `Footer.tsx` with logo, quick links, service areas, and verified contact info.
5. Responsive QA at `390px` (mobile), `768px` (tablet), and `1440px` (desktop):
   - Fix any horizontal layout overflow.
   - Ensure touch targets `>= 48px`.
6. Accessibility Audit:
   - Verify keyboard navigation tab sequence.
   - Verify focus rings on inputs, buttons, and accordion headers.
   - Check contrast ratios (WCAG 2.1 AA).

### Files or Components Expected to Change
- `src/hooks/useGsapReveal.ts`
- `src/components/layout/Footer.tsx`
- All section components (adding `data-reveal` or animation refs)

### Acceptance Criteria
- [x] GSAP context cleaned up deterministically; zero memory leaks or console warnings.
- [x] Reduced-motion mode completely disables motion transforms.
- [x] Zero horizontal scroll or overflow across all viewports (`390px`, `768px`, `1440px`).
- [x] All interactive elements accessible via keyboard.

### Verification Steps
```bash
npm run build
# Emulate prefers-reduced-motion in DevTools and confirm animations are skipped
# Inspect DevTools Console for zero GSAP warnings
```

### Git Commit Checkpoint
`feat(motion-qa): integrate GSAP animations, reduced-motion support, footer, and responsive QA`

### Estimated Effort
60 minutes

### Risks and Blockers
- ScrollTrigger recalculation glitches during hydration (Mitigation: Call `ScrollTrigger.refresh()` after DOM ready).

### Definition of Done
Silky smooth animations, zero layout thrashing, and verified WCAG 2.1 AA compliance.

---

## Phase 7 — SEO, Testing & Production Polish

### Objective
Implement Next.js metadata, JSON-LD structured data, dynamic sitemap and robots.txt, run production builds, and resolve high-priority defects.

### Prerequisites and Dependencies
- Phases 2 through 6 completed.

### Detailed Implementation Tasks
1. Configure metadata in `src/app/layout.tsx`:
   - Title: `FitBowl — Healthy Meal Subscription in Mumbai | Fresh Veg & Non-Veg Bowls`
   - Meta description with target Mumbai keywords.
   - OpenGraph and Twitter Card image references.
2. Embed JSON-LD structured data:
   - `FoodEstablishment` schema with Mumbai service areas.
   - `FAQPage` schema with all 8 questions.
3. Create `src/app/sitemap.ts` and `src/app/robots.ts`.
4. Run static type checking and ESLint:
   - `npx tsc --noEmit`
   - `npm run lint`
5. Run production build:
   - `npm run build`
6. Fix any discovered build errors, layout warnings, or contrast defects.

### Files or Components Expected to Change
- `src/app/layout.tsx`
- `src/app/sitemap.ts`, `src/app/robots.ts`
- Target defect files

### Acceptance Criteria
- [x] Production build succeeds with zero errors or warnings (`npm run build`).
- [x] `/sitemap.xml` and `/robots.txt` serve valid XML and plain-text.
- [x] Structured data parses cleanly without schema syntax errors.
- [x] ESLint passes cleanly with zero errors.

### Verification Steps
```bash
npx tsc --noEmit
npm run lint
npm run build
```

### Git Commit Checkpoint
`feat(seo-build): implement SEO metadata, JSON-LD schemas, sitemap, and verify production build`

### Estimated Effort
45 minutes

### Risks and Blockers
- Next.js dynamic sitemap route compilation issues (Mitigation: Use standard `MetadataRoute.Sitemap` signature).

### Definition of Done
Production build passes cleanly and SEO schemas are fully populated.

---

## Phase 8 — Documentation, Git History & Live Deployment

### Objective
Update project documentation and README, verify Git history, deploy the application to a live host (Vercel or Netlify), and complete the final submission audit.

### Prerequisites and Dependencies
- Phase 7 production build verified.

### Detailed Implementation Tasks
1. Update `README.md` with:
   - Project overview, value proposition, and tech stack.
   - Local setup and development instructions (`npm install`, `npm run dev`, `npm run build`).
   - Implementation decisions, architecture highlights, and design tokens.
   - AI-assisted tooling disclosure.
   - Known assumptions, trade-offs, and future roadmap.
   - Live deployment URL and repository link.
2. Cross-verify all 8 documentation files in `docs/` for internal consistency.
3. Review Git commit log to ensure meaningful, atomic conventional commit messages.
4. Deploy to Vercel (or Netlify) using the project GitHub repository.
5. Perform live production sanity check on mobile and desktop viewports.

### Files or Components Expected to Change
- `README.md`
- `docs/*` (final status updates)

### Acceptance Criteria
- [x] Comprehensive README provides clear instructions and transparent AI disclosures.
- [x] All 8 documentation files are consistent with each other.
- [x] Live URL is accessible and loads without runtime errors.
- [x] Git commit history reflects incremental, disciplined development.

### Verification Steps
```bash
git log -n 10 --oneline
# Verify live deployment in web browser
```

### Git Commit Checkpoint
`docs(readme): finalize project documentation, AI disclosure, and deployment verification`

### Estimated Effort
45 minutes

### Risks and Blockers
- Deployment environment variable mismatch (Mitigation: Site uses relative URLs with fallback).

### Definition of Done
Project is live, documented, committed cleanly, and ready for submission evaluation.

---

## 12. Comprehensive Release & Verification Checklist

Before final submission, every item on this checklist must be verified:

### Content & Business Accuracy
- [x] All 14 signature bowls rendered with exact names, calories, protein, and descriptions.
- [x] Mutton Keema Bowl clearly indicates its "Fridays Only" availability rule.
- [x] All 3 subscription tiers display exact pricing: Starter (₹1,450), Regular (₹2,700), Pro (₹5,000).
- [x] Regular plan highlighted as "Most Popular".
- [x] All 4 customer testimonials match assignment names, roles, and quotes verbatim.
- [x] All 8 FAQ items match assignment questions and answers verbatim.
- [x] Pilot service areas accurately limited to Andheri, Bandra, Powai, and Lower Parel.
- [x] Operating schedule communicated: Monday–Saturday (Lunch 12–2 PM, Dinner 7–9 PM; no Sunday delivery).

### UI/UX & Brand
- [x] Official FitBowl logo lockup rendered cleanly on light and dark surfaces.
- [x] Headings set in Bricolage Grotesque; body text set in Nunito.
- [x] Official color palette applied: `#173F32`, `#F47738`, `#FFF7E8`, `#DCEBCF`.
- [x] Hero headline highlights "taste" in orange.
- [x] Mobile responsive layout verified at 390px with functional hamburger drawer and sticky CTA.

### Functional & Form Integrity
- [x] Menu dietary filters (`All`, `Veg`, `Non-Veg`) and live search operate instantly.
- [x] Free trial form validates name, 10-digit Indian phone number, area, preference, and date.
- [x] Sunday delivery dates are disabled and blocked.
- [x] Selecting "Other" area redirects user to the waitlist flow.
- [x] Simulated submission displays 1.2s loading state and transparent demo disclosure modal.

### Technical & Quality Standards
- [x] Zero TypeScript errors (`npx tsc --noEmit`).
- [x] Zero ESLint errors (`npm run lint`).
- [x] Successful production build (`npm run build`).
- [x] GSAP contexts properly cleaned up on unmount (`ctx.revert()`).
- [x] Reduced motion preference respected via media query.
- [x] Valid SEO metadata, OpenGraph cards, JSON-LD schemas, sitemap, and robots.txt.
- [x] Live deployment URL verified and documented in README.
