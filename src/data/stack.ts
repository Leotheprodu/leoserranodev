export interface TechItem {
  name: string;
  icon?: string;
  level?: 'expert' | 'proficient' | 'learning';
  years?: number;
  since?: number;
}

export interface TechCategory {
  id: string;
  title: string;
  icon: string;
  items: TechItem[];
}

const CURRENT_YEAR = 2026;
const yearsAgo = (y: number) => CURRENT_YEAR - y;

export const stack: TechCategory[] = [
  {
    id: 'backend',
    title: 'Backend',
    icon: 'mdi:server',
    items: [
      { name: 'TypeScript', level: 'expert', since: yearsAgo(7) },
      { name: 'Node.js', level: 'expert', since: yearsAgo(8) },
      { name: 'NestJS', level: 'expert', since: yearsAgo(5) },
      { name: 'Express', level: 'proficient', since: yearsAgo(7) },
      { name: 'Prisma', level: 'expert', since: yearsAgo(5) },
      { name: 'PostgreSQL', level: 'proficient', since: yearsAgo(5) },
      { name: 'MySQL', level: 'proficient', since: yearsAgo(6) },
      { name: 'Socket.IO', level: 'expert', since: yearsAgo(4) },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'mdi:monitor-dashboard',
    items: [
      { name: 'React', level: 'expert', since: yearsAgo(8) },
      { name: 'Next.js', level: 'expert', since: yearsAgo(5) },
      { name: 'Astro', level: 'proficient', since: yearsAgo(2) },
      { name: 'Tailwind CSS', level: 'expert', since: yearsAgo(5) },
      { name: 'HeroUI', level: 'proficient', since: yearsAgo(2) },
      { name: 'TanStack Query', level: 'proficient', since: yearsAgo(3) },
    ],
  },
  {
    id: 'realtime',
    title: 'Real-time',
    icon: 'mdi:lightning-bolt',
    items: [
      { name: 'Socket.IO', level: 'expert', since: yearsAgo(4) },
      { name: 'EventEmitter2', level: 'proficient', since: yearsAgo(3) },
      { name: 'WebSockets', level: 'expert', since: yearsAgo(4) },
      { name: 'SSE', level: 'proficient', since: yearsAgo(2) },
    ],
  },
  {
    id: 'ai',
    title: 'AI / ML',
    icon: 'mdi:brain',
    items: [
      { name: 'OpenAI GPT-4o-mini', level: 'proficient', since: yearsAgo(2) },
      { name: 'Google Gemini', level: 'proficient', since: yearsAgo(1) },
      { name: 'Prompt engineering', level: 'proficient', since: yearsAgo(2) },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    icon: 'mdi:cloud-outline',
    items: [
      { name: 'Google Cloud', level: 'proficient', since: yearsAgo(5) },
      { name: 'Vercel', level: 'proficient', since: yearsAgo(5) },
      { name: 'Railway', level: 'proficient', since: yearsAgo(2) },
      { name: 'GitHub Actions', level: 'proficient', since: yearsAgo(4) },
      { name: 'Docker', level: 'proficient', since: yearsAgo(4) },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: 'mdi:toolbox-outline',
    items: [
      { name: 'Git / GitHub', level: 'expert', since: yearsAgo(9) },
      { name: 'VS Code', level: 'expert', since: yearsAgo(8) },
      { name: 'Jest / Vitest', level: 'proficient', since: yearsAgo(4) },
    ],
  },
];
