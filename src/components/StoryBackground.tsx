import { Book, Moon, Star, CloudMoon, Leaf, Bird, Cloud, Palmtree, Sun, Mountain } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StoryBackgroundProps {
  children: React.ReactNode;
}

const StoryBackground: React.FC<StoryBackgroundProps> = ({ children }) => {
  const [dustSprites, setDustSprites] = useState<Array<{id: number, size: number, top: string, left: string, delay: number}>>([]);
  
  useEffect(() => {
    // Create dust sprites (inspired by the soot sprites in Ghibli films)
    const sprites = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 8) + 4, // 4-12px
      top: `${Math.floor(Math.random() * 80) + 10}%`, // 10-90%
      left: `${Math.floor(Math.random() * 80) + 10}%`, // 10-90%
      delay: Math.floor(Math.random() * 5) // 0-5s
    }));
    setDustSprites(sprites);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Dust sprites (like the soot sprites from Totoro/Spirited Away) */}
      {dustSprites.map(sprite => (
        <div 
          key={sprite.id}
          className="dust-sprite"
          style={{
            width: `${sprite.size}px`,
            height: `${sprite.size}px`,
            top: sprite.top,
            left: sprite.left,
            animationDelay: `${sprite.delay}s`
          }}
        />
      ))}
      
      {/* Floating elements in the background - Ghibli style */}
      <div className="absolute top-10 left-[10%] text-story-blue opacity-60 animate-float">
        <Cloud size={35} strokeWidth={1} />
      </div>
      <div className="absolute top-20 right-[15%] text-story-yellow opacity-70 animate-float animation-delay-1000">
        <Star size={20} fill="currentColor" />
      </div>
      <div className="absolute bottom-20 left-[20%] text-story-yellow opacity-50 animate-float animation-delay-2000">
        <Star size={25} fill="currentColor" />
      </div>
      <div className="absolute top-1/4 right-[25%] text-story-teal opacity-60 animate-bounce-slow">
        <Bird size={28} />
      </div>
      <div className="absolute bottom-1/3 right-[10%] text-story-seafoam opacity-70 animate-leaf-sway">
        <Leaf size={40} />
      </div>
      <div className="absolute bottom-1/4 left-[5%] text-story-forest opacity-60 animate-leaf-sway">
        <Palmtree size={45} />
      </div>
      <div className="absolute top-1/5 left-[25%] text-story-blue opacity-40 animate-float">
        <CloudMoon size={38} />
      </div>
      <div className="absolute top-1/2 right-[8%] text-story-orange opacity-60 animate-float">
        <Sun size={32} />
      </div>
      <div className="absolute bottom-10 right-[30%] text-story-brown opacity-50 animate-bounce-slow">
        <Mountain size={40} />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default StoryBackground;
