
import React, { RefObject } from 'react';
import { Book, Sword, Star, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WaitingListHeroProps {
  emailSectionRef: RefObject<HTMLDivElement>;
}

const WaitingListHero = ({ emailSectionRef }: WaitingListHeroProps) => {
  const scrollToEmailSection = () => {
    emailSectionRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className="container max-w-6xl mx-auto text-center z-10">
      <div className="mb-8 flex justify-center">
        <div className="relative">
          <Book className="h-28 w-28 text-story-purple animate-wiggle" />
          <div className="absolute -top-2 -right-8">
            <Sword className="h-16 w-16 text-story-orange rotate-45 animate-leaf-sway" />
          </div>
          <div className="absolute -top-4 -right-4 bg-story-yellow p-2 rounded-full animate-bounce-slow">
            <p className="text-sm font-bold text-story-orange">Coming Soon</p>
          </div>
        </div>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold mb-6 text-story-purple">
        NightKnight
      </h1>
      
      <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-story-blue">Magical Stories for Children</h2>
      
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-story-purple/20 max-w-3xl mx-auto mb-12 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Star className="h-8 w-8 text-story-yellow animate-pulse" />
          <h3 className="text-2xl md:text-3xl font-bold text-story-purple">Unlock the Magic of Storytelling!</h3>
          <Star className="h-8 w-8 text-story-yellow animate-pulse" />
        </div>
        
        <p className="text-xl md:text-2xl mb-8 text-story-blue">
          Be the first to create enchanting personalized bedtime adventures that will 
          captivate your child's imagination and create lasting memories!
        </p>
        
        <Button 
          onClick={scrollToEmailSection} 
          className="h-16 px-8 rounded-xl bg-story-orange hover:bg-story-orange/90 text-white button-bounce text-xl flex items-center gap-2"
        >
          <Rocket className="h-6 w-6" />
          Join the Adventure Now!
        </Button>
      </div>
      
      <div ref={emailSectionRef} className="scroll-mt-32"></div>
    </div>
  );
};

export default WaitingListHero;
