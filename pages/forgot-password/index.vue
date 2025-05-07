<template>
  <div
    class="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100"
  >
    <AuthCard
      title="Forgot Password"
      subtitle="Enter your email to receive reset instructions"
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
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
        </div>
      </div>

      <form @submit.prevent="handleForgotPassword" class="w-full">
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

        <!-- Success message -->
        <div
          v-if="success"
          class="mb-5 p-4 rounded-lg bg-green-50 text-green-600 text-sm border border-green-100 flex items-start"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{{ success }}</span>
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
              placeholder="Enter your email address"
              class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-base outline-none duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-400"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-green-500 py-3.5 px-6 text-white font-medium rounded-lg transition-all hover:bg-green-600 flex items-center justify-center shadow-md hover:shadow-lg shadow-green-500/20 active:scale-[0.98] mt-6"
          :disabled="isLoading"
        >
          <span
            v-if="isLoading"
            class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
          ></span>
          {{ isLoading ? "Sending..." : "Send Reset Instructions" }}
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
          Remember your password?
          <NuxtLink
            to="/login"
            class="text-green-500 font-medium hover:text-green-600 transition-colors hover:underline"
          >
            Sign in
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
const isLoading = ref(false);
const error = ref("");
const success = ref("");
const router = useRouter();

const handleForgotPassword = async () => {
  // Reset error and success
  error.value = "";
  success.value = "";

  // Validate form
  if (!email.value) {
    error.value = "Email is required";
    return;
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    error.value = "Please enter a valid email address";
    return;
  }

  try {
    isLoading.value = true;

    // In a real application, call API to reset password
    // For now, simulate API call with a timeout
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success message
    success.value = "Password reset instructions have been sent to your email";

    // Reset form
    email.value = "";
  } catch (err: any) {
    error.value = err.message || "Failed to process request. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>
