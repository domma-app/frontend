<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Decorative left panel - hidden on mobile, visible on md screens and up -->
    <div
      class="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-400 to-green-600 relative overflow-hidden"
    >
      <div class="absolute inset-0 bg-pattern opacity-10"></div>
      <div
        class="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white"
      >
        <div
          class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-8 shadow-lg"
        >
          <svg
            class="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h1 class="text-4xl font-bold mb-3">Check your inbox</h1>
        <p class="text-lg mb-8 text-center opacity-90">
          We've sent you an email with instructions to reset your password.
        </p>

        <!-- Decorative elements -->
        <div
          class="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm"
        ></div>
        <div
          class="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm"
        ></div>
        <div
          class="absolute bottom-40 left-20 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"
        ></div>
      </div>
    </div>

    <!-- Right panel with content -->
    <div
      class="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div class="text-center">
          <div class="mb-8">
            <div
              class="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md"
            >
              <svg
                class="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-3">
              Check your email
            </h2>
            <p class="text-gray-600 mb-6 px-2">
              Please check your email inbox and follow the instructions to reset
              your password.
            </p>
            <div
              class="flex items-center justify-center p-4 bg-blue-50 rounded-lg border border-blue-100 mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-blue-500 mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p class="text-blue-600 text-sm">
                The email may take a minute to arrive. Be sure to check your
                spam folder.
              </p>
            </div>
            <p class="text-sm text-gray-500">
              Didn't receive the email?
              <NuxtLink
                to="/forgot-password"
                class="text-green-500 font-medium hover:text-green-600 transition-colors hover:underline"
              >
                Try again
              </NuxtLink>
            </p>
          </div>

          <NuxtLink
            to="/login"
            class="block w-full bg-green-500 px-6 py-3.5 rounded-lg text-white font-medium transition-all hover:bg-green-600 text-center shadow-md hover:shadow-lg shadow-green-500/20 active:scale-[0.98]"
          >
            Back to login
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size: 60px 60px;
}
</style>
