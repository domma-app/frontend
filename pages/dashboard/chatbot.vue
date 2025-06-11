<template>
  <div>
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">AI Assistant</h1>
          <p class="text-gray-600">
            Get financial advice and answers to your questions
          </p>
        </div>
        <div class="bg-green-50 rounded-full p-3">
          <svg
            class="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.294 48.294 0 01-8.135-1.587c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Chatbot Container -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="max-w-4xl mx-auto">
        <div class="mb-4 bg-green-50 rounded-lg p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0 mt-0.5">
              <svg
                class="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">
                Financial Assistant
              </h3>
              <div class="mt-2 text-sm text-green-700">
                <p>Ask me anything about:</p>
                <ul class="list-disc pl-5 mt-1 space-y-1">
                  <li>Budgeting and saving strategies</li>
                  <li>Financial goal planning</li>
                  <li>Student finance management</li>
                  <li>Investment basics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Embed the ChatBot component -->
        <ChatBot expanded />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
</script>
