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
  
const addFaq = () => {
  currentSectionData.value.push({
    question: "",
    answer: "",
  });
};

const removeFaq = (index) => {
  currentSectionData.value.splice(index, 1);
};

</script>  
<template>

            <div class="space-y-6">
              <button
                class="bg-black text-white px-3 py-2 rounded"
                @click="addFaq"
              >
                + Add FAQ
              </button>

              <div
                v-for="(faq, index) in currentSectionData"
                :key="index"
                class="border rounded p-4 space-y-3"
              >
                <input
                  v-model="faq.question"
                  placeholder="Question"
                  class="w-full border-none focus:ring-0"
                />

                <textarea
                  v-model="faq.answer"
                  rows="3"
                  placeholder="Answer"
                  class="w-full border-none focus:ring-0 resize-none"
                />

                <button class="text-red-500 text-sm" @click="removeFaq(index)">
                  Remove
                </button>
              </div>
            </div>
          
 </template> 
