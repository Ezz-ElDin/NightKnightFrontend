
import React from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface GeneratingStoryCardProps {
  title?: string;
}

const GeneratingStoryCard: React.FC<GeneratingStoryCardProps> = ({ title = "Generating Story..." }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-story-seafoam/30 flex flex-col relative group min-h-[305px]">
      {/* Animated cover placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
            <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 mx-auto bg-purple-200/50" />
            <Skeleton className="h-3 w-16 mx-auto bg-purple-200/30" />
          </div>
        </div>
        
        {/* Animated sparkles */}
        <div className="absolute top-4 left-4 opacity-30">
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
        </div>
        <div className="absolute top-8 right-6 opacity-30">
          <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-6 left-8 opacity-30">
          <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Content section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-700 text-sm">{title}</h3>
            <Loader2 className="h-4 w-4 text-purple-500 animate-spin" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-full bg-gray-200" />
            <Skeleton className="h-3 w-3/4 bg-gray-200" />
          </div>
        </div>
        
        <div className="mt-3 text-xs text-purple-600 font-medium">
          Creating your magical story...
        </div>
      </div>
    </div>
  );
};

export default GeneratingStoryCard;
