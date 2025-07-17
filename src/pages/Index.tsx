
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Book, Star, Heart, Download, MessageCircle, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import StoryBackground from "@/components/StoryBackground";
import HowItWorks from "@/components/HowItWorks";
import StorySamples from "@/components/StorySamples";
import DiscoverStories from "@/components/DiscoverStories";
import PricingSlider from "@/components/PricingSlider";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
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

  return <div className="overflow-auto">
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
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-8 md:mb-12 px-4">
            {isLoggedIn ? (
              <Link to="/library">
                <Button className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 text-lg md:text-xl rounded-2xl bg-story-purple hover:bg-story-purple/90 text-white button-bounce">
                  Explore Your Story Treasury
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 text-lg md:text-xl rounded-2xl bg-story-purple hover:bg-story-purple/90 text-white button-bounce">
                    Start Your Adventure
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 text-lg md:text-xl rounded-2xl border-2 border-story-blue text-story-blue bg-white hover:bg-story-blue/10 button-bounce">
                    Sign Up for Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Free story credit message for non-logged in users */}
          {!isLoggedIn && (
            <div className="bg-gradient-to-r from-story-yellow/30 to-story-peach/30 border-2 border-story-orange/50 rounded-2xl p-4 md:p-6 max-w-2xl mx-auto mb-8 md:mb-12 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-5 w-5 md:h-6 md:w-6 text-story-orange" fill="currentColor" />
                <span className="text-lg md:text-xl font-bold text-story-purple">Free Story Credit!</span>
                <Star className="h-5 w-5 md:h-6 md:w-6 text-story-orange" fill="currentColor" />
              </div>
              <p className="text-sm md:text-base text-story-purple font-medium">
                Sign up today and get <span className="font-bold">1 free story credit</span> to create your first magical bedtime story and experience the wonder of NightKnight!
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
      <PricingSlider />
      <Footer />
    </div>;
};

export default Index;
