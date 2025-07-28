
export interface StoryCardProps {
  story: {
    id: number;
    title: string;
    coverUrl: string;
    createdAt: string;
    is_favourite: boolean;
    status: string;
    language: string;
    theme: string;
  };
  isFavourite: boolean;
  onClick?: () => void;
  onFavourite?: () => void;
  onDelete?: () => void;
}

export interface StoryCardImageProps {
  coverUrl: string;
  title: string;
}

export interface StoryCardContentProps {
  title: string;
  createdAt: string;
}
