@AGENTS.md

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

---

# Claude.md — AIO Freelance Portfolio

## Project Overview

Next.js portfolio website for Justin Masiga, a full-stack developer & AI operations engineer. Built with Next.js 16, React 19, Tailwind CSS 3, and Framer Motion.

**Live:** https://justinmasiga.vercel.app/ (also served at https://justin94.space/ — see below)  
**GitHub:** https://github.com/tsujintsujin/portfolio  
**Local:** `npm run dev` at http://localhost:3000

**Cross-project notes vault:** `D:\AIO Freelance\Notes\` (Obsidian) — curated, human-maintained notes covering the whole workspace (Portfolio, Dashboard, Fiverr, this domain's routing, tooling, TODOs). Not auto-loaded like this file — check `Notes\Workspace.md` for the current project index when working on anything outside Portfolio itself, or when this file feels out of date.

---

## Available Skills (Use These!)

Located in `.claude/skills/`:

- **`/ui-ux-pro-max`** — Design, typography, color systems, responsive layouts. Use for UI/design decisions.
- **`/frontend-design`** — Design canvas, mockups, visual prototyping.

**How to invoke:** Use `/skill-name` or the `Skill` tool directly. **Don't skip these** — they provide project-specific context.

---

## Discord Task Notifications

A `Stop` hook posts to a Discord webhook every time Claude finishes responding, with a detailed embed: what was requested (last real user message) and what was done (Claude's final summary), pulled straight from the session transcript.

- **Config:** `.claude/settings.local.json` (gitignored, local-only — never commit this file or paste the webhook URL elsewhere, including here in CLAUDE.md)
- **Webhook URL:** stored under `env.DISCORD_WEBHOOK_URL` in that file
- **Hook:** `hooks.Stop` — runs `.claude/hooks/notify_discord.py`, which reads `transcript_path` from the hook's stdin JSON, extracts the last user request + Claude's final response text, and posts a Discord embed
- **Debug log:** `.claude/hooks/notify_debug.log` (local-only) — check here first if a notification doesn't arrive
- To change the channel, replace the URL in `settings.local.json` only

---

## Known Issues & Workarounds

### Tailwind CSS 4 → 3 Downgrade ✓ RESOLVED

**Status:** Fixed by downgrading to Tailwind CSS 3.

**Why:** Tailwind CSS 4 with `@tailwindcss/postcss` plugin broke CSS loading in dev mode. The issue was intermittent — CSS would load when DevTools opened but not on normal page loads.

**Solution Applied:**
- `package.json`: `tailwindcss: "^3"` (was `"^4"`)
- Removed `@tailwindcss/postcss` plugin
- `postcss.config.mjs`: Uses `tailwindcss` + `autoprefixer` (standard v3 setup)
- `app/globals.css`: Uses `@tailwind` directives (not `@import`)

**If CSS breaks again:**
1. Clear cache: `rm -rf .next node_modules/`
2. Reinstall: `npm install`
3. Restart dev server: `npm run dev`
4. Hard refresh browser: `Ctrl+Shift+R` (or `Cmd+Shift+R`)


## Project Structure

```
Portfolio/
├── app/
│   ├── page.tsx              # Main home page (client component)
│   ├── layout.tsx            # Root layout (metadata, fonts, ToastContainer)
│   ├── globals.css           # Tailwind + custom CSS (grid texture, animations)
│   ├── api/
│   │   └── contact/route.ts  # Resend email API endpoint
│   └── components/           # Component library
│       ├── Header.tsx
│       ├── Hero.tsx
│       ├── Experience.tsx
│       ├── Projects.tsx
│       ├── Stack.tsx
│       ├── Contact.tsx
│       ├── BuyMeCoffee.tsx   # GCash donation modal
│       └── Footer.tsx
├── public/
│   └── JustinM.jpg           # Profile photo
├── package.json              # Dependencies (Next.js, Tailwind, Framer Motion, Resend)
├── tailwind.config.ts        # Tailwind theme (colors, fonts, extends)
├── postcss.config.mjs        # PostCSS plugins (tailwindcss, autoprefixer)
├── next.config.ts            # Next.js config (image remotePatterns)
├── .claude/
│   ├── settings.json         # Permissions, plugins
│   └── launch.json           # Dev server config
└── CLAUDE.md                 # This file
```

---

## Testing Workflow

### Visual Testing (Desktop)

1. Start server: `npm run dev`
2. Open http://localhost:3000 in Chrome
3. Test sections:
   - Header navigation & CTA buttons
   - Hero section (profile image, text rendering)
   - Experience, Projects, Stack sections
   - Contact form (submit flow)
   - GCash donation modal
   - Footer links & navigation

### Interactive Testing Checklist

- [ ] Navigation links scroll to sections (smooth scroll)
- [ ] Hover states on buttons & links work
- [ ] Contact form validation (required fields)
- [ ] Contact form submission (Resend API)
- [ ] GCash modal opens/closes
- [ ] Animations on scroll/load (Framer Motion)
- [ ] Mobile responsive (test at 375px, 768px, 1024px)

### Responsive Design

Test at:
- **Mobile:** 375×812 (iPhone)
- **Tablet:** 768×1024 (iPad)
- **Desktop:** 1280×800+ (default)

Use Chrome DevTools: `F12` → Device Toolbar (`Ctrl+Shift+M`)

---

## Dependencies & Versions

| Package | Version | Notes |
|---------|---------|-------|
| Next.js | ^16.1.6 | Turbopack, App Router, React 19 support |
| React | ^19.2.3 | Latest stable |
| Tailwind CSS | ^3 | (downgraded from v4 for stability) |
| Framer Motion | ^11.0.0 | Page & component animations |
| Resend | ^3.2.0 | Email API (Contact form) |
| react-toastify | ^9.1.3 | Toast notifications |

---

## Environment Variables

Create `.env.local` if needed:

```env
# Email (Resend API)
NEXT_PUBLIC_RESEND_API_KEY=your_resend_key_here

