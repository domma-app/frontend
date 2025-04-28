<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <p class="text-gray-500">Redirecting to login...</p>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

// Redirect to login page
onMounted(() => {
  router.push("/login");
});
</script>
