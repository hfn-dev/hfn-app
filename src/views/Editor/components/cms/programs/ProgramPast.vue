<script setup>
import { ref, watch } from "vue";

// Props
const props = defineProps({
  modelValue: Object,
});

// Emits
const emit = defineEmits(["update:modelValue"]);

// Default structure
const getDefaultData = () => ({
  title: "",
  description: "",
  list: [
    {
      id: Date.now(),
      title: "",
      description: "",
      image: "",
      link: "",
    },
  ],
});

// Reactive state
const currentSectionData = ref({
  ...getDefaultData(),
  ...props.modelValue,
});

// Watch prop changes
watch(
  () => props.modelValue,
  (val) => {
    currentSectionData.value = {
      ...getDefaultData(),
      ...val,
    };
  },
  { deep: true }
);

// Emit updates
watch(
  currentSectionData,
  (val) => emit("update:modelValue", val),
  { deep: true }
);

// Add / remove initiatives
const addInitiative = () => {
  currentSectionData.value.list.push({
    id: Date.now(),
    title: "",
    description: "",
    image: "",
    link: "",
  });
};

const removeInitiative = (index) => {
  currentSectionData.value.list.splice(index, 1);
};
</script>

<template>
  <div class="space-y-4 max-w-full">

    <!-- Section Title -->
    <div class="border border-gray-300 rounded-lg p-3 space-y-2">
      <label class="block text-xs font-semibold uppercase text-gray-500">Section Title</label>
      <input v-model="currentSectionData.title" type="text" class="w-full border-none focus:ring-0" />
    </div>

    <!-- Section Description -->
    <div class="border border-gray-300 rounded-lg p-3 space-y-2">
      <label class="block text-xs font-semibold uppercase text-gray-500">Section Description</label>
      <textarea v-model="currentSectionData.description" rows="3" class="w-full border-none focus:ring-0 resize-none"></textarea>
    </div>

    <!-- Initiatives List -->
    <div v-for="(initiative, index) in currentSectionData.list" :key="initiative.id" class="border border-gray-300 rounded-lg p-3 space-y-2">
      <div class="flex justify-between items-center mb-2">
        <span class="font-bold text-sm">Initiative {{ index + 1 }}</span>
        <button @click="removeInitiative(index)" class="text-red-500 text-xs">Remove</button>
      </div>

      <label class="block text-xs font-semibold uppercase text-gray-500">Title</label>
      <input v-model="initiative.title" type="text" class="w-full border-none focus:ring-0" />

      <label class="block text-xs font-semibold uppercase text-gray-500">Description</label>
      <textarea v-model="initiative.description" rows="2" class="w-full border-none focus:ring-0 resize-none"></textarea>

      <label class="block text-xs font-semibold uppercase text-gray-500">Image</label>
      <input v-model="initiative.image" type="text" class="w-full border-none focus:ring-0" />

      <label class="block text-xs font-semibold uppercase text-gray-500">Link</label>
      <input v-model="initiative.link" type="text" class="w-full border-none focus:ring-0" />
    </div>

    <!-- Add Initiative Button -->
    <button @click="addInitiative" class="px-3 py-1 bg-green-500 text-white rounded text-xs">Add Initiative</button>
  </div>
</template>
