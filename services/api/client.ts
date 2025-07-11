import type { ApiResponse } from "~/types/api";

/**
 * Core API client for making HTTP requests
 */
export class ApiClient {
  private baseUrl: string;
  private authFailed: boolean = false;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Make a typed API request with proper error handling
   */
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    // Default headers
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    };

    // Add Content-Type header only if not sending FormData
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    // Add authentication token if available
    const token =
      localStorage.getItem("auth_access_token") ||
      sessionStorage.getItem("auth_access_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
      console.log("Adding auth token to request:", endpoint);
    } else {
      console.warn("No auth token found for request:", endpoint);
    }

    // Merge options with defaults
    const requestOptions: RequestInit = {
      ...options,
      headers,
    };

    try {
      console.log("Making API request to:", url);
      const response = await fetch(url, requestOptions);
      const data = await response.json();

      // Check for authentication errors
      if (response.status === 401 || response.status === 403) {
        console.warn("Authentication failed:", response.status, data);
        this.handleAuthError();
        return {
          error: {
            message: data.message || "Authentication failed",
            status: response.status,
          },
        };
      }

      if (!response.ok) {
        console.error("API request failed:", {
          url,
          status: response.status,
          data,
        });
        return {
          error: {
            message: data.message || "Something went wrong",
            status: response.status,
          },
        };
      }

      return { data: data as T };
    } catch (error: any) {
      console.error("API request failed:", error);
      return {
        error: {
          message: error.message || "Network error",
          status: 0, // For network errors
        },
      };
    }
  }

  /**
   * Handle authentication errors by logging the user out
   */
  private handleAuthError() {
    // Prevent multiple logout attempts
    if (this.authFailed) return;

    this.authFailed = true;
    console.warn("Authentication token invalid or expired. Logging out...");

    // Clear auth data from storage
    localStorage.removeItem("auth_access_token");
    localStorage.removeItem("auth_refresh_token");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token_expiry");
    sessionStorage.removeItem("auth_access_token");
    sessionStorage.removeItem("auth_refresh_token");
    sessionStorage.removeItem("auth_user");
    sessionStorage.removeItem("auth_token_expiry");

    // Navigate to login page on next tick
    setTimeout(() => {
      window.location.href = "/login?session_expired=true";
    }, 0);
  }

  /**
   * Helper method for GET requests
   */
  async get<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "GET",
      ...options,
    });
  }

  /**
   * Helper method for POST requests
   */
  async post<T>(
    endpoint: string,
    data: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    });
  }

  /**
   * Helper method for PUT requests
   */
  async put<T>(
    endpoint: string,
    data: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    });
  }

  /**
   * Helper method for DELETE requests
   */
  async delete<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      ...options,
    });
  }
}

// Create a factory function to get the API client
export function useApiClient() {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl as string;
  return new ApiClient(baseUrl);
}

// Export a helper to get the client in composables
export function getApiClient() {
  // We use a method that can be called in the composable setup functions
  const instance = ref<ApiClient | null>(null);

  if (!instance.value) {
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBaseUrl as string;
    instance.value = new ApiClient(baseUrl);
  }

  return instance.value;
}
