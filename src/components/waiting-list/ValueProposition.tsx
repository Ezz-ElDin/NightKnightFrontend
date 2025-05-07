
import { MessageCircle, Book, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const ValueProposition = () => {
  const { t } = useTranslation('common');
  
  const features = [
    {
      title: t('waitingList.valueProposition.features.experience.title'),
      description: t('waitingList.valueProposition.features.experience.description'),
      icon: <MessageCircle className="h-8 w-8 text-story-purple" />,
      bgColor: "bg-story-lightPurple"
    },
    {
      title: t('waitingList.valueProposition.features.imagination.title'),
      description: t('waitingList.valueProposition.features.imagination.description'),
      icon: <Book className="h-8 w-8 text-story-orange" />,
      bgColor: "bg-story-yellow"
    },
    {
      title: t('waitingList.valueProposition.features.languages.title'),
      description: t('waitingList.valueProposition.features.languages.description'),
      icon: <Globe className="h-8 w-8 text-story-purple" />,
      bgColor: "bg-story-pink"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-story-lightPurple/20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center text-story-purple">
          {t('waitingList.valueProposition.title')}
        </h2>
        <p className="text-xl text-center mb-12 max-w-3xl mx-auto text-story-blue">
          {t('waitingList.valueProposition.subtitle')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="card-kiddy transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-6 flex justify-center">
                <div className={`${feature.bgColor} p-4 rounded-full`}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
