
import { Button } from "@/components/ui/button";
import { Book, Moon, Star, Settings } from "lucide-react";
import StoryBackground from "@/components/StoryBackground";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation('common');
  
  return (
    <StoryBackground>
      <div className="container max-w-5xl mx-auto text-center z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-story-purple">
          {t('dashboard.welcome')}
        </h1>
        
        <div className="card-kiddy mb-10">
          <div className="flex justify-center mb-6">
            <Moon className="h-16 w-16 text-story-purple animate-float" />
          </div>
          <h2 className="text-2xl font-bold mb-6">{t('dashboard.createStory.title')}</h2>
          <p className="text-lg mb-8">
            {t('dashboard.createStory.description')}
          </p>
          <div className="flex justify-center">
            <Link to="/create-story">
              <Button className="px-8 py-6 text-xl rounded-2xl bg-story-purple hover:bg-story-purple/90 text-white button-bounce">
                <Star className="mr-2 h-5 w-5" />
                <span>{t('dashboard.createStory.button')}</span>
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card-kiddy">
            <div className="flex justify-center mb-4">
              <div className="bg-story-yellow p-3 rounded-full">
                <Book className="h-8 w-8 text-story-purple" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">{t('dashboard.myStories.title')}</h3>
            <p className="mb-4">{t('dashboard.myStories.description')}</p>
            <Button variant="outline" className="w-full bg-white border-2 border-story-blue text-story-blue hover:bg-story-blue/10 button-bounce">
              {t('dashboard.myStories.button')}
            </Button>
          </div>
          
          <div className="card-kiddy">
            <div className="flex justify-center mb-4">
              <div className="bg-story-pink p-3 rounded-full">
                <Settings className="h-8 w-8 text-story-purple" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">{t('dashboard.accountSettings.title')}</h3>
            <p className="mb-4">{t('dashboard.accountSettings.description')}</p>
            <Link to="/account-settings">
              <Button variant="outline" className="w-full bg-white border-2 border-story-blue text-story-blue hover:bg-story-blue/10 button-bounce">
                {t('dashboard.accountSettings.button')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </StoryBackground>
  );
};

export default Dashboard;
