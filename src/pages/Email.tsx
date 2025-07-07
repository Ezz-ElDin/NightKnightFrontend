
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, BookOpen, Gift, Star, Palette, Globe, Users, Book, Sword } from 'lucide-react';
import EmailStoryViewer from '@/components/email/EmailStoryViewer';

const Email = () => {
  // Sample story data for the email template with multiple pages
  const sampleStories = [
    {
      id: 1,
      title: "The Magical Forest Adventure",
      coverUrl: "/images/magic-garden.png",
      excerpt: "Join Luna as she discovers a hidden world of talking animals and magical creatures in the enchanted forest behind her grandmother's house.",
      theme: "Adventure",
      pages: [
        {
          text: "Join Luna as she discovers a hidden world of talking animals and magical creatures in the enchanted forest behind her grandmother's house.",
          imageUrl: "/images/magic-garden.png"
        },
        {
          text: "Deep in the forest, Luna meets Oliver the wise owl who tells her about the ancient magic that protects all woodland creatures.",
          imageUrl: "/images/magic-garden.png"
        },
        {
          text: "Together with her new friends, Luna learns that the greatest adventures happen when we help others and believe in ourselves.",
          imageUrl: "/images/magic-garden.png"
        }
      ]
    },
    {
      id: 2,
      title: "The Moon Kittens",
      coverUrl: "/images/moon-kittens.png",
      excerpt: "When the moon is full, special kittens with silver fur come down to Earth to help children have the most wonderful dreams.",
      theme: "Fantasy",
      pages: [
        {
          text: "When the moon is full, special kittens with silver fur come down to Earth to help children have the most wonderful dreams.",
          imageUrl: "/images/moon-kittens.png"
        },
        {
          text: "Little Stella discovers these magical kittens in her garden, their fur shimmering like starlight in the moonbeams.",
          imageUrl: "/images/moon-kittens.png"
        },
        {
          text: "The moon kittens teach Stella that dreams are the seeds of tomorrow's adventures, and every child's imagination is precious.",
          imageUrl: "/images/moon-kittens.png"
        }
      ]
    },
    {
      id: 3,
      title: "The Dragon's Treasure",
      coverUrl: "/images/dragon-treasure.png",
      excerpt: "A young knight learns that the greatest treasure isn't gold or jewels, but the friendship of a lonely dragon who just wanted someone to talk to.",
      theme: "Friendship",
      pages: [
        {
          text: "A young knight learns that the greatest treasure isn't gold or jewels, but the friendship of a lonely dragon who just wanted someone to talk to.",
          imageUrl: "/images/dragon-treasure.png"
        },
        {
          text: "Sir Oliver climbs the mountain expecting to find gold, but instead discovers that Draco the dragon is just lonely and loves to read stories.",
          imageUrl: "/images/dragon-treasure.png"
        },
        {
          text: "From that day forward, Oliver visits Draco every week to share stories and tea, proving that the best treasures are the friends we make.",
          imageUrl: "/images/dragon-treasure.png"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-story-lightPurple via-story-yellow/30 to-story-seafoam/50">
      {/* Email Container */}
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-story-seafoam/30">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-story-purple to-story-blue p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center relative">
                <Book className="w-6 h-6 text-story-teal" />
                <Sword className="absolute top-0 right-0 w-3 h-3 text-story-purple" />
              </div>
              <h1 className="text-3xl font-bold text-white font-ghibli">NightKnight</h1>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-story-yellow" />
              <p className="text-story-lightPurple text-lg font-semibold">Now Live!</p>
              <Sparkles className="w-5 h-5 text-story-yellow" />
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-story-purple mb-4 font-ghibli">
                ✨ Welcome to the Magic! ✨
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We're thrilled to announce that <strong>NightKnight</strong> is officially live! 
                Create personalized, AI-generated bedtime stories that spark imagination and 
                make every night a magical adventure for your little ones.
              </p>

              {/* Free Story Offer */}
              <div className="bg-gradient-to-r from-story-green/20 to-story-seafoam/20 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Gift className="w-6 h-6 text-story-purple" />
                  <h3 className="text-2xl font-bold text-story-purple font-ghibli">🎁 Special Launch Offer!</h3>
                  <Gift className="w-6 h-6 text-story-purple" />
                </div>
                <p className="text-lg text-gray-700 font-semibold">
                  Sign up today and get your <span className="text-story-purple font-bold">first story completely FREE!</span>
                  <br />
                  <span className="text-sm text-gray-600 mt-2 block">Create magical memories without spending a penny.</span>
                </p>
              </div>
              
              {/* Redesigned Features Section */}
              <div className="bg-gradient-to-br from-story-purple/10 via-story-blue/10 to-story-seafoam/10 rounded-3xl p-8 mb-8 border border-story-purple/20">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Star className="w-6 h-6 text-story-purple" fill="currentColor" />
                  <h3 className="text-2xl font-bold text-story-purple font-ghibli">What Makes NightKnight Special?</h3>
                  <Star className="w-6 h-6 text-story-purple" fill="currentColor" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-story-purple/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-story-purple/20 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-story-purple" />
                      </div>
                      <span className="font-semibold text-story-purple">Personalized Characters</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-13">Create unique characters with custom names, appearances, and personalities</p>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-story-blue/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-story-blue/20 rounded-full flex items-center justify-center">
                        <Palette className="w-5 h-5 text-story-blue" />
                      </div>
                      <span className="font-semibold text-story-blue">Beautiful Illustrations</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-13">AI-generated artwork that brings every story to life with stunning visuals</p>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-story-green/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-story-green/20 rounded-full flex items-center justify-center">
                        <Globe className="w-5 h-5 text-story-green" />
                      </div>
                      <span className="font-semibold text-story-green">Multiple Languages</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-13">Stories available in various languages to share magic worldwide</p>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-story-teal/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-story-teal/20 rounded-full flex items-center justify-center">
                        <Heart className="w-5 h-5 text-story-teal" fill="currentColor" />
                      </div>
                      <span className="font-semibold text-story-teal">Life Lessons</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-13">Meaningful stories that teach valuable lessons and positive values</p>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="flex justify-center mt-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-story-purple/40 rounded-full animate-bounce-slow"></div>
                    <div className="w-3 h-3 bg-story-blue/40 rounded-full animate-bounce-slow" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-3 h-3 bg-story-seafoam/40 rounded-full animate-bounce-slow" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Samples */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-story-purple text-center mb-6 font-ghibli">
                ✨ Sample Stories from Our Magic Collection ✨
              </h3>
              <div className="space-y-6">
                {sampleStories.map((story, index) => (
                  <EmailStoryViewer 
                    key={story.id} 
                    story={story} 
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-gradient-to-r from-story-seafoam/20 to-story-green/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-story-purple mb-4 font-ghibli">
                Ready to Create Magic? 🌟
              </h3>
              <p className="text-gray-700 mb-6 text-lg">
                Start crafting personalized bedtime stories that will become cherished memories.
              </p>
              <Button className="bg-story-purple hover:bg-story-purple/90 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all">
                Get Your FREE Story Now! ✨
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                First story free • Additional stories just $6.99 each
              </p>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 pt-8 border-t border-story-seafoam/30">
              <p className="text-gray-600 mb-2">
                Sweet dreams and magical nights,
              </p>
              <p className="font-bold text-story-purple font-ghibli text-lg">
                The NightKnight Team 🌙
              </p>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                <span>www.nightknight.app</span>
                <span>•</span>
                <span>hello@nightknight.app</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Email;
