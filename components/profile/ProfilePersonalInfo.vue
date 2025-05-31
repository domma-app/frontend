<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">
      Personal Information
    </h2>

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

    <!-- Personal information form -->
    <form @submit.prevent="updateProfile" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Full Name -->
        <div>
          <label
            for="fullName"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            id="fullName"
            v-model="form.full_name"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <!-- Email -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-gray-50"
            disabled
          />
          <p class="mt-1 text-xs text-gray-500">
            Contact support to change your email address
          </p>
        </div>

        <!-- Phone -->
        <div>
          <label
            for="phone"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <!-- University -->
        <div>
          <label
            for="university"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            University
          </label>
          <input
            id="university"
            v-model="form.university"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <!-- Major -->
        <div>
          <label
            for="major"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Major
          </label>
          <input
            id="major"
            v-model="form.major"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

      <!-- Profile picture section -->
      <div class="mt-6 pt-6 border-t border-gray-100">
        <h3 class="text-lg font-medium text-gray-800 mb-3">Profile Picture</h3>
        <div class="flex items-center">
          <div class="bg-green-50 rounded-full p-3 mr-4">
            <div
              class="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold"
            >
              {{ userInitials }}
            </div>
          </div>
          <div>
            <button
              type="button"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Upload New Picture
            </button>
            <p class="mt-1 text-xs text-gray-500">
              JPG, GIF or PNG. Max size 2MB
            </p>
          </div>
        </div>
      </div>

      <!-- Submit button -->
      <div class="flex justify-end pt-4">
        <button
          type="submit"
          class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Saving...</span>
          <span v-else>Save Changes</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { UserProfile } from "~/types/api";

const { user } = useAuth();
const isSubmitting = ref(false);
const formStatus = ref({
  message: "",
  type: "success", // 'success' or 'error'
});

// Initialize form with user data
const form = ref({
  full_name: "",
  email: "",
  phone: "",
  university: "",
  major: "",
});

// Get user's initials for display
const userInitials = computed(() => {
  const name = form.value.full_name;
  if (!name) return "S";

  const parts = name.split(" ");
  if (parts.length === 1) return name.charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
});

// Load user data when component mounts
onMounted(async () => {
  if (user.value) {
    // Initialize with data from auth store
    form.value = {
      full_name: user.value.full_name || "",
      email: user.value.email || "",
      phone: user.value.phone || "",
      university: user.value.university || "",
      major: user.value.major || "",
    };

    // Use dummy data for now
    form.value = {
      full_name: "John Doe",
      email: "john.doe@university.edu",
      phone: "+62 812-3456-7890",
      university: "University of Indonesia",
      major: "Computer Science",
    };

    // TODO: Fetch the latest profile data from API
  }
});

// Update profile information
const updateProfile = async () => {
  try {
    isSubmitting.value = true;

    // Prepare data for API
    const profileData: UserProfile = {
      full_name: form.value.full_name,
      email: form.value.email,
      phone: form.value.phone,
      university: form.value.university,
      major: form.value.major,
    };

    // Make API call to update profile
    // const response = await userService.updateProfile(profileData);

    formStatus.value = {
      message: "Profile updated successfully!",
      type: "success",
    };

    // Clear the message after 3 seconds
    setTimeout(() => {
      formStatus.value.message = "";
    }, 3000);
  } catch (error) {
    formStatus.value = {
      message: "Failed to update profile. Please try again.",
      type: "error",
    };
  } finally {
    isSubmitting.value = false;
  }
};
</script>
