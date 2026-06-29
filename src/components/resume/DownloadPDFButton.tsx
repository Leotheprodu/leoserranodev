import { useState } from 'react';
import { jsPDF } from 'jspdf';
import avatarPng from '../../assets/avatar/avatar-256.png';

interface DownloadPDFButtonProps {
  className?: string;
  label: string;
  loadingLabel: string;
  variant?: 'light' | 'dark';
  lang: 'en' | 'es';
  pdfData: PdfData;
}

interface PdfHighlight {
  value: string;
  label: string;
}

interface PdfExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
}

export interface PdfData {
  name: string;
  title: string;
  location: string;
  email: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  summary: string;
  highlights: PdfHighlight[];
  experience: PdfExperience[];
  languages: string[];
  interests: string[];
}

const COLORS = {
  primary: [10, 10, 10] as [number, number, number],
  secondary: [34, 208, 201] as [number, number, number],
  text: [24, 24, 27] as [number, number, number],
  textSoft: [82, 82, 91] as [number, number, number],
  border: [228, 228, 231] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
};

const MARGIN = 15;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

export function DownloadPDFButton({
  className = '',
  label,
  loadingLabel,
  variant = 'light',
  lang,
  pdfData,
}: DownloadPDFButtonProps) {
  const [busy, setBusy] = useState(false);

  const generatePDF = (): jsPDF => {
    const doc = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    });

    let y = MARGIN;
    const ensureSpace = (needed: number) => {
      if (y + needed > PAGE_HEIGHT - MARGIN) {
        doc.addPage();
        y = MARGIN;
      }
    };

    // === Background: blanco explícito (no transparente) ===
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, 'F');

    // === Header: avatar + name + title ===
    // Avatar a la izquierda (cuadrado, sin clip para no contaminar graphics state)
    const avatarSize = 28;
    const avatarX = MARGIN;
    const avatarY = y;
    try {
      doc.addImage(
        avatarPng.src,
        'PNG',
        avatarX,
        avatarY,
        avatarSize,
        avatarSize,
        undefined,
        'FAST'
      );
    } catch (avatarErr) {
      console.warn('Avatar embed failed, continuing without it:', avatarErr);
    }

    // Texto del header a la derecha del avatar
    const textX = avatarX + avatarSize + 6;
    let textY = avatarY + 8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(24, 24, 27);
    doc.text(pdfData.name, textX, textY);

    textY += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    doc.setTextColor(34, 168, 163);
    doc.text(pdfData.title, textX, textY);

    textY += 5;
    doc.setFontSize(9);
    doc.setTextColor(82, 82, 91);
    doc.text(pdfData.location, textX, textY);

    textY += 5;
    doc.setFontSize(8);
    doc.setTextColor(82, 82, 91);
    doc.text(`${pdfData.email}  |  ${pdfData.whatsapp}`, textX, textY);

    y = avatarY + avatarSize + 10;

    // === Summary ===
    try {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...COLORS.text);
      const summaryLines = doc.splitTextToSize(
        pdfData.summary,
        CONTENT_WIDTH
      );
      ensureSpace(summaryLines.length * 4);
      doc.text(summaryLines, MARGIN, y);
      y += summaryLines.length * 4 + 5;
    } catch (e) {
      console.warn('Summary section failed:', e);
    }

    // Divider
    try {
      doc.setDrawColor(...COLORS.border);
      doc.setLineWidth(0.2);
      doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
      y += 6;
    } catch (e) {
      console.warn('Divider failed:', e);
    }

    // === Highlights ===
    try {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(...COLORS.primary);
      doc.text(
        lang === 'es' ? 'Highlights' : 'Highlights',
        MARGIN,
        y
      );
      y += 6;

      const colWidth = (CONTENT_WIDTH - 4) / 3;
      const highlightRows = Math.ceil(pdfData.highlights.length / 3);
      const startY = y;
      for (let i = 0; i < pdfData.highlights.length; i++) {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = MARGIN + col * (colWidth + 2);
        const itemY = startY + row * 12;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(...COLORS.secondary);
        doc.text(pdfData.highlights[i].value, x, itemY);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...COLORS.textSoft);
        const labelLines = doc.splitTextToSize(
          pdfData.highlights[i].label,
          colWidth
        );
        doc.text(labelLines, x, itemY + 4);
      }
      y = startY + highlightRows * 12 + 4;
    } catch (e) {
      console.warn('Highlights section failed:', e);
    }

    // Divider
    try {
      ensureSpace(2);
      doc.setDrawColor(...COLORS.border);
      doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
      y += 6;
    } catch (e) {
      console.warn('Divider failed:', e);
    }

    // === Experience ===
    try {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(...COLORS.primary);
      doc.text(
        lang === 'es' ? 'Experiencia' : 'Experience',
        MARGIN,
        y
      );
      y += 6;

      for (const exp of pdfData.experience) {
        ensureSpace(15);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(...COLORS.primary);
        doc.text(`${exp.company} — ${exp.role}`, MARGIN, y);
        y += 4.5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...COLORS.textSoft);
        doc.text(`${exp.period}  ·  ${exp.location}`, MARGIN, y);
        y += 4;

        doc.setFontSize(8.5);
        doc.setTextColor(...COLORS.text);
        for (const h of exp.highlights) {
          const lines = doc.splitTextToSize(h, CONTENT_WIDTH - 4);
          ensureSpace(lines.length * 3.5);
          doc.setTextColor(...COLORS.secondary);
          doc.text('•', MARGIN, y);
          doc.setTextColor(...COLORS.text);
          doc.text(lines, MARGIN + 4, y);
          y += lines.length * 3.5 + 1;
        }

        ensureSpace(4);
        doc.setFontSize(7.5);
        doc.setTextColor(...COLORS.secondary);
        const stackText = exp.stack.join(' · ');
        const stackLines = doc.splitTextToSize(
          stackText,
          CONTENT_WIDTH - 4
        );
        doc.text(stackLines, MARGIN, y);
        y += stackLines.length * 3 + 3;

        if (exp.liveUrl) {
          doc.setFontSize(7.5);
          doc.setTextColor(...COLORS.secondary);
          try {
            doc.text(exp.liveUrl, MARGIN, y);
            doc.link(MARGIN, y - 3, CONTENT_WIDTH, 4, { url: exp.liveUrl });
            y += 4;
          } catch (linkErr) {
            console.warn('Link failed:', linkErr);
          }
        }
      }
    } catch (e) {
      console.warn('Experience section failed:', e);
    }

    // Divider
    try {
      ensureSpace(6);
      doc.setDrawColor(...COLORS.border);
      doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
      y += 6;
    } catch (e) {
      console.warn('Divider failed:', e);
    }

    // === Languages + Interests (2 cols) ===
    // Reserva 25mm para las dos columnas (título + items)
    ensureSpace(25);
    try {
      const bottomY = y;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(24, 24, 27);
      doc.text(
        lang === 'es' ? 'Idiomas' : 'Languages',
        MARGIN,
        bottomY
      );

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(24, 24, 27);
      for (let i = 0; i < pdfData.languages.length; i++) {
        doc.text(`•  ${pdfData.languages[i]}`, MARGIN, bottomY + 5 + i * 4);
      }

      const col2X = MARGIN + CONTENT_WIDTH / 2 + 2;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(24, 24, 27);
      doc.text(
        lang === 'es' ? 'En qué trabajo' : 'What I work on',
        col2X,
        bottomY
      );

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(24, 24, 27);
      for (let i = 0; i < pdfData.interests.length; i++) {
        doc.text(
          `•  ${pdfData.interests[i]}`,
          col2X,
          bottomY + 5 + i * 4
        );
      }
    } catch (e) {
      console.warn('Languages/Interests section failed:', e);
    }

    // === Footer ===
    try {
      const footerY = PAGE_HEIGHT - 10;
      doc.setDrawColor(...COLORS.border);
      doc.line(MARGIN, footerY - 2, PAGE_WIDTH - MARGIN, footerY - 2);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(...COLORS.textSoft);
      doc.text(
        `${pdfData.email}  ·  ${pdfData.github}  ·  ${pdfData.linkedin}`,
        MARGIN,
        footerY
      );
      doc.text(
        `Page 1 of ${doc.getNumberOfPages()}`,
        PAGE_WIDTH - MARGIN,
        footerY,
        { align: 'right' } as never
      );
    } catch (e) {
      console.warn('Footer failed:', e);
    }

    return doc;
  };

  const handleClick = async () => {
    setBusy(true);
    try {
      await new Promise((r) => setTimeout(r, 50));
      const doc = generatePDF();
      const filename = `leonardo-serrano-cv-${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      doc.save(filename);
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setBusy(false);
    }
  };

  const baseClass =
    'inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold cursor-pointer active:scale-95 transition print:hidden disabled:opacity-60 disabled:cursor-not-allowed';
  const variantClass =
    variant === 'light'
      ? 'bg-white !text-[#0a0a0a] hover:bg-white/90'
      : 'bg-primario text-bg hover:bg-primario/90';

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      className={`${baseClass} ${variantClass} ${className}`}
    >
      {busy ? (
        <>
          <span
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
          <span>{loadingLabel}</span>
        </>
      ) : (
        <>
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

export default DownloadPDFButton;
