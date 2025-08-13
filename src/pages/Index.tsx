
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Book, Star, Heart, Download, MessageCircle, Globe, Check } from "lucide-react";
import { Link } from "react-router-dom";
import StoryBackground from "@/components/StoryBackground";
import HowItWorks from "@/components/HowItWorks";
import StorySamples from "@/components/StorySamples";
import DiscoverStories from "@/components/DiscoverStories";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEurope, setIsEurope] = useState(false);
  
  // Check authentication status based on token presence
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };
    
    checkAuthStatus();
    
    // Listen for auth changes
    const handleStorageChange = () => {
      checkAuthStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('user-info-updated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('user-info-updated', handleStorageChange);
    };
  }, []);

  // Detect user location for pricing
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
        
        setIsEurope(europeanTimezones.some(tz => timezone.includes(tz.split('/')[1])));
      } catch (error) {
        setIsEurope(false); // Default to non-Europe pricing
      }
    };

    detectLocation();
  }, []);

  // Commented out story plans data - now using Stripe pricing table
  /*
  const storyPlans = [
    {
      name: "Entry",
      description: "Perfect for those who want to try our magical storytelling experience with a single personalized adventure.",
      storiesCount: 1,
      priceEurope: "£1.99",
      priceOutsideEurope: "$3.99",
      iconColor: "bg-story-pink",
      isPopular: false,
      features: [
        "1 Personalized story",
        "Multiple languages",
        "Custom characters",
        "Beautiful illustrations",
        "Web reading experience"
      ]
    },
    {
      name: "Tiny Tales",
      description: "Enjoy four personalised bedtime stories each month – the perfect treat for special nights with your little one.",
      storiesCount: 4,
      priceEurope: "£6.49",
      priceOutsideEurope: "$7.99",
      iconColor: "bg-story-purple",
      isPopular: true,
      features: [
        "4 Personalized stories",
        "Multiple languages",
        "Custom characters",
        "Beautiful illustrations",
        "Web reading experience"
      ]
    },
    {
      name: "Starlight Stories",
      description: "Brighten bedtime twice a week with eight enchanting stories each month – lovingly crafted just for your child's dreams.",
      storiesCount: 8,
      priceEurope: "£12.49",
      priceOutsideEurope: "$15.99",
      iconColor: "bg-story-yellow",
      isPopular: false,
      features: [
        "8 Personalized stories",
        "Multiple languages",
        "Custom characters",
        "Beautiful illustrations",
        "Web reading experience"
      ]
    }
  ];
  */

  // Load Stripe pricing table script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector('script[src="https://js.stripe.com/v3/pricing-table.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="overflow-auto">
      <StoryBackground>
        <div className="container max-w-6xl mx-auto text-center z-10 px-4">
          <div className="mb-6 md:mb-8 flex justify-center">
            <div className="relative">
              <Book className="h-20 w-20 md:h-28 md:w-28 text-story-purple animate-wiggle" />
              <Star className="absolute -top-3 -right-3 md:-top-4 md:-right-4 h-10 w-10 md:h-12 md:w-12 text-story-yellow animate-bounce-slow" fill="currentColor" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 text-story-purple">NightKnight</h1>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 md:mb-8 text-story-blue px-4">
            Magical Bedtime Stories for Children
          </h2>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            Create personalised bedtime adventures that will spark your child's imagination and lead to sweet dreams!
          </p>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 md:gap-6 justify-center mb-8 md:mb-12 px-4">
            {isLoggedIn ? (
              <Link to="/library" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 text-base md:text-lg lg:text-xl rounded-2xl bg-story-purple hover:bg-story-purple/90 text-white button-bounce">
                  Explore Your Story Treasury
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 text-base md:text-lg lg:text-xl rounded-2xl bg-story-purple hover:bg-story-purple/90 text-white button-bounce">
                    Start Your Adventure
                  </Button>
                </Link>
                <Link to="/register" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 text-base md:text-lg lg:text-xl rounded-2xl border-2 border-story-blue text-story-blue bg-white hover:bg-story-blue/10 button-bounce">
                    Sign Up for Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Exciting free story banner with sleek background - improved mobile responsiveness */}
          {!isLoggedIn && (
            <div className="relative bg-story-purple border-3 border-story-purple rounded-3xl p-6 md:p-8 lg:p-10 max-w-xs sm:max-w-sm md:max-w-lg mx-auto mb-8 md:mb-12 shadow-xl">
              <div className="absolute -top-2 -right-2 bg-story-orange text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xs font-bold">
                FREE
              </div>
              <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
                <Star className="h-6 w-6 sm:h-8 sm:w-8 text-story-orange" fill="currentColor" />
                <span className="text-2xl sm:text-3xl font-black text-story-orange">
                  <span className="text-story-orange drop-shadow-lg">FREE</span> Story!
                </span>
                <Star className="h-6 w-6 sm:h-8 sm:w-8 text-story-orange" fill="currentColor" />
              </div>
              <p className="text-white font-bold text-sm sm:text-base md:text-lg text-center leading-relaxed">
                Get your first magical story when you sign up!
              </p>
            </div>
          )}
        </div>
      </StoryBackground>
      
      {/* Move StorySamples to the top, right after hero section */}
      <StorySamples />
      
      {/* New Discover Stories section */}
      <DiscoverStories />
      
      {/* Features section moved after story samples */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-story-lightPurple/30 to-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="card-kiddy">
              <div className="mb-4 flex justify-center">
                <div className="bg-story-lightPurple p-3 rounded-full">
                  <MessageCircle className="h-6 w-6 md:h-8 md:w-8 text-story-purple" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Engaging Experience</h3>
              <p className="text-sm md:text-base">Create meaningful connections as you and your child craft stories together!</p>
            </div>
            
            <div className="card-kiddy">
              <div className="mb-4 flex justify-center">
                <div className="bg-story-yellow p-3 rounded-full">
                  <Book className="h-6 w-6 md:h-8 md:w-8 text-story-orange" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Endless Imagination</h3>
              <p className="text-sm md:text-base">Take control of story content with characters and themes your child loves!</p>
            </div>
            
            <div className="card-kiddy">
              <div className="mb-4 flex justify-center">
                <div className="bg-story-pink p-3 rounded-full">
                  <Globe className="h-6 w-6 md:h-8 md:w-8 text-story-purple" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Multiple Languages</h3>
              <p className="text-sm md:text-base">Stories in different languages make bedtime both fun and educational!</p>
            </div>
          </div>
        </div>
      </section>
      
      <HowItWorks />
      
      {/* New Stripe Pricing Table section for non-logged-in users */}
      {!isLoggedIn && (
        <section className="py-16 px-4 bg-gray-50" id="story-plans">
          <div className="container mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-story-purple">
              Story Plans
            </h2>
            <p className="text-xl text-center mb-12 max-w-2xl mx-auto text-story-blue">
              Choose the perfect plan for your magical bedtime story adventure
            </p>
            
            {/* Stripe Pricing Table */}
            <div className="flex justify-center">
              <stripe-pricing-table 
                pricing-table-id="prctbl_1RvcFFLd6fD08lwA7V9k15DQ"
                publishable-key="pk_test_51KaM3ALd6fD08lwA5AAHGRYc8kDoBVmqRfIm2EDm9CHy4RwbfoOF1dRP0D5VJMuCPzofGq4FVH0BDS9nsxfTwpNJ00dhmbUPzm"
              ></stripe-pricing-table>
            </div>

            {/* Commented out custom story plans implementation */}
            {/*
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {storyPlans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-3xl p-8 shadow-lg border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative ${
                    plan.isPopular 
                      ? 'border-story-purple ring-2 ring-story-purple/20 scale-105' 
                      : 'border-gray-100'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-story-purple to-story-pink text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="flex space-x-2">
                        <div className="w-12 h-12 bg-story-pink rounded-full flex items-center justify-center">
                          <Book className="h-6 w-6 text-white" />
                        </div>
                        <div className="w-12 h-12 bg-story-purple rounded-full flex items-center justify-center">
                          <Star className="h-6 w-6 text-white" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    {plan.name}
                  </h3>
                  
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      {isEurope ? plan.priceEurope : plan.priceOutsideEurope}
                    </div>
                    <div className="text-gray-500 text-sm">
                      for {plan.storiesCount} {plan.storiesCount === 1 ? 'story' : 'stories'}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-center mb-8 leading-relaxed">
                    {plan.description}
                  </p>
                  
                  <div className="mt-auto">
                    <Link to="/register">
                      <Button 
                        className={`w-full h-12 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg ${
                          plan.isPopular
                            ? 'bg-gradient-to-r from-story-purple to-story-pink hover:from-story-purple/90 hover:to-story-pink/90 text-white'
                            : 'bg-story-purple hover:bg-story-purple/90 text-white'
                        }`}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            */}
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
