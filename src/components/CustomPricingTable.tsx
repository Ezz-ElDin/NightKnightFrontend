
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Link, useNavigate } from 'react-router-dom';
import { stripeApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  period?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  isOneTime?: boolean;
  imagePath: string;
}

const CustomPricingTable = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isLoggedIn = !!localStorage.getItem('authToken');

  const monthlyPlans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Dream Drifter',
      monthlyPrice: '£8.49',
      annualPrice: '£19.99',
      period: '/month',
      description: 'Drift through the week with 6 enchanting stories, a perfect blend of spontaneity and routine for magical nights together.',
      features: [
        '1 personalized story per month',
        'Multiple languages',
        'Custom characters',
        'Beautiful illustrations',
        'Web reading experience'
      ],
      buttonText: 'Sign up Now',
      imagePath: '/images/dream-drifter.png'
    },
    {
      id: 'popular',
      name: 'Story Sprout',
      monthlyPrice: '£6.49',
      annualPrice: '£64.99',
      period: '/month',
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
      buttonText: 'Sign up Now',
      imagePath: '/images/story-sprout.png'
    },
    {
      id: 'premium',
      name: 'Starlight Stories',
      monthlyPrice: '£11.49',
      annualPrice: '£124.99',
      period: '/month',
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
      buttonText: 'Sign up Now',
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
    buttonText: 'Sign up Now',
    isOneTime: true,
    imagePath: '/images/single-story.png'
  };

  const handlePlanClick = async (planId: string) => {
    // Store the selected plan for after signup/login
    localStorage.setItem('selectedPlan', planId);
    localStorage.setItem('redirectAfterAuth', window.location.pathname);
    
    // Always redirect to signup regardless of authentication status
    navigate('/register');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Monthly Subscription Plans */}
      <div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {monthlyPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl border-2 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                plan.isPopular 
                  ? 'border-story-purple ring-2 ring-story-purple/20 scale-105' 
                  : 'border-gray-200'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-story-purple text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                </div>
              )}
              
              {/* Plan Image - Top Center */}
              <div className="flex justify-center mb-6">
                <img 
                  src={plan.imagePath} 
                  alt={`${plan.name} plan illustration`}
                  className="w-[150px] h-[150px] object-cover rounded-lg"
                />
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <div className="text-4xl font-bold text-gray-900">
                    {plan.monthlyPrice}{' '}
                    <span className="text-lg text-gray-500 font-normal">
                      /month
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm text-left">
                  {plan.description}
                </p>
              </div>

              <Button
                onClick={() => handlePlanClick(plan.id)}
                className={`w-full h-12 rounded-xl font-semibold transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-story-purple hover:bg-story-purple/90 text-white'
                    : 'bg-story-purple hover:bg-story-purple/90 text-white'
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* One-Time Purchase Plan */}
      <div>
        <h3 className="text-2xl font-bold text-center mb-6 text-story-orange">One-Time Purchase</h3>
        <div className="bg-white rounded-2xl border-2 border-story-orange p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left side - Plan info with image */}
            <div className="flex-1 flex items-center gap-6">
              {/* Plan Image - Left Middle */}
              <div className="flex-shrink-0">
                <img 
                  src={oneTimePlan.imagePath} 
                  alt={`${oneTimePlan.name} plan illustration`}
                  className="w-[150px] h-[150px] object-cover rounded-lg"
                />
              </div>
              
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <h3 className="text-3xl font-bold text-gray-900">
                    {oneTimePlan.name}
                  </h3>
                  <div className="bg-story-orange text-white px-3 py-1 rounded-full text-sm font-bold">
                    One-Time
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-5xl font-bold text-gray-900">
                    {oneTimePlan.monthlyPrice}{' '}
                    <span className="text-lg text-gray-500 font-normal">
                      /story
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-lg mb-6">
                  {oneTimePlan.description}
                </p>
              </div>
            </div>

            {/* Right side - CTA */}
            <div className="flex-shrink-0">
              <Button
                onClick={() => handlePlanClick(oneTimePlan.id)}
                className="h-14 px-12 text-lg font-semibold rounded-xl bg-story-orange hover:bg-story-orange/90 text-white transition-all duration-300"
              >
                {oneTimePlan.buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPricingTable;
