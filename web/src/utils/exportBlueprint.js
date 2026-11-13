import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#8b5cf6', '#06b6d4', '#ec4899', '#10b981', '#f59e0b']
  });
};

/**
 * Downloads the recipe card element as high-res PNG
 */
export const downloadRecipeCardAsPng = async (elementId = 'stitchcraft-recipe-card', fileName = 'stitchcraft-blueprint') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found:', elementId);
    return false;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // 2x retina clarity
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#0c111f',
      logging: false,
    });

    const link = document.createElement('a');
    link.download = `${fileName}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    triggerConfetti();
    return true;
  } catch (err) {
    console.error('Error generating PNG:', err);
    return false;
  }
};

/**
 * Downloads the recipe card as a multi-page or clean single-page PDF
 */
export const downloadRecipeCardAsPdf = async (elementId = 'stitchcraft-recipe-card', fileName = 'stitchcraft-tech-pack') => {
  const element = document.getElementById(elementId);
  if (!element) return false;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#0c111f',
      logging: false
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${fileName}-${Date.now()}.pdf`);
    triggerConfetti();
    return true;
  } catch (err) {
    console.error('Error generating PDF:', err);
    return false;
  }
};

