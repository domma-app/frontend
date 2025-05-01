<template>
  <div class="mb-6 w-full">
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      class="w-full px-4 py-3 border border-gray-200 rounded-lg text-base outline-none duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-400"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
}>();

defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>
