<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <!-- User info section -->
    <div class="flex flex-col items-center mb-6">
      <div class="bg-green-50 rounded-full p-4 mb-3">
        <div
          v-if="user?.profile_picture_url"
          class="w-20 h-20 rounded-full bg-cover bg-center"
          :style="`background-image: url('${user.profile_picture_url}')`"
        ></div>
        <div
          v-else
          class="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold"
        >
          {{ userInitials }}
        </div>
      </div>
      <h2 class="text-xl font-semibold text-gray-800">{{ userName }}</h2>
      <p class="text-gray-500">
        {{ user?.university || "University Student" }}
      </p>
      <p class="text-sm text-gray-500">{{ user?.major || "Major" }}</p>
    </div>

    <!-- Navigation links -->
    <div class="space-y-2">
      <NuxtLink
        :to="{ path: '/dashboard/profile', query: { section: 'personal' } }"
        class="flex items-center px-4 py-2 rounded-md transition-colors"
        :class="[
          activeSection === 'personal'
            ? 'bg-green-50 text-green-500'
            : 'text-gray-700 hover:bg-gray-50 hover:text-green-500',
        ]"
      >
        <svg
          class="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          ></path>
        </svg>
        <span>Personal Information</span>
      </NuxtLink>

      <NuxtLink
        :to="{ path: '/dashboard/profile', query: { section: 'preferences' } }"
        class="flex items-center px-4 py-2 rounded-md transition-colors"
        :class="[
          activeSection === 'preferences'
            ? 'bg-green-50 text-green-500'
            : 'text-gray-700 hover:bg-gray-50 hover:text-green-500',
        ]"
      >
        <svg
          class="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          ></path>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
        <span>Preferences</span>
      </NuxtLink>

      <NuxtLink
        :to="{ path: '/dashboard/profile', query: { section: 'goals' } }"
        class="flex items-center px-4 py-2 rounded-md transition-colors"
        :class="[
          activeSection === 'goals'
            ? 'bg-green-50 text-green-500'
            : 'text-gray-700 hover:bg-gray-50 hover:text-green-500',
        ]"
      >
        <svg
          class="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          ></path>
        </svg>
        <span>Financial Goals</span>
      </NuxtLink>
    </div>

    <!-- Account stats -->
    <div class="mt-6 pt-6 border-t border-gray-100">
      <h3 class="text-sm font-medium text-gray-500 mb-3">Account Stats</h3>
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Member since</span>
          <span class="text-sm font-medium">{{ memberSince }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Transactions</span>
          <span class="text-sm font-medium">{{ transactionCount }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Challenges completed</span>
          <span class="text-sm font-medium">{{ challengesCompleted }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { user } = useAuth();

// Get active section from route query
const activeSection = computed(() => {
  return route.query.section || "personal";
});

// Get user's name and initials for display
const userName = computed(() => {
  return user.value?.full_name || "Student";
});

const userInitials = computed(() => {
  const name = userName.value;
  if (!name || name === "Student") return "S";

  const parts = name.split(" ");
  if (parts.length === 1) return name.charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
});

// Format member since date
const memberSince = computed(() => {
  if (!user.value?.created_at) return "N/A";

  const date = new Date(user.value.created_at);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
});

// Mock data for stats - later, these would come from API calls
const transactionCount = ref(24);
const challengesCompleted = ref(3);
</script>
