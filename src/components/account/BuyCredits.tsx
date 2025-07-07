
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Star, CreditCard } from "lucide-react";
import { stripeApi } from "@/lib/api";
import { toast } from "sonner";

const BuyCredits = () => {
  const [creditCount, setCreditCount] = useState([1]);
  const [currency, setCurrency] = useState('$');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Detect user location for currency - same logic as PricingSlider
  useEffect(() => {
    const detectLocation = async () => {
      try {
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
        } else {
          setCurrency('$');
        }
      } catch (error) {
        setCurrency('$');
      }
    };

    detectLocation();
  }, []);
  
  // Calculate price per credit
  const calculatePrice = (credits: number) => {
    const pricePerCredit = currency === '£' ? 4.99 : 6.49;
    return credits * pricePerCredit;
  };

  const currentPrice = calculatePrice(creditCount[0]);
  const totalStories = creditCount[0];
  const isPlural = totalStories > 1;

  const handlePurchase = async () => {
    setIsProcessing(true);
    try {
      console.log(`Purchasing ${creditCount[0]} credits for ${currency}${currentPrice.toFixed(2)}`);
      
      const response = await stripeApi.createCheckout({
        quantity: creditCount[0]
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
      console.error('Purchase error:', error);
      toast.error('There was an error processing your request. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-story-purple mb-2">Buy Story Credits</h3>
        <p className="text-gray-600">Purchase credits to create more magical bedtime stories</p>
      </div>

      <Card className="p-6">
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-6xl font-bold text-story-purple">
                {creditCount[0]}
              </span>
              <span className="text-2xl text-gray-600">
                {creditCount[0] > 1 ? 'stories' : 'story'}
              </span>
            </div>
            <div className="bg-gradient-to-r from-story-yellow/20 to-story-green/20 rounded-full px-4 py-2 inline-block">
              <p className="text-lg font-semibold text-story-purple">
                Total: {totalStories} {isPlural ? 'stories' : 'story'}
              </p>
            </div>
          </div>
          
          <div className="mb-8 max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of credits: {creditCount[0]}
            </label>
            <Slider
              value={creditCount}
              onValueChange={setCreditCount}
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
            <p className="text-story-green font-bold text-lg">
              {currency}{(currency === '£' ? 4.99 : 6.49).toFixed(2)} per story
            </p>
          </div>
        </div>
        
        <div className="mb-8">
          <h4 className="text-xl font-bold mb-4 text-center">What's included:</h4>
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
          <Button 
            onClick={handlePurchase}
            disabled={isProcessing}
            className="w-full h-12 rounded-xl button-bounce bg-story-purple text-white hover:bg-story-purple/90 gap-2"
          >
            <CreditCard className="h-5 w-5" />
            {isProcessing ? 'Processing...' : `Get ${totalStories} ${isPlural ? 'Stories' : 'Story'}`}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BuyCredits;
