
import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { stripeApi } from '@/lib/api';
import { toast } from 'sonner';

const PricingSlider = () => {
  const [storyCount, setStoryCount] = useState([1]);
  const [currency, setCurrency] = useState('$');
  const [currencySymbol, setCurrencySymbol] = useState('USD');
  const [isProcessing, setIsProcessing] = useState(false);

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem('authToken');

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
    const pricePerStory = currency === '£' ? 2.50 : 3.25;
    return stories * pricePerStory;
  };

  const handleDirectCheckout = async () => {
    if (!isLoggedIn) {
      toast.error('Please log in to purchase stories');
      return;
    }

    setIsProcessing(true);
    try {
      console.log(`Creating checkout for ${storyCount[0]} stories`);
      
      const response = await stripeApi.createCheckout({
        quantity: storyCount[0]
      });

      if (response.success && response.data.location) {
        console.log('Redirecting to Stripe checkout:', response.data.location);
        toast.success('Redirecting to checkout...');
        
        // Redirect to Stripe checkout
        window.location.href = response.data.location;
      } else {
        throw new Error('Invalid response from checkout API');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('There was an error processing your request. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const currentPrice = calculatePrice(storyCount[0]);
  const totalStories = storyCount[0] + 1; // Adding 1 free story
  const isPlural = totalStories > 1;

  return (
    <section className="py-16 px-4" id="pricing">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center text-story-purple">
          Choose Your Story Plan
        </h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
          Slide to select how many stories you want
        </p>
        
        <div className="max-w-lg mx-auto">
          <div className="ghibli-card mb-8">
            <div className="text-center mb-8">
              <div className="mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-6xl font-bold text-story-purple">
                    {storyCount[0]}
                  </span>
                  <span className="text-2xl text-gray-600">
                    {storyCount[0] > 1 ? 'stories' : 'story'}
                  </span>
                  <span className="text-3xl font-bold text-story-green">+ 1 FREE</span>
                </div>
                <div className="bg-gradient-to-r from-story-yellow/20 to-story-green/20 rounded-full px-4 py-2 inline-block">
                  <p className="text-lg font-semibold text-story-purple">
                    Total: {totalStories} {isPlural ? 'stories' : 'story'}
                  </p>
                </div>
              </div>
              
              <div className="mb-8 max-w-md mx-auto">
                <Slider
                  value={storyCount}
                  onValueChange={setStoryCount}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="mb-8">
                <div className="text-5xl font-bold text-story-purple mb-2">
                  {currency}{currentPrice.toFixed(2)}
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-gray-400 line-through text-lg">
                    {currency}5.00 per story
                  </span>
                  <span className="bg-story-yellow text-story-orange px-2 py-1 rounded-full text-sm font-bold">
                    LIMITED TIME
                  </span>
                </div>
                <p className="text-story-green font-bold text-lg">
                  Now only {currency}2.50 per story
                </p>
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
              </ul>
            </div>
            
            <div className="text-center">
              {isLoggedIn ? (
                <Button 
                  onClick={handleDirectCheckout}
                  disabled={isProcessing}
                  className="w-full h-12 rounded-xl button-bounce bg-story-purple text-white hover:bg-story-purple/90"
                >
                  {isProcessing ? 'Processing...' : `Get ${totalStories} ${isPlural ? 'Stories' : 'Story'}`}
                </Button>
              ) : (
                <Link to="/register">
                  <Button 
                    className="w-full h-12 rounded-xl button-bounce bg-story-purple text-white hover:bg-story-purple/90"
                  >
                    Get {totalStories} {isPlural ? 'Stories' : 'Story'}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSlider;
