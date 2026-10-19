# FitBowl — Healthy Meal Subscription Website

> **"Healthy doesn't have to taste healthy."**  
> Chef-crafted, macro-balanced gourmet meal bowls delivered fresh to homes and offices across Mumbai.

---

## ✉️ Note to the Client (FitBowl Founder)

Dear FitBowl Founder,

Here is your completed website for **FitBowl**! Below is a summary of what was built, how every request from your brief was solved, and the key product decisions made to maximize your free trial bookings.

---

### 1. What was built, and why the page is laid out the way it is

We built a modern, responsive, mobile-first single-page web application using **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS**. Because over 80% of your audience will discover FitBowl via **Instagram ads on their mobile phones**, the page was designed with a tight, high-converting storytelling structure:

1. **Sticky Navigation Bar:** Prominent FitBowl logo with direct quick-links and a persistent `Claim Free Trial` button.
2. **High-Impact Hero Section:** Hooks visitors within 3 seconds with appetizing bowl imagery, clear value proposition (*"Healthy Doesn't Have to Taste Like Cardboard"*), trust badges (FSSAI registered, cooked fresh daily), and immediate dual CTAs.
3. **Why FitBowl (4 Core Benefits):** Overcomes diet skepticism immediately by emphasizing gourmet taste, zero refined sugar/maida, macro tracking, and free delivery across Mumbai hubs.
4. **14 Signature Bowls Catalog:** Interactive menu with instant dietary filters (`All`, `Veg`, `Non-Veg`) and live search. Highlights that the **menu changes every Monday** and displays **daily delivery slots (Lunch 12–2 PM, Dinner 7–9 PM)**.
5. **Subscription Plans & Pricing:** Clean side-by-side comparison of the 3 monthly plans with the **10-Meal Regular Plan prominently highlighted as "Most Popular"**.
6. **How It Works (4 Simple Steps):** Demystifies the ordering process from choosing a bowl to enjoying a fresh meal at home or desk.
7. **Customer Reviews (Social Proof):** Features the 4 authentic testimonials from Mumbai working professionals in Andheri, Powai, Bandra, and Lower Parel.
8. **Stay in the Loop & FAQs (Split Layout):** VIP updates lead-capture module paired with an accessible 8-question accordion answering common objections (freshness, pausing via WhatsApp, Sunday closures).
9. **Free Trial Booking Form:** The primary conversion engine collecting Name, Mobile, Delivery Area, Veg/Non-Veg preference, and Delivery Date.
10. **Mobile Sticky Action Bar:** A floating bottom CTA bar on mobile screens ensuring users can book their trial at any point while scrolling.

---

### 2. What was missing or unclear in the brief, and what we decided

| Ambiguity in Brief | Challenge | Decision & Solution |
|---|---|---|
| **No Logo** | No existing brand asset | Designed an original SVG vector brand identity featuring a fresh organic bowl, vibrant leaf motif, and modern geometric lettering in SVG format for crisp rendering across all screens. |
| **No Brand Colors** | No visual identity guideline | Created an appetite-appealing palette: **Forest Green (`#173F32`)** for wholesome freshness, **FitBowl Orange (`#F47738`)** for appetizing warmth and high-contrast CTAs, **Warm Cream (`#FFF7E8`)** for an approachable background, and **Soft Leaf Green (`#DCEBCF`)** for nutrition badges. |
| **No Food Photos** | Risk of looking sterile | Generated high-resolution, appetizing photographs of all 14 signature bowls with rich garnishes, ensuring the website looks gourmet and appetizing rather than like a clinical diet clinic. |
| **Sunday Deliveries** | FAQ says closed Sundays; booking form needed a date | Implemented date-picker validation that automatically blocks Sundays and requires at least 24 hours advance booking (Mon–Sat only). |
| **No Backend API** | Client requirement to fake submit | Built an async form handler with a 1,000ms simulated network delay, spinner feedback, and an in-place confirmation panel showing full summary details. |
| **Out-of-Area Visitors** | Expanding soon; don't lose leads | Added an `"Other (Outside Mumbai Service Areas)"` option in the area selector. Selecting this dynamically transforms the CTA into `"Register Expansion Interest"` and prompts for the user's locality/pin code so you build an expansion waitlist. |

---

### 3. How each of your 6 requests was handled

1. **Request 1 — Menu:**  
   Showcased all **14 signature bowls** verbatim with exact calories, protein grams, and ingredient descriptions. Added live search, dietary segment tabs (`All`, `Veg (7)`, `Non-Veg (7)`), Monday menu rotation notice, and daily delivery slots (Lunch 12–2 PM, Dinner 7–9 PM).
