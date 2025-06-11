<template>
  <nav class="bg-white border-b border-gray-100 fixed top-0 w-full z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between h-16">
        <!-- Logo and brand -->
        <div class="flex-shrink-0 flex items-center">
          <NuxtLink to="/" class="text-green-500 font-bold text-xl">
            DOMMA
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <NuxtLink
            to="/login"
            class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-500 transition-colors"
          >
            Sign In
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="ml-2 px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
          >
            Sign Up
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <div class="flex md:hidden items-center">
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            type="button"
            class="p-2 rounded-md text-gray-700 hover:text-green-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            aria-controls="mobile-menu"
            :aria-expanded="isMobileMenuOpen"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              v-if="!isMobileMenuOpen"
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-if="isMobileMenuOpen"
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden border-t border-gray-100">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <NuxtLink
          to="/login"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-500 hover:bg-gray-50"
        >
          Sign In
        </NuxtLink>
        <NuxtLink
          to="/register"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-500 hover:bg-gray-50"
        >
          Sign Up
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false);
const activeSection = ref("");

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    activeSection.value = sectionId;
  }
};

// Track active section while scrolling
onMounted(() => {
  const sections = ["features", "testimonials", "about", "faq", "contact"];

  const observerOptions = {
    root: null,
    rootMargin: "-80px 0px -80px 0px",
    threshold: 0.1,
  };

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  sections.forEach((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      observer.observe(element);
    }
  });
});
</script>
