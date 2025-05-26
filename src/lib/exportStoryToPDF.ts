
import jsPDF from "jspdf";
import { StoryDetails } from "@/lib/api";

// Utility function to export a story to PDF
export async function exportStoryToPDF(story: StoryDetails) {
  const doc = new jsPDF({
    orientation: 'landscape', // Landscape for "storybook" layout
    unit: 'pt',
    format: 'a4',
  });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const watermark = "Created with love by NightKnight · nightknight.app";

  for (let i = 0; i < story.pages.length; i++) {
    const page = story.pages[i];

    if (i === 0) {
      // First page: Just the title centered (like a cover), no page number, no image
      doc.setFontSize(32);
      doc.setFont("helvetica", "bold");
      doc.text(story.title, pageWidth / 2, pageHeight / 2, { align: "center", maxWidth: pageWidth - 2 * margin });
      // Add watermark at the bottom
      doc.setFontSize(9);
      doc.setTextColor(130, 130, 130);
      doc.setFont("times", "italic");
      doc.text(watermark, pageWidth / 2, pageHeight - margin / 2.5, { align: "center" });
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
    } else {
      doc.addPage();
      // Draw a two-column layout: text left, image right, each filling 50% width
      const columnWidth = (pageWidth - 2 * margin) / 2;
      const columnHeight = pageHeight - 2 * margin;
      
      // --- Text column on the left ---
      doc.setFontSize(16);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      doc.text(
        doc.splitTextToSize(page.text, columnWidth - 24), // leave some padding
        margin + 12,
        margin + 32,
        { maxWidth: columnWidth - 24, align: "left" }
      );

      // --- Image column on the right ---
      if (page.image_url) {
        try {
          const img = await loadImage(page.image_url);
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
          // Calculate image dimensions to fit only within the right column
          let targetW = columnWidth - 24;
          let targetH = columnHeight - 24;
          let imgW = img.width, imgH = img.height;
          // Scale proportionally to fit inside column
          const widthRatio = targetW / imgW;
          const heightRatio = targetH / imgH;
          const scale = Math.min(widthRatio, heightRatio, 1);
          imgW = imgW * scale;
          imgH = imgH * scale;
          const imgX = margin + columnWidth + ((columnWidth - imgW) / 2);
          const imgY = margin + ((columnHeight - imgH) / 2);
          doc.addImage(dataUrl, "JPEG", imgX, imgY, imgW, imgH);
        } catch (e) {
          // Ignore image load errors in PDF
          console.warn("Failed to load image for PDF", e);
        }
      }

      // --- Add watermark at the bottom ---
      doc.setFontSize(9);
      doc.setTextColor(130, 130, 130);
      doc.setFont("times", "italic");
      doc.text(watermark, pageWidth / 2, pageHeight - margin / 2.5, { align: "center" });
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
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

