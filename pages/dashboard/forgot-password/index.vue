<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-gray-50">
    <AuthCard
      title="Forgot Password"
      subtitle="Enter your email to receive reset instructions"
    >
      <form @submit.prevent="handleForgotPassword" class="w-full">
        <!-- Error message -->
        <div
          v-if="error"
          class="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm"
        >
          {{ error }}
        </div>
        
        <!-- Success message -->
        <div
          v-if="success"
          class="mb-4 p-3 rounded-lg bg-green-50 text-green-600 text-sm"
        >
          {{ success }}
        </div>
        
        <AuthInput
          v-model="email"
          id="email"
          type="email"
          label="Email"
          placeholder="Enter your email address"
        />

        <button
          type="submit"
          class="w-full bg-green-500 py-3 px-6 text-white font-medium rounded-lg transition-colors hover:bg-green-600 flex items-center justify-center mt-6"
          :disabled="isLoading"
        >
          <span
            v-if="isLoading"
            class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
          ></span>
          {{ isLoading ? "Sending..." : "Send Reset Instructions" }}
        </button>

        <p class="text-center mt-6 text-sm text-gray-500">
          Remember your password?
          <NuxtLink
            to="/login"
            class="text-green-500 font-medium hover:text-green-600 transition-colors"
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
  layout: 'landing'
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    
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
