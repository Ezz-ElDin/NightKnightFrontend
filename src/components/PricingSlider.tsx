
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PricingSlider = () => {
  const [storyCount, setStoryCount] = useState(1);
  
  const basePrice = 5.00;
  const discountedPrice = 2.50;
  const totalPrice = storyCount * discountedPrice;
  const savings = (storyCount * basePrice) - totalPrice;

  const features = [
    "Multilingual stories",
    "Lessons learned customisation", 
    "Characters customisation",
    "Multiple illustration styles",
    "Web reading experience",
    { text: "PDF download", comingSoon: true }
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Slide to select how many stories you want
        </h3>
      </div>

      <div className="mb-8">
        <div className="text-center mb-4">
          <span className="text-4xl font-bold text-story-purple">{storyCount}</span>
          <span className="text-xl text-gray-600 ml-2">
            story{storyCount > 1 ? 's' : ''} + 
          </span>
          <span className="text-xl font-bold text-green-500 ml-1">1 FREE</span>
        </div>
        
        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-story-purple">
            Total: {storyCount + 1} stories
          </p>
        </div>

        <div className="relative mb-6">
          <input
            type="range"
            min="1"
            max="10"
            value={storyCount}
            onChange={(e) => setStoryCount(parseInt(e.target.value))}
            className="w-full h-2 bg-story-seafoam rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>10</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-story-purple mb-2">
            £{totalPrice.toFixed(2)}
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-gray-400 line-through">
              £{(storyCount * basePrice).toFixed(2)} per story
            </span>
            <Badge className="bg-story-yellow text-story-orange px-2 py-1 text-xs">
              LIMITED TIME
            </Badge>
          </div>
          <p className="text-green-600 font-semibold">
            Now only £{discountedPrice.toFixed(2)} per story
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">
          What's included:
        </h4>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <div className="w-2 h-2 bg-story-purple rounded-full mr-3 flex-shrink-0"></div>
              {typeof feature === 'string' ? (
                <span className="text-gray-700">{feature}</span>
              ) : (
                <div className="flex items-center gap-2 w-full">
                  <span className="text-gray-700">{feature.text}</span>
                  {feature.comingSoon && (
                    <Badge 
                      variant="outline" 
                      className="text-[8px] px-1 py-0 bg-story-yellow/20 text-story-orange border-story-orange h-3 leading-none whitespace-nowrap ml-auto"
                    >
                      Coming Soon
                    </Badge>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <Button className="w-full bg-story-purple hover:bg-story-purple/90 text-white py-3 rounded-xl text-lg font-semibold">
        Get {storyCount + 1} Stories
      </Button>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #a093f4;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #a093f4;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default PricingSlider;
