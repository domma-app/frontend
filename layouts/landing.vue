<template>
  <div
    class="landing-layout min-h-screen flex flex-col bg-white overflow-hidden"
  >
    <!-- Animated background elements with muted colors -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-0 left-0 w-96 h-96 bg-gray-50/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-float-slow"
      ></div>
      <div
        class="absolute top-1/4 right-0 w-64 h-64 bg-gray-50/30 rounded-full blur-2xl translate-x-1/3 animate-float-medium"
      ></div>
      <div
        class="absolute bottom-0 left-1/3 w-80 h-80 bg-gray-50/30 rounded-full blur-3xl animate-float-fast"
      ></div>
    </div>

    <!-- Navigation bar -->
    <HomeNavbar class="relative z-10" />

    <!-- Main content -->
    <main
      class="flex-grow relative z-10 container mx-auto px-2 md:px-4 lg:px-6 max-w-7xl w-full pt-16"
    >
      <slot />
    </main>

    <!-- Footer -->
    <HomeFooter class="relative z-10" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.landing-layout .not-full-height {
  min-height: auto !important;
  display: block !important;
  align-items: initial !important;
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0) translateX(-50%);
  }
  50% {
    transform: translateY(-20px) translateX(-40%);
  }
}

@keyframes float-medium {
  0%,
  100% {
    transform: translateY(0) translateX(33%);
  }
  50% {
    transform: translateY(-15px) translateX(40%);
  }
}

@keyframes float-fast {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-25px) translateX(15px);
  }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 6s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 5s ease-in-out infinite;
}

/* Fade in animation for content */
.landing-layout .fade-in {
  animation: fadeIn 0.8s ease forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Ensure the layout has proper spacing for the content */
.landing-layout main {
  padding-top: 0;
  padding-bottom: 0;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .landing-layout main {
    padding-top: 0;
    padding-bottom: 0;
  }
}

@media (min-width: 1024px) {
  .landing-layout main {
    padding-top: 0;
    padding-bottom: 0;
  }
}

/* Make sections fill the viewport height */
.landing-layout section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 4rem 0;
}

/* Container adjustments */
.landing-layout .container {
  width: 100%;
  max-width: 1400px;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 768px) {
  .landing-layout .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .landing-layout .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
