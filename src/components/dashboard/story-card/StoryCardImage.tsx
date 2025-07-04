
import { StoryCardImageProps } from "./types";

const StoryCardImage: React.FC<StoryCardImageProps> = ({ 
  coverUrl, 
  title, 
  onMenuToggle, // Keep for compatibility but not used
  children 
}) => {
  return (
    <div className="relative h-48 bg-gray-100 overflow-hidden">
      {coverUrl && (
        <img
          src={coverUrl}
          alt={`Cover for ${title}`}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default StoryCardImage;
