# Repo structure

```
Portfolio/
├── app/                        # Next.js App Router
│   ├── api/contact/route.ts    # Resend contact endpoint
│   ├── fonts.ts                # Fraunces / Figtree / Space Mono
│   ├── globals.css             # Tailwind directives + custom textures
│   ├── icon.svg                # favicon
│   ├── layout.tsx              # metadata, JSON-LD, scroll restoration
│   ├── not-found.tsx
│   ├── page.tsx                # composes the one-page site
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/                 # site chrome — Header, SideNav, Footer
│   ├── sections/               # page sections in render order —
│   │                           #   Hero, Experience, Projects, Stack,
│   │                           #   Contact, BuyMeCoffee
│   └── ui/                     # cross-cutting widgets — CustomCursor, Toaster
├── public/                     # served at "/" — see the CSP note below
│   ├── justin-masiga.webp      # hero portrait (1200px)
│   ├── og-image.jpg            # 1200x630 social card
│   ├── Justin_Masiga_CV.pdf
│   └── work/<slug>/            # project screenshots for the Projects grid
├── docs/audit/                 # generated SEO audit output (gitignored)
├── next.config.ts              # justin94.space rewrites + per-route CSP
└── tailwind.config.ts          # semantic colour tokens + font families
```

## Conventions

- **Components are grouped by role, not by feature.** `layout/` is chrome that persists,
  `sections/` maps one-to-one onto the page's scroll sections, `ui/` is everything used
  across more than one section. Imports use the `@/components/<group>/<Name>` alias.
- **Styling goes through the semantic tokens** in `tailwind.config.ts`
  (`ink`, `muted`, `faint`, `line`, `accent-deep`, …). Do not write raw hex in components —
  new routes then inherit the identity for free.
- **This app is the router for justin94.space.** Sibling projects are proxied via
  `rewrites()` in `next.config.ts`. Adding one is a two-repo change — see `CLAUDE.md`.

## Assets: the CSP constraint

`next.config.ts` sets `img-src 'self' data:` for every non-proxied route. **Every image
must be self-hosted under `public/`.** External CDNs (Cloudinary, S3, picsum) are blocked
at the browser and will silently fail in production, not at build time.

Source images that are not shipped live in `D:\AIO Freelance\Assets\portfolio-source\`,
outside this repo.
