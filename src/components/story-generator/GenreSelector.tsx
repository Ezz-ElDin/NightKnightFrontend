
import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { GENRES } from "./constants";
import { getGenreIcon } from "./IconUtils";

interface GenreSelectorProps {
  selectedGenre: string;
  onSelectGenre: (genreId: string) => void;
}

const GenreSelector: React.FC<GenreSelectorProps> = ({ selectedGenre, onSelectGenre }) => {
  return (
    <div className="space-y-3">
      <Label>Theme</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {GENRES.map((genre) => (
          <div
            key={genre.id}
            className={cn(
              "p-4 rounded-xl cursor-pointer transition-all hover:scale-105 transform duration-200 flex flex-col items-center text-center aspect-[4/3] shadow-md border-2",
              selectedGenre === genre.id
                ? "border-primary bg-primary/10 ring-4 ring-primary/30"
                : `border-${genre.color}/50 hover:border-${genre.color}`
            )}
            onClick={() => onSelectGenre(genre.id)}
            style={{
              backgroundColor: genre.color,
              color: genre.textColor,
              borderColor: selectedGenre === genre.id ? "#7E69AB" : genre.color,
            }}
          >
            <div className="mb-3">
              {getGenreIcon(genre.id)}
            </div>
            <div className="font-bold text-lg mt-auto">
              {genre.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreSelector;
