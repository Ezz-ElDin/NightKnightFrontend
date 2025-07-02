
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { StoryDetails } from './api';

export class ExportService {
  private static readonly FOOTER_TEXT = "Created with love by NightKnight · https://nightknight.app";
  
  static async exportToPDF(story: StoryDetails): Promise<void> {
    try {
      // Create PDF in landscape orientation
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Process each page
      for (let i = 0; i < story.pages.length; i++) {
        const page = story.pages[i];
        
        if (i > 0) {
          pdf.addPage();
        }
        
        // Add page content
        await this.addPageToPDF(pdf, page, story.title, pageWidth, pageHeight, i + 1);
        
        // Add branded footer
        this.addFooter(pdf, pageWidth, pageHeight);
      }
      
      // Download the PDF
      pdf.save(`${story.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
      
    } catch (error) {
      console.error('PDF export failed:', error);
      throw new Error('Failed to export PDF. Please try again.');
    }
  }
  
  private static async addPageToPDF(
    pdf: jsPDF, 
    page: any, 
    title: string, 
    pageWidth: number, 
    pageHeight: number, 
    pageNumber: number
  ): Promise<void> {
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    const contentHeight = pageHeight - (margin * 3); // Extra margin for footer
    
    // Add page title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title, margin, margin);
    
    // Add page number
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Page ${pageNumber}`, pageWidth - margin - 20, margin);
    
    let currentY = margin + 15;
    
    // Add story text
    if (page.text) {
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      
      const textLines = pdf.splitTextToSize(page.text, contentWidth * 0.6);
      pdf.text(textLines, margin, currentY);
      
      currentY += textLines.length * 5 + 10;
    }
    
    // Add image if available
    if (page.image_url) {
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = page.image_url;
        });
        
        // Calculate image dimensions to fit in remaining space
        const maxImageWidth = contentWidth * 0.4;
        const maxImageHeight = contentHeight - (currentY - margin);
        
        const aspectRatio = img.width / img.height;
        let imageWidth = maxImageWidth;
        let imageHeight = imageWidth / aspectRatio;
        
        if (imageHeight > maxImageHeight) {
          imageHeight = maxImageHeight;
          imageWidth = imageHeight * aspectRatio;
        }
        
        // Position image on the right side
        const imageX = pageWidth - margin - imageWidth;
        pdf.addImage(img, 'JPEG', imageX, currentY, imageWidth, imageHeight);
        
      } catch (error) {
        console.warn('Failed to load image for PDF:', error);
      }
    }
  }
  
  private static addFooter(pdf: jsPDF, pageWidth: number, pageHeight: number): void {
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'italic');
    
    const footerY = pageHeight - 10;
    const textWidth = pdf.getTextWidth(this.FOOTER_TEXT);
    const footerX = (pageWidth - textWidth) / 2;
    
    pdf.text(this.FOOTER_TEXT, footerX, footerY);
  }
  
  static isSupportedLanguage(language: string): boolean {
    return language !== 'egyptian_arabic';
  }
}
