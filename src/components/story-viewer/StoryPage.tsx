
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
}

const StoryPage: React.FC<StoryPageProps> = ({
  content,
  image,
  pageNumber,
  totalPages,
  pageId,
  rating,
  onRate
}) => {
  return (
    <div className="story-page ghibli-card p-8 min-h-[70vh] flex flex-col justify-between">
      <div className="page-number text-center text-sm text-muted-foreground mb-2">
        Page {pageNumber} of {totalPages}
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        {image && (
          <div className="w-full max-w-md mx-auto">
            <img 
              src={image} 
              alt={`Illustration for page ${pageNumber}`}
              className="rounded-xl shadow-md w-full object-cover aspect-[4/3]"
            />
          </div>
        )}
        
        <p className="text-xl mt-4 text-center leading-relaxed font-ghibli">
          {content}
        </p>
      </div>
      
      <div className="flex justify-center mt-6 gap-8">
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
  );
};

export default StoryPage;
