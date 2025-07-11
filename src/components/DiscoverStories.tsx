
import { useState } from "react";
import StoryCard from "@/components/dashboard/StoryCard";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import StoryText from "@/components/story-viewer/StoryText";
import StoryVisual from "@/components/story-viewer/StoryVisual";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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
              
              <DialogContent className="max-w-2xl w-[45vw] max-h-[60vh] p-0 overflow-hidden border-0 bg-transparent shadow-2xl rounded-3xl">
                {selectedStory && (
                  <div className="h-full w-full flex flex-col bg-white relative rounded-3xl overflow-hidden">
                    {/* Custom Close Button - Only one, positioned properly */}
                    <button
                      onClick={handleCloseDialog}
                      className="absolute top-4 right-4 z-50 rounded-full opacity-70 ring-offset-background transition-all duration-200 hover:opacity-100 hover:scale-110 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 h-10 w-10 flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-md"
                    >
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </button>

                    {/* Story content with consistent design */}
                    <div className="flex-1 flex h-full min-h-[400px] rounded-3xl overflow-hidden">
                      {/* Text Section */}
                      <div className="flex-1 flex bg-white">
                        <div className="flex-1 flex flex-col min-h-[340px] px-6 py-8 gap-0 justify-center items-start">
                          {currentPage === 0 ? (
                            <h3 className="font-bold text-3xl mb-0 w-full text-left leading-tight text-gray-900">
                              {selectedStory.title}
                            </h3>
                          ) : (
                            <div className="w-full space-y-4">
                              <p className="text-base leading-relaxed font-medium text-gray-800">
                                {selectedStory.pages[currentPage - 1]?.text || ""}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Image Section */}
                      <div className="flex-1 flex">
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
                    </div>
                    
                    {/* Navigation - Consistent design throughout */}
                    <div className="flex justify-between items-center p-6 bg-white border-t border-gray-100 shrink-0 rounded-b-3xl">
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
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

// Custom story card component for discover section
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
