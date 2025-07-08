
interface LibraryHeaderProps {}

const LibraryHeader: React.FC<LibraryHeaderProps> = () => {
  return (
    <div className="mb-6 md:mb-8 mt-4 md:mt-6">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 text-story-purple text-center px-2">
        Welcome to NightKnight!
      </h1>
      <p className="text-sm md:text-lg mb-6 md:mb-9 text-center text-primary/90 max-w-2xl mx-auto px-4">
        Where imagination takes flight. Discover, create, and share magical stories with your loved ones!
      </p>
    </div>
  );
};

export default LibraryHeader;
