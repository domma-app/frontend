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
          <h2 class="text-3xl font-bold mb-4">Join DOMMA</h2>
          <p class="text-lg mb-8 max-w-md leading-relaxed">
            Create an account to start managing your finances effectively.
          </p>
        </div>

        <!-- Mobile header -->
        <div class="lg:hidden text-center">
          <h1 class="text-3xl font-bold mb-2">DOMMA</h1>
          <p class="text-lg mb-4">Your personal finance manager</p>
        </div>
      </div>
    </div>

    <!-- Right panel with registration form -->
    <div
      class="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white overflow-auto"
    >
      <!-- Toast notification -->
      <Toast
        :show="showToast"
        :message="toastMessage"
        :type="toastType"
        @dismiss="dismissToast"
      />

      <div class="w-full max-w-lg">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800">Create account</h2>
          <p class="text-gray-600 mt-1">Fill in your details to get started</p>
        </div>

        <form @submit.prevent="handleRegister" class="w-full">
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
              class="flex items-start gap-2 text-sm text-gray-700 cursor-pointer group"
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
            class="w-full bg-green-500 py-3 px-6 text-white rounded-lg font-medium transition-all hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center shadow-sm hover:shadow-md active:scale-[0.99]"
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

          <div class="relative mt-8 mb-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-gray-500"
                >Already have an account?</span
              >
            </div>
          </div>

          <button
            type="button"
            @click="$router.push('/login')"
            class="w-full py-3 px-6 bg-gray-100 text-center rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-colors"
          >
            Sign in
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

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const agreeToTerms = ref(false);
const isLoading = ref(false);
const error = ref("");
const router = useRouter();
const { register, login } = useAuth();
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
    showSuccessToast("Registration successful! Logging you in...");

    try {
      // Immediately login after successful registration
      await login({
        email: email.value,
        password: password.value,
        rememberMe: true,
      });

      // Redirect to dashboard after successful login
      router.push("/dashboard");
    } catch (loginErr: any) {
      // If login fails, still show success for registration but redirect to login page
      console.error("Auto-login failed:", loginErr);
      showSuccessToast("Registration successful! Please log in.");

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  } catch (err: any) {
    error.value = err.message || "Registration failed. Please try again.";
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
