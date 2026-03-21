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


const addParagraph = () => {
  if (!currentSectionData.value.paragraphs) {
    currentSectionData.value.paragraphs = []
  }
  currentSectionData.value.paragraphs.push('')
}

const deleteParagraph = (index) => {
  currentSectionData.value.paragraphs.splice(index, 1)
}

const addRolePoint = () => {
  if (!currentSectionData.value.rolePoints) {
    currentSectionData.value.rolePoints = []
  }
  currentSectionData.value.rolePoints.push('')
}

const deleteRolePoint = (index) => {
  currentSectionData.value.rolePoints.splice(index, 1)
}

const addCommitmentGoal = () => {
  if (!currentSectionData.value.commitmentGoals) {
    currentSectionData.value.commitmentGoals = []
  }
  currentSectionData.value.commitmentGoals.push('')
}

const deleteGoal = (index) => {
  currentSectionData.value.commitmentGoals.splice(index, 1)
}  
</script>


<template>

            <div class="space-y-6">
              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                  >Section Title</label
                >
                <input
                  v-model="currentSectionData.sectionTitle"
                  type="text"
                  class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                />
              </div>

              <div
                v-for="(para, index) in currentSectionData.paragraphs"
                :key="index"
                class="border border-gray-300 rounded-lg p-3 space-y-2"
              >
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                  >Paragraph {{ index + 1 }}</label
                >
                <textarea
                  v-model="currentSectionData.paragraphs[index]"
                  rows="3"
                  class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                ></textarea>
                <button
                  class="text-red-500 text-sm"
                  @click="deleteParagraph(index)"
                >
                  Delete
                </button>
              </div>
              <button
                class="bg-black text-white px-4 py-2 rounded"
                @click="addParagraph"
              >
                Add Paragraph
              </button>

              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                  >Mission</label
                >
                <textarea
                  v-model="currentSectionData.mission"
                  rows="3"
                  class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                ></textarea>
              </div>

              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                  >Vision</label
                >
                <textarea
                  v-model="currentSectionData.vision"
                  rows="3"
                  class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                ></textarea>
              </div>

              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                  >Role Points</label
                >
                <div
                  v-for="(point, index) in currentSectionData.rolePoints"
                  :key="index"
                  class="flex justify-between items-center space-x-2"
                >
                  <input
                    v-model="currentSectionData.rolePoints[index]"
                    type="text"
                    class="flex-grow border-none focus:ring-0 p-0 m-0"
                  />
                  <button
                    class="text-red-500 text-sm"
                    @click="deleteRolePoint(index)"
                  >
                    Delete
                  </button>
                </div>
                <button
                  class="bg-black text-white px-3 py-1 rounded mt-2"
                  @click="addRolePoint"
                >
                  Add Point
                </button>
              </div>

              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                  >Commitment Goals</label
                >
                <div
                  v-for="(goal, index) in currentSectionData.commitmentGoals"
                  :key="index"
                  class="flex justify-between items-center space-x-2"
                >
                  <input
                    v-model="currentSectionData.commitmentGoals[index]"
                    type="text"
                    class="flex-grow border-none focus:ring-0 p-0 m-0"
                  />
                  <button
                    class="text-red-500 text-sm"
                    @click="deleteGoal(index)"
                  >
                    Delete
                  </button>
                </div>
                <button
                  class="bg-black text-white px-3 py-1 rounded mt-2"
                  @click="addCommitmentGoal"
                >
                  Add Goal
                </button>
              </div>

              <image-uploader v-model="currentSectionData.image" />
            </div>

 </template> 
