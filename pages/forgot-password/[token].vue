<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-gray-50">
    <AuthCard title="Reset Password" subtitle="Enter your new password below">
      <form @submit.prevent="handleResetPassword" class="w-full">
        <AuthInput
          v-model="password"
          label="New Password"
          id="password"
          type="password"
          placeholder="Enter your new password"
        />

        <AuthInput
          v-model="confirmPassword"
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          placeholder="Confirm your new password"
        />

        <div
          v-if="error"
          class="mb-4 p-4 bg-red-50 text-red-500 text-sm rounded-lg"
        >
          {{ error }}
        </div>

        <button
          type="submit"
          class="w-full py-3 px-6 bg-green-500 text-white font-medium rounded-lg transition-colors hover:bg-green-600 mb-4"
          :disabled="isLoading"
        >
          {{ isLoading ? "Resetting..." : "Reset Password" }}
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
const route = useRoute();
const token = route.params.token as string;
const password = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);
const error = ref("");

const handleResetPassword = async () => {
  try {
    error.value = "";
    isLoading.value = true;

    // Validate passwords match
    if (password.value !== confirmPassword.value) {
      error.value = "Passwords do not match";
      return;
    }

    // Validate password length
    if (password.value.length < 8) {
      error.value = "Password must be at least 8 characters long";
      return;
    }

    // TODO: Implement reset password logic
    console.log("Reset password:", { token, password: password.value });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect to success page
    navigateTo("/forgot-password/success");
  } catch (err) {
    error.value = "Failed to reset password. Please try again.";
    console.error("Error:", err);
  } finally {
    isLoading.value = false;
  }
};
</script>
