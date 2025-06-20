
import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PricingSlider = () => {
  const [storyCount, setStoryCount] = useState([10]);
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

  // Calculate price based on story count
  const calculatePrice = (stories: number) => {
    if (stories <= 3) return 0; // Free tier
    
    // Pricing tiers
    let basePrice;
    if (currency === '£') {
      if (stories <= 10) basePrice = 2.99;
      else if (stories <= 25) basePrice = 4.99;
      else if (stories <= 50) basePrice = 7.99;
      else if (stories <= 100) basePrice = 12.99;
      else basePrice = 19.99;
    } else {
      if (stories <= 10) basePrice = 3.99;
      else if (stories <= 25) basePrice = 6.99;
      else if (stories <= 50) basePrice = 9.99;
      else if (stories <= 100) basePrice = 15.99;
      else basePrice = 24.99;
    }
    
    return basePrice;
  };

  const currentPrice = calculatePrice(storyCount[0]);
  const isFreeTier = currentPrice === 0;

  return (
    <section className="py-16 px-4" id="pricing">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center text-story-purple">
          Choose Your Story Plan
        </h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
          Slide to select how many stories you need per month
        </p>
        
        <div className="max-w-2xl mx-auto">
          <div className="ghibli-card mb-8">
            <div className="text-center mb-8">
              <div className="mb-6">
                <span className="text-6xl font-bold text-story-purple">
                  {storyCount[0]}
                </span>
                <span className="text-2xl text-gray-600 ml-2">
                  {storyCount[0] === 1 ? 'story' : 'stories'} per month
                </span>
              </div>
              
              <div className="mb-8">
                <Slider
                  value={storyCount}
                  onValueChange={setStoryCount}
                  max={150}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>1</span>
                  <span>150</span>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="text-5xl font-bold text-story-purple mb-2">
                  {isFreeTier ? 'Free' : `${currency}${currentPrice.toFixed(2)}`}
                  {!isFreeTier && (
                    <span className="text-xl text-gray-600 ml-2">per month</span>
                  )}
                </div>
                {isFreeTier && (
                  <p className="text-gray-600">Up to 3 stories per month</p>
                )}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">What's included:</h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-story-purple rounded-full mr-3"></div>
                  <span>{isFreeTier ? 'Basic customisation' : 'Advanced customisation'}</span>
                </li>
                <li className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-story-purple rounded-full mr-3"></div>
                  <span>Web reading experience</span>
                </li>
                {!isFreeTier && (
                  <>
                    <li className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-story-purple rounded-full mr-3"></div>
                      <span>PDF downloads</span>
                    </li>
                    <li className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-story-purple rounded-full mr-3"></div>
                      <span>Multiple child profiles</span>
                    </li>
                    <li className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-story-purple rounded-full mr-3"></div>
                      <span>Multiple languages</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
            
            <div className="text-center">
              <Link to="/register">
                <Button 
                  className="w-full h-12 rounded-xl button-bounce bg-story-purple text-white hover:bg-story-purple/90"
                >
                  {isFreeTier ? 'Get Started Free' : 'Start 7-Day Free Trial'}
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
