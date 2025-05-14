// Plugin to add authentication token to API requests and handle authentication state

export default defineNuxtPlugin(() => {
  // Add interceptor to add auth token to API requests
  const addAuthHeaders = (request: Request) => {
    // Only run on the client side
    if (process.client) {
      // Check localStorage first, then sessionStorage
      let token = localStorage.getItem("auth_access_token");
      if (!token) {
        token = sessionStorage.getItem("auth_access_token");
      }

      if (token) {
        // Check if token has expired
        const expiry =
          localStorage.getItem("auth_token_expiry") ||
          sessionStorage.getItem("auth_token_expiry");
        if (expiry && parseInt(expiry) < Date.now()) {
          // Token expired, clear it
          const { logout } = useAuth();
          logout();

          // Redirect to login if not already there
          const route = useRoute();
          if (!route.path.startsWith("/login")) {
            const router = useRouter();
            router.push(
              `/login?redirect=${encodeURIComponent(route.fullPath)}`
            );
          }
          return request;
        }

        request.headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return request;
  };

  // Add global fetch interceptor
  if (process.client) {
    const originalFetch = window.fetch;
    window.fetch = async function (
      resource: RequestInfo | URL,
      init?: RequestInit
    ) {
      const request = new Request(resource, init);
      const config = useRuntimeConfig();
      const baseUrl = config.public.apiBaseUrl as string;

      // Only intercept requests to our API
      if (typeof request.url === "string" && request.url.startsWith(baseUrl)) {
        const modifiedRequest = addAuthHeaders(request);
        return originalFetch(modifiedRequest);
      }

      return originalFetch(resource, init);
    };
  }
});
