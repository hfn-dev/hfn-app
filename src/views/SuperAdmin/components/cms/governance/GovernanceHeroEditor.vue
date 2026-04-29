<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Object
})

const emit = defineEmits(['update:modelValue'])

const currentSectionData = ref({
  titleHighlight: '',
  titleMain: '',
  description: '',
  image: '',
  ...props.modelValue
})

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

watch(
  currentSectionData,
  (val) => {
    emit('update:modelValue', val)
  },
  { deep: true }
)
</script>

<template>
  <div class="space-y-4">
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

    <div class="border border-gray-300 rounded-lg p-3 space-y-2">
      <label class="block text-xs font-semibold uppercase text-gray-500">
        Image URL
      </label>
      <input
        v-model="currentSectionData.image"
        type="text"
        class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
    </div>
  </div>
</template>
