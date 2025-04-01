
import React from "react";
import { Link } from "react-router-dom";
import { Book, Leaf } from "lucide-react";

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="relative">
        <Book className="h-8 w-8 text-story-teal" />
        <Leaf className="absolute -top-1 -right-1 h-4 w-4 text-story-green animate-leaf-sway" />
      </div>
      <span className="font-bold text-2xl text-story-purple">Storyland</span>
    </Link>
  );
};

export default NavLogo;
