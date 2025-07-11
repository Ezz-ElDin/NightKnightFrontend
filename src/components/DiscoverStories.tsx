import { useState } from "react";
import StoryCard from "@/components/dashboard/StoryCard";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

const DiscoverStories = () => {
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const sampleStories = [
    {
      id: 1,
      title: "The Dragon's Treasure",
      coverUrl: "/images/dragon-treasure.png",
      createdAt: "2024-01-15",
      language: "English",
      genre: "Fantasy",
      pages: [
        {
          id: "1",
          text: "Once upon a time, there was a friendly green dragon named Spark who lived in a colorful mountain cave. Spark collected magical treasures that brought joy to the children in the nearby village. Every evening, Spark would fly over the village, sprinkling golden dust that made beautiful dreams come true.",
          image: "/images/dragon-treasure.png"
        },
        {
          id: "2", 
          text: "One day, a little girl named Emma discovered Spark's secret cave while picking berries. Instead of being scared, she was amazed by all the glittering treasures. Spark welcomed her warmly and showed her his collection of dream crystals, magic books, and rainbow gems.",
          image: "/images/dragon-treasure.png"
        },
        {
          id: "3",
          text: "Emma and Spark became the best of friends. Together, they would create magical adventures for all the children in the village, spreading joy and wonder wherever they went. And they all lived happily ever after, sharing dreams and treasures for years to come.",
          image: "/images/dragon-treasure.png"
        }
      ]
    },
    {
      id: 2,
      title: "Les Chatons de la Lune",
      coverUrl: "/images/moon-kittens.png",
      createdAt: "2024-01-20",
      language: "French",
      genre: "Adventure",
      pages: [
        {
          id: "1",
          text: "Luna se préparait à se coucher quand elle remarqua quelque chose de magique - cinq chatons moelleux jouant avec une pelote de laine sur son rebord de fenêtre! Ils brillaient au clair de lune et invitèrent Luna à rejoindre leurs aventures nocturnes.",
          image: "/images/moon-kittens.png"
        },
        {
          id: "2",
          text: "Les chatons lunaires emmenèrent Luna dans un voyage extraordinaire à travers les nuages. Ils visitèrent le royaume des rêves où les étoiles dansaient et où la lune chantait des berceuses douces pour tous les enfants du monde.",
          image: "/images/moon-kittens.png"
        },
        {
          id: "3",
          text: "Avant l'aube, les chatons ramenèrent Luna dans son lit. Elle s'endormit avec un sourire, sachant que ses nouveaux amis magiques reviendraient la voir chaque nuit de pleine lune pour de nouvelles aventures merveilleuses.",
          image: "/images/moon-kittens.png"
        }
      ]
    },
    {
      id: 3,
      title: "Captain Leo's Space Journey",
      coverUrl: "/images/space-journey.png",
      createdAt: "2024-01-25",
      language: "English",
      genre: "Sci-Fi",
      pages: [
        {
          id: "1",
          text: "Captain Leo and his trusty robot friend Beep were preparing for their greatest adventure yet! They climbed aboard their shiny new spaceship, ready to fly among the stars and discover worlds no one had ever seen before.",
          image: "/images/space-journey.png"
        },
        {
          id: "2",
          text: "Their first stop was a planet made entirely of rainbow crystals. The friendly alien creatures there taught Leo and Beep how to surf on shooting stars and play cosmic hide-and-seek among the colorful crystal formations.",
          image: "/images/space-journey.png"
        },
        {
          id: "3",
          text: "After collecting stardust souvenirs and making new galactic friends, Leo and Beep returned home with hearts full of wonder. They promised to return soon for more space adventures, knowing the universe was full of magical surprises waiting to be discovered.",
          image: "/images/space-journey.png"
        }
      ]
    }
  ];

  const handleStoryClick = (story: any) => {
    setSelectedStory(story);
    setCurrentPage(0);
    setIsDialogOpen(true);
  };

  const handleNextPage = () => {
    if (selectedStory && currentPage < selectedStory.pages.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedStory(null);
    setCurrentPage(0);
  };

  // Handle tap zones for Instagram-style navigation
  const handleLeftTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    handlePrevPage();
  };

  const handleRightTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleNextPage();
  };

  const formatTextWithLineBreaks = (text: string) => {
    if (!text) return [];
    
    // Split by periods, exclamation marks, and question marks while keeping the punctuation
    const sentences = text.split(/([.!?]+)/).filter(part => part.trim() !== "");
    
    // Combine punctuation back with sentences
    const formattedSentences = [];
    for (let i = 0; i < sentences.length; i += 2) {
      const sentence = sentences[i]?.trim();
      const punctuation = sentences[i + 1] || "";
      if (sentence) {
        formattedSentences.push(sentence + punctuation);
      }
    }
    
    return formattedSentences;
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-story-lightPurple/30 to-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-story-purple">
          Discover Magical Stories
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sampleStories.map(story => (
            <Dialog key={story.id} open={isDialogOpen && selectedStory?.id === story.id} onOpenChange={(open) => {
              if (!open) {
                handleCloseDialog();
              }
            }}>
              <DialogTrigger asChild>
                <div onClick={() => handleStoryClick(story)}>
                  <DiscoverStoryCard story={story} />
                </div>
              </DialogTrigger>
              
              <DialogPortal>
                <DialogOverlay />
                <DialogPrimitive.Content
                  className={cn(
                    "fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl w-[90vw] max-h-[85vh] translate-x-[-50%] translate-y-[-50%] p-0 overflow-hidden border-0 bg-transparent shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-3xl"
                  )}
                >
                  {selectedStory && (
                    <div className="h-full w-full flex flex-col bg-white relative rounded-3xl overflow-hidden">
                      {/* Single Close Button */}
                      <button
                        onClick={handleCloseDialog}
                        className="absolute top-4 right-4 z-50 rounded-full opacity-70 ring-offset-background transition-all duration-200 hover:opacity-100 hover:scale-110 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 h-10 w-10 flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-md"
                      >
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                      </button>

                      {/* Mobile Navigation Arrows - Smaller and more subtle */}
                      <div className="md:hidden absolute top-1/2 left-2 right-2 flex justify-between items-center z-40 pointer-events-none">
                        <Button
                          variant="outline"
                          onClick={handlePrevPage}
                          disabled={currentPage === 0}
                          className="pointer-events-auto rounded-full w-8 h-8 bg-white/70 backdrop-blur-sm shadow-sm border-0 hover:bg-white/90 hover:scale-105 transition-all duration-200 opacity-60 hover:opacity-100"
                          size="icon"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          onClick={handleNextPage}
                          disabled={currentPage === selectedStory.pages.length}
                          className="pointer-events-auto rounded-full w-8 h-8 bg-white/70 backdrop-blur-sm shadow-sm border-0 hover:bg-white/90 hover:scale-105 transition-all duration-200 opacity-60 hover:opacity-100"
                          size="icon"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Instagram-style tap zones - Only on mobile */}
                      <div className="md:hidden absolute inset-0 z-30 flex">
                        {/* Left tap zone */}
                        <div 
                          className="w-1/3 h-full cursor-pointer"
                          onClick={handleLeftTap}
                        />
                        {/* Middle zone - no action */}
                        <div className="w-1/3 h-full" />
                        {/* Right tap zone */}
                        <div 
                          className="w-1/3 h-full cursor-pointer"
                          onClick={handleRightTap}
                        />
                      </div>

                      {/* Story content - Fixed height container */}
                      <div className="flex-1 flex h-full min-h-[500px] max-h-[85vh] rounded-3xl overflow-hidden">
                        {/* Mobile Layout - Image at top (60%), text at bottom (40%), side-by-side on desktop */}
                        <div className="flex-1 flex flex-col md:flex-row bg-white h-full">
                          {/* Image Section - Top 60% on mobile, Right 50% on desktop */}
                          <div className="h-[60%] md:h-full flex-1 flex order-1 md:order-2">
                            <div className="w-full h-full bg-[#fafafd] flex items-center justify-center p-0 m-0">
                              <div className="relative w-full h-full flex items-center justify-center bg-[#e8eafd] overflow-hidden">
                                <img
                                  src={currentPage === 0 ? selectedStory.coverUrl : selectedStory.pages[currentPage - 1]?.image || selectedStory.coverUrl}
                                  alt={"Illustration for " + selectedStory.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Text Section - Bottom 40% on mobile with fixed height and scroll, Left 50% on desktop */}
                          <div className="h-[40%] md:h-full flex-1 flex bg-white order-2 md:order-1 min-h-0">
                            <div className="flex-1 flex flex-col px-4 md:px-10 py-4 md:py-10 gap-0 min-h-0 h-full">
                              {currentPage === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                  <h3 className="font-ghibli text-2xl md:text-5xl font-bold mb-0 w-full text-center leading-tight">
                                    {selectedStory.title}
                                  </h3>
                                </div>
                              ) : (
                                <div className="w-full flex flex-col justify-center h-full min-h-0">
                                  <div className="space-y-3 md:space-y-6 overflow-y-auto flex-1 min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                                    {formatTextWithLineBreaks(selectedStory.pages[currentPage - 1]?.text || "").map((sentence, index) => (
                                      <p 
                                        key={index} 
                                        className="text-base md:text-xl leading-relaxed font-medium text-gray-800 text-center md:text-left"
                                        style={{ wordBreak: "break-word" }}
                                      >
                                        {sentence}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Navigation - Hidden on mobile, visible on desktop */}
                      <div className="hidden md:flex justify-between items-center p-6 bg-white border-t border-gray-100 shrink-0 rounded-b-3xl">
                        <Button
                          variant="outline"
                          onClick={handlePrevPage}
                          disabled={currentPage === 0}
                          className="flex items-center gap-2 px-6 py-2 rounded-full"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>
                        
                        <span className="text-sm text-gray-600 font-medium">
                          Page {currentPage + 1} of {selectedStory.pages.length + 1}
                        </span>
                        
                        <Button
                          variant="outline"
                          onClick={handleNextPage}
                          disabled={currentPage === selectedStory.pages.length}
                          className="flex items-center gap-2 px-6 py-2 rounded-full"
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogPrimitive.Content>
              </DialogPortal>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

const DiscoverStoryCard = ({ story }: { story: any }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-story-seafoam/30 flex flex-col relative group hover:shadow-lg transition-shadow min-h-[305px] cursor-pointer">
      <div className="h-48 bg-gradient-to-br from-story-lightPurple/20 to-story-peach/20 flex items-center justify-center overflow-hidden">
        {story.coverUrl ? (
          <img 
            src={story.coverUrl} 
            alt={story.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-story-lightPurple/40 to-story-peach/40 flex items-center justify-center">
            <span className="text-story-purple/60 text-sm">No Image</span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg line-clamp-2 mb-3 text-story-purple">
          {story.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-story-blue/10 text-story-blue">
            {story.language}
          </span>
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-story-purple/10 text-story-purple">
            {story.genre}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DiscoverStories;
