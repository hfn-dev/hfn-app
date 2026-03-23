<script setup>
import { ref, watch } from "vue";

// Props
const props = defineProps({
  modelValue: Object,
});

// Emits
const emit = defineEmits(["update:modelValue"]);

// Default gallery section
const getDefaultData = () => ({
  items: [],
  hasMore: true,
  nextCursor: 2,
});

// Local reactive state
const currentSectionData = ref({
  ...getDefaultData(),
  ...props.modelValue,
});

// Watch for parent changes
watch(
  () => props.modelValue,
  (val) => {
    if (!val || Object.keys(val).length === 0) {
      currentSectionData.value = getDefaultData();
      emit("update:modelValue", getDefaultData());
    } else {
      currentSectionData.value = { ...getDefaultData(), ...val };
    }
  },
  { deep: true, immediate: true }
);

watch(
  currentSectionData,
  (val) => {
    emit("update:modelValue", val);
  },
  { deep: true }
);

const addGalleryItem = () => {
  currentSectionData.value.items.push({
    id: Date.now(),
    title: "",
    category: "",
    date: "",
    year: "",
    image: "",
  });
};

const removeGalleryItem = (index) => {
  currentSectionData.value.items.splice(index, 1);
};
</script>

<template>
          
            <div
              v-for="(item, index) in currentSectionData.items"
              :key="item.id"
              class="border border-gray-300 rounded-lg p-4 space-y-3"
            >
              <div class="flex justify-between items-center">
                <h4 class="font-semibold text-sm">
                  Gallery Item {{ index + 1 }}
                </h4>
                <button
                  @click="removeGalleryItem(index)"
                  class="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>

              <input
                v-model="item.title"
                placeholder="Title"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="item.category"
                placeholder="Category"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="item.date"
                placeholder="Date"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="item.year"
                placeholder="Year"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="item.image"
                placeholder="Image URL"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <button
              @click="addGalleryItem"
              class="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
            >
              + Add Gallery Item
            </button>

            <div class="border border-gray-300 rounded-lg p-4 space-y-3">
              <label class="flex items-center gap-2 text-sm">
                <input type="checkbox" v-model="currentSectionData.hasMore" />
                Has More
              </label>

              <div>
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Next Cursor
                </label>
                <input
                  v-model="currentSectionData.nextCursor"
                  type="number"
                  class="w-full border-none focus:ring-0"
                />
              </div>
            </div>

  </template>
