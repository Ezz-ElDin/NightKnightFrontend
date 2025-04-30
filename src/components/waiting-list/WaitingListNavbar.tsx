
import React from "react";
import { Button } from "@/components/ui/button";
import NavLogo from "../navbar/NavLogo";

interface WaitingListNavbarProps {
  onJoinClick: () => void;
}

const WaitingListNavbar = ({ onJoinClick }: WaitingListNavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full py-3 bg-white/80 backdrop-blur-md border-b border-story-seafoam/30 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <NavLogo />
        
        {/* Join Waiting List Button */}
        <Button 
          className="h-12 px-6 rounded-xl bg-story-blue hover:bg-story-blue/90 text-white button-bounce"
          onClick={onJoinClick}
        >
          Join Waiting List
        </Button>
      </div>
    </nav>
  );
};

export default WaitingListNavbar;
