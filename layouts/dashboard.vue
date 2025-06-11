<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <DashboardNavbar />
    <main class="flex-grow container mx-auto px-4 pt-24 pb-6">
      <slot />
    </main>
    <Footer />
    <!-- Floating ChatBot button -->
    <ChatBot />
  </div>
</template>

<script setup lang="ts">
const { isAuthenticated } = useAuth();
const router = useRouter();

// Redirect to home page if not authenticated
onMounted(() => {
  if (!isAuthenticated.value) {
    router.push("/");
  }
});

// Watch for changes in authentication status
watch(isAuthenticated, (newValue) => {
  if (!newValue) {
    router.push("/");
  }
});
</script>
