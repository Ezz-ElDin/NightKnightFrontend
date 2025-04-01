
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Star, Globe, Sparkles, Rocket, FlowerIcon, ImageIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";

const StorySamples = () => {
  // State to track which images have failed to load
  const [failedImages, setFailedImages] = useState<{[key: string]: boolean}>({});

  const stories = [
    {
      title: "The Dragon's Treasure",
      excerpt: "Once upon a time, there was a friendly green dragon named Spark who lived in a colorful mountain cave. Spark collected magical treasures that brought joy to the children in the nearby village...",
      theme: "Adventure",
      language: "English",
      imageUrl: "/images/dragon-treasure.png",
      icon: <BookOpen className="h-5 w-5 text-story-orange" />
    },
    {
      title: "Les Chatons de la Lune",
      excerpt: "Luna se préparait à se coucher quand elle remarqua quelque chose de magique - cinq chatons moelleux jouant avec une pelote de laine sur son rebord de fenêtre! Ils brillaient au clair de lune et invitèrent Luna à rejoindre leurs aventures nocturnes...",
      theme: "Fantaisie",
      language: "Français",
      imageUrl: "/images/moon-kittens.png",
      icon: <Sparkles className="h-5 w-5 text-story-orange" />
    },
    {
      title: "Kapitän Leos Weltraumreise",
      excerpt: "Kapitän Leo und sein treuer Roboterfreund Beep bereiteten sich auf ihr bisher größtes Abenteuer vor. Sie bestiegen ihr Raumschiff, um die Sterne zu erforschen und neue Planeten jenseits unserer Galaxie zu entdecken...",
      theme: "Weltraum",
      language: "Deutsch",
      imageUrl: "/images/space-journey.png",
      icon: <Rocket className="h-5 w-5 text-story-orange" />
    },
    {
      title: "El Jardín Mágico",
      excerpt: "En el patio trasero de Sophie había una pequeña puerta que conducía a un jardín encantado. Flores hermosas florecían en todos los colores, mariposas con alas brillantes revoloteaban, y pequeñas hadas cuidaban de las plantas mágicas...",
      theme: "Magia",
      language: "Español",
      imageUrl: "/images/magic-garden.png",
      icon: <FlowerIcon className="h-5 w-5 text-story-orange" />
    }
  ];

  // Add console logs to debug image loading
  console.log("Image paths:", stories.map(story => story.imageUrl));

  const handleImageError = (imageUrl: string) => {
    console.error(`Error loading image: ${imageUrl}`);
    setFailedImages(prev => ({...prev, [imageUrl]: true}));
  };

  return (
    <section className="py-16 px-4 bg-story-lightPurple/30" id="samples">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-story-purple">
          Magical Story Samples
        </h2>
        
        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {stories.map((story, index) => (
              <CarouselItem key={index}>
                <div className="p-4">
                  <Card className="overflow-hidden border-none shadow-xl rounded-3xl">
                    <div className="flex flex-col md:flex-row">
                      {/* Left side - Text content (book page) */}
                      <div className="w-full md:w-1/2 bg-gradient-to-br from-white to-story-peach p-6 md:p-8 border-r border-story-lightPurple/50 relative">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-story-lightPurple/20 rounded-bl-3xl"></div>
                        <div className="mb-6 flex items-center justify-between">
                          <h3 className="text-2xl font-bold text-story-purple">{story.title}</h3>
                          <div className="bg-white p-2 rounded-full shadow-md">
                            {story.icon}
                          </div>
                        </div>
                        
                        <p className="text-lg mb-6 leading-relaxed">{story.excerpt}</p>
                        
                        <div className="flex items-center mt-auto">
                          <div className="flex text-amber-400">
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                          </div>
                          <div className="ml-auto flex gap-2">
                            <span className="px-3 py-1 bg-story-green text-green-700 rounded-full text-xs font-semibold">
                              {story.theme}
                            </span>
                            <span className="px-3 py-1 bg-story-pink text-story-purple rounded-full text-xs font-semibold flex items-center">
                              <Globe className="h-3 w-3 mr-1" /> {story.language}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right side - Image */}
                      <div className="w-full md:w-1/2 bg-white relative">
                        <AspectRatio ratio={3/4} className="h-full">
                          {failedImages[story.imageUrl] ? (
                            <div className="flex flex-col items-center justify-center h-full bg-story-lightPurple/10 rounded-b-3xl md:rounded-l-none md:rounded-r-3xl">
                              <ImageIcon className="h-16 w-16 text-story-purple/50 mb-2" />
                              <p className="text-sm text-story-purple/70">Image not available</p>
                              <p className="text-xs text-story-purple/60 mt-1">Upload to: {story.imageUrl}</p>
                            </div>
                          ) : (
                            <img 
                              src={story.imageUrl} 
                              alt={story.title} 
                              className="object-cover h-full w-full rounded-b-3xl md:rounded-l-none md:rounded-r-3xl"
                              onError={() => handleImageError(story.imageUrl)}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-b-3xl md:rounded-l-none md:rounded-r-3xl"></div>
                        </AspectRatio>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 lg:-left-12 bg-white text-story-purple border-story-purple hover:bg-story-lightPurple" />
          <CarouselNext className="right-0 lg:-right-12 bg-white text-story-purple border-story-purple hover:bg-story-lightPurple" />
        </Carousel>
      </div>
    </section>
  );
};

export default StorySamples;
