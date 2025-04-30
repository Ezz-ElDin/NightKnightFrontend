
import React from "react";
import { Link } from "react-router-dom";
import { Sword, Shield } from "lucide-react";

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="relative">
        <Shield className="h-8 w-8 text-story-blue" />
        <Sword className="absolute -top-1 -right-1 h-4 w-4 text-story-orange animate-leaf-sway" />
      </div>
      <span className="font-bold text-2xl text-story-purple">Nighknight</span>
    </Link>
  );
};

export default NavLogo;
