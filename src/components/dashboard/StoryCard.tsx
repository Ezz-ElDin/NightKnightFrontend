
import { MoreVertical, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface StoryCardProps {
  story: {
    id: number;
    title: string;
    coverUrl: string;
    createdAt: string;
  };
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const StoryCard: React.FC<{ story: StoryCardProps["story"] }> = ({ story }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-story-seafoam/30 flex flex-col relative group hover:shadow-lg transition-shadow min-h-[305px]">
      <div className="relative">
        <img
          src={story.coverUrl}
          alt={story.title}
          className="w-full h-40 object-cover"
        />
        {/* Action menu button */}
        <div className="absolute top-2 right-2 z-10">
          <Button
            variant="ghost"
            className="rounded-full p-2 h-9 w-9"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Story actions"
          >
            <MoreVertical />
          </Button>
          {/* Action dropdown menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-story-seafoam/40 rounded-xl shadow-lg z-20 animate-in fade-in">
              <ul className="py-1">
                <li>
                  <button className="w-full px-4 py-2 hover:bg-muted flex items-center gap-2 text-story-purple font-medium">
                    <Star className="h-4 w-4" /> Favourite
                  </button>
                </li>
                <li>
                  <button className="w-full px-4 py-2 hover:bg-muted flex items-center gap-2 text-story-purple font-medium">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1"><path d="M12 17v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1"/><circle cx="9" cy="7" r="4"/><rect x="14" y="11" width="6" height="2" rx="1"/><path d="M17 8v6"/></svg>
                    Make Public to Share
                  </button>
                </li>
                <li>
                  <button className="w-full px-4 py-2 hover:bg-red-100 flex items-center gap-2 text-red-700 font-medium">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h12"/><path d="M6 6V4a2 2 0 1 1 4 0v2"/><path d="M5 9v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V9"/></svg>
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg line-clamp-2 mb-2">{story.title}</h3>
        <div className="text-sm text-gray-500 mt-auto">
          Created on {formatDate(story.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
