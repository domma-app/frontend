<template>
  <div class="bg-white py-12 sm:py-16 lg:py-20">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Contact Us
        </h1>
        <p class="mt-4 text-lg text-gray-600">
          Have questions about DOMMA? We're here to help.
        </p>
      </div>

      <div class="bg-white border border-gray-200 rounded-md p-8">
        <form action="#" method="POST" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Name</label
            >
            <input
              type="text"
              name="name"
              id="name"
              autocomplete="name"
              placeholder="Your name"
              class="mt-1 block w-full border border-gray-300 rounded-md py-3 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              placeholder="your.email@example.com"
              class="mt-1 block w-full border border-gray-300 rounded-md py-3 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label for="subject" class="block text-sm font-medium text-gray-700"
              >Subject</label
            >
            <select
              id="subject"
              name="subject"
              class="mt-1 block w-full border border-gray-300 rounded-md py-3 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="" disabled selected>
                Please select a subject
              </option>
              <option value="general">General Question</option>
              <option value="support">Technical Support</option>
              <option value="feedback">Feedback</option>
              <option value="partnership">Partnership</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-700"
              >Message</label
            >
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="How can we help you?"
              class="mt-1 block w-full border border-gray-300 rounded-md py-3 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              required
            ></textarea>
          </div>

          <div class="flex items-center">
            <input
              id="privacy"
              name="privacy"
              type="checkbox"
              class="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
              required
            />
            <label for="privacy" class="ml-2 block text-sm text-gray-700">
              I agree to the
              <NuxtLink
                to="/privacy-policy"
                class="text-green-500 hover:text-green-600"
                >Privacy Policy</NuxtLink
              >
            </label>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="flex justify-center">
            <svg
              class="h-10 w-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
          </div>
          <h3 class="mt-2 text-lg font-medium text-gray-900">Phone</h3>
          <p class="mt-1 text-gray-600">+62 123 4567 890</p>
        </div>

        <div class="text-center">
          <div class="flex justify-center">
            <svg
              class="h-10 w-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <h3 class="mt-2 text-lg font-medium text-gray-900">Email</h3>
          <p class="mt-1 text-gray-600">support@domma.app</p>
        </div>

        <div class="text-center">
          <div class="flex justify-center">
            <svg
              class="h-10 w-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </div>
          <h3 class="mt-2 text-lg font-medium text-gray-900">Office</h3>
          <p class="mt-1 text-gray-600">Jakarta, Indonesia</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "landing",
});
</script>
