
import axios from 'axios';

// Use Vite env variable, fallback to prod URL if not set.
// Change the value of VITE_API_URL at build or run time for local/dev/prod.
const API_URL = import.meta.env.VITE_API_URL || 'https://api.nightknight.app';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  console.log("Auth token in request:", token);
  // Only add Authorization to requests that are NOT for registration
  if (
    token &&
    config.url &&
    !config.url.endsWith('/api/auth/registration/')
  ) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password1: string;
  password2: string;
  name: string;
}

// Note: Updated to include name and email from backend serializer responses
export interface AuthResponse {
  key: string;
  name: string;
  email: string;
}

export const authApi = {
  login: (data: LoginData) =>
    api.post<AuthResponse>('/api/auth/login/', data),
  register: (data: RegisterData) =>
    api.post<AuthResponse>(
      '/api/auth/registration/',
      data,
      {
        headers: { Authorization: undefined }, // Explicitly remove Authorization header
      }
    ),
};

// Exported Story type for normalized stories
export interface Story {
  id: number;
  title: string;
  coverUrl: string;
  createdAt: string;
  is_favourite: boolean;
}

// === STORIES API ===

export interface StoryPage {
  page: string;
  text: string;
  image_url: string;
}

export interface StoryDetails {
  id: number;
  title: string;
  createdAt: string;
  pages: StoryPage[];
}

export interface StoryStatus {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: number;
  message?: string;
}

// Helper to prepend API_URL to media paths
const adjustCoverUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("/media/")) {
    // Remove any duplicate slashes except in protocol part, just in case
    return `${API_URL.replace(/\/$/, "")}${url}`;
  }
  return url;
};

// Map backend story format to frontend Story interface
const normalizeStory = (raw: any): Story => ({
  id: raw.id,
  title: raw.story_title,
  coverUrl: adjustCoverUrl(raw.cover_front?.image_url || ""),
  createdAt: raw.created_at,
  is_favourite: raw.is_favourite,
});

// Map backend story GET /api/stories/:id/ to StoryDetails
const normalizeStoryDetails = (raw: any): StoryDetails => ({
  id: raw.id,
  title: raw.story_title,
  createdAt: raw.created_at,
  pages: Array.isArray(raw.pages)
    ? raw.pages.map((p: any) => ({
        page: p.page,
        text: p.text,
        image_url: adjustCoverUrl(p.image_url), // always absolute
      }))
    : [],
});

export const storiesApi = {
  list: async (): Promise<Story[]> => {
    console.log("Fetching stories from API...");
    const res = await api.get('/api/stories/');
    console.log("Raw API response:", res.data);
    
    let stories = [];
    if (Array.isArray(res.data.results)) {
      stories = res.data.results.map(normalizeStory);
    } else if (Array.isArray(res.data)) {
      stories = res.data.map(normalizeStory);
    } else {
      console.error("Unexpected stories API response format", res.data);
      return [];
    }
    
    console.log("Normalized stories:", stories);
    console.log("Total stories retrieved:", stories.length);
    return stories;
  },
  get: async (id: string | number): Promise<StoryDetails> => {
    const res = await api.get(`/api/stories/${id}/`);
    return normalizeStoryDetails(res.data);
  },
  getStatus: async (id: string | number): Promise<StoryStatus> => {
    const res = await api.get(`/api/stories/status/${id}/`);
    return res.data;
  },
  favourite: async (id: number): Promise<void> => {
    await api.post(`/api/stories/${id}/favourite/`);
  },
  unfavourite: async (id: number): Promise<void> => {
    await api.delete(`/api/stories/${id}/favourite/`);
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/stories/${id}/`);
  },
};
