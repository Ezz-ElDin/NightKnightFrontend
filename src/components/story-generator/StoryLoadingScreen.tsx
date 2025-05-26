
import React from "react";
import { Book, Sparkles } from "lucide-react";

const StoryLoadingScreen: React.FC = () => (
  <div className="flex flex-col justify-center items-center min-h-[70vh] animate-fade-in">
    <div className="relative mb-8">
      <Book className="h-24 w-24 text-story-purple animate-wiggle" />
      <Sparkles className="absolute -top-4 -right-8 h-12 w-12 text-story-yellow animate-bounce-slow" />
    </div>
    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-primary mb-1">
      ✨ Your Story is Coming to Life! ✨
    </h2>
    <p className="text-xl text-muted-foreground text-center max-w-xl mt-4">
      ✨ "Your ideas are flying to the Story Weavers now...<br />
      Hold tight, magic is on its way!" ✨
    </p>
    <div className="mt-8 flex justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-story-purple/20 border-t-story-blue" />
    </div>
  </div>
);

export default StoryLoadingScreen;
