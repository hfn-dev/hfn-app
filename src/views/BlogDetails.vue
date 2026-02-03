<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div class="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <span
          class="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3"
        >
          {{ blog.tag }}
        </span>

        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 leading-snug mb-4">
          {{ blog.title }}
        </h1>

        <div class="flex items-center text-sm text-orange-500 mb-6 space-x-4">
          <span class="flex items-center gap-1">
            <i class="fa-regular fa-calendar text-orange-700"></i>
            Published on {{ blog.date }}
          </span>
          <span class="flex items-center gap-1">
            <i class="fa-regular fa-eye text-orange-700"></i>
            {{ blog.views }} Views
          </span>
        </div>

        <div class="mb-6">
          <img
            :src="blog.image"
            alt="Blog featured"
            class="w-full h-80 object-cover rounded-2xl"
          />
          <p class="text-sm text-gray-400 italic mt-2">
            {{ blog.caption }}
          </p>
        </div>

        <div class="prose max-w-none text-gray-700 leading-relaxed space-y-4">
          <!-- <p>
            At the Healthcare Federation of Nigeria (HFN), we believe that saving lives requires
            more than goodwill — it requires systems, sustainable financing, and collaboration.
          </p> -->
          <p>
            {{ blog.description }}
          </p>
          <!-- <ul class="list-disc pl-6 space-y-1">
            <li>
              Establish and operationalize the Medical Intervention Trust Fund (MITF), which will
              strengthen Nigeria’s emergency healthcare response system through rapid interventions
              and crisis management.
            </li>
            <li>
              Build capacity by training first responders, emergency care professionals, and
              community members in Basic Life Support (BLS), CPR, First Aid, and AED usage.
            </li>
            <li>
              Provide a collaborative platform for prompt patient care in disasters and post-crash
              financial support, especially for indigent patients with non-chronic, treatable
              conditions.
            </li>
          </ul> -->
        </div>

        <div class="flex items-center justify-center space-x-3 mt-8">
          <button
            class="bg-green-700 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-green-800 transition"
          >
            <i class="fa-brands fa-whatsapp-f mr-1"></i> Share
          </button>
          <button
            class="bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            <i class="fa-brands fa-facebook-f mr-1"></i> Share
          </button>
          <button
            class="bg-gray-700 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <i class="fa-brands fa-x-twitter mr-1"></i> Tweet
          </button>
          <button
            class="bg-blue-500 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            <i class="fa-brands fa-linkedin-in mr-1"></i> Post
          </button>
        </div>
      </div>

      <div class="lg:col-span-4 space-y-6">
        <div class="bg-[#f0fdf499] rounded-2xl border border-gray-200 shadow-sm p-5">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Other News</h2>

          <div
            v-for="(item, index) in otherNews"
            :key="index"
            class="flex items-start gap-3 mb-5 border-b border-gray-100 pb-4 last:border-b-0"
          >
            <img
              :src="item.image"
              alt="Other news"
              class="w-20 h-20 object-cover rounded-lg"
            />
            <div class="flex-1">
              <RouterLink
  :to="`/blog/${item.slug}`"
  class="text-sm font-medium text-gray-800 leading-snug hover:text-green-700"
>
  {{ item.title }}
</RouterLink>

              <div class="flex items-center text-xs text-orange-600 mt-2 gap-3">
                <span><i class="fa-regular fa-calendar text-orange-600"></i> {{ item.date }}</span>
                <span><i class="fa-regular fa-comments text-orange-600"></i> {{ item.comments }}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-orange-50 border border-orange-200 rounded-xl h-60 flex items-center justify-center text-orange-600 font-semibold text-lg"
        >
          Place advert here
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { homePageSchema } from '@/schemas/pages/home.schema';
import { computed } from 'vue';
import { useRoute } from "vue-router";
import { newsPageSchema } from '@/schemas/pages/news.schema';

const route = useRoute();
// const blogId = route.params.id;
const slug = route.params.slug;

const allBlogs = [
  ...newsPageSchema.news.latestNewsSection.articles,
  ...newsPageSchema.news.policyAdvocacySection.updates,
];

const blog = computed(() =>
  allBlogs.find(item => item.slug === slug)
);  
// const allBlogs = Object.values(homePageSchema.news.months)
//   .flatMap(month => [month.featured, ...month.newsList]);

// const blog = computed(() =>
//   allBlogs.find(item => item.slug === slug)
// );
// const blog = ref({
//   title: 'Strengthening Emergency Healthcare in Nigeria through Partnership.',
//   tag: 'Progress & Education',
//   date: 'September 25, 2025',
//   views: '349',
//   image: awards,
//   caption: 'Federation Nigeria signs MOU with HEI to strengthen emergency response.',
// })

// const otherNews = ref([
//   {
//     image: awards,
//     title: 'Building stronger emergency care systems across Nigeria',
//     date: 'October 20, 2025',
//     comments: '24 Comments',
//   },
//   {
//     image: awards,
//     title: 'Digital healthcare transformation for rural hospitals',
//     date: 'October 17, 2025',
//     comments: '12 Comments',
//   },
//   {
//     image: awards,
//     title: 'Training first responders to save more lives',
//     date: 'October 11, 2025',
//     comments: '18 Comments',
//   },
// ])

const otherNews = computed(() =>
  allBlogs
    .filter(item => item.slug !== slug)
    .slice(0, 3)
);

</script>

<style scoped>
.prose ul {
  list-style-type: disc;
}
</style>
