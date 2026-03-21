<template>

            <div class="border border-gray-300 rounded-lg p-3 mb-4">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Title</label
              >
              <input
                v-model="currentSectionData.title"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 mb-2 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Description</label
              >
              <textarea
                v-model="currentSectionData.description"
                rows="3"
                class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
              ></textarea>
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Units</label
              >
              <div
                v-for="(unit, index) in currentSectionData.units"
                :key="index"
                class="flex justify-between items-center space-x-2"
              >
                <input
                  v-model="currentSectionData.units[index]"
                  type="text"
                  class="flex-grow border-none focus:ring-0 p-0 m-0"
                />
                <button class="text-red-500 text-sm" @click="deleteUnit(index)">
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
