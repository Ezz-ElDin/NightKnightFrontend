
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, BookOpen, Globe, BookImage } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useTranslation } from 'react-i18next';

interface ArabicSampleTexts {
  title: string;
  description: string;
  genre: string;
  language: string;
}

interface WaitingListStorySamplesProps {
  arabicSampleTexts?: ArabicSampleTexts;
}

const WaitingListStorySamples = ({ arabicSampleTexts }: WaitingListStorySamplesProps) => {
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.dir() === 'rtl';
  
  const stories = [
    {
      title: "The Dragon's Treasure",
      theme: "Adventure",
      language: "English",
      excerpt: "Once upon a time, there was a friendly green dragon named Spark who lived in a colorful mountain cave. Spark collected magical treasures that brought joy to the children in the nearby village...",
      color: "bg-story-yellow/20",
      borderColor: "border-story-orange",
      icon: <Book className="h-5 w-5 text-story-orange" />,
      image: "/images/dragon-treasure.png"
    },
    {
      title: "Les Chatons de la Lune",
      theme: "Fantaisie",
      language: "Français",
      excerpt: "Luna se préparait à se coucher quand elle remarqua quelque chose de magique - cinq chatons moelleux jouant avec une pelote de laine sur son rebord de fenêtre...",
      color: "bg-story-lightPurple/20",
      borderColor: "border-story-purple",
      icon: <BookOpen className="h-5 w-5 text-story-purple" />,
      image: "/images/moon-kittens.png"
    },
    {
      title: arabicSampleTexts?.title || "مغامرة القائد ليو في الفضاء",
      theme: arabicSampleTexts?.genre || "خيال علمي",
      language: arabicSampleTexts?.language || "عربي",
      excerpt: arabicSampleTexts?.description || "القائد ليو وصاحبه الروبوت اللطيف بيب كانوا مستعدين لأعظم مغامرة في حياتهم! ركبوا سفينتهم الفضائية الجديدة، ومستنيين اللحظة اللي هيطيروا فيها وسط النجوم ويكتشفوا عوالم ما حدش شافها قبل كده...",
      color: "bg-story-blue/20",
      borderColor: "border-story-blue",
      icon: <BookImage className="h-5 w-5 text-story-blue" />,
      image: "/images/space-journey.png",
      rtl: true // Always set RTL for the Arabic story
    }
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-white to-story-peach/20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-story-purple">
          {t('waitingList.storySamples.title')}
        </h2>
        <p className="text-lg text-center mb-8 max-w-2xl mx-auto">
          {t('waitingList.storySamples.subtitle')}
        </p>
        
        <Carousel
          className="max-w-5xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {stories.map((story, index) => (
              <CarouselItem key={index} className="md:basis-4/5 lg:basis-3/4 pl-4">
                <Card className={`h-full border-l-4 ${story.borderColor} rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden`}>
                  <div className={`flex flex-col md:flex-row ${isRTL && !story.rtl ? 'md:flex-row-reverse' : ''}`}>
                    {/* Left side - Text content */}
                    <div className={`p-5 flex-1 ${story.color}`} dir={story.rtl ? "rtl" : i18n.dir()}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-story-purple">{story.title}</h3>
                        <div className="bg-white p-2 rounded-full shadow-sm">
                          {story.icon}
                        </div>
                      </div>
                      
                      <p className="text-sm mb-4 line-clamp-4">{story.excerpt}</p>
                      
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <Badge variant="outline" className="bg-story-green/30 text-story-forest border-none">
                          {story.theme}
                        </Badge>
                        <Badge variant="outline" className="bg-story-pink/30 text-story-purple border-none flex items-center gap-1">
                          <Globe className="h-3 w-3" /> {story.language}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Right side - Image */}
                    <div className="w-full md:w-2/5 bg-story-peach/10">
                      <AspectRatio ratio={3/4} className="h-full">
                        <img 
                          src={story.image} 
                          alt={story.title} 
                          className="object-cover h-full w-full"
                          onError={(e) => {
                            console.error(`Error loading image: ${story.image}`);
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                      </AspectRatio>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6">
            {isRTL ? (
              <>
                <CarouselNext className="relative mr-2 static translate-y-0 bg-white text-story-purple border-story-purple hover:bg-story-lightPurple/20" />
                <CarouselPrevious className="relative ml-2 static translate-y-0 bg-white text-story-purple border-story-purple hover:bg-story-lightPurple/20" />
              </>
            ) : (
              <>
                <CarouselPrevious className="relative mr-2 static translate-y-0 bg-white text-story-purple border-story-purple hover:bg-story-lightPurple/20" />
                <CarouselNext className="relative ml-2 static translate-y-0 bg-white text-story-purple border-story-purple hover:bg-story-lightPurple/20" />
              </>
            )}
          </div>
        </Carousel>
        
        <div className="text-center mt-8">
          <p className="text-md italic text-story-blue">
            {t('waitingList.storySamples.joinPrompt')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WaitingListStorySamples;
