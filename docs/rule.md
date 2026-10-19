# FitBowl — Project Rules & Engineering Standards

**Document Version:** 1.0.0  
**Document Status:** Approved & Enforced  
**Last Updated:** 2026-10-18  
**Author:** Lead Engineering Standards Committee & Senior Architect  
**Cross-References:** [architecture.md](file:///e:/company/practice/fitbowl/docs/architecture.md), [ui-ux-specification.md](file:///e:/company/practice/fitbowl/docs/ui-ux-specification.md), [phases.md](file:///e:/company/practice/fitbowl/docs/phases.md)

---

## Table of Contents
1. [Core Development Philosophy](#1-core-development-philosophy)
2. [Eight Non-Negotiable AI-Assisted Development Directives](#2-eight-non-negotiable-ai-assisted-development-directives)
3. [File, Directory & Code Naming Conventions](#3-file-directory--code-naming-conventions)
4. [Component Architecture & Reuse Rules](#4-component-architecture--reuse-rules)
5. [TypeScript Standards & Type Safety](#5-typescript-standards--type-safety)
6. [Styling, Design Tokens & Tailwind CSS v4 Conventions](#6-styling-design-tokens--tailwind-css-v4-conventions)
7. [Typography & Font Loading Standards](#7-typography--font-loading-standards)
8. [Asset Management & Image Optimization Rules](#8-asset-management--image-optimization-rules)
9. [GSAP Motion, Lifecycle Cleanup & Reduced-Motion Rules](#9-gsap-motion-lifecycle-cleanup--reduced-motion-rules)
10. [Responsive Layout & Mobile-First Standards](#10-responsive-layout--mobile-first-standards)
11. [Accessibility (WCAG 2.1 AA) Quality Standards](#11-accessibility-wcag-21-aa-quality-standards)
12. [Form Validation & State Integrity](#12-form-validation--state-integrity)
13. [SEO & Semantic HTML Directives](#13-seo--semantic-html-directives)
14. [Git Commit Standards & Checkpoint Rules](#14-git-commit-standards--checkpoint-rules)
15. [Pre-Commit Code Review Checklist](#15-pre-commit-code-review-checklist)
16. [Performance Budgets & Quality Gates](#16-performance-budgets--quality-gates)

---

## 1. Core Development Philosophy

Every line of code committed to the FitBowl repository must adhere to three foundational tenets:
1. **Explainability:** The code must be clean, modular, and idiomatic so that the developer can comfortably explain, defend, and refactor any part during technical evaluations or interviews.
2. **Nutritional & Business Fidelity:** Content supplied in the assignment specification (exact bowl names, calories, protein grams, plan prices, testimonials, and FAQs) serves as the immutable source of truth.
3. **Simplicity over Dependency Churn:** Do not introduce heavy third-party npm packages when clean native TypeScript and React 19 primitives accomplish the goal.

---

## 2. Eight Non-Negotiable AI-Assisted Development Directives

When developing or refactoring FitBowl with AI assistance, the following eight rules are **strictly enforced without exception**:

1. **Brand Identity Preservation:** NEVER replace the approved FitBowl logo with a generic AI-generated mascot, random food bowl clipart, or alternate brand name.
2. **Zero Template Copying:** NEVER import, clone, or copy full commercial website templates or proprietary themes. All components must be built natively for FitBowl.
3. **Data Integrity & Zero Fabrication:** NEVER invent or fabricate fake testimonials, fake nutritional stats, fictitious awards, or fake customer counts. Use only verified assignment content.
4. **Source of Truth Adherence:** Treat the assignment content (14 bowls, 3 plans, 4 testimonials, 8 FAQs, 4 Mumbai delivery areas) as the single source of truth.
5. **Interview Readiness:** Maintain readable, self-documenting code. Avoid overly abstract design patterns or obscure metaprogramming that obscures developer comprehension.
6. **No Duplicate Animation Libraries:** GSAP is the designated animation engine. DO NOT install Framer Motion, Motion One, or competing animation libraries alongside GSAP.
7. **Transparent Simulation Disclosure:** NEVER claim that the simulated free-trial submission communicates with a real backend or places a real order. Always disclose demo status clearly to the user.
8. **Next.js 16 Breaking Conventions & AGENTS.md Guardrail:** Heed breaking changes in Next.js 16 / React 19. Consult local docs in `node_modules/next/dist/docs/`. Do NOT remove or modify `<!-- BEGIN:nextjs-agent-rules -->` in `AGENTS.md` (detailed in [nextjs-agent-rules.md](file:///e:/company/practice/fitbowl/docs/nextjs-agent-rules.md)).

---

## 3. File, Directory & Code Naming Conventions

### 3.1 Directories
- All directory names under `src/` must use lowercase kebab-case or standard single-word lowercase:  
  `src/components/sections/`, `src/components/ui/`, `src/data/`, `src/hooks/`, `src/types/`, `src/utils/`.

### 3.2 Files
- **React Components:** PascalCase with `.tsx` extension:  
  `Navbar.tsx`, `HeroSection.tsx`, `BowlCard.tsx`, `PlanCard.tsx`.
- **Hooks:** CamelCase with `use` prefix:  
  `useScrollPosition.ts`, `useReducedMotion.ts`.
- **Data Modules:** Lowercase plural with `.ts` extension:  
  `bowls.ts`, `plans.ts`, `testimonials.ts`, `faqs.ts`.
- **Type Definitions:** Lowercase singular with `.ts` extension:  
  `menu.ts`, `pricing.ts`, `trial.ts`.
- **Pure Utilities:** Lowercase with `.ts` extension:  
  `validation.ts`, `formatters.ts`.

### 3.3 Variables, Functions & Types
- **Variables & Function Names:** `camelCase` (e.g., `activeFilter`, `formatCurrency`, `validateMobileNumber`).
- **Interfaces & Type Aliases:** `PascalCase` without leading `I` prefix (e.g., `BowlItem`, `SubscriptionPlan`, `TrialFormData`).
- **Constants & Enums:** `UPPER_SNAKE_CASE` for global immutable primitives (e.g., `MUMBAI_DELIVERY_AREAS`, `MAX_TRIAL_MEALS_PER_USER`).

---

## 4. Component Architecture & Reuse Rules

1. **Single Responsibility:** Each component must perform one clear role. Section containers (`MenuSection.tsx`) manage layout and filtering state; presentational child components (`BowlCard.tsx`) receive props and render UI.
2. **Explicit Client Directive:** Any component utilizing React hooks (`useState`, `useEffect`, `useRef`), browser APIs, or GSAP must specify `'use client';` on line 1.
3. **Strict Prop Types:** Every component must declare a strongly typed interface for its props. Default to `readonly` or explicit shapes rather than loose objects.
4. **Zero Inline Handlers for Complex Logic:** Complex validation or data mutations must reside in named utility functions rather than bloated inline JSX callbacks.

---

## 5. TypeScript Standards & Type Safety

1. **No `any` Permitted:** The usage of `any` is strictly prohibited. Use `unknown`, generics, or explicit union types.
2. **Strict Mode Compliance:** Code must compile cleanly under `"strict": true` in `tsconfig.json` without type casting bypasses (`as unknown as X`).
3. **Exhaustive Pattern Matching:** When matching union types (e.g., `DietaryType` or `DeliveryHub`), ensure all branches are handled.
4. **Array Types:** Prefer `BowlItem[]` or `ReadonlyArray<BowlItem>` for array collections.

---

## 6. Styling, Design Tokens & Tailwind CSS v4 Conventions

1. **Use Approved Brand Tokens:**
   - Forest Green: `#173F32` (`text-forest`, `bg-forest`)
   - Orange: `#F47738` (`text-orange`, `bg-orange`)
   - Warm Cream: `#FFF7E8` (`bg-cream`, `border-border-cream`)
   - Soft Leaf Green: `#DCEBCF` (`bg-leaf`, `text-leaf-dark`)
2. **No Arbitrary Hardcoded Hexes in Component JSX:** Do NOT use arbitrary one-off Tailwind values like `bg-[#173F32]` directly inside components; reference the designated `@theme` token aliases (`bg-forest`, `bg-orange`).
3. **Class Organization Order:**
   - Layout / Display (`flex`, `grid`, `hidden`, `block`)
   - Positioning (`relative`, `absolute`, `top-0`, `z-10`)
   - Box Model & Sizing (`w-full`, `max-w-4xl`, `p-4`, `m-2`)
   - Typography (`font-heading`, `text-2xl`, `font-bold`, `text-forest`)
   - Visual Styles (`bg-white`, `rounded-2xl`, `border`, `shadow-sm`)
   - Interactive & Motion (`hover:scale-102`, `transition-all`, `duration-200`)

---

## 7. Typography & Font Loading Standards

1. **Font Pairings:**
   - Headings: `Bricolage Grotesque` applied via `font-heading` (`var(--font-bricolage)`).
   - Body Text: `Nunito` applied via `font-body` (`var(--font-nunito)`).
2. **Loading via `next/font/google`:** All fonts must load through Next.js font optimization in `src/app/layout.tsx`. Do NOT load Google Fonts via external `<link>` tags in the HTML head.
3. **Heading Hierarchy:** Only **one** `<h1>` is permitted per page (the Hero headline). Major section titles must use `<h2>`. Card titles must use `<h3>`.

---

## 8. Asset Management & Image Optimization Rules

1. **Format Standards:** Use `.webp` or `.avif` for photographic bowl imagery and `.svg` for vector icons/logos.
2. **Next.js `<Image />` Component:** Always use `next/image` with explicit `width`, `height`, and `alt` properties.
3. **Descriptive Alt Text:** Never use generic alt strings like `"food"`, `"image"`, or `"photo"`. Use descriptive phrases like `"Peri Peri Paneer Bowl with grilled paneer and brown rice"`.
4. **Priority Loading:** Add `priority={true}` only to the hero bowl photograph to avoid competing with critical JS hydration.

---

## 9. GSAP Motion, Lifecycle Cleanup & Reduced-Motion Rules

1. **Mandatory `gsap.context()`:**
   ```typescript
   useEffect(() => {
     const ctx = gsap.context(() => {
       // All GSAP tweens and ScrollTriggers live here
     }, componentRef);

     return () => ctx.revert(); // Essential cleanup
   }, []);
   ```
2. **ScrollTrigger Registration:** Check `typeof window !== 'undefined'` before registering `ScrollTrigger`.
3. **Respect Reduced Motion:** Always wrap animated timelines with a reduced-motion check:
   ```typescript
   if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
     return; // Skip animation or jump to final state
   }
   ```
4. **Restrained Durations:** Keep entrance animations between `0.4s` and `0.8s`. Avoid sluggish transitions that delay content visibility.

---

## 10. Responsive Layout & Mobile-First Standards

1. **Core Testing Viewports:**
   - Mobile: `390px` (iPhone 12/13/14 baseline)
   - Tablet: `768px` (iPad Portrait)
   - Desktop: `1024px` and `1440px`
2. **Touch Target Dimensions:** All buttons, filters, and interactive triggers on mobile must have a minimum touch footprint of `44px x 44px` (recommended `48px x 48px`).
3. **Mobile Sticky Bar:** The bottom conversion CTA bar must gracefully account for iOS safe area insets: `pb-[calc(1rem+env(safe-area-inset-bottom))]`.

---

## 11. Accessibility (WCAG 2.1 AA) Quality Standards

1. **Contrast Compliance:** All text elements must achieve a minimum contrast ratio of `4.5:1` against their respective backgrounds (`3:1` for large text `>= 18px` bold).
2. **Keyboard Focus Rings:** Never remove outline focus styling (`outline: none`) without providing an explicit replacement focus ring: `focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2`.
3. **ARIA Semantics:**
   - Accordion triggers must have `aria-expanded="true|false"` and `aria-controls="content-id"`.
   - Modals must implement `role="dialog"`, `aria-modal="true"`, and label references.

---

## 12. Form Validation & State Integrity

1. **Client-Side Validation Before Submit:** All required fields must be validated immediately on blur and re-checked upon form submission.
2. **Indian Mobile Format:** Enforce 10-digit format starting with digits 6, 7, 8, or 9 (`/^[6-9]\d{9}$/`).
3. **Sunday Blocking:** Enforce delivery date rules prohibiting Sunday selections both visually and programmatically.
4. **Out-of-Area Routing:** Never submit a trial meal booking for locations outside Andheri, Bandra, Powai, and Lower Parel. Route them exclusively to the waitlist.

---

## 13. SEO & Semantic HTML Directives

1. **Semantic HTML Tags:** Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>` appropriately.
2. **Page Metadata:** Maintain complete OpenGraph, Twitter Card, and localized Mumbai keywords via Next.js metadata API in `layout.tsx`.
3. **JSON-LD Schema Markup:** Maintain structured data scripts for `LocalBusiness`, `Organization`, and `FAQPage`.

---

## 14. Git Commit Standards & Checkpoint Rules

Commit messages must follow the **Conventional Commits** specification with clear scope and rationale:

### Format
`<type>(<scope>): <short description in present tense>`

### Types
- `feat`: A new user-facing feature (e.g., `feat(menu): implement 14-bowl catalog with dietary filters`)
- `fix`: A bug fix (e.g., `fix(form): correct mobile number validation regex`)
- `docs`: Documentation updates (e.g., `docs(brd): finalize business requirements and KPIs`)
- `style`: Formatting, CSS tokens, or spacing without logic changes
- `refactor`: Code reorganization without behavioral alterations
- `chore`: Dependency updates, build configuration, or tooling adjustments

### Checkpoint Rule
Every implementation phase defined in `phases.md` must conclude with a verified Git commit before starting subsequent phases.

---

## 15. Pre-Commit Code Review Checklist

Before any branch merge or phase sign-off, verify the following checklist:
- [ ] Does the code compile with zero TypeScript errors (`npx tsc --noEmit`)?
- [ ] Does ESLint pass cleanly (`npm run lint`)?
- [ ] Are all 14 signature bowls rendered with exact calories and protein values?
- [ ] Is Mutton Keema Bowl clearly designated as "Fridays Only"?
- [ ] Does the Regular subscription plan display the "Most Popular" highlight?
- [ ] Are all 4 testimonials and 8 FAQs verbatim from the assignment content?
- [ ] Does the trial form reject invalid phone numbers and Sunday dates?
- [ ] Does the trial form route out-of-area selections to the waitlist flow?
- [ ] Are GSAP contexts properly reverted on unmount?
- [ ] Is the page fully responsive at 390px mobile and 1440px desktop?
- [ ] Is the simulated demo disclaimer prominent in the confirmation modal?

---

## 16. Performance Budgets & Quality Gates

| Metric | Budget / Threshold | Verification Tool |
|---|---|---|
| **Lighthouse Performance** | `>= 90 / 100` | Chrome DevTools Lighthouse |
| **Lighthouse Accessibility** | `>= 95 / 100` | Chrome DevTools Lighthouse |
| **Lighthouse Best Practices**| `>= 95 / 100` | Chrome DevTools Lighthouse |
| **Lighthouse SEO** | `100 / 100` | Chrome DevTools Lighthouse |
| **Initial JS Bundle (Gzipped)**| `< 100 kB` | `@next/bundle-analyzer` |
| **LCP (Largest Contentful Paint)**| `< 2.2s` | Core Web Vitals |
| **CLS (Cumulative Layout Shift)**| `< 0.05` | Core Web Vitals |
| **INP (Interaction to Next Paint)**| `< 100ms` | Core Web Vitals |
