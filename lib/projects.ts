// The Work section and the chat assistant both read this. Each project is written as
// the problem it faced, then what was built for it (the voice of the CV's case study).
// Screenshots live in public/work/<id>/:
//   phone.webp          homepage on a phone (the swipe carousel)
//   mock-desktop.webp   the feature that matters, desktop width (device mockup)
//   mock-mobile.webp    the same feature on a phone (device mockup)

export type Project = {
  id: string;
  name: string;
  kind: string;
  url: string;
  external?: boolean;
  problem: string;
  solution: string;
  decision?: string;
  feature: string; // what the mockup shows
  stack: string[];
};

export const projects: Project[] = [
  {
    id: "thejobstash",
    name: "TheJobStash",
    kind: "Own product, live and taking payments",
    url: "https://thejobstash.com",
    external: true,
    problem:
      "Job boards answer a keyword, not a person. So applicants dig through hundreds of listings to find the few they actually qualify for. Plenty are already closed. None of them say why a job is out of reach.",
    solution:
      "You upload a resume once. Every run scores the current job pool against it and sorts what comes back into strong matches, worth a look, and near misses, each near miss showing the exact requirement that blocked it. Listings get rechecked every three hours, so a closed posting never lands in a digest. It's credits, not a subscription, and if a run can't start, the credit goes back.",
    decision:
      "Version one kept the job data in the cloud database. Scoring a single resume dragged all of it back through the server, blew past the host's per-request CPU limit and took the site down. So the data moved onto the machine that does the scoring, reached over a secure tunnel. Accounts and payments stayed in the cloud.",
    feature: "A real digest from Justin's own CV: 111 matches out of 8,993 live postings, strong matches first",
    stack: ["Next.js 16", "TypeScript", "Cloudflare Workers and D1", "Python", "n8n", "PayMongo"],
  },
  {
    id: "bates",
    name: "Bates Landscaping",
    kind: "Pitch remodel, spec work",
    url: "/bates",
    problem:
      "Bates Landscaping won industry awards in 2024 and 2025. Its website didn't get the memo. Service cards carried each other's descriptions, the booking step asked for photos \"to the provided email address\" and never provided one, there were two different phone numbers, and 31 FAQs sat stacked on the homepage.",
    solution:
      "I remodelled their homepage on spec, starting from the visitor's problem (the yard floods, the bamboo keeps spreading) instead of a service name. The chat assistant answers from Bates's own 55 FAQs, company facts and a table of past project prices, and it won't quote a price for the visitor's own job. It runs on Cloudflare Workers AI and costs nothing to keep online.",
    feature: "The chat assistant answering a homeowner's question from Bates's own FAQs",
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS", "GSAP", "Cloudflare Workers AI"],
  },
  {
    id: "aqua",
    name: "Aqua Beauty Salon Centre",
    kind: "Pitch build, spec work",
    url: "/aqua",
    problem:
      "Aqua Beauty Salon Centre has been open in Tagum City since 2013 and has 14,000 Facebook followers. No website, though. Every booking arrived through Messenger and got sorted by hand.",
    solution:
      "A website with a booking engine that actually books. Clients choose services, a specialist, a date and a time, and they're only ever offered slots that are open. Confirmations and reminders go out by email and SMS. The front desk gets its own console: schedule board, bookings, insights, the client book, team hours, the menu. All of it on Cloudflare Workers and D1.",
    feature: "The front desk console's schedule board, with the day's bookings by specialist",
    stack: ["Next.js 15", "React 19", "Prisma", "Cloudflare Workers and D1", "TypeScript"],
  },
  {
    id: "surge",
    name: "Surge Freelancing Marketplace",
    kind: "Pitch rebuild, spec work",
    url: "/surge",
    problem:
      "Surge trains Filipinos into virtual assistants, certifies them, apprentices them, then places them with paying clients. Nobody else in the market runs that whole chain. Yet the proof, 14 training centres and a list of named institutional partners, sat near the bottom of a page most visitors open on a mid-range Android phone, usually at night.",
    solution:
      "A 24-page rebuild, phone first, that leads with the training-to-hiring chain and serves two audiences at once. Freelancers are most of the traffic; the businesses hiring them bring the revenue. It covers the academy and its 40+ courses, all 14 centres, digital products with their real prices, the affiliate programme, services, the blog and contact.",
    feature: "Surge's homepage, leading with the training-to-hiring chain",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "wedd-space",
    name: "wedd.space",
    kind: "Own product, with a live client site",
    url: "https://www.wedd.space/leisthercristine",
    external: true,
    problem:
      "Wedding details scatter across group chats. Then the guests ask the same things, over and over: where, what time, what do I wear?",
    solution:
      "wedd.space gives each couple a single page that answers all of it. Leisther and Cristine's, built for their October wedding, has a countdown, both venues with directions, their colour motif, RSVP, a guestbook and a gallery of prenup photos, served from Cloudinary so it loads quickly.",
    feature: "Leisther and Cristine's wedding site, opening on their invitation",
    stack: ["Next.js 16", "React 19", "Supabase", "Cloudinary", "Tailwind CSS"],
  },
];
