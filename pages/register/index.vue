<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-gray-50">
    <AuthCard title="Create an account" subtitle="Sign up to get started">
      <form @submit.prevent="handleRegister" class="w-full">
        <div class="grid grid-cols-2 gap-4">
          <AuthInput
            v-model="firstName"
            label="First Name"
            id="firstName"
            type="text"
            placeholder="Enter your first name"
          />
          <AuthInput
            v-model="lastName"
            label="Last Name"
            id="lastName"
            type="text"
            placeholder="Enter your last name"
          />
        </div>
        <AuthInput
          v-model="email"
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email"
        />
        <AuthInput
          v-model="password"
          label="Password"
          id="password"
          type="text"
          placeholder="Enter your password"
        />
        <AuthInput
          v-model="confirmPassword"
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
        />
        <div class="mb-6">
          <label class="flex items-start gap-2 text-sm text-gray-500">
            <input
              type="checkbox"
              v-model="agreeToTerms"
              class="mt-1 h-4 w-4 rounded border-gray-200 text-green-500 focus:ring-green-500"
            />
            <span>
              I Agree to the
              <a
                href="#"
                class="text-green-500 font-medium hover:text-green-600"
              >
                Terms of Services
              </a>
              and
              <a
                href="#"
                class="text-green-500 font-medium hover:text-green-600"
              >
                Privacy Policy
              </a>
            </span>
          </label>
        </div>
        <button
          type="submit"
          :disabled="!agreeToTerms"
          class="w-full bg-green-500 py-3 px-6 text-white rounded-lg font-medium transition-colors hover-bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Create Account
        </button>
        <p class="text-center mt-6 text-sm text-gray-500">
          Already have an account?
          <NuxtLink
            to="/login"
            class="text-green-500 font-medium hover-text-green-600 transition-colors"
          >
            Sign In
          </NuxtLink>
        </p>
      </form>
    </AuthCard>
  </div>
</template>

<script setup lang="ts">
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const agreeToTerms = ref(false);

const handleRegister = async () => {
  // TODO: Implement registration logic
  console.log("Register:", {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  });
};
</script>
