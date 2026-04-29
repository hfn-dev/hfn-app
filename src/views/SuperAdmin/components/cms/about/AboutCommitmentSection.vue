<script setup>
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  modelValue: Object
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Initialize section data
const currentSectionData = ref({
  goals: [],
  ...props.modelValue
})

// Sync props changes
watch(
  () => props.modelValue,
  (val) => {
    currentSectionData.value = { goals: [], ...val }
  }
)

// Emit changes
watch(
  currentSectionData,
  (val) => {
    emit('update:modelValue', val)
  },
  { deep: true }
)

// Goal management
const addGoal = () => {
  if (!currentSectionData.value.goals) {
    currentSectionData.value.goals = []
  }
  currentSectionData.value.goals.push('')
}

const deleteGoal = (index) => {
  currentSectionData.value.goals.splice(index, 1)
}
</script>

<template>
  <!-- Section Title -->
  <div class="border border-gray-300 rounded-lg p-3 mb-4">
    <label class="block text-xs font-semibold uppercase text-gray-500">Title</label>
    <input
      v-model="currentSectionData.title"
      type="text"
      class="w-full border-none focus:ring-0 p-0 m-0"
    />
  </div>

  <!-- Section Description -->
  <div class="border border-gray-300 rounded-lg p-3 mb-4">
    <label class="block text-xs font-semibold uppercase text-gray-500">Description</label>
    <textarea
      v-model="currentSectionData.description"
      rows="3"
      class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
    ></textarea>
  </div>

  <!-- Button Text -->
  <div class="border border-gray-300 rounded-lg p-3 mb-4">
    <label class="block text-xs font-semibold uppercase text-gray-500">Button Text</label>
    <input
      v-model="currentSectionData.buttonText"
      type="text"
      class="w-full border-none focus:ring-0 p-0 m-0"
    />
  </div>

  <!-- Goals -->
  <div class="border border-gray-300 rounded-lg p-3 space-y-2">
    <label class="block text-xs font-semibold uppercase text-gray-500">Goals</label>

    <div
      v-for="(goal, index) in currentSectionData.goals"
      :key="index"
      class="flex justify-between items-center space-x-2 mb-2"
    >
      <input
        v-model="currentSectionData.goals[index]"
        type="text"
        class="flex-grow border-none focus:ring-0 p-0 m-0"
      />
      <button class="text-red-500 text-sm" @click="deleteGoal(index)">
        Delete
      </button>
    </div>

    <button
      class="bg-black text-white px-3 py-1 rounded mt-2"
      @click="addGoal"
    >
      Add Goal
    </button>
  </div>
</template>
