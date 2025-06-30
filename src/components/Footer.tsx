
import { Heart, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-story-lightPurple to-story-seafoam/30 border-t border-story-purple/20">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Brand section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-story-purple mb-3">
              NightKnight
            </h2>
            <p className="text-gray-700 text-lg max-w-md mx-auto">
              Creating magical stories for children and families around the world.
            </p>
          </div>
          
          {/* Content grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Navigation Links */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-story-purple mb-6">Explore</h3>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="#how-it-works" 
                    className="text-gray-700 hover:text-story-purple transition-colors duration-200 text-base"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a 
                    href="#samples" 
                    className="text-gray-700 hover:text-story-purple transition-colors duration-200 text-base"
                  >
                    Story Samples
                  </a>
                </li>
                <li>
                  <a 
                    href="#pricing" 
                    className="text-gray-700 hover:text-story-purple transition-colors duration-200 text-base"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Social Links */}
            <div className="text-center md:text-right">
              <h3 className="text-lg font-semibold text-story-purple mb-6">Connect</h3>
              <div className="flex justify-center md:justify-end space-x-4">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/60 hover:bg-story-purple hover:text-white text-story-purple flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/60 hover:bg-story-blue hover:text-white text-story-blue flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <Twitter size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/60 hover:bg-story-pink hover:text-white text-story-pink flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="mailto:fairy@nightknight.app" 
                  className="w-10 h-10 rounded-full bg-white/60 hover:bg-story-teal hover:text-white text-story-teal flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom section */}
      <div className="border-t border-story-purple/20 bg-white/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="flex items-center justify-center text-gray-700 mb-2">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" fill="currentColor" /> for creative storytellers
            </p>
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} NightKnight. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
