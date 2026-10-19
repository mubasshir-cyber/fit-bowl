# FitBowl — Search Engine Optimization (SEO) & Discoverability Specification

**Document Version:** 1.0.0  
**Document Status:** Approved for Implementation  
**Last Updated:** 2026-10-18  
**Author:** Lead SEO Strategist & Technical Performance Engineer  
**Cross-References:** [brd.md](file:///e:/company/practice/fitbowl/docs/brd.md), [ui-ux-specification.md](file:///e:/company/practice/fitbowl/docs/ui-ux-specification.md), [architecture.md](file:///e:/company/practice/fitbowl/docs/architecture.md), [phases.md](file:///e:/company/practice/fitbowl/docs/phases.md)

---

## Table of Contents
1. [Search Intent & Target Audience Analysis](#1-search-intent--target-audience-analysis)
2. [Keyword Strategy & Search Hypotheses](#2-keyword-strategy--search-hypotheses)
3. [Page Titles, Meta Descriptions & Social Graph](#3-page-titles-meta-descriptions--social-graph)
4. [Semantic Document Structure & Heading Hierarchy](#4-semantic-document-structure--heading-hierarchy)
5. [URL & Section Anchor Strategy](#5-url--section-anchor-strategy)
6. [Asset Naming, Image Optimization & Alt-Text Strategy](#6-asset-naming-image-optimization--alt-text-strategy)
7. [Structured Data (JSON-LD Schemas)](#7-structured-data-json-ld-schemas)
8. [Local SEO Strategy (Mumbai & 4 Delivery Hubs)](#8-local-seo-strategy-mumbai--4-delivery-hubs)
9. [Technical SEO, Sitemap & Robots.txt](#9-technical-seo-sitemap--robotstxt)
10. [Core Web Vitals & Mobile-First Indexing](#10-core-web-vitals--mobile-first-indexing)
11. [Analytics, Goals & Conversion Tracking](#11-analytics-goals--conversion-tracking)
12. [SEO Verification & Acceptance Checklist](#12-seo-verification--acceptance-checklist)
13. [Pending & Unverified Items Tracker](#13-pending--unverified-items-tracker)

---

## 1. Search Intent & Target Audience Analysis

### 1.1 Search Intent Profile
The primary audience consists of working corporate professionals, entrepreneurs, and fitness-conscious urbanites living or working in Mumbai. Search behavior falls into three distinct intent categories:

1. **Transactional / High Commercial Intent:**
   - *Example queries:* "healthy meal subscription mumbai", "diet meal delivery bandra", "protein lunch subscription powai", "healthy tiffin service andheri".
   - *User expectation:* Immediate pricing transparency, delivery coverage confirmation, menu options, and a direct way to sample or sign up.
2. **Investigative / Comparison Intent:**
   - *Example queries:* "best healthy meal delivery for office mumbai", "low calorie lunch subscription lower parel", "healthy food vs swiggy daily".
   - *User expectation:* Clear macro counts (calories/protein), hygiene/freshness assurances (cooked same morning, no preservatives), and customer proof.
3. **Informational / Discovery Intent:**
   - *Example queries:* "how many calories in a healthy lunch bowl", "clean eating meal plans mumbai".
   - *User expectation:* Trustworthy nutritional breakdown and appetizing food images.

---

## 2. Keyword Strategy & Search Hypotheses

> [!NOTE]
> Search volume figures represent directional market hypotheses based on corporate density and local search patterns in Mumbai. Exact metrics are subject to verification via Google Search Console post-launch.

### 2.1 Primary Focus Keywords

| Keyword Phrase | Search Intent | Target Section / Mapping | Hypothesized Priority |
|---|---|---|---|
| **healthy meal subscription mumbai** | High Commercial | Page Title, Hero H1, Meta Description | High (Tier 1) |
| **diet food delivery mumbai** | Commercial | Hero Subtitle, Benefits Section | High (Tier 1) |
| **healthy lunch bowls mumbai** | Commercial / Transactional | Menu Section H2, Hero Headline | High (Tier 1) |
| **high protein meal subscription mumbai** | Transactional | Menu Badges, Pricing Section | High (Tier 1) |
| **free trial healthy meal mumbai** | High Transactional | Trial Form Section, CTAs | High (Tier 1) |

### 2.2 Local Geo-Targeted Keywords (Pilot Zones)

| Location | Targeted Long-Tail Keywords | On-Page Context Placement |
|---|---|---|
| **Andheri** | "healthy meal delivery andheri east", "office lunch subscription andheri" | Footer, Trial Area Dropdown, Local FAQ |
| **Bandra** | "healthy food subscription bandra west", "gourmet meal bowls bandra" | Footer, Trial Area Dropdown, Local FAQ |
| **Powai** | "healthy meal delivery powai hiranandani", "corporate lunch bowls powai" | Footer, Trial Area Dropdown, Local FAQ |
| **Lower Parel** | "healthy lunch delivery lower parel", "office meal subscription lower parel" | Footer, Trial Area Dropdown, Local FAQ |

---

## 3. Page Titles, Meta Descriptions & Social Graph

### 3.1 Suggested Page Title & Meta Tags
- **Page Title (`<title>`):**  
  `FitBowl — Healthy Meal Subscription in Mumbai | Fresh Veg & Non-Veg Bowls`  
  *(Length: 68 characters — Optimal for Google SERP displays)*
- **Meta Description:**  
  `Chef-prepared, macro-balanced healthy meal subscription delivered across Mumbai (Andheri, Bandra, Powai, Lower Parel). 14 signature bowls. Claim your free trial today!`  
  *(Length: 158 characters — Within the recommended 150–160 character limit)*

### 3.2 Open Graph & Social Graph (Next.js Metadata API)
```typescript
export const metadata: Metadata = {
  title: 'FitBowl — Healthy Meal Subscription in Mumbai | Fresh Veg & Non-Veg Bowls',
  description: 'Chef-prepared, macro-balanced healthy meal subscription delivered across Mumbai (Andheri, Bandra, Powai, Lower Parel). 14 signature bowls. Claim your free trial today!',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fit-bowl-orpin.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FitBowl — Healthy Meal Subscription in Mumbai',
    description: 'Fresh, chef-crafted healthy bowls delivered to your home or office in Mumbai. One free trial meal with zero payment required.',
    url: '/',
    siteName: 'FitBowl',
    images: [
      {
        url: '/images/hero/hero-bowl.webp',
        width: 1200,
        height: 630,
        alt: 'FitBowl Gourmet Healthy Meal Bowl with Fresh Ingredients',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FitBowl — Healthy Meal Subscription in Mumbai',
    description: 'Fresh, chef-crafted healthy bowls delivered in Mumbai. Claim your free trial meal today!',
    images: ['/images/hero/hero-bowl.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
};
```

---

## 4. Semantic Document Structure & Heading Hierarchy

Strict adherence to a single `<h1>` with logical nested headings guarantees that search engine web crawlers easily interpret the content architecture:

```text
├── H1: Healthy doesn't have to taste healthy. (Hero Section)
│   ├── H2: Why FitBowl? (Benefits Section)
│   │   ├── H3: Tasty & Healthy
│   │   ├── H3: Made for Busy You
│   │   ├── H3: Real Ingredients
│   │   └── H3: Convenient Delivery
│   ├── H2: Explore Our 14 Bowls (Menu Section)
│   │   ├── H3: Peri Peri Paneer Bowl (520 kcal | 28g protein)
│   │   ├── H3: Butter Chicken Lite (560 kcal | 38g protein)
│   │   ├── H3: Rajma Chawal Remix (480 kcal | 18g protein)
│   │   └── ... [All 14 Bowls as H3 tags]
│   ├── H2: Choose a Plan (Pricing Section)
│   │   ├── H3: Starter (5 meals/month)
│   │   ├── H3: Regular (10 meals/month)
│   │   └── H3: Pro (20 meals/month)
│   ├── H2: How It Works (Process Section)
│   │   ├── H3: Choose Your Bowl
│   │   ├── H3: Book Your Free Trial
│   │   ├── H3: We Deliver
│   │   └── H3: Enjoy
│   ├── H2: What Our Customers Say (Testimonials Section)
│   ├── H2: Stay in the Loop (Newsletter Section)
│   ├── H2: Frequently Asked Questions (FAQ Section)
│   │   ├── H3: What areas do you deliver to?
│   │   ├── H3: What are the delivery timings?
│   │   └── ... [All 8 Questions as H3 tags]
│   └── H2: Claim Your Free Trial Meal (Booking Form Section)
```

---

## 5. URL & Section Anchor Strategy

As a high-converting single-page application, clear anchor identifiers allow crawlers and users to bookmark, index, and jump to specific section landmarks:

| Anchor | Target Component | Purpose & SEO Value |
|---|---|---|
| `/#menu` | Menu Section | Deep link for visitors searching "FitBowl menu" |
| `/#plans` | Pricing Section | Deep link for visitors searching "FitBowl pricing & plans" |
| `/#how-it-works`| How It Works | Explains operational 4-step delivery process |
| `/#reviews` | Testimonials | Deep link for visitors evaluating customer reviews |
| `/#faqs` | FAQ Section | Deep link for operational questions |
| `/#trial-form` | Free Trial Form | Direct conversion landing anchor |

---

## 6. Asset Naming, Image Optimization & Alt-Text Strategy

### 6.1 Filename Best Practices
All imagery follows kebab-case naming incorporating descriptive culinary keywords:
- `public/images/logo/fitbowl-logo.svg`
- `public/images/hero/hero-bowl.webp`
- `public/images/bowls/peri-peri-paneer.webp`
- `public/images/bowls/butter-chicken-lite.webp`
- `public/images/bowls/mutton-keema-bowl.webp`

### 6.2 Alt-Text Catalog

| Image File | Alt Text Specification | SEO Rationale |
|---|---|---|
| `fitbowl-logo.svg` | `FitBowl Veg and Non-Veg Healthy Meals Delivered Logo` | Primary brand lockup |
| `hero-bowl.webp` | `Fresh gourmet healthy bowl with grilled protein, chickpeas, avocado, and vegetables delivered in Mumbai` | High LCP asset; captures general meal search |
| `peri-peri-paneer.webp` | `Peri Peri Paneer Bowl with grilled paneer, brown rice, charred corn - 520 kcal 28g protein` | High-protein vegetarian keyword |
| `butter-chicken-lite.webp`| `Butter Chicken Lite healthy bowl with jeera rice and cucumber raita - 560 kcal 38g protein` | Low-calorie Indian classic |
| `mutton-keema-bowl.webp` | `Mutton Keema Bowl with lean minced mutton and brown rice available Fridays only - 620 kcal 40g protein` | Niche Friday specialty |

---

## 7. Structured Data (JSON-LD Schemas)

FitBowl embeds three rich JSON-LD schema blocks in `src/app/layout.tsx` to earn rich snippets in Google search results:

### 7.1 LocalBusiness & FoodEstablishment Schema
```json
{
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "name": "FitBowl",
  "image": "https://fit-bowl-orpin.vercel.app/images/hero/hero-bowl.webp",
  "description": "Healthy meal subscription service delivering freshly cooked veg and non-veg gourmet bowls across Mumbai.",
  "servesCuisine": ["Healthy", "Indian", "Mediterranean", "Asian"],
  "priceRange": "₹₹",
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Andheri, Mumbai" },
    { "@type": "AdministrativeArea", "name": "Bandra, Mumbai" },
    { "@type": "AdministrativeArea", "name": "Powai, Mumbai" },
    { "@type": "AdministrativeArea", "name": "Lower Parel, Mumbai" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "20:00"
    }
  ]
}
```

### 7.2 FAQPage Schema
Enables Google FAQ rich snippets directly in search results for all 8 assignment questions:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What areas do you deliver to in Mumbai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FitBowl currently delivers freshly prepared meals across Mumbai to Andheri, Bandra, Powai, and Lower Parel."
      }
    },
    {
      "@type": "Question",
      "name": "What are the meal delivery timings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lunch is delivered between 12:00 PM – 2:00 PM and dinner between 7:00 PM – 9:00 PM, Monday through Saturday."
      }
    },
    {
      "@type": "Question",
      "name": "How does the free trial work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You receive one completely free trial lunch or dinner bowl delivered to your home or office with zero payment and no credit card required."
      }
    }
  ]
}
```

---

## 8. Local SEO Strategy (Mumbai & 4 Delivery Hubs)

1. **Footer Location Anchors:** The footer explicitly lists `Service Areas: Andheri, Bandra, Powai, Lower Parel`, signaling geographic relevance to search crawlers.
2. **Schema Geography Alignment:** The `areaServed` property in JSON-LD directly mirrors the 4 operational hubs.
3. **Office & Residential Targeting:** On-page copy pairs corporate terminology ("delivered to your office desk or home") with the target Mumbai business parks (BKC Bandra, SEEPZ Andheri, Hiranandani Powai, One World Center Lower Parel).

---

## 9. Technical SEO, Sitemap & Robots.txt

### 9.1 Dynamic Sitemap (`src/app/sitemap.ts`)
```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fit-bowl-orpin.vercel.app';
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
```

### 9.2 Robots.txt (`src/app/robots.ts`)
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fit-bowl-orpin.vercel.app';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

---

## 10. Core Web Vitals & Mobile-First Indexing

Google utilizes mobile-first indexing for ranking. All SEO audits must pass on a simulated mobile 4G viewport:

- **Largest Contentful Paint (LCP):** Preload hero bowl image with `priority={true}` to ensure render `< 2.2s`.
- **Cumulative Layout Shift (CLS):** Provide explicit CSS width and height aspect-ratio constraints on all bowl thumbnails to guarantee `CLS < 0.05`.
- **Interaction to Next Paint (INP):** Ensure debounce on search inputs and non-blocking event handlers to guarantee `INP < 100ms`.

---

## 11. Analytics, Goals & Conversion Tracking

Recommended Google Tag Manager (GTM) / Google Analytics 4 (GA4) configuration:

| GA4 Event Name | Trigger Condition | Conversion Goal? |
|---|---|---|
| `generate_lead` | User submits valid Free Trial Booking | **Primary Conversion** |
| `join_waitlist` | User submits out-of-area waitlist form | **Secondary Conversion** |
| `select_item` | User clicks `+` on a specific bowl card | Micro-conversion |
| `view_pricing` | User scrolls past `#plans` | Behavioral event |
| `scroll_90` | User reaches bottom 90% of page | Engagement event |

---

## 12. SEO Verification & Acceptance Checklist

- [ ] Unique, compelling `<title>` and `<meta name="description">` configured in `layout.tsx`.
- [ ] Exactly one `<h1>` present on the page (`Healthy doesn't have to taste healthy.`).
- [ ] Heading hierarchy follows H1 -> H2 -> H3 logically without skipping levels.
- [ ] All 14 bowl cards include descriptive alt-text with dish name, ingredients, calories, and protein.
- [ ] Open Graph and Twitter Card tags render properly when tested with metadata debuggers.
- [ ] JSON-LD schemas (`FoodEstablishment`, `FAQPage`) validate with zero errors in Google's Rich Results Test.
- [ ] `/sitemap.xml` and `/robots.txt` endpoints return valid HTTP 200 responses.
- [ ] Mobile responsive layout passes Google Mobile-Friendly standards without horizontal overflow.

---

## 13. Pending & Unverified Items Tracker

| Item | Current Assumption | Pending Confirmation |
|---|---|---|
| **Production Domain URL** | Configured live production `https://fit-bowl-orpin.vercel.app` | Verified live Vercel deployment |
| **Google Search Console Verification** | Pending live URL | Submit sitemap post-deployment |
| **Verified Physical Kitchen Address** | General Mumbai hubs listed | Exact kitchen address for `LocalBusiness` schema |
| **Customer Support Phone** | Displayed as `+91 98765 43210` | Real operational business telephone line |
