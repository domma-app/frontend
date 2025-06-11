<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Preferences</h2>

    <!-- Form status alerts -->
    <div v-if="formStatus.message" class="mb-4">
      <div
        class="p-4 rounded-md"
        :class="
          formStatus.type === 'success'
            ? 'bg-green-50 text-green-700'
            : 'bg-red-50 text-red-700'
        "
      >
        {{ formStatus.message }}
      </div>
    </div>

    <!-- App preferences section -->
    <div class="space-y-6">
      <!-- Notification settings -->
      <div>
        <h3 class="text-lg font-medium text-gray-800 mb-3">Notifications</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-700">
                Email Notifications
              </p>
              <p class="text-xs text-gray-500">
                Receive important updates via email
              </p>
            </div>
            <div class="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                id="toggleEmail"
                v-model="preferences.notifications.email"
                class="sr-only"
              />
              <label
                for="toggleEmail"
                class="block h-6 w-12 rounded-full transition-colors duration-200 ease-in-out cursor-pointer"
                :class="
                  preferences.notifications.email
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                "
              >
                <span
                  class="absolute left-0.5 top-0.5 bg-white border border-gray-200 h-5 w-5 rounded-full transition-transform duration-200 ease-in-out transform"
                  :class="
                    preferences.notifications.email ? 'translate-x-6' : ''
                  "
                ></span>
              </label>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-700">
                Push Notifications
              </p>
              <p class="text-xs text-gray-500">Get alerts on your device</p>
            </div>
            <div class="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                id="togglePush"
                v-model="preferences.notifications.push"
                class="sr-only"
              />
              <label
                for="togglePush"
                class="block h-6 w-12 rounded-full transition-colors duration-200 ease-in-out cursor-pointer"
                :class="
                  preferences.notifications.push
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                "
              >
                <span
                  class="absolute left-0.5 top-0.5 bg-white border border-gray-200 h-5 w-5 rounded-full transition-transform duration-200 ease-in-out transform"
                  :class="preferences.notifications.push ? 'translate-x-6' : ''"
                ></span>
              </label>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-700">Budget Alerts</p>
              <p class="text-xs text-gray-500">
                Get notified when you're close to budget limits
              </p>
            </div>
            <div class="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                id="toggleBudget"
                v-model="preferences.notifications.budget"
                class="sr-only"
              />
              <label
                for="toggleBudget"
                class="block h-6 w-12 rounded-full transition-colors duration-200 ease-in-out cursor-pointer"
                :class="
                  preferences.notifications.budget
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                "
              >
                <span
                  class="absolute left-0.5 top-0.5 bg-white border border-gray-200 h-5 w-5 rounded-full transition-transform duration-200 ease-in-out transform"
                  :class="
                    preferences.notifications.budget ? 'translate-x-6' : ''
                  "
                ></span>
              </label>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-700">
                Challenge Reminders
              </p>
              <p class="text-xs text-gray-500">
                Reminders about your active challenges
              </p>
            </div>
            <div class="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                id="toggleChallenge"
                v-model="preferences.notifications.challenges"
                class="sr-only"
              />
              <label
                for="toggleChallenge"
                class="block h-6 w-12 rounded-full transition-colors duration-200 ease-in-out cursor-pointer"
                :class="
                  preferences.notifications.challenges
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                "
              >
                <span
                  class="absolute left-0.5 top-0.5 bg-white border border-gray-200 h-5 w-5 rounded-full transition-transform duration-200 ease-in-out transform"
                  :class="
                    preferences.notifications.challenges ? 'translate-x-6' : ''
                  "
                ></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Display settings -->
      <div class="pt-6 border-t border-gray-100">
        <h3 class="text-lg font-medium text-gray-800 mb-3">Display</h3>
        <div class="space-y-4">
          <div>
            <label
              for="currency"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Currency Display
            </label>
            <select
              id="currency"
              v-model="preferences.display.currency"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            >
              <option value="IDR">Indonesian Rupiah (Rp)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
              <option value="GBP">British Pound (£)</option>
            </select>
          </div>

          <div>
            <label
              for="dateFormat"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Date Format
            </label>
            <select
              id="dateFormat"
              v-model="preferences.display.dateFormat"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label
              for="theme"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Theme
            </label>
            <select
              id="theme"
              v-model="preferences.display.theme"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Submit button -->
    <div class="flex justify-end pt-6 mt-6 border-t border-gray-100">
      <button
        type="button"
        @click="savePreferences"
        class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        :disabled="isSubmitting"
      >
        <span v-if="isSubmitting">Saving...</span>
        <span v-else>Save Preferences</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const isSubmitting = ref(false);
const formStatus = ref({
  message: "",
  type: "success", // 'success' or 'error'
});

// User preferences
const preferences = ref({
  notifications: {
    email: true,
    push: true,
    budget: true,
    challenges: true,
  },
  display: {
    currency: "IDR",
    dateFormat: "DD/MM/YYYY",
    theme: "light",
  },
  privacy: {
    analytics: true,
    marketing: false,
  },
});

// Load preferences when component mounts
onMounted(async () => {
  try {
    // Use dummy data for preferences
    preferences.value = {
      notifications: {
        email: true,
        push: true,
        budget: true,
        challenges: false,
      },
      display: {
        currency: "IDR",
        dateFormat: "DD/MM/YYYY",
        theme: "light",
      },
      privacy: {
        analytics: true,
        marketing: false,
      },
    };

    // TODO: Get user preferences from API
  } catch (error) {
    console.error("Error loading preferences:", error);
    // Continue with default preferences if API fails
  }
});

// Save preferences
const savePreferences = async () => {
  try {
    isSubmitting.value = true;

    // Simulate API call with timeout
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: Make API call to save preferences

    formStatus.value = {
      message: "Preferences saved successfully!",
      type: "success",
    };

    // Clear the message after 3 seconds
    setTimeout(() => {
      formStatus.value.message = "";
    }, 3000);
  } catch (error) {
    formStatus.value = {
      message: "Failed to save preferences. Please try again.",
      type: "error",
    };
  } finally {
    isSubmitting.value = false;
  }
};
</script>
