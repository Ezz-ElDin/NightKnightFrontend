
import { Heart, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-story-lightPurple/50 pt-16 pb-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-story-purple">NightKnight</h3>
            <p className="text-gray-700 mb-4">
              Creating magical stories for children and families around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-story-purple hover:text-story-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-story-purple hover:text-story-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-story-purple hover:text-story-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="mailto:hello@nightknight.com" className="text-story-purple hover:text-story-blue transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-story-purple">Explore</h3>
            <ul className="space-y-2">
              <li>
                <a href="#how-it-works" className="text-gray-700 hover:text-story-purple transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#samples" className="text-gray-700 hover:text-story-purple transition-colors">
                  Story Samples
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-700 hover:text-story-purple transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-story-purple/20 text-center text-gray-600">
          <p className="flex items-center justify-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" fill="currentColor" /> for creative storytellers everywhere
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} NightKnight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
