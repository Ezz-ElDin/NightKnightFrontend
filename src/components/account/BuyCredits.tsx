
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Star, CreditCard } from "lucide-react";

const BuyCredits = () => {
  const [creditCount, setCreditCount] = useState([5]);
  
  // Calculate price per credit with bulk discounts
  const calculatePrice = (credits: number) => {
    const basePrice = 2.50; // £2.50 per credit
    if (credits >= 20) return credits * 2.00; // 20% discount for 20+ credits
    if (credits >= 10) return credits * 2.25; // 10% discount for 10+ credits
    return credits * basePrice;
  };

  const currentPrice = calculatePrice(creditCount[0]);
  const savings = (creditCount[0] * 2.50) - currentPrice;

  const handlePurchase = () => {
    // This would integrate with Stripe checkout
    console.log(`Purchasing ${creditCount[0]} credits for £${currentPrice.toFixed(2)}`);
    // Redirect to Stripe checkout would happen here
    alert(`Redirecting to checkout for ${creditCount[0]} credits (£${currentPrice.toFixed(2)})`);
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
              <Star className="h-8 w-8 text-story-yellow" fill="currentColor" />
              <span className="text-6xl font-bold text-story-purple">
                {creditCount[0]}
              </span>
              <span className="text-2xl text-gray-600">
                {creditCount[0] > 1 ? 'credits' : 'credit'}
              </span>
            </div>
            <div className="bg-gradient-to-r from-story-yellow/20 to-story-green/20 rounded-full px-4 py-2 inline-block">
              <p className="text-lg font-semibold text-story-purple">
                {creditCount[0]} {creditCount[0] > 1 ? 'stories' : 'story'} to create
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
              max={50}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
          
          <div className="mb-8">
            <div className="text-5xl font-bold text-story-purple mb-2">
              £{currentPrice.toFixed(2)}
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-gray-400 text-lg">
                £{(2.50 * creditCount[0]).toFixed(2)} regular price
              </span>
              {savings > 0 && (
                <Badge className="bg-story-yellow text-story-orange">
                  Save £{savings.toFixed(2)}
                </Badge>
              )}
            </div>
            <p className="text-story-green font-bold text-lg">
              £{(currentPrice / creditCount[0]).toFixed(2)} per credit
            </p>
          </div>
        </div>
        
        <div className="mb-8">
          <h4 className="text-xl font-bold mb-4 text-center">Bulk Discounts Available:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-story-lightPurple/20">
              <div className="font-bold text-story-purple">1-9 Credits</div>
              <div className="text-sm text-gray-600">£2.50 per credit</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-story-seafoam/20">
              <div className="font-bold text-story-purple">10-19 Credits</div>
              <div className="text-sm text-gray-600">£2.25 per credit</div>
              <Badge variant="outline" className="mt-1 text-xs">10% OFF</Badge>
            </div>
            <div className="text-center p-4 rounded-lg bg-story-yellow/20">
              <div className="font-bold text-story-purple">20+ Credits</div>
              <div className="text-sm text-gray-600">£2.00 per credit</div>
              <Badge variant="outline" className="mt-1 text-xs">20% OFF</Badge>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Button 
            onClick={handlePurchase}
            className="w-full h-12 rounded-xl button-bounce bg-story-purple text-white hover:bg-story-purple/90 gap-2"
          >
            <CreditCard className="h-5 w-5" />
            Purchase {creditCount[0]} {creditCount[0] > 1 ? 'Credits' : 'Credit'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BuyCredits;
