<script setup>
import pagesApi from "@/api/pageManagement";
import aboutImage from "@/assets/about-us.png";
import ayodele from "@/assets/ayodele.png";
import babarinde from "@/assets/babarinde.png";
import chinyere from "@/assets/chinyere.png";
import jennifer from "@/assets/jennifer.png";
import map from "@/assets/map.jpg";
import njide from "@/assets/njide.png";
import partnership from "@/assets/partnership-01.png";
import reagan from "@/assets/reagan.png";
import { aboutPageSchema } from "@/schemas/pages/about.schema";
import { computed, onMounted, ref } from "vue";

const imageMap = {
  "about-us.png": aboutImage,
  "ayodele.png": ayodele,
  "babarinde.png": babarinde,
  "chinyere.png": chinyere,
  "jennifer.png": jennifer,
  "map.jpg": map,
  "njide.png": njide,
  "partnership-01.png": partnership,
  "reagan.png": reagan,
};

const pageFromApi = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await pagesApi.getPageByType("about");
    pageFromApi.value = res?.content || null;
  } catch (e) {
    console.warn("Using local About schema fallback");
  } finally {
    loading.value = false;
  }
});

// const page = computed(() => {
//   return pageFromApi.value || aboutPageSchema;
// });
const page = computed(() => {
  return {
    ...aboutPageSchema,
    ...(pageFromApi.value || {}),
    hero: {
      ...aboutPageSchema.hero,
      ...(pageFromApi.value?.hero || {}),
    },
    story: {
      ...aboutPageSchema.story,
      ...(pageFromApi.value?.story || {}),
    },
    ctaSection: {
      ...aboutPageSchema.ctaSection,
      ...(pageFromApi.value?.ctaSection || {}),
    },
    leadership: {
      ...aboutPageSchema.leadership,
      ...(pageFromApi.value?.leadership || {}),
    },
  };
});

const resolveImage = (image) => imageMap[image] || image;
</script>
<template>
  <div>
    <section class="relative bg-green-50 pb-16 pt-16 sm:pb-24 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          <div class="lg:col-span-6 xl:col-span-5 mb-10 lg:mb-0">
            <h1
              class="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight"
            >
              <span class="text-orange-600"
                >{{ page.hero.titleHighlight }} </span
              ><br />
              <span class="text-green-700">{{ page.hero.titleMain }}</span>
            </h1>

            <p class="mt-6 text-lg text-gray-700">
              <span class="font-semibold text-green-700"
                >{{ page.hero.descriptionTop }}
              </span>
              {{ page.hero.descriptionText }}
            </p>
            <p class="mt-4 text-gray-700 text-lg">
              {{ page.hero.descriptionBottom }}
            </p>

            <div class="mt-10">
              <RouterLink
                :to="page.hero.ctaLink"
                class="inline-flex items-center px-6 py-3 rounded-lg text-white bg-green-700 hover:bg-green-800"
              >
                {{ page.hero.ctaLabel }}
              </RouterLink>
            </div>
          </div>

          <div
            class="lg:col-span-6 xl:col-span-7 relative flex justify-center lg:justify-end"
          >
            <div
              class="w-full max-w-lg lg:max-w-none p-4 overflow-hidden shadow-2xl"
              style="background-color: #f0f7f5; border-radius: 2rem"
            >
              <img
                :src="map"
                alt="World Map of Growing Greenery representing global health"
                class="w-full h-auto object-cover rounded-[2rem] transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-6 sm:py-16 lg:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div
            class="w-full px-4 py-4 sm:px-6 rounded-2xl border-2 border-green-50 bg-white shadow-md text-center"
          >
            <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900">
              {{ page.story.sectionTitle }}
            </h2>
          </div>
        </div>

        <div class="lg:grid lg:grid-cols-12 lg:gap-12">
          <div class="lg:col-span-5 flex justify-center mb-10 lg:mb-0">
            <div class="relative w-full overflow-hidden">
              <img
                :src="aboutImage"
                alt="HFN advocacy and partnership"
                class="w-full h-full object-contain transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          <div class="lg:col-span-7 text-gray-700 text-lg space-y-6 pt-10">
            <div class="space-y-6">
              <p v-for="(p, i) in page.story.paragraphs" :key="i">
                {{ p }}
              </p>
            </div>
            <div>
              <h3 class="font-bold text-xl text-green-700 mb-2">
                Our mission
                <span class="text-gray-700 text-lg font-normal">{{
                  page.story.mission
                }}</span>
              </h3>
            </div>

            <div>
              <h3 class="font-bold text-xl text-green-700 mb-2">
                Our vision
                <span class="text-gray-700 text-lg font-normal">{{
                  page.story.vision
                }}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-10 sm:py-16 lg:py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div
            class="w-full px-4 py-4 sm:px-6 rounded-2xl border-2 border-green-50 bg-white shadow-md text-center"
          >
            <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900">
              {{ page.ctaSection.title }}
            </h2>
          </div>
        </div>
        <div class="mb-10 lg:mb-0">
          <div
            class="relative w-full overflow-hidden h-80 sm:h-96 md:h-[500px] bg-[#F2F9F3] rounded-3xl mt-5"
          >
            <img
              :src="partnership"
              alt="HFN partnership"
              class="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white sm:py-16 lg:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div
            class="w-full px-4 py-4 sm:px-6 rounded-2xl border-2 border-green-50 bg-white shadow-md text-center"
          >
            <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900">
              {{ page.leadership.title }}
            </h2>
          </div>
        </div>
        <section class="bg-white py-16 sm:py-24">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="space-y-20">
              <div
                v-for="(exec, index) in page.leadership.executives"
                :key="exec.name"
                class="lg:grid lg:grid-cols-12 lg:gap-12 items-start mb-24"
              >
                <div
                  class="lg:col-span-4 flex justify-center"
                  :class="index % 2 ? 'lg:order-2' : ''"
                >
                  <div
                    class="relative max-w-xs aspect-[4/5] rounded-t-[2.5rem] rounded-b-xl overflow-hidden shadow-2xl"
                    :style="{ backgroundColor: exec.themeColor }"
                  >
                    <img
                      :src="resolveImage(exec.image)"
                      class="w-full h-full object-cover"
                    />

                    <div
                      class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[85%] px-3 py-3 rounded-xl border bg-white shadow-xl text-center"
                      :class="exec.borderColor"
                    >
                      <h3 :class="['font-semibold', exec.textColor]">
                        {{ exec.name }}
                      </h3>
                      <p class="text-xs">{{ exec.position }}</p>
                      <p class="text-xs">{{ exec.organization }}</p>
                    </div>
                  </div>
                </div>

                <div class="lg:col-span-8 text-gray-700">
                  <h4 class="font-bold text-xl mb-4"></h4>
                  <p class="mb-6 text-lg">{{ exec.bio }}</p>

                  <h4 class="font-bold text-xl mb-2">Words on Marble…</h4>
                  <p class="italic text-lg">"{{ exec.quote }}"</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>
