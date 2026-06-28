export interface Stat {
  id: string;
  value: string;
  suffix?: string;
  label: { en: string; es: string };
  description?: { en: string; es: string };
  category?: 'code' | 'business' | 'users' | 'quality';
  highlight?: boolean;
}

export const stats: Stat[] = [
  {
    id: 'loc',
    label: { en: 'lines of code', es: 'líneas de código' },
    value: '159K',
    description: {
      en: 'across 3 active products',
      es: 'entre 3 productos activos',
    },
    category: 'code',
    highlight: true,
  },
  {
    id: 'products',
    label: { en: 'live products', es: 'productos live' },
    value: '4',
    description: {
      en: 'studio + 2 SaaS + ecommerce',
      es: 'estudio + 2 SaaS + ecommerce',
    },
    category: 'business',
  },
  {
    id: 'years',
    label: { en: 'years in production', es: 'años en producción' },
    value: '13',
    suffix: '+',
    description: {
      en: 'FLProductions since 2013',
      es: 'FLProductions desde 2013',
    },
    category: 'business',
  },
  {
    id: 'endpoints',
    label: { en: 'REST endpoints', es: 'endpoints REST' },
    value: '417',
    description: {
      en: 'across 3 NestJS backends',
      es: 'entre 3 backends NestJS',
    },
    category: 'code',
  },
  {
    id: 'models',
    label: { en: 'Prisma models', es: 'modelos Prisma' },
    value: '83',
    description: {
      en: '3 production schemas',
      es: '3 schemas de producción',
    },
    category: 'code',
  },
  {
    id: 'ws-users',
    label: { en: 'WebSocket users', es: 'usuarios WebSocket' },
    value: '500',
    description: {
      en: 'concurrent load-tested',
      es: 'concurrentes load-tested',
    },
    category: 'users',
  },
  {
    id: 'tests-coverage',
    label: { en: 'test coverage', es: 'cobertura de tests' },
    value: '80',
    suffix: '%+',
    description: {
      en: 'in production codebases',
      es: 'en codebases de producción',
    },
    category: 'quality',
  },
  {
    id: 'test-files',
    label: { en: 'test files', es: 'archivos de tests' },
    value: '156',
    description: {
      en: 'unit + e2e',
      es: 'unit + e2e',
    },
    category: 'quality',
  },
  {
    id: 'mejormenu-clients',
    label: { en: 'live clients', es: 'clientes live' },
    value: '3',
    description: {
      en: 'on MejorMenu (CR)',
      es: 'en MejorMenu (CR)',
    },
    category: 'users',
  },
  {
    id: 'zamr-songs',
    label: { en: 'songs in production', es: 'canciones en producción' },
    value: '500',
    suffix: '+',
    description: {
      en: 'on Zamr',
      es: 'en Zamr',
    },
    category: 'users',
  },
];

export const statsByCategory = (category: Stat['category']) =>
  stats.filter((s) => s.category === category);

export const headlineStats = stats.slice(0, 6);

export function localizeStat(
  stat: Stat,
  lang: 'en' | 'es'
): { value: string; suffix?: string; label: string; description?: string } {
  return {
    value: stat.value,
    suffix: stat.suffix,
    label: stat.label[lang],
    description: stat.description?.[lang],
  };
}
