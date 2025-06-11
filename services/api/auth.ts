import { useApiClient } from "./client";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "~/types/api";

/**
 * Auth service for user authentication
 */
export class AuthService {
  private readonly ENDPOINTS = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  };

  private apiClient;

  constructor() {
    this.apiClient = useApiClient();
  }

  /**
   * Register a new user
   */
  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    const response = await this.apiClient.post<RegisterResponse>(
      this.ENDPOINTS.REGISTER,
      userData
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as RegisterResponse;
  }

  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.apiClient.post<LoginResponse>(
      this.ENDPOINTS.LOGIN,
      credentials
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as LoginResponse;
  }
}

// Create a composable to use the auth service
export function useAuthService() {
  return new AuthService();
}
