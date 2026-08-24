# BOLDINK DESIGNS — Portfolio Website

A dark, luxury, motion-led portfolio site for BOLDINK DESIGNS (Nelson Kariuki), built from your real Behance work.

## Real portfolio content

I pulled your live Behance profile. These 11 projects will be used — real titles and real cover images, no stock, no invented work:

- Product Design and Visualization
- Club Designs
- Infographics
- Travel Design
- Event Invitation
- Events Flyers and Posters
- Posters and Flyers Designs
- Roll Ups and Banners
- Skin Retouching
- Social Media Designs (2 galleries)

For each project I'll scrape the gallery page to collect its image set, then build: cover, gallery, title, category, overview, tools, year, "View on Behance" link, and a full case study page at `/work/<slug>`.

## Pages

- `/` — Hero, selected work, services, about, skills, process, testimonials, contact
- `/work` — Full masonry grid with category filter + search
- `/work/$slug` — Case study: hero image, overview, goals, process, palette, typography, gallery, results, next-project nav
- `/about`, `/contact` — dedicated pages
- 404 + error pages (already scaffolded, restyled to brand)

## Design

- Palette: `#050505` background, `#101010` secondary, `#151515` cards, white / `#B7B7B7` text, electric blue accent with soft blue glow, `#00FF99` success, `#FF4B4B` danger — all as semantic tokens in `src/styles.css`.
- Typography: modern geometric display + clean body pair, large headings, generous spacing.
- Your logo used in nav, footer, loader, splash, favicon and mobile icon — unmodified. Favicon generated from the transparent logo mark.
- Your portrait used in the About section.

## Motion

Framer Motion (React-native semantics) + GSAP ScrollTrigger + Lenis smooth scroll: animated loader, page transitions, text/image reveals, parallax, magnetic buttons, custom cursor, mouse-follow glow, scroll progress, floating gradient lighting in the hero. Reduced-motion respected throughout.

## Contact form

Enabling Lovable Cloud for the backend: submissions stored in a `contact_submissions` table and emailed to kariukinelson80@gmail.com. Zod validation client and server, honeypot + rate limiting per IP, duplicate-submission guard, generic error messages, success animation. Contact details (0791 735 372, kariukinelson80@gmail.com) and Behance/Instagram/LinkedIn/Facebook/Dribbble links shown in footer and contact page.

## SEO, accessibility, performance

Per-route metadata, canonical, Open Graph, Twitter cards, JSON-LD (Organization, Person, CreativeWork, Breadcrumb), robots.txt, dynamic sitemap covering every project route. Semantic HTML, keyboard nav, visible focus, alt text, AA contrast. Lazy loading, code splitting for heavy motion libs, optimized images, route prefetch.

## Technical notes

- Stack is **TanStack Start + React 19 + TypeScript + Tailwind v4** (this platform's fixed stack) — not Next.js. Everything requested maps over: file-based routing, SSR, server functions instead of route handlers, `head()` instead of the Metadata API. Deployment is Lovable's hosting rather than Vercel.
- Behance images are hot-linked from Behance's CDN; if any block hotlinking I'll mirror them into project assets.
- Three.js is skipped in favour of GPU-cheap CSS/canvas gradient lighting in the hero — same look, far better Lighthouse score. Say the word if you want an actual WebGL scene.
- Security headers (CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) are set by the hosting layer; app-level protections (validation, sanitization, rate limiting, no secret leakage) are implemented in code.
- Cloud auth is left unwired but the schema and role table pattern are architected so an admin dashboard/CMS can be added later without refactor.

## Build order

1. Scrape all 11 Behance galleries into a typed project data module
2. Design system, tokens, fonts, logo assets, favicon
3. Shell: loader, cursor, Lenis, nav, footer, page transitions
4. Home sections
5. Work index + case study route
6. Cloud + contact form
7. SEO, sitemap, a11y and performance pass
