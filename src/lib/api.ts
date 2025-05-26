
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

export interface AuthResponse {
  key: string;
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

// === STORIES API ===

export interface Story {
  id: number;
  title: string;
  coverUrl: string;
  createdAt: string;
  is_favourite: boolean;
  // any other fields from the backend
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

export const storiesApi = {
  list: async (): Promise<Story[]> => {
    const res = await api.get('/api/stories/');
    // If response is { results: [...] }
    if (Array.isArray(res.data.results)) {
      return res.data.results.map(normalizeStory);
    } else if (Array.isArray(res.data)) {
      // Fallback (not expected based on your payload, just in case!)
      return res.data.map(normalizeStory);
    } else {
      // Unexpected format
      console.error("Unexpected stories API response format", res.data);
      return [];
    }
  },
  favourite: async (id: number): Promise<void> => {
    await api.post(`/api/stories/${id}/favourite/`);
  },
  unfavourite: async (id: number): Promise<void> => {
    // Use the same endpoint and method for unfavourite as for favourite.
    await api.post(`/api/stories/${id}/favourite/`);
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/stories/${id}/`);
  },
};
