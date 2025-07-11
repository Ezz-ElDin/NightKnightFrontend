
import React from "react";
import { LANGUAGES } from "./constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  const [sheetOpen, setSheetOpen] = React.useState(false);

  // Filter and sort languages alphabetically
  const sortedLanguages = LANGUAGES
    .filter(lang => ALLOWED_LANGUAGES.includes(lang.id))
    .sort((a, b) => a.id.localeCompare(b.id));

  const handleLanguageSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setSheetOpen(false);
  };

  if (isMobile) {
    return (
      <div>
        <label className="flex items-center gap-2 text-lg font-semibold text-blue-900 mb-3">
          <span className="inline-block text-2xl align-middle" role="img" aria-label="globe">
            🌎
          </span>
          Language
        </label>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full rounded-xl border-2 border-blue-400/30 text-base bg-white px-5 py-3 shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 font-ghibli h-auto min-h-[52px] justify-start"
            >
              {language ? (
                <div className="flex items-center gap-2">
                  <span className="text-xl">{LANGUAGE_FLAGS[language]}</span>
                  <span>{language}</span>
                </div>
              ) : (
                <span className="text-muted-foreground">Select a language</span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-3xl border-t-2 border-blue-400/30">
            <SheetHeader className="pb-4">
              <SheetTitle className="text-xl font-bold text-blue-900 flex items-center gap-2">
                <span className="text-2xl" role="img" aria-label="globe">🌎</span>
                Choose Language
              </SheetTitle>
            </SheetHeader>
            <div className="grid gap-3 pb-6">
              {sortedLanguages.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => handleLanguageSelect(lang.id)}
                  className={`flex items-center gap-3 w-full px-4 py-4 rounded-xl border-2 transition-all ${
                    language === lang.id
                      ? "border-blue-500 bg-blue-50 text-blue-900 font-semibold"
                      : "border-blue-200 bg-white hover:bg-blue-50 hover:border-blue-300"
                  }`}
                >
                  <span className="text-2xl flex-shrink-0">{LANGUAGE_FLAGS[lang.id]}</span>
                  <span className="text-lg">{lang.id}</span>
                  {language === lang.id && (
                    <span className="ml-auto text-blue-500 text-xl">✓</span>
                  )}
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

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
          className="rounded-xl border-2 border-blue-400/30 shadow-lg bg-white z-[9999] max-h-60 overflow-y-auto w-[var(--radix-select-trigger-width)] min-w-[200px]"
          position="popper"
          side="bottom"
          align="start"
          sideOffset={4}
          avoidCollisions={true}
          collisionPadding={8}
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
