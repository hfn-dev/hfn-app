<template>
  <div class="programs-page font-sans bg-white">
    <section v-if="!page.hero?.is_hidden" :style="{ backgroundColor: page.hero.backgroundColor || '#E87A1814' }" class="pt-10 pb-16">
      <div class="container mx-auto px-4 md:px-8">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div class="lg:w-1/2 mb-8 lg:mb-0">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              <span class="text-green-700">{{ page.hero.titleLine1 }}</span>
              <br />
              <span class="text-gray-900">{{ page.hero.titleLine2 }}</span>
            </h1>
            <p class="mt-4 text-gray-600 max-w-lg">{{ page.hero.description }}</p>
          </div>

          <div class="lg:w-1/2 flex justify-center w-full h-64 sm:h-80 lg:h-96 relative">
            <img :src="resolveImage(page.hero.image)" alt="Latest programs" class="object-cover w-full h-full rounded-lg" />
          </div>
        </div>
      </div>
    </section>

    <main class="container mx-auto px-4 md:px-8 py-16">
      <h2 v-if="!page.ongoingSection?.is_hidden" class="text-2xl font-bold text-gray-800 text-center mb-16">
        {{ page.ongoingSection.title || 'Programs & Initiatives' }}
      </h2>

      <section v-if="!page.ongoingSection?.is_hidden" class="mb-20">
        <h3 class="text-xl font-normal text-gray-800 mb-8 max-w-4xl mx-auto">{{ page.ongoingSection.subtitle }}</h3>
        <p class="text-gray-600 mb-12 max-w-4xl mx-auto">{{ page.ongoingSection.description }}</p>

        <div v-for="(project, i) in page.ongoingSection.projects" :key="project.id || i"
          class="flex flex-col lg:flex-row items-center gap-12 mb-20"
          :class="{ 'lg:flex-row-reverse': project.layoutReverse }">
          <div class="lg:w-1/2">
            <img :src="resolveImage(project.image)" alt="Project image" class="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div class="lg:w-1/2 space-y-4">
            <h3 class="text-2xl font-semibold text-gray-800">{{ project.title }}</h3>
            <p class="text-gray-600">{{ project.summary }}</p>
            <div v-if="project.problem" class="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <strong class="text-red-700 block mb-1">Problem:</strong>
              <p class="text-sm text-gray-700">{{ project.problem }}</p>
            </div>
            <div v-if="project.solution" class="bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <strong class="text-green-700 block mb-1">Solution:</strong>
              <p class="text-sm text-gray-700">{{ project.solution }}</p>
            </div>
            <div v-if="project.outcomes" class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <strong class="text-blue-700 block mb-1">Outcomes:</strong>
              <p class="text-sm text-gray-700">{{ project.outcomes }}</p>
            </div>
          </div>
        </div>
      </section>

      <section v-if="!page.pastInitiatives?.is_hidden" class="mb-20">
        <div class="flex flex-col space-y-8 max-w-5xl mx-auto bg-[#F2F9F3] px-10 py-10 rounded-3xl">
          <h3 class="text-2xl font-bold text-gray-800">{{ page.pastInitiatives.title }}</h3>
          <p class="text-gray-600">{{ page.pastInitiatives.description }}</p>

          <div v-for="(initiative, j) in page.pastInitiatives.list" :key="j" class="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-2xl shadow">
            <img :src="resolveImage(initiative.image)" alt="Initiative image" class="w-full md:w-48 h-32 object-cover rounded-lg" />
            <div class="flex-1">
              <h4 class="text-lg font-semibold text-gray-800 mb-2">{{ initiative.title }}</h4>
              <p class="text-gray-600 text-sm">{{ initiative.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import pagesApi from "@/api/pageManagement";
import { programsPageSchema } from "@/schemas/pages/programs.schema";

const pageFromApi = ref(null);

const page = computed(() => ({
  ...programsPageSchema,
  ...(pageFromApi.value || {}),
  hero: { ...programsPageSchema.hero, ...(pageFromApi.value?.hero || {}) },
  ongoingSection: { ...programsPageSchema.ongoingSection, ...(pageFromApi.value?.ongoingSection || {}), projects: pageFromApi.value?.ongoingSection?.projects?.length ? pageFromApi.value.ongoingSection.projects : programsPageSchema.ongoingSection.projects },
  pastInitiatives: { ...programsPageSchema.pastInitiatives, ...(pageFromApi.value?.pastInitiatives || {}) },
}));

const imageMap = {
  "latest_news.png": "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769896360/243A8355_r47c3t.jpg",
  "group.png": "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769716176/e21b2626f11dbd7c071c1bdc38aee1f6_L_y1r0t8.jpg",
  "hands.png": "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769715465/1feebd03da9f660dfb6e3f79b696f544_L_rxf7mk.jpg",
};

const resolveImage = (image) => imageMap[image] || image || "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769896360/243A8355_r47c3t.jpg";

onMounted(async () => {
  try {
    const res = await pagesApi.getPageByType("programs");
    const content = res?.content || null;
    if (content?._hidden) {
      for (const key of content._hidden) {
        if (content[key]) content[key].is_hidden = true;
      }
      delete content._hidden;
    }
    pageFromApi.value = content;
  } catch (e) {
    console.warn("Using local programs schema fallback");
  }
});
</script>
