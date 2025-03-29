
import { MessageCircle, Wand2, Book, Download } from 'lucide-react';

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
              <MessageCircle className="h-10 w-10 text-story-orange" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-story-blue">1. Plan Together</h3>
            <p className="text-gray-700">Chat with your child about what they want in their story, then enter those details.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-story-lightPurple p-5 rounded-full mb-4">
              <Wand2 className="h-10 w-10 text-story-purple" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-story-blue">2. Generate Story</h3>
            <p className="text-gray-700">Our system creates a unique tale based on your child's preferences.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-story-green p-5 rounded-full mb-4">
              <Book className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-story-blue">3. Read Online</h3>
            <p className="text-gray-700">Enjoy your personalised story immediately on our interactive platform.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-story-pink p-5 rounded-full mb-4">
              <Download className="h-10 w-10 text-story-purple" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-story-blue">4. Download PDF</h3>
            <p className="text-gray-700">Save your story as a PDF to read again and again, even offline!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
