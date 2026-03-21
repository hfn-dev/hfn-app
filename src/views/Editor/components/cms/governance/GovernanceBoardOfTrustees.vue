<script setup>
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  modelValue: Object
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Default structure (VERY IMPORTANT for nested fields)
const getDefaultData = () => ({
  title: '',
  chair: {
    name: '',
    role: '',
    slug: '',
    tag: '',
    image: '',
    bio: ''
  },
  trustees: []
})

// Local state
const currentSectionData = ref({
  ...getDefaultData(),
  ...props.modelValue
})

// Sync from parent
watch(
  () => props.modelValue,
  (val) => {
    currentSectionData.value = {
      ...getDefaultData(),
      ...val,
      chair: {
        ...getDefaultData().chair,
        ...(val?.chair || {})
      },
      trustees: val?.trustees || []
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

// Add trustee
const addTrustee = () => {
  if (!currentSectionData.value.trustees) {
    currentSectionData.value.trustees = []
  }

  currentSectionData.value.trustees.push({
    name: '',
    title: '',
    slug: '',
    image: ''
  })
}

// Remove trustee
const removeTrustee = (index) => {
  currentSectionData.value.trustees.splice(index, 1)
}
</script>

<template>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Section Title
              </label>
              <input
                v-model="currentSectionData.title"
                type="text"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-4 space-y-3">
              <h4 class="font-semibold text-sm">Chair</h4>

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Name</label
              >
              <input
                v-model="currentSectionData.chair.name"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Role</label
              >
              <input
                v-model="currentSectionData.chair.role"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Slug</label
              >
              <input
                v-model="currentSectionData.chair.slug"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Tag</label
              >
              <input
                v-model="currentSectionData.chair.tag"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Image URL</label
              >
              <input
                v-model="currentSectionData.chair.image"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div
              v-for="(trustee, index) in currentSectionData.trustees"
              :key="index"
              class="border border-gray-300 rounded-lg p-4 space-y-3"
            >
              <div class="flex justify-between items-center">
                <h4 class="font-semibold text-sm">Trustee {{ index + 1 }}</h4>
                <button
                  @click="removeTrustee(index)"
                  class="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Name</label
              >
              <input
                v-model="trustee.name"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Title</label
              >
              <input
                v-model="trustee.title"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Slug</label
              >
              <input
                v-model="trustee.slug"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Image URL</label
              >
              <input
                v-model="trustee.image"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <button
              @click="addTrustee"
              class="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
            >
              + Add Trustee
            </button>
</template>  
