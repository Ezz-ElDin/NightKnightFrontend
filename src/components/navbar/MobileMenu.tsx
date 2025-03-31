
import React from "react";
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
    <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-story-lightPurple/30 p-4 shadow-lg animate-in slide-in-from-top duration-300">
      <div className="flex flex-col space-y-4">
        {isLoggedIn ? (
          <LoggedInMenu isMobile={true} onMobileMenuClose={onClose} />
        ) : (
          <GuestMenu isMobile={true} onMobileMenuClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
