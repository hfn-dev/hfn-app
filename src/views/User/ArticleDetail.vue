<script setup>
import newsApi from '@/api/newsModule.js';
import UserSidebar from '@/components/layout/UserSidebar.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const article = ref(null);
const loading = ref(true);

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
  <div class="flex min-h-screen bg-white">
    <UserSidebar />

    <div class="flex-1 p-6 md:p-10 max-w-5xl mx-auto">
      <div v-if="loading">Loading…</div>

      <article v-else-if="article">
        <img
          :src="article.featured_image"
          class="w-full h-[360px] object-cover rounded-2xl shadow-md mb-8"
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
