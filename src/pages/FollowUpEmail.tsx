

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, BookOpen, Gift, Star, Palette, Globe, Users, Clock, Coffee, Calendar, Zap } from 'lucide-react';
import { transformStoryData } from '@/lib/storyDataTransformer';
import { jsonStoriesData } from '@/data/discoverStoriesData';
import { isArabic } from '@/components/dashboard/story-card/utils';

const FollowUpEmail = () => {
  // Get discover stories data
  const discoverStories = transformStoryData(jsonStoriesData).slice(0, 3); // Take first 3 stories

  const handleStoryClick = (storyId: number) => {
    // This will open the main site and trigger the story viewer
    window.open(`https://www.nightknight.app/?story=${storyId}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-story-lightPurple via-story-yellow/30 to-story-seafoam/50">
      {/* Email Container */}
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-story-seafoam/30">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-story-purple to-story-blue p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-story-purple" />
              </div>
              <h1 className="text-3xl font-bold text-white font-ghibli">NightKnight</h1>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-story-yellow" />
              <p className="text-story-lightPurple text-lg font-semibold">It's Weekend Story Time!</p>
              <Sparkles className="w-5 h-5 text-story-yellow" />
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {/* Weekend Reminder Section */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Calendar className="w-8 h-8 text-story-purple" />
                <Coffee className="w-8 h-8 text-story-blue" />
              </div>
              <h2 className="text-3xl font-bold text-story-purple mb-4 font-ghibli">
                🌟 The Weekend is Here! 🌟
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                It's time to create magical moments with your loved ones! The weekend is the perfect opportunity 
                to craft a new <strong>personalised NightKnight story</strong> that will light up your children's imagination 
                and create memories that last a lifetime.
              </p>

              {/* Clear Objective Statement */}
              <div className="bg-gradient-to-r from-story-purple/10 to-story-blue/10 rounded-2xl p-6 mb-6 border border-story-purple/20">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Zap className="w-6 h-6 text-story-orange" />
                  <h3 className="text-xl font-bold text-story-purple font-ghibli">This Weekend's Mission</h3>
                </div>
                <p className="text-lg text-gray-700 font-semibold">
                  Create a new story with your children and make this weekend truly unforgettable!
                </p>
              </div>

              {/* Primary Call to Action */}
              <Button asChild className="bg-story-purple hover:bg-story-purple/90 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all mb-6">
                <a href="https://www.nightknight.app/create-story" target="_blank" rel="noopener noreferrer">
                  Create Your Story Now! ✨
                </a>
              </Button>
            </div>

            {/* Subscription & Purchase Options */}
            <div className="bg-gradient-to-r from-story-green/20 to-story-seafoam/20 rounded-2xl p-6 mb-8 border-2 border-story-purple/30">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Gift className="w-6 h-6 text-story-purple" />
                <h3 className="text-2xl font-bold text-story-purple font-ghibli">Choose Your Adventure</h3>
                <Gift className="w-6 h-6 text-story-purple" />
              </div>
              
              <div className="space-y-4">
                {/* Subscription Option */}
                <div className="bg-white rounded-xl p-5 border border-story-purple/20">
                  <div className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-story-purple mt-1 flex-shrink-0" fill="currentColor" />
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-story-purple mb-2">Subscribe to a Story Plan</h4>
                      <p className="text-gray-700 mb-3">
                        Get unlimited magical stories every month! Choose from our flexible plans starting from just <strong>£6.49/month</strong>.
                      </p>
                      <Button asChild variant="outline" className="border-2 border-story-purple text-story-purple hover:bg-story-purple hover:text-white px-6 py-2 rounded-full font-semibold w-full">
                        <a href="https://www.nightknight.app/account-settings?tab=plans" target="_blank" rel="noopener noreferrer">
                          View Our Plans
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Single Story Option */}
                <div className="bg-white rounded-xl p-5 border border-story-blue/20">
                  <div className="flex items-start gap-3">
                    <Heart className="w-6 h-6 text-story-blue mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-story-blue mb-2">Buy Just One Story</h4>
                      <p className="text-gray-700 mb-3">
                        Not ready to commit? No problem! Create a single personalised story for only <strong>£4.99</strong>.
                      </p>
                      <Button asChild variant="outline" className="border-2 border-story-blue text-story-blue hover:bg-story-blue hover:text-white px-6 py-2 rounded-full font-semibold w-full">
                        <a href="https://www.nightknight.app/account-settings?tab=credits" target="_blank" rel="noopener noreferrer">
                          Buy One Story
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why This Weekend? Features Section */}
            <div className="bg-gradient-to-br from-story-purple/10 via-story-blue/10 to-story-seafoam/10 rounded-3xl p-8 mb-8 border border-story-purple/20">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-story-purple" />
                <h3 className="text-2xl font-bold text-story-purple font-ghibli">Why Create a Story This Weekend?</h3>
                <Clock className="w-6 h-6 text-story-purple" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-story-purple/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-story-purple/20 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-story-purple" />
                    </div>
                    <span className="font-semibold text-story-purple">Quality Time Together</span>
                  </div>
                  <p className="text-sm text-gray-600 pl-13">Make the most of your weekend with meaningful family bonding</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-story-blue/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-story-blue/20 rounded-full flex items-center justify-center">
                      <Palette className="w-5 h-5 text-story-blue" />
                    </div>
                    <span className="font-semibold text-story-blue">Spark Imagination</span>
                  </div>
                  <p className="text-sm text-gray-600 pl-13">Watch your child's creativity come alive with beautiful illustrations</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-story-green/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-story-green/20 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-story-green" />
                    </div>
                    <span className="font-semibold text-story-green">Teach Important Values</span>
                  </div>
                  <p className="text-sm text-gray-600 pl-13">Embed meaningful life lessons in engaging adventures</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-story-teal/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-story-teal/20 rounded-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-story-teal" />
                    </div>
                    <span className="font-semibold text-story-teal">Create Lasting Memories</span>
                  </div>
                  <p className="text-sm text-gray-600 pl-13">Stories you create together become cherished keepsakes</p>
                </div>
              </div>
            </div>

            {/* Discover Stories Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-story-purple text-center mb-4 font-ghibli">
                ✨ Get Inspired by These Stories ✨
              </h3>
              <p className="text-center text-gray-600 mb-6">
                Click any story below to see the magic in action and get ideas for your weekend creation!
              </p>
              <div className="space-y-6">
                {discoverStories.map((story, index) => {
                  const storyText = story.pages[0]?.text || "Click to read this magical story!";
                  const isRTL = isArabic(storyText);
                  
                  return (
                    <Card key={story.id} className="overflow-hidden border-story-seafoam/30 shadow-md hover:shadow-lg transition-all cursor-pointer group" onClick={() => handleStoryClick(story.id)}>
                      <div className={`flex ${index % 2 === 1 ? 'flex-row-reverse' : 'flex-row'} items-center`}>
                        {/* Image Section */}
                        <div className="w-1/3 relative">
                          <div className="aspect-[3/4] relative overflow-hidden">
                            <img 
                              src={story.coverUrl} 
                              alt={story.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all"></div>
                            <div className="absolute top-2 right-2 bg-story-purple text-white px-2 py-1 rounded-full text-xs font-semibold">
                              Click to Read
                            </div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className={`w-2/3 p-6 ${index % 2 === 1 ? 'pr-6 pl-8' : 'pl-6 pr-8'}`}>
                          <div className="flex items-start gap-3 mb-3">
                            <BookOpen className="w-5 h-5 text-story-purple mt-1 flex-shrink-0" />
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-story-purple font-ghibli line-clamp-2 mb-2 group-hover:text-story-blue transition-colours">
                                {story.title}
                              </h4>
                              <div className="flex gap-2 mb-3">
                                <span className="bg-story-blue/20 text-story-blue border-none text-xs font-semibold px-2 py-1 rounded-full">
                                  {story.language}
                                </span>
                                <span className="bg-story-purple/20 text-story-purple border-none text-xs font-semibold px-2 py-1 rounded-full">
                                  {story.genre}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <p className={`text-gray-700 text-sm leading-relaxed line-clamp-3 mb-4 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                            {storyText}
                          </p>
                          
                          {/* Decorative elements */}
                          <div className={`flex ${index % 2 === 1 ? 'justify-start' : 'justify-end'}`}>
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-story-purple/30 rounded-full group-hover:bg-story-purple/50 transition-colours"></div>
                              <div className="w-2 h-2 bg-story-blue/30 rounded-full group-hover:bg-story-blue/50 transition-colours"></div>
                              <div className="w-2 h-2 bg-story-seafoam/30 rounded-full group-hover:bg-story-seafoam/50 transition-colours"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Final Call to Action Section */}
            <div className="text-center bg-gradient-to-r from-story-orange/20 to-story-yellow/20 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-story-purple mb-4 font-ghibli">
                🚀 Ready to Start Your Weekend Adventure? 🚀
              </h3>
              <p className="text-gray-700 mb-6 text-lg">
                Don't let this weekend pass by without creating a magical story experience with your children!
              </p>
              <Button asChild className="bg-story-orange hover:bg-story-orange/90 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all mb-4">
                <a href="https://www.nightknight.app/create-story" target="_blank" rel="noopener noreferrer">
                  Start Creating Now! 🎨
                </a>
              </Button>
              <p className="text-sm text-gray-600 mt-4">
                Choose from our flexible plans or buy a single story • Create unlimited characters • Beautiful AI illustrations
              </p>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 pt-8 border-t border-story-seafoam/30">
              <p className="text-gray-600 mb-2">
                Have a magical weekend,
              </p>
              <p className="font-bold text-story-purple font-ghibli text-lg">
                The NightKnight Team 🌙
              </p>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                <span>www.nightknight.app</span>
                <span>•</span>
                <span>fairy@nightknight.app</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUpEmail;
