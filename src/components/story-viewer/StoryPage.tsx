
import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StoryPageProps {
  content: string;
  image: string | null;
  pageNumber: number;
  totalPages: number;
  pageId: string;
  rating: 'up' | 'down' | null;
  onRate: (pageId: string, rating: 'up' | 'down') => void;
  isRtl?: boolean;
}

const StoryPage: React.FC<StoryPageProps> = ({
  content,
  image,
  pageNumber,
  totalPages,
  pageId,
  rating,
  onRate,
  isRtl = false
}) => {
  return (
    <div className="story-page ghibli-card p-8 min-h-[70vh] flex flex-col">
      <div className="page-number text-center text-sm text-muted-foreground mb-4">
        Page {pageNumber} of {totalPages}
      </div>
      
      <div className={cn(
        "flex-1 flex items-stretch gap-8",
        isRtl ? "flex-row-reverse" : "flex-row"
      )}>
        {/* Text Section */}
        <div className={cn(
          "flex-1 flex flex-col justify-center",
          isRtl ? "text-right" : "text-left"
        )}>
          <p className="text-xl leading-relaxed font-ghibli">
            {content}
          </p>
          
          <div className={cn(
            "flex mt-6 gap-6",
            isRtl ? "justify-start" : "justify-end"
          )}>
            <button 
              onClick={() => onRate(pageId, 'up')}
              className={cn(
                "rating-btn text-muted-foreground hover:text-primary transition-colors", 
                rating === 'up' && "text-green-500 hover:text-green-600"
              )}
              aria-label="Like this page"
            >
              <ThumbsUp className="h-5 w-5" />
            </button>
            <button 
              onClick={() => onRate(pageId, 'down')}
              className={cn(
                "rating-btn text-muted-foreground hover:text-primary transition-colors", 
                rating === 'down' && "text-red-500 hover:text-red-600"
              )}
              aria-label="Dislike this page"
            >
              <ThumbsDown className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Image Section */}
        {image && (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md">
              <img 
                src={image} 
                alt={`Illustration for page ${pageNumber}`}
                className="rounded-xl shadow-md w-full object-cover aspect-[3/4]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryPage;
