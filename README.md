# 2Skill — Landing page (lite)

Marketing landing page for **2Skill**: we help companies understand how well their
employees use AI on real work, train them on the fundamentals, and show the
improvement. This is the text-only version — it explains what we do and our value
proposition, with no illustrative numbers or charts.

Built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
  app/
    layout.tsx          # metadata, fonts, providers
    page.tsx            # the landing page (composition of sections)
    opengraph-image.tsx # social share image
    globals.css         # theme + animations
  components/
    Providers.tsx       # Framer Motion config (respects reduced motion)
    motion/Reveal.tsx   # scroll-reveal + stagger helpers
    sections/           # Nav, Marquee, Features, BookPilot, Footer
    sections/lite/      # Hero, Problem, HowItWorks, Proof, Outcomes, FAQ
```

## Notes

- The "Book a pilot" form is front-end only. Wire `handleSubmit` in
  `src/components/sections/BookPilot.tsx` to your CRM/email endpoint.
- Animations follow ease-out entrances, GPU-only transforms, and
  `prefers-reduced-motion` support.

## Deploy

Deploys to [Vercel](https://vercel.com) with zero config: import the repo, or run
`npx vercel --prod`.
