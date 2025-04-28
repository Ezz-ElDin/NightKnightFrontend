
import React from 'react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import StoryPage from "@/components/story-viewer/StoryPage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface StorySample {
  title: string;
  theme: string;
  language: string;
  pages: {
    id: string;
    content: string;
    image: string;
  }[];
  bgColor: string;
}

interface WaitingListStorySampleProps {
  story: StorySample;
}

const WaitingListStorySample: React.FC<WaitingListStorySampleProps> = ({ story }) => {
  const [currentRatings, setCurrentRatings] = React.useState<Record<string, 'up' | 'down' | null>>({});

  const handleRating = (pageId: string, rating: 'up' | 'down') => {
    setCurrentRatings(prev => ({
      ...prev,
      [pageId]: rating
    }));
  };

  return (
    <Card className="overflow-hidden border-none shadow-xl rounded-3xl">
      <div className={cn(`h-24 ${story.bgColor} p-6`)}>
        <h3 className="text-2xl font-bold text-story-purple">{story.title}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="px-3 py-1 bg-story-green/30 text-story-forest rounded-full text-xs font-semibold">
            {story.theme}
          </span>
          <span className="px-3 py-1 bg-story-pink/30 text-story-purple rounded-full text-xs font-semibold">
            {story.language}
          </span>
        </div>
      </div>

      <div className="p-4 bg-white">
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {story.pages.map((page, index) => (
              <CarouselItem key={page.id}>
                <StoryPage
                  content={page.content}
                  image={page.image}
                  pageNumber={index + 1}
                  totalPages={story.pages.length}
                  pageId={page.id}
                  rating={currentRatings[page.id] || null}
                  onRate={handleRating}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center mt-4">
            <CarouselPrevious className="relative static translate-y-0 mr-2" />
            <CarouselNext className="relative static translate-y-0 ml-2" />
          </div>
        </Carousel>
      </div>
    </Card>
  );
};

export default WaitingListStorySample;