2. **Request 2 — Plans & Pricing:**  
   Implemented all 3 plans: **Starter** (5 meals @ ₹1,450 / ₹290 per meal), **Regular** (10 meals @ ₹2,700 / ₹270 per meal — highlighted with a glowing "MOST POPULAR" badge), and **Pro** (20 meals @ ₹5,000 / ₹250 per meal). Clearly listed free delivery, pause/cancel anytime via WhatsApp, and weekly meal customization.
3. **Request 3 — Free Trial Booking:**  
   Collects all 5 required data points: Full Name, Mobile Number, Delivery Area, Meal Preference (Veg vs Non-Veg toggle), and Preferred Date.  
   - *Phone accuracy:* Locked `+91` prefix with strict regex validation (`^[6-9]\d{9}$`) so only real 10-digit Indian mobile numbers can submit.  
   - *Area retention:* Captures non-pilot areas in an expansion waitlist.  
   - *Simulation:* Smooth 1s delay with detailed confirmation summary.
4. **Request 4 — Reviews and FAQs:**  
   Included all 4 customer reviews verbatim (Riya from Andheri, Karan's 6kg weight loss journey from Powai, Sneha from Bandra, and Arjun from Lower Parel). Integrated all 8 FAQs into an accessible interactive accordion with smooth collapsible transitions.
5. **Request 5 — People who aren't ready yet:**  
   Built the **"Stay in the Loop"** VIP insider box right beside the FAQs. Visitors hesitant to book a trial today can enter their WhatsApp number to receive secret seasonal menu drops, chef specials, and launch alerts when FitBowl expands to their Mumbai PIN code.
6. **Request 6 — Your own addition (Explained below):**  
   Added an interactive **Bowl Nutrition & Ingredient Deep Dive Modal (`BowlDetailsDialog`)** and a **Mobile Sticky CTA Bar (`MobileStickyCTA`)**.

---

### 4. The feature we added on our own, and why it will bring more bookings

- **Interactive Bowl Details Modal with 1-Click Trial Selection:**  
  When high-intent customers browse the menu, clicking any bowl card opens a gourmet modal showing full macro breakdowns (Protein, Carbs, Fats, Dietary Fiber), complete ingredient tags, and culinary notes. Crucially, it includes a prominent **"Choose this bowl for my Free Trial"** button. Clicking this automatically selects their dietary preference (`Veg` or `Non-Veg`) and smoothly scrolls them directly to the trial booking form.  
  *Why it drives bookings:* Diet decisions are impulse- and appetite-driven. By letting users fall in love with a specific dish and immediately lock it in for their trial, we eliminate browsing hesitation and reduce drop-off.
- **Mobile Sticky CTA Bar:**  
  Floating at the bottom of mobile screens after scrolling past the hero, giving mobile Instagram visitors one-tap access to claim their free trial meal from anywhere on the page.

---

### 5. What we would do next with one more week

1. **WhatsApp Business API Integration:** Automate instant WhatsApp confirmation messages upon booking, including live delivery tracking and calendar invites.
2. **Database & Lead CRM:** Connect Supabase / PostgreSQL via Next.js Server Actions to sync trial leads directly into a dashboard or Google Sheets for the sales calling team.
3. **Subscriber Self-Service Portal:** Allow active subscribers to pause meals for upcoming travel, swap bowls, and select delivery slots directly from their phones.
4. **Interactive Macro / Calorie Calculator:** A 30-second fitness quiz ("Enter your height, weight & fitness goal") that recommends the ideal bowl lineup and subscription plan.

---

### 6. Anything we are not happy with yet

- **Form phone verification is simulated:** While the client-side regex strictly validates Indian 10-digit numbers, integrating real SMS OTP verification (e.g. via Twilio or MSG91) would guarantee 100% callable numbers before the sales team picks up the phone.
- **Custom food photography:** While the AI-generated imagery looks gourmet and appetizing, replacing them with authentic photographs of FitBowl's actual kitchen, packaging, and Mumbai delivery fleet will establish even deeper organic trust.

---

### 7. Where AI tools were used

- **Google Antigravity IDE (Gemini Assistant):** Used for scaffolding component structure, verifying TypeScript schemas, generating responsive layout tokens, and testing GSAP ScrollTrigger animation timelines.
- **Image Generation:** Used to generate high-resolution meal bowl photography and hero visual assets in the absence of initial client photos.
- **Quality Verification:** All code was handwritten and refined under human supervision, verified against strict TypeScript compilation (`tsc --noEmit`), ESLint hygiene, and Next.js 16 production build tests.

---

## 🛠️ Technology Stack

| Layer | Technology | Version | Purpose & Rationale |
|---|---|---|---|
| **Framework** | Next.js (App Router) | `16.4.2` | Turbopack compilation, static page generation, server metadata, and partial prerendering |
| **UI Library** | React & React DOM | `19.3.0` | Modern concurrent primitives and `useSyncExternalStore` for client hydration-safe state |
| **Styling** | Tailwind CSS | `v4.x` | CSS-first `@theme inline` design tokens in `globals.css` |
| **Typography** | Google Fonts | Latest | `Bricolage Grotesque` (punchy editorial headings) & `Nunito` (warm, accessible body text) |
| **Animation** | GreenSock (GSAP) | `^3.15.0` | ScrollTrigger staggered reveals with deterministic cleanup and `prefers-reduced-motion` bypass |
| **Icons** | Lucide React + Inline SVGs | `^1.59.0` | Accessible brand marks and tree-shakeable icons |
| **Type System** | TypeScript | `^5.x` | Strict end-to-end typing for catalog, plans, validation rules, and trial bookings |

---

## 🎨 Brand Design Tokens

```
Forest Green:      #173F32  (Primary Dark Container & Brand Contrast)
FitBowl Orange:    #F47738  (High-Intent CTAs, Accent Badges & Highlights)
Warm Cream:        #FFF7E8  (Primary Page Background & Warm Foundation)
Soft Leaf Green:   #DCEBCF  (Organic Highlights, Badge Tints & Accents)
Deep Text Charcoal:#334A40  (Accessible High-Contrast Body Copy)
Border Neutral:    #E3D8C4  (Delicate Card Dividers & Borders)
```

---

## 🍽️ The 14 Signature Bowls Catalog

| # | Bowl Name | Category | Calories | Protein | Description (from Client Brief) |
|---|---|---|---|---|---|
| 1 | **Peri Peri Paneer Bowl** | Veg | 520 kcal | 28g | Grilled paneer, brown rice, peri peri sauce, charred corn |
| 2 | **Butter Chicken Lite** | Non-Veg | 560 kcal | 38g | Lighter butter chicken, jeera rice, cucumber raita |
| 3 | **Rajma Chawal Remix** | Veg | 480 kcal | 18g | Slow-cooked rajma, red rice, pickled onions |
| 4 | **Thai Basil Chicken** | Non-Veg | 510 kcal | 36g | Basil chicken, jasmine rice, stir-fried veggies |
| 5 | **Mexican Burrito Bowl** | Veg | 540 kcal | 22g | Beans, corn, salsa, sour cream, lettuce, rice |
| 6 | **Tandoori Fish Bowl** | Non-Veg | 450 kcal | 34g | Tandoori basa, quinoa, mint chutney |
| 7 | **Chole Quinoa Bowl** | Veg | 470 kcal | 19g | Amritsari chole, quinoa, onion salad |
| 8 | **Korean Chicken Bowl** | Non-Veg | 590 kcal | 35g | Gochujang chicken, sesame rice, kimchi slaw |
| 9 | **Palak Tofu Bowl** | Veg | 430 kcal | 24g | Palak tofu, millet roti strips, roasted veg |
| 10 | **Egg Bhurji Power Bowl** | Non-Veg | 490 kcal | 30g | Masala egg bhurji, multigrain rice, sprouts |
| 11 | **Mediterranean Falafel** | Veg | 550 kcal | 20g | Baked falafel, hummus, couscous, pickled veg |
| 12 | **Chicken Biryani Fit** | Non-Veg | 600 kcal | 37g | Biryani with less oil, brown basmati, raita |
| 13 | **Teriyaki Mushroom Bowl** | Veg | 460 kcal | 16g | Teriyaki mushrooms, edamame, sticky rice |
| 14 | **Mutton Keema Bowl** | Non-Veg | 620 kcal | 40g | Lean keema, peas, jeera rice (Fridays only) |

*Operational details:* Menu changes every Monday. Delivery slots: Lunch 12–2 PM, Dinner 7–9 PM.

---

## 💳 Transparent Subscription Plans

1. **Starter Plan (₹1,450 / 5 Meals):** ₹290/meal — Free delivery, custom bowl selection, pause anytime.
2. **Regular Plan (₹2,700 / 10 Meals — Most Popular):** ₹270/meal — Free delivery, full menu access, nutrition consultation, flexible pause/cancel.
3. **Pro Plan (₹5,000 / 20 Meals):** ₹250/meal — Best value, free delivery, dedicated nutritionist, chef's weekly surprise specials.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `>= 18.18.0`
- npm `>= 9.0.0`

### 1. Clone & Install
```bash
git clone https://github.com/mubasshir-cyber/fit-bowl.git
cd fit-bowl
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Verification Commands
```bash
# Static type checking
npx tsc --noEmit

# Production build and static page generation
npm run build
```

---

## 📄 License & Attribution

© 2026 FitBowl Technologies Pvt. Ltd. All rights reserved.  
Cooked fresh daily in Mumbai. FSSAI Lic. `11524026000123` (Simulated Demo).
