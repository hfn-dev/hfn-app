<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: Object,
});

const emit = defineEmits(["update:modelValue"]);

const getDefaultData = () => ({
  items: [],
  hasMore: true,
  nextCursor: 2,
});

const currentSectionData = ref(getDefaultData());

watch(
  () => props.modelValue,
  (val) => {
    currentSectionData.value = {
      ...getDefaultData(),
      ...(val || {}),
    };
  },
  { immediate: true }
);

const updateParent = () => {
  emit("update:modelValue", { ...currentSectionData.value });
};

const addGalleryItem = () => {
  currentSectionData.value.items.push({
    id: Date.now(),
    title: "",
    category: "",
    date: "",
    year: "",
    image: "",
  });

  updateParent();
};

const removeGalleryItem = (index) => {
  currentSectionData.value.items.splice(index, 1);
  updateParent();
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
