
interface JsonStoryScript {
  page_number: number;
  text: string;
}

interface JsonStoryImage {
  page: number;
  image_url: string;
}

interface JsonStory {
  id: number;
  story_title: string;
  tags: string[];
  script: JsonStoryScript[];
  images: JsonStoryImage[];
}

interface TransformedStoryPage {
  id: string;
  text: string;
  image: string;
}

interface TransformedStory {
  id: number;
  title: string;
  coverUrl: string;
  coverText: string;
  createdAt: string;
  language: string;
  genre: string;
  pages: TransformedStoryPage[];
}

const getLanguageFromTags = (tags: string[]): string => {
  const languageMap: { [key: string]: string } = {
    'English': 'English',
    'Arabic': 'Arabic',
    'Playful': 'English' // fallback for stories with only genre tags
  };
  
  for (const tag of tags) {
    if (languageMap[tag]) {
      return languageMap[tag];
    }
  }
  return 'English'; // default fallback
};

const getGenreFromTags = (tags: string[]): string => {
  const nonLanguageTags = tags.filter(tag => 
    !['English', 'Arabic'].includes(tag)
  );
  return nonLanguageTags.length > 0 ? nonLanguageTags[0] : 'Adventure';
};

const getEndPageText = (language: string): string => {
  return language === 'Arabic' ? 'النهاية' : 'The End';
};

export const transformStoryData = (jsonStories: JsonStory[]): TransformedStory[] => {
  console.log('Input JSON stories:', jsonStories);
  
  return jsonStories.map(story => {
    const language = getLanguageFromTags(story.tags);
    const genre = getGenreFromTags(story.tags);
    
    // Find cover image (page 0)
    const coverImage = story.images.find(img => img.page === 0);
    const coverUrl = coverImage ? coverImage.image_url.replace('public/', '/') : '';
    
    // Find cover text from script (page 0)
    const coverScript = story.script.find(script => script.page_number === 0);
    const coverText = coverScript ? coverScript.text : story.story_title;
    
    console.log(`Story ${story.id}:`, {
      title: story.story_title,
      coverText: coverText,
      coverScript: coverScript
    });
    
    // Transform all story pages (pages 1-10 from script)
    const storyPages = story.script
      .filter(script => script.page_number >= 1) // Include pages 1-10
      .map(script => {
        const correspondingImage = story.images.find(img => img.page === script.page_number);
        return {
          id: `${story.id}-page-${script.page_number}`,
          text: script.text,
          image: correspondingImage ? correspondingImage.image_url.replace('public/', '/') : ''
        };
      });
    
    // Add "The End" page
    const endPage: TransformedStoryPage = {
      id: `${story.id}-page-end`,
      text: getEndPageText(language),
      image: '/images/the-end-story-page.png'
    };
    
    const transformedStory = {
      id: story.id,
      title: story.story_title, // Keep story title for display purposes
      coverUrl,
      coverText, // Use script[0].text for the actual cover content
      createdAt: new Date().toISOString().split('T')[0], // Today's date
      language,
      genre,
      pages: [...storyPages, endPage] // Story pages (1-10) + end page
    };
    
    console.log(`Transformed story ${story.id}:`, transformedStory);
    
    return transformedStory;
  });
};
