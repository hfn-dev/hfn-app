<template>

            <div
              v-for="(item, index) in currentSectionData.items"
              :key="index"
              class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4"
            >
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Title</label
              >
              <input
                v-model="item.title"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Short Description</label
              >
              <input
                v-model="item.shortDesc"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Full Description</label
              >
              <textarea
                v-model="item.fullDesc"
                rows="3"
                class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
              ></textarea>

              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Color Class</label
              >
              <input
                v-model="item.colorClass"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <button
                class="text-red-500 text-sm mt-2"
                @click="deleteItem(index)"
              >
                Delete Item
              </button>
            </div>
            <button
              class="bg-black text-white px-4 py-2 rounded"
              @click="addItem"
            >
              Add New Item
            </button>
          

</template>  
