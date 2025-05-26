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

export const storiesApi = {
  list: async (): Promise<Story[]> => {
    const res = await api.get('/api/stories/');
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
