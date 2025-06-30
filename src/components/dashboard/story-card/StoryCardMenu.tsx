
import { Heart, Download } from "lucide-react";
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
      className="absolute right-0 mt-2 w-52 bg-[#f4f0fc] border border-story-seafoam/40 rounded-2xl shadow-lg z-30 animate-in fade-in py-2"
      style={{ backgroundColor: "#f4f0fc" }}
      onClick={onClose}
    >
      <ul className="flex flex-col gap-1">
        <li>
          <button
            className={
              "w-full px-6 py-4 flex items-center gap-3 font-medium text-lg rounded-xl transition focus:outline-none " +
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
            <Heart size={22} strokeWidth={2} fill={isFavourite ? "#f59e42" : "none"} color={isFavourite ? "#f59e42" : "#a093f4"} />
            <span className="mt-0.5">{isFavourite ? "Favourited" : "Favourite"}</span>
          </button>
        </li>
        <li>
          <button
            className="w-full px-6 py-4 flex items-center gap-3 text-gray-400 font-medium focus:outline-none text-lg rounded-xl transition cursor-not-allowed opacity-60"
            tabIndex={0}
            type="button"
            disabled={true}
            onClick={(e) => {
              e.stopPropagation();
            }}
            title="PDF export feature is currently in development"
          >
            <Download size={22} strokeWidth={2} />
            <span className="mt-0.5 italic">Export PDF (in development)</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StoryCardMenu;
