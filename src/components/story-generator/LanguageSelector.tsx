
import React from "react";
import { LANGUAGES } from "./constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, setLanguage }) => {
  // Filter and sort languages alphabetically
  const sortedLanguages = LANGUAGES
    .filter(lang => ALLOWED_LANGUAGES.includes(lang.id))
    .sort((a, b) => a.id.localeCompare(b.id));

  return (
    <div>
      <label className="flex items-center gap-2 text-lg font-semibold text-blue-900 mb-3">
        <span className="inline-block text-2xl align-middle" role="img" aria-label="globe">
          🌎
        </span>
        Language
      </label>
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-full rounded-xl border-2 border-blue-400/30 text-base md:text-lg bg-white px-5 py-3 shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 font-ghibli h-auto min-h-[52px]">
          <SelectValue placeholder="Select a language">
            {language && (
              <div className="flex items-center gap-2">
                <span className="text-xl">{LANGUAGE_FLAGS[language]}</span>
                <span>{language}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent 
          className="rounded-xl border-2 border-blue-400/30 shadow-lg bg-white z-50 max-h-60 overflow-y-auto"
          position="popper"
          sideOffset={4}
        >
          {sortedLanguages.map(lang => (
            <SelectItem 
              key={lang.id} 
              value={lang.id}
              className="cursor-pointer hover:bg-blue-50 focus:bg-blue-50 rounded-lg mx-1 my-0.5 px-4 py-3 min-h-[48px] flex items-center"
            >
              <div className="flex items-center gap-3 w-full">
                <span className="text-xl flex-shrink-0">{LANGUAGE_FLAGS[lang.id]}</span>
                <span className="font-medium">{lang.id}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
