// Single source for everything the page says about Justin. The chat assistant's knowledge
// (lib/assistant.ts) is built from this same file, so the site and the AI never disagree.
// Source: D:\AIO Freelance\Resumes\Justin_Masiga_CV.pdf (copied to public/Justin_Masiga_CV.pdf).

export const profile = {
  name: "Justin Masiga",
  role: "Full-stack developer and AI operations engineer",
  location: "Maco, Davao de Oro, Philippines",
  timezone: "GMT+8",
  email: "justin.masiga.94@gmail.com",
  phone: "+63 956 0242 058",
  cv: "/Justin_Masiga_CV.pdf",
  linkedin: "https://www.linkedin.com/in/justin-m-992772236/",
  github: "https://github.com/tsujintsujin",
  lede: "I build the reports, web apps and automations that a business actually leans on day to day. Three years of client dashboards for national FMCG and pharma suppliers. Whole products shipped solo, too: schema first, interface last.",
  availability:
    "Open to full-time and contract work, starting now. I work remotely from the Philippines (GMT+8) and I'm open to relocating.",
  background:
    "Before any of the development work, I taught, did remote client support and worked as a graphic designer. That's where the unglamorous skills come from. Writing plainly. Laying things out cleanly. And explaining what a number means to someone who doesn't live in a database.",
  assistantIntro:
    "The assistant here is an AI agent I built into this site. It knows my work, hands over my CV if you ask, and sends quote requests straight to my inbox.",
};

export type Role = {
  company: string;
  title: string;
  place: string;
  start: string; // ISO month, for <time>
  end: string;
  period: string;
  points: string[];
  // Where on this site the work from this role can be seen.
  seeIt?: { label: string; href: string };
};

export const roles: Role[] = [
  {
    company: "Trade Dynamics (Tradynamics)",
    title: "Business Analysis Developer",
    place: "Manila, remote",
    start: "2023-06",
    end: "2026-09",
    period: "Jun 2023 to Sep 2026",
    points: [
      "Owned the Amazon QuickSight dashboards for four national FMCG and pharmaceutical suppliers, and was the main report developer for two of them the whole three years. Their executives ran field sales off those screens.",
      "Wrote the daily MySQL stored procedures that turned Engagia sales force automation data into QuickSight SPICE datasets. No small feed: the biggest client supplied 2,000+ retail branches and logged ₱5M+ in sales a day.",
      "A new schedule compliance cut landed on my desk nearly every week. Each one became a dashboard view we could reuse, not a one-off.",
      "Checked the source data before it ever reached a visual, so a figure meant the same thing on every client's dashboard. Then walked client management through the logic, in plain terms.",
      "Helped prototype an in-house, AI-assisted reporting product on Next.js and NestJS. Moved between legacy PHP and CakePHP and modern TypeScript and React without much fuss.",
    ],
    seeIt: { label: "See the kind of dashboards", href: "#data" },
  },
  {
    company: "All About You Skin Clinic",
    title: "General Virtual Assistant",
    place: "Australia, remote",
    start: "2022-02",
    end: "2022-08",
    period: "Feb 2022 to Aug 2022",
    points: [
      "Handled client inquiries over email and social media, and kept the appointment book for two clinic locations.",
    ],
    seeIt: { label: "Talk to the assistant that does this now", href: "#assistant" },
  },
  {
    company: "Pencil Learning Technologies",
    title: "Graphic Artist",
    place: "Singapore, remote",
    start: "2020-02",
    end: "2020-09",
    period: "Feb 2020 to Sep 2020",
    points: [
      "Redrew book-page artwork as clean vectors for an education technology company. Illustrator and Photoshop, every single day.",
    ],
  },
  {
    company: "H&M Advertisements",
    title: "Graphic Artist",
    place: "Mindanao, Philippines",
    start: "2019-08",
    end: "2020-01",
    period: "Aug 2019 to Jan 2020",
    points: [
      "Layouts, vector art and photo edits, each one made to the client's taste, for a print-on-demand and advertising shop.",
    ],
  },
  {
    company: "St. Mary's College of Tagum",
    title: "College Instructor, IT and Computer Science",
    place: "Tagum City, Philippines",
    start: "2018-07",
    end: "2019-03",
    period: "Jul 2018 to Mar 2019",
    points: [
      "Taught database analysis and design and programming (HTML, CSS, JavaScript, MySQL, Java). Took the multimedia classes too: Photoshop, Illustrator, After Effects, Premiere.",
    ],
  },
];

export const education = {
  school: "St. Mary's College of Tagum",
  degree: "Bachelor of Science in Computer Science",
  year: "2018",
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Front end",
    items: ["Next.js (App Router)", "React 18 and 19", "TypeScript", "Tailwind CSS", "Framer Motion", "SWR", "Responsive design"],
  },
  {
    group: "Back end",
    items: ["NestJS", "Node.js", "Python", "PHP", "Laravel", "CakePHP", "Express", "REST APIs and webhooks", "Google OAuth and JWT"],
  },
  {
    group: "Data and BI",
    items: ["Amazon QuickSight (SPICE)", "SFA data reporting", "MySQL stored procedures", "PostgreSQL", "Cloudflare D1", "Prisma", "Supabase", "Data validation"],
  },
  {
    group: "AI",
    items: ["Claude API", "Workers AI", "Local LLMs with Ollama", "Chat and receptionist agents", "AI coding agents", "Prompt and context design"],
  },
  {
    group: "Automation",
    items: ["n8n (schedules, webhooks, Sheets)", "Meta Graph API", "Messenger bots", "PayMongo", "Brevo and Resend email", "Python scraping"],
  },
  {
    group: "Platforms",
    items: ["Git and GitHub", "Vercel", "Cloudflare Workers and Tunnel", "Docker", "Figma", "Asana"],
  },
  {
    group: "Design",
    items: ["Photoshop", "Illustrator", "After Effects", "Premiere Pro", "Layout and vector artwork"],
  },
];

export const contactLede =
  "Email me and you'll hear back within one business day. Or tell the assistant what you need; it'll pass the details on to me.";

export const dataLede =
  "For three years, dashboards like these were how four national suppliers ran their field sales. The client numbers stay confidential, so everything on this wall is sample data shaped like the real thing. Ask the analyst anything about it.";
