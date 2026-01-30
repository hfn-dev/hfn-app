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
import { computed, onMounted, onUnmounted, ref } from "vue";

const scrollY = ref(0);
const parallaxContainer = ref(null);

const handleScroll = () => {
  if (parallaxContainer.value) {
    const rect = parallaxContainer.value.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      scrollY.value = window.scrollY - parallaxContainer.value.offsetTop;
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
const items = [
  {
    title: "PARTNERSHIPS",
    shortDesc: "Unified voice.",
    fullDesc:
      "We believe in collaboration as an apolitical, Non-Partisan organization.",
    colorClass: "leaf-green",
  },
  {
    title: "INNOVATION",
    shortDesc: "Practical solutions.",
    fullDesc:
      "Promoting cost-effective innovations to improve global healthcare indices.",
    colorClass: "leaf-tan",
  },
  {
    title: "PARTNERSHIPS",
    shortDesc: "Unified voice.",
    fullDesc:
      "We believe in collaboration as an apolitical, Non-Partisan organization.",
    colorClass: "leaf-green",
  },
  {
    title: "INNOVATION",
    shortDesc: "Practical solutions.",
    fullDesc:
      "Promoting cost-effective innovations to improve global healthcare indices.",
    colorClass: "leaf-tan",
  },
  {
    title: "PARTNERSHIPS",
    shortDesc: "Unified voice.",
    fullDesc:
      "We believe in collaboration as an apolitical, Non-Partisan organization.",
    colorClass: "leaf-green",
  },
  {
    title: "INNOVATION",
    shortDesc: "Practical solutions.",
    fullDesc:
      "Promoting cost-effective innovations to improve global healthcare indices.",
    colorClass: "leaf-tan",
  },
];

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
        <!-- <div class="mb-10 lg:mb-0">
          <div
            class="relative w-full overflow-hidden h-80 sm:h-96 md:h-[500px] bg-[#F2F9F3] rounded-3xl mt-5"
          >
            <img
              :src="partnership"
              alt="HFN partnership"
              class="w-full h-full object-cover object-center"
            />
          </div>
        </div> -->

        <div class="mb-10 lg:mb-0 group/container" ref="parallaxContainer">
          <div
            class="relative w-full overflow-hidden min-h-[850px] bg-[#f8fdf9] rounded-[4rem] mt-5 p-4 md:p-12 flex items-center justify-center border border-white shadow-2xl"
          >
            <div class="absolute inset-0 z-0">
              <div
                class="blob blob-1"
                :style="{ transform: `translateY(${scrollY * 0.2}px)` }"
              ></div>
              <div
                class="blob blob-2"
                :style="{
                  transform: `translateY(${scrollY * -0.1}px) translateX(20px)`,
                }"
              ></div>
            </div>

            <div
              class="absolute inset-0 z-10 backdrop-blur-[120px] bg-white/20"
            ></div>

            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-x-24 max-w-7xl relative z-20"
            >
              <div
                v-for="(item, index) in items"
                :key="index"
                class="leaf-wrapper"
                :style="{
                  '--delay': `${index * 0.4}s`,
                  '--float-dist': index % 2 === 0 ? '30px' : '-30px',
                  transform: `translateY(${scrollY * 0.05}px)`,
                }"
              >
                <div class="leaf-card group">
                  <div
                    :class="[
                      'leaf-face leaf-front border border-white/50 shadow-2xl',
                      item.colorClass,
                    ]"
                  >
                    <div
                      class="absolute top-6 right-8 text-[40px] font-black opacity-5 italic select-none"
                    >
                      {{ index + 1 }}
                    </div>
                    <h3
                      class="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none px-4 text-balance"
                    >
                      {{ item.title }}
                    </h3>
                    <div
                      class="w-12 h-[4px] bg-current/20 my-6 group-hover:w-24 group-hover:bg-current/40 transition-all duration-700"
                    ></div>
                    <p
                      class="text-xs font-bold tracking-wide uppercase opacity-60 mb-2"
                    >
                      Focus Area
                    </p>
                    <p
                      class="text-xs font-medium leading-relaxed opacity-80 px-10"
                    >
                      {{ item.shortDesc }}
                    </p>
                  </div>

                  <div
                    :class="[
                      'leaf-face leaf-back shadow-inner',
                      item.colorClass === 'leaf-green'
                        ? 'bg-[#2D5A3A] text-white'
                        : 'bg-[#7A4B3A] text-white',
                    ]"
                  >
                    <div class="p-8">
                      <p class="text-sm md:text-base font-bold leading-relaxed">
                        {{ item.fullDesc }}
                      </p>
                      <button
                        class="mt-6 px-6 py-2 border border-white/30 rounded-full text-xs hover:bg-white hover:text-black transition-colors"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                  <div class="flex flex-col items-center gap-4">
                    <div
                      class="relative max-w-xs aspect-[4/5] rounded-t-[2.5rem] rounded-b-xl overflow-hidden shadow-2xl"
                      :style="{ backgroundColor: exec.themeColor }"
                    >
                      <img
                        :src="resolveImage(exec.image)"
                        class="w-full h-full object-cover"
                      />

                      <div
                        class="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-[85%] px-3 py-3 rounded-xl border bg-white shadow-xl text-center"
                        :class="exec.borderColor"
                      >
                        <p class="text-xs font-medium">{{ exec.position }}</p>
                        <p class="text-xs">{{ exec.organization }}</p>
                      </div>
                    </div>

                    <h3
                      class="mt-2 text-lg font-semibold text-center tracking-wide"
                      :class="exec.textColor"
                    >
                      {{ exec.name }}
                    </h3>
                    <div v-if="exec.socials?.length" class="flex gap-3 mt-2">
                      <a
                        v-for="(social, idx) in exec.socials"
                        :key="idx"
                        :href="social.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-gray-500 hover:text-green-700 transition"
                      >
                        <i
                          v-if="social.platform === 'linkedin'"
                          class="fab fa-linkedin fa-lg"
                        ></i>
                        <i
                          v-else-if="social.platform === 'twitter'"
                          class="fab fa-twitter fa-lg"
                        ></i>
                        <i
                          v-else-if="social.platform === 'instagram'"
                          class="fab fa-instagram fa-lg"
                        ></i>
                      </a>
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






