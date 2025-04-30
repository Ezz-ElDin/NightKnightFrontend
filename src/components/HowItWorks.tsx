import { MessageCircle, Wand2, Book } from 'lucide-react';
const HowItWorks = () => {
  return <section className="py-16 px-4" id="how-it-works">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-story-purple">The Magic of NightKnight</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-story-yellow p-5 rounded-full mb-4">
              <MessageCircle className="h-10 w-10 text-story-orange" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-story-blue">1. Dream Together</h3>
            <p className="text-gray-700">Chat with your little one about magical characters and enchanted places they'd love to see in their very own story!</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-story-lightPurple p-5 rounded-full mb-4">
              <Wand2 className="h-10 w-10 text-story-purple" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-story-blue">2. Sprinkle Some Magic</h3>
            <p className="text-gray-700">Our magical story wizards create a spellbinding tale just for your child, filled with wonder and delight!</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-story-green p-5 rounded-full mb-4">
              <Book className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-story-blue">3. Enjoy Your Adventure</h3>
            <p className="text-gray-700">Read your enchanted story online with colorful pictures, or save it as a magical keepsake to read anytime, even under the stars!</p>
          </div>
        </div>
      </div>
    </section>;
};
export default HowItWorks;