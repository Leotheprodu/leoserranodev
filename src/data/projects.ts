export type ProjectStatus = 'live' | 'beta' | 'building' | 'archived';
export type ProjectType = 'saas' | 'ecommerce' | 'studio' | 'platform';

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  type: ProjectType;
  status: ProjectStatus;
  url?: string;
  githubUrl?: string;
  liveLabel?: string;
  stack: string[];
  highlights: string[];
  metrics: Array<{ label: string; value: string }>;
  featured?: boolean;
  order: number;
}

export const projects: Project[] = [
  {
    slug: 'flproductions',
    title: 'FLProductions',
    tagline: '13 años transformando ideas en obras maestras',
    description:
      'Sitio público + portal de artistas + e-commerce de beats. NestJS + Prisma + Next.js con sincronización real-time, wallet con cashback, y AI chat que interpreta español costarricense.',
    type: 'studio',
    status: 'live',
    url: 'https://www.flproductionscr.com',
    githubUrl: 'https://github.com/Leotheprodu/flproductions-app',
    liveLabel: 'flproductionscr.com',
    stack: ['NestJS', 'Prisma', 'Next.js', 'PostgreSQL', 'Socket.IO', 'Tailwind'],
    highlights: [
      '28 modelos Prisma, 202 endpoints REST, 41 listeners real-time',
      'Wallet con 5% cashback + vault con precios diferenciados',
      'AI chat GPT-4o-mini que interpreta "1 de la tarde" → 13:00',
      'Auto-mueve archivos a Google Cloud Coldline (80% ahorro)',
    ],
    metrics: [
      { label: 'años live', value: '13+' },
      { label: 'modelos DB', value: '28' },
      { label: 'endpoints', value: '202' },
      { label: 'eventos RT', value: '41' },
    ],
    featured: true,
    order: 1,
  },
  {
    slug: 'zamr',
    title: 'Zamr',
    tagline: 'Gestión profesional para grupos de alabanza',
    description:
      'SaaS multi-tenant para bandas e iglesias. Letras en tiempo real al proyector, acordes a los músicos, login vía WhatsApp. WebSocket gateway load-tested a 500 usuarios concurrentes.',
    type: 'saas',
    status: 'live',
    url: 'https://www.zamr.app',
    liveLabel: 'zamr.app',
    stack: ['NestJS', 'Prisma', 'Next.js 15', 'Socket.IO', 'MySQL', 'HeroUI'],
    highlights: [
      '18 módulos NestJS, 28 modelos Prisma, 131 endpoints',
      'WebSocket gateway con rate limiting + 60% payload compression',
      '156 archivos de tests (≥80% coverage)',
      'Multi-tenant: Bands × Churches × 13 roles eclesiásticos',
    ],
    metrics: [
      { label: 'canciones', value: '500+' },
      { label: 'eventos live', value: '100+' },
      { label: 'WS users', value: '500' },
      { label: 'test files', value: '156' },
    ],
    featured: true,
    order: 2,
  },
  {
    slug: 'mejormenu',
    title: 'MejorMenu',
    tagline: 'Tu menú digital al alcance de un click',
    description:
      'Marketplace multi-tenant para restaurantes en Costa Rica. Cada negocio tiene su página en /[slug] con menú, horarios, y pedidos por WhatsApp. AI para imágenes y textos con Gemini.',
    type: 'saas',
    status: 'live',
    url: 'https://www.mejormenu.com',
    liveLabel: 'mejormenu.com',
    stack: ['NestJS', 'Prisma', 'Next.js', 'MySQL', 'Gemini', 'Tailwind'],
    highlights: [
      '21 módulos, 27 modelos, 84 endpoints',
      'Multi-tenant con `user_businesses` join table',
      'AI image gen con `gemini-2.5-flash-image`',
      'Bulk text-paste import (`Categoria: ... | item | price`)',
    ],
    metrics: [
      { label: 'módulos', value: '21' },
      { label: 'modelos', value: '27' },
      { label: 'endpoints', value: '84' },
      { label: 'clientes live', value: '3' },
    ],
    featured: true,
    order: 3,
  },
  {
    slug: 'ackeebeats',
    title: 'Ackee Beats',
    tagline: 'Estilo exótico, sonido Ackee',
    description:
      'Marketplace de beats con licencias PayPal. Catálogo navegable con previews de YouTube, generación de PDF de licencia por compra, y tiered pricing BASIC/PREMIUM/UNLIMITED.',
    type: 'ecommerce',
    status: 'live',
    url: 'https://www.ackeebeats.com',
    liveLabel: 'ackeebeats.com',
    stack: ['Next.js', 'PayPal', 'pdf-lib', 'GCS', 'Tailwind'],
    highlights: [
      'Licencias con jerarquía BASIC < PREMIUM < UNLIMITED',
      'PDF generado por compra con pdf-lib',
      'Extensión de FLProductions (mismo estudio)',
    ],
    metrics: [
      { label: 'beats live', value: '12+' },
      { label: 'licencias', value: '3 tiers' },
      { label: 'integración', value: 'PayPal' },
    ],
    order: 4,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const projectsByOrder = [...projects].sort((a, b) => a.order - b.order);
