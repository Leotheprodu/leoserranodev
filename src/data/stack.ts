export interface TechItem {
  name: string;
  icon?: string;
  level?: 'expert' | 'proficient' | 'learning';
  years?: number;
}

export interface TechCategory {
  id: string;
  title: string;
  icon: string;
  items: TechItem[];
}

export const stack: TechCategory[] = [
  {
    id: 'backend',
    title: 'Backend',
    icon: 'mdi:server',
    items: [
      { name: 'NestJS', level: 'expert', years: 5 },
      { name: 'Express', level: 'proficient', years: 6 },
      { name: 'Prisma', level: 'expert', years: 4 },
      { name: 'TypeScript', level: 'expert', years: 6 },
      { name: 'PostgreSQL', level: 'proficient', years: 4 },
      { name: 'MySQL', level: 'proficient', years: 5 },
      { name: 'Socket.IO', level: 'expert', years: 4 },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'mdi:monitor-dashboard',
    items: [
      { name: 'Next.js', level: 'expert', years: 5 },
      { name: 'React', level: 'expert', years: 7 },
      { name: 'Astro', level: 'proficient', years: 2 },
      { name: 'Tailwind CSS', level: 'expert', years: 4 },
      { name: 'HeroUI', level: 'proficient', years: 2 },
      { name: 'TanStack Query', level: 'proficient', years: 3 },
    ],
  },
  {
    id: 'realtime',
    title: 'Real-time',
    icon: 'mdi:lightning-bolt',
    items: [
      { name: 'Socket.IO', level: 'expert', years: 4 },
      { name: 'EventEmitter2', level: 'proficient', years: 3 },
      { name: 'WebSockets', level: 'expert', years: 4 },
      { name: 'SSE', level: 'proficient', years: 2 },
    ],
  },
  {
    id: 'ai',
    title: 'AI / ML',
    icon: 'mdi:brain',
    items: [
      { name: 'OpenAI GPT-4o-mini', level: 'proficient', years: 2 },
      { name: 'Google Gemini', level: 'proficient', years: 1 },
      { name: 'Prompt engineering', level: 'proficient', years: 2 },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    icon: 'mdi:cloud-outline',
    items: [
      { name: 'Google Cloud', level: 'proficient', years: 4 },
      { name: 'Railway', level: 'proficient', years: 2 },
      { name: 'Vercel', level: 'proficient', years: 4 },
      { name: 'GitHub Actions', level: 'proficient', years: 3 },
      { name: 'Docker', level: 'proficient', years: 3 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: 'mdi:toolbox-outline',
    items: [
      { name: 'Git / GitHub', level: 'expert', years: 8 },
      { name: 'VS Code', level: 'expert', years: 7 },
      { name: 'Jest / Vitest', level: 'proficient', years: 4 },
      { name: 'Playwright', level: 'learning', years: 1 },
    ],
  },
];
