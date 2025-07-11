
import React, { useState } from "react";
import { LANGUAGES } from "./constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  
  // Filter and sort languages alphabetically
  const sortedLanguages = LANGUAGES
    .filter(lang => ALLOWED_LANGUAGES.includes(lang.id))
    .sort((a, b) => a.id.localeCompare(b.id));

  const handleLanguageSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setIsOpen(false);
  };

  return (
    <div>
      <label className="flex items-center gap-2 text-lg font-semibold text-blue-900 mb-3">
        <span className="inline-block text-2xl align-middle" role="img" aria-label="globe">
          🌎
        </span>
        Language
      </label>
      
      {/* Desktop view - use Select component */}
      <div className="hidden md:block">
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
            className="rounded-xl border-2 border-blue-400/30 shadow-lg bg-white z-[9999] max-h-60 overflow-y-auto"
            position="popper"
            side="bottom"
            align="start"
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

      {/* Mobile view - use Dialog modal */}
      <div className="block md:hidden">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full rounded-xl border-2 border-blue-400/30 text-base bg-white px-5 py-3 shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 font-ghibli h-auto min-h-[52px] justify-between"
            >
              {language ? (
                <div className="flex items-center gap-2">
                  <span className="text-xl">{LANGUAGE_FLAGS[language]}</span>
                  <span>{language}</span>
                </div>
              ) : (
                <span className="text-muted-foreground">Select a language</span>
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90vw] max-w-sm mx-auto top-[40%] translate-y-[-50%] rounded-2xl">
            <DialogHeader className="pb-4">
              <DialogTitle className="flex items-center gap-2 text-xl">
                <span className="text-2xl">🌎</span>
                Select Language
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-1">
              {sortedLanguages.map(lang => (
                <Button
                  key={lang.id}
                  variant="ghost"
                  className={`w-full justify-start px-4 py-4 h-auto rounded-xl ${
                    language === lang.id ? 'bg-blue-50 text-blue-900 border border-blue-200' : 'hover:bg-blue-50'
                  }`}
                  onClick={() => handleLanguageSelect(lang.id)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className="text-xl flex-shrink-0">{LANGUAGE_FLAGS[lang.id]}</span>
                    <span className="font-medium text-base">{lang.id}</span>
                  </div>
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LanguageSelector;
