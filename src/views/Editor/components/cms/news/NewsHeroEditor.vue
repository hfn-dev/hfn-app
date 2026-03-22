<template>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Hero Title Line 1
              </label>
              <input
                v-model="currentSectionData.titleLine1"
                type="text"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Hero Title Line 2
              </label>
              <input
                v-model="currentSectionData.titleLine2"
                type="text"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Hero Description
              </label>
              <textarea
                v-model="currentSectionData.description"
                rows="4"
                class="w-full border-none focus:ring-0 resize-none"
              ></textarea>
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Hero Image URL
              </label>
              <input
                v-model="currentSectionData.image"
                type="text"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Hero Background Color
              </label>
              <input
                v-model="currentSectionData.backgroundColor"
                type="color"
                class="w-16 h-10 p-0 border-none focus:ring-0"
              />
            </div>
          

</template>  
