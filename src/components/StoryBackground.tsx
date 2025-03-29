
import { Book, Moon, Star, CloudMoon } from 'lucide-react';

interface StoryBackgroundProps {
  children: React.ReactNode;
}

const StoryBackground: React.FC<StoryBackgroundProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Floating elements in the background */}
      <div className="absolute top-10 left-[10%] text-story-yellow opacity-60 animate-float">
        <Star size={30} fill="currentColor" />
      </div>
      <div className="absolute top-20 right-[15%] text-story-yellow opacity-40 animate-float animation-delay-1000">
        <Star size={20} fill="currentColor" />
      </div>
      <div className="absolute bottom-20 left-[20%] text-story-yellow opacity-50 animate-float animation-delay-2000">
        <Star size={25} fill="currentColor" />
      </div>
      <div className="absolute top-1/4 right-[25%] text-story-purple opacity-40 animate-bounce-slow">
        <Book size={35} />
      </div>
      <div className="absolute bottom-1/3 right-[10%] text-story-purple opacity-60 animate-float">
        <Moon size={40} fill="currentColor" />
      </div>
      <div className="absolute top-1/3 left-[5%] text-story-blue opacity-50 animate-bounce-slow">
        <CloudMoon size={45} />
      </div>
      
      {/* Content */}
      {children}
    </div>
  );
};

export default StoryBackground;