<style scoped>
@import "tailwindcss";

.leaf-wrapper {
  perspective: 2000px;
  animation: float 10s ease-in-out infinite alternate;
  animation-delay: var(--delay);
  transition: transform 0.2s cubic-bezier(0, 0, 0.2, 1);
}

.leaf-card {
  @apply relative w-72 h-72 md:w-80 md:h-80 lg:w-[350px] lg:h-[350px] transition-all duration-[1.2s] ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer;
  transform-style: preserve-3d;
}

.leaf-wrapper:hover .leaf-card {
  transform: rotateY(180deg) scale(1.05) translateZ(50px);
}

.leaf-face {
  @apply absolute inset-0 flex flex-col items-center justify-center text-center;
  backface-visibility: hidden;
  border-radius: 80% 0 80% 0;
}

.leaf-back {
  transform: rotateY(180deg);
  border-radius: 0 80% 0 80%;
}

.leaf-green {
  @apply bg-white/90 text-[#2D5A3A] backdrop-blur-xl;
}
.leaf-tan {
  @apply bg-[#FCF3EE]/90 text-[#7A4B3A] backdrop-blur-xl;
}

.blob {
  @apply absolute rounded-full mix-blend-multiply opacity-50 transition-transform duration-100 ease-out;
  filter: blur(80px);
}

.blob-1 {
  @apply w-[800px] h-[800px] bg-[#98D8A0] -top-40 -left-40;
}
.blob-2 {
  @apply w-[900px] h-[900px] bg-[#FCE5D8] bottom-0 -right-40;
}

@keyframes float {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  100% {
    transform: translateY(var(--float-dist)) rotate(4deg);
  }
}

@media (min-width: 1024px) {
  .leaf-wrapper:nth-child(3n-2) {
    @apply mt-24;
  }
  .leaf-wrapper:nth-child(3n-1) {
    @apply mt-0;
  }
  .leaf-wrapper:nth-child(3n) {
    @apply mt-12;
  }
}
</style>