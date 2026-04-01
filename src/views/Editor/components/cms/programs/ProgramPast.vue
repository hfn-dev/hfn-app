<script setup>
import { ref, watch } from "vue";

// Props
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue"]);

// Default structure
const getDefaultSectionData = () => ({
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

// Merge incoming prop with defaults
const mergeData = (incoming = {}) => ({
  title: incoming?.title || "",
  description: incoming?.description || "",
  list: Array.isArray(incoming?.list) && incoming.list.length
    ? incoming.list.map(item => ({ ...item }))
    : getDefaultSectionData().list,
});

// Reactive state
const currentSectionData = ref(mergeData(props.modelValue));

// Watch for late prop updates
watch(
  () => props.modelValue,
  (newVal) => {
    const merged = mergeData(newVal);
    if (JSON.stringify(merged) !== JSON.stringify(currentSectionData.value)) {
      currentSectionData.value = merged;
    }
  },
  { deep: true, immediate: true }
);

// Emit updates
watch(
  currentSectionData,
  (val) => {
    emit("update:modelValue", JSON.parse(JSON.stringify(val)));
  },
  { deep: true }
);

// Add new initiative
const addInitiative = () => {
  currentSectionData.value.list.push({
    id: Date.now(),
    title: "",
    description: "",
    image: "",
    link: "",
  });
};

// Remove initiative by index
const removeInitiative = (index) => {
  currentSectionData.value.list.splice(index, 1);
};
</script>

<template>
  <div class="space-y-6 bg-white p-4 border rounded-md">
    <!-- Debug -->
    <pre class="text-[10px] bg-gray-100 p-2 overflow-auto max-h-32">
      DEBUG: {{ currentSectionData }}
    </pre>

    <!-- Section Title & Description -->
    <div class="space-y-2">
      <label class="block text-xs font-bold text-gray-500 uppercase">Section Title</label>
      <input v-model="currentSectionData.title" type="text" class="w-full p-1 border rounded" />

      <label class="block text-xs font-bold text-gray-500 uppercase">Section Description</label>
      <textarea v-model="currentSectionData.description" rows="3" class="w-full p-1 border rounded resize-none" />
    </div>

    <!-- Initiatives List -->
    <div v-for="(initiative, index) in currentSectionData.list" :key="initiative.id" class="border border-gray-300 rounded p-3 space-y-2">
      <div class="flex justify-between items-center">
        <span class="font-bold text-sm">Initiative {{ index + 1 }}</span>
        <button @click="removeInitiative(index)" class="text-red-500 text-xs">Remove</button>
      </div>

      <label class="block text-xs font-bold text-gray-500 uppercase">Title</label>
      <input v-model="initiative.title" type="text" class="w-full p-1 border rounded" />

      <label class="block text-xs font-bold text-gray-500 uppercase">Description</label>
      <textarea v-model="initiative.description" rows="2" class="w-full p-1 border rounded resize-none" />

      <label class="block text-xs font-bold text-gray-500 uppercase">Image</label>
      <input v-model="initiative.image" type="text" class="w-full p-1 border rounded" />

      <label class="block text-xs font-bold text-xs uppercase">Link</label>
      <input v-model="initiative.link" type="text" class="w-full p-1 border rounded" />
    </div>

    <!-- Add new initiative -->
    <button @click="addInitiative" class="px-3 py-1 bg-green-500 text-white rounded text-xs">Add Initiative</button>
  </div>
</template>