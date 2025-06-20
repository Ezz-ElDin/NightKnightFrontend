
import { Button } from "@/components/ui/button";
import { Book, Star, Heart, Download, MessageCircle, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import StoryBackground from "@/components/StoryBackground";
import HowItWorks from "@/components/HowItWorks";
import StorySamples from "@/components/StorySamples";
import PricingSlider from "@/components/PricingSlider";
import Footer from "@/components/Footer";

const Index = () => {
  return <div className="overflow-auto">
      <StoryBackground>
        <div className="container max-w-6xl mx-auto text-center z-10">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Book className="h-28 w-28 text-story-purple animate-wiggle" />
              <Star className="absolute -top-4 -right-4 h-12 w-12 text-story-yellow animate-bounce-slow" fill="currentColor" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-story-purple">NightKnight</h1>
          
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-story-blue">
            Magical Bedtime Stories for Children
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
            Create personalised bedtime adventures that will spark your child's imagination and lead to sweet dreams!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/login">
              <Button className="h-14 px-8 text-xl rounded-2xl bg-story-purple hover:bg-story-purple/90 text-white button-bounce">
                Start Your Adventure
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="h-14 px-8 text-xl rounded-2xl border-2 border-story-blue text-story-blue bg-white hover:bg-story-blue/10 button-bounce">
                Sign Up for Free
              </Button>
            </Link>
          </div>
        </div>
      </StoryBackground>
      
      {/* Move StorySamples to the top, right after hero section */}
      <StorySamples />
      
      {/* Features section moved after story samples */}
      <section className="py-16 px-4 bg-gradient-to-b from-story-lightPurple/30 to-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card-kiddy">
              <div className="mb-4 flex justify-center">
                <div className="bg-story-lightPurple p-3 rounded-full">
                  <MessageCircle className="h-8 w-8 text-story-purple" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Engaging Experience</h3>
              <p>Create meaningful connections as you and your child craft stories together!</p>
            </div>
            
            <div className="card-kiddy">
              <div className="mb-4 flex justify-center">
                <div className="bg-story-yellow p-3 rounded-full">
                  <Book className="h-8 w-8 text-story-orange" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Endless Imagination</h3>
              <p>Take control of story content with characters and themes your child loves!</p>
            </div>
            
            <div className="card-kiddy">
              <div className="mb-4 flex justify-center">
                <div className="bg-story-pink p-3 rounded-full">
                  <Globe className="h-8 w-8 text-story-purple" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Multiple Languages</h3>
              <p>Stories in different languages make bedtime both fun and educational!</p>
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
