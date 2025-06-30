
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "£0",
      description: "Perfect for trying out Storyland",
      features: [
        "3 personalised stories per month",
        "Basic customisation",
        "Web reading experience",
        "Single child profile"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
      backgroundColor: "bg-white",
      highlightColor: "text-story-blue"
    },
    {
      name: "Family",
      price: "£4.99",
      period: "per month",
      description: "Best value for families",
      features: [
        "Unlimited stories",
        "Advanced customisation",
        "Multiple child profiles",
        "Ad-free experience",
        "Premium story themes",
        "Multiple languages"
      ],
      buttonText: "Start 7-Day Free Trial",
      buttonVariant: "default",
      backgroundColor: "bg-story-purple",
      highlightColor: "text-white",
      recommended: true
    },
    {
      name: "School",
      price: "£19.99",
      period: "per month",
      description: "Ideal for classrooms",
      features: [
        "Unlimited stories",
        "Classroom management",
        "Educational themes",
        "Shared story library",
        "Priority support",
        "All available languages"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
      backgroundColor: "bg-white",
      highlightColor: "text-story-blue"
    }
  ];

  return (
    <section className="py-16 px-4" id="pricing">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center text-story-purple">
          Simple Pricing
        </h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
          Choose the perfect plan for your bedtime story needs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-3xl ${plan.backgroundColor} p-6 border-2 border-story-lightPurple shadow-lg relative flex flex-col ${plan.recommended ? 'transform -translate-y-4 md:scale-105' : ''}`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-max">
                  <div className="bg-story-yellow px-4 py-1 rounded-full text-story-orange font-bold text-sm">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlightColor === 'text-white' ? 'text-white' : 'text-story-purple'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-end mb-2">
                  <span className={`text-4xl font-bold ${plan.highlightColor === 'text-white' ? 'text-white' : 'text-story-purple'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`ml-2 mb-1 ${plan.highlightColor === 'text-white' ? 'text-white/70' : 'text-gray-600'}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`${plan.highlightColor === 'text-white' ? 'text-white/70' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </div>
              
              <div className="mb-8 flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className={`mr-2 mt-1 ${plan.highlightColor === 'text-white' ? 'text-white' : 'text-story-purple'}`}>
                        <Check className="h-5 w-5" />
                      </div>
                      <span className={`text-base ${plan.highlightColor === 'text-white' ? 'text-white' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <Link to="/register">
                  <Button 
                    variant={plan.buttonVariant === "default" ? "default" : "outline"} 
                    className={`w-full h-12 rounded-xl button-bounce ${
                      plan.buttonVariant === 'outline'
                        ? 'border-2 border-story-purple text-story-purple hover:bg-story-purple/10'
                        : 'bg-story-yellow text-story-orange hover:bg-story-yellow/90'
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
