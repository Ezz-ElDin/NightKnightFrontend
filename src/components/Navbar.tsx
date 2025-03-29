
import { useState } from "react";
import { Link } from "react-router-dom";
import { Book, Menu, X, Star, Info, Sparkles } from "lucide-react";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav className="sticky top-0 z-50 w-full py-3 bg-white/80 backdrop-blur-md border-b border-story-lightPurple/30 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <Book className="h-8 w-8 text-story-purple" />
            <Star className="absolute -top-1 -right-1 h-4 w-4 text-story-yellow animate-bounce-slow" fill="currentColor" />
          </div>
          <span className="font-bold text-2xl text-story-purple">Storyland</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-story-lightPurple/50 text-story-purple">
                  Explore
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                    <li className="row-span-2 col-span-2">
                      <NavigationMenuLink asChild>
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
                      </NavigationMenuLink>
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
                    <div className="flex justify-between space-x-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-story-purple">Storyland Team</h4>
                        <p className="text-sm text-muted-foreground">
                          A group of passionate storytellers dedicated to bringing imagination to children worldwide.
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center gap-3">
            <Link to="/register">
              <Button className="bg-story-purple hover:bg-story-purple/90 text-white gap-1.5">
                <Sparkles className="h-4 w-4" />
                Start Creating
              </Button>
            </Link>
            <div className="h-6 w-px bg-story-lightPurple/50"></div>
            <Link to="/login">
              <Button variant="ghost" className="text-story-blue hover:bg-story-blue/10">
                Log In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="border-story-blue text-story-blue hover:bg-story-blue/10">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-story-purple"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-story-lightPurple/30 p-4 shadow-lg animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-4">
            <Link to="#how-it-works" className="px-3 py-2 rounded-xl hover:bg-story-lightPurple/50 text-story-purple font-medium" onClick={() => setMobileMenuOpen(false)}>
              How It Works
            </Link>
            <Link to="#story-samples" className="px-3 py-2 rounded-xl hover:bg-story-lightPurple/50 text-story-purple font-medium" onClick={() => setMobileMenuOpen(false)}>
              Story Samples
            </Link>
            <Link to="#pricing" className="px-3 py-2 rounded-xl hover:bg-story-lightPurple/50 text-story-purple font-medium" onClick={() => setMobileMenuOpen(false)}>
              Pricing
            </Link>
            <Link to="#" className="px-3 py-2 rounded-xl hover:bg-story-lightPurple/50 text-story-purple font-medium flex items-center gap-1.5" onClick={() => setMobileMenuOpen(false)}>
              <Info className="h-4 w-4" />
              About Us
            </Link>
            <div className="pt-2 flex flex-col space-y-3">
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-story-purple hover:bg-story-purple/90 text-white gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  Start Creating
                </Button>
              </Link>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full text-story-blue hover:bg-story-blue/10">
                  Log In
                </Button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full border-story-blue text-story-blue hover:bg-story-blue/10">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const ListItem = ({ 
  className, 
  title, 
  children, 
  href,
  icon = "Book"
}: { 
  className?: string; 
  title: string; 
  children: React.ReactNode; 
  href: string;
  icon?: "Book" | "Star"
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-story-lightPurple/50 hover:text-story-purple focus:bg-story-lightPurple/50 focus:text-accent-foreground",
            className
          )}
        >
          {icon === "Book" ? (
            <Book className="h-5 w-5 text-story-purple mb-2" />
          ) : (
            <Star className="h-5 w-5 text-story-yellow mb-2" fill="currentColor" />
          )}
          <div className="text-sm font-medium leading-none text-story-purple">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

export default Navbar;
