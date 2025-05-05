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
          type="password"
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
        <div
          v-if="error"
          class="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm"
        >
          {{ error }}
        </div>
        <button
          type="submit"
          :disabled="!agreeToTerms || isLoading"
          class="w-full bg-green-500 py-3 px-6 text-white rounded-lg font-medium transition-colors hover-bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <span v-if="isLoading" class="mr-2">
            <svg
              class="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
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
const isLoading = ref(false);
const error = ref("");
const router = useRouter();
const { register } = useAuth();

const handleRegister = async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl as string;
  console.log(baseUrl);
  // Reset error
  error.value = "";

  // Validate form
  if (!firstName.value || !lastName.value || !email.value || !password.value) {
    error.value = "All fields are required";
    return;
  }

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match";
    return;
  }

  if (password.value.length < 8) {
    error.value = "Password must be at least 8 characters";
    return;
  }

  if (!agreeToTerms.value) {
    error.value = "You must agree to the terms of service";
    return;
  }

  try {
    isLoading.value = true;

    // Call register from auth composable
    await register({
      full_name: firstName.value + lastName.value,
      university: "defaultUni",
      major: "defaultMajor",
      phone: "defaultPhone",
      email: email.value,
      password: password.value,
    });

    // Redirect to login page after successful registration
    router.push("/login");
  } catch (err: any) {
    error.value = err.message || "Registration failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>
