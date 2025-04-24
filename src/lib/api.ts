
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
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
}

export interface AuthResponse {
  key: string;
}

export const authApi = {
  login: (data: LoginData) => 
    api.post<AuthResponse>('/api/auth/login/', data),
  
  register: (data: RegisterData) =>
    api.post<AuthResponse>('/api/auth/registration/', data),
};
