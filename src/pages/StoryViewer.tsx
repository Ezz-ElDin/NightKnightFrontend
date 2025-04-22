
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import StoryPage from "@/components/story-viewer/StoryPage";

// Sample story data (in a real app, this would come from the backend)
const sampleStoryPages = [
  {
    id: "page-1",
    content: "Once upon a time, in a magical forest, there lived a small dragon named Ember.",
    image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png",
  },
  {
    id: "page-2",
    content: "Ember had a special gift. He could make beautiful rainbow flames that never burned anything.",
    image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png",
  },
  {
    id: "page-3",
    content: "One day, Ember met a little girl named Lily who was lost in the forest.",
    image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png",
  },
  {
    id: "page-4",
    content: "Ember used his rainbow flames to light the way and help Lily find her way home.",
    image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png",
  },
  {
    id: "page-5",
    content: "Lily was so grateful that she brought Ember back to meet her family.",
    image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png",
  },
  {
    id: "page-6",
    content: "From that day on, Ember and Lily became the best of friends, and Ember learned that his gift could bring joy to many.",
    image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png",
  },
];

interface PageRating {
  pageId: string;
  rating: 'up' | 'down' | null;
}

const StoryViewer = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // In a real app, we would get the story data from the location state or an API
  const storyData = state?.storyData || {
    title: "Ember's Rainbow Adventure",
    language: "English",
    pages: sampleStoryPages,
  };
  
  const [pageRatings, setPageRatings] = useState<PageRating[]>([]);
  const isRtl = storyData.language === "Arabic";
  
  useEffect(() => {
    // Initialize page ratings
    const initialRatings = storyData.pages.map(page => ({
      pageId: page.id,
      rating: null as 'up' | 'down' | null
    }));
    setPageRatings(initialRatings);
  }, [storyData.pages]);
  
  const handleRating = (pageId: string, rating: 'up' | 'down') => {
    setPageRatings(prevRatings => 
      prevRatings.map(pr => 
        pr.pageId === pageId ? { ...pr, rating } : pr
      )
    );
    
    // In a real app, we would send this rating to the backend
    toast({
      title: rating === 'up' ? "Thank you for your feedback!" : "Thanks for your feedback",
      description: "Your rating helps us improve our stories.",
      duration: 3000,
    });
  };
  
  const goBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={goBack}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold text-primary">{storyData.title}</h1>
      </div>
      
      <div className={cn("story-book-container relative", isRtl && "rtl")}>
        <Carousel
          className="w-full"
          dir={isRtl ? "rtl" : "ltr"}
        >
          <CarouselContent>
            {storyData.pages.map((page, index) => (
              <CarouselItem key={page.id} className="md:basis-1/1">
                <StoryPage
                  content={page.content}
                  image={page.image}
                  pageNumber={index + 1}
                  totalPages={storyData.pages.length}
                  pageId={page.id}
                  rating={pageRatings.find(pr => pr.pageId === page.id)?.rating || null}
                  onRate={handleRating}
                  isRtl={isRtl}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={cn("left-2 lg:-left-12")} />
          <CarouselNext className={cn("right-2 lg:-right-12")} />
        </Carousel>
      </div>
    </div>
  );
};

export default StoryViewer;
