// Global error handling middleware
export default defineNuxtRouteMiddleware((to, from) => {
  // Setup global error handling
  if (process.client) {
    const auth = useAuth();

    // Handle 401 Unauthorized errors (token expired or invalid)
    window.addEventListener("unhandledrejection", (event) => {
      // Check if it's a response error
      if (
        event.reason &&
        event.reason.response &&
        event.reason.response.status == 401
      ) {
        // Clear auth state and redirect to login
        auth.logout();
        return navigateTo("/login");
      }
    });
  }
});
