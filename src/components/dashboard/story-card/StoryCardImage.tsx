
import { StoryCardImageProps } from "./types";

const StoryCardImage: React.FC<StoryCardImageProps> = ({ 
  coverUrl, 
  title
}) => {
  return (
    <div className="relative">
      <img
        src={coverUrl}
        alt={title}
        className="w-full h-40 object-cover"
      />
    </div>
  );
};

export default StoryCardImage;
