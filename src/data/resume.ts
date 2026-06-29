export interface LocalizedString {
  en: string;
  es: string;
}

export interface ResumeExperience {
  slug: string;
  company: string;
  role: LocalizedString;
  period: LocalizedString;
  location: string;
  highlights: { en: string; es: string }[];
  stack: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
}

export interface ResumeData {
  name: string;
  title: LocalizedString;
  location: LocalizedString;
  summary: { en: string; es: string };
  highlights: { value: string; label: LocalizedString }[];
  experience: ResumeExperience[];
  languages: { en: string; es: string }[];
  interests: LocalizedString[];
}

export const resume: ResumeData = {
  name: 'Leonardo Serrano',
  title: {
    en: 'Full-Stack Engineer',
    es: 'Ingeniero Full-Stack',
  },
  location: {
    en: 'Herediana de Siquirres, Limón, Costa Rica',
    es: 'Herediana de Siquirres, Limón, Costa Rica',
  },
  summary: {
    en: 'Full-stack engineer with 13+ years deploying production software in Costa Rica. Founder of FLProductions (a recording studio that brings 80% of its clients through its website) and co-founder of Zamr (a multi-tenant SaaS for worship bands, load-tested to 500 concurrent users). Currently building MejorMenu, a multi-tenant SaaS for restaurants in Herediana de Siquirres, Limón.',
    es: 'Ingeniero full-stack con 13+ años poniendo software de producción en Costa Rica. Fundador de FLProductions (estudio de grabación que atrae al 80% de sus clientes a través de su sitio web) y co-fundador de Zamr (SaaS multi-tenant para bandas de alabanza, probado con 500 usuarios concurrentes). Actualmente construyendo MejorMenu, un SaaS multi-tenant para restaurantes en Herediana de Siquirres, Limón.',
  },
  highlights: [
    {
      value: '13+',
      label: { en: 'years shipping production', es: 'años en producción' },
    },
    {
      value: '4',
      label: { en: 'live products', es: 'productos live' },
    },
    {
      value: '~159K',
      label: { en: 'lines of code', es: 'líneas de código' },
    },
    {
      value: 'Top 3',
      label: {
        en: 'SEO in Costa Rica',
        es: 'SEO en Costa Rica',
      },
    },
    {
      value: '500',
      label: { en: 'concurrent WS users', es: 'usuarios WS concurrentes' },
    },
    {
      value: '156',
      label: { en: 'test files (>=80% cov.)', es: 'archivos de tests' },
    },
  ],
  experience: [
    {
      slug: 'flproductions',
      company: 'FLProductions',
      role: {
        en: 'Founder · Full-Stack Engineer',
        es: 'Fundador · Ingeniero Full-Stack',
      },
      period: {
        en: '2013 to present (13+ years)',
        es: '2013 a presente (13+ años)',
      },
      location: 'Herediana de Siquirres, Limón, Costa Rica',
      highlights: [
        {
          en: 'Built and maintained the studio website, artist portal, and beat e-commerce in a single NestJS + Next.js monorepo: 28 Prisma models, 202 REST endpoints, 41 real-time event listeners.',
          es: 'Construí y mantengo el sitio del estudio, portal de artistas y e-commerce de beats en un solo monorepo NestJS + Next.js: 28 modelos Prisma, 202 endpoints REST, 41 listeners de eventos en tiempo real.',
        },
        {
          en: 'Top 3 in SEO for "estudio de grabación" in Costa Rica. The website brings 80% of the studio\'s clients.',
          es: 'Top 3 en SEO para "estudio de grabación" en Costa Rica. El sitio atrae al 80% de los clientes del estudio.',
        },
        {
          en: 'Implemented a real-time wallet with 5% cashback, tiered vault pricing, an AI chat (GPT-4o-mini) that parses Costa Rican Spanish and books appointments, and Google Calendar two-way sync.',
          es: 'Implementé un wallet en tiempo real con 5% de cashback, vault con precios diferenciados, un chat de IA (GPT-4o-mini) que interpreta español costarricense y agenda citas, y sincronización bidireccional con Google Calendar.',
        },
        {
          en: 'Cost engineering: cron jobs auto-move files to GCS Coldline after 30 days of inactivity, achieving about 80% storage cost reduction.',
          es: 'Ingeniería de costos: cron jobs mueven archivos a GCS Coldline tras 30 días sin uso, logrando alrededor del 80% de reducción en el costo de almacenamiento.',
        },
      ],
      stack: [
        'NestJS 10',
        'Prisma 5',
        'Next.js 15',
        'PostgreSQL',
        'Socket.IO',
        'Tailwind CSS',
        'Google Cloud Storage',
        'PayPal',
        'OpenAI',
      ],
      liveUrl: 'https://www.flproductionscr.com',
      caseStudyUrl: '/projects/flproductions',
    },
    {
      slug: 'zamr',
      company: 'Zamr',
      role: {
        en: 'Co-founder · Full-Stack Engineer',
        es: 'Co-fundador · Ingeniero Full-Stack',
      },
      period: {
        en: '2024 to present',
        es: '2024 a presente',
      },
      location: 'Heredia, Costa Rica (remote-first)',
      highlights: [
        {
          en: 'Built a multi-tenant SaaS for worship bands and churches: 18 NestJS modules, 28 Prisma models, 131 REST endpoints, 3 WebSocket gateways.',
          es: 'Construí un SaaS multi-tenant para bandas de alabanza e iglesias: 18 módulos NestJS, 28 modelos Prisma, 131 endpoints REST, 3 gateways WebSocket.',
        },
        {
          en: 'Wrote a 1,023-line WebSocket gateway with per-user rate limiting, message compression (60% payload reduction), priority preemption, and JWT auto-refresh that survives Railway cold starts.',
          es: 'Escribí un WebSocket gateway de 1,023 líneas con rate limiting por usuario, compresión de mensajes (60% de reducción de payload), preemption por prioridad y auto-refresh de JWT que sobrevive a los cold starts de Railway.',
        },
        {
          en: 'Load-tested to 500 concurrent WebSocket users: 156 test files, >=80% coverage enforced, 500+ songs catalogued, 100+ live events powered.',
          es: 'Probado con 500 usuarios WebSocket concurrentes: 156 archivos de tests, >=80% de coverage enforced, más de 500 canciones catalogadas, más de 100 eventos en vivo.',
        },
        {
          en: 'Two distinct live views: projector (lyrics plus animated backgrounds) versus musician (chords plus dark). Login with Google OAuth, no passwords stored.',
          es: 'Dos vistas en vivo: proyector (letras más fondos animados) frente a músico (acordes más fondo oscuro). Login con Google OAuth, sin contraseñas almacenadas.',
        },
      ],
      stack: [
        'NestJS 10',
        'Prisma 5',
        'Next.js 15',
        'Socket.IO',
        'MySQL',
        'HeroUI',
        'TanStack Query',
        'Nanostores',
        'Google OAuth',
      ],
      liveUrl: 'https://www.zamr.app',
      caseStudyUrl: '/es/projects/zamr',
    },
    {
      slug: 'mejormenu',
      company: 'MejorMenu',
      role: {
        en: 'Founder · Full-Stack Engineer',
        es: 'Fundador · Ingeniero Full-Stack',
      },
      period: {
        en: '2026 to present',
        es: '2026 a presente',
      },
      location: 'Herediana de Siquirres, Limón, Costa Rica',
      highlights: [
        {
          en: 'Multi-tenant SaaS for restaurants in Herediana de Siquirres, Limón: 3 live clients in the first weeks.',
          es: 'SaaS multi-tenant para restaurantes en Herediana de Siquirres, Limón: 3 clientes live en las primeras semanas.',
        },
        {
          en: 'Each business gets its own public page at /[slug] with menu, hours, location on a map, and an order button that opens WhatsApp with a pre-formatted message.',
          es: 'Cada negocio tiene su página pública en /[slug] con menú, horarios, ubicación en mapa y un botón de pedido que abre WhatsApp con un mensaje pre-formateado.',
        },
        {
          en: 'AI image generation with Google Gemini (3 context types: menu items, logo, cover). Credits are consumed before each call.',
          es: 'Generación de imágenes con IA usando Google Gemini (3 tipos de contexto: items del menú, logo, portada). Los créditos se consumen antes de cada llamada.',
        },
        {
          en: 'Built the full flow: catchHandle pattern, deny-by-default permissions, PostData with declarative cache invalidation, useSocketSync dispatcher, timezone-aware business hours, and bulk menu import from plain text.',
          es: 'Construí el flujo completo: patrón catchHandle, permisos deny-by-default, PostData con invalidación declarativa de caché, dispatcher useSocketSync, horarios con timezone-awareness e import de menú desde texto plano.',
        },
      ],
      stack: [
        'NestJS 11',
        'Prisma 6',
        'Next.js 16',
        'MySQL',
        'Google Gemini',
        'Tailwind CSS',
        'Leaflet',
        'TanStack Query',
      ],
      liveUrl: 'https://www.mejormenu.com',
      caseStudyUrl: '/es/projects/mejormenu',
    },
  ],
  languages: [
    { en: 'Spanish (native)', es: 'Español (nativo)' },
    { en: 'English (professional working)', es: 'Inglés (nivel profesional)' },
  ],
  interests: [
    { en: 'Real-time systems', es: 'Sistemas en tiempo real' },
    { en: 'Multi-tenant architectures', es: 'Arquitecturas multi-tenant' },
    { en: 'Developer experience', es: 'Experiencia de desarrollo' },
    { en: 'AI integrations', es: 'Integraciones con IA' },
  ],
};
