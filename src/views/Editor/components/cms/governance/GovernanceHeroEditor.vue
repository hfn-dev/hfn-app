<script setup>
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  modelValue: Object
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Local state
const currentSectionData = ref({
  titleHighlight: '',
  titleMain: '',
  description: '',
  image: '',
  ...props.modelValue
})

// Sync from parent
watch(
  () => props.modelValue,
  (val) => {
    currentSectionData.value = {
      titleHighlight: '',
      titleMain: '',
      description: '',
      image: '',
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
</script>

<template>
  <!-- TITLE HIGHLIGHT -->
  <div class="border border-gray-300 rounded-lg p-3 space-y-2">
    <label class="block text-xs font-semibold uppercase text-gray-500">
      Title Highlight
    </label>
    <input
      v-model="currentSectionData.titleHighlight"
      type="text"
      class="w-full border-none focus:ring-0"
    />
  </div>

  <!-- TITLE MAIN -->
  <div class="border border-gray-300 rounded-lg p-3 space-y-2">
    <label class="block text-xs font-semibold uppercase text-gray-500">
      Title Main
    </label>
    <input
      v-model="currentSectionData.titleMain"
      type="text"
      class="w-full border-none focus:ring-0"
    />
  </div>

  <!-- DESCRIPTION -->
  <div class="border border-gray-300 rounded-lg p-3 space-y-2">
    <label class="block text-xs font-semibold uppercase text-gray-500">
      Description
    </label>
    <textarea
      v-model="currentSectionData.description"
      rows="4"
      class="w-full border-none focus:ring-0 resize-none"
    ></textarea>
  </div>

  <!-- IMAGE -->
  <div class="border border-gray-300 rounded-lg p-3 space-y-2">
    <label class="block text-xs font-semibold uppercase text-gray-500">
      Image
    </label>

    <!-- If you use uploader -->
    <image-uploader v-model="currentSectionData.image" />

    <!-- OR fallback input -->
    <!--
    <input
      v-model="currentSectionData.image"
      type="text"
      class="w-full border-none focus:ring-0"
    />
    -->
  </div>
</template>
