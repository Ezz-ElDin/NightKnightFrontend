
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Home, BookOpen, User, Settings, LogOut } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { authApi } from "@/lib/api";

interface LoggedInMenuProps {
  isMobile?: boolean;
  onMobileMenuClose?: () => void;
}

const LoggedInMenu = ({ isMobile = false, onMobileMenuClose }: LoggedInMenuProps) => {
  const handleClick = () => {
    if (isMobile && onMobileMenuClose) {
      onMobileMenuClose();
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

  // Construct full name from first_name and last_name, fallback to localStorage for compatibility
  const userName = userData 
    ? `${userData.first_name} ${userData.last_name}`.trim()
    : localStorage.getItem("userName") || "User";
  
  const userEmail = userData?.email || localStorage.getItem("userEmail") || "user@example.com";

  if (isMobile) {
    return (
      <>
        <Link to="/a/library" className="px-3 py-2 rounded-xl hover:bg-story-lightPurple/50 text-story-purple font-medium flex items-center gap-2" onClick={handleClick}>
          <Home className="h-4 w-4" />
          Library
        </Link>
        <Link to="/a/create-story" className="px-3 py-2 rounded-xl hover:bg-story-lightPurple/50 text-story-purple font-medium flex items-center gap-2" onClick={handleClick}>
          <BookOpen className="h-4 w-4" />
          Create Story
        </Link>
        <Link to="/a/account-settings" className="px-3 py-2 rounded-xl hover:bg-story-lightPurple/50 text-story-purple font-medium flex items-center gap-2" onClick={handleClick}>
          <Settings className="h-4 w-4" />
          Account Settings
        </Link>
        <Link to="/" className="px-3 py-2 rounded-xl hover:bg-story-lightPurple/50 text-red-600 font-medium flex items-center gap-2" onClick={handleClick}>
          <LogOut className="h-4 w-4" />
          Log Out
        </Link>
      </>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/a/library" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-story-lightPurple/50 hover:text-story-purple focus:bg-story-lightPurple/50 focus:text-story-purple focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-story-lightPurple/50 data-[state=open]:bg-story-lightPurple/50 text-story-purple">
            <Home className="mr-1.5 h-4 w-4" />
            Library
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/a/create-story" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-story-lightPurple/50 hover:text-story-purple focus:bg-story-lightPurple/50 focus:text-story-purple focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-story-lightPurple/50 data-[state=open]:bg-story-lightPurple/50 text-story-purple">
            <BookOpen className="mr-1.5 h-4 w-4" />
            Create Story
          </Link>
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
                <Link to="/a/account-settings" className="cursor-pointer flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/" className="cursor-pointer flex items-center text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default LoggedInMenu;
