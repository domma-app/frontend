<template>
  <section id="testimonials" class="py-20 relative">
    <div class="container mx-auto px-4">
      <div
        class="text-center max-w-3xl mx-auto mb-16 fade-in"
        style="animation-delay: 0.7s"
      >
        <h2
          class="text-base font-semibold tracking-wide uppercase text-green-500"
        >
          Testimonials
        </h2>
        <p
          class="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900"
        >
          What Our Users Say
        </p>
      </div>

      <!-- Mobile View: Stacked testimonials -->
      <div class="sm:hidden space-y-6">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="bg-white border border-gray-200 rounded-md p-4 h-full flex flex-col transition-all"
        >
          <div class="flex items-center mb-4">
            <div
              class="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-600"
            >
              {{ testimonial.name.charAt(0) }}
            </div>
            <div class="ml-3">
              <h4 class="text-base font-bold text-gray-900">
                {{ testimonial.name }}
              </h4>
              <p class="text-xs text-gray-600">
                {{ testimonial.role }}
              </p>
            </div>
          </div>
          <div class="mb-3">
            <div class="flex space-x-1">
              <svg
                v-for="i in 5"
                :key="i"
                class="w-4 h-4"
                :class="
                  i <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                ></path>
              </svg>
            </div>
          </div>
          <p class="text-gray-600 text-sm flex-grow">
            {{ testimonial.text }}
          </p>
        </div>
      </div>

      <!-- Tablet/Desktop View: Carousel -->
      <div class="relative hidden sm:block">
        <!-- Testimonial Carousel -->
        <div
          class="testimonial-carousel relative overflow-hidden"
          style="width: 100%"
        >
          <div
            class="carousel-inner flex transition-transform duration-1000 ease-in-out"
            :style="{
              transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)`,
              width: `${testimonials.length * (100 / itemsPerView)}%`,
            }"
          >
            <div
              v-for="(testimonial, index) in testimonials"
              :key="index"
              class="carousel-item flex-shrink-0 px-2"
              :style="{ width: `${100 / itemsPerView}%` }"
            >
              <div
                class="bg-white border border-gray-200 rounded-md p-6 md:p-8 h-full flex flex-col transition-all"
              >
                <div class="flex items-center mb-6">
                  <div
                    class="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-600"
                  >
                    {{ testimonial.name.charAt(0) }}
                  </div>
                  <div class="ml-4">
                    <h4 class="text-lg font-bold text-gray-900">
                      {{ testimonial.name }}
                    </h4>
                    <p class="text-sm text-gray-600">
                      {{ testimonial.role }}
                    </p>
                  </div>
                </div>
                <div class="mb-4">
                  <div class="flex space-x-1">
                    <svg
                      v-for="i in 5"
                      :key="i"
                      class="w-5 h-5"
                      :class="
                        i <= testimonial.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <p class="text-gray-600 text-base md:text-lg flex-grow">
                  {{ testimonial.text }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel indicators -->
        <div class="flex justify-center mt-8">
          <button
            v-for="(_, index) in Math.ceil(
              testimonials.length - (itemsPerView - 1)
            )"
            :key="index"
            @click="setSlide(index)"
            class="w-3 h-3 mx-1 rounded-full transition-colors"
            :class="index === currentSlide ? 'bg-green-500' : 'bg-gray-300'"
          ></button>
        </div>
      </div>
    </div>

    <!-- Down arrow -->
    <div class="flex justify-center mt-10 sm:mt-16">
      <button
        @click="scrollToNextSection"
        class="animate-bounce bg-white border border-gray-200 rounded-full p-2 hover:border-green-500 transition-colors"
      >
        <svg
          class="w-5 h-5 sm:w-6 sm:h-6 text-green-500"
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
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

// Testimonial data
const testimonials = [
  {
    name: "Ahmad",
    role: "Engineering Student, UI",
    rating: 5,
    text: "This app helps me manage my monthly budget better. The expenditure classification feature really helps me understand my spending habits.",
  },
  {
    name: "Sarah",
    role: "Medical Student, UGM",
    rating: 5,
    text: "The budget tracking feature helps me save for my expenses. I love how the app forecasts my future spending to help plan ahead.",
  },
  {
    name: "Raka",
    role: "Computer Science Student, ITB",
    rating: 4,
    text: "The stock analyzer tool gives me a good introduction to investments. The app makes financial concepts accessible to students like me.",
  },
  {
    name: "Diana",
    role: "Economics Student, UNPAD",
    rating: 5,
    text: "The challenges feature made saving money fun! I've already completed three challenges and saved enough for my semester books.",
  },
];

// Responsive items per view
const windowWidth = ref(
  typeof window !== "undefined" ? window.innerWidth : 1200
);

// Items per view based on screen size
const itemsPerView = computed(() => {
  if (windowWidth.value < 1024) return 2; // Tablet: 2 items
  return 3; // Desktop: 3 items
});

// Update window width on resize
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

// Carousel functionality
const currentSlide = ref(0);
const carouselInterval = ref<ReturnType<typeof setInterval> | null>(null);

onMounted(() => {
  // Listen for window resize
  window.addEventListener("resize", updateWindowWidth);

  // Auto-sliding carousel
  carouselInterval.value = setInterval(() => {
    nextSlide();
  }, 5000);
});

onBeforeUnmount(() => {
  // Clean up
  window.removeEventListener("resize", updateWindowWidth);
  if (carouselInterval.value) {
    clearInterval(carouselInterval.value);
  }
});

const nextSlide = () => {
  currentSlide.value =
    (currentSlide.value + 1) % (testimonials.length - (itemsPerView.value - 1));
};

const setSlide = (index: number) => {
  currentSlide.value = index;
};

// Navigation to next section
const nextSectionId = "about";

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
