<script setup>
import { ref, watch } from "vue";

// Props from parent
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue"]);

// Default values in case prop is empty
const getDefaultHeroData = () => ({
  titleLine1: "",
  titleLine2: "",
  description: "",
  image: "",
  backgroundColor: "#ffffff",
});

// Merge incoming prop with defaults
const mergeData = (incoming = {}) => ({
  titleLine1: incoming?.titleLine1 || "",
  titleLine2: incoming?.titleLine2 || "",
  description: incoming?.description || "",
  image: incoming?.image || "",
  backgroundColor: incoming?.backgroundColor || "#ffffff",
});

// Reactive state
const currentHeroData = ref(mergeData(props.modelValue));

// Watch for late prop updates
watch(
  () => props.modelValue,
  (newVal) => {
    const merged = mergeData(newVal);
    if (JSON.stringify(merged) !== JSON.stringify(currentHeroData.value)) {
      currentHeroData.value = merged;
    }
  },
  { deep: true, immediate: true }
);

// Emit changes to parent
watch(
  currentHeroData,
  (val) => {
    emit("update:modelValue", JSON.parse(JSON.stringify(val)));
  },
  { deep: true }
);
</script>

<template>
  <div class="space-y-6 bg-white p-4 border rounded-md">
    <!-- DEBUG -->
    <pre class="text-[10px] bg-gray-100 p-2 overflow-auto max-h-32">
      DEBUG: {{ currentHeroData }}
    </pre>

    <!-- Title Line 1 -->
    <div class="space-y-1">
      <label class="block text-xs font-bold text-gray-500 uppercase">Title Line 1</label>
      <input
        v-model="currentHeroData.titleLine1"
        type="text"
        class="w-full text-sm border border-gray-300 rounded p-1"
        placeholder="Enter first line of title..."
      />
    </div>

    <!-- Title Line 2 -->
    <div class="space-y-1">
      <label class="block text-xs font-bold text-gray-500 uppercase">Title Line 2</label>
      <input
        v-model="currentHeroData.titleLine2"
        type="text"
        class="w-full text-sm border border-gray-300 rounded p-1"
        placeholder="Enter second line of title..."
      />
    </div>

    <!-- Description -->
    <div class="space-y-1">
      <label class="block text-xs font-bold text-gray-500 uppercase">Description</label>
      <textarea
        v-model="currentHeroData.description"
        rows="4"
        class="w-full text-sm border border-gray-300 rounded p-1 resize-none"
        placeholder="Enter hero description..."
      />
    </div>

    <!-- Image -->
    <div class="space-y-1">
      <label class="block text-xs font-bold text-gray-500 uppercase">Image</label>
      <input
        v-model="currentHeroData.image"
        type="text"
        class="w-full text-sm border border-gray-300 rounded p-1"
        placeholder="Enter image filename or URL..."
      />
    </div>

    <!-- Background Color -->
    <div class="space-y-1">
      <label class="block text-xs font-bold text-gray-500 uppercase">Background Color</label>
      <input
        v-model="currentHeroData.backgroundColor"
        type="color"
        class="w-12 h-8 border border-gray-300 rounded p-1"
      />
    </div>
  </div>
</template>