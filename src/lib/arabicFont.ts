
// Arabic font registration for jsPDF
import { jsPDF } from "jspdf";

// TODO: Replace this placeholder with your actual base64 font data
const CAIRO_FONT_BASE64 = ""; // <<<< ADD YOUR BASE64 FONT DATA HERE <<<<

// Font registration callback function
const callAddFont = function (this: jsPDF) {
  if (CAIRO_FONT_BASE64) {
    try {
      this.addFileToVFS('Cairo-VariableFont_slnt,wght-normal.ttf', CAIRO_FONT_BASE64);
      this.addFont('Cairo-VariableFont_slnt,wght-normal.ttf', 'Cairo-VariableFont_slnt,wght', 'normal');
      console.log('Arabic font (Cairo) registered successfully');
    } catch (error) {
      console.warn('Failed to register Arabic font:', error);
    }
  } else {
    console.warn('Arabic font base64 data not provided');
  }
};

// Initialize Arabic font registration
export const initializeArabicFont = () => {
  // Register the font loading event
  jsPDF.API.events.push(['addFonts', callAddFont]);
};

// Check if Arabic font is available
export const isArabicFontAvailable = () => {
  return CAIRO_FONT_BASE64.length > 0;
};
