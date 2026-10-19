# FitBowl Assignment Assessment & UI/UX Review

**Review date:** 18 October 2026  
**Assessment source:** FitBowl Developer Assignment (AdsCult), five pages  
**Reviewed site:** local FitBowl app at `http://localhost:3000/`  
**Browser checks:** Chromium at 1440×900, 768×1024, and 390×844; menu expansion, category filters, and search were exercised.

## Executive assessment

The local site is a polished, recognizable responsive prototype with a strong visual direction and several useful conversion features. It does **not yet meet every assignment criterion** and should not be submitted as-is. The most serious issue is that the README’s advertised production URL, `https://fitbowl.vercel.app`, currently serves a different smoothie-bowl website. The local app is not available at that URL, and its canonical/social metadata points there too.

Other important gaps are inaccurate or invented customer reviews and FAQ content, unverified business and nutrition claims, an inaccurate README menu table, and a missing concise founder-facing decision note covering all requested points. The local implementation is a good base, but factual accuracy and submission readiness need attention before the 48-hour exercise is handed in.

## Criteria-by-criteria review

| Assignment criterion | Result | Evidence and notes |
|---|---|---|
| Build a single-page, responsive FitBowl landing page | **Meets, with a tablet polish gap** | The local page has a complete landing-page flow and works at desktop and mobile widths without horizontal overflow. At 768px, the desktop navigation and header CTA wrap awkwardly; make the header collapse or rebalance at that breakpoint. |
| Decide how to handle missing logo, colors, and photos; explain the decision | **Partially meets** | The site has a coherent logo, palette, and food photography. The README calls these the “official” identity even though the brief supplied none. Describe them as a proposed concept and explain the choices and image provenance/licensing. |
| Show all 14 bowls with supplied names and nutrition | **Mostly meets in the app** | The menu initially shows four bowls and can expand to all 14. Search, Veg/Non-Veg filters, and a details view work. Core names, calories, and protein match the brief. Additional macro values and ingredient details are not established by the assignment and need verification or clear estimation labels. The README nutrition table contradicts the assignment and app for several bowls. |
| Show all three meal plans with exact prices and mark Regular as popular | **Core requirement meets** | The 5-, 10-, and 20-meal prices and per-meal prices are correct; the 10-meal plan is marked popular. Several extra plan benefits in the UI/README are unsupported by the brief and should be confirmed before being presented as real commitments. |
| Collect the five required trial details and simulate submission | **Meets the main flow** | The form collects name, Indian mobile, area, preference, and date; it uses client-side checks, a delayed response, and clearly says it is a demo. It also routes out-of-area visitors to an expansion/waitlist flow. The form was reviewed in code but not submitted during this browser review. Improve native required semantics, accessible error associations, name handling, and Sunday selection feedback. |
| Use the supplied customer reviews | **Does not meet accurately** | The page shows four rewritten, generic testimonials rather than the supplied quotes and author details. The README calls them “verified,” which is unsupported. Use the exact supplied content and avoid verification claims unless the reviews are actually verified. |
| Use the supplied FAQ content | **Partially meets** | Several topics are represented, but the FAQ set omits the Jain-friendly, same-morning/never-frozen, and replacement-if-dissatisfied questions. Some answers add unsupported claims such as one-click account controls and certified nutritionists. Certain strings display raw HTML entities such as `&apos;` and `&ldquo;` in the rendered page. |
| Keep visitors who are not ready to book | **Partial** | A “Stay in the Loop” signup provides a useful second path, but it is simulated and does not persist contacts. Its field says mobile while validation accepts email too. Clarify the choice, add a visible label/privacy note, and connect it to a real lead destination for production. |
| Add one original feature and explain why it helps bookings | **Feature present; rationale missing** | Search/filtering, bowl details, and the sticky mobile CTA are useful additions. The README should explicitly select the original feature and explain how it reduces friction or improves trial bookings. |
| Explain ambiguous decisions, missing inputs, and what to do next | **Does not meet the requested note format** | The README is extensive technical documentation, but does not clearly answer every founder-note prompt: how requests 1–6 were handled, assumptions, chosen feature/rationale, next-week priorities, what is unsatisfactory, and missing information. |
| Disclose AI tools | **Partially meets** | The README includes an AI disclosure. Confirm it accurately lists the tools used for the submitted work and update it if needed. |
| Provide a working deployed link, GitHub link, README, and incremental commits | **Not submission-ready** | The GitHub repository is public and local history contains multiple incremental commits. The advertised Vercel URL is a different website, so a correct deployed FitBowl link is not verified. The current marquee adjustment is also uncommitted in the local working tree. |

## What is working well

- **Visual hierarchy:** the oversized headline, orange primary action, restrained secondary action, and food photography make the goal obvious.
- **Brand direction:** cream, forest green, and orange feel coherent and appropriate for a fresh-food subscription. The layout reads as a designed brand rather than a generic template.
- **Conversion path:** the free-trial CTA is prominent, with a secondary explainer and reassurance close by.
- **Responsive behavior:** at 390px the hero stacks cleanly, the menu remains usable, and the page has no horizontal overflow. At 1440px the desktop composition is balanced.
- **Menu interaction:** all 14 items are available; category filtering and search compose correctly, including the empty-result state.
- **Useful accessibility foundations:** one H1 is present, accordion buttons expose expanded state, and the trial flow gives inline feedback.
- **Responsive marquee:** in a fresh page, the marquee path recalculated after viewport changes without a reload. Its responsive geometry should remain covered in future visual checks.

