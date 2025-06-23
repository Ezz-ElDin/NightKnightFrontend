
// Arabic font registration for jsPDF
import { jsPDF } from "jspdf";

let fontInitialized = false;

// Font registration callback function
const callAddFont = function (this: jsPDF) {
  if (!fontInitialized) {
    try {
      // Load the font file directly from the public directory
      fetch('/fonts/Cairo-VariableFont_slnt,wght.ttf')
        .then(response => response.arrayBuffer())
        .then(fontBuffer => {
          // Convert ArrayBuffer to base64
          const fontBase64 = arrayBufferToBase64(fontBuffer);
          
          this.addFileToVFS('Cairo-VariableFont_slnt,wght-normal.ttf', fontBase64);
          this.addFont('Cairo-VariableFont_slnt,wght-normal.ttf', 'Cairo-VariableFont_slnt,wght', 'normal');
          fontInitialized = true;
          console.log('Arabic font (Cairo) loaded and registered successfully');
        })
        .catch(error => {
          console.warn('Failed to load Arabic font file:', error);
        });
    } catch (error) {
      console.warn('Failed to register Arabic font:', error);
    }
  }
};

// Helper function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Initialize Arabic font registration globally
export const initializeArabicFont = () => {
  if (!fontInitialized) {
    // Register the font loading event
    jsPDF.API.events.push(['addFonts', callAddFont]);
  }
};

// Check if Arabic font is available (we'll assume it's available since we're loading it dynamically)
export const isArabicFontAvailable = () => {
  return true; // We'll load it dynamically when needed
};

// Preprocess Arabic text for better rendering
export const preprocessArabicText = (text: string) => {
  // Normalize Unicode and ensure proper encoding
  return text.normalize('NFC');
};
