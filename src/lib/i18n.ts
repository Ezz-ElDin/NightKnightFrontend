
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enCommon from '../locales/en/common.json';
import arCommon from '../locales/ar/common.json';

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        common: enCommon
      },
      ar: {
        common: arCommon
      }
    },
    defaultNS: 'common',
    detection: {
      // order and from where user language should be detected
      order: ['path', 'localStorage', 'navigator'],
      // keys or params to lookup language from
      lookupLocalStorage: 'i18nextLng',
      // cache user language on
      caches: ['localStorage'],
    }
  });

// Function to set document direction based on language
export const setDocumentDirection = (lng: string) => {
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
  
  // Add/remove RTL specific class for styling if needed
  if (lng === 'ar') {
    document.documentElement.classList.add('rtl');
  } else {
    document.documentElement.classList.remove('rtl');
  }
};

// Set initial direction
setDocumentDirection(i18n.language);

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  setDocumentDirection(lng);
});

export default i18n;
