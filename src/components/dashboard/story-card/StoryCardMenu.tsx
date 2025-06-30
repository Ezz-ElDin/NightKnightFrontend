
import { Heart, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StoryCardMenuProps } from "./types";

const StoryCardMenu: React.FC<StoryCardMenuProps> = ({
  isOpen,
  onClose,
  isFavourite,
  onFavourite,
  onExportPDF,
  loadingPDF
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute right-0 mt-2 w-44 bg-[#f4f0fc] border border-story-seafoam/40 rounded-2xl shadow-lg z-30 animate-in fade-in py-2"
      style={{ backgroundColor: "#f4f0fc" }}
      onClick={onClose}
    >
      <ul className="flex flex-col gap-1">
        <li>
          <button
            className={
              "w-full px-5 py-3 flex items-center gap-3 font-medium text-base rounded-xl transition focus:outline-none " +
              (isFavourite
                ? "text-amber-600"
                : "text-story-purple")
            }
            tabIndex={0}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onFavourite?.();
              onClose(e);
            }}
          >
            <Heart size={20} strokeWidth={2} fill={isFavourite ? "#f59e42" : "none"} color={isFavourite ? "#f59e42" : "#a093f4"} />
            <span className="mt-0.5">{isFavourite ? "Favourited" : "Favourite"}</span>
          </button>
        </li>
        <li>
          <button
            className="w-full px-5 py-3 flex items-center justify-between text-story-purple/50 font-semibold focus:outline-none text-base rounded-xl transition cursor-not-allowed"
            tabIndex={0}
            type="button"
            disabled={true}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex items-center gap-3">
              <Download size={20} strokeWidth={2} />
              <span className="mt-0.5">Export</span>
            </div>
            <Badge 
              variant="secondary" 
              className="text-[8px] px-1 py-0 bg-gray-100 text-gray-600 border-none h-3 leading-none whitespace-nowrap"
            >
              Coming Soon
            </Badge>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StoryCardMenu;
