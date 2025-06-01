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

    <!-- Unsaved changes warning -->
    <div v-if="hasUnsavedChanges" class="mb-4">
      <div class="p-4 rounded-md bg-yellow-50 text-yellow-700">
        You have unsaved changes. Please save your changes before leaving this
        page.
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
            @input="onFormChange"
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
            @input="onFormChange"
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
            @input="onFormChange"
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
            @input="onFormChange"
          />
        </div>
      </div>

      <!-- Profile picture section -->
      <div class="mt-6 pt-6 border-t border-gray-100">
        <h3 class="text-lg font-medium text-gray-800 mb-3">Profile Picture</h3>
        <div class="flex items-center">
          <div class="bg-green-50 rounded-full p-3 mr-4">
            <div
              v-if="previewImage || form.profile_picture_url"
              class="w-16 h-16 rounded-full bg-cover bg-center"
              :style="`background-image: url('${
                previewImage || form.profile_picture_url
              }')`"
            ></div>
            <div
              v-else
              class="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold"
            >
              {{ userInitials }}
            </div>
          </div>
          <div>
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              accept="image/*"
              @change="handleFileChange"
            />
            <button
              type="button"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              @click="openFileInput"
              :disabled="isUploading"
            >
              <span v-if="isUploading">Processing...</span>
              <span v-else>Upload New Picture</span>
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
          :disabled="isSubmitting || !hasUnsavedChanges"
        >
          <span v-if="isSubmitting">Saving...</span>
          <span v-else>Save Changes</span>
        </button>
      </div>
    </form>

    <!-- Image Cropper Modal -->
    <Teleport to="body">
      <div
        v-if="showCropModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Crop Your Image</h3>
            <button
              @click="cancelCrop"
              class="text-gray-400 hover:text-gray-500"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div class="mb-4 h-72">
            <Cropper
              v-if="imageSource"
              :src="imageSource"
              :stencil-props="{
                aspectRatio: 1,
              }"
              class="h-full"
              ref="cropper"
            />
          </div>
          <div class="flex justify-end space-x-3">
            <button
              @click="cancelCrop"
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="cropImage"
              class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              Apply Crop
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { UserProfile } from "~/types/api";
import { useProfileService } from "~/services";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

const { user, updateUserData } = useAuth();
const profileService = useProfileService();
const route = useRoute();
const router = useRouter();

const isSubmitting = ref(false);
const isUploading = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const cropper = ref<any>(null); // Using any type to avoid type issues
const imageSource = ref<string | null>(null);
const showCropModal = ref(false);
const originalFile = ref<File | null>(null);
const croppedImageFile = ref<File | null>(null);
const previewImage = ref<string | null>(null);
const hasUnsavedChanges = ref(false);
const originalFormState = ref<any>(null);
const guardRemoved = ref(false);

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
  profile_picture_url: null as string | null,
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
  try {
    // Fetch the profile data from API
    const { data } = await profileService.getProfile();

    // Update form with fetched data
    form.value = {
      full_name: data.full_name || "",
      email: data.email || "",
      phone: data.phone || "",
      university: data.university || "",
      major: data.major || "",
      profile_picture_url: data.profile_picture_url || null,
    };

    // Store the original form state
    originalFormState.value = JSON.stringify(form.value);
  } catch (error: any) {
    formStatus.value = {
      message: error.message || "Failed to load profile data",
      type: "error",
    };
  }
});

// Detect changes in form
const onFormChange = () => {
  if (originalFormState.value) {
    const currentFormState = JSON.stringify({
      full_name: form.value.full_name,
      phone: form.value.phone,
      university: form.value.university,
      major: form.value.major,
    });

    const originalComparisonState = JSON.stringify({
      full_name: JSON.parse(originalFormState.value).full_name,
      phone: JSON.parse(originalFormState.value).phone,
      university: JSON.parse(originalFormState.value).university,
      major: JSON.parse(originalFormState.value).major,
    });

    hasUnsavedChanges.value =
      currentFormState !== originalComparisonState ||
      croppedImageFile.value !== null;
  }
};

// Warn before leaving if there are unsaved changes
const unregisterGuard = ref();

