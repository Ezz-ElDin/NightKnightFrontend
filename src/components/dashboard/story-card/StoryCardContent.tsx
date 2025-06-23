
import { isArabic, formatDate } from "./utils";
import { StoryCardContentProps } from "./types";

const StoryCardContent: React.FC<StoryCardContentProps> = ({ title, createdAt }) => {
  return (
    <div className="p-4 flex-1 flex flex-col">
      <h3
        className={
          "font-bold text-lg line-clamp-2 mb-2 " +
          (isArabic(title) ? "rtl text-right font-ghibli" : "")
        }
        dir={isArabic(title) ? "rtl" : "ltr"}
      >
        {title}
      </h3>
      <div className="flex items-center gap-2 mt-auto">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#eeeaf7] text-story-purple/80 shadow-sm">
          {formatDate(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default StoryCardContent;
