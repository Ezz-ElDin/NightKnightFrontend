import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

interface ArabicSampleTexts {
  title: string;
  description: string;
  genre: string;
  language: string;
}

interface WaitingListStorySamplesProps {
  arabicSampleTexts: ArabicSampleTexts;
  scrollToEmailSection: () => void;
}

const WaitingListStorySamples = ({ arabicSampleTexts, scrollToEmailSection }: WaitingListStorySamplesProps) => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-story-pink/20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10 text-story-purple">Sample Stories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card-kiddy">
            <div className="text-left">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-xl font-bold">The Forest Whispers</h3>
                <span className="text-xs font-medium bg-story-green/20 text-story-forest px-2 py-1 rounded-full">Fantasy</span>
              </div>
              <p className="text-sm text-gray-500 mb-3">English</p>
              <p className="mb-6">
                Emma and her dog Rusty were exploring the ancient forest behind their new home when they heard a strange whisper coming from the tallest oak tree. "Who's there?" Emma called out. To her surprise, the tree began to glow with tiny blue lights...
              </p>
              <div className="flex justify-end">
                <Button variant="outline" className="text-story-blue border-story-blue hover:bg-story-blue/10">
                  Continue Reading
                </Button>
              </div>
            </div>
          </div>
          
          <div className="card-kiddy">
            <div className="text-left">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-xl font-bold">Le Petit Astronaute</h3>
                <span className="text-xs font-medium bg-story-blue/20 text-story-blue px-2 py-1 rounded-full">Adventure</span>
              </div>
              <p className="text-sm text-gray-500 mb-3">French</p>
              <p className="mb-6">
                Luc a toujours rêvé de voyager dans l'espace. Un jour, il construisit une fusée avec des boîtes en carton. "Ce n'est pas une vraie fusée," dit sa sœur. Mais cette nuit-là, alors que tout le monde dormait, la fusée en carton commença à briller...
              </p>
              <div className="flex justify-end">
                <Button variant="outline" className="text-story-blue border-story-blue hover:bg-story-blue/10">
                  Continue Reading
                </Button>
              </div>
            </div>
          </div>
          
          <div className="card-kiddy">
            <div className="text-right" dir="rtl">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium bg-story-orange/20 text-story-orange px-2 py-1 rounded-full">{arabicSampleTexts.genre}</span>
                <h3 className="text-xl font-bold">{arabicSampleTexts.title}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-3">{arabicSampleTexts.language}</p>
              <p className="mb-6">
                {arabicSampleTexts.description}
              </p>
              <div className="flex justify-start">
                <Button variant="outline" className="text-story-blue border-story-blue hover:bg-story-blue/10">
                  متابعة القراءة
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Call to Action at bottom of page */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-story-purple">
            Join our waiting list to create your own magical stories!
          </h3>
          <Button 
            onClick={scrollToEmailSection} 
            className="h-14 px-8 rounded-xl bg-story-purple hover:bg-story-purple/90 text-white button-bounce text-lg"
          >
            Join the waiting list <ArrowUp className="ml-2 h-5 w-5 rotate-180" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WaitingListStorySamples;
