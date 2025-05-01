<template>
  <div class="min-h-screen flex justify-center items-center p-6 bg-gray-50">
    <AuthCard
      title="Check your email"
      subtitle="We have sent password reset instructions to your email"
    >
      <div class="text-center">
        <div class="mb-6">
          <div
            class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-green-500"
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
          <p class="text-gray-600 mb-4">
            Please check your email inbox and follow the instructions to reset
            your password.
          </p>
          <p class="text-sm text-gray-500">
            Didn't receive the email? Check your spam folder or
            <NuxtLink
              to="/forgot-password"
              class="text-green-500 font-medium hover:text-green-600 transition-colors"
            >
              try again
            </NuxtLink>
          </p>
        </div>

        <NuxtLink
          to="/login"
          class="block w-full bg-green-500 px-6 py-3 rounded-lg text-white font-medium transition-colors hover:bg-green-600 text-center"
        >
          Back to login
        </NuxtLink>
      </div>
    </AuthCard>
  </div>
</template>

<script setup lang="ts"></script>
