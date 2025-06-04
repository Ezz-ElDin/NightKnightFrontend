
import React from "react";
import { LANGUAGES } from "./constants";

interface LanguageSelectorProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const ALLOWED_LANGUAGES = ["English", "French", "Arabic"];

// Language to flag mapping
const LANGUAGE_FLAGS: Record<string, string> = {
  "English": "🇬🇧", // UK flag
  "French": "🇫🇷",
  "Arabic": "🇪🇬", // Egyptian flag
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, setLanguage }) => (
  <div>
    <label className="flex items-center gap-2 text-lg font-semibold text-blue-900 mb-1">
      <span className="inline-block text-2xl align-middle" role="img" aria-label="globe">
        🌎
      </span>
      Language
    </label>
    <select
      value={language}
      onChange={e => setLanguage(e.target.value)}
      className="w-full rounded-xl border-2 border-blue-400/30 text-base md:text-lg bg-white px-5 py-3 mt-1 shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 font-ghibli"
      aria-label="Language"
    >
      <option value="" disabled>Select a language</option>
      {LANGUAGES.filter(lang => ALLOWED_LANGUAGES.includes(lang.id)).map(lang => (
        <option key={lang.id} value={lang.id}>
          {LANGUAGE_FLAGS[lang.id]} {lang.id}
        </option>
      ))}
    </select>
  </div>
);

export default LanguageSelector;
