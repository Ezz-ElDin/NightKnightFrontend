
import React from "react";
import { Button } from "@/components/ui/button";
import NavLogo from "../navbar/NavLogo";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from 'react-i18next';

interface WaitingListNavbarProps {
  onJoinClick: () => void;
}

const WaitingListNavbar = ({ onJoinClick }: WaitingListNavbarProps) => {
  const { t } = useTranslation('common');
  
  return (
    <nav className="sticky top-0 z-50 w-full py-3 bg-white/80 backdrop-blur-md border-b border-story-seafoam/30 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <NavLogo />
        
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {/* Join Waiting List Button */}
          <Button 
            className="h-12 px-6 rounded-xl bg-story-purple hover:bg-story-purple/90 text-white button-bounce"
            onClick={onJoinClick}
          >
            {t('navigation.waitingList')}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default WaitingListNavbar;
