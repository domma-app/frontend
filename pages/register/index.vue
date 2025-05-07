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

    <AuthCard title="Create an account" subtitle="Sign up to get started">
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
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
      </div>

      <form @submit.prevent="handleRegister" class="w-full">
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

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div class="relative">
            <label
              for="firstName"
              class="block mb-2 text-sm font-medium text-gray-700"
              >First Name</label
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <input
                v-model="firstName"
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-base outline-none duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-400"
              />
            </div>
          </div>
          <div class="relative">
            <label
              for="lastName"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Last Name</label
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <input
                v-model="lastName"
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-base outline-none duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        <div class="relative mb-5">
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

        <div class="relative mb-5">
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
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              class="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg text-base outline-none duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-400"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                v-if="showPassword"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="relative mb-5">
          <label
            for="confirmPassword"
            class="block mb-2 text-sm font-medium text-gray-700"
            >Confirm Password</label
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <input
              v-model="confirmPassword"
              id="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm your password"
              class="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg text-base outline-none duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-400"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                v-if="showConfirmPassword"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="mb-6">
          <label
            class="flex items-start gap-2 text-sm text-gray-500 cursor-pointer group"
          >
            <div class="relative flex items-center mt-1">
              <input
                type="checkbox"
                v-model="agreeToTerms"
                class="h-4 w-4 rounded border-gray-200 text-green-500 focus:ring-green-500 transition-colors group-hover:border-green-400"
              />
              <div
                class="absolute w-8 h-8 -left-2 -top-2 bg-green-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200 -z-10"
              ></div>
            </div>
            <span>
              I Agree to the
              <a
                href="#"
                class="text-green-500 font-medium hover:text-green-600 hover:underline"
              >
                Terms of Services
              </a>
              and
              <a
                href="#"
                class="text-green-500 font-medium hover:text-green-600 hover:underline"
              >
                Privacy Policy
              </a>
            </span>
          </label>
        </div>

        <button
          type="submit"
          :disabled="!agreeToTerms || isLoading"
          class="w-full bg-green-500 py-3.5 px-6 text-white rounded-lg font-medium transition-all hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg shadow-green-500/20 active:scale-[0.98]"
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

        <div class="relative mt-8 mb-2">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <p class="text-center mt-5 text-sm text-gray-500">
          Already have an account?
          <NuxtLink
            to="/login"
            class="text-green-500 font-medium hover:text-green-600 transition-colors hover:underline"
          >
            Sign In
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
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Toast state
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
      full_name: `${firstName.value} ${lastName.value}`,
      university: "defaultUni",
      major: "defaultMajor",
      phone: "defaultPhone",
      email: email.value,
      password: password.value,
    });

    // Show success toast
    showSuccessToast("Registration successful!");

    // Redirect to login page after a short delay
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (err: any) {
    error.value = err.message || "Registration failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>
