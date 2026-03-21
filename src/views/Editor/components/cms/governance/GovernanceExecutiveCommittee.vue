<script setup>
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  modelValue: Object
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Local state (IMPORTANT: match schema keys)
const currentSectionData = ref({
  executives: [],
  ...props.modelValue
})

// Sync from parent
watch(
  () => props.modelValue,
  (val) => {
    currentSectionData.value = {
      executives: [],
      ...val
    }
  }
)

// Emit changes back
watch(
  currentSectionData,
  (val) => {
    emit('update:modelValue', val)
  },
  { deep: true }
)

// Add executive
const addExecutives = () => {
  if (!currentSectionData.value.executives) {
    currentSectionData.value.executives = []
  }

  currentSectionData.value.executives.push({
    name: '',
    role: '',
    slug: '',
    image: '',
    profile: '',
    socials: []
  })
}

// Remove executive
const removeExecutives = (index) => {
  currentSectionData.value.executives.splice(index, 1)
}

// Add social
const addSocial = (memberIndex) => {
  if (!currentSectionData.value.executives[memberIndex].socials) {
    currentSectionData.value.executives[memberIndex].socials = []
  }

  currentSectionData.value.executives[memberIndex].socials.push({
    platform: '',
    url: ''
  })
}

// Remove social
const removeSocial = (memberIndex, socialIndex) => {
  currentSectionData.value.executives[memberIndex].socials.splice(
    socialIndex,
    1
  )
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

            <div
              v-for="(member, index) in currentSectionData.executives"
              :key="index"
              class="border border-gray-300 rounded-lg p-4 space-y-3"
            >
              <div class="flex justify-between items-center">
                <h4 class="font-semibold text-sm">Member {{ index + 1 }}</h4>
                <button
                  @click="removeExecutives(index)"
                  class="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Name</label
              >
              <input
                v-model="member.name"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Role</label
              >
              <input
                v-model="member.role"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Slug</label
              >
              <input
                v-model="member.slug"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Image URL</label
              >
              <input
                v-model="member.image"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Profile</label
              >
              <textarea
                v-model="member.profile"
                rows="3"
                class="w-full border-none focus:ring-0 resize-none"
              ></textarea>

              <div
                v-for="(social, sIndex) in member.socials"
                :key="sIndex"
                class="flex gap-2 items-center"
              >
                <input
                  v-model="social.platform"
                  placeholder="Platform"
                  class="border p-1 rounded focus:ring-0 w-32"
                />
                <input
                  v-model="social.url"
                  placeholder="URL"
                  class="border p-1 rounded focus:ring-0 flex-1"
                />
                <button
                  @click="removeSocial(index, sIndex)"
                  class="text-red-500"
                >
                  ×
                </button>
              </div>

              <button
                @click="addSocial(index)"
                class="bg-gray-200 px-3 py-1 rounded text-sm"
              >
                + Add Social
              </button>
            </div>

            <button
              @click="addExecutives"
              class="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
            >
              + Add Member
            </button>
</template>  
