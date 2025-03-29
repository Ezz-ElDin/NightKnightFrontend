
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Star, Globe } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const StorySamples = () => {
  const stories = [
    {
      title: "The Dragon's Treasure",
      excerpt: "Once upon a time, there was a friendly dragon named Spark who lived in a colourful cave. Spark had a collection of magical treasures that made children's dreams come true...",
      theme: "Adventure",
      language: "English",
      imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&auto=format&fit=crop"
    },
    {
      title: "Luna and the Moon Kittens",
      excerpt: "Luna was getting ready for bed when she noticed something strange outside her window. Five fluffy kittens were dancing on a moonbeam! They waved to Luna and invited her to play...",
      theme: "Fantasy",
      language: "English",
      imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&auto=format&fit=crop"
    },
    {
      title: "Captain Leo's Space Journey",
      excerpt: "Captain Leo and his trusty robot friend Beep were preparing for their biggest adventure yet. They were going to visit the Cookie Planet, where mountains were made of chocolate chips...",
      theme: "Space",
      language: "French",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop"
    },
    {
      title: "The Magical Garden",
      excerpt: "In Sophie's backyard was a tiny door that nobody else could see. When she opened it, she discovered a garden where flowers sang lullabies and friendly butterflies granted wishes...",
      theme: "Magic",
      language: "Spanish",
      imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop"
    }
  ];

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
                            <BookOpen className="h-5 w-5 text-story-orange" />
                          </div>
                        </div>
                        
                        <p className="text-lg mb-6 leading-relaxed">{story.excerpt}</p>
                        
                        <div className="flex items-center mt-auto">
                          <div className="text-story-yellow">
                            <Star className="h-5 w-5 inline-block" fill="currentColor" />
                            <Star className="h-5 w-5 inline-block" fill="currentColor" />
                            <Star className="h-5 w-5 inline-block" fill="currentColor" />
                            <Star className="h-5 w-5 inline-block" fill="currentColor" />
                            <Star className="h-5 w-5 inline-block" fill="currentColor" />
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
                          <img 
                            src={story.imageUrl} 
                            alt={story.title} 
                            className="object-cover h-full w-full rounded-b-3xl md:rounded-l-none md:rounded-r-3xl"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-b-3xl md:rounded-l-none md:rounded-r-3xl"></div>
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
