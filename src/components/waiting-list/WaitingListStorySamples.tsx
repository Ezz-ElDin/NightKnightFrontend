
import WaitingListStorySample from "./WaitingListStorySample";

const WaitingListStorySamples = () => {
  const stories = [
    {
      title: "The Dragon's Treasure",
      theme: "Adventure",
      language: "English",
      pages: [
        {
          id: "dragon-1",
          content: "Once upon a time, there was a friendly green dragon named Spark who lived in a colorful mountain cave. Spark collected magical treasures that brought joy to the children in the nearby village...",
          image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png"
        },
        {
          id: "dragon-2",
          content: "One day, Spark found a glowing crystal that made children's dreams come true. He decided to share this special treasure with the village...",
          image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png"
        },
        {
          id: "dragon-3",
          content: "The children were overjoyed! From that day on, Spark became known as the Dream Keeper, bringing happiness to all...",
          image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png"
        }
      ],
      bgColor: "bg-gradient-to-br from-story-yellow/40 to-story-orange/20"
    },
    {
      title: "Les Chatons de la Lune",
      theme: "Fantaisie",
      language: "Français",
      pages: [
        {
          id: "moon-1",
          content: "Luna se préparait à se coucher quand elle remarqua quelque chose de magique - cinq chatons moelleux jouant avec une pelote de laine sur son rebord de fenêtre!",
          image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png"
        },
        {
          id: "moon-2",
          content: "Les chatons brillaient au clair de lune et invitèrent Luna à rejoindre leurs aventures nocturnes dans le ciel étoilé...",
          image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png"
        },
        {
          id: "moon-3",
          content: "Ensemble, ils dansèrent parmi les étoiles et créèrent des constellations magiques qui illuminent encore le ciel aujourd'hui...",
          image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png"
        }
      ],
      bgColor: "bg-gradient-to-br from-story-lightPurple/40 to-story-purple/20"
    },
    {
      title: "Kapitän Leos Weltraumreise",
      theme: "Weltraum",
      language: "Deutsch",
      pages: [
        {
          id: "space-1",
          content: "Kapitän Leo und sein treuer Roboterfreund Beep bereiteten sich auf ihr bisher größtes Abenteuer vor. Sie bestiegen ihr Raumschiff, um die Sterne zu erforschen...",
          image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png"
        },
        {
          id: "space-2",
          content: "Auf einem funkelnden Planeten trafen sie freundliche Aliens, die ihnen eine magische Sternenkarte schenkten...",
          image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png"
        },
        {
          id: "space-3",
          content: "Mit der Karte entdeckten sie einen Weg nach Hause und lernten, dass wahre Freundschaft keine Grenzen kennt...",
          image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png"
        }
      ],
      bgColor: "bg-gradient-to-br from-story-blue/40 to-story-seafoam/20"
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
        
        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          {stories.map((story, index) => (
            <WaitingListStorySample key={index} story={story} />
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
