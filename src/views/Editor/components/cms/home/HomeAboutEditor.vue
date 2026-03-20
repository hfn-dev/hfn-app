<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: Array
});

const emit = defineEmits(["update:modelValue"]);

const currentSectionData = ref(props.modelValue || []);

watch(
  () => props.modelValue,
  (val) => {
    currentSectionData.value = val || [];
  }
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
<div class="space-y-6">
    <div class="border border-gray-300 rounded-lg p-3 space-y-2">
      <label class="block text-xs font-semibold uppercase text-gray-500">Badge</label>
      <input v-model="currentSectionData.badge" type="text" class="w-full border-none focus:ring-0" />
    </div>
    <div class="border border-gray-300 rounded-lg p-3 space-y-2">
      <label class="block text-xs font-semibold uppercase text-gray-500">Title</label>
      <input v-model="currentSectionData.title" type="text" class="w-full border-none focus:ring-0" />
    </div>
    <div class="border border-gray-300 rounded-lg p-3 space-y-2">
      <label class="block text-xs font-semibold uppercase text-gray-500">Description</label>
      <textarea v-model="currentSectionData.description" rows="4" class="w-full border-none focus:ring-0 resize-none" />
    </div>
    <div class="border border-gray-300 rounded-lg p-3 space-y-2">
      <label class="block text-xs font-semibold uppercase text-gray-500">Image URL</label>
      <input v-model="currentSectionData.image" type="text" class="w-full border-none focus:ring-0" />
    </div>
  </div>
            
 </template> 
