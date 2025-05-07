
import React, { RefObject } from 'react';
import { Book, Sword } from 'lucide-react';

interface WaitingListHeroProps {
  emailSectionRef: RefObject<HTMLDivElement>;
}

const WaitingListHero = ({ emailSectionRef }: WaitingListHeroProps) => {
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
      
      <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
        Our storytelling platform is launching soon! Join our waiting list to be the first to know.
      </p>
      
      <div ref={emailSectionRef} className="scroll-mt-32"></div>
    </div>
  );
};

export default WaitingListHero;
