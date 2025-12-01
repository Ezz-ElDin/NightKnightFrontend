import { Book, Star, Moon, Sparkles, Heart } from "lucide-react";

const Maintenance = () => {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-story-purple/5 via-story-lightPurple/10 to-story-lightBlue/15" />
      <div className="absolute inset-0 bg-gradient-to-tr from-story-pink/5 via-transparent to-story-yellow/5" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-story-purple/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-[15%] w-96 h-96 bg-story-lightBlue/10 rounded-full blur-3xl animate-pulse delay-700" />
      <div className="absolute top-40 right-[20%] w-64 h-64 bg-story-pink/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Star className="absolute top-[15%] left-[8%] h-6 w-6 text-story-yellow/40 animate-bounce-slow" fill="currentColor" />
        <Star className="absolute top-[25%] right-[12%] h-4 w-4 text-story-yellow/30 animate-pulse" fill="currentColor" />
        <Star className="absolute top-[60%] left-[15%] h-5 w-5 text-story-yellow/35 animate-bounce-slow delay-500" fill="currentColor" />
        <Star className="absolute bottom-[20%] right-[25%] h-7 w-7 text-story-orange/30 animate-pulse delay-300" fill="currentColor" />
        
        <Sparkles className="absolute top-[35%] left-[25%] h-5 w-5 text-story-purple/25 animate-pulse delay-200" />
        <Sparkles className="absolute bottom-[35%] right-[18%] h-6 w-6 text-story-blue/25 animate-bounce-slow delay-400" />
        
        <Moon className="absolute top-[50%] right-[8%] h-10 w-10 text-story-blue/20 animate-pulse delay-600" />
        <Heart className="absolute bottom-[25%] left-[12%] h-6 w-6 text-story-pink/25 animate-bounce-slow delay-800" fill="currentColor" />
      </div>

      <div className="max-w-2xl mx-auto text-center z-10">
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Book className="h-24 w-24 md:h-32 md:w-32 text-story-purple animate-wiggle" />
            <Star className="absolute -top-4 -right-4 h-12 w-12 text-story-yellow animate-bounce-slow" fill="currentColor" />
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-story-purple">
          NightKnight
        </h1>

        {/* Message */}
        <div className="space-y-4 mb-8">
          <p className="text-2xl md:text-3xl font-semibold text-story-blue">
            is dreaming up something even better.
          </p>
          <p className="text-xl md:text-2xl text-gray-600">
            We're rebuilding the magic and will be back soon.
          </p>
        </div>

        {/* Decorative element */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-story-purple animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-story-blue animate-pulse delay-100" />
          <div className="w-2 h-2 rounded-full bg-story-yellow animate-pulse delay-200" />
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
