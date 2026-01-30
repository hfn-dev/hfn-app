<script setup>
import api from "@/api/axios";
// import group from "@/assets/group.png";
// import group1 from "@/assets/hfn-news.PNG";
import Image from "@/assets/image.jpg";
import HfnCalender from "@/components/layout/HfnCalender.vue";
import { homePageSchema } from "@/schemas/pages/home.schema";
import { resolveAsset } from "@/utils/assetMap";
import { computed, onMounted, ref, onUnmounted } from "vue";

const heroSlides = [
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769773405/1_1_uebqmc.jpg",
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769773394/2_dyphjj.png",
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769773393/3_nvepaa.jpg",
];

const activeSlide = ref(0);
let interval = null;

onUnmounted(() => {
  clearInterval(interval);
});

const faqs = computed(() => pageContent.value.faqs);
const group =
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769715465/1feebd03da9f660dfb6e3f79b696f544_L_rxf7mk.jpg";
const group1 =
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769716176/f01ce502715837920e87942116372980_M_jb2p23.jpg";
const activeFaq = ref(null);

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};

const months = computed(() => Object.keys(pageContent.value.news.months));

const featured = computed(
  () => pageContent.value.news.months[selectedMonth.value]?.featured
);

const newsList = computed(
  () => pageContent.value.news.months[selectedMonth.value]?.newsList || []
);

const executives = computed(() => pageContent.value.executives);

const pageContent = ref(structuredClone(homePageSchema));
const pageId = 1;
const selectedMonth = ref(Object.keys(homePageSchema.news.months)[0]);

onMounted(async () => {
  interval = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % heroSlides.length;
  }, 5000);
  const { data } = await api.get(`/api/pages/${pageId}/`);
  pageContent.value = data.content || structuredClone(homePageSchema);

  const toggles = document.querySelectorAll(".faq-toggle");
  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const targetId = toggle.getAttribute("data-target");
      const content = document.getElementById(targetId);
      const icon = toggle.querySelector(".faq-icon");
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";

      toggles.forEach((t) => {
        if (t !== toggle) {
          t.setAttribute("aria-expanded", "false");
          document.getElementById(
            t.getAttribute("data-target")
          ).style.maxHeight = "0";
          t.querySelector(".faq-icon").classList.remove("rotate-45");
        }
      });

      if (isExpanded) {
        toggle.setAttribute("aria-expanded", "false");
        content.style.maxHeight = "0";
        icon.classList.remove("rotate-45");
      } else {
        toggle.setAttribute("aria-expanded", "true");
        content.style.maxHeight = content.scrollHeight + "px";
        icon.classList.add("rotate-45");
      }
    });
  });
});
</script>

