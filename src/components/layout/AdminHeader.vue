<script setup>
import hfn_logo from '@/assets/hfn_logo.png';
const DARK_GREEN = '#004d33';
</script>

<template>
  <header
    class="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10"
  >
    <div
      :style="{ backgroundColor: DARK_GREEN }"
      class="text-white text-sm flex justify-end px-4 sm:px-8 py-2 rounded-b-xl"
    >
      <div class="relative group cursor-pointer">
        <div
          class="flex items-center px-3 py-1 rounded-full bg-green-900 bg-opacity-10 hover:bg-opacity-20 transition"
        >
          English
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-4 h-4 ml-1 transition-transform text-white"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        <div
          class="absolute right-0 mt-2 w-32 bg-white text-gray-800 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-10 overflow-hidden"
        >
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">Hausa</a>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">Igbo</a>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">Yoruba</a>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between p-4 lg:px-6">
      <div class="flex items-center space-x-6">
        <div class="flex items-center flex-shrink-0">
          <RouterLink to="/admin/dashboard" class="cursor-pointer">
            <img
              :src="hfn_logo"
              alt="HFN Logo"
              class="w-26 h-auto flex-shrink-0"
              style="width: 100px"
            />
          </RouterLink>
        </div>

        <div class="relative hidden sm:block w-96">
          <input
            type="text"
            placeholder="Search for courses"
            class="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition shadow-inner text-sm"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <div
          class="relative group cursor-pointer text-sm hidden sm:block"
        ></div>

        <button
          class="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-6 h-6"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.375 21a2 2 0 1 0 3.25 0" />
          </svg>
        </button>

        <div class="relative group cursor-pointer">
          <div
            class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-300 hover:border-green-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-6 h-6 text-gray-600"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
