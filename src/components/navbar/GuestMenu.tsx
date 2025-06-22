
import React from "react";
import { Link } from "react-router-dom";
import { Book, BookOpen, Star, Sparkles, UserPlus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GuestMenuProps {
  isMobile?: boolean;
  onMobileMenuClose?: () => void;
}

const GuestMenu = ({ isMobile = false, onMobileMenuClose }: GuestMenuProps) => {
  const handleClick = () => {
    if (isMobile && onMobileMenuClose) {
      onMobileMenuClose();
    }
  };

  if (isMobile) {
    return (
      <>
        <Link to="#how-it-works" className="px-3 py-2 rounded-xl hover:bg-story-lightPurple/50 text-story-purple font-medium flex items-center gap-2" onClick={handleClick}>
          <Book className="h-4 w-4" />
          How It Works
        </Link>
        <Link to="#story-samples" className="px-3 py-2 rounded-xl hover:bg-story-lightPurple/50 text-story-purple font-medium flex items-center gap-2" onClick={handleClick}>
          <BookOpen className="h-4 w-4" />
          Story Samples
        </Link>
        <Link to="#pricing" className="px-3 py-2 rounded-xl hover:bg-story-lightPurple/50 text-story-purple font-medium flex items-center gap-2" onClick={handleClick}>
          <Star className="h-4 w-4" fill="currentColor" />
          Pricing
        </Link>
        <div className="pt-2 flex flex-col space-y-3">
          <Link to="/register" onClick={handleClick}>
            <Button className="w-full bg-story-purple hover:bg-story-purple/90 text-white gap-1.5">
              <Sparkles className="h-4 w-4" />
              Start Creating
            </Button>
          </Link>
          <Link to="/login" onClick={handleClick}>
            <Button variant="ghost" className="w-full text-story-blue hover:bg-story-blue/10 gap-1.5">
              <LogIn className="h-4 w-4" />
              Log In
            </Button>
          </Link>
          <Link to="/register" onClick={handleClick}>
            <Button variant="outline" className="w-full border-story-blue text-story-blue hover:bg-story-blue/10 gap-1.5">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="flex items-center gap-3 ml-2">
      <Link to="/register">
        <Button className="bg-story-purple hover:bg-story-purple/90 text-white gap-1.5">
          <Sparkles className="h-4 w-4" />
          Start Creating
        </Button>
      </Link>
      <div className="h-6 w-px bg-story-lightPurple/50"></div>
      <Link to="/login">
        <Button variant="ghost" className="text-story-blue hover:bg-story-blue/10 gap-1">
          <LogIn className="h-4 w-4" />
          Log In
        </Button>
      </Link>
      <Link to="/register">
        <Button variant="outline" className="border-story-blue text-story-blue hover:bg-story-blue/10 gap-1">
          <UserPlus className="h-4 w-4" />
          Sign Up
        </Button>
      </Link>
    </div>
  );
};

export default GuestMenu;
