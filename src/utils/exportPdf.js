import jsPDF from 'jspdf';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../data/templates';
import { exportStageAsImage, downloadDataUrl } from './exportImage';

// Generates a PDF sized to the invitation's exact aspect ratio (5:7) and
// embeds the high-resolution canvas export as a single full-bleed page.
export async function exportStageAsPdf(stage, { selectedId, selectElement, filename = 'invitation.pdf' } = {}) {
  const dataUrl = await exportStageAsImage(stage, { format: 'png', selectedId, selectElement });

  const pdfWidthPt = 360; // ~5in at 72pt/in
  const pdfHeightPt = pdfWidthPt * (CANVAS_HEIGHT / CANVAS_WIDTH);

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: [pdfWidthPt, pdfHeightPt],
  });

  pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidthPt, pdfHeightPt, undefined, 'FAST');
  pdf.save(filename);
}

export { downloadDataUrl };
