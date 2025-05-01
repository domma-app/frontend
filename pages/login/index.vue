<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-gray-50">
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your account to continue"
    >
      <form @submit.prevent="handleLogin" class="w-full">
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
          class="w-full bg-green-500 py-3 px-6 text-white font-medium rounded-lg transition-colors hover:bg-green-600"
        >
          Sign in
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

const handleLogin = async () => {
  // TODO: Implement login logic
  console.log("Login:", {
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value,
  });
};
</script>
