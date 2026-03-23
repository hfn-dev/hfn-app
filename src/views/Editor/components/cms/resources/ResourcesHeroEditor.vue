<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: Object,
});

const emit = defineEmits(["update:modelValue"]);

const currentSectionData = ref({
  titleLine1: "",
  titleLine2: "",
  description: "",
  image: "",
  backgroundColor: "#E87A1814",
  ...props.modelValue,
});

watch(
  () => props.modelValue,
  (val) => {
    currentSectionData.value = {
      titleLine1: "",
      titleLine2: "",
      description: "",
      image: "",
      backgroundColor: "#E87A1814",
      ...(val || {}),
    };
  },
  { immediate: true }
);

watch(
  currentSectionData,
  (val) => {
    emit("update:modelValue", val);
  },
  { deep: true }
);
</script>

<template>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Title Line 1
              </label>
              <input
                v-model="currentSectionData.titleLine1"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Title Line 2
              </label>
              <input
                v-model="currentSectionData.titleLine2"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Description
              </label>
              <textarea
                v-model="currentSectionData.description"
                rows="3"
                class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
              ></textarea>
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Background Color
              </label>
              <input
                v-model="currentSectionData.backgroundColor"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <image-uploader
              v-model="currentSectionData.image"
              label="Hero Image"
            />

</template>  
