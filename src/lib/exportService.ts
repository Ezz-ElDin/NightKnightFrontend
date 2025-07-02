import jsPDF from 'jspdf';
import { StoryDetails } from '@/lib/api';

class StoryExportService {
  private readonly PAGE_WIDTH = 297; // A4 landscape width in mm
  private readonly PAGE_HEIGHT = 210; // A4 landscape height in mm
  private readonly MARGIN = 15;
  private readonly SECTION_WIDTH = (this.PAGE_WIDTH - 3 * this.MARGIN) / 2; // Split in half with margin between

  async exportStoryToPDF(story: StoryDetails): Promise<void> {
    const doc = new jsPDF('landscape', 'mm', 'a4');
    
    // First page (cover) - no footer, uses first story page image
    await this.createCoverPage(doc, story);
    
    // Story pages - start from the SECOND story page (index 1) since first is used as cover
    for (let i = 1; i < story.pages.length; i++) {
      doc.addPage();
      await this.createStoryPage(doc, story.pages[i], i + 1);
    }
    
    // Download the PDF
    doc.save(`${story.title}.pdf`);
  }

  private async createCoverPage(doc: jsPDF, story: StoryDetails): Promise<void> {
    // Left section - Title (matching StoryText component: text-[2.6rem] md:text-5xl font-bold)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(42); // Equivalent to text-5xl (48px) converted to points for PDF
    
    const titleLines = doc.splitTextToSize(story.title, this.SECTION_WIDTH);
    const titleHeight = titleLines.length * 12; // Increased line height for large text
    const titleY = (this.PAGE_HEIGHT - titleHeight) / 2;
    
    // Center align the title within the left section
    titleLines.forEach((line: string, index: number) => {
      const lineWidth = doc.getTextWidth(line);
      const xPosition = this.MARGIN + (this.SECTION_WIDTH - lineWidth) / 2;
      doc.text(line, xPosition, titleY + (index * 12));
    });
    
    // Right section - Cover image (use first page image)
    const coverImage = story.pages[0]?.image_url;
    if (coverImage) {
      try {
        const image = await this.loadImage(coverImage);
        this.fitImageToRightSection(doc, image, this.MARGIN * 2 + this.SECTION_WIDTH, this.MARGIN);
      } catch (error) {
        console.error('Failed to load cover image:', error);
      }
    }
    
    // NO FOOTER on cover page
  }

  private async createStoryPage(doc: jsPDF, page: any, pageNumber: number): Promise<void> {
    // Left section - Text (matching StoryText component: text-lg md:text-xl normal font)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16); // Equivalent to text-xl (20px) converted to points for PDF
    
    const textLines = doc.splitTextToSize(page.text, this.SECTION_WIDTH);
    const lineHeight = 8; // Increased line height to match web spacing (leading-relaxed equivalent)
    
    let yPosition = this.MARGIN + 20; // Start a bit lower to match web layout
    textLines.forEach((line: string) => {
      if (yPosition > this.PAGE_HEIGHT - 40) return; // Stop if near bottom
      
      // Center align the text within the left section
      const lineWidth = doc.getTextWidth(line);
      const xPosition = this.MARGIN + (this.SECTION_WIDTH - lineWidth) / 2;
      doc.text(line, xPosition, yPosition);
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
    
    // Footer (only on story pages, not cover)
    this.addFooter(doc);
  }

  private addFooter(doc: jsPDF): void {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8); // Smaller footer text
    doc.setTextColor(128, 128, 128); // Grey color (RGB: 128, 128, 128)
    
    const footerText = 'Created with love by NightKnight · https://nightknight.app';
    const textWidth = doc.getTextWidth(footerText);
    const xPosition = (this.PAGE_WIDTH - textWidth) / 2;
    
    doc.text(footerText, xPosition, this.PAGE_HEIGHT - 10);
    
    // Reset text color to black for subsequent text
    doc.setTextColor(0, 0, 0);
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
      // Image is wider, fit to width and fill as much height as possible
      width = maxWidth;
      height = maxWidth / imgRatio;
    } else {
      // Image is taller, fit to height and fill as much width as possible
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
