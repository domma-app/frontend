<template>
  <nav class="bg-white shadow">
    <div class="container mx-auto px-4">
      <div class="flex justify-between h-16">
        <!-- Logo and brand -->
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center">
            <span class="text-green-500 font-bold text-xl">DOMMA</span>
          </div>
        </div>

        <!-- Navigation items -->
        <div class="hidden md:flex items-center space-x-4">
          <NuxtLink
            to="/dashboard"
            class="px-3 py-2 text-sm font-medium transition-colors"
            :class="[
              $route.path === '/dashboard'
                ? 'text-green-500'
                : 'text-gray-700 hover:text-green-500',
            ]"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink
            to="/transaction"
            class="px-3 py-2 text-sm font-medium transition-colors"
            :class="[
              $route.path === '/transaction'
                ? 'text-green-500'
                : 'text-gray-700 hover:text-green-500',
            ]"
          >
            Transaction
          </NuxtLink>
          <NuxtLink
            to="/budget"
            class="px-3 py-2 text-sm font-medium transition-colors"
            :class="[
              $route.path === '/budget'
                ? 'text-green-500'
                : 'text-gray-700 hover:text-green-500',
            ]"
          >
            Budget
          </NuxtLink>
          <NuxtLink
            to="/challenges"
            class="px-3 py-2 text-sm font-medium transition-colors"
            :class="[
              $route.path === '/challenges'
                ? 'text-green-500'
                : 'text-gray-700 hover:text-green-500',
            ]"
          >
            Challenges
          </NuxtLink>

          <!-- Profile link -->
          <NuxtLink
            to="/profile"
            class="flex items-center px-3 py-2 text-sm font-medium transition-colors"
            :class="[
              $route.path === '/profile'
                ? 'text-green-500'
                : 'text-gray-700 hover:text-green-500',
            ]"
          >
            <span>Profile</span>
            <svg
              class="ml-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const $route = useRoute();
</script>
