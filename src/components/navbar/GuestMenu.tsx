
import React from "react";
import { Link } from "react-router-dom";
import { Book, BookOpen, Star, Info, Sparkles, UserPlus, LogIn } from "lucide-react";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent
} from "@/components/ui/navigation-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import ListItem from "./ListItem";

interface GuestMenuProps {
  isMobile?: boolean;
  onMobileMenuClose?: () => void;
}

const GuestMenu = ({ isMobile = false, onMobileMenuClose }: GuestMenuProps) => {
  const handleClick = () => {
    if (isMobile && onMobileMenuClose) {
      onMobileMenuClose();
    }
  };

  if (isMobile) {
    return (
      <>
        <Link to="#how-it-works" className="px-3 py-2 rounded-xl hover:bg-story-lightPurple/50 text-story-purple font-medium flex items-center gap-2" onClick={handleClick}>
          <Book className="h-4 w-4" />
          How It Works
        </Link>
        <Link to="#story-samples" className="px-3 py-2 rounded-xl hover:bg-story-lightPurple/50 text-story-purple font-medium flex items-center gap-2" onClick={handleClick}>
          <BookOpen className="h-4 w-4" />
          Story Samples
        </Link>
        <Link to="#pricing" className="px-3 py-2 rounded-xl hover:bg-story-lightPurple/50 text-story-purple font-medium flex items-center gap-2" onClick={handleClick}>
          <Star className="h-4 w-4" fill="currentColor" />
          Pricing
        </Link>
        <Link to="#" className="px-3 py-2 rounded-xl hover:bg-story-lightPurple/50 text-story-purple font-medium flex items-center gap-2" onClick={handleClick}>
          <Info className="h-4 w-4" />
          About Us
        </Link>
        <div className="pt-2 flex flex-col space-y-3">
          <Link to="/register" onClick={handleClick}>
            <Button className="w-full bg-story-purple hover:bg-story-purple/90 text-white gap-1.5">
              <Sparkles className="h-4 w-4" />
              Start Creating
            </Button>
          </Link>
          <Link to="/login" onClick={handleClick}>
            <Button variant="ghost" className="w-full text-story-blue hover:bg-story-blue/10 gap-1.5">
              <LogIn className="h-4 w-4" />
              Log In
            </Button>
          </Link>
          <Link to="/register" onClick={handleClick}>
            <Button variant="outline" className="w-full border-story-blue text-story-blue hover:bg-story-blue/10 gap-1.5">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-story-lightPurple/50 text-story-purple">
              <BookOpen className="mr-1 h-4 w-4" />
              Explore
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                <li className="row-span-2 col-span-2">
                  <NavigationMenuContent asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-story-lightPurple/50 to-story-lightPurple p-6 no-underline outline-none focus:shadow-md"
                      href="#how-it-works"
                    >
                      <Book className="h-6 w-6 text-story-purple mb-2" />
                      <div className="mb-2 mt-4 text-lg font-medium text-story-purple">How It Works</div>
                      <p className="text-sm leading-tight text-story-blue/80">
                        Learn how to create magical stories with your children!
                      </p>
                    </a>
                  </NavigationMenuContent>
                </li>
                <ListItem href="#story-samples" title="Story Samples" icon="Book">
                  Preview our amazing bedtime tales
                </ListItem>
                <ListItem href="#pricing" title="Pricing" icon="Star">
                  Affordable plans for every family
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link to="#" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-story-lightPurple/50 hover:text-story-purple focus:bg-story-lightPurple/50 focus:text-story-purple focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-story-lightPurple/50 data-[state=open]:bg-story-lightPurple/50 text-story-purple">
                  <Info className="mr-1.5 h-4 w-4" />
                  About Us
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-3 bg-white border-story-lightPurple">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-story-purple">Storyland Team</h4>
                  <p className="text-sm text-muted-foreground">
                    A group of passionate storytellers dedicated to bringing imagination to children worldwide.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      <div className="flex items-center gap-3 ml-2">
        <Link to="/register">
          <Button className="bg-story-purple hover:bg-story-purple/90 text-white gap-1.5">
            <Sparkles className="h-4 w-4" />
            Start Creating
          </Button>
        </Link>
        <div className="h-6 w-px bg-story-lightPurple/50"></div>
        <Link to="/login">
          <Button variant="ghost" className="text-story-blue hover:bg-story-blue/10 gap-1">
            <LogIn className="h-4 w-4" />
            Log In
          </Button>
        </Link>
        <Link to="/register">
          <Button variant="outline" className="border-story-blue text-story-blue hover:bg-story-blue/10 gap-1">
            <UserPlus className="h-4 w-4" />
            Sign Up
          </Button>
        </Link>
      </div>
    </>
  );
};

export default GuestMenu;