<template>
  <section class="relative h-[90vh] min-h-[650px] overflow-hidden">
    <div class="absolute inset-0">
      <transition-group name="fade">
        <img
          v-for="(slide, index) in heroSlides"
          v-show="index === activeSlide"
          :key="slide"
          :src="slide"
          class="absolute inset-0 w-full h-full object-cover"
        />
      </transition-group>

      <div class="absolute inset-0 bg-black/50"></div>
    </div>

    <div class="relative z-10 h-full flex items-center">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div class="lg:w-1/2 text-white">
          <h1
            class="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
          >
            <span class="text-orange-400">
              {{ pageContent.hero.titleHighlight }}
            </span>
            <br />
            <span class="text-white">
              {{ pageContent.hero.titleMain }}
            </span>
          </h1>

          <p class="text-lg mb-6 max-w-xl">
            <span class="text-green-300 font-semibold">
              {{ pageContent.hero.introLine }}
            </span>
            {{ pageContent.hero.introText }}
          </p>

          <p class="text-lg mb-10 max-w-xl">
            {{ pageContent.hero.subText }}
          </p>

          <RouterLink
            :to="pageContent.hero.ctaLink"
            class="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-semibold shadow-xl transition"
          >
            {{ pageContent.hero.ctaText }}
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
      <button
        v-for="(_, index) in heroSlides"
        :key="index"
        class="w-3 h-3 rounded-full transition"
        :class="activeSlide === index ? 'bg-white' : 'bg-white/40'"
        @click="activeSlide = index"
      />
    </div>
  </section>

  <div class="py-6 border-b border-gray-200 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-6">
        <span
          class="text-lg font-semibold text-gray-500 uppercase tracking-wider"
        >
          {{ pageContent.partners.title }}
        </span>
      </div>

      <div
        class="flex flex-wrap justify-center items-center gap-8 md:gap-16"
      >
        <div
          v-for="(logoKey, index) in pageContent.partners.logos"
          :key="index"
          class="flex items-center justify-center h-48 w-59"
        >
          <img
            :src="resolveAsset(logoKey)"
            :alt="logoKey + ' Logo'"
            class="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
    </div>
  </div>

  <section class="bg-white py-16 px-6 md:px-12 lg:px-24">
    <div class="text-center mb-10">
      <h2
        class="text-3xl md:text-4xl font-bold text-gray-900 rounded-2xl border-2 border-green-50 bg-white shadow-md px-4 py-4"
      >
        {{ pageContent.story.title }}
      </h2>
    </div>

    <div class="grid md:grid-cols-2 gap-10 items-center">
      <div class="relative w-full max-w-2xl mx-auto h-[400px] sm:h-[450px]">
        <div
          class="absolute inset-x-0 bottom-0 w-[100%] sm:w-[80%] h-[350px] sm:h-[350px] rounded-[30px] overflow-hidden shadow-2xl border-4 border-green-500/50"
        >
          <img
            :src="group1"
            alt="HFN team"
            loading="lazy"
            class="object-cover w-full h-full"
          />
        </div>

        <div
          class="absolute top-0 right-0 w-[30%] sm:w-[40%] h-[140px] sm:h-[180px] rounded-xl overflow-hidden shadow-2xl border-4 border-green-500"
        >
          <img
            :src="group"
            loading="lazy"
            alt="HFN team"
            class="object-cover w-full h-full"
          />
        </div>
      </div>

      <div class="text-gray-700 leading-relaxed">
        <p class="mb-8">
          {{ pageContent.story.body }}
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center mt-10">
          <div v-for="(stat, index) in pageContent.story.stats" :key="index">
            <h3
              class="text-3xl font-bold"
              :class="index % 2 === 0 ? 'text-green-900' : 'text-red-600'"
            >
              {{ stat.value }}
            </h3>

            <p class="text-green-800 font-semibold">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div
        class="flex flex-col sm:flex-row justify-center items-center h-auto sm:h-20 relative rounded-2xl border-2 border-green-50 bg-white shadow-sm px-4 py-3"
      >
        <select
          v-model="selectedMonth"
          class="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700 appearance-none bg-white pr-8 w-full sm:w-auto sm:absolute sm:left-6"
        >
          <option v-for="month in months" :key="month" :value="month">
            {{ month }}
          </option>
        </select>

        <h2
          class="text-2xl sm:text-3xl md:text-4xl font-serif font-extrabold text-gray-900 tracking-tight text-center sm:text-left mt-3 sm:mt-0"
        >
          Our Latest Update
        </h2>
      </div>
    </div>
  </section>

  <section class="bg-[#f6faf8] py-16 px-6 md:px-12 lg:px-24">
    <div class="grid lg:grid-cols-3 gap-8">
      <div
        class="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
      >
        <div class="relative">
          <img
            :src="featured.image"
            alt="Featured news"
            class="w-full h-72 object-cover"
          />
          <span
            class="absolute bottom-4 left-4 bg-green-700 text-white text-xs font-semibold px-3 py-1 rounded-full"
          >
            {{ featured.tag }}
          </span>
        </div>

        <div class="p-6">
          <div class="flex items-center text-sm text-orange-600 mb-3 space-x-4">
            <span class="flex items-center gap-1">
              <i class="fa-regular fa-calendar"></i> {{ featured.date }}
            </span>
            <span class="flex items-center gap-1">
              <i class="fa-regular fa-comments"></i>
              {{ featured.comments }} Comments
            </span>
          </div>

          <p class="text-gray-700 mb-6">
            {{ featured.description }}
          </p>

          <RouterLink
            :to="`/blog/${featured.slug}`"
            class="inline-flex items-center gap-2 bg-green-700 text-white px-5 py-2 rounded-full font-medium hover:bg-green-800 transition"
          >
            Read More <i class="fa-solid fa-arrow-right"></i>
          </RouterLink>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <div
          v-for="(news, index) in newsList"
          :key="index"
          class="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 flex flex-col sm:flex-row transition hover:shadow-md"
        >
          <div class="relative w-full sm:w-48">
            <img
              :src="news.image"
              alt="News image"
              class="w-full h-40 sm:h-full object-cover"
            />

            <span
              class="absolute bottom-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full"
              :class="{
                'bg-red-700 text-white': news.tag === 'Health Alert',
                'bg-orange-600 text-white':
                  news.tag === 'Public Health Stories',
              }"
            >
              {{ news.tag }}
            </span>
          </div>

          <div class="flex flex-col justify-between p-4 flex-1">
            <div>
              <div
                class="flex items-center text-xs text-orange-600 mb-2 space-x-6"
              >
                <span class="flex items-center gap-1">
                  <i class="fa-regular fa-calendar text-orange-600"></i>
                  {{ news.date }}
                </span>
                <span class="flex items-center gap-1">
                  <i class="fa-regular fa-comments text-orange-600"></i>
                  {{ news.comments }} Comments
                </span>
              </div>

              <p class="text-gray-700 text-sm leading-relaxed line-clamp-3">
                {{ news.description }}
              </p>
            </div>

            <div class="mt-3">
              <span
                class="inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full"
                :class="{
                  'bg-red-700 text-white': news.tag === 'Health Alert',
                  'bg-orange-600 text-white':
                    news.tag === 'Public Health Stories',
                }"
              >
                {{ news.tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <HfnCalender id="calendar" />

  <section class="py-16 bg-white">
    <div class="container mx-auto px-6 text-center">
      <h2
        class="text-3xl md:text-4xl font-serif mb-10 font-extrabold text-gray-900 rounded-2xl border-2 border-green-50 bg-white shadow-md px-4 py-4"
      >
        Our Executives
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div
          v-for="(exec, index) in executives"
          :key="index"
          class="flex justify-center"
        >
          <div
            class="relative w-full max-w-xs aspect-[4/5] rounded-t-[2.5rem] rounded-b-xl overflow-hidden shadow-2xl"
            style="background-color: #f0f7f5"
          >
            <img
              :src="exec.image"
              :alt="exec.name"
              class="w-full h-full object-cover object-top"
            />

            <div
              class="absolute mb-5 bottom-0 left-1/2 transform -translate-x-1/2 w-[85%] px-4 py-3 rounded-xl border border-green-300 bg-white shadow-xl text-center"
            >
              <h3 class="text-lg font-bold text-green-700">
                {{ exec.name }}
              </h3>
              <p class="text-sm text-gray-700">
                {{ exec.position }}
              </p>
              <p class="text-sm text-gray-700">
                {{ exec.role }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- <section class="py-20 lg:py-28 bg-white" id="faq">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        class="text-3xl text-center md:text-4xl font-serif mb-10 font-extrabold text-gray-900 rounded-2xl border-2 border-green-50 bg-white shadow-md px-4 py-4"
      >
        Frequently Asked Questions (F.A.Q)
      </h2>

      <div id="faq-accordion" class="space-y-4">
        <div
        v-for="(faq, index) in faqs"
        :key="faq.question"
        class="rounded-xl shadow-lg bg-[#F2F9F3] overflow-hidden"
      >
        <button
          class="w-full flex justify-between items-center p-6 text-lg font-semibold hover:bg-[#F2F9F3] transition duration-150"
          :aria-expanded="activeFaq === index"
          @click="toggleFaq(index)"
        >
          <span class="text-green-800">
            {{ faq.question }}
          </span>

          <span
            class="text-primary transform transition-transform duration-300"
            :class="activeFaq === index ? 'rotate-45' : ''"
          >
            +
          </span>
        </button>

        <div
          class="overflow-hidden transition-all duration-300 ease-in-out"
          :style="{
            maxHeight: activeFaq === index ? '500px' : '0px'
          }"
        >
          <p class="px-6 pb-6 pt-0 text-gray-600">
            {{ faq.answer }}
          </p>
        </div>
      </div>
      </div>
    </div>
  </section> -->
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.container {
  max-width: 1100px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
