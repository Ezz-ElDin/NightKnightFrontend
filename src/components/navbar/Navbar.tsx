
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavLogo from "./NavLogo";
import LoggedInMenu from "./LoggedInMenu";
import GuestMenu from "./GuestMenu";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  
  // Check authentication status based on token presence
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };
    
    checkAuthStatus();
    
    // Listen for auth changes
    const handleStorageChange = () => {
      checkAuthStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('user-info-updated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('user-info-updated', handleStorageChange);
    };
  }, []);
  
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
