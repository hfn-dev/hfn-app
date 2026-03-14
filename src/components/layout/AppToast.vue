<script setup>
import { useToast } from "@/composables/useToast";

const { toastState } = useToast();
</script>

<template>
  <div
    v-if="toastState.message"
    class="fixed top-6 right-6 z-50 px-4 py-3 rounded-lg shadow-lg text-white transition"
    :class="{
      'bg-green-600': toastState.type === 'success',
      'bg-red-600': toastState.type === 'error',
      'bg-blue-600': toastState.type === 'info'
    }"
  >
    {{ toastState.message }}
  </div>
</template>
