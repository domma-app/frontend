<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-gray-50">
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
      <form @submit.prevent="handleLogin" class="w-full">
        <!-- Error message -->
        <div
          v-if="error"
          class="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm"
        >
          {{ error }}
        </div>

        <AuthInput
          v-model="email"
          id="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
        />
        <AuthInput
          v-model="password"
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
        />

        <div class="flex justify-between items-center mb-6">
          <label class="flex items-center gap-2 text-sm text-gray-700">
            <input
              v-model="rememberMe"
              type="checkbox"
              class="w-4 h-4 rounded border-gray-200 text-green-500 focus:ring-green-500"
            />
            <span>Remember me</span>
          </label>
          <NuxtLink
            to="/forgot-password"
            class="text-sm text-green-500 hover:text-green-600 transition-colors"
          >
            Forgot password?
          </NuxtLink>
        </div>

        <button
          type="submit"
          class="w-full bg-green-500 py-3 px-6 text-white font-medium rounded-lg transition-colors hover:bg-green-600 flex items-center justify-center"
          :disabled="isLoading"
        >
          <span
            v-if="isLoading"
            class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
          ></span>
          {{ isLoading ? "Signing in..." : "Sign in" }}
        </button>

        <p class="text-center mt-6 text-sm text-gray-500">
          Don't have an account?
          <NuxtLink
            to="/register"
            class="text-green-500 font-medium hover:text-green-600 transition-colors"
          >
            Sign up
          </NuxtLink>
        </p>
      </form>
    </AuthCard>
  </div>
</template>

<script setup lang="ts">
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const isLoading = ref(false);
const error = ref("");
const router = useRouter();
const { login } = useAuth();

// Toast state (only for success)
const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref<"success">("success");
const toastTimeout = ref<number | null>(null);

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
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl as string;
  console.log(baseUrl);

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

    // Call register from auth composable
    await login({
      email: email.value,
      password: password.value,
    });

    // Show success toast
    showSuccessToast("Login successful!");

    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  } catch (err: any) {
    error.value = err.message || "Login failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>
