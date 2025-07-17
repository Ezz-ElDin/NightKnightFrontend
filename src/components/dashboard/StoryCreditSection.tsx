
import { Link } from "react-router-dom";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StoryCreditSectionProps {
  storyCredits: number;
  isGenerating?: boolean;
}

const StoryCreditSection: React.FC<StoryCreditSectionProps> = ({ 
  storyCredits,
  isGenerating = false 
}) => {
  return (
    <Card className="mb-6 md:mb-8 p-3 md:p-4 bg-gradient-to-r from-story-lightPurple/20 to-story-seafoam/20 border border-story-lightPurple/30">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-bold text-story-purple mb-1">Story Credits</h3>
          <p className="text-xs md:text-sm text-gray-600">
            <span className="font-bold text-story-purple text-sm md:text-base">{storyCredits}</span> credits remaining
          </p>
        </div>
        
        {!isGenerating ? (
          <Link to="/account-settings?tab=credits" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-story-purple hover:bg-story-purple/90 text-white gap-2 px-3 md:px-4 py-2 rounded-full text-sm">
              <CreditCard className="h-3 w-3 md:h-4 md:w-4" />
              Buy Credits
            </Button>
          </Link>
        ) : (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-block w-full sm:w-auto">
                  <Button 
                    disabled 
                    className="w-full sm:w-auto bg-gray-300 text-gray-500 gap-2 px-3 md:px-4 py-2 rounded-full text-sm cursor-not-allowed"
                  >
                    <CreditCard className="h-3 w-3 md:h-4 md:w-4" />
                    Buy Credits
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm">
                <p>Please wait for your current story to finish generating</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </Card>
  );
};

export default StoryCreditSection;
