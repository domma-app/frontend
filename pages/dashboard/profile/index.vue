<template>
  <div>
    <!-- Page title -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Profile</h1>
      <p class="text-gray-600">
        Manage your account information and preferences
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Profile sidebar -->
      <div class="lg:col-span-1">
        <ProfileSidebar />
      </div>

      <!-- Main content -->
      <div class="lg:col-span-2">
        <ProfilePersonalInfo v-if="activeSection === 'personal'" />
        <ProfilePreferences v-else-if="activeSection === 'preferences'" />
        <ProfileFinancialGoals v-else-if="activeSection === 'goals'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

const route = useRoute();
const activeSection = ref("personal");

// Watch for query param changes to update active section
watchEffect(() => {
  // Support both 'section' and 'tab' query parameters
  const section = route.query.section as string;
  const tab = route.query.tab as string;

  if (section && ["personal", "preferences", "goals"].includes(section)) {
    activeSection.value = section;
  } else if (tab === "settings") {
    // When "settings" tab is requested, show preferences section
    activeSection.value = "preferences";
  }
});
</script>
