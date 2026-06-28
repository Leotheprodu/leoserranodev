# Migration Notes — Portfolio v2

## Resumen

Migración del portfolio personal de **Astro 4.7 + React 18.2 + Tailwind 3.0** a **Astro 5 + React 19 + Tailwind 4**, con rediseño completo del sitio.

## Decisiones de arquitectura

- **Stack final**: Astro 5.x + React 19.x + Tailwind 4.x + Framer Motion 11.x + Nanostores 0.11.x
- **Paleta**: "Costa Rica Sunset" — `#22D0C9` (turquesa) + `#FF6B6B` (coral) + `#FFD93D` (amarillo)
- **Idiomas**: ES/EN mantenidos
- **Blog**: eliminado (decisión del usuario)
- **Dark/light mode**: mantenido
- **Contacto**: Email form (EmailJS) + LinkedIn + GitHub (sin CV, sin Calendly)
- **Snippets**: 15-20 snippets de código extraídos de los 3 proyectos activos
- **MejorMenu**: solo badge "Live · 3 clientes", sin tratamiento especial
- **FLProductions**: proyecto #1 en la home (es el negocio principal)

## Orden de proyectos en la home

1. **FLProductions** (Lead — negocio principal, 13+ años)
2. **Zamr** (SaaS worship, 100+ eventos)
3. **MejorMenu** (Live, 3 clientes)
4. **Ackee Beats** (extensión de FLProductions, card secundaria)

## Plan de ejecución (8 fases)

| Fase | Contenido | Sesión |
|---|---|---|
| 0 | Setup (rama, este doc) | S1 |
| 1 | Upgrade Astro 5 + Tailwind 4 | S1 |
| 2 | Reset contenido viejo | S1 |
| 3 | Design system base (tokens + componentes UI) | S2-S3 |
| 4 | Bento grid components (Hero, ProjectCard, etc.) | S4-S5 |
| 5 | Animaciones (Framer Motion + scroll reveals) | S6 |
| 6 | Contenido (case studies + snippets + i18n) | S7-S11 |
| 7 | Refinamiento (mobile, a11y, Lighthouse, SEO) | S12 |
| 8 | Deploy | S13 |

## Cambios de versiones

### Dependencias a upgrade
- `astro`: `4.7.1` → `^5.0.0`
- `@astrojs/react`: `3.3.2` → `^4.0.0`
- `@astrojs/mdx`: nuevo
- `@tailwindcss/vite`: nuevo (Vite plugin para Tailwind 4)
- `tailwindcss`: `3.0.24` → `^4.0.0`
- `react`: `18.2.0` → `^19.0.0`
- `react-dom`: `18.2.0` → `^19.0.0`
- `framer-motion`: nuevo
- `nanostores`: `0.9.3` → `^0.11.0`
- `@nanostores/react`: `0.7.1` → `^0.8.0`

### Dependencias a mantener
- `@astrojs/rss`: removido (no hay blog)
- `@astrojs/sitemap`: mantener
- `astro-icon`: mantener
- `emailjs-com`: mantener
- `react-google-recaptcha`: mantener

### Dependencias a remover
- `@types/react`, `@types/react-dom`: vienen con React 19
- `tailwindcss/nesting`: no necesario en Tailwind 4

## Tailwind 4 migration

- `tailwind.config.cjs` → `src/styles/theme.css` con directiva `@theme`
- PostCSS config de Tailwind 3 → Vite plugin `@tailwindcss/vite`
- Custom colors via CSS custom properties con `@theme`

## Estructura final

```
src/
├── components/
│   ├── ui/                    # Design system base
│   ├── bento/                 # Bento grid específico
│   ├── motion/                # Animaciones (React islands)
│   ├── code/                  # Code snippets
│   └── layouts/
├── content/
│   └── projects/              # MDX case studies
├── data/
│   ├── snippets/              # 15-20 snippets extraídos
│   ├── stats.ts
│   └── now.json
├── i18n/
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── projects/
│   ├── contact.astro
│   ├── 404.astro
│   └── es/                    # i18n ES
└── styles/
    ├── theme.css              # Tailwind 4 @theme
    └── global.css
```

## Changelog

### Sesión 1 (este commit)
- Rama `portfolio-v2` creada
- Upgrade a Astro 5 + React 19 + Tailwind 4
- Migración de `tailwind.config.cjs` a `@theme` en CSS
- Reset de contenido viejo (blog, projects, JSONs)
- Build limpio verificado
