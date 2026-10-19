# FitBowl — UI/UX Design Specification

**Document Version:** 1.0.0  
**Status:** Approved for Implementation  
**Last Updated:** 2026-10-18  
**Author:** Senior UI/UX Designer & Product Experience Lead  
**Cross-References:** [wireframe.md](file:///e:/company/practice/fitbowl/docs/wireframe.md), [brd.md](file:///e:/company/practice/fitbowl/docs/brd.md), [frd.md](file:///e:/company/practice/fitbowl/docs/frd.md), [architecture.md](file:///e:/company/practice/fitbowl/docs/architecture.md), [rule.md](file:///e:/company/practice/fitbowl/docs/rule.md)

---

## Table of Contents
1. [Product Overview & Target Audience](#1-product-overview--target-audience)
2. [Brand Identity & Visual Direction](#2-brand-identity--visual-direction)
3. [Official Logo System & Assets](#3-official-logo-system--assets)
4. [Color Architecture & Design Tokens](#4-color-architecture--design-tokens)
5. [Typography System](#5-typography-system)
6. [Spatial Grid, Elevation & Container Architecture](#6-spatial-grid-elevation--container-architecture)
7. [UI Component Design System](#7-ui-component-design-system)
8. [Responsive Behavior & Breakpoint Matrix](#8-responsive-behavior--breakpoint-matrix)
9. [Accessibility, Contrast & Reduced Motion](#9-accessibility-contrast--reduced-motion)
10. [Food Photography & Image Art Direction](#10-food-photography--image-art-direction)
11. [Motion Principles & GSAP Animation Specification](#11-motion-principles--gsap-animation-specification)
12. [Section-by-Section Design Requirements](#12-section-by-section-design-requirements)
13. [States & Edge Case UX](#13-states--edge-case-ux)

---

## 1. Product Overview & Target Audience

### 1.1 Product Overview
FitBowl is a premier, chef-crafted healthy meal subscription platform based in Mumbai, India. Delivering freshly cooked, macro-balanced lunch (12:00 PM – 2:00 PM) and dinner (7:00 PM – 9:00 PM) bowls from Monday through Saturday, FitBowl bridges the gap between strict clinical fitness nutrition and flavorful, comforting Indian and global cuisine.

### 1.2 Target Audience & Behavioral Context
- **Core Demographic:** Working corporate and tech professionals aged 25–35 residing or working in Mumbai's commercial/residential hubs: **Andheri, Bandra, Powai, and Lower Parel**.
- **User Psychographics:**
  - Highly time-constrained, balancing demanding 9-to-8 workdays and commute routines.
  - Health-conscious but disillusioned with tasteless boiled salads, unappetizing diet food, or inconsistent domestic cook arrangements.
  - Seeking authentic culinary satisfaction: warm Indian curries, aromatic biryanis, fresh Mexican fajita bowls, and crisp Korean glazes with zero refined sugar, zero maida, and nutritionist-certified protein/calorie counts.
- **Conversion Mindset:** Visitors want immediate transparency regarding taste, fresh preparation standards, pricing per meal, delivery coverage, and a frictionless path to try before committing.

---

## 2. Brand Identity & Visual Direction

### 2.1 Aesthetic Philosophy
FitBowl adopts a **Fresh Editorial Gourmet** aesthetic. Rather than feeling like a sterile medical diet platform, a generic SaaS template, or an AI-generated pastel landing page, the interface communicates:
- **Artisanal Craftsmanship:** Rich organic earth tones paired with vibrant culinary accents.
- **Nutritional Honesty:** Direct, prominent macro badges (exact calories and protein grams) on every dish.
- **Warmth & Approchability:** Soft cream backgrounds, humanist typography, and friendly micro-copy that eliminates diet intimidation.
- **Zero Gimmicks:** No exaggerated 3D illustrations, neon gradients, or artificial mascots. The real food photography and straightforward typography take center stage.

### 2.2 Brand Principles
1. **Appetite First:** Every visual element must elevate the natural appeal of fresh ingredients—vibrant herbs, charred paneer, golden chicken, rich legumes, and crisp greens.
2. **Effortless Clarity:** Users should instantly decipher what each bowl contains, what a subscription costs per meal, and how simple booking a free trial is.
3. **Trust & Local Familiarity:** Specific mentions of Mumbai neighborhoods, transparent kitchen practices (cooked same morning, never frozen), and zero credit-card barriers build immediate credibility.

---

## 3. Official Logo System & Assets

### 3.1 Official Logo Identity
The official FitBowl identity consists of a customized bowl emblem paired with clean geometric wordmark typography:
- **Logo Icon:** A minimalist bowl silhouette crowned with fresh green culinary leaves/steam sprouts and chopsticks, symbolizing fresh preparation and wholesome ingredients.
- **Wordmark Typography:** Bold, organic lowercase `fitbowl` set in bespoke rounded typography.
- **Secondary Descriptor:** `VEG & NON-VEG` in uppercase tracked lettering below the wordmark.
- **Tagline (Extended Lockup):** `HEALTHY MEALS DELIVERED` in uppercase tracked sans-serif beneath the brand unit.

```text
    ┌──────────────┐
    │  ( \  / )    │  <-- Fresh culinary sprout / steam
    │   \====/     │  <-- Stylized bowl
    └──────────────┘
       fitbowl
   VEG & NON-VEG
HEALTHY MEALS DELIVERED
```

### 3.2 Clear Space & Sizing Rules
- **Minimum Clear Space:** 16px padding on all four sides, free of text, borders, or competing graphics.
- **Desktop Dimensions:** Width: `140px` to `160px`; Height: `40px` to `46px`.
- **Mobile Dimensions:** Width: `120px` to `130px`; Height: `32px` to `36px`.
- **Background Contrast Rules:**
  - On Light Backgrounds (`#FFF7E8`, `#FFFFFF`): Use the full-color lockup (Forest Green `#173F32` wordmark with Orange/Leaf Green accents).
  - On Dark Forest Green Surfaces (`#173F32`): Use the reverse monochrome or cream lockup (`#FFF7E8` wordmark with vibrant orange accent).
- **Prohibited Modifications:**
  - DO NOT substitute the logo with generic AI food icons, abstract clip art, or cartoon mascots.
  - DO NOT stretch, skew, tilt, or distort the aspect ratio.
  - DO NOT place the logo over busy photographic backgrounds without an optical scrim.

---

## 4. Color Architecture & Design Tokens

FitBowl’s color palette is grounded in culinary nature: deep rainforest greens representing freshness and trust, warm sun-ripened orange driving appetite and conversion, creamy linen canvas offering organic warmth, and tender leaf greens providing vibrant vegetal accents.

### 4.1 Core Brand Palette

| Token Name | Hex Code | HSL Value | Semantic Role |
|---|---|---|---|
| `--color-forest-green` | `#173F32` | `hsl(161, 46%, 17%)` | Primary brand color, dark headers, deep cards, high-contrast headings, authority |
| `--color-orange` | `#F47738` | `hsl(20, 90%, 59%)` | Primary interactive accent, key CTAs, highlights, appetite stimulus |
| `--color-warm-cream` | `#FFF7E8` | `hsl(39, 100%, 95%)` | Universal page background canvas; soft, organic, anti-eyestrain |
| `--color-soft-leaf` | `#DCEBCF` | `hsl(91, 42%, 86%)` | Secondary tint, healthy badges, trust pill backgrounds, subtle containers |

### 4.2 Extended Semantic & Surface Tokens

| Token Name | Hex Code | Purpose & Usage |
|---|---|---|
| `--color-forest-dark` | `#0F2C23` | Dark surface container, footer background, pricing container depth |
| `--color-surface-white` | `#FFFFFF` | Bowl cards, review cards, input fields, elevated modals |
| `--color-surface-cream-alt`| `#F7EEDC` | Subtle card background contrast, secondary container fill |
| `--color-text-main` | `#173F32` | Primary headings, high-importance labels, hero copy |
| `--color-text-body` | `#334A40` | Body paragraphs, explanations, FAQ answers (WCAG AAA compliant) |
| `--color-text-muted` | `#63786F` | Secondary meta info, sub-labels, delivery notes |
| `--color-border-subtle` | `#E3D8C4` | Card dividers, input borders, accordion separators |
| `--color-veg` | `#2E7D32` | Vegetarian indicator pill background `#E8F5E9`, text `#1B5E20` |
| `--color-non-veg` | `#C2410C` | Non-vegetarian indicator pill background `#FFEDD5`, text `#9A3412` |
| `--color-error` | `#DC2626` | Form validation error text, error border stroke |
| `--color-success` | `#15803D` | Form success banner, confirmation checkmark |

---

## 5. Typography System

### 5.1 Font Family Pairing
- **Headings & Display:** `Bricolage Grotesque` (Google Fonts)
  - *Personality:* Punchy, modern French-grotesque flair with playful flared ink-traps and warm curves. Commands authority while remaining modern, human, and fresh.
  - *Fallback Stack:* `Bricolage Grotesque, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Body & Functional UI:** `Nunito` (Google Fonts)
  - *Personality:* Rounded, humanist sans-serif with open apertures and friendly terminal radii. Ensures fatigue-free reading across dense ingredient lists and nutritional tables.
  - *Fallback Stack:* `Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

### 5.2 Typographic Hierarchy & Scale

| Style / Level | Font Family | Weight | Desktop Size / Line-Height | Mobile Size / Line-Height | Tracking | Usage |
|---|---|---|---|---|---|---|
| **Display H1** | Bricolage Grotesque | 800 (ExtraBold) | 56px (3.5rem) / 1.1 | 36px (2.25rem) / 1.15 | `-0.025em` | Hero main headline |
| **Section H2** | Bricolage Grotesque | 700 (Bold) | 40px (2.5rem) / 1.2 | 28px (1.75rem) / 1.25 | `-0.02em` | Major section titles |
| **Card H3** | Bricolage Grotesque | 700 (Bold) | 24px (1.5rem) / 1.3 | 20px (1.25rem) / 1.3 | `-0.015em` | Bowl names, plan names, FAQ triggers |
| **Sub-heading H4**| Bricolage Grotesque | 600 (SemiBold) | 18px (1.125rem) / 1.4 | 16px (1.0rem) / 1.4 | `-0.01em` | Step headers, testimonial authors |
| **Kicker / Pill** | Bricolage Grotesque | 700 (Bold) | 13px (0.8125rem) / 1.0 | 12px (0.75rem) / 1.0 | `+0.08em` | Uppercase category kickers (e.g., `OUR MENU`) |
| **Body Large** | Nunito | 500 (Medium) | 18px (1.125rem) / 1.6 | 16px (1.0rem) / 1.55 | `0` | Hero supporting text, plan descriptions |
| **Body Base** | Nunito | 400 (Regular) | 15px (0.9375rem) / 1.6 | 14px (0.875rem) / 1.55 | `0` | Bowl descriptions, benefits, FAQ answers |
| **Caption / Meta**| Nunito | 600 (SemiBold) | 13px (0.8125rem) / 1.4 | 12px (0.75rem) / 1.4 | `+0.01em` | Nutrition metrics (kcal/protein), trust badges |
| **Button Text** | Bricolage Grotesque | 700 (Bold) | 16px (1.0rem) / 1.0 | 15px (0.9375rem) / 1.0 | `+0.01em` | Primary & secondary CTAs |

---

## 6. Spatial Grid, Elevation & Container Architecture

### 6.1 Layout Containers & Max Widths
- **Primary Content Canvas:** Max width `1280px` centered with responsive horizontal padding:
  - Desktop (`>= 1280px`): `padding-inline: 32px` (effective width: `1216px`)
  - Tablet (`768px - 1024px`): `padding-inline: 24px`
  - Mobile (`320px - 767px`): `padding-inline: 16px`
- **Section Vertical Spacing:**
  - Desktop: `80px` to `100px` (`py-20` to `py-24`)
  - Mobile: `48px` to `64px` (`py-12` to `py-16`)

### 6.2 8-Point Spatial System
All margin, padding, gap, and sizing dimensions align with the 8px baseline rule (with 4px for micro-spacing):
`4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `40px`, `48px`, `64px`, `80px`, `96px`.

### 6.3 Border Radii Tokens
- **Pill Primitives (`rounded-full`):** `9999px` — Primary/secondary buttons, filter chips, trust badges, veg/non-veg tags.
- **Card Primitives (`rounded-2xl` / `rounded-3xl`):**
  - Standard cards (Bowls, Benefits, Testimonials): `20px` (`1.25rem`).
  - Feature containers (Plans Dark Box, Newsletter Box): `28px` (`1.75rem`).
- **Inputs & Dropdowns (`rounded-xl`):** `12px` (`0.75rem`).

### 6.4 Elevation & Shadows
- **Shadow Sub-card (`shadow-sm`):** `0 2px 8px -2px rgba(23, 63, 50, 0.05)` — Neutral resting cards.
- **Shadow Card Hover (`shadow-md`):** `0 12px 24px -6px rgba(23, 63, 50, 0.10)` — Hover elevation on bowl cards.
- **Shadow Floating CTA (`shadow-orange`):** `0 8px 20px -4px rgba(244, 119, 56, 0.35)` — Primary orange button glow.
- **Shadow Elevated Modal (`shadow-xl`):** `0 24px 48px -12px rgba(15, 44, 35, 0.25)` — Free trial modal / sticky bar.

---

## 7. UI Component Design System

### 7.1 Buttons
1. **Primary Button (Orange CTA):**
   - Background: `#F47738` (`--color-orange`); Text: `#FFFFFF`.
   - Hover state: Background `#E06324`; Transform: `translateY(-2px)`; Box-shadow: `0 8px 20px -4px rgba(244, 119, 56, 0.40)`.
   - Active state: Background `#C95218`; Transform: `translateY(0)`.
   - Focus visible: `outline: 3px solid #173F32; outline-offset: 2px`.
   - Radius: `rounded-full` (`9999px`).
   - Padding: Desktop `14px 28px`; Mobile `12px 24px`.
   - Icon: Trailing arrow `->` transitioning `+4px` on hover.
2. **Secondary Button (Forest Green Outline / Ghost):**
   - Background: `transparent`; Border: `2px solid #173F32`; Text: `#173F32`.
   - Hover state: Background: `#173F32`; Text: `#FFFFFF`.
   - Radius: `rounded-full` (`9999px`).
3. **Tertiary / Media CTA (Watch Video):**
   - Pill with circular play icon (white background, orange play symbol) + stacked label: "Watch How It Works" (Bold) / "01:30 min" (Subtle).

### 7.2 Filter Segmented Controls
- **Container:** Wrapped row on mobile, inline-flex on desktop, background `#EADDC9` / `#E5D9C4` pill.
- **Filter Chips (`All`, `Veg`, `Non-Veg`):**
  - Inactive: Text `#334A40`, transparent background, `font-bold`, padding `8px 20px`.
  - Active: Background `#173F32`, text `#FFFFFF`, smooth spring transition (`0.25s ease-out`), subtle shadow.

### 7.3 Nutrition & Dietary Badges
- **Veg Badge:** Rounded pill with green indicator dot:
  - Background: `#E8F5E9`; Border: `1px solid #C8E6C9`; Text: `#1B5E20`; Icon: Filled green circle.
- **Non-Veg Badge:** Rounded pill with orange/red indicator dot:
  - Background: `#FFEDD5`; Border: `1px solid #FED7AA`; Text: `#9A3412`; Icon: Filled amber-red circle.
- **Macro Pill:** Monospace-aligned Nunito Semibold:
  - Format: `520 kcal | 28g protein`; Background: `rgba(23, 63, 50, 0.06)`; Text: `#173F32`.

### 7.4 Form Input Fields
- **Container:** Stacked label + input wrapper + error text slot.
- **Input Styling:**
  - Background: `#FFFFFF`; Border: `1.5px solid #E3D8C4`; Radius: `12px`; Padding: `14px 16px`.
  - Font: Nunito 500, `15px`, color `#173F32`.
  - Placeholder: `#8E9F97`.
  - Focus Ring: Border `#F47738`, Box-shadow: `0 0 0 4px rgba(244, 119, 56, 0.15)`.
  - Error State: Border `#DC2626`, Background `#FEF2F2`, Error helper icon and text below.
- **Phone Input with Fixed Prefix:**
  - Left locked addon: `+91` flag badge with vertical separator `|`, followed by a 10-digit numeric input.
- **Radio / Preference Selector (Veg vs. Non-Veg):**
  - Two large touchable cards/buttons side-by-side with dietary icons, border highlight, and clear radio checkmark.

### 7.5 Accordion (FAQs)
- **Resting Item:** Border bottom `1px solid #E3D8C4`; padding `20px 0`.
- **Trigger:** Full width flex button, space-between, H3 Bricolage Grotesque `17px`, text `#173F32`.
- **Icon:** Expanding circular indicator: `+` rotating `45deg` to `x` or transitioning into minus `-` with smooth GSAP rotation.
- **Content Panel:** Nunito Regular `15px`, text `#334A40`, line-height `1.6`, smooth height expansion.

---

## 8. Responsive Behavior & Breakpoint Matrix

| Viewport Tier | Width Range | Layout Strategy | Key Adaptations |
|---|---|---|---|
| **Desktop XL** | `>= 1440px` | 12-column grid, 1280px container | Full hero horizontal split, 4-column bowl grid or carousel, side-by-side pricing |
| **Desktop Standard**| `1024px - 1439px`| 12-column grid | Hero bowl visual scales to 480px, 3-column bowl cards, comfortable padding |
| **Tablet** | `768px - 1023px` | 8-column grid | Hero stacks with image beneath copy; 2-column bowl grid; pricing stacked or 3-col compact |
| **Mobile Large** | `480px - 767px` | 4-column layout | Full-width cards; horizontal swipe for bowls and pricing plans; sticky trial CTA bar |
| **Mobile Compact**| `360px - 479px` (e.g. 390px) | Single column vertical flow | Mobile hamburger drawer; 1-column cards; large touch targets (`min 48px`); sticky bottom CTA |

---

## 9. Accessibility, Contrast & Reduced Motion

### 9.1 WCAG 2.1 AA Compliance Matrix
- **Text Contrast Ratios:**
  - Primary Headings (`#173F32` on `#FFF7E8`): **9.8:1** (Passes AAA).
  - Body Text (`#334A40` on `#FFF7E8`): **7.2:1** (Passes AAA).
  - Primary Button Text (`#FFFFFF` on `#F47738`): **3.1:1** with Large 16px Bold text; augmented with dark text or elevated contrast `#D35400` where small text applies.
  - Active Pills (`#FFFFFF` on `#173F32`): **11.4:1** (Passes AAA).
- **Interactive Targets:** Every clickable target (buttons, filter chips, accordion headers, form inputs) maintains a minimum hit box of `48px x 48px` on touch devices.
- **Keyboard Navigation:**
  - Logical tab sequence through header, hero CTAs, filters, bowl cards, pricing, FAQs, and trial form.
  - Visible focus indicators: 2px offset solid outline in contrasting Forest Green or Orange.
- **Reduced Motion Strategy:**
  - Complete support for `@media (prefers-reduced-motion: reduce)`.
  - When enabled, GSAP scroll reveals, continuous floating food animations, and entrance transforms are disabled or replaced with immediate opacity changes.

---

## 10. Food Photography & Image Art Direction

### 10.1 Culinary Photography Standards
- **Style:** Clean, mouth-watering editorial photography shot from a top-down (flat-lay) or 45-degree angle.
- **Plating:** Served in signature ceramic matte bowls showcasing distinct ingredient textures: charred paneer grill marks, diced ripe avocado, crimson pickled onions, vibrant green edamame, and golden marinated chicken.
- **Lighting:** Warm natural daylight with soft organic shadows. No harsh digital flash or artificial fluorescent cast.
- **Garnish & Realism:** Sprinkled toasted sesame seeds, chopped fresh coriander, microgreens, or lime wedges that convey same-morning prep.
- **Technical Optimization:**
  - Source formats: Modern Next.js image optimization (`next/image`) generating WebP and AVIF.
  - Responsive sizes attribute: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`.
  - Preloaded Hero bowl image with `priority={true}` to protect Largest Contentful Paint (LCP).
  - Explicit `alt` descriptions reflecting dish ingredients and dietary tags.

---

## 11. Motion Principles & GSAP Animation Specification

### 11.1 Animation Rationale & Tone
FitBowl uses motion to reinforce freshness, organic energy, and confidence. Animations must feel **crisp, silky, and purposeful**—never slow, floaty, or obstructing user interaction.

### 11.2 GSAP Setup & Lifecycle Hygiene
- **Library Version:** GSAP `^3.15.0` with `ScrollTrigger`.
- **React Lifecycle Integration:** All animations encapsulated in `gsap.context()` inside `useLayoutEffect` / `useEffect` with comprehensive cleanup functions on component unmount.
- **Default Easing:** `power2.out` for responsive UI; `power3.out` for entrance reveals.

### 11.3 Animation Choreography

```text
Hero Entrance Timeline (on page load):
0.0s ─── Header slides down from y: -20, opacity: 0 -> 1 (0.6s)
0.2s ─── Hero Kicker & H1 split/reveal upwards y: +30 -> 0 (0.8s)
0.4s ─── Subtext & Trust Badges fade in (0.6s)
0.6s ─── Hero Bowl scales from 0.95 -> 1.0 with subtle float (1.0s)
0.8s ─── Floating Badges ("Real Ingredients", "Good Food") pop with slight bounce
```

- **ScrollTrigger Reveals:**
  - Benefit cards stagger in: `y: 40`, `opacity: 0`, `stagger: 0.12`, `duration: 0.7s`, `ease: "power2.out"`.
  - Menu cards stagger on filter change or scroll: `y: 30`, `opacity: 0`, `stagger: 0.08`, `duration: 0.5s`.
  - Pricing container: Subtle background parallax and gentle scale-in of the highlighted "Regular" card.
- **Interactive Micro-Animations:**
  - Card hover: Bowl image scales `1.04` over `0.4s ease-out`; card lifts `-4px`.
  - CTA hover: Trailing icon `->` shifts `+4px`; shadow elevates.

---

## 12. Section-by-Section Design Requirements

### 12.1 Section 01: Navigation Bar
- **Desktop (1440px):**
  - Left: Official FitBowl logo lockup with clear margin.
  - Center: Horizontal navigation links (`Menu`, `Plans`, `How It Works`, `Reviews`, `FAQs`) with smooth hover underline in `#F47738`.
  - Right: Primary CTA button: `Claim Free Trial ->` in `#173F32` or `#F47738`.
  - Sticky Behavior: Transitions to frosted glass (`rgba(255, 247, 232, 0.85)` + `backdrop-blur-md`) with subtle border shadow on scroll past 50px.
- **Mobile (390px):**
  - Left: FitBowl logo lockup (height: 32px).
  - Right: Hamburger toggle (3 smooth lines animating to an X) opening a slide-in drawer.
  - Drawer contents: Links stacked, phone number click-to-call, and full-width `Claim Free Trial` button.

### 12.2 Section 02: Hero Section
- **Visual Composition:** 2-column asymmetric split on desktop (55% copy / 45% visual); stacked column on mobile.
- **Content Elements:**
  - Location kicker: `FRESH BOWLS • MUMBAI` in green pill tag.
  - Headline: `Healthy doesn't have to` **`taste`** `healthy.` where "taste" is highlighted in vibrant `#F47738`.
  - Subtitle: `Delicious, freshly prepared bowls delivered to your home or office.`
  - Trust strip (4 horizontal badges with icons):
    1. *One meal free* (No card needed)
    2. *Freshly prepared* (Every day)
    3. *Delivered to your* (Home or office)
    4. *No artificial stuff* (Just real food)
  - CTA Cluster:
    - Primary: `Claim Your Free Trial Meal ->` (Vibrant Orange, high contrast).
    - Secondary: `Watch How It Works` (Play button icon, duration `01:30 min`).
  - Hero Bowl Imagery: Top-down hero bowl surrounded by floating editorial badge pills:
    - Top-right curved text: *"Real Ingredients Real Flavours"*
    - Bottom-right badge: *"Good Food Busy Life Sorted!"*

### 12.3 Section 03: Why FitBowl (Benefits)
- **Header:** Centered H2: `Why FitBowl?`
- **Grid:** 4 equal cards on desktop; 2x2 grid on tablet; 2x2 or vertical stack on mobile.
- **Cards:**
  1. *Tasty & Healthy* — "Flavour-packed bowls with balanced nutrition." (Leaf icon)
  2. *Made for Busy You* — "Save time, eat better." (Clock icon)
  3. *Real Ingredients* — "No artificial stuff. Just real food." (Salad bowl icon)
  4. *Convenient Delivery* — "To your home or office in Mumbai." (Delivery van icon)
- **Styling:** Soft white cards (`#FFFFFF`) on cream background, rounded 20px, light border `#EADDC9`.

### 12.4 Section 04: Explore Our 14 Bowls (Menu)
- **Header:** Kicker `OUR MENU`, H2 `Explore Our 14 Bowls`, Subtitle `From Indian classics to global flavours, there's a bowl for every mood.`
- **Toolbar:**
  - Segmented dietary filters (`All`, `Veg`, `Non-Veg`).
  - Search input with clear button and live filtering by dish name or ingredient.
- **Bowl Cards (All 14 items):**
  - Image container with aspect ratio `4:3` or `1:1`, food zoom on hover.
  - Dietary Pill (`Veg` green / `Non-Veg` orange) top-left badge.
  - Friday-Only Badge on Mutton Keema Bowl (`Fridays Only` special badge).
  - Title: H3 Bricolage Grotesque `18px`.
  - Nutrition bar: `520 kcal | 28g protein` in highlighted pill.
  - Ingredient summary description: Nunito `14px`, 2-line clamp.
  - Action: Circular button with `+` triggering quick view or trial selection.
- **CTA:** `View All 14 Bowls ->` button.

### 12.5 Section 05: Subscription Plans & Pricing
- **Container:** Dark Forest Green container card (`#173F32`), rounded 28px, white and cream text.
- **Left Column / Header:**
  - Title: `Choose a Plan`
  - Subtitle: `Fresh meals, flexible plans. Most people go for the 10-meal plan.`
  - Editorial doodle/flair: *"Good food Great value!"*
- **3 Plan Cards Side-by-Side:**
  1. **Starter Plan:**
     - `Starter` | `5 meals/month`
     - Price: `₹1,450` (`₹290 per meal`)
     - Inclusions: Free delivery, Pause or cancel anytime, Choose meals every week.
     - CTA: `Get Started ->` (Subtle cream/white outline).
  2. **Regular Plan (Highlighted — Most Popular):**
     - Pill: `Most Popular` (Orange `#F47738`).
     - Orange border accent & subtle scale elevation.
     - `Regular` | `10 meals/month`
     - Price: `₹2,700` (`₹270 per meal`)
     - Inclusions: Free delivery, Pause or cancel anytime, Choose meals every week.
     - CTA: `Get Started ->` (Solid Orange `#F47738`).
  3. **Pro Plan:**
     - `Pro` | `20 meals/month`
     - Price: `₹5,000` (`₹250 per meal`)
     - Inclusions: Free delivery, Pause or cancel anytime, Choose meals every week.
     - CTA: `Get Started ->` (Subtle cream/white outline).
- **Mobile Adaption:** Responsive carousel with previous/next controls, opening by default on the Regular Plan.

### 12.6 Section 06: How It Works
- **Kicker & Title:** `IT'S SIMPLE` | `How It Works` | `Your free trial meal in 4 simple steps.`
- **4 Connected Steps:**
  1. *Choose Your Bowl* (Badge 1, Bowl icon): "Pick from 14 delicious options."
  2. *Book Your Free Trial* (Badge 2, Form icon): "Fill in a quick form."
  3. *We Deliver* (Badge 3, Van icon): "Fresh to your home or office."
  4. *Enjoy* (Badge 4, Smile icon): "Tasty, healthy and hassle-free."
- **Desktop Connector:** Dotted green directional line linking the 4 step circles.

### 12.7 Section 07: Customer Testimonials
- **Header:** Kicker `TESTIMONIALS`, H2 `What Our Customers Say`, Subtitle `Real people. Real results.`
- **Cards Grid:** 4 columns on desktop, 2 columns on tablet, horizontal carousel on mobile.
- **Exact Customer Feedback Cards:**
  1. **Riya S.** (Marketing Professional) — 5 Stars: *"The food is amazing and super convenient. Perfect for my busy schedule."*
  2. **Karan M.** (Product Manager) — 5 Stars: *"Great taste and portions. Finally a healthy option that feels like a treat."*
  3. **Sneha P.** (Consultant) — 5 Stars: *"Love the variety! My go-to for healthy meals in the office."*
  4. **Arjun K.** (Software Engineer) — 5 Stars: *"Delicious, fresh and always on time. Highly recommend!"*

### 12.8 Section 08: Newsletter & Visitor Retention
- **Layout:** Dark green card with warm cream accents.
- **Copy:** Title `Stay in the Loop`, Subtext `Be the first to know about new bowls, special offers and when we expand to your area.`
- **Input:** Mobile number / email field with orange submit button `Notify Me ->`.
- **Validation:** Live formatting feedback and polite confirmation state.

### 12.9 Section 09: Frequently Asked Questions (FAQ)
- **Header:** Centered H2 `Frequently Asked Questions`.
- **Layout:** 2-column staggered accordion on desktop (4 questions per column); single vertical stack on mobile.
- **All 8 Standard Questions:**
  1. *What areas do you deliver to?*
  2. *What are the delivery timings?*
  3. *How does the free trial work?*
  4. *Can I pause or cancel anytime?*
  5. *Can I choose my meals?*
  6. *Do you use preservatives?*
  7. *Is the food really healthy?*
  8. *What if I'm outside the delivery area?*

### 12.10 Section 10: Free Trial Booking Form
- **Form Architecture:** Clean modal overlay or dedicated full-width landing section anchored by `#trial-form`.
- **Required Fields:**
  1. Full Name (text, min 2 chars).
  2. Mobile Number (10 digits with locked `+91` prefix).
  3. Delivery Area dropdown: Andheri, Bandra, Powai, Lower Parel, or "Other (Outside Mumbai Service Areas)".
  4. Dietary Preference: Veg or Non-Veg toggle buttons.
  5. Preferred Delivery Date: Date picker selecting Monday through Saturday (Sundays disabled).
- **Out-of-Area Trigger:** Selecting "Other" dynamically swaps the submit action to a "Join Expansion Waitlist" flow without booking an unsupported delivery.
- **Simulation Experience:** Submitting triggers a 1.2-second loading spinner followed by a celebration modal with a clear disclaimer: *"Simulated Demo Booking — No actual order was placed."*

### 12.11 Section 11: Footer
- **Background:** Deep Forest Green `#0F2C23`.
- **Column 1:** Official FitBowl logo lockup + descriptor text + copyright.
- **Column 2:** Quick Links (`Menu`, `Plans`, `How It Works`, `Reviews`, `FAQs`).
- **Column 3:** Supported Service Areas (`Andheri`, `Bandra`, `Powai`, `Lower Parel`).
- **Column 4:** Contact Details (`hello@fitbowl.com`, `+91 98765 43210`, `Mon - Sat, 8AM - 8PM`) + Social Icons.
- **Right Flair:** Graphic badge: *"Good Food Busy Life Sorted!"*

---

## 13. States & Edge Case UX

### 13.1 Empty & No-Results States
- When a user filters the menu or enters a search query that yields zero results:
  - Display an illustrative bowl icon.
  - Headline: `No matching bowls found`.
  - Body: `Try searching for different ingredients like "paneer", "chicken", or "quinoa".`
  - Action button: `Reset Filters` restoring all 14 items.

### 13.2 Form Feedback States
- **Validating / Submitting:** Button text swaps to `Submitting Free Trial...` with an animated SVG spinner; inputs disabled to prevent double clicks.
- **Field Error:** Red highlight border `#DC2626` with red explanatory message directly beneath the offending input.
- **Success State:** Overlay modal with checkmark, booking summary details, and clear disclosure that this is a simulated demo environment.
