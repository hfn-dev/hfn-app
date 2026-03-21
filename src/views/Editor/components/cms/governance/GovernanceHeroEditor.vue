<script setup>
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  modelValue: Object
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Local state (with defaults)
const currentSectionData = ref({
  units: [],
  ...props.modelValue
})

// Sync from parent
watch(
  () => props.modelValue,
  (val) => {
    currentSectionData.value = {
      units: [],
      ...val
    }
  }
)

// Sync to parent
watch(
  currentSectionData,
  (val) => {
    emit('update:modelValue', val)
  },
  { deep: true }
)

// Add unit
const addUnit = () => {
  if (!currentSectionData.value.units) {
    currentSectionData.value.units = []
  }
  currentSectionData.value.units.push('')
}

// Delete unit
const deleteUnit = (index) => {
  currentSectionData.value.units.splice(index, 1)
}
</script>

<template>
  <!-- TITLE -->
  <div class="border border-gray-300 rounded-lg p-3 space-y-2">
    <label class="block text-xs font-semibold uppercase text-gray-500">
      Title
    </label>
    <input
      v-model="currentSectionData.title"
      type="text"
      class="w-full border-none focus:ring-0"
    />
  </div>

  <!-- NOTE / DESCRIPTION -->
  <div class="border border-gray-300 rounded-lg p-3 space-y-2">
    <label class="block text-xs font-semibold uppercase text-gray-500">
      Note
    </label>
    <textarea
      v-model="currentSectionData.note"
      rows="3"
      class="w-full border-none focus:ring-0 resize-none"
    ></textarea>
  </div>

  <!-- UNITS -->
  <div class="border border-gray-300 rounded-lg p-3 space-y-2">
    <label class="block text-xs font-semibold uppercase text-gray-500">
      Units
    </label>

    <div
      v-for="(unit, index) in currentSectionData.units"
      :key="index"
      class="flex items-center space-x-2"
    >
      <input
        v-model="currentSectionData.units[index]"
        type="text"
        class="flex-grow border-none focus:ring-0"
      />
      <button
        class="text-red-500 text-sm"
        @click="deleteUnit(index)"
      >
        Delete
      </button>
    </div>

    <button
      class="bg-black text-white px-3 py-1 rounded mt-2"
      @click="addUnit"
    >
      Add Unit
    </button>
  </div>
</template>
