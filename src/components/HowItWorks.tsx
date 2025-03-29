
import { Wand2, Pencil, Moon, Gift } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="py-16 px-4" id="how-it-works">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-story-purple">
          How Storyland Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-story-yellow p-5 rounded-full mb-4">
              <Pencil className="h-10 w-10 text-story-orange" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-story-blue">1. Create a Profile</h3>
            <p className="text-gray-700">Add your child's name, age, and favorite things to personalize their stories.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-story-lightPurple p-5 rounded-full mb-4">
              <Wand2 className="h-10 w-10 text-story-purple" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-story-blue">2. Choose a Theme</h3>
            <p className="text-gray-700">Select from magical adventures, animal friends, space journeys, and more!</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-story-green p-5 rounded-full mb-4">
              <Gift className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-story-blue">3. Customize</h3>
            <p className="text-gray-700">Add special elements and characters to make the story unique.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-story-pink p-5 rounded-full mb-4">
              <Moon className="h-10 w-10 text-story-purple" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-story-blue">4. Read Together</h3>
            <p className="text-gray-700">Enjoy a new bedtime story every night for sweet dreams!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
