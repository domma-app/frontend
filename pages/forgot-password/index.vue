<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <!-- Left panel with branding -->
    <div class="lg:w-2/5 bg-green-500 relative overflow-hidden">
      <!-- Decorative element positioned at the bottom -->
      <div
        class="absolute bottom-0 right-0 w-60 h-60 rounded-tl-full bg-white/5 backdrop-blur-sm"
      ></div>

      <div
        class="relative z-10 flex flex-col justify-between h-full px-8 py-16 lg:px-16 text-white"
      >
        <div class="hidden lg:block">
          <div class="mb-10">
            <h1 class="text-4xl font-bold mb-3">DOMMA</h1>
            <div class="w-20 h-1 bg-white"></div>
          </div>
        </div>

        <div class="hidden lg:block">
          <h2 class="text-3xl font-bold mb-4">Reset password</h2>
          <p class="text-lg mb-8 max-w-md leading-relaxed">
            We'll send you instructions to reset your password.
          </p>
        </div>

        <!-- Mobile header -->
        <div class="lg:hidden text-center">
          <h1 class="text-3xl font-bold mb-2">DOMMA</h1>
          <p class="text-lg mb-4">Your personal finance manager</p>
        </div>
      </div>
    </div>

    <!-- Right panel with form -->
    <div class="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white">
      <div class="w-full max-w-md">
        <div class="mb-10">
          <h2 class="text-2xl font-bold text-gray-800">Forgot Password</h2>
          <p class="text-gray-600 mt-1">
            Enter your email address to recover your account
          </p>
        </div>

        <form @submit.prevent="handleForgotPassword" class="w-full">
          <!-- Error message -->
          <div
            v-if="error"
            class="mb-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100 flex items-start"
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
            class="mb-6 p-4 rounded-lg bg-green-50 text-green-600 text-sm border border-green-100 flex items-start"
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
            class="w-full bg-green-500 py-3 px-6 text-white font-medium rounded-lg transition-all hover:bg-green-600 flex items-center justify-center shadow-sm hover:shadow-md active:scale-[0.99] mb-6"
            :disabled="isLoading"
          >
            <span
              v-if="isLoading"
              class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
            ></span>
            {{ isLoading ? "Sending..." : "Send Reset Instructions" }}
          </button>

          <div class="relative mt-8 mb-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-gray-500"
                >Remember your password?</span
              >
            </div>
          </div>

          <button
            type="button"
            @click="$router.push('/login')"
            class="w-full py-3 px-6 bg-gray-100 text-center rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-colors"
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
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

<style scoped>
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size: 60px 60px;
}
</style>
