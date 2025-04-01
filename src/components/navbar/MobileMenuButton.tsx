
import React from "react";
import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MobileMenuButton = ({ isOpen, onClick }: MobileMenuButtonProps) => {
  return (
    <button 
      className="md:hidden text-story-teal rounded-full p-2 hover:bg-story-seafoam/20 transition-colors"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
};

export default MobileMenuButton;
