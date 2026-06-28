import type { Dictionary } from './types';

export const en: Dictionary = {
  nav: {
    projects: 'Projects',
    numbers: 'Numbers',
    stack: 'Stack',
    about: 'About',
    contact: 'Contact',
    home: 'Home',
  },
  theme: {
    toggle: 'Toggle theme',
  },
  hero: {
    eyebrow: 'Building in public',
    title: 'Full-stack engineer building production systems that scale',
    subtitle:
      'Costa Rica · 4 live products · 159K+ lines of code · real users every day. I run a recording studio and ship SaaS on the side.',
    primaryCta: 'See the work',
    secondaryCta: 'Get in touch',
  },
  stats: {
    eyebrow: 'Numbers',
    title: 'What 13 years of shipping looks like',
    subtitle: 'Real metrics from production codebases, not vanity numbers.',
  },
  projects: {
    eyebrow: 'Featured',
    title: "What I'm shipping right now",
    subtitle:
      'Four production systems, each one a different domain, all built from scratch.',
    liveCta: 'Live',
    githubCta: 'GitHub',
    caseStudyCta: 'Case study',
  },
  stack: {
    eyebrow: 'Stack',
    title: 'What I work with',
    subtitle:
      "Tools I've shipped to production. Grouped by layer, ordered by how much I've used them.",
  },
  about: {
    eyebrow: 'About',
    title: 'Building software that ',
    titleHighlight: 'puts food on the table',
    p1: "I'm Leo, a full-stack engineer from Heredia, Costa Rica. I run",
    p1Strong1: 'FLProductions',
    p1Strong2:
      ", a recording studio that's been live since 2013 and brings in 80% of its clients through the website.",
    p2: 'On the side I ship multi-tenant SaaS products:',
    p2Strong1: 'Zamr',
    p2Strong2:
      ' for worship bands (load-tested to 500 WebSocket users) and',
    p2Strong3: 'MejorMenu',
    p2Strong4:
      ' for local restaurants (3 clients live and growing).',
    p3:
      'My favourite problems: real-time systems, multi-tenant architectures, and developer experience. I write the kind of docs I would want to read — 4,000+ lines across the 3 projects.',
  },
  contact: {
    eyebrow: 'Get in touch',
    title: "Let's build something ",
    titleHighlight: 'real',
    subtitle:
      'Open to interesting projects, contract work, and full-time roles where the team ships production software with care.',
  },
  footer: {
    tagline: 'Built with Astro 5 + Tailwind 4 + Framer Motion.',
    location: 'Heredia, Costa Rica',
  },
  projectsPage: {
    title: '4 systems in production',
    subtitle:
      'Each one a different domain. Each one built from scratch. Each one shipping to real users every day.',
  },
  caseStudy: {
    backToAll: 'All case studies',
    publishedOn: 'Published',
    visitLive: 'Visit live site',
    stackLabel: 'Stack',
    tldr: 'TL;DR',
    highlights: 'Highlights',
    moreProjects: 'More projects',
    otherCaseStudies: 'Other case studies',
  },
  notFound: {
    title: 'Page not found',
    description: "The page you were looking for doesn't exist or has been moved.",
    backHome: '← Back home',
  },
  common: {
    openMenu: 'Open menu',
    yearsShort: 'y',
    readCaseStudy: 'Read case study',
  },
};
