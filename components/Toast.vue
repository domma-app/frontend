<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform -translate-y-8 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform -translate-y-8 opacity-0"
  >
    <div
      v-if="show"
      class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-sm"
      :class="typeClasses"
    >
      <span v-if="type === 'error'" class="text-lg font-bold">!</span>
      <span v-else-if="type === 'success'" class="text-lg font-bold">✓</span>
      <p>{{ message }}</p>
      <button
        @click="$emit('dismiss')"
        class="ml-auto text-white hover:text-gray-200 transition-colors"
      >
        ✕
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}>();

const emit = defineEmits<{
  dismiss: [];
}>();

const typeClasses = computed(() => {
  switch (props.type) {
    case 'error':
      return 'bg-red-500 text-white';
    case 'success':
      return 'bg-green-500 text-white';
    case 'info':
      return 'bg-blue-500 text-white';
    default:
      return 'bg-gray-700 text-white';
  }
});
</script> 