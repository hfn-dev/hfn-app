<template>
          
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Section Title
              </label>
              <input
                v-model="currentSectionData.title"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div
              v-for="(event, index) in currentSectionData.items"
              :key="index"
              class="border border-gray-300 rounded-lg p-4 space-y-3"
            >
              <div class="flex justify-between items-center">
                <h4 class="font-semibold text-sm">
                  Past Event {{ index + 1 }}
                </h4>
                <button
                  @click="removePastEvent(index)"
                  class="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>

              <input
                v-model="event.title"
                placeholder="Title"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="event.category"
                placeholder="Category"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="event.date"
                placeholder="Date"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="event.theme"
                placeholder="Theme"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="event.image"
                placeholder="Image URL"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <button
              @click="addPastEvent"
              class="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
            >
              + Add Past Event
            </button>
</template>  
