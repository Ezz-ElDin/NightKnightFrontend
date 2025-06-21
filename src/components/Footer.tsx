
import { Heart, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-story-lightPurple/30 via-story-seafoam/20 to-story-yellow/20 pt-20 pb-12 px-4 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-8 left-8 w-24 h-24 bg-story-purple rounded-full blur-xl"></div>
        <div className="absolute bottom-12 right-12 w-32 h-32 bg-story-teal rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-story-pink rounded-full blur-lg"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-story-purple bg-gradient-to-r from-story-purple to-story-teal bg-clip-text text-transparent">
            NightKnight
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Creating magical stories for children and families around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Social Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-6 text-story-purple">Connect With Us</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              <a 
                href="#" 
                className="group relative p-3 rounded-full bg-white/70 backdrop-blur-sm border border-story-purple/20 hover:bg-story-purple transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              >
                <Facebook size={24} className="text-story-purple group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="group relative p-3 rounded-full bg-white/70 backdrop-blur-sm border border-story-purple/20 hover:bg-story-blue transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              >
                <Twitter size={24} className="text-story-purple group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="group relative p-3 rounded-full bg-white/70 backdrop-blur-sm border border-story-purple/20 hover:bg-story-pink transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              >
                <Instagram size={24} className="text-story-purple group-hover:text-white transition-colors" />
              </a>
              <a 
                href="mailto:hello@nightknight.com" 
                className="group relative p-3 rounded-full bg-white/70 backdrop-blur-sm border border-story-purple/20 hover:bg-story-teal transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              >
                <Mail size={24} className="text-story-purple group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-6 text-story-purple">Explore</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#how-it-works" 
                  className="inline-block text-gray-700 hover:text-story-purple transition-all duration-300 hover:scale-105 font-medium"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a 
                  href="#samples" 
                  className="inline-block text-gray-700 hover:text-story-purple transition-all duration-300 hover:scale-105 font-medium"
                >
                  Story Samples
                </a>
              </li>
              <li>
                <a 
                  href="#pricing" 
                  className="inline-block text-gray-700 hover:text-story-purple transition-all duration-300 hover:scale-105 font-medium"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with divider */}
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-story-purple/30 to-transparent"></div>
          <div className="pt-8 text-center">
            <p className="flex items-center justify-center text-gray-600 mb-4 text-lg">
              Made with <Heart className="h-5 w-5 mx-2 text-red-500 animate-pulse" fill="currentColor" /> for creative storytellers everywhere
            </p>
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} NightKnight. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
