<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: true
  },
  message: {
    type: String,
    default: 'Loading data...'
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full min-h-[400px]">
    <div
      class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00cc66]"
    ></div>
    <p class="mt-4 text-gray-500 text-sm">{{ message }}</p>
  </div>
</template>