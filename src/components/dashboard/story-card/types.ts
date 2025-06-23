
export interface Story {
  id: number;
  title: string;
  coverUrl: string;
  createdAt: string;
}

export interface StoryCardProps {
  story: Story;
  isFavourite?: boolean;
  onClick?: () => void;
  onFavourite?: () => void;
  onDelete?: () => void;
}

export interface StoryCardMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isFavourite?: boolean;
  onFavourite?: () => void;
  onExportPDF: (e: React.MouseEvent) => void;
  loadingPDF: boolean;
}

export interface StoryCardImageProps {
  coverUrl: string;
  title: string;
  onMenuToggle: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

export interface StoryCardContentProps {
  title: string;
  createdAt: string;
}
