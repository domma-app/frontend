<template>
  <div
    class="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100"
  >
    <!-- Toast notification (only for success) -->
    <Toast
      :show="showToast"
      :message="toastMessage"
      :type="toastType"
      @dismiss="dismissToast"
    />

    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your account to continue"
    >
      <div class="flex justify-center mb-6">
        <div
          class="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
            />
          </svg>
        </div>
      </div>

      <form @submit.prevent="handleLogin" class="w-full">
        <!-- Error message -->
        <div
          v-if="error"
          class="mb-5 p-4 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100 flex items-start"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{{ error }}</span>
        </div>

        <div class="relative mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-700"
            >Email</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
            <input
              v-model="email"
              id="email"
              type="email"
              placeholder="Enter your email"
              class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-base outline-none duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-400"
            />
          </div>
        </div>

        <div class="relative mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-700"
            >Password</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <input
              v-model="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-base outline-none duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-400"
            />
          </div>
        </div>

        <div class="flex justify-between items-center mb-6">
          <label
            class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer group"
          >
            <div class="relative flex items-center">
              <input
                v-model="rememberMe"
                type="checkbox"
                class="w-4 h-4 rounded border-gray-200 text-green-500 focus:ring-green-500 transition-colors group-hover:border-green-400"
              />
              <div
                class="absolute w-8 h-8 -left-2 -top-2 bg-green-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200 -z-10"
              ></div>
            </div>
            <span>Remember me</span>
          </label>
          <NuxtLink
            to="/forgot-password"
            class="text-sm text-green-500 hover:text-green-600 transition-colors hover:underline"
          >
            Forgot password?
          </NuxtLink>
        </div>

        <button
          type="submit"
          class="w-full bg-green-500 py-3.5 px-6 text-white font-medium rounded-lg transition-all hover:bg-green-600 flex items-center justify-center shadow-md hover:shadow-lg shadow-green-500/20 active:scale-[0.98]"
          :disabled="isLoading"
        >
          <span
            v-if="isLoading"
            class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
          ></span>
          {{ isLoading ? "Signing in..." : "Sign in" }}
        </button>

        <div class="relative mt-8 mb-2">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <p class="text-center mt-5 text-sm text-gray-500">
          Don't have an account?
          <NuxtLink
            to="/register"
            class="text-green-500 font-medium hover:text-green-600 transition-colors hover:underline"
          >
            Sign up
          </NuxtLink>
        </p>
      </form>
    </AuthCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "landing",
});

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const isLoading = ref(false);
const error = ref("");
const router = useRouter();
const route = useRoute();
const { login } = useAuth();

// Toast state (only for success)
const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref<"success">("success");
const toastTimeout = ref<number | null>(null);

// Get redirect path from query params if it exists
const redirectPath = computed(() => {
  return (route.query.redirect as string) || "/dashboard";
});

// Show success toast notification
const showSuccessToast = (message: string) => {
  // Clear any existing timeout
  if (toastTimeout.value) {
    clearTimeout(toastTimeout.value);
  }

  // Set toast content
  toastMessage.value = message;
  showToast.value = true;

  // Auto dismiss after 5 seconds
  toastTimeout.value = window.setTimeout(() => {
    dismissToast();
  }, 5000);
};

// Dismiss toast notification
const dismissToast = () => {
  showToast.value = false;
  if (toastTimeout.value) {
    clearTimeout(toastTimeout.value);
    toastTimeout.value = null;
  }
};

const handleLogin = async () => {
  // Reset error
  error.value = "";

  // Validate form
  if (!email.value || !password.value) {
    error.value = "All fields are required";
    return;
  }

  if (password.value.length < 8) {
    error.value = "Password must be at least 8 characters";
    return;
  }

  try {
    isLoading.value = true;

    // Call login from auth composable with rememberMe option
    const response = await login({
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value,
    });

    // Show success toast with appropriate message
    const sessionDuration = rememberMe.value
      ? "You'll stay logged in for 30 days on this device"
      : "You'll stay logged in until you close your browser";

    showSuccessToast(`Login successful! ${sessionDuration}`);

    // Redirect to dashboard or the intended destination after a short delay
    setTimeout(() => {
      router.push(redirectPath.value);
    }, 1000);
  } catch (err: any) {
    error.value = err.message || "Login failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>
