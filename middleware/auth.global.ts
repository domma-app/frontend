export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth();

  // Define public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    // "/dashboard", // Temporary
  ];

  // If the route requires authentication and user is not authenticated, redirect to login
  // if (!publicRoutes.includes(to.path) && !isAuthenticated.value) {
  //   // Redirect to login page with the intended destination as a query parameter
  //   return navigateTo({
  //     path: "/login",
  //     query: { redirect: to.fullPath },
  //   });
  // }
});
