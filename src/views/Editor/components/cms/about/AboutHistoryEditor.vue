
<script setup>
import { ref, watch } from 'vue'

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
</script>


<template>
          
            <div class="border border-gray-300 rounded-lg p-3 mb-4">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Title</label
              >
              <input
                v-model="currentSectionData.title"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div
              v-for="(milestone, index) in currentSectionData.milestones"
              :key="index"
              class="border border-gray-300 rounded-lg p-3 mb-2 space-y-2"
            >
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Year</label
              >
              <input
                v-model="milestone.year"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Event</label
              >
              <textarea
                v-model="milestone.event"
                rows="2"
                class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
              ></textarea>

              <button
                class="text-red-500 text-sm"
                @click="deleteMilestone(index)"
              >
                Delete
              </button>
            </div>

            <button
              class="bg-black text-white px-4 py-2 rounded"
              @click="addMilestone"
            >
              Add Milestone
            </button>
         
</template>  
