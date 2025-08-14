import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

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
}

const CustomPricingTable = () => {
  const [currency, setCurrency] = useState('$');
  const [isAnnual, setIsAnnual] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('authToken');

  // Detect user location for currency
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

  const monthlyPlans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      monthlyPrice: currency === '£' ? '£1.99' : '$2.99',
      annualPrice: currency === '£' ? '£19.99' : '$29.99',
      period: isAnnual ? '/year' : '/month',
      description: 'Perfect for trying out our magical storytelling',
      features: [
        isAnnual ? '12 personalized stories per year' : '1 personalized story per month',
        'Multiple languages',
        'Custom characters',
        'Beautiful illustrations',
        'Web reading experience'
      ],
      buttonText: 'Get Started'
    },
    {
      id: 'popular',
      name: 'Popular Pack',
      monthlyPrice: currency === '£' ? '£6.49' : '$7.99',
      annualPrice: currency === '£' ? '£64.99' : '$79.99',
      period: isAnnual ? '/year' : '/month',
      description: 'Great value for families',
      features: [
        isAnnual ? '48 personalized stories per year' : '4 personalized stories per month',
        'Multiple languages',
        'Custom characters',
        'Beautiful illustrations',
        'Web reading experience',
        'Priority support'
      ],
      isPopular: true,
      buttonText: 'Most Popular'
    },
    {
      id: 'premium',
      name: 'Premium',
      monthlyPrice: currency === '£' ? '£12.49' : '$15.99',
      annualPrice: currency === '£' ? '£124.99' : '$159.99',
      period: isAnnual ? '/year' : '/month',
      description: 'Unlimited storytelling adventures',
      features: [
        isAnnual ? '96 personalized stories per year' : '8 personalized stories per month',
        'Multiple languages',
        'Custom characters',
        'Beautiful illustrations',
        'Web reading experience',
        'Priority support',
        'Advanced customization'
      ],
      buttonText: 'Go Premium'
    }
  ];

  const oneTimePlan: PricingPlan = {
    id: 'single-story',
    name: 'Single Story',
    monthlyPrice: currency === '£' ? '£0.99' : '$1.49',
    annualPrice: currency === '£' ? '£0.99' : '$1.49',
    description: 'Perfect for trying out our service with no commitment',
    features: [
      '1 personalized story',
      'Multiple languages',
      'Custom characters',
      'Beautiful illustrations',
      'Web reading experience',
      'No recurring charges'
    ],
    buttonText: 'Buy Now',
    isOneTime: true
  };

  const handlePlanClick = (planId: string) => {
    if (!isLoggedIn) {
      // Store the plan selection for after login
      localStorage.setItem('selectedPlan', planId);
      localStorage.setItem('redirectAfterAuth', window.location.pathname);
      navigate('/register');
      return;
    }
    
    // If logged in, proceed with payment (this would integrate with your payment system)
    console.log('Processing payment for plan:', planId);
    // TODO: Integrate with actual payment processing
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Monthly Subscription Plans */}
      <div>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-6 text-story-purple">Monthly Subscriptions</h3>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-lg font-medium transition-colors ${!isAnnual ? 'text-story-purple' : 'text-gray-500'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-story-purple"
            />
            <span className={`text-lg font-medium transition-colors ${isAnnual ? 'text-story-purple' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <div className="bg-story-purple text-white px-3 py-1 rounded-full text-sm font-bold ml-2">
                Save up to 17%
              </div>
            )}
          </div>
        </div>
        
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
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600 text-lg">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 text-sm">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-story-purple mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
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
            {/* Left side - Plan info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <h3 className="text-3xl font-bold text-gray-900">
                  {oneTimePlan.name}
                </h3>
                <div className="bg-story-orange text-white px-3 py-1 rounded-full text-sm font-bold">
                  One-Time
                </div>
              </div>
              <div className="mb-4">
                <span className="text-5xl font-bold text-gray-900">
                  {oneTimePlan.monthlyPrice}
                </span>
                <span className="text-gray-600 text-lg ml-2">once</span>
              </div>
              <p className="text-gray-600 text-lg mb-6">
                {oneTimePlan.description}
              </p>
            </div>

            {/* Middle - Features */}
            <div className="flex-1">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {oneTimePlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-story-orange mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
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
      
      {!isLoggedIn && (
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Please{' '}
            <Link to="/register" className="text-story-purple hover:underline font-semibold">
              sign up
            </Link>{' '}
            or{' '}
            <Link to="/login" className="text-story-purple hover:underline font-semibold">
              log in
            </Link>{' '}
            to purchase a plan
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomPricingTable;
