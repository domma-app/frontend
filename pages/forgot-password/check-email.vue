<template>
  <div
    class="min-h-screen flex justify-center items-center p-6 bg-gradient-to-br from-gray-50 to-gray-100"
  >
    <AuthCard
      title="Check your email"
      subtitle="We have sent password reset instructions to your email"
    >
      <div class="text-center">
        <div class="mb-8">
          <div
            class="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md shadow-green-100"
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
              The email may take a minute to arrive. Be sure to check your spam
              folder.
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
    </AuthCard>
  </div>
</template>

<script setup lang="ts"></script>
