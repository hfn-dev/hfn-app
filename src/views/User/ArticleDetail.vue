<script setup>
import newsApi from '@/api/newsModule.js';
import UserSidebar from '@/components/layout/UserSidebar.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const article = ref(null);
const loading = ref(true);
const showSidebar = ref(false);
const toggleSidebar = () => (showSidebar.value = !showSidebar.value);
const closeSidebar = () => (showSidebar.value = false);

const fetchArticle = async () => {
  try {
    article.value = await newsApi.getArticle(route.params.slug);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchArticle);
</script>

<template>
  <div class="flex min-h-screen bg-white relative">
    <button @click="toggleSidebar"
      class="lg:hidden fixed top-20 right-4 z-50 bg-[#004d33] text-white p-2 rounded-md shadow-md">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <div v-if="showSidebar" class="fixed inset-0 bg-gray-500 bg-opacity-50 z-30 lg:hidden" @click="closeSidebar"></div>

    <div :class="[
      'fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 w-72 max-w-full lg:static lg:translate-x-0 lg:w-64 lg:min-h-screen',
      showSidebar ? 'translate-x-0' : '-translate-x-full'
    ]">
      <UserSidebar @closeSidebar="closeSidebar" />
    </div>

    <div class="flex-1 p-6 md:p-10 max-w-5xl mx-auto">
      <div v-if="loading">Loading…</div>

      <article v-else-if="article">
        <img
          :src="article.featured_image"
          class="w-full h-[360px] object-contain rounded-2xl shadow-md mb-8"
        />

        <h1 class="text-4xl font-extrabold text-[#333] mb-4">
          {{ article.title }}
        </h1>

        <p class="text-sm text-gray-500 mb-6">
          {{ new Date(article.publish_date).toDateString() }} •
          {{ article.author_name }}
        </p>

        <div
          class="prose max-w-none prose-p:text-gray-700 prose-h2:text-[#004D33]"
          v-html="article.content"
        />
      </article>
    </div>
  </div>
</template>
