export interface Stat {
  label: string;
  value: string;
  suffix?: string;
  description?: string;
  category?: 'code' | 'business' | 'users' | 'quality';
  href?: string;
  highlight?: boolean;
}

export const stats: Stat[] = [
  {
    label: 'líneas de código',
    value: '159K',
    description: 'across 3 active products',
    category: 'code',
    highlight: true,
  },
  {
    label: 'productos live',
    value: '4',
    description: 'studio + 2 SaaS + ecommerce',
    category: 'business',
  },
  {
    label: 'años en producción',
    value: '13',
    suffix: '+',
    description: 'FLProductions since 2013',
    category: 'business',
  },
  {
    label: 'endpoints REST',
    value: '417',
    description: 'across 3 NestJS backends',
    category: 'code',
  },
  {
    label: 'modelos Prisma',
    value: '83',
    description: '3 production schemas',
    category: 'code',
  },
  {
    label: 'WebSocket users',
    value: '500',
    description: 'concurrent load-tested',
    category: 'users',
  },
  {
    label: 'cobertura de tests',
    value: '80',
    suffix: '%+',
    description: 'in production codebases',
    category: 'quality',
  },
  {
    label: 'archivos de tests',
    value: '156',
    description: 'unit + e2e',
    category: 'quality',
  },
  {
    label: 'negocios activos',
    value: '3',
    description: 'en MejorMenu (CR)',
    category: 'users',
  },
  {
    label: 'canciones en producción',
    value: '500',
    suffix: '+',
    description: 'en Zamr',
    category: 'users',
  },
];

export const statsByCategory = (category: Stat['category']) =>
  stats.filter((s) => s.category === category);

export const headlineStats = stats.slice(0, 6);
