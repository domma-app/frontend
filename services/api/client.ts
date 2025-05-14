import type { ApiResponse } from "~/types/api";

/**
 * Core API client for making HTTP requests
 */
export class ApiClient {
  private baseUrl: string;

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
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Merge options with defaults
    const requestOptions: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (!response.ok) {
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
