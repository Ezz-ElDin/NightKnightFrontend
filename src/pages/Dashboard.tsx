
import { Button } from "@/components/ui/button";
import { Book, Moon, Star } from "lucide-react";
import StoryBackground from "@/components/StoryBackground";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <StoryBackground>
      <div className="container max-w-5xl mx-auto text-center z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-story-purple">
          Welcome to Storyland!
        </h1>
        
        <div className="card-kiddy mb-10">
          <div className="flex justify-center mb-6">
            <Moon className="h-16 w-16 text-story-purple animate-float" />
          </div>
          <h2 className="text-2xl font-bold mb-6">Time for a bedtime story!</h2>
          <p className="text-lg mb-8">
            The story generator is coming soon! Check back later to create magical bedtime adventures.
          </p>
          <div className="flex justify-center">
            <Link to="/create-story">
              <Button className="px-8 py-6 text-xl rounded-2xl bg-story-purple hover:bg-story-purple/90 text-white button-bounce">
                <Star className="mr-2 h-5 w-5" />
                <span>Create a Story</span>
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card-kiddy">
            <div className="flex justify-center mb-4">
              <div className="bg-story-yellow p-3 rounded-full">
                <Book className="h-8 w-8 text-story-purple" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">My Stories</h3>
            <p className="mb-4">View all your saved stories here.</p>
            <Button variant="outline" className="w-full bg-white border-2 border-story-blue text-story-blue hover:bg-story-blue/10 button-bounce">
              View My Stories
            </Button>
          </div>
          
          <div className="card-kiddy">
            <div className="flex justify-center mb-4">
              <div className="bg-story-pink p-3 rounded-full">
                <Star className="h-8 w-8 text-story-purple" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">Story Settings</h3>
            <p className="mb-4">Customize your story preferences.</p>
            <Button variant="outline" className="w-full bg-white border-2 border-story-blue text-story-blue hover:bg-story-blue/10 button-bounce">
              Settings
            </Button>
          </div>
        </div>
      </div>
    </StoryBackground>
  );
};

export default Dashboard;
