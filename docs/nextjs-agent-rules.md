# FitBowl — Next.js Agent Rules & Architecture Directives

**Document Version:** 1.0.0  
**Document Status:** Mandatory & Enforced  
**Last Updated:** 2026-10-18  
**Source Origin:** Root [AGENTS.md](file:///e:/company/practice/fitbowl/AGENTS.md)  
**Target Environment:** Next.js `16.4.2` / React `19.3.0`  
**Cross-References:** [rule.md](file:///e:/company/practice/fitbowl/docs/rule.md), [architecture.md](file:///e:/company/practice/fitbowl/docs/architecture.md), [phases.md](file:///e:/company/practice/fitbowl/docs/phases.md)

---

## 1. Mandatory Agent Rule (from `AGENTS.md`)

```markdown
<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
```

---

## 2. Why This Rule Exists

1. **Automated Enforcement by `next dev`:**
   - The block in `AGENTS.md` is generated and automatically re-added whenever the Next.js development server runs (`node_modules/next/dist/server/lib/generate-agent-files.js`).
   - Attempting to delete or alter this comment block in Git will merely re-dirty the working tree on the next `next dev` execution. It must be kept intact in source control.
2. **Next.js 16 Breaking Conventions:**
   - Next.js 16 incorporates breaking shifts from legacy Next.js 13/14/15 patterns, especially regarding React 19 concurrent primitives, async request APIs (such as asynchronous `params`, `searchParams`, `cookies()`, and `headers()`), and updated compiler integrations.
   - AI models trained on older Next.js versions often hallucinate outdated synchronous APIs or legacy `next.config.js` flags.

---

## 3. Local Documentation Path

Rather than guessing APIs or relying on potentially stale training memory, consult the local Markdown documentation bundled directly inside the installed package:

- **Local Docs Directory:** `node_modules/next/dist/docs/`
- **Key Sections:**
  - `node_modules/next/dist/docs/01-app/`: App Router architecture, routing, layouts, and page lifecycles.
  - `node_modules/next/dist/docs/01-app/02-api-reference/`: Technical references for `Image`, `Font`, `Metadata`, and route handlers.
  - `node_modules/next/dist/docs/03-architecture/`: Turbopack compilation and runtime details.

---

## 4. Key Next.js 16 & React 19 Coding Guardrails for FitBowl

When implementing features in this repository:

1. **Explicit Client Directives (`'use client';`):**
   - Components utilizing React hooks (`useState`, `useEffect`, `useRef`, `useLayoutEffect`), browser APIs (`window`, `localStorage`), or GSAP animations **must** declare `'use client';` on the first line.
   - Server Components remain the default for purely static wrappers and metadata injection (`src/app/layout.tsx`).
2. **Async Request Boundaries:**
   - If dynamic route params or search params are accessed in page props or route handlers, treat them as asynchronous promises per Next.js 16 conventions (e.g., `const { slug } = await params;`).
3. **Tailwind CSS v4 Integration:**
   - The project uses Tailwind CSS v4 via `@tailwindcss/turbopack` and `globals.css` with `@theme inline`.
   - Do NOT create a legacy `tailwind.config.js` or `postcss.config.js` unless specifically required by an external tool.
4. **Metadata Management:**
   - Use the official App Router `export const metadata: Metadata = { ... }` in `layout.tsx` or `page.tsx`. Do not import `next/head`.
5. **Image & Font Optimization:**
   - Use `next/font/google` for zero-CLS typography (`Bricolage_Grotesque`, `Nunito`).
   - Use `next/image` with explicit width/height and responsive `sizes` attribute.

---

## 5. Clean Working Tree Policy

- **DO NOT** delete, comment out, or revert `<!-- BEGIN:nextjs-agent-rules -->` in `AGENTS.md`.
- Keep `AGENTS.md` committed alongside documentation to ensure consistent CI/CD runs and local developer onboarding.
