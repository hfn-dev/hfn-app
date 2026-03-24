<script setup>
import { ref, watch } from "vue";


const getDefaultSectionData = () => ({
  iframeUrl:
    "",

  height: 500,
  borderWeight: 4,
  borderColor: "border-green-200",
});


const currentSectionData = ref(getDefaultSectionData());
const emit = defineEmits(["update:modelValue"]);

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
              <!-- Iframe URL -->
              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Google Maps Iframe URL
                </label>
                <textarea
                  v-model="currentSectionData.iframeUrl"
                  rows="3"
                  class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                />
              </div>

              <!-- Map Height -->
              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
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
