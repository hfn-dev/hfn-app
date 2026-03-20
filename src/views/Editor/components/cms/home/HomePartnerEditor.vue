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
  
const addPartnerLogo = () => {
  currentSectionData.value.logos.push("");
};

const removePartnerLogo = (index) => {
  currentSectionData.value.logos.splice(index, 1);
};


</script>  
<template>

            <div class="space-y-6">
              <!-- Title -->
              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Section Title
                </label>
                <input
                  v-model="currentSectionData.title"
                  type="text"
                  class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                />
              </div>

              <!-- Logos -->
              <div class="border border-gray-300 rounded-lg p-4 space-y-4">
                <div class="flex justify-between items-center">
                  <label class="text-xs font-semibold uppercase text-gray-500">
                    Partner Logos
                  </label>

                  <button
                    class="text-sm bg-black text-white px-3 py-1 rounded"
                    @click="addPartnerLogo"
                  >
                    + Add Logo
                  </button>
                </div>

                <div
                  v-for="(logo, index) in currentSectionData.logos"
                  :key="index"
                  class="flex items-center space-x-3 border rounded p-2"
                >
                  <input
                    v-model="currentSectionData.logos[index]"
                    type="text"
                    class="flex-grow border-none focus:ring-0"
                    placeholder="logo-key or cloudinary-id"
                  />

                  <button
                    class="text-red-500 text-sm"
                    @click="removePartnerLogo(index)"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          
</template> 
