
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import StoryBackground from "@/components/StoryBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <StoryBackground>
      <div className="text-center z-10">
        <h1 className="text-8xl font-bold mb-4 text-story-purple">404</h1>
        <p className="text-2xl text-story-blue mb-8">
          Oops! We couldn't find that page
        </p>
        <div className="mb-8">
          <img 
            src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
            alt="Lost in the woods" 
            className="mx-auto h-64 rounded-xl object-cover shadow-lg"
          />
        </div>
        <Link to="/">
          <Button className="px-6 py-2 text-lg rounded-xl bg-story-purple hover:bg-story-purple/90 text-white button-bounce">
            <Home className="mr-2 h-5 w-5" />
            Return Home
          </Button>
        </Link>
      </div>
    </StoryBackground>
  );
};

export default NotFound;
