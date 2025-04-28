
import { Card } from "@/components/ui/card";
import { Star, Sparkles, Rocket } from "lucide-react";

const WaitingListStorySamples = () => {
  const stories = [
    {
      title: "The Dragon's Treasure",
      excerpt: "Once upon a time, there was a friendly green dragon named Spark who lived in a colorful mountain cave. Spark collected magical treasures that brought joy to the children in the nearby village...",
      theme: "Adventure",
      language: "English",
      imageUrl: "/images/dragon-treasure.png",
      bgColor: "from-story-yellow/40 to-story-orange/20",
      icon: <Star className="h-8 w-8 text-story-orange fill-story-yellow" />
    },
    {
      title: "Les Chatons de la Lune",
      excerpt: "Luna se préparait à se coucher quand elle remarqua quelque chose de magique - cinq chatons moelleux jouant avec une pelote de laine sur son rebord de fenêtre! Ils brillaient au clair de lune et invitèrent Luna à rejoindre leurs aventures nocturnes...",
      theme: "Fantaisie",
      language: "Français",
      imageUrl: "/images/moon-kittens.png",
      bgColor: "from-story-lightPurple/40 to-story-purple/20",
      icon: <Sparkles className="h-8 w-8 text-story-purple" />
    },
    {
      title: "Kapitän Leos Weltraumreise",
      excerpt: "Kapitän Leo und sein treuer Roboterfreund Beep bereiteten sich auf ihr bisher größtes Abenteuer vor. Sie bestiegen ihr Raumschiff, um die Sterne zu erforschen und neue Planeten jenseits unserer Galaxie zu entdecken...",
      theme: "Weltraum",
      language: "Deutsch",
      imageUrl: "/images/space-journey.png",
      bgColor: "from-story-blue/40 to-story-seafoam/20",
      icon: <Rocket className="h-8 w-8 text-story-blue" />
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center text-story-purple">
          Story Samples
        </h2>
        <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
          Here's a preview of the magical stories you'll be able to create with Storyland
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stories.map((story, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-xl rounded-3xl transform transition-all duration-300 hover:scale-105">
              <div className={`h-48 bg-gradient-to-br ${story.bgColor} p-6 flex items-center justify-center`}>
                <div className="bg-white/90 p-4 rounded-full shadow-lg">
                  {story.icon}
                </div>
              </div>
              
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold mb-3 text-story-purple">{story.title}</h3>
                <p className="text-sm mb-4 line-clamp-3">{story.excerpt}</p>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="px-3 py-1 bg-story-green/30 text-story-forest rounded-full text-xs font-semibold">
                    {story.theme}
                  </span>
                  <span className="px-3 py-1 bg-story-pink/30 text-story-purple rounded-full text-xs font-semibold">
                    {story.language}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg italic text-story-blue">
            Join our waiting list to create your own magical stories!
          </p>
        </div>
      </div>
    </section>
  );
};

export default WaitingListStorySamples;
