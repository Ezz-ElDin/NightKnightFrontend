
import { Link } from "react-router-dom";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface StoryCreditSectionProps {
  storyCredits: number;
}

const StoryCreditSection: React.FC<StoryCreditSectionProps> = ({ 
  storyCredits 
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
        <Link to="/account-settings?tab=credits" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-story-purple hover:bg-story-purple/90 text-white gap-2 px-3 md:px-4 py-2 rounded-full text-sm">
            <CreditCard className="h-3 w-3 md:h-4 md:w-4" />
            Buy Credits
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default StoryCreditSection;
