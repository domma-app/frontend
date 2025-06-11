<template>
  <section id="faq" class="py-20">
    <div class="container mx-auto">
      <div
        class="text-center max-w-3xl mx-auto mb-16 fade-in"
        style="animation-delay: 0.5s"
      >
        <h2
          class="text-base font-semibold tracking-wide uppercase text-green-500"
        >
          FAQ
        </h2>
        <p
          class="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900"
        >
          Frequently Asked Questions
        </p>
        <p class="mt-5 text-xl text-gray-500">
          Get answers to common questions about the DOMMA app.
        </p>
      </div>

      <div class="max-w-3xl mx-auto divide-y divide-gray-200">
        <div v-for="(item, index) in faqItems" :key="index">
          <button
            @click="toggleFaq(index)"
            class="w-full flex justify-between items-center py-6 text-left"
          >
            <span class="text-lg font-medium text-gray-900">
              {{ item.question }}
            </span>
            <svg
              class="h-6 w-6 text-gray-500 transform transition-transform duration-200"
              :class="{ 'rotate-180': openFaq === index }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            v-show="openFaq === index"
            class="pb-6 text-gray-600 leading-relaxed"
          >
            {{ item.answer }}
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
const openFaq = ref<number | null>(null);

const toggleFaq = (index: number) => {
  if (openFaq.value === index) {
    openFaq.value = null;
  } else {
    openFaq.value = index;
  }
};

const faqItems = [
  {
    question: "How does the expense classification work?",
    answer:
      "Our app uses machine learning algorithms to analyze your transactions and automatically categorize them into various expense types such as food, transportation, entertainment, etc. The system becomes more accurate over time as it learns from your spending patterns.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Absolutely. We take your privacy and data security very seriously. We use bank-level encryption to protect your data, and we never sell your personal information to third parties. You can review our privacy policy for more details.",
  },
  {
    question: "Can I connect my bank account to the app?",
    answer:
      "Yes, you can connect your bank accounts to automatically import transactions. We support most major banks and financial institutions. The connection is secure and uses read-only access, meaning no one can move money through the app.",
  },
  {
    question: "Is the app free for students?",
    answer:
      "Yes, DOMMA offers a free tier specifically designed for students. This includes all the core features like expense tracking, budgeting, and basic AI analysis. Premium features are available through our subscription plans.",
  },
  {
    question: "How do the financial challenges work?",
    answer:
      "Our challenges feature provides structured saving goals and spending limitations to help you build financial discipline. You can join challenges, compete with friends, and earn badges as you meet your targets. Each challenge has specific rules and timeframes.",
  },
];

// Navigation to next section
const nextSectionId = "contact";

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
