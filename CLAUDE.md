@AGENTS.md

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

---

# CLAUDE.md — Portfolio (justin94.space)

Justin Masiga's portfolio, and the router for justin94.space (the `rewrites()` in `next.config.ts`
proxy other projects under their paths; see the workspace CLAUDE.md before touching them).

**Live:** https://justin94.space/ (Vercel project `portfolio`) · **GitHub:** tsujintsujin/portfolio ·
**Local:** `preview_start portfolio` (port 3010). Merging to master deploys.

## Redesign (2026-09-26/27) — what the site is now

Serious, confident, glassmorphism on Apple's palette (#F5F5F7, #1D1D1F, #AAAAAA, #007AFF).
**Dark is the default theme**; the header toggle sets `data-theme="light"` on `<html>` and saves it in
localStorage (inline script in `app/layout.tsx` applies it before first paint). Colours are CSS variables
(RGB triplets) in `app/globals.css`, exposed as Tailwind tokens (`canvas`, `surface`, `ink`, `muted`,
`line`, `accent`, `accent-text`, `positive`, `negative`). One typeface: Geist (Geist Mono only for figures
in the data tiles). `.glass` is the frosted surface; radius is set per use (hierarchy).

Sections (`app/page.tsx`): Hero (with the live assistant console) → Work → Data → Experience → Skills → Contact.
Removed on purpose: the floating left side nav, the paper-plane cursor, the GCash "buy me a coffee" box, toasts.

**Content has one source:** `lib/content.ts` (from the CV, `D:\AIO Freelance\Resumes\Justin_Masiga_CV.pdf`,
copied to `public/Justin_Masiga_CV.pdf`) and `lib/projects.ts`. The page and the AI assistant both read
them, so they never disagree. All copy went through /humanize; project write-ups follow the CV's voice
(problem, then what was built).

### Work section
- Desktop (≥1280): `components/work/PhoneCarousel.tsx` (swipe the phone, click a side screen, arrows or
  keys; one project visible each side, fading 0→85% toward the phone by distance; sticky) + a glass panel
  with the problem/solution and a `DeviceMockup` (CSS monitor + phone around real screenshots).
  Below 1280 it becomes stacked cards (no carousel).
- Screenshots per project in `public/work/<id>/`: `phone.webp` (homepage on a phone, 390x844@2x),
  `mock-desktop.webp` (1440x900) and `mock-mobile.webp` of the feature that matters. They were captured
  2026-09-26 from the live sites with Playwright. TheJobStash's is a real digest from Justin's own CV
  (email scrubbed); Aqua's is the local build's front desk on the busiest demo day, with Justin's own
  test accounts relabelled as demo customers for the capture only.

### AI (Cloudflare Workers AI, Llama 3.3 70B, free tier shared with the Bates demo)
browser → `/api/chat` or `/api/analyst` (same origin) → Worker `portfolio-chat`
(`chat-worker/`, deploy with `cd chat-worker && npx wrangler deploy`; secret `PORTFOLIO_KEY`).
Env: `PORTFOLIO_CHAT_URL`, `PORTFOLIO_CHAT_KEY` (Vercel prod/preview/dev, `.env.local`,
`Credentials/Portfolio/chat.env`), plus `RESEND_API_KEY`.
- **Assistant** (`lib/assistant.ts` prompt + knowledge, `app/api/chat/route.ts`): answers about Justin,
  says yes to availability, `<<CV>>` → download card, and for quotes collects need + name + email, then
  `<<LEAD {...}>>` → Resend email to justin.masiga.94@gmail.com with a summary and the whole
  conversation (Reply-To = visitor). No database: the email is the record. The hero console and the
  floating button share one thread (`components/assistant/ChatProvider.tsx`, sessionStorage).
  `lib/lead.ts` parses the tag (tolerates the model's slips); check: `npx tsx lib/lead.check.mts`.
- **Analyst** (`app/api/analyst/route.ts`) over `lib/sampleData.ts` (a made-up FMCG supplier; derived
  figures precomputed so the model never does arithmetic). Every answer is checked by `lib/grounding.ts`
  (figures must exist in the data; region questions must use that region's figures), one corrected retry,
  then it declines rather than guess. Check: `npx tsx lib/grounding.check.mts`.
- The Data wall (`components/data/`) is CSS-animated columns (two copies, move by exactly one copy),
  paused on hover/focus, still under reduced motion.

### Verifying
Chrome pauses animation frames in a backgrounded tab, so Framer/CSS motion looks frozen when Justin's
window isn't in front. Use headless Playwright (python) for visual/animation checks and mid-interaction
frames; real Chrome for clicking through. `resize_window` doesn't narrow the maximized Chrome window; use
Playwright at 390x844 for phone checks.

ESLint has no config file in this repo (predates the redesign), so `npm run lint` fails; `npx tsc --noEmit`
and `npm run build` are the gates.

## Discord Task Notifications

A `Stop` hook posts to a Discord webhook every time Claude finishes responding, with a detailed embed: what was requested (last real user message) and what was done (Claude's final summary), pulled straight from the session transcript.

- **Config:** `.claude/settings.local.json` (gitignored, local-only — never commit this file or paste the webhook URL elsewhere, including here in CLAUDE.md)
- **Webhook URL:** stored under `env.DISCORD_WEBHOOK_URL` in that file
- **Hook:** `hooks.Stop` — runs `.claude/hooks/notify_discord.py`, which reads `transcript_path` from the hook's stdin JSON, extracts the last user request + Claude's final response text, and posts a Discord embed
- **Debug log:** `.claude/hooks/notify_debug.log` (local-only) — check here first if a notification doesn't arrive
- To change the channel, replace the URL in `settings.local.json` only

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

---

**Last updated:** 2026-09-27 (redesign) · Justin Masiga + Claude
