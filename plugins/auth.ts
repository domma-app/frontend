// Plugin to add authentication token to API requests and handle authentication state

export default defineNuxtPlugin(() => {
  // Add interceptor to add auth token to API requests
  const addAuthHeaders = (request: Request) => {
    // Only run on the client side
    if (process.client) {
      const token = localStorage.getItem("auth_token");
      if (token) {
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
      if (request.url.startsWith(baseUrl)) {
        const modifiedRequest = addAuthHeaders(request);
        return originalFetch(modifiedRequest);
      }

      return originalFetch(resource, init);
    };
  }
});
