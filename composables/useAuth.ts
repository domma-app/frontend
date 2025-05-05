import { registerUser } from "~/utils/api";

export interface User {
  id: string;
  full_name: string;
  university: string;
  major: string;
  phone: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export function useAuth() {
  const authState = useState<AuthState>("auth", () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }));

  // On app init, check for token in localStorage
  onMounted(() => {
    if (process.client) {
      const token = localStorage.getItem("auth_token");
      const userJson = localStorage.getItem("auth_user");

      if (token && userJson) {
        try {
          const user = JSON.parse(userJson);
          setAuth(user, token);
        } catch (error) {
          console.error("Failed to parse user data", error);
          clearAuth();
        }
      }
    }
  });

  // Set authentication state
  const setAuth = (user: User, token: string) => {
    authState.value = {
      user,
      token,
      isAuthenticated: true,
    };

    if (process.client) {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_user", JSON.stringify(user));
    }
  };

  // Clear authentication state
  const clearAuth = () => {
    authState.value = {
      user: null,
      token: null,
      isAuthenticated: false,
    };

    if (process.client) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
  };

  // Register a new user
  const register = async (userData: {
    full_name: string;
    university: string;
    major: string;
    phone: string;
    email: string;
    password: string;
  }) => {
    const response = await registerUser(userData);
    return response;
  };

  // Login user
  const login = async (userData: { email: string; password: string }) => {
    const response = await loginUser(userData);
    return response;
  };

  // Logout user
  const logout = () => {
    clearAuth();
    // Redirect to login page when implementing
  };

  return {
    authState: readonly(authState),
    register,
    login,
    logout,
    isAuthenticated: computed(() => authState.value.isAuthenticated),
    user: computed(() => authState.value.user),
  };
}
