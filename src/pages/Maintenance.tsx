import { Book, Star, Moon } from "lucide-react";

const Maintenance = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-story-lightPurple/20 via-white to-story-lightBlue/20 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Floating stars decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Star className="absolute top-20 left-[10%] h-6 w-6 text-story-yellow/30 animate-bounce-slow" fill="currentColor" />
        <Star className="absolute top-40 right-[15%] h-4 w-4 text-story-yellow/20 animate-pulse" fill="currentColor" />
        <Star className="absolute bottom-32 left-[20%] h-5 w-5 text-story-yellow/25 animate-bounce-slow" fill="currentColor" />
        <Moon className="absolute bottom-20 right-[10%] h-8 w-8 text-story-blue/20 animate-pulse" />
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