## Highest-priority fixes

### P0 — Make the submitted site and its metadata point to the same product

Deploy this FitBowl app to a URL you control, verify that exact URL in Chromium, and update the README, canonical URL, Open Graph URL, and any structured-data URLs to match. The current `fitbowl.vercel.app` destination is a different smoothie-bowl site. Do not submit it as the live FitBowl build.

### P1 — Reconcile all customer-facing facts with the brief

- Replace the testimonials with the supplied quotes, names, ages, and neighborhoods; remove “verified” unless evidence exists.
- Restore the missing FAQ topics and correct unsupported answers. Render punctuation as characters, not literal HTML entities in React text.
- Remove or validate extra nutrition numbers, macros, ingredient claims, plan perks, nutritionist claims, and operational promises.
- The local footer/structured data contains a sample telephone number, email, and FSSAI number. They must not appear as real business credentials. Remove them or label them unmistakably as demo placeholders until the business supplies verified details.
- Correct the README’s bowl table against the assignment and the canonical app data. Examples of mismatches include Rajma protein, Mexican calories/protein, Tandoori calories/protein, Chole values, Egg calories, Falafel calories/protein, and Biryani calories/protein.

### P1 — Rewrite the README as the requested short client note

Keep technical setup details, but add a short founder-facing section that states: what was built and why it is laid out this way; what was unclear and the assumptions made; how each of the six requested items was handled; the original feature and its booking benefit; the next-week plan; what remains unsatisfactory; and the AI tools used. Explain that the identity is a proposed direction and identify photo sources/rights.

### P1 — Verify the actual handoff

Commit the pending marquee change as a discrete change, confirm the repo’s latest state is pushed if required by the assignment, then deploy and verify the correct public URL. The current local uncommitted change is `src/components/sections/HeroMarquee.tsx`.

## Senior front-end and UI/UX recommendations

### Responsive layout and conversion

1. **Fix the tablet header around 768px.** The menu links and trial button wrap, which makes the header look unfinished. Collapse to the mobile menu earlier or use a deliberate compact tablet layout; keep the CTA label on one line.
2. **Protect the hero text from marquee overlap at intermediate sizes.** Keep the path behind the content as a decorative layer, but use responsive geometry and a reliable resize observer. Check widths around each breakpoint, not only phone and full desktop. Preserve the current successful desktop/mobile composition.
3. **Keep the trial CTA easy to reach on mobile.** The sticky CTA is a good idea; verify it does not obscure form controls or browser safe areas and that it disappears when the main trial form is in view.
4. **Make the next step concrete.** Trial confirmation should tell the visitor what happens next and when the team will call. The current demo disclosure is appropriate for a prototype; a production version needs a real handoff and honest confirmation state.

### Accessibility and trust

- The orange `#F47738` against the cream `#FFF7E8` is approximately **2.62:1**; white text on the orange CTA is approximately **2.78:1**. Both fall short of WCAG AA text contrast. Darken the orange, use dark text on orange, or choose a higher-contrast treatment; then recheck all text sizes and states.
- Add native `required`/appropriate input types, autocomplete and input mode, `aria-invalid`, and `aria-describedby` connections for trial errors. Keep keyboard focus visible and announce submission errors/success to assistive technology.
- The name check accepts only ASCII letters and a narrow set of punctuation. Permit real names written in local scripts and with accents; avoid rejecting valid customer names.
- Prevent Sunday selection where supported, or explain the restriction before the user submits. The current form can let the user choose Sunday and only then reject it.
- Give the “Stay in the Loop” field a visible label and explicitly choose phone or email. Explain what updates are sent and how the contact will be used.

### Motion and polish

- Keep the animated marquee as subtle brand atmosphere. It can pass behind CTA areas as in the reference, while buttons and copy remain readable and in the foreground.
- Honor `prefers-reduced-motion`; pause or reduce the marquee for users who request less motion. Avoid restarting the animation on every resize.
- Add restrained hover/focus states to menu cards and buttons, and a short, low-motion reveal for bowl details. Avoid adding more decorative animation until the factual content and booking path are correct.
- Consider a small success-state transition after a real trial request, but do not animate away validation messages or move focused controls unexpectedly.

### Performance and maintainability

- Serve responsive, compressed bowl images with explicit dimensions and appropriate `sizes`; lazy-load below-the-fold images and avoid delaying the hero image.
- Measure mobile LCP, CLS, and total image weight with a production build and Lighthouse before launch. Check that font loading does not shift the large hero heading.
- There are overlapping newsletter implementations (`FAQNewsletterSection` and a separate `NewsletterSection` module). Consolidate the behavior to one component once the lead-capture destination is decided.
- Keep nutrition and pricing facts in a single canonical data source, then ensure UI, structured data, README, and metadata use consistent values.

## Suggested release checklist

1. Correct the public deployment and all canonical/social URLs.
2. Replace invented reviews, restore the complete supplied FAQ set, and remove unsupported claims/placeholders.
3. Reconcile the README menu data and write the short founder note with all requested decision points and accurate AI disclosure.
4. Fix tablet header wrapping, contrast, and form semantics/date feedback.
5. Commit the pending marquee change, deploy, and verify desktop, tablet, and mobile at the production URL.

## Review limits

This review covers the assignment PDF, repository documentation/source, the local site in Chromium at the listed viewport sizes, and a limited set of menu interactions. It does not certify production performance, legal/regulatory accuracy, actual lead storage, payment/booking integrations, or a successful trial submission. No website files were changed for this report.
