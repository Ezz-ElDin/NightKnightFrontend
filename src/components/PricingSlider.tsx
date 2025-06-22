
import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Gift, Star } from 'lucide-react';

const PricingSlider = () => {
  const [storyCount, setStoryCount] = useState([1]);
  const [currency, setCurrency] = useState('£');
  const [currencySymbol, setCurrencySymbol] = useState('GBP');

  // Detect user location for currency
  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Try to get user's timezone to determine location
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const europeanTimezones = [
          'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Madrid',
          'Europe/Rome', 'Europe/Amsterdam', 'Europe/Vienna', 'Europe/Brussels',
          'Europe/Copenhagen', 'Europe/Dublin', 'Europe/Helsinki', 'Europe/Lisbon',
          'Europe/Luxembourg', 'Europe/Prague', 'Europe/Stockholm', 'Europe/Warsaw',
          'Europe/Athens', 'Europe/Budapest', 'Europe/Bucharest', 'Europe/Sofia',
          'Europe/Zagreb', 'Europe/Ljubljana', 'Europe/Bratislava', 'Europe/Tallinn',
          'Europe/Riga', 'Europe/Vilnius', 'Europe/Malta', 'Europe/Nicosia'
        ];
        
        if (europeanTimezones.some(tz => timezone.includes(tz.split('/')[1]))) {
          setCurrency('£');
          setCurrencySymbol('GBP');
        } else {
          setCurrency('$');
          setCurrencySymbol('USD');
        }
      } catch (error) {
        // Default to USD if detection fails
        setCurrency('$');
        setCurrencySymbol('USD');
      }
    };

    detectLocation();
  }, []);

  // Calculate price per story based on tier
  const getPricePerStory = (stories: number) => {
    const basePrice = currency === '£' ? 1 : 1.30; // Base multiplier for USD
    
    if (stories >= 1 && stories <= 3) {
      return currency === '£' ? 2.00 : 2.60;
    } else if (stories >= 4 && stories <= 6) {
      return currency === '£' ? 1.50 : 1.95;
    } else if (stories >= 7 && stories <= 10) {
      return currency === '£' ? 1.30 : 1.69;
    }
    return currency === '£' ? 2.00 : 2.60;
  };

  // Calculate total stories including free bonus
  const getTotalStories = (purchased: number) => {
    if (purchased === 3) return 4; // Get 1 free
    if (purchased === 6) return 7; // Get 1 free
    return purchased;
  };

  // Get free stories count
  const getFreeStories = (purchased: number) => {
    if (purchased === 3 || purchased === 6) return 1;
    return 0;
  };

  const purchasedStories = storyCount[0];
  const totalStories = getTotalStories(purchasedStories);
  const freeStories = getFreeStories(purchasedStories);
  const pricePerStory = getPricePerStory(purchasedStories);
  const totalPrice = purchasedStories * pricePerStory;
  const isPlural = totalStories > 1;

  // Get tier information for display
  const getTierInfo = (stories: number) => {
    if (stories >= 1 && stories <= 3) {
      return { tier: "Starter", color: "text-story-blue", bgColor: "bg-story-blue/10" };
    } else if (stories >= 4 && stories <= 6) {
      return { tier: "Family", color: "text-story-purple", bgColor: "bg-story-purple/10" };
    } else if (stories >= 7 && stories <= 10) {
      return { tier: "Premium", color: "text-story-teal", bgColor: "bg-story-teal/10" };
    }
    return { tier: "Starter", color: "text-story-blue", bgColor: "bg-story-blue/10" };
  };

  const tierInfo = getTierInfo(purchasedStories);

  return (
    <section className="py-16 px-4" id="pricing">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center text-story-purple">
          Choose Your Story Plan
        </h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
          Slide to select how many stories you want - get bonus stories at special tiers!
        </p>
        
        <div className="max-w-lg mx-auto">
          <div className="ghibli-card mb-8 relative overflow-hidden">
            {/* Tier Badge */}
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full ${tierInfo.bgColor} ${tierInfo.color} text-sm font-semibold`}>
              {tierInfo.tier} Tier
            </div>

            <div className="text-center mb-8 pt-4">
              {/* Story Count Display */}
              <div className="mb-6 relative">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-6xl font-bold text-story-purple">
                    {totalStories}
                  </span>
                  <span className="text-2xl text-gray-600">
                    {isPlural ? 'stories' : 'story'}
                  </span>
                  {freeStories > 0 && (
                    <div className="ml-2 flex items-center gap-1 bg-story-yellow px-2 py-1 rounded-full animate-bounce-slow">
                      <Gift className="h-4 w-4 text-story-orange" />
                      <span className="text-story-orange font-bold text-sm">+{freeStories} FREE!</span>
                    </div>
                  )}
                </div>
                
                {/* Breakdown */}
                {freeStories > 0 && (
                  <div className="text-sm text-gray-600 mb-4">
                    <span className="bg-green-50 px-2 py-1 rounded-md border border-green-200">
                      {purchasedStories} purchased + {freeStories} bonus = {totalStories} total
                    </span>
                  </div>
                )}
              </div>
              
              {/* Slider */}
              <div className="mb-8 max-w-md mx-auto">
                <Slider
                  value={storyCount}
                  onValueChange={setStoryCount}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>
              
              {/* Pricing Display */}
              <div className="mb-6 p-4 bg-gradient-to-r from-story-lightPurple/30 to-story-seafoam/30 rounded-xl border border-story-purple/20">
                <div className="text-4xl font-bold text-story-purple mb-2">
                  {currency}{totalPrice.toFixed(2)}
                </div>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <span className="bg-white px-2 py-1 rounded-md border">
                    {currency}{pricePerStory.toFixed(2)} per story
                  </span>
                  {totalStories > purchasedStories && (
                    <span className="bg-story-yellow/20 text-story-orange px-2 py-1 rounded-md border border-story-yellow">
                      Effective: {currency}{(totalPrice / totalStories).toFixed(2)} per story
                    </span>
                  )}
                </div>
              </div>

              {/* Pricing Tiers Information */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
                  <Star className="h-4 w-4 text-story-yellow" fill="currentColor" />
                  Pricing Tiers
                </h4>
                <div className="space-y-2 text-sm">
                  <div className={`flex justify-between p-2 rounded-md ${purchasedStories >= 1 && purchasedStories <= 3 ? 'bg-story-blue/10 border border-story-blue/30' : 'bg-white'}`}>
                    <span>1-3 stories</span>
                    <span className="font-semibold">{currency}2.00 each</span>
                  </div>
                  <div className={`flex justify-between p-2 rounded-md ${purchasedStories >= 4 && purchasedStories <= 6 ? 'bg-story-purple/10 border border-story-purple/30' : 'bg-white'}`}>
                    <span>4-6 stories</span>
                    <span className="font-semibold">{currency}1.50 each</span>
                  </div>
                  <div className={`flex justify-between p-2 rounded-md ${purchasedStories >= 7 && purchasedStories <= 10 ? 'bg-story-teal/10 border border-story-teal/30' : 'bg-white'}`}>
                    <span>7-10 stories</span>
                    <span className="font-semibold">{currency}1.30 each</span>
                  </div>
                </div>
                
                {/* Special Offers */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-600 mb-2 font-semibold">🎁 Special Offers:</div>
                  <div className="space-y-1 text-xs">
                    <div className={`flex justify-between ${purchasedStories === 3 ? 'text-story-orange font-bold' : 'text-gray-500'}`}>
                      <span>Buy 3 stories</span>
                      <span>Get 1 FREE!</span>
                    </div>
                    <div className={`flex justify-between ${purchasedStories === 6 ? 'text-story-orange font-bold' : 'text-gray-500'}`}>
                      <span>Buy 6 stories</span>
                      <span>Get 1 FREE!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">What's included:</h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-story-purple rounded-full mr-3"></div>
                  <span>Multilingual stories</span>
                </li>
                <li className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-story-purple rounded-full mr-3"></div>
                  <span>Lessons learned customisation</span>
                </li>
                <li className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-story-purple rounded-full mr-3"></div>
                  <span>Characters customisation</span>
                </li>
                <li className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-story-purple rounded-full mr-3"></div>
                  <span>Multiple illustration styles</span>
                </li>
                <li className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-story-purple rounded-full mr-3"></div>
                  <span>Web reading experience</span>
                </li>
                <li className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-story-purple rounded-full mr-3"></div>
                  <span>PDF download</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <Link to="/register">
                <Button 
                  className="w-full h-12 rounded-xl button-bounce bg-story-purple text-white hover:bg-story-purple/90 relative overflow-hidden"
                >
                  <span className="relative z-10">
                    Get {totalStories} {isPlural ? 'Stories' : 'Story'}
                    {freeStories > 0 && (
                      <span className="ml-2 text-story-yellow">
                        (includes {freeStories} bonus!)
                      </span>
                    )}
                  </span>
                  {freeStories > 0 && (
                    <div className="absolute inset-0 bg-gradient-to-r from-story-yellow/20 to-story-orange/20 animate-pulse"></div>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSlider;
