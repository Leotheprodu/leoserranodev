export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Language = keyof typeof languages;
export const defaultLanguage: Language = 'en';
export const supportedLanguages: Language[] = ['en', 'es'];

export interface Dictionary {
  nav: {
    projects: string;
    numbers: string;
    stack: string;
    about: string;
    contact: string;
    home: string;
  };
  theme: {
    toggle: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  stats: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    liveCta: string;
    caseStudyCta: string;
    featuredBadge: string;
  };
  stack: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  about: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    p1: string;
    p1Strong1: string;
    p1Strong2: string;
    p2: string;
    p2Strong1: string;
    p2Strong2: string;
    p2Strong3: string;
    p2Strong4: string;
    p3: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  footer: {
    tagline: string;
    location: string;
  };
  projectsPage: {
    title: string;
    subtitle: string;
  };
  caseStudy: {
    backToAll: string;
    publishedOn: string;
    visitLive: string;
    stackLabel: string;
    tldr: string;
    highlights: string;
    moreProjects: string;
    otherCaseStudies: string;
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
  };
  common: {
    openMenu: string;
    yearsShort: string;
    readCaseStudy: string;
  };
}
