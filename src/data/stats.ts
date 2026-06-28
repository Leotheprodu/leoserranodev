export interface Stat {
  id: string;
  value: string;
  suffix?: string;
  label: { en: string; es: string };
  description?: { en: string; es: string };
  category?: 'code' | 'business' | 'users' | 'quality' | 'reach';
  highlight?: boolean;
  hero?: boolean;
}

export const stats: Stat[] = [
  {
    id: 'years',
    value: '13',
    suffix: '+',
    label: { en: 'years in production', es: 'años en producción' },
    description: {
      en: 'FLProductions since 2013. Top 3 in Costa Rica SEO for "estudio de grabación".',
      es: 'FLProductions desde 2013. Top 3 en SEO de Costa Rica para "estudio de grabación".',
    },
    category: 'business',
    highlight: true,
    hero: true,
  },
  {
    id: 'loc',
    label: { en: 'lines of code', es: 'líneas de código' },
    value: '~159K',
    description: {
      en: 'across 4 production products',
      es: 'entre 4 productos en producción',
    },
    category: 'code',
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
    id: 'modules',
    label: { en: 'NestJS modules', es: 'módulos NestJS' },
    value: '70',
    description: {
      en: 'across 3 production backends',
      es: 'entre 3 backends en producción',
    },
    category: 'code',
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
    id: 'gateways',
    label: { en: 'WebSocket gateways', es: 'WebSocket gateways' },
    value: '5',
    description: {
      en: 'Socket.IO servers handling real-time sync',
      es: 'Servidores Socket.IO para real-time sync',
    },
    category: 'code',
  },
  {
    id: 'ws-users',
    label: { en: 'WebSocket users', es: 'usuarios WebSocket' },
    value: '500',
    description: {
      en: 'concurrent load-tested (Zamr extreme)',
      es: 'concurrentes load-tested (Zamr extreme)',
    },
    category: 'users',
  },
  {
    id: 'tests-coverage',
    label: { en: 'test coverage', es: 'cobertura de tests' },
    value: '80',
    suffix: '%+',
    description: {
      en: 'required in production codebases',
      es: 'requerida en codebases de producción',
    },
    category: 'quality',
  },
  {
    id: 'test-files',
    label: { en: 'test files', es: 'archivos de tests' },
    value: '156',
    description: {
      en: 'unit + e2e across 3 projects',
      es: 'unit + e2e entre 3 proyectos',
    },
    category: 'quality',
  },
  {
    id: 'mejormenu-clients',
    label: { en: 'live clients', es: 'clientes live' },
    value: '3',
    description: {
      en: 'on MejorMenu (Costa Rica)',
      es: 'en MejorMenu (Costa Rica)',
    },
    category: 'users',
  },
  {
    id: 'zamr-songs',
    label: { en: 'songs in production', es: 'canciones en producción' },
    value: '500',
    suffix: '+',
    description: {
      en: 'catalogued on Zamr',
      es: 'catalogadas en Zamr',
    },
    category: 'users',
  },
  {
    id: 'zamr-events',
    label: { en: 'live events', es: 'eventos live' },
    value: '100',
    suffix: '+',
    description: {
      en: 'powered by Zamr',
      es: 'impulsados por Zamr',
    },
    category: 'users',
  },
  {
    id: 'seo-cr',
    label: { en: 'SEO ranking in CR', es: 'ranking SEO en CR' },
    value: 'Top 3',
    description: {
      en: 'for "estudio de grabación" searches',
      es: 'para búsquedas de "estudio de grabación"',
    },
    category: 'reach',
    highlight: true,
  },
  {
    id: 'clients-from-web',
    label: { en: 'clients from website', es: 'clientes desde la web' },
    value: '80',
    suffix: '%+',
    description: {
      en: 'of FLProductions clients',
      es: 'de los clientes de FLProductions',
    },
    category: 'reach',
  },
];

export const statsByCategory = (category: Stat['category']) =>
  stats.filter((s) => s.category === category);

export const heroStats = stats.filter((s) => s.hero);
export const headlineStats = [
  stats.find((s) => s.id === 'years')!,
  stats.find((s) => s.id === 'loc')!,
  stats.find((s) => s.id === 'modules')!,
  stats.find((s) => s.id === 'endpoints')!,
  stats.find((s) => s.id === 'models')!,
  stats.find((s) => s.id === 'ws-users')!,
];

export function localizeStat(
  stat: Stat,
  lang: 'en' | 'es'
): {
  value: string;
  suffix?: string;
  label: string;
  description?: string;
  highlight?: boolean;
  hero?: boolean;
} {
  return {
    value: stat.value,
    suffix: stat.suffix,
    label: stat.label[lang],
    description: stat.description?.[lang],
    highlight: stat.highlight,
    hero: stat.hero,
  };
}
