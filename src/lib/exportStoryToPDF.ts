import jsPDF from "jspdf";
import { StoryDetails } from "@/lib/api";

// Utility function to export a story to PDF
export async function exportStoryToPDF(story: StoryDetails & { cover_front?: { image_url?: string } }) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4',
  });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const watermark = "Created with love by NightKnight · http://nightknight.app";
  const columnWidth = (pageWidth - 2 * margin) / 2;
  const columnHeight = pageHeight - 2 * margin;

  for (let i = 0; i < story.pages.length; i++) {
    if (i !== 0) {
      doc.addPage();
    }

    // --- LEFT COLUMN: Left-Aligned Text ---
    if (i === 0) {
      // First page: use big title style, left-aligned
      const fontSize = 42;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(fontSize);
      doc.setTextColor(51, 51, 51);
      // Split title if it's too long
      const titleLines = doc.splitTextToSize(story.title, columnWidth - 24);
      // Measure text block height
      const lineHeight = fontSize * 1.1;
      const blockHeight = titleLines.length * lineHeight;
      // Left-align vertically centered in the left column
      const y = margin + (columnHeight - blockHeight) / 2 + fontSize;
      doc.text(
        titleLines,
        margin + 12,
        y,
        { maxWidth: columnWidth - 24, align: "left" }
      );
      // Restore default style for next page
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
    } else {
      // Other pages: text left-aligned vertically centered
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      const textLines = doc.splitTextToSize(story.pages[i].text, columnWidth - 24);
      const lineHeight = 19;
      const blockHeight = textLines.length * lineHeight;
      const y = margin + (columnHeight - blockHeight) / 2 + 16;
      doc.text(
        textLines,
        margin + 12,
        y,
        { maxWidth: columnWidth - 24, align: "left" }
      );
    }

    // --- RIGHT COLUMN: Image ---
    let imageUrl: string | undefined = story.pages[i].image_url;
    if (i === 0 && story.cover_front?.image_url) {
      imageUrl = story.cover_front.image_url;
    }
    if (imageUrl) {
      try {
        const img = await loadImage(imageUrl);
        let dataUrl: string;
        if (/^data:/.test(imageUrl)) {
          dataUrl = imageUrl;
        } else {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
          dataUrl = canvas.toDataURL("image/jpeg");
        }
        // Calculate image dimensions to fit within the right column
        let targetW = columnWidth - 24;
        let targetH = columnHeight - 24;
        let imgW = img.width, imgH = img.height;
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
        console.warn("Failed to load image for PDF (page " + (i + 1) + ")", e);
      }
    }

    // Add watermark at the bottom
    doc.setFontSize(9);
    doc.setTextColor(130, 130, 130);
    doc.setFont("times", "italic");
    doc.text(watermark, pageWidth / 2, pageHeight - margin / 2.5, { align: "center" });
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
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
