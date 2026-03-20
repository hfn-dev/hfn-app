
<script setup>
import { ref } from 'vue'

const heroUploadRef = ref(null)            
const props = defineProps({
  modelValue: Object
})

const emit = defineEmits(['update:modelValue'])
const resetHeroColor = () => {
  props.modelValue.backgroundColor = '#FFFFFF'
}
const handleHeroImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 1024 * 1024) {
    alert("Image must be less than 1MB");
    return;
  }

  currentSectionData.value.heroImage = file;

  const reader = new FileReader();
  reader.onload = (e) => {
    currentSectionData.value.heroImagePreview = e.target.result;
  };
  reader.readAsDataURL(file);
};

            
</script>

<template>
            <div class="flex space-x-6">
              <!-- LEFT SIDE -->
              <div class="w-3/5 space-y-6">
                <!-- Highlight Title -->
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                  >
                    Highlight Title
                  </label>
                  <input
                    v-model="modelValue.titleHighlight"
                    type="text"
                    class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                    placeholder="Healthcare"
                  />
                </div>

                <!-- Main Title -->
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                  >
                    Main Title
                  </label>
                  <input
                    v-model="modelValue.titleMain"
                    type="text"
                    class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                    placeholder="Advocacy."
                  />
                </div>

                <!-- Intro Line -->
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                  >
                    Intro Line
                  </label>
                  <textarea
                    v-model="modelValue.introLine"
                    rows="2"
                    class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                  />
                </div>

                <!-- Intro Text -->
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                  >
                    Intro Text
                  </label>
                  <textarea
                    v-model="modelValue.introText"
                    rows="2"
                    class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                  />
                </div>

                <!-- Sub Text -->
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                  >
                    Slide urls
                  </label>
                  
                    <div v-for="(slide, i) in modelValue.hero.slides" :key="i" class="mt-2">
              <input v-model="modelValue.hero.slides[i]" type="text" class="w-full text-xs border rounded p-2 bg-slate-50 font-mono" />
            </div>
                </div>

                <!-- CTA Text -->
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                  >
                    CTA Text
                  </label>
                  <input
                    v-model="modelValue.ctaText"
                    type="text"
                    class="w-full text-base border-none focus:ring-0 p-0 m-0"
                  />
                </div>

                <!-- CTA Link -->
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                  >
                    CTA Link
                  </label>
                  <input
                    v-model="modelValue.ctaLink"
                    type="text"
                    class="w-full text-base border-none focus:ring-0 p-0 m-0"
                    placeholder="/register"
                  />
                </div>
              </div>

              <!-- RIGHT SIDE -->
              <div class="w-2/5 space-y-6">
                <!-- IMAGE UPLOAD -->
                <div
                  class="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white shadow-inner"
                >
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    class="hidden"
                    ref="heroUploadRef"
                    @change="handleHeroImageUpload"
                  />

                  <div
                    class="bg-red-50 h-40 w-full mb-4 border border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer"
                    @click="heroUploadRef.click()"
                  >
                    <img
                      v-if="modelValue.heroImagePreview"
                      :src="modelValue.heroImagePreview"
                      class="h-full object-contain"
                    />

                    <span v-else class="text-sm text-gray-600">
                      Click to upload hero image
                    </span>
                  </div>

                  <div class="text-xs text-gray-500 space-y-1 w-full">
                    <p class="font-semibold">Image Requirements:</p>
                    <ul class="list-disc list-inside">
                      <li>jpeg, jpg, png</li>
                      <li>Max 1MB</li>
                      <li>1024x1024px recommended</li>
                    </ul>
                  </div>
                </div>

                <!-- BACKGROUND COLOR -->
                <div
                  class="border border-gray-300 rounded-lg p-3 space-y-2 bg-white"
                >
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                  >
                    Background Colour
                  </label>

                  <div class="flex items-center space-x-2">
                    <input
                      v-model="modelValue.backgroundColor"
                      type="color"
                      class="w-8 h-8 rounded border-none p-0 cursor-pointer"
                    />

                    <input
                      v-model="modelValue.backgroundColor"
                      type="text"
                      class="flex-grow text-base border-none focus:ring-0 p-0 m-0 font-mono uppercase"
                    />

                    <button
                      class="text-gray-500 hover:text-green-600"
                      @click="resetHeroColor"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>
