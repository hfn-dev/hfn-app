
<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: Object
})

const emit = defineEmits(['update:modelValue'])
const currentSectionData = ref(props.modelValue || {})

watch(
  () => props.modelValue,
  (val) => {
    currentSectionData.value = val || {}
  }
)

watch(
  currentSectionData,
  (val) => {
    emit('update:modelValue', val)
  },
  { deep: true }
)  


const addItem = () => {
  if (activeSection.value === "donations") {
    currentSectionData.value.paragraphs.push("");
  }

  if (activeSection.value === "partnerships") {
    currentSectionData.value.items.push({
      title: "",
      description: "",
      buttonText: "",
    });
  }

  if (activeSection.value === "opportunities") {
    currentSectionData.value.items.push({
      title: "",
      description: "",
      buttonText: "",
    });
  }

  if (activeSection.value === "donationModal") {
    currentSectionData.value.options.push({
      title: "",
      description: "",
    });
  }
  if (activeSection.value === "newsletterSection") {
    currentSectionData.value.items.push({
      date: "",
      text: "",
      pdfUrl: "",
    });
  }

  if (activeSection.value === "publicationsSection") {
    currentSectionData.value.items.push({
      title: "",
      description: "",
      pdfUrl: "",
    });
  }
};

const deleteItem = (index) => {
  if (activeSection.value === "donations") {
    currentSectionData.value.paragraphs.splice(index, 1);
  } else if (activeSection.value === "donationModal") {
    currentSectionData.value.options.splice(index, 1);
  } else {
    currentSectionData.value.items.splice(index, 1);
  }
};
  
</script>


<template>

            <div
              v-for="(item, index) in currentSectionData.items"
              :key="index"
              class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4"
            >
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Title</label
              >
              <input
                v-model="item.title"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Short Description</label
              >
              <input
                v-model="item.shortDesc"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Full Description</label
              >
              <textarea
                v-model="item.fullDesc"
                rows="3"
                class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
              ></textarea>

              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Color Class</label
              >
              <input
                v-model="item.colorClass"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <button
                class="text-red-500 text-sm mt-2"
                @click="deleteItem(index)"
              >
                Delete Item
              </button>
            </div>
            <button
              class="bg-black text-white px-4 py-2 rounded"
              @click="addItem"
            >
              Add New Item
            </button>
          

</template>  
