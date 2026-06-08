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

export interface ChangePasswordData {
  new_password1: string;
  new_password2: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ConfirmResetPasswordData {
  uid: string;
  token: string;
  new_password1: string;
  new_password2: string;
}

// Updated to only include key for login and registration
export interface AuthResponse {
  key: string;
}

export interface UserData {
  pk: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface CreditResponse {
  success: boolean;
  data: {
    purchased_stories: number;
    created_stories: number;
    remaining_credit: number;
  };
  message: string;
}

export interface StripeCheckoutRequest {
  quantity: number;
  price: string;
}

export interface StripeCheckoutResponse {
  success: boolean;
  data: {
    location: string;
    amount_total: number;
  };
  message: string;
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
  logout: () =>
    api.post('/api/auth/logout/', {}),
  changePassword: (data: ChangePasswordData) =>
    api.post('/api/auth/password/change/', data),
  forgotPassword: (data: ForgotPasswordData) =>
    api.post('/api/auth/password/reset/', data, {
      headers: { Authorization: undefined }, // Explicitly remove Authorization header
    }),
  confirmResetPassword: (data: ConfirmResetPasswordData) =>
    api.post(`/api/auth/password/reset/confirm/${data.uid}/${data.token}/`, {
      new_password1: data.new_password1,
      new_password2: data.new_password2,
      uid: data.uid,
      token: data.token,
    }, {
      headers: { Authorization: undefined }, // Explicitly remove Authorization header
    }),
  getUser: () =>
    api.get<UserData>('/api/auth/user/'),
};

// Exported Story type for normalized stories
export interface Story {
  id: number;
  title: string;
  coverUrl: string;
  createdAt: string;
  is_favourite: boolean;
  status: string;
  language: string;
  theme: string;
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
  language: string;
  story_title: string;
  pages: StoryPage[];
}

export interface StoryStatus {
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'generating_concept' | 'generating_script' | 'generating_visuals' | 'generating_images';
  percent_complete: number;
  story_id: string | number;
  concept_output?: any;
  script_output?: any;
  visual_output?: any;
  images_output?: any;
  failure_reason?: string;
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
  status: raw.status,
  language: raw.language,
  theme: raw.theme,
});

// Map backend story GET /api/stories/:id/ to StoryDetails
const normalizeStoryDetails = (raw: any): StoryDetails => ({
  id: raw.id,
  title: raw.story_title,
  story_title: raw.story_title,
  createdAt: raw.created_at,
  language: raw.language,
  pages: Array.isArray(raw.pages)
    ? raw.pages.map((p: any) => ({
        page: p.page,
        text: p.text,
        image_url: adjustCoverUrl(p.image_url), // always absolute
      }))
    : [],
});

const isDemoUser = () => localStorage.getItem('loginMethod') === 'demo';

import { jsonStoriesData } from "@/data/discoverStoriesData";

const toPublicPath = (p: string) => p.replace('public/', '/');

const DEMO_STORIES: Story[] = jsonStoriesData.map((s, idx) => {
  const cover = s.images.find((i) => i.page === 0) || s.images[0];
  return {
    id: 9000 + s.id,
    title: s.story_title,
    coverUrl: cover ? toPublicPath(cover.image_url) : "",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (idx + 1) * 2).toISOString(),
    is_favourite: idx === 0,
    status: "completed",
    language: s.tags.find((t) => /^(English|Arabic|French|Spanish)$/i.test(t)) || "English",
    theme: s.tags.find((t) => !/^(English|Arabic|French|Spanish)$/i.test(t)) || "Adventure",
  };
});

const DEMO_STORY_DETAILS: Record<number, StoryDetails> = Object.fromEntries(
  jsonStoriesData.map((s) => {
    const id = 9000 + s.id;
    const pages: StoryPage[] = s.script
      .filter((sc) => sc.page_number > 0)
      .map((sc) => {
        const img = s.images.find((i) => i.page === sc.page_number);
        return {
          page: String(sc.page_number),
          text: sc.text,
          image_url: img ? toPublicPath(img.image_url) : "",
        };
      });
    return [
      id,
      {
        id,
        title: s.story_title,
        story_title: s.story_title,
        createdAt: new Date().toISOString(),
        language: s.tags.find((t) => /^(English|Arabic|French|Spanish)$/i.test(t)) || "English",
        pages,
      },
    ];
  })
);


export const storiesApi = {
  list: async (): Promise<Story[]> => {
    if (isDemoUser()) return DEMO_STORIES;
    const res = await api.get('/api/stories/');
    if (Array.isArray(res.data.results)) {
      return res.data.results.map(normalizeStory);
    } else if (Array.isArray(res.data)) {
      return res.data.map(normalizeStory);
    } else {
      console.error("Unexpected stories API response format", res.data);
      return [];
    }
  },
  get: async (id: string | number): Promise<StoryDetails> => {
    if (isDemoUser()) {
      const numId = typeof id === 'string' ? parseInt(id, 10) : id;
      if (DEMO_STORY_DETAILS[numId]) return DEMO_STORY_DETAILS[numId];
    }
    const res = await api.get(`/api/stories/${id}/`);
    return normalizeStoryDetails(res.data);
  },
  getStatus: async (id: string | number): Promise<StoryStatus> => {
    const res = await api.get(`/api/stories/status/${id}/`);
    return res.data;
  },
  favourite: async (id: number): Promise<void> => {
    if (isDemoUser()) return;
    await api.post(`/api/stories/${id}/favourite/`);
  },
  unfavourite: async (id: number): Promise<void> => {
    if (isDemoUser()) return;
    await api.delete(`/api/stories/${id}/favourite/`);
  },
  delete: async (id: number): Promise<void> => {
    if (isDemoUser()) return;
    await api.delete(`/api/stories/${id}/`);
  },
};

export const creditApi = {
  get: async (): Promise<CreditResponse> => {
    if (isDemoUser()) {
      return {
        success: true,
        data: { purchased_stories: 5, created_stories: 2, remaining_credit: 3 },
        message: 'demo',
      };
    }
    const res = await api.get('/api/user/credit/');
    return res.data;
  },
};

// Add new Stripe API
export const stripeApi = {
  createCheckout: async (data: StripeCheckoutRequest): Promise<StripeCheckoutResponse> => {
    const res = await api.post<StripeCheckoutResponse>('/api/stripe/checkout/', data);
    return res.data;
  },
};
