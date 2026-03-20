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
  
const addExecutive = () => {
  currentSectionData.value.push({
    name: "",
    position: "",
    role: "",
    image: "",
  });
};

const removeExecutive = (index) => {
  currentSectionData.value.splice(index, 1);
};


</script>  
<template>

            <div class="space-y-6">
              <button
                class="bg-black text-white px-3 py-2 rounded"
                @click="addExecutive"
              >
                + Add Executive
              </button>

              <div
                v-for="(exec, index) in currentSectionData"
                :key="index"
                class="border rounded p-4 space-y-2"
              >
                <div class="flex items-center gap-3">
    <div class="w-14 h-14 rounded-full bg-gray-200 overflow-hidden">
      <img
        v-if="exec.image"
        :src="exec.image"
        class="w-full h-full object-cover"
      />
    </div>

    <input
      v-model="exec.image"
      placeholder="Image URL"
      class="flex-1 text-xs border rounded px-2 py-1 font-mono"
    />
  </div>
                <input
                  v-model="exec.name"
                  placeholder="Name"
                  class="w-full border-none focus:ring-0"
                />
                <input
                  v-model="exec.position"
                  placeholder="Position"
                  class="w-full border-none focus:ring-0"
                />
                <input
                  v-model="exec.role"
                  placeholder="Role"
                  class="w-full border-none focus:ring-0"
                />

                <button
                  class="text-red-500 text-sm"
                  @click="removeExecutive(index)"
                >
                  Remove
                </button>
              </div>
            </div>
                      
 </template> 
