
import { Button } from "@/components/ui/button";
import { StoryCardImageProps } from "./types";

const StoryCardImage: React.FC<StoryCardImageProps> = ({ 
  coverUrl, 
  title, 
  onMenuToggle, 
  children 
}) => {
  return (
    <div className="relative">
      <img
        src={coverUrl}
        alt={title}
        className="w-full h-40 object-cover"
      />
      {/* Action menu button */}
      <div className="absolute top-2 right-2 z-20">
        <Button
          variant="ghost"
          className="rounded-full p-0 h-11 w-11 bg-[#FEF2C8] shadow-md flex items-center justify-center transition-none"
          style={{
            backgroundColor: "#FEF2C8",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
          onClick={onMenuToggle}
          aria-label="Story actions"
          type="button"
        >
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="#48505A"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="6" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="18" r="1.5" />
          </svg>
        </Button>
        {children}
      </div>
    </div>
  );
};

export default StoryCardImage;
