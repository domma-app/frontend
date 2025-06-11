<template>
  <section id="about" class="py-20 bg-white">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="fade-in" style="animation-delay: 0.5s">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
            About DOMMA
          </h2>
          <p class="text-lg text-gray-600 mb-6">
            DOMMA was created with a simple mission: to help students manage
            their finances effectively during their academic years and develop
            healthy financial habits for life.
          </p>
          <p class="text-lg text-gray-600 mb-6">
            Our team of financial experts and software developers have combined
            forces to create intuitive tools for expense tracking, budgeting,
            and financial planning tailored specifically to student needs.
          </p>
          <div class="flex items-center">
            <div class="flex -space-x-2 mr-4">
              <img
                class="h-10 w-10 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Team member"
              />
              <img
                class="h-10 w-10 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Team member"
              />
              <img
                class="h-10 w-10 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/men/76.jpg"
                alt="Team member"
              />
            </div>
            <span class="text-sm text-gray-500"
              >Joined by 15+ financial experts</span
            >
          </div>
        </div>
        <div class="relative fade-in" style="animation-delay: 0.7s">
          <img
            src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            alt="Team discussing financial app"
            class="rounded-md border border-gray-200"
          />
          <div
            class="absolute -bottom-6 -right-6 bg-white border border-gray-200 rounded-md p-4 w-64"
          >
            <p class="font-medium text-gray-900">Our Mission</p>
            <p class="text-sm text-gray-600 mt-1">
              Empowering students with financial intelligence for a brighter
              future.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Down arrow -->
    <div class="flex justify-center mt-16">
      <button
        @click="scrollToNextSection"
        class="animate-bounce bg-white border border-gray-200 rounded-full p-2 hover:border-green-500 transition-colors"
      >
        <svg
          class="w-6 h-6 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const nextSectionId = "faq";

const scrollToNextSection = () => {
  const element = document.getElementById(nextSectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style scoped>
/* Component-specific styles here */
</style>
