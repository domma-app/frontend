interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    status: number;
  };
}

/**
 * Make a request to the API
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;
  const url = `${baseUrl}${endpoint}`;

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

    // Parse the JSON response
    const data = await response.json();

    // Check if the request was successful
    if (!response.ok) {
      // Return a standardized error format
      return {
        error: {
          message: data.message || "Something went wrong",
          status: response.status,
        },
      };
    }

    // Return a standardized success format
    return { data: data as T };
  } catch (error: any) {
    console.error("API request failed:", error);

    // Return a standardized error format
    return {
      error: {
        message: error.message || "Network error",
        status: 0, // For network errors
      },
    };
  }
}

interface RegisterResponse {
  message: string;
}

interface LoginResponse {
  status: boolean;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    user: {
      id: string;
      email: string;
      full_name: string;
      phone: string;
      university: string;
      major: string;
      created_at: string;
      updated_at: string;
      role: string;
    };
  };
}

/**
 * User registration
 */
export async function registerUser(userData: {
  full_name: string;
  university: string;
  major: string;
  phone: string;
  email: string;
  password: string;
}): Promise<RegisterResponse> {
  const response = await apiRequest<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data as RegisterResponse;
}

/**
 * User login
 */
export async function loginUser(credentials: {
  email: string;
  password: string;
  rememberMe?: boolean;
}): Promise<LoginResponse> {
  const { email, password } = credentials;

  const response = await apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data as LoginResponse;
}
