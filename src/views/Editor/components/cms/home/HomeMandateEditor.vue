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
  
const addMandateAction = () => {
  currentSectionData.value.actions.push({
    title: "",
    description: "",
    icon: "LightBulbIcon",
    tags: ["New Tag"]
  });
};

const removeMandateAction = (index) => {
  currentSectionData.value.actions.splice(index, 1);
};

</script>  
<template>
<div class="space-y-6">
    <div class="border border-gray-300 rounded-lg p-3 space-y-2">
      <label class="block text-xs font-semibold uppercase text-gray-500">Title</label>
      <input v-model="currentSectionData.title" type="text" class="w-full border-none focus:ring-0" />
    </div>
    
    <label class="block text-xs font-semibold uppercase text-gray-500">Mandate Actions</label>
    <div v-for="(action, index) in currentSectionData.actions" :key="index" class="p-4 border border-gray-200 rounded-lg space-y-3 bg-gray-50">
      <input v-model="action.title" placeholder="Action Title" class="w-full font-bold bg-transparent border-none focus:ring-0" />
      <textarea v-model="action.description" placeholder="Description" rows="2" class="w-full text-sm bg-transparent border-none focus:ring-0" />
      <div class="flex gap-2">
        <input v-for="(tag, tIdx) in action.tags" :key="tIdx" v-model="action.tags[tIdx]" class="text-xs border rounded px-2 py-1 w-24" />
      </div>
    </div>
  </div>            
 </template> 
