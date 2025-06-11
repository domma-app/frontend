<template>
  <section id="features" class="py-16 relative overflow-hidden">
    <!-- Decorative elements -->
    <div
      class="absolute -top-40 -left-40 w-80 h-80 bg-gray-50 rounded-full opacity-70"
    ></div>
    <div
      class="absolute -bottom-40 -right-40 w-80 h-80 bg-gray-50 rounded-full opacity-70"
    ></div>

    <div class="container mx-auto relative z-10">
      <div
        class="text-center max-w-3xl mx-auto mb-16 fade-in"
        style="animation-delay: 0.5s"
      >
        <h2
          class="text-base font-semibold tracking-wide uppercase text-green-500"
        >
          Key Features
        </h2>
        <p
          class="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900"
        >
          Smart Financial Management
        </p>
        <p class="mt-5 text-xl text-gray-500">
          DOMMA provides all the tools you need to manage your finances during
          college.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <!-- Combined ML feature card -->
        <div
          class="bg-white border border-gray-200 rounded-md p-8 fade-in transition-all"
          style="animation-delay: 0.7s"
        >
          <div class="flex flex-col items-start">
            <div
              class="flex items-center justify-center h-14 w-14 rounded-full bg-green-100 text-green-600 mb-5"
            >
              <svg
                class="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              Smart ML Predictions
            </h3>
            <p class="text-gray-600">
              Our AI system both classifies your expenses into meaningful
              categories and forecasts your future spending patterns to help you
              plan ahead.
            </p>
          </div>
        </div>

        <!-- Expense Tracking -->
        <div
          class="bg-white border border-gray-200 rounded-md p-8 fade-in transition-all"
          style="animation-delay: 0.8s"
        >
          <div class="flex flex-col items-start">
            <div
              class="flex items-center justify-center h-14 w-14 rounded-full bg-green-100 text-green-600 mb-5"
            >
              <svg
                class="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              Expense Tracking
            </h3>
            <p class="text-gray-600">
              Record and organize your expenses in categories to gain insight
              into your spending behaviors and identify areas for improvement.
            </p>
          </div>
        </div>

        <!-- Budget Management -->
        <div
          class="bg-white border border-gray-200 rounded-md p-8 fade-in transition-all"
          style="animation-delay: 0.9s"
        >
          <div class="flex flex-col items-start">
            <div
              class="flex items-center justify-center h-14 w-14 rounded-full bg-green-100 text-green-600 mb-5"
            >
              <svg
                class="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              Budget Management
            </h3>
            <p class="text-gray-600">
              Set up monthly budgets and track your progress to ensure you stay
              within your financial limits and meet your savings goals.
            </p>
          </div>
        </div>

        <!-- Stock Analysis -->
        <div
          class="bg-white border border-gray-200 rounded-md p-8 fade-in transition-all"
          style="animation-delay: 1s"
        >
          <div class="flex flex-col items-start">
            <div
              class="flex items-center justify-center h-14 w-14 rounded-full bg-green-100 text-green-600 mb-5"
            >
              <svg
                class="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Stock Analysis</h3>
            <p class="text-gray-600">
              Explore and analyze stocks with our beginner-friendly tools
              designed to help students learn about investing and building
              wealth.
            </p>
          </div>
        </div>

        <!-- Financial Insights -->
        <div
          class="bg-white border border-gray-200 rounded-md p-8 fade-in transition-all"
          style="animation-delay: 1.1s"
        >
          <div class="flex flex-col items-start">
            <div
              class="flex items-center justify-center h-14 w-14 rounded-full bg-green-100 text-green-600 mb-5"
            >
              <svg
                class="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              Financial Insights
            </h3>
            <p class="text-gray-600">
              Get personalized insights and tips to help you make better
              financial decisions based on your spending habits.
            </p>
          </div>
        </div>

        <!-- Challenges -->
        <div
          class="bg-white border border-gray-200 rounded-md p-8 fade-in transition-all"
          style="animation-delay: 1.2s"
        >
          <div class="flex flex-col items-start">
            <div
              class="flex items-center justify-center h-14 w-14 rounded-full bg-green-100 text-green-600 mb-5"
            >
              <svg
                class="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              Financial Challenges
            </h3>
            <p class="text-gray-600">
              Join money-saving challenges to boost your financial discipline
              while competing with peers for badges and rewards.
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
const nextSectionId = "testimonials";

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
