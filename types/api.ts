// Response wrapper type for all API responses
export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    status: number;
  };
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  university: string;
  major: string;
  created_at: string;
  updated_at: string;
  role: string;
}

export interface RegisterRequest {
  full_name: string;
  university: string;
  major: string;
  phone: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    user: User;
  };
}

// Auth state management
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  tokenExpiry: number | null;
}
