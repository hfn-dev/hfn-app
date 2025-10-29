<script setup>
import { ref } from "vue";
import EditorSidebar from "./EditorSidebar.vue";

const newPageTitle = ref("");

const pages = ref([
  { id: 1, title: "Home", isVisible: true },
  { id: 2, title: "About Us", isVisible: true },
  { id: 3, title: "Latest Updates", isVisible: false },
  { id: 4, title: "Member Area", isVisible: true },
  { id: 5, title: "Contact Us", isVisible: true },
]);

const addPage = () => {
  const title = newPageTitle.value.trim();
  if (title) {
    const newId = pages.value.length
      ? Math.max(...pages.value.map((p) => p.id)) + 1
      : 1;

    pages.value.push({
      id: newId,
      title: title,
      isVisible: true,
    });

    newPageTitle.value = "";
  }
};

const toggleVisibility = (page) => {
  page.isVisible = !page.isVisible;
  console.log(`Page '${page.title}' visibility set to: ${page.isVisible}`);
};

const editPage = (page) => {
  console.log(`Editing page with ID: ${page.id} and Title: ${page.title}`);
};

const deletePage = (id) => {
  if (confirm("Are you sure you want to delete this page?")) {
    pages.value = pages.value.filter((page) => page.id !== id);
    console.log(`Page with ID ${id} deleted.`);
  }
};
</script>

<template>
  <div class="flex min-h-screen">
    <EditorSidebar />

    <div class="flex-grow p-6">
      
      <nav class="mb-6 text-sm text-gray-500">
        <a href="#" class="hover:underline">Home</a>
        <span class="mx-1">/</span>
        <span class=" text-gray-700">Page Manager</span>
      </nav>

      <div class="mb-8 p-4 bg-white rounded-lg shadow-sm">
        <h1 class="text-2xl font-bold text-gray-800 text-center">Page Manager</h1>
      </div>

      <div class="mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="flex items-center space-x-4">
          <input
            v-model="newPageTitle"
            @keyup.enter="addPage"
            type="text"
            placeholder="Add New Page (e.g., 'New Page Title')"
            class="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            @click="addPage"
            :disabled="!newPageTitle.trim()"
            class="bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50 transition duration-200"
          >
            Add
          </button>
        </div>
      </div>

      <div class="space-y-4">
        <div
          v-for="page in pages"
          :key="page.id"
          class="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <span class="text-gray-700 font-medium">{{ page.title }}</span>

          <div class="flex items-center space-x-3">
            <button
              @click="toggleVisibility(page)"
              class="transition duration-200"
              :class="
                page.isVisible
                  ? 'text-green-500 hover:text-green-700'
                  : 'text-gray-400 hover:text-gray-600'
              "
              :aria-label="page.isVisible ? 'Hide Page' : 'Show Page'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <template v-if="page.isVisible">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </template>

                <template v-else>
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.08 3.52"
                  />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </template>
              </svg>
            </button>

            <button
              @click="editPage(page)"
              class="text-green-500 hover:text-green-700 transition duration-200"
              aria-label="Edit Page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
                />
              </svg>
            </button>

            <button
              @click="deletePage(page.id)"
              class="text-red-500 hover:text-red-700 transition duration-200"
              aria-label="Delete Page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path
                  d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>
