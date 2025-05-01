<template>
  <div class="min-h-screen flex justify-center items-center bg-gray-50 p-6">
    <AuthCard
      title="Password Reset Successfully"
      subtitle="Your password has been reset successfully"
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p class="text-gray-600 mb-4">
            You can now use your new password to log in to your account.
          </p>
        </div>

        <NuxtLink
          to="/login"
          class="block w-full py-3 px-6 bg-green-500 text-white font-medium rounded-lg transition-colors hover:bg-green-600 text-center"
        >
          Continue to Login
        </NuxtLink>
      </div>
    </AuthCard>
  </div>
</template>

<!-- <template>
    <div class="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <AuthCard
        title="Password Reset Successfully"
        subtitle="Your password has been reset successfully"
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p class="text-gray-600 mb-4">
              You can now use your new password to log in to your account.
            </p>
          </div>
  
          <NuxtLink
            to="/login"
            class="block w-full py-3 px-6 bg-green-500 text-white font-medium rounded-lg transition-colors hover:bg-green-600 text-center"
          >
            Continue to Login
          </NuxtLink>
        </div>
      </AuthCard>
    </div>
  </template> -->
