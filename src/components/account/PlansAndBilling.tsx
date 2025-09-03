import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Check, Sparkles, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { creditApi } from "@/lib/api";

interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  isOneTime?: boolean;
  imagePath: string;
}

const PlansAndBilling = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch user credit information
  const { data: creditData, isLoading: isLoadingCredits, error: creditError } = useQuery({
    queryKey: ['userCredits'],
    queryFn: async () => {
      const response = await creditApi.get();
      return response.data;
    },
  });

  // Mock current subscription - in real implementation, this would come from Stripe/Supabase
  useEffect(() => {
    // TODO: Replace with actual subscription check
    setCurrentPlan('popular'); // Mock: user has Story Sprout plan
  }, []);

  const subscriptionPlans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Dream Drifter',
      monthlyPrice: '£8.49',
      annualPrice: '£19.99',
      description: 'Drift through the week with 6 enchanting stories, a perfect blend of spontaneity and routine for magical nights together.',
      features: [
        '1 personalized story per month',
        'Multiple languages',
        'Custom characters',
        'Beautiful illustrations',
        'Web reading experience'
      ],
      imagePath: '/images/dream-drifter.png'
    },
    {
      id: 'popular',
      name: 'Story Sprout',
      monthlyPrice: '£6.49',
      annualPrice: '£64.99',
      description: 'A gentle introduction to magical bedtime moments, receive 4 personalised stories each month to spark your child\'s imagination.',
      features: [
        '4 personalized stories per month',
        'Multiple languages',
        'Custom characters',
        'Beautiful illustrations',
        'Web reading experience',
        'Priority support'
      ],
      isPopular: true,
      imagePath: '/images/story-sprout.png'
    },
    {
      id: 'premium',
      name: 'Starlight Stories',
      monthlyPrice: '£11.49',
      annualPrice: '£124.99',
      description: 'Light up bedtime twice a week with 8 charming, personalised tales, designed to inspire wonder and sweet dreams.',
      features: [
        '8 personalized stories per month',
        'Multiple languages',
        'Custom characters',
        'Beautiful illustrations',
        'Web reading experience',
        'Priority support',
        'Advanced customization'
      ],
      imagePath: '/images/starlight-stories.png'
    }
  ];

  const oneTimePlan: PricingPlan = {
    id: 'single-story',
    name: 'Single Story',
    monthlyPrice: '£1.99',
    annualPrice: '£1.99',
    description: 'Enjoy a beautifully personalised, one-off bedtime story, ideal for special moments or to explore the magic before subscribing.',
    features: [
      '1 personalized story',
      'Multiple languages',
      'Custom characters',
      'Beautiful illustrations',
      'Web reading experience',
      'No recurring charges'
    ],
    isOneTime: true,
    imagePath: '/images/single-story.png'
  };

  const getButtonText = (planId: string) => {
    if (planId === currentPlan) return 'Current Plan';
    if (!currentPlan || currentPlan === 'single-story') return 'Upgrade';
    
    const currentPlanIndex = subscriptionPlans.findIndex(p => p.id === currentPlan);
    const targetPlanIndex = subscriptionPlans.findIndex(p => p.id === planId);
    
    if (targetPlanIndex > currentPlanIndex) return 'Upgrade';
    if (targetPlanIndex < currentPlanIndex) return 'Downgrade';
    return 'Switch Plan';
  };

  const handlePlanAction = (planId: string) => {
    if (planId === currentPlan) return;
    
    // TODO: Implement actual plan change logic
    toast({
      title: "Plan Change",
      description: `Switching to ${subscriptionPlans.find(p => p.id === planId)?.name || 'new plan'}...`,
    });
  };

  const handleSingleStoryPurchase = () => {
    // TODO: Implement single story purchase logic
    toast({
      title: "Purchase",
      description: "Purchasing single story...",
    });
  };

  const handleManagePlan = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please log in to manage your plan.",
          variant: "destructive"
        });
        return;
      }

      const response = await fetch('/api/stripe/portal/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }

      const data = await response.json();
      if (data.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No portal URL received');
      }
    } catch (error) {
      console.error('Error creating portal session:', error);
      toast({
        title: "Error",
        description: "Failed to open subscription management portal. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (isLoadingCredits) {
    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <CreditCard className="h-6 w-6" />
          Plans and Billing
        </h2>
        <Card className="p-6">
          <div className="text-center py-8">
            <p>Loading billing information...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
        <CreditCard className="h-6 w-6" />
        Plans and Billing
      </h2>

      {/* Current Credits */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="relative p-6">
          <h3 className="text-lg font-semibold text-primary mb-6">Story Credits</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* Credits Remaining - Prominent */}
            <div className="md:col-span-2 flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">
                  {creditData?.remaining_credit || 0}
                </p>
                <p className="text-sm text-muted-foreground">Credits remaining</p>
              </div>
            </div>

            {/* Created Stories */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg">
                <Sparkles className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{creditData?.created_stories || 0}</p>
                <p className="text-xs text-muted-foreground">Story created</p>
              </div>
            </div>

            {/* Purchased Stories */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{creditData?.purchased_stories || 0}</p>
                <p className="text-xs text-muted-foreground">Purchased</p>
              </div>
            </div>
          </div>
          
          {/* Manage Plan Button */}
          <div className="flex justify-end mt-6">
            <Button
              onClick={() => toast({ title: "Manage Plan", description: "Redirecting to plan management..." })}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium"
            >
              Manage Plan
            </Button>
          </div>
        </div>
      </Card>


      {/* Subscription Plans */}
      <div>
        <h3 className="text-xl font-bold mb-6">Subscription Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative p-6 transition-all duration-300 hover:shadow-lg ${
                plan.id === currentPlan 
                  ? 'ring-2 ring-story-purple border-story-purple' 
                  : plan.isPopular 
                    ? 'border-story-purple/50' 
                    : 'border-gray-200'
              }`}
            >
              {plan.id === currentPlan && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-story-purple text-white">
                    Current Plan
                  </Badge>
                </div>
              )}
              
              {plan.isPopular && plan.id !== currentPlan && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-story-purple text-white">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className="flex justify-center mb-4">
                <img 
                  src={plan.imagePath} 
                  alt={`${plan.name} plan`}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>
              
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
                <div className="text-3xl font-bold text-story-purple mb-2">
                  {plan.monthlyPrice}
                  <span className="text-sm text-gray-500 font-normal">
                    /month
                  </span>
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </div>

              

              <Button
                onClick={() => handlePlanAction(plan.id)}
                disabled={plan.id === currentPlan}
                className={`w-full ${
                  plan.id === currentPlan
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-story-purple hover:bg-story-purple/90 text-white'
                }`}
              >
                {getButtonText(plan.id)}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* One-Time Purchase */}
      <div>
        <h3 className="text-xl font-bold mb-6 text-story-orange">One-Time Purchase</h3>
        <Card className="p-6 border-story-orange">
          <div className="flex items-center gap-6">
            <img 
              src={oneTimePlan.imagePath} 
              alt={`${oneTimePlan.name} plan`}
              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
            />
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-xl font-bold">{oneTimePlan.name}</h4>
                <Badge className="bg-story-orange text-white">One-Time</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-4">{oneTimePlan.description}</p>
              <div className="text-2xl font-bold text-story-orange">
                {oneTimePlan.monthlyPrice}
                <span className="text-sm text-gray-500 font-normal">/story</span>
              </div>
            </div>
            
            <Button
              onClick={handleSingleStoryPurchase}
              className="bg-story-orange hover:bg-story-orange/90 text-white px-8"
            >
              Purchase
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PlansAndBilling;
