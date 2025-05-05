<template>
  <div>
    <!-- Loading state while checking authentication -->
    <div
      v-if="isLoading"
      class="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <div class="text-center">
        <div
          class="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"
        ></div>
        <h2 class="text-xl text-gray-700">Loading...</h2>
      </div>
    </div>

    <!-- Landing page content shown when user is not authenticated -->
    <div v-else-if="!isAuthenticated">
      <h1>HELLO LANDING PAGE</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "landing",
});

const router = useRouter();
const { isAuthenticated } = useAuth();
const isLoading = ref(true);

// Check authentication status and redirect if needed
onMounted(() => {
  // Short timeout to ensure auth state is loaded
  setTimeout(() => {
    isLoading.value = false;
    if (isAuthenticated.value) {
      router.push("/dashboard");
    }
  }, 500);
});

// Watch for changes in authentication status
watch(isAuthenticated, (newValue) => {
  if (newValue) {
    router.push("/dashboard");
  }
});
</script>
