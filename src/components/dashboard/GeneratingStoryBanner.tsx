
import React from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface GeneratingStoryBannerProps {
  onDismiss?: () => void;
}

const GeneratingStoryBanner: React.FC<GeneratingStoryBannerProps> = ({ onDismiss }) => {
  return (
    <Card className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 text-purple-600 animate-spin" />
            <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
          </div>
          <div>
            <h3 className="font-semibold text-purple-800">Your story is being generated! ✨</h3>
            <p className="text-sm text-purple-600">Check back in a few minutes to see your magical story come to life.</p>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-purple-400 hover:text-purple-600 transition-colors text-sm font-medium"
          >
            Dismiss
          </button>
        )}
      </div>
    </Card>
  );
};

export default GeneratingStoryBanner;