// Add navigation guard
onMounted(() => {
  unregisterGuard.value = router.beforeEach((to, from, next) => {
    if (hasUnsavedChanges.value && !guardRemoved.value) {
      const answer = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (answer) {
        // Reset form to original state
        if (originalFormState.value) {
          const original = JSON.parse(originalFormState.value);
          form.value = {
            full_name: original.full_name || "",
            email: original.email || "",
            phone: original.phone || "",
            university: original.university || "",
            major: original.major || "",
            profile_picture_url: original.profile_picture_url || null,
          };
        }

        // Reset state to prevent showing the dialog again
        hasUnsavedChanges.value = false;
        guardRemoved.value = true;
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  });
});

// Remove navigation guard when component is unmounted
onBeforeUnmount(() => {
  if (unregisterGuard.value) {
    unregisterGuard.value(); // Remove the guard
  }
  // Reset all form state
  hasUnsavedChanges.value = false;
  guardRemoved.value = true;
});

// Open file input dialog
const openFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// Handle file selection
const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (!target.files || target.files.length === 0) {
    return;
  }

  const file = target.files[0];

  // Validate file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    formStatus.value = {
      message: "File is too large. Maximum size is 2MB.",
      type: "error",
    };
    return;
  }

  // Validate file type
  const validTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!validTypes.includes(file.type)) {
    formStatus.value = {
      message: "Only JPG, PNG and GIF files are allowed.",
      type: "error",
    };
    return;
  }

  // Store the file for later
  originalFile.value = file;

  // Create data URL for cropper
  const reader = new FileReader();
  reader.onload = (e) => {
    imageSource.value = e.target?.result as string;
    showCropModal.value = true;
  };
  reader.readAsDataURL(file);
};

// Cancel cropping
const cancelCrop = () => {
  showCropModal.value = false;
  imageSource.value = null;
  originalFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

// Apply cropping without uploading
const cropImage = async () => {
  if (!cropper.value || !originalFile.value) return;

  try {
    isUploading.value = true;

    // Get the cropped canvas
    const { canvas } = cropper.value.getResult();

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b: Blob | null) => {
        if (b) resolve(b);
      }, originalFile.value!.type);
    });

    // Create a new File from the blob
    const fileExtension =
      originalFile.value.name.split(".").pop() ||
      (originalFile.value.type === "image/jpeg"
        ? "jpg"
        : originalFile.value.type.split("/").pop());
    const newFileName = `profile-${Date.now()}.${fileExtension}`;
    const croppedFile = new File([blob], newFileName, {
      type: originalFile.value.type,
    });

    // Store file for later upload and generate a preview
    croppedImageFile.value = croppedFile;

    // Generate a preview URL
    previewImage.value = URL.createObjectURL(croppedFile);

    // Close the modal
    showCropModal.value = false;
    imageSource.value = null;

    // Mark form as having unsaved changes
    hasUnsavedChanges.value = true;
  } catch (error: any) {
    formStatus.value = {
      message: error.message || "Failed to process image",
      type: "error",
    };
  } finally {
    isUploading.value = false;
  }
};

// Update profile information
const updateProfile = async () => {
  try {
    isSubmitting.value = true;
    let profilePictureUrl = form.value.profile_picture_url;

    // Upload image first if a new one was cropped
    if (croppedImageFile.value) {
      try {
        const uploadResult = await profileService.uploadProfilePicture(
          croppedImageFile.value
        );
        profilePictureUrl = uploadResult.data.profile_picture_url;
      } catch (error: any) {
        formStatus.value = {
          message: error.message || "Failed to upload profile picture",
          type: "error",
        };
        isSubmitting.value = false;
        return;
      }
    }

    // Prepare data for API
    const profileData: UserProfile = {
      full_name: form.value.full_name,
      phone: form.value.phone,
      university: form.value.university,
      major: form.value.major,
    };

    // Make API call to update profile
    const result = await profileService.updateProfile(profileData);

    // Update local form with returned data and ensure profile_picture_url is handled correctly
    form.value = {
      ...form.value,
      ...result.data,
      profile_picture_url:
        profilePictureUrl || result.data.profile_picture_url || null,
    };

    // Update auth store data for navbar display
    if (user.value) {
      updateUserData({
        ...user.value,
        full_name: form.value.full_name,
        phone: form.value.phone,
        university: form.value.university,
        major: form.value.major,
        profile_picture_url:
          profilePictureUrl || user.value.profile_picture_url || null,
      });
    }

    // Reset tracking variables
    originalFormState.value = JSON.stringify(form.value);
    croppedImageFile.value = null;
    previewImage.value = null;
    hasUnsavedChanges.value = false;
    guardRemoved.value = true;

    formStatus.value = {
      message: result.message || "Profile updated successfully!",
      type: "success",
    };

    // Clear the message after 3 seconds
    setTimeout(() => {
      formStatus.value.message = "";
    }, 3000);
  } catch (error: any) {
    formStatus.value = {
      message: error.message || "Failed to update profile. Please try again.",
      type: "error",
    };
  } finally {
    isSubmitting.value = false;
  }
};
</script>
