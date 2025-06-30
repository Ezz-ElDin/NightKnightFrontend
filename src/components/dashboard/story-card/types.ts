export interface StoryCardMenuProps {
  isOpen: boolean;
  onClose: (e: React.MouseEvent) => void;
  isFavourite: boolean;
  onFavourite?: () => void;
}

export interface StoryCardProps {
  story: {
    id: number;
    title: string;
    coverUrl?: string;
    createdAt: string;
  };
  isFavourite: boolean;
  onClick?: () => void;
  onFavourite?: () => void;
  onDelete?: () => void;
}

export interface StoryCardImageProps {
  coverUrl?: string;
  title: string;
  onMenuToggle: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

export interface StoryCardContentProps {
  title: string;
  createdAt: string;
}
