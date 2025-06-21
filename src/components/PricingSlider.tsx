import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, Star } from 'lucide-react';

const PricingSlider = () => {
  const [storyCount, setStoryCount] = useState([1]);
  const [currency, setCurrency] = useState('$');
  const [currencySymbol, setCurrencySymbol] = useState('USD');

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

  // Calculate price per story
  const calculatePrice = (stories: number) => {
    const pricePerStory = currency === '£' ? 0.99 : 1.29;
    return stories * pricePerStory;
  };

  const currentPrice = calculatePrice(storyCount[0]);
  const isPlural = storyCount[0] > 1;

  return (
    <section className="py-16 px-4" id="pricing">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center text-story-purple">
          Choose Your Story Plan
        </h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
          Slide to select how many stories you want
        </p>
        
        <div className="max-w-2xl mx-auto">
          <div className="ghibli-card mb-8 relative overflow-hidden">
            {/* Magical background particles */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="dust-sprite w-1 h-1 top-1/4 left-1/4" style={{ animationDelay: '0s' }}></div>
              <div className="dust-sprite w-1.5 h-1.5 top-3/4 right-1/4" style={{ animationDelay: '2s' }}></div>
              <div className="dust-sprite w-1 h-1 top-1/2 right-1/3" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="text-center mb-8 relative z-10">
              <div className="mb-6 flex items-center justify-center gap-2">
                <span className="text-6xl font-bold text-story-purple animate-scale-pulse">
                  {storyCount[0]}
                </span>
                <span className="text-2xl text-gray-600 ml-2">
                  {isPlural ? 'stories' : 'story'}
                </span>
              </div>
              
              <div className="mb-8 relative">
                {/* Custom magical slider styling with unicorn thumb */}
                <div className="relative px-4">
                  <Slider
                    value={storyCount}
                    onValueChange={setStoryCount}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full unicorn-slider"
                  />
                  {/* Magical glow effect */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="w-full h-2 rounded-full bg-gradient-to-r from-story-purple/20 via-story-yellow/30 to-story-purple/20 blur-sm"></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-4 px-4">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-story-yellow" fill="currentColor" />
                    1
                  </span>
                  <span className="flex items-center gap-1">
                    10
                    <Sparkles className="h-3 w-3 text-story-purple" />
                  </span>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="text-5xl font-bold text-story-purple mb-2 animate-scale-pulse">
                  {currency}{currentPrice.toFixed(2)}
                </div>
                <p className="text-gray-600">
                  {currency}{(currentPrice / storyCount[0]).toFixed(2)} per story
                </p>
              </div>
            </div>
            
            <div className="mb-8 relative z-10">
              <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-story-purple" />
                What's included:
                <Sparkles className="h-5 w-5 text-story-purple" />
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-center group">
                  <div className="w-2 h-2 bg-story-purple rounded-full mr-3 group-hover:animate-bounce"></div>
                  <span>Multilingual stories</span>
                </li>
                <li className="flex items-center justify-center group">
                  <div className="w-2 h-2 bg-story-purple rounded-full mr-3 group-hover:animate-bounce"></div>
                  <span>Lessons learned customisation</span>
                </li>
                <li className="flex items-center justify-center group">
                  <div className="w-2 h-2 bg-story-purple rounded-full mr-3 group-hover:animate-bounce"></div>
                  <span>Characters customisation</span>
                </li>
                <li className="flex items-center justify-center group">
                  <div className="w-2 h-2 bg-story-purple rounded-full mr-3 group-hover:animate-bounce"></div>
                  <span>Multiple illustration styles</span>
                </li>
                <li className="flex items-center justify-center group">
                  <div className="w-2 h-2 bg-story-purple rounded-full mr-3 group-hover:animate-bounce"></div>
                  <span>Web reading experience</span>
                </li>
                <li className="flex items-center justify-center group">
                  <div className="w-2 h-2 bg-story-purple rounded-full mr-3 group-hover:animate-bounce"></div>
                  <span>PDF download</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center relative z-10">
              <Link to="/register">
                <Button 
                  className="w-full h-12 rounded-xl button-bounce bg-gradient-to-r from-story-purple to-story-blue text-white hover:from-story-purple/90 hover:to-story-blue/90 shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Star className="h-4 w-4" fill="currentColor" />
                  Get {isPlural ? 'Stories' : 'Story'}
                  <Sparkles className="h-4 w-4" />
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
