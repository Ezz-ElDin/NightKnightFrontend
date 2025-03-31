
import React from "react";
import { Link } from "react-router-dom";
import { Book, Star } from "lucide-react";

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="relative">
        <Book className="h-8 w-8 text-story-purple" />
        <Star className="absolute -top-1 -right-1 h-4 w-4 text-amber-400" fill="currentColor" />
      </div>
      <span className="font-bold text-2xl text-story-purple">Storyland</span>
    </Link>
  );
};

export default NavLogo;
