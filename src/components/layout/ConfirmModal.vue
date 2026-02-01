<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-6 w-96">
      <h2 class="text-lg font-bold mb-4">{{ title }}</h2>
      <p class="mb-6">{{ message }}</p>
      <div class="flex justify-end space-x-4">
        <button
          class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          @click="$emit('cancel')"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          @click="$emit('confirm')"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['title', 'message']);
</script>
