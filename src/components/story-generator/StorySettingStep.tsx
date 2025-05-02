
import React from "react";
import { cn } from "@/lib/utils";

interface StorySettingStepProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const StorySettingStep: React.FC<StorySettingStepProps> = ({ 
  title, 
  description, 
  icon,
  children,
  className
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-3 animate-fade-in">
        {icon}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary font-ghibli">{title}</h2>
          {description && (
            <p className="text-muted-foreground font-ghibli">{description}</p>
          )}
        </div>
      </div>
      
      <div className="mt-6 animate-fade-in font-ghibli">
        {children}
      </div>
    </div>
  );
};
