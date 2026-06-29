import { resume, type ResumeData } from './resume';
import type { PdfData } from '@components/resume/DownloadPDFButton';

function mapHighlights(data: ResumeData, lang: 'en' | 'es') {
  return data.highlights.map((h) => ({
    value: h.value,
    label: h.label[lang],
  }));
}

function mapExperience(data: ResumeData, lang: 'en' | 'es') {
  return data.experience.map((exp) => ({
    company: exp.company,
    role: exp.role[lang],
    period: exp.period[lang],
    location: exp.location,
    highlights: exp.highlights.map((h) => h[lang]),
    stack: exp.stack,
    liveUrl: exp.liveUrl,
  }));
}

export function buildPdfData(lang: 'en' | 'es'): PdfData {
  return {
    name: resume.name,
    title: resume.title[lang],
    location: resume.location[lang],
    email: 'leovpc@gmail.com',
    whatsapp: lang === 'es' ? '+506 6301 7707' : '+506 6301 7707 (WhatsApp)',
    github: 'github.com/Leotheprodu',
    linkedin: 'linkedin.com/in/leonardo-serrano-dev',
    summary: resume.summary[lang],
    highlights: mapHighlights(resume, lang),
    experience: mapExperience(resume, lang),
    languages: resume.languages.map((l) => l[lang]),
    interests: resume.interests.map((i) => i[lang]),
  };
}
