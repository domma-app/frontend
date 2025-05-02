<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1>Redirecting to dashboard...</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

// Redirect to dashboard page after login
onMounted(() => {
  // TODO: check if the user is logged in first before redirect
  router.push("/dashboard");
});
</script>
