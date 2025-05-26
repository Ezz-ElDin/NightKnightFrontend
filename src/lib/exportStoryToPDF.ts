
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { StoryDetails } from "@/lib/api";

// Utility function to export a story to PDF
export async function exportStoryToPDF(story: StoryDetails) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const watermark = "Created with ❤️ by NightKnight · nightknight.app";

  for (let i = 0; i < story.pages.length; i++) {
    const page = story.pages[i];
    // Title for first page
    if (i === 0) {
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text(story.title, pageWidth / 2, margin + 10, { align: "center", maxWidth: pageWidth - 2 * margin });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);
      doc.text(`Page ${i + 1} of ${story.pages.length}`, pageWidth / 2, margin + 38, { align: "center" });
      doc.setFontSize(14);
      doc.text(page.text, margin, margin + 80, { maxWidth: pageWidth - 2 * margin });
      // Watermark
      doc.setFontSize(11);
      doc.setTextColor(150, 150, 150);
      doc.text(watermark, pageWidth / 2, pageHeight - margin / 2, { align: "center" });
      doc.setTextColor(0, 0, 0);
    } else {
      doc.addPage();
      // If there is story text, render it with watermark
      if (page.text && page.text.trim() !== "") {
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text(story.title, pageWidth / 2, margin + 8, { align: "center", maxWidth: pageWidth - 2 * margin });
        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.text(`Page ${i + 1} of ${story.pages.length}`, pageWidth / 2, margin + 34, { align: "center" });
        doc.setFontSize(14);
        doc.text(page.text, margin, margin + 72, { maxWidth: pageWidth - 2 * margin });
        // Watermark
        doc.setFontSize(11);
        doc.setTextColor(150, 150, 150);
        doc.text(watermark, pageWidth / 2, pageHeight - margin / 2, { align: "center" });
        doc.setTextColor(0, 0, 0);
      }
      // If there is an image, render it (scaled and centered)
      if (page.image_url) {
        try {
          const img = await loadImage(page.image_url);
          // Use html2canvas to get data URL if it's SVG or not CORS-allowed (fallback to image only if possible)
          let dataUrl: string;
          if (/^data:/.test(page.image_url)) {
            dataUrl = page.image_url;
          } else {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0);
            dataUrl = canvas.toDataURL("image/jpeg");
          }
          // Calculate dimensions
          const maxImgWidth = pageWidth - 2 * margin;
          const maxImgHeight = pageHeight / 2;
          let imgW = img.width;
          let imgH = img.height;
          if (imgW > maxImgWidth) {
            const ratio = maxImgWidth / imgW;
            imgW = maxImgWidth;
            imgH = imgH * ratio;
          }
          if (imgH > maxImgHeight) {
            const ratio = maxImgHeight / imgH;
            imgH = maxImgHeight;
            imgW = imgW * ratio;
          }
          const imgX = (pageWidth - imgW) / 2;
          const imgY = pageHeight / 2 - imgH / 2;
          doc.addImage(dataUrl, "JPEG", imgX, imgY, imgW, imgH);
        } catch (e) {
          // Ignore image load errors in PDF
          console.warn("Failed to load image for PDF", e);
        }
      }
    }
  }

  doc.save(`${story.title.replace(/\s+/g, "_") || "story"}.pdf`);
}

// Utility to load an image as HTMLImageElement
function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}
