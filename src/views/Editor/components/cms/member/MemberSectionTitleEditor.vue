<script setup>
import { ref, watch } from "vue";

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

// Emits
const emit = defineEmits(["update:modelValue"]);

const currentSectionData = ref("");

watch(
  () => props.modelValue,
  (val) => {
    currentSectionData.value = val || "";
  },
  { immediate: true }
);

watch(currentSectionData, (val) => {
  emit("update:modelValue", val);
});
</script>

<template>
  <label class="block text-xs font-semibold uppercase text-gray-500">
    Section Title
  </label>
  <input
    v-model="currentSectionData"
    type="text"
    class="w-full border-none focus:ring-0 p-0 m-0"
  />
</template>