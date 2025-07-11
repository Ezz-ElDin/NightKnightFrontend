import { useState } from "react";
import StoryCard from "@/components/dashboard/StoryCard";
import DesktopDiscoverStoryViewer from "@/components/story-viewer/DesktopDiscoverStoryViewer";
import MobileDiscoverStoryViewer from "@/components/story-viewer/MobileDiscoverStoryViewer";
import { useDiscoverStoryViewer } from "@/hooks/useDiscoverStoryViewer";

const DiscoverStories = () => {
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    page,
    setPage,
    numPages,
    currentPage,
    canPrev,
    canNext,
    isMobile,
  } = useDiscoverStoryViewer(selectedStory);

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
          text: "One day, a little girl named Emma discovered Spark's secret cave while picking berries. Instead of being scared, she was amazed by all the glittering treasures. Spark welcomed her warmly and showed her his collection of dream crystals, magic books, and rainbow gems. The cave was filled with the most wonderful treasures Emma had ever seen. There were floating lanterns that glowed with soft, warm light, casting dancing shadows on the cave walls. Ancient books with golden pages told stories of faraway lands and brave adventures. Crystal formations jutted from the ceiling, each one singing a different musical note when the wind passed through them. Emma gasped in wonder as she saw a collection of bottled starlight that Spark had gathered from shooting stars over many years. Each bottle contained swirling galaxies of silver and gold, twinkling like tiny universes. There were also magical mirrors that showed not your reflection, but your deepest dreams and wishes. Emma saw herself flying through clouds on the back of a magnificent phoenix, exploring underwater kingdoms with mermaids, and dancing with fairies in moonlit gardens. Spark explained that each treasure had been given to him by children who had grown up and no longer needed their childhood magic. But instead of letting the magic fade away, Spark kept it safe in his cave, where it could continue to bring wonder and joy to new generations of children.",
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
    setIsDialogOpen(true);
    setPage(0); // Reset to title page
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedStory(null);
    setPage(0);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-story-lightPurple/30 to-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-story-purple">
          Discover Magical Stories
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sampleStories.map(story => (
            <div key={story.id} onClick={() => handleStoryClick(story)}>
              <DiscoverStoryCard story={story} />
            </div>
          ))}
        </div>

        {/* Conditional Story Viewer */}
        {isDialogOpen && selectedStory && (
          isMobile ? (
            <MobileDiscoverStoryViewer
              story={selectedStory}
              onClose={handleCloseDialog}
            />
          ) : (
            <DesktopDiscoverStoryViewer
              story={selectedStory}
              page={page}
              setPage={setPage}
              numPages={numPages}
              currentPage={currentPage}
              canPrev={canPrev}
              canNext={canNext}
              onClose={handleCloseDialog}
            />
          )
        )}
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
