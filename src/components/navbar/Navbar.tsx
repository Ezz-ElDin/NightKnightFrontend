
import { useState } from "react";
import { useLocation } from "react-router-dom";
import NavLogo from "./NavLogo";
import LoggedInMenu from "./LoggedInMenu";
import GuestMenu from "./GuestMenu";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Determine authentication status by route prefix
  const loggedInPrefixes = [
    "/library",
    "/create-story",
    "/account-settings"
  ];
  const isLoggedIn = loggedInPrefixes.some(prefix => location.pathname.startsWith(prefix));
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <nav className="sticky top-0 z-50 w-full py-3 bg-white/80 backdrop-blur-md border-b border-story-seafoam/30 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <NavLogo />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? <LoggedInMenu /> : <GuestMenu />}
        </div>
        
        {/* Mobile menu button */}
        <MobileMenuButton isOpen={mobileMenuOpen} onClick={toggleMobileMenu} />
      </div>
      
      {/* Mobile menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        isLoggedIn={isLoggedIn} 
        onClose={closeMobileMenu} 
      />
    </nav>
  );
};

export default Navbar;

