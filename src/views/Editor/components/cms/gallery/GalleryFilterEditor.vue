<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: Object,
});

const emit = defineEmits(["update:modelValue"]);

const getDefaultData = () => ({
  title: "Filter Memories",
  years: ["2026", "2025", "2024"],
  categories: [
    "Conferences",
    "Workshops",
    "Community Outreaches",
    "Webinar",
    "Gala",
  ],
});

const currentSectionData = computed({
  get() {
    return {
      ...getDefaultData(),
      ...props.modelValue,
    };
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

const newGalleryYear = ref("");
const newGalleryCategory = ref("");

const addGalleryYear = () => {
  if (!newGalleryYear.value.trim()) return;
  currentSectionData.value.years.push(newGalleryYear.value.trim());
  newGalleryYear.value = "";
};

const removeGalleryYear = (index) => {
  currentSectionData.value.years.splice(index, 1);
};

const addGalleryCategory = () => {
  if (!newGalleryCategory.value.trim()) return;
  currentSectionData.value.categories.push(
    newGalleryCategory.value.trim()
  );
  newGalleryCategory.value = "";
};

const removeGalleryCategory = (index) => {
  currentSectionData.value.categories.splice(index, 1);
};
</script>

<template>
        
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Section Title
              </label>
              <input
                v-model="currentSectionData.title"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Years
              </label>
              <div class="flex gap-2 flex-wrap">
                <span
                  v-for="(year, index) in currentSectionData.years"
                  :key="index"
                  class="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {{ year }}
                  <button
                    @click="removeGalleryYear(index)"
                    class="text-red-500 font-bold"
                  >
                    ×
                  </button>
                </span>
                <input
                  v-model="newGalleryYear"
                  @keyup.enter="addGalleryYear"
                  placeholder="Add year"
                  class="border p-1 rounded focus:ring-0 w-24"
                />
              </div>
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Categories
              </label>
              <div class="flex gap-2 flex-wrap">
                <span
                  v-for="(category, index) in currentSectionData.categories"
                  :key="index"
                  class="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {{ category }}
                  <button
                    @click="removeGalleryCategory(index)"
                    class="text-red-500 font-bold"
                  >
                    ×
                  </button>
                </span>
                <input
                  v-model="newGalleryCategory"
                  @keyup.enter="addGalleryCategory"
                  placeholder="Add category"
                  class="border p-1 rounded focus:ring-0 w-32"
                />
              </div>
            </div>

</template>  
