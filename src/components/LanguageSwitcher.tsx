
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation('common');
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  // Map of language codes to their flag emojis
  const languageFlags: Record<string, string> = {
    en: '🇬🇧',
    ar: '🇪🇬'
  };
  
  const currentFlag = languageFlags[i18n.language] || '🌐';
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-9 px-0">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          className={`justify-between ${i18n.language === 'en' ? 'bg-accent' : ''}`}
          onClick={() => changeLanguage('en')}
        >
          <span>{t('language.en')}</span>
          <span className="ml-2">🇬🇧</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={`justify-between ${i18n.language === 'ar' ? 'bg-accent' : ''}`}
          onClick={() => changeLanguage('ar')}
        >
          <span>{t('language.ar')}</span>
          <span className="ml-2">🇪🇬</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
