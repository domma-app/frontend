<template>
  <section class="py-16 md:py-20 lg:py-24">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Left Column: Text content -->
        <div class="fade-in" style="animation-delay: 0.1s">
          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight"
          >
            <span class="block">Manage Student</span>
            <span class="block text-green-500">Finances Smartly</span>
          </h1>
          <p class="mt-6 text-xl text-gray-600 max-w-2xl">
            A financial app designed for students to manage expenses, track
            budgets, and analyze spending patterns with our smart classification
            system.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <NuxtLink
              to="/register"
              class="inline-block px-8 py-3.5 text-base font-medium rounded-md text-white bg-green-500 hover:outline hover:outline-offset-2 hover:outline-green-500 transition-all"
            >
              Get Started for Free
            </NuxtLink>
            <NuxtLink
              to="/login"
              class="inline-block px-8 py-3.5 text-base font-medium rounded-md text-gray-700 bg-gray-100 border border-gray-200 hover:outline hover:outline-offset-2 hover:outline-gray-300 transition-all"
            >
              Sign In
            </NuxtLink>
          </div>
        </div>

        <!-- Right Column: Image -->
        <div class="relative fade-in" style="animation-delay: 0.3s">
          <!-- Main Image -->
          <div
            class="relative z-10 rounded-2xl overflow-hidden border border-gray-200 transform -rotate-2 hover:rotate-0 transition-all duration-500"
          >
            <img
              class="w-full h-auto"
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
              alt="Student finance management"
            />
          </div>

          <!-- Stats card -->
          <div
            class="absolute -bottom-6 -left-6 lg:bottom-8 lg:left-8 bg-white border border-gray-200 p-4 z-10 rounded-lg"
          >
            <p class="text-sm text-gray-500 font-medium">Average Savings</p>
            <p class="text-2xl text-green-500 font-bold">+27%</p>
            <div
              class="mt-1 w-full bg-gray-100 h-2 rounded-full overflow-hidden"
            >
              <div
                class="bg-green-500 h-full rounded-full"
                style="width: 78%"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="h-16"></div>

      <!-- Down arrow -->
      <div class="flex justify-center mt-8">
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
    </div>
  </section>
</template>

<script setup lang="ts">
const nextSectionId = "features";

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