# Optional: Analytics, etc.
```

**Vercel deployment:** Set vars in Vercel project settings (Settings → Environment Variables).

---

## Deployment

### Vercel

1. Push to GitHub: `git push origin master`
2. Vercel auto-deploys on push
3. Check build logs: https://vercel.com/tsujintsujins-projects/portfolio

**Known issue (Vercel):** Same Tailwind CSS 4 build error. Solution applied locally should fix it.

### Build Locally

```bash
npm run build
npm run start
```

---

## Git Workflow

### Commit Convention

```
<type>(<scope>): <subject>

<body>

Co-Authored-By: Claude <noreply@anthropic.com>
```

Types: `feat`, `fix`, `refactor`, `test`, `docs`, `style`, `chore`

### Before Pushing

1. Test locally: `npm run dev` → manual testing
2. Check linting: `npm run lint` (if configured)
3. Stage specific files: `git add <files>` (not `git add .`)
4. Commit with message: `git commit -m "..."`
5. Push: `git push origin <branch>`

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server at :3000
npm run build           # Production build
npm run start           # Start production server
npm run lint            # ESLint check

# Git
git status              # See changes
git add <file>          # Stage specific file
git commit -m "msg"     # Commit with message
git push                # Push to GitHub
git log --oneline       # Recent commits

# Cleaning
rm -rf .next            # Clear Next.js cache
rm -rf node_modules     # Clear dependencies (then: npm install)
```

---

## Contact Form (Resend API)

**File:** `app/api/contact/route.ts`

**Flow:**
1. User fills form → validates client-side
2. Form submits to `/api/contact` (POST)
3. Resend API sends email to `justin.masiga.94@gmail.com`
4. Toast notification on success/error

**To test:**
1. Get Resend API key: https://resend.com
2. Set `NEXT_PUBLIC_RESEND_API_KEY` in `.env.local`
3. Fill form at http://localhost:3000#contact
4. Submit → check inbox

---

## GCash Donation Modal

**File:** `app/components/BuyMeCoffee.tsx`

**Status:** Code written, not yet tested interactively.

**To test:**
1. Scroll to "Buy me a coffee ☕" section
2. Click "Support with GCash" button
3. Modal should open with QR code (or payment details)
4. Test close button & overlay click

---

## Troubleshooting

### Page is blank after reload

**Cause:** CSS not loading (usually cache issue)  
**Fix:**
```bash
rm -rf .next
npm run dev
# Hard refresh: Ctrl+Shift+R
```

### Contact form won't submit

**Check:**
1. Browser console for errors (`F12` → Console)
2. Network tab — see API response
3. `.env.local` has `NEXT_PUBLIC_RESEND_API_KEY`
4. Resend API key is valid & active

### Images not loading

**Check:**
1. Image path in component (should be `/JustinM.jpg`)
2. File exists in `public/` folder
3. Next.js Image optimization — check `next.config.ts`

### Animations not triggering

**Check:**
1. Framer Motion is imported correctly
2. Scroll observer is working (console logs)
3. Browser dev tools → disable animations to test other features

---

## Notes for Claude

- **Use the skills** (`/ui-ux-pro-max`, `/frontend-design`) for design decisions
- **Read this file first** before starting work
- **Diagnose before acting** — don't downgrade packages or make major changes without understanding the issue
- **Test visually** — run the dev server and actually use the site, not just read code
- **Respect local settings** — don't ignore `.claude/` folder structure
- **Ask questions** before making assumptions
- **Keep CLAUDE.md updated** as the project evolves

---

**Last Updated:** 2026-08-20  
**Author:** Justin Masiga + Claude  
**Status:** Active development
