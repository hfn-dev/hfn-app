<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue"]);

const getDefaultSectionData = () => ({
  iframeUrl: "",
  height: 500,
  borderWeight: 4,
  borderColor: "border-green-200",
});

const mergeData = (incoming = {}) => ({
  iframeUrl: incoming?.iframeUrl || "",
  height: incoming?.height || 500,
  borderWeight: incoming?.borderWeight || 4,
  borderColor: incoming?.borderColor || "border-green-200",
});

const currentSectionData = ref(mergeData(props.modelValue));

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

watch(
  currentSectionData,
  (val) => {
    emit("update:modelValue", JSON.parse(JSON.stringify(val)));
  },
  { deep: true }
);
</script>

<template>
  <div class="space-y-6">
    <div class="border border-gray-300 rounded-lg p-3 space-y-2">
      <label class="block text-xs font-semibold uppercase text-gray-500">
        Google Maps Iframe URL
      </label>
      <textarea
        v-model="currentSectionData.iframeUrl"
        rows="3"
        class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
      />
    </div>

    <div class="border border-gray-300 rounded-lg p-3 space-y-2">
      <label class="block text-xs font-semibold uppercase text-gray-500">
        Map Height
      </label>
      <input
        v-model="currentSectionData.height"
        type="number"
        class="w-full text-sm border-none focus:ring-0 p-0 m-0"
      />
    </div>
  </div>
</template>
