
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';

interface Story {
  id: number;
  title: string;
  coverUrl: string;
  excerpt: string;
  theme: string;
}

interface EmailStoryViewerProps {
  story: Story;
  index: number;
}

const EmailStoryViewer: React.FC<EmailStoryViewerProps> = ({ story, index }) => {
  // Alternate layout direction for visual variety
  const isReversed = index % 2 === 1;
  
  const themeColors = {
    Adventure: 'bg-story-green/20 text-story-forest',
    Fantasy: 'bg-story-purple/20 text-story-purple',
    Friendship: 'bg-story-pink/20 text-story-purple'
  };

  return (
    <Card className="overflow-hidden border-story-seafoam/30 shadow-md hover:shadow-lg transition-shadow">
      <div className={`flex ${isReversed ? 'flex-row-reverse' : 'flex-row'} items-center`}>
        {/* Image Section */}
        <div className="w-1/3 relative">
          <div className="aspect-[3/4] relative overflow-hidden">
            <img
              src={story.coverUrl}
              alt={story.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        {/* Content Section */}
        <div className={`w-2/3 p-6 ${isReversed ? 'pr-6 pl-8' : 'pl-6 pr-8'}`}>
          <div className="flex items-start gap-3 mb-3">
            <BookOpen className="w-5 h-5 text-story-purple mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-xl font-bold text-story-purple font-ghibli line-clamp-2 mb-2">
                {story.title}
              </h4>
              <Badge className={`${themeColors[story.theme as keyof typeof themeColors]} border-none text-xs font-semibold mb-3`}>
                {story.theme}
              </Badge>
            </div>
          </div>
          
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
            {story.excerpt}
          </p>
          
          {/* Decorative elements */}
          <div className={`flex ${isReversed ? 'justify-start' : 'justify-end'} mt-4`}>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-story-purple/30 rounded-full"></div>
              <div className="w-2 h-2 bg-story-blue/30 rounded-full"></div>
              <div className="w-2 h-2 bg-story-seafoam/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EmailStoryViewer;
