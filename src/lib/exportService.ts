
import jsPDF from 'jspdf';

interface StoryPage {
  text: string;
  image_url: string;
}

interface StoryDetails {
  title: string;
  cover_front: string;
  pages: StoryPage[];
}

class StoryExportService {
  private readonly PAGE_WIDTH = 297; // A4 landscape width in mm
  private readonly PAGE_HEIGHT = 210; // A4 landscape height in mm
  private readonly MARGIN = 15;
  private readonly SECTION_WIDTH = (this.PAGE_WIDTH - 3 * this.MARGIN) / 2; // Split in half with margin between

  async exportStoryToPDF(story: StoryDetails): Promise<void> {
    const doc = new jsPDF('landscape', 'mm', 'a4');
    
    // First page (cover)
    await this.createFirstPage(doc, story);
    
    // Story pages
    for (let i = 0; i < story.pages.length; i++) {
      doc.addPage();
      await this.createStoryPage(doc, story.pages[i], i + 2);
    }
    
    // Download the PDF
    doc.save(`${story.title}.pdf`);
  }

  private async createFirstPage(doc: jsPDF, story: StoryDetails): Promise<void> {
    // Left section - Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    
    const titleLines = doc.splitTextToSize(story.title, this.SECTION_WIDTH);
    const titleHeight = titleLines.length * 8;
    const titleY = (this.PAGE_HEIGHT - titleHeight) / 2;
    
    doc.text(titleLines, this.MARGIN, titleY);
    
    // Right section - Cover image
    if (story.cover_front) {
      try {
        const image = await this.loadImage(story.cover_front);
        this.fitImageToRightSection(doc, image, this.MARGIN * 2 + this.SECTION_WIDTH, this.MARGIN);
      } catch (error) {
        console.error('Failed to load cover image:', error);
      }
    }
  }

  private async createStoryPage(doc: jsPDF, page: StoryPage, pageNumber: number): Promise<void> {
    // Left section - Text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    
    const textLines = doc.splitTextToSize(page.text, this.SECTION_WIDTH);
    const lineHeight = 6; // Child-friendly line spacing
    
    let yPosition = this.MARGIN + 10;
    textLines.forEach((line: string) => {
      if (yPosition > this.PAGE_HEIGHT - 40) return; // Stop if near bottom
      doc.text(line, this.MARGIN, yPosition);
      yPosition += lineHeight;
    });
    
    // Right section - Image
    if (page.image_url) {
      try {
        const image = await this.loadImage(page.image_url);
        this.fitImageToRightSection(doc, image, this.MARGIN * 2 + this.SECTION_WIDTH, this.MARGIN);
      } catch (error) {
        console.error('Failed to load page image:', error);
      }
    }
    
    // Footer (not on first page)
    this.addFooter(doc);
  }

  private addFooter(doc: jsPDF): void {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    
    const footerText = 'Created with love by NightKnight · https://nightknight.app';
    const textWidth = doc.getTextWidth(footerText);
    const xPosition = (this.PAGE_WIDTH - textWidth) / 2;
    
    doc.text(footerText, xPosition, this.PAGE_HEIGHT - 10);
  }

  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  private fitImageToRightSection(doc: jsPDF, image: HTMLImageElement, x: number, y: number): void {
    const maxWidth = this.SECTION_WIDTH;
    const maxHeight = this.PAGE_HEIGHT - 2 * this.MARGIN;
    
    const imgRatio = image.width / image.height;
    const maxRatio = maxWidth / maxHeight;
    
    let width, height;
    
    if (imgRatio > maxRatio) {
      // Image is wider, fit to width
      width = maxWidth;
      height = maxWidth / imgRatio;
    } else {
      // Image is taller, fit to height
      height = maxHeight;
      width = maxHeight * imgRatio;
    }
    
    // Center the image in the right section
    const finalX = x + (maxWidth - width) / 2;
    const finalY = y + (maxHeight - height) / 2;
    
    doc.addImage(image, 'JPEG', finalX, finalY, width, height);
  }
}

export const exportService = new StoryExportService();
