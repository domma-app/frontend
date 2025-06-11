<template>
  <section id="contact" class="py-20 bg-white">
    <div class="container mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2
          class="text-base font-semibold tracking-wide uppercase text-green-500"
        >
          Contact Us
        </h2>
        <p
          class="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900"
        >
          Get In Touch
        </p>
        <p class="mt-5 text-xl text-gray-500">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </div>

      <div class="max-w-3xl mx-auto">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
            <div>
              <label
                for="first_name"
                class="block text-sm font-medium text-gray-700"
                >First name</label
              >
              <div class="mt-1">
                <input
                  v-model="form.firstName"
                  type="text"
                  name="first_name"
                  id="first_name"
                  class="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label
                for="last_name"
                class="block text-sm font-medium text-gray-700"
                >Last name</label
              >
              <div class="mt-1">
                <input
                  v-model="form.lastName"
                  type="text"
                  name="last_name"
                  id="last_name"
                  class="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="email" class="block text-sm font-medium text-gray-700"
                >Email</label
              >
              <div class="mt-1">
                <input
                  v-model="form.email"
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  class="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label
                for="subject"
                class="block text-sm font-medium text-gray-700"
                >Subject</label
              >
              <div class="mt-1">
                <input
                  v-model="form.subject"
                  type="text"
                  name="subject"
                  id="subject"
                  class="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <div class="flex justify-between">
                <label
                  for="message"
                  class="block text-sm font-medium text-gray-700"
                  >Message</label
                >
                <span class="text-sm text-gray-500" id="message-max"
                  >Max 500 characters</span
                >
              </div>
              <div class="mt-1">
                <textarea
                  v-model="form.message"
                  id="message"
                  name="message"
                  rows="4"
                  class="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border border-gray-300 rounded-md"
                  maxlength="500"
                ></textarea>
              </div>
            </div>

            <div class="sm:col-span-2">
              <button
                type="submit"
                class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-500 transition-all"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>

      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-500"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <h3 class="mt-3 text-lg font-medium text-gray-900">Support</h3>
          <p class="mt-2 text-base text-gray-500">
            support@domma.app<br />+62 21 2345 6789
          </p>
        </div>

        <div>
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-500"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h3 class="mt-3 text-lg font-medium text-gray-900">Office</h3>
          <p class="mt-2 text-base text-gray-500">
            Jakarta Innovation Center<br />Jl. Sudirman No. 123, Jakarta
          </p>
        </div>

        <div>
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-500"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 class="mt-3 text-lg font-medium text-gray-900">
            Partnership Inquiries
          </h3>
          <p class="mt-2 text-base text-gray-500">
            partners@domma.app<br />Response within 48 hours
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
});

const handleSubmit = () => {
  // Here you would implement the actual form submission
  // For now, we'll just log the form data
  console.log("Form submitted:", form.value);

  // Reset the form after submission
  form.value = {
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  };

  // You could also show a success message
  alert("Thanks for your message! We will get back to you soon.");
};
</script>

<style scoped>
/* Component-specific styles here */
</style>
