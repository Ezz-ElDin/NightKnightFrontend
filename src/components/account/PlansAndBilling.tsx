import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Check, Sparkles, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { creditApi, api } from "@/lib/api";

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
  const [stripePortalUrl, setStripePortalUrl] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch user credit information
  const { data: creditData, isLoading: isLoadingCredits, error: creditError } = useQuery({
    queryKey: ['userCredits'],
    queryFn: async () => {
      const response = await creditApi.get();
      return response.data;
    },
  });

  // Fetch Stripe portal URL on component load
  const { data: portalData, isLoading: isLoadingPortal } = useQuery({
    queryKey: ['stripePortal'],
    queryFn: async () => {
      const response = await api.post('/api/stripe/portal/');
      return response.data;
    },
  });

  // Fetch user's current subscription plan
  const { data: subscriptionData, isLoading: isLoadingSubscription } = useQuery({
    queryKey: ['userSubscription'],
    queryFn: async () => {
      const response = await api.get('/api/user/subscription/');
      return response.data;
    },
  });

  // Fetch checkout URLs for subscription plans
  const { data: dreamDrifterCheckout } = useQuery({
    queryKey: ['checkout', 'dream-drifter-monthly'],
    queryFn: async () => {
      const response = await api.post('/api/stripe/checkout/', {
        plan: 'dream-drifter-monthly'
      });
      return response.data;
    },
  });

  const { data: storySproutCheckout } = useQuery({
    queryKey: ['checkout', 'story-sprout-monthly'],
    queryFn: async () => {
      const response = await api.post('/api/stripe/checkout/', {
        plan: 'story-sprout-monthly'
      });
      return response.data;
    },
  });

  const { data: starlightCheckout } = useQuery({
    queryKey: ['checkout', 'starlight-stories-monthly'],
    queryFn: async () => {
      const response = await api.post('/api/stripe/checkout/', {
        plan: 'starlight-stories-monthly'
      });
      return response.data;
    },
  });

  // Fetch single story checkout URL on component load
  const { data: checkoutData, isLoading: isLoadingCheckout } = useQuery({
    queryKey: ['singleStoryCheckout'],
    queryFn: async () => {
      const response = await api.post('/api/stripe/checkout/', {
        plan: "one-time-story"
      });
      return response.data;
    },
  });

  // Set the portal URL when data is loaded
  useEffect(() => {
    if (portalData?.url) {
      setStripePortalUrl(portalData.url);
    }
  }, [portalData]);

  // Map plan names to plan IDs and set current plan
  const mapPlanNameToPlanId = (planName: string): string | null => {
    const planMapping: { [key: string]: string } = {
      'story-sprout-monthly': 'popular',
      'dream-drifter-monthly': 'starter', 
      'starlight-stories-monthly': 'premium'
    };
    return planMapping[planName] || null;
  };

  // Set current plan based on subscription data
  useEffect(() => {
    if (subscriptionData?.plan && subscriptionData?.status === 'active') {
      const mappedPlanId = mapPlanNameToPlanId(subscriptionData.plan);
      setCurrentPlan(mappedPlanId);
    } else {
      setCurrentPlan(null);
    }
  }, [subscriptionData]);

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
    
    // Price hierarchy: Story Sprout (cheapest) -> Dream Drifter -> Starlight Stories (most expensive)
    const priceHierarchy = ['popular', 'starter', 'premium']; // popular=Story Sprout, starter=Dream Drifter, premium=Starlight Stories
    
    const currentPlanIndex = priceHierarchy.indexOf(currentPlan);
    const targetPlanIndex = priceHierarchy.indexOf(planId);
    
    if (targetPlanIndex > currentPlanIndex) return 'Upgrade';
    if (targetPlanIndex < currentPlanIndex) return 'Downgrade';
    return 'Switch Plan';
  };

  const getCheckoutData = (planId: string) => {
    switch (planId) {
      case 'starter':
        return dreamDrifterCheckout;
      case 'popular':
        return storySproutCheckout;
      case 'premium':
        return starlightCheckout;
      default:
        return null;
    }
  };

  const handlePlanAction = (planId: string) => {
    if (planId === currentPlan) return;
    
    // Get the checkout URL for the selected plan
    const checkoutData = getCheckoutData(planId);
    if (checkoutData?.data?.location) {
      // Open Stripe checkout in a new tab
      window.open(checkoutData.data.location, '_blank');
    } else {
      toast({
        title: "Error",
        description: "Unable to load checkout. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSingleStoryPurchase = () => {
    if (checkoutData?.data?.location) {
      window.open(checkoutData.data.location, '_blank');
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
                disabled={plan.id === currentPlan || !getCheckoutData(plan.id)?.data?.location}
                className={`w-full ${
                  plan.id === currentPlan
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-story-purple hover:bg-story-purple/90 text-white'
                }`}
              >
                {getButtonText(plan.id)}
              </Button>

            </Card>
          ))}
        </div>
        
        {/* Manage All Plans Button */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => {
              if (stripePortalUrl) {
                window.open(stripePortalUrl, '_blank');
              }
            }}
            disabled={!stripePortalUrl || isLoadingPortal}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium disabled:opacity-50"
            size="lg"
          >
            {isLoadingPortal ? 'Loading...' : 'Manage Subscription'}
          </Button>
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
              disabled={!checkoutData?.data?.location || isLoadingCheckout}
              className="bg-story-orange hover:bg-story-orange/90 text-white px-8 disabled:opacity-50"
            >
              {isLoadingCheckout ? 'Loading...' : 'Purchase'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PlansAndBilling;
