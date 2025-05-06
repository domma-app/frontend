import { registerUser, loginUser } from "~/utils/api";

export interface User {
  id: string;
  full_name: string;
  university: string;
  major: string;
  phone: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  tokenExpiry: number | null;
}

// Token expiry time in milliseconds
const TOKEN_EXPIRY_REMEMBER = 30 * 24 * 60 * 60 * 1000; // 30 days
const TOKEN_EXPIRY_DEFAULT = 24 * 60 * 60 * 1000; // 24 hours

export function useAuth() {
  const authState = useState<AuthState>("auth", () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    tokenExpiry: null,
  }));

  // On app init, check for token in localStorage and sessionStorage
  onMounted(() => {
    if (process.client) {
      // First check localStorage (for "remember me")
      const accessToken = localStorage.getItem("auth_access_token");
      const refreshToken = localStorage.getItem("auth_refresh_token");
      const userJson = localStorage.getItem("auth_user");
      const tokenExpiry = localStorage.getItem("auth_token_expiry");
      const storageType = "local";

      // If not in localStorage, check sessionStorage (for session-only login)
      if (!accessToken) {
        const sessionAccessToken = sessionStorage.getItem("auth_access_token");
        const sessionRefreshToken =
          sessionStorage.getItem("auth_refresh_token");
        const sessionUserJson = sessionStorage.getItem("auth_user");
        const sessionTokenExpiry = sessionStorage.getItem("auth_token_expiry");

        if (sessionAccessToken && sessionUserJson) {
          tryRestoreAuth(
            sessionAccessToken,
            sessionRefreshToken,
            sessionUserJson,
            sessionTokenExpiry,
            "session"
          );
          return;
        }
      } else if (accessToken && userJson) {
        tryRestoreAuth(
          accessToken,
          refreshToken,
          userJson,
          tokenExpiry,
          storageType
        );
      }
    }
  });

  // Try to restore auth from storage
  const tryRestoreAuth = (
    accessToken: string,
    refreshToken: string | null,
    userJson: string,
    tokenExpiry: string | null,
    storageType: "local" | "session"
  ) => {
    try {
      const user = JSON.parse(userJson);

      // Check if token has expired
      if (tokenExpiry) {
        const expiryTime = parseInt(tokenExpiry);
        if (Date.now() > expiryTime) {
          // Token has expired, clear auth
          clearAuth(storageType);
          return;
        }
      }

      setAuth(
        user,
        accessToken,
        refreshToken,
        storageType === "local",
        tokenExpiry ? parseInt(tokenExpiry) : null
      );
    } catch (error) {
      console.error("Failed to parse user data", error);
      clearAuth(storageType);
    }
  };

  // Set authentication state
  const setAuth = (
    user: User,
    accessToken: string,
    refreshToken: string | null,
    rememberMe: boolean = false,
    expiry: number | null = null
  ) => {
    // Calculate token expiry if not provided
    const tokenExpiry =
      expiry ||
      (rememberMe
        ? Date.now() + TOKEN_EXPIRY_REMEMBER
        : Date.now() + TOKEN_EXPIRY_DEFAULT);

    // Update state
    authState.value = {
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
      tokenExpiry,
    };

    // Store in browser storage based on rememberMe preference
    if (process.client) {
      const storage = rememberMe ? localStorage : sessionStorage;

      storage.setItem("auth_access_token", accessToken);
      if (refreshToken) storage.setItem("auth_refresh_token", refreshToken);
      storage.setItem("auth_user", JSON.stringify(user));
      storage.setItem("auth_token_expiry", tokenExpiry.toString());

      // If switching from "remember me" to session-only or vice versa, clear the other storage
      const otherStorage = rememberMe ? sessionStorage : localStorage;
      otherStorage.removeItem("auth_access_token");
      otherStorage.removeItem("auth_refresh_token");
      otherStorage.removeItem("auth_user");
      otherStorage.removeItem("auth_token_expiry");
    }
  };

  // Clear authentication state
  const clearAuth = (storageType: "local" | "session" | "both" = "both") => {
    authState.value = {
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      tokenExpiry: null,
    };

    if (process.client) {
      if (storageType === "local" || storageType === "both") {
        localStorage.removeItem("auth_access_token");
        localStorage.removeItem("auth_refresh_token");
        localStorage.removeItem("auth_user");
        localStorage.removeItem("auth_token_expiry");
      }

      if (storageType === "session" || storageType === "both") {
        sessionStorage.removeItem("auth_access_token");
        sessionStorage.removeItem("auth_refresh_token");
        sessionStorage.removeItem("auth_user");
        sessionStorage.removeItem("auth_token_expiry");
      }
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
  const login = async (userData: {
    email: string;
    password: string;
    rememberMe?: boolean;
  }) => {
    const rememberMe = userData.rememberMe || false;
    const response = await loginUser({
      email: userData.email,
      password: userData.password,
      rememberMe,
    });

    // If login successful, set auth state
    if (response.status && response.data) {
      setAuth(
        response.data.user,
        response.data.access_token,
        response.data.refresh_token,
        rememberMe
      );
    }

    return response;
  };

  // Logout user
  const logout = () => {
    clearAuth();
    // Redirect will be handled by the component calling this function
  };

  // Get the auth token (for API requests)
  const getAccessToken = () => {
    return authState.value.accessToken;
  };

  return {
    authState: readonly(authState),
    register,
    login,
    logout,
    getAccessToken,
    isAuthenticated: computed(() => authState.value.isAuthenticated),
    user: computed(() => authState.value.user),
  };
}
