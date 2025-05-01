<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-gray-50">
    <AuthCard
      title="Forgot Password"
      subtitle="Enter your email and we'll send you instructions to reset your password"
    >
      <form @submit.prevent="handleForgotPassword" class="w-full">
        <AuthInput
          v-model="email"
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          :disabled="isLoading"
          class="bg-green-500 w-full py-3 px-6 rounded-lg text-white font-medium transition-colors hover:bg-green-600 mb-4"
        >
          {{ isLoading ? "Sending..." : "Send Reset Instructions" }}
        </button>
        <p class="text-center text-sm text-gray-500">
          Remember your password?
          <NuxtLink
            to="/login"
            class="text-green-500 font-medium hover:text-green-600 transition-colors"
          >
            Back to login
          </NuxtLink>
        </p>
      </form>
    </AuthCard>
  </div>
</template>

<script setup lang="ts">
const email = ref("");
const isLoading = ref(false);

const handleForgotPassword = async () => {
  try {
    isLoading.value = true;
    // TODO Implement forgot password logic
    console.log("Forgot password:", { email: email.value });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect to check-email page
    navigateTo("/forgot-password/check-email");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>
