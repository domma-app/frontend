<template>
  <div>
    <!-- Loading state while checking authentication -->
    <div
      v-if="isLoading"
      class="min-h-screen bg-white flex items-center justify-center"
    >
      <div class="text-center bg-white">
        <div
          class="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"
        ></div>
        <h2 class="text-xl text-gray-700">Loading...</h2>
      </div>
    </div>

    <!-- Landing page content shown when user is not authenticated -->
    <div v-else-if="!isAuthenticated" class="landing-content">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <AboutSection />
      <FaqSection />
      <ContactSection />

      <!-- CTA Section -->
      <section class="bg-green-500 py-12 not-full-height">
        <div
          class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
        >
          <h2
            class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            <span class="block">Ready to manage your finances?</span>
            <span class="block text-green-100"
              >Start your financial journey today.</span
            >
          </h2>
          <div class="ml-8"></div>
          <div class="mt-24 flex lg:mt-0 lg:flex-shrink-0">
            <div class="inline-flex rounded-md shadow">
              <NuxtLink
                to="/register"
                class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-green-600 bg-white hover:bg-green-50"
              >
                Register Now
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeroSection from "~/components/landing/HeroSection.vue";
import FeaturesSection from "~/components/landing/FeaturesSection.vue";
import TestimonialsSection from "~/components/landing/TestimonialsSection.vue";
import AboutSection from "~/components/landing/AboutSection.vue";
import FaqSection from "~/components/landing/FaqSection.vue";
import ContactSection from "~/components/landing/ContactSection.vue";

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

<style scoped>
.landing-content section {
  min-height: calc(100vh - 64px); /* Subtract navbar height */
  padding-top: 64px; /* Add padding equal to navbar height */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.landing-content section.not-full-height {
  min-height: auto;
}
</style>
