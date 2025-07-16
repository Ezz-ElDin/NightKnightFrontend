
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Home, BookOpen, User, Settings, LogOut, Plus } from "lucide-react";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem
} from "@/components/ui/navigation-menu";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { authApi, creditApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface LoggedInMenuProps {
  isMobile?: boolean;
  onMobileMenuClose?: () => void;
}

const LoggedInMenu = ({ isMobile = false, onMobileMenuClose }: LoggedInMenuProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleClick = () => {
    if (isMobile && onMobileMenuClose) {
      onMobileMenuClose();
    }
  };

  const { data: creditData } = useQuery({
    queryKey: ['credits'],
    queryFn: creditApi.get,
    refetchOnWindowFocus: false,
  });

  const storyCredits = creditData?.data?.remaining_credit || 0;
  const hasCredits = storyCredits > 0;

  const handleLogout = async () => {
    try {
      const response = await authApi.logout();
      
      // Clear auth token from localStorage
      localStorage.removeItem('authToken');
      
      // Dispatch event to notify navbar of auth state change
      window.dispatchEvent(new Event('user-info-updated'));
      
      // Show success message
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      
      // Close mobile menu if applicable
      if (isMobile && onMobileMenuClose) {
        onMobileMenuClose();
      }
      
      // Extract pathname from backend response URL to avoid double URL construction
      let redirectUrl = '/';
      if (response.data?.location) {
        try {
          const url = new URL(response.data.location);
          redirectUrl = url.pathname;
        } catch {
          // If URL parsing fails, use the location as-is (might be a relative path)
          redirectUrl = response.data.location;
        }
      }
      navigate(redirectUrl);
    } catch (error) {
      console.log("Logout error (non-critical):", error);
      
      // Clear auth token even if logout request failed
      localStorage.removeItem('authToken');
      
      // Dispatch event to notify navbar of auth state change
      window.dispatchEvent(new Event('user-info-updated'));
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      
      if (isMobile && onMobileMenuClose) {
        onMobileMenuClose();
      }
      
      // Fallback to homepage on error
      navigate('/');
    }
  };

  // Fetch user data from API
  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await authApi.getUser();
      return response.data;
    },
  });

  const userName = userData 
    ? `${userData.first_name} ${userData.last_name}`.trim()
    : localStorage.getItem("userName") || "User";
  
  const userEmail = userData?.email || localStorage.getItem("userEmail") || "user@example.com";

  // Credit badge component
  const CreditBadge = ({ count }: { count: number }) => {
    const getVariant = () => {
      if (count === 0) return "destructive";
      if (count <= 2) return "secondary";
      return "default";
    };

    const getBadgeText = () => {
      if (count > 99) return "99+";
      return count.toString();
    };

    return (
      <Badge 
        variant={getVariant()} 
        className="ml-1 px-1.5 py-0.5 text-xs font-medium min-w-[20px] h-5 flex items-center justify-center"
      >
        {getBadgeText()}
      </Badge>
    );
  };

  if (isMobile) {
    return (
      <>
        <Link to="/library" className="px-3 py-2 rounded-xl hover:bg-story-lightPurple/50 text-story-purple font-medium flex items-center gap-2" onClick={handleClick}>
          <Home className="h-4 w-4" />
          Library
        </Link>
        <TooltipProvider delayDuration={0}>
          {hasCredits ? (
            <Link to="/create-story" className="px-3 py-2 rounded-xl hover:bg-story-lightPurple/50 text-story-purple font-medium flex items-center gap-2" onClick={handleClick}>
              <BookOpen className="h-4 w-4" />
              Create Story
              <CreditBadge count={storyCredits} />
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="px-3 py-2 rounded-xl text-gray-400 font-medium flex items-center gap-2 cursor-not-allowed">
                    <BookOpen className="h-4 w-4" />
                    Create Story
                    <CreditBadge count={storyCredits} />
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm">
                  <p>You need to buy credits to create a story</p>
                </TooltipContent>
              </Tooltip>
              <Link to="/account-settings?tab=credits" onClick={handleClick}>
                <Button size="sm" className="bg-story-purple hover:bg-story-purple/90 text-white gap-1 px-2 py-1 rounded-md text-xs">
                  <Plus className="h-3 w-3" />
                  Buy
                </Button>
              </Link>
            </div>
          )}
        </TooltipProvider>
        <Link to="/account-settings" className="px-3 py-2 rounded-xl hover:bg-story-lightPurple/50 text-story-purple font-medium flex items-center gap-2" onClick={handleClick}>
          <Settings className="h-4 w-4" />
          Account Settings
        </Link>
        <button 
          onClick={handleLogout}
          className="px-3 py-2 rounded-xl hover:bg-story-lightPurple/50 text-red-600 font-medium flex items-center gap-2 w-full text-left"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/library" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-story-lightPurple/50 hover:text-story-purple focus:bg-story-lightPurple/50 focus:text-story-purple focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-story-lightPurple/50 data-[state=open]:bg-story-lightPurple/50 text-story-purple">
            <Home className="mr-1.5 h-4 w-4" />
            Library
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <TooltipProvider delayDuration={0}>
            {hasCredits ? (
              <Link to="/create-story" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-story-lightPurple/50 hover:text-story-purple focus:bg-story-lightPurple/50 focus:text-story-purple focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-story-lightPurple/50 data-[state=open]:bg-story-lightPurple/50 text-story-purple">
                <BookOpen className="mr-1.5 h-4 w-4" />
                Create Story
                <CreditBadge count={storyCredits} />
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
                      <BookOpen className="mr-1.5 h-4 w-4" />
                      Create Story
                      <CreditBadge count={storyCredits} />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm">
                    <p>You need to buy credits to create a story</p>
                  </TooltipContent>
                </Tooltip>
                <Link to="/account-settings?tab=credits">
                  <Button size="sm" className="bg-story-purple hover:bg-story-purple/90 text-white gap-1 px-2 py-1 rounded-md text-xs">
                    <Plus className="h-3 w-3" />
                    Buy
                  </Button>
                </Link>
              </div>
            )}
          </TooltipProvider>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <User className="h-5 w-5 text-story-purple" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex rounded-full h-8 w-8 items-center justify-center bg-story-lightPurple">
                  <User className="h-4 w-4 text-story-purple" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-muted-foreground">{userEmail}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/account-settings" className="cursor-pointer flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button onClick={handleLogout} className="cursor-pointer flex items-center text-red-600 w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default LoggedInMenu;
