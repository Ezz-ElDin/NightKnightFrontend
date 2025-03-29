
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Star } from "lucide-react";

const StorySamples = () => {
  const stories = [
    {
      title: "The Dragon's Treasure",
      excerpt: "Once upon a time, there was a friendly dragon named Spark who lived in a colorful cave. Spark had a collection of magical treasures that made children's dreams come true...",
      theme: "Adventure"
    },
    {
      title: "Luna and the Moon Kittens",
      excerpt: "Luna was getting ready for bed when she noticed something strange outside her window. Five fluffy kittens were dancing on a moonbeam! They waved to Luna and invited her to play...",
      theme: "Fantasy"
    },
    {
      title: "Captain Leo's Space Journey",
      excerpt: "Captain Leo and his trusty robot friend Beep were preparing for their biggest adventure yet. They were going to visit the Cookie Planet, where mountains were made of chocolate chips...",
      theme: "Space"
    },
    {
      title: "The Magical Garden",
      excerpt: "In Sophie's backyard was a tiny door that nobody else could see. When she opened it, she discovered a garden where flowers sang lullabies and friendly butterflies granted wishes...",
      theme: "Magic"
    }
  ];

  return (
    <section className="py-16 px-4 bg-story-lightPurple/30" id="samples">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-story-purple">
          Magical Story Samples
        </h2>
        
        <Carousel className="max-w-4xl mx-auto">
          <CarouselContent>
            {stories.map((story, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="border-2 border-story-lightPurple rounded-3xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-story-purple/20 to-story-blue/20 pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold text-story-purple">{story.title}</CardTitle>
                        <div className="bg-white p-2 rounded-full">
                          <BookOpen className="h-5 w-5 text-story-orange" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-lg mb-4">{story.excerpt}</p>
                      <div className="flex items-center mt-4">
                        <div className="text-story-yellow">
                          <Star className="h-5 w-5 inline-block" fill="currentColor" />
                          <Star className="h-5 w-5 inline-block" fill="currentColor" />
                          <Star className="h-5 w-5 inline-block" fill="currentColor" />
                          <Star className="h-5 w-5 inline-block" fill="currentColor" />
                          <Star className="h-5 w-5 inline-block" fill="currentColor" />
                        </div>
                        <span className="ml-auto px-3 py-1 bg-story-green text-green-700 rounded-full text-xs font-semibold">
                          {story.theme}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 bg-white text-story-purple border-story-purple hover:bg-story-lightPurple" />
          <CarouselNext className="right-0 bg-white text-story-purple border-story-purple hover:bg-story-lightPurple" />
        </Carousel>
      </div>
    </section>
  );
};

export default StorySamples;
