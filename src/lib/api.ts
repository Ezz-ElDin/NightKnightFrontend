
import axios from 'axios';

// Use Vite env variable, fallback to prod URL if not set.
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
  console.log("Auth token in request:", token); // 👈 Add this
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

export interface Story {
  id: number;
  title: string;
  coverUrl: string;
  createdAt: string;
  is_favourite: boolean;
  // any other fields from the backend can be added if needed
}

export const storiesApi = {
  list: async (): Promise<Story[]> => {
    const res = await api.get('/api/stories/');
    const apiResults = Array.isArray(res.data?.results)
      ? res.data.results
      : Array.isArray(res.data) // just in case
      ? res.data
      : [];
    // Normalize backend response to the expected Story type
    return apiResults.map((s: any) => ({
      id: s.id,
      title: s.story_title ?? "",
      coverUrl: s.cover_front?.image_url ?? "",
      createdAt: s.created_at ?? "",
      is_favourite: !!s.is_favourite,
    }));
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

