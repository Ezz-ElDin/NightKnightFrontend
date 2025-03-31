
import React from "react";
import { Book, Star } from "lucide-react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

type IconType = "Book" | "Star";

interface ListItemProps {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
  icon?: IconType;
}

const ListItem = ({ 
  className, 
  title, 
  children, 
  href,
  icon = "Book"
}: ListItemProps) => {
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
            <Star className="h-5 w-5 text-amber-400 mb-2" fill="currentColor" />
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

export default ListItem;
