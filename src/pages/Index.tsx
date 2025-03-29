
import { Button } from "@/components/ui/button";
import { Book, Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import StoryBackground from "@/components/StoryBackground";
import HowItWorks from "@/components/HowItWorks";
import StorySamples from "@/components/StorySamples";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="overflow-auto">
      <StoryBackground>
        <div className="container max-w-6xl mx-auto text-center z-10">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Book className="h-28 w-28 text-story-purple animate-wiggle" />
              <Star className="absolute -top-4 -right-4 h-12 w-12 text-story-yellow animate-bounce-slow" fill="currentColor" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-story-purple">
            Storyland
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-story-blue">
            Magical Bedtime Stories for Kids
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
            Create personalized bedtime adventures that will spark your child's imagination and lead to sweet dreams!
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card-kiddy">
              <div className="mb-4 flex justify-center">
                <div className="bg-story-lightPurple p-3 rounded-full">
                  <Star className="h-8 w-8 text-story-purple" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Stories</h3>
              <p>Stories featuring your child's name, interests, and favorite things!</p>
            </div>
            
            <div className="card-kiddy">
              <div className="mb-4 flex justify-center">
                <div className="bg-story-yellow p-3 rounded-full">
                  <Book className="h-8 w-8 text-story-orange" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Endless Imagination</h3>
              <p>New stories every night with magical worlds and lovable characters!</p>
            </div>
            
            <div className="card-kiddy">
              <div className="mb-4 flex justify-center">
                <div className="bg-story-pink p-3 rounded-full">
                  <Heart className="h-8 w-8 text-story-purple" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Kid-Friendly</h3>
              <p>Age-appropriate content designed to make bedtime fun and peaceful!</p>
            </div>
          </div>
        </div>
      </StoryBackground>
      
      <HowItWorks />
      <StorySamples />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
