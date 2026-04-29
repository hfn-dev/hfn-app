<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: Object,
});

const emit = defineEmits(["update:modelValue"]);

const currentSectionData = ref({
  title: "",
  backgroundColor: "#ffffff",
  updates: [],
  ...props.modelValue,
});

watch(
  () => props.modelValue,
  (val) => {
    currentSectionData.value = {
      title: "",
      backgroundColor: "#ffffff",
      updates: [],
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

const addUpdate = () => {
  if (!currentSectionData.value.updates) {
    currentSectionData.value.updates = [];
  }

  currentSectionData.value.updates.push({
    id: Date.now(),
    title: "",
    description: "",
    image: "",
    link: "",
    slug: "",
    tag: "News",
  });
};

const removeUpdate = (index) => {
  currentSectionData.value.updates.splice(index, 1);
};
</script>

<template>
  <div class="border border-gray-300 rounded-lg p-3 space-y-2">
    <label class="block text-xs font-semibold uppercase text-gray-500"
      >Section Title</label
    >
    <input
      v-model="currentSectionData.title"
      type="text"
      class="w-full border-none focus:ring-0"
    />
  </div>

  <div class="border border-gray-300 rounded-lg p-3 space-y-2">
    <label class="block text-xs font-semibold uppercase text-gray-500"
      >Background Color</label
    >
    <input
      v-model="currentSectionData.backgroundColor"
      type="color"
      class="w-16 h-10 border-none focus:ring-0"
    />
  </div>

  <div
    v-for="(update, index) in currentSectionData.updates"
    :key="update.id"
    class="border border-gray-300 rounded-lg p-4 space-y-2"
  >
    <div class="flex justify-between items-center">
      <h4 class="font-semibold text-sm">Update {{ index + 1 }}</h4>
      <button @click="removeUpdate(index)" class="text-red-500 text-sm">
        Delete
      </button>
    </div>

    <label class="text-xs font-semibold uppercase text-gray-500">Title</label>
    <input v-model="update.title" class="w-full border-none focus:ring-0" />

    <label class="text-xs font-semibold uppercase text-gray-500"
      >Description</label
    >
    <textarea
      v-model="update.description"
      rows="3"
      class="w-full border-none focus:ring-0 resize-none"
    ></textarea>

    <label class="text-xs font-semibold uppercase text-gray-500"
      >Image URL</label
    >
    <input v-model="update.image" class="w-full border-none focus:ring-0" />

    <label class="text-xs font-semibold uppercase text-gray-500">Link</label>
    <input v-model="update.link" class="w-full border-none focus:ring-0" />

    <label class="text-xs font-semibold uppercase text-gray-500">Slug</label>
    <input v-model="update.slug" class="w-full border-none focus:ring-0" />

    <label class="text-xs font-semibold uppercase text-gray-500">Tag</label>
    <input v-model="update.tag" class="w-full border-none focus:ring-0" />
  </div>

  <button
    @click="addUpdate"
    class="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
  >
    + Add Update
  </button>
</template>  
