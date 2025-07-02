
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import GuestMenu from "./GuestMenu";
import LoggedInMenu from "./LoggedInMenu";

interface MobileMenuProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, isLoggedIn, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-sm border-b border-story-lightPurple/30 shadow-lg animate-in slide-in-from-top duration-300 z-40">
      <ScrollArea className="max-h-[80vh] px-4 py-4">
        <div className="flex flex-col space-y-3">
          {isLoggedIn ? (
            <LoggedInMenu isMobile={true} onMobileMenuClose={onClose} />
          ) : (
            <GuestMenu isMobile={true} onMobileMenuClose={onClose} />
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MobileMenu;
