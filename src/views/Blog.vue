<script setup>
import { ref, computed, onMounted } from "vue";
import newsModule from "@/api/newsModule";
import awards from "@/assets/awards.png";
import hands from "@/assets/hands.png";
import latest from "@/assets/latest_news.png";

const articles = ref([]);
const loading = ref(true);
const error = ref(null);
const currentPageArticles = ref(1);
const perPage = 6;

const hardcodedArticles = [
  {
    title: "Our telemedicine platform now connects patients with certified doctors 24/7.",
    slug: "telemedicine-platform",
    image: awards,
    tag: "Programs & Initiatives",
    date: "October 10, 2025",
    comments: 0,
    description: "Our telemedicine platform now connects patients with certified doctors 24/7. Consultations can be booked online, and prescriptions are delivered directly to your preferred pharmacy for convenience and safety."
  },
  {
    title: "Vaccination outreach program to ensure every child has access to essential immunizations.",
    slug: "vaccination-outreach",
    image: awards,
    tag: "Health Alert",
    date: "October 10, 2025",
    comments: 0,
    description: "In collaboration with local NGOs, we've launched a vaccination outreach program to ensure every child has access to essential immunizations."
  },
  {
    title: "Digital health training program to equip community health workers.",
    slug: "digital-health-training",
    image: awards,
    tag: "Health Alert",
    date: "October 10, 2025",
    comments: 0,
    description: "We're expanding our digital health training program to equip community health workers with tools for real-time patient data tracking and remote diagnostics."
  },
  {
    title: "Study shows physical activity reduces risk of heart disease by 45%.",
    slug: "physical-activity-study",
    image: awards,
    tag: "Health Alert",
    date: "October 10, 2025",
    comments: 0,
    description: "A new study on non-communicable diseases shows that physical activity and proper diet reduce the risk of heart disease by 45%."
  }
];

const displayArticles = computed(() => {
  if (articles.value.length > 0) {
    return articles.value;
  }
  return hardcodedArticles;
});

const paginatedArticles = computed(() => {
  const start = (currentPageArticles.value - 1) * perPage;
  return displayArticles.value.slice(start, start + perPage);
});

const totalArticlePages = computed(() => Math.ceil(displayArticles.value.length / perPage));

const hardcodedEvents = [
  {
    title: "Community Health Awareness Week",
    slug: "community-health-awareness-week",
    image: hands,
    tag: "Programs & Initiatives",
    date: "October 10, 2025",
    time: "10am",
    location: "No 12 Ifeanyi str, Ikeja Lagos",
    description: "Join our Community Health Awareness Week, where medical professionals and volunteers offer free health screenings, wellness talks, and preventive care education."
  },
  {
    title: "Healthy Mothers, Healthy Nation",
    slug: "healthy-mothers-healthy-nation",
    image: hands,
    tag: "Programs & Initiatives",
    date: "October 10, 2025",
    time: "10am",
    location: "No 12 Ifeanyi str, Ikeja Lagos",
    description: "Our Healthy Mothers, Healthy Nation initiative focuses on maternal and child healthcare through accessible antenatal services, nutrition education, and support for safe deliveries."
  },
  {
    title: "Rise in seasonal flu cases - Health Advisory",
    slug: "seasonal-flu-advisory",
    image: hands,
    tag: "Health Alert",
    date: "October 10, 2025",
    views: 20,
    description: "Public health experts have reported a rise in seasonal flu cases. We advise all residents to get vaccinated, maintain proper hygiene, and avoid self-medication."
  }
];

const hardcodedPrograms = [
  {
    title: "Tackling Hypertension: The Silent Killer Among Young Adults",
    slug: "tackling-hypertension",
    image: awards,
    tag: "Annually",
    date: "October 10, 2025",
    time: "10am",
    location: "No 12 Ifeanyi str, Ikeja Lagos",
    description: "Recent studies show a worrying rise in hypertension cases among people aged 25-40, driven by stress, poor diet, and sedentary lifestyles."
  },
  {
    title: "Digital Health Innovations Transforming Patient Care in Nigeria",
    slug: "digital-health-innovations",
    image: awards,
    tag: "Annually",
    date: "October 10, 2025",
    time: "10am",
    location: "No 12 Ifeanyi str, Ikeja Lagos",
    description: "As technology advances, healthcare delivery in Nigeria is experiencing a major shift. From telemedicine and AI-assisted diagnostics to electronic health records."
  }
];

const imageMap = {
  "event.png": "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769715457/16268da44f149e859e5069f5fcdbf9fb_S_j9rsms.jpg",
  "group.png": "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769716176/e21b2626f11dbd7c071c1bdc38aee1f6_L_y1r0t8.jpg",
  "group1.png": "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769716176/f01ce502715837920e87942116372980_M_jb2p23.jpg",
  "wef.jpg": "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769896360/243A8355_r47c3t.jpg",
  "hands.png": "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769715465/1feebd03da9f660dfb6e3f79b696f544_L_rxf7mk.jpg",
  "hands1.png": "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769716174/f5b95525832f3712e665bb57dba370d3_XS_yrppya.jpg",
  "hands2.png": "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769716176/dc2a1ae8ac60464700aa7be25ea2c408_L_dt5us8.jpg"
};

const resolveImage = (item) => {
  if (!item) return awards;
  const img = item.image || item.featured_image || item.thumbnail;
  if (!img) return awards;
  if (typeof img === "string" && (img.startsWith("http") || img.startsWith("data:image"))) return img;
  if (typeof img === "string" && img.includes("/assets/")) return img;
  return imageMap[img] || img || awards;
};

const formatDate = (rawDate) => {
  if (!rawDate) return "October 10, 2025";
  try {
    return new Date(rawDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch { return "October 10, 2025"; }
};

const formatTime = (rawDate) => {
  if (!rawDate) return "10am";
  try {
    return new Date(rawDate).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  } catch { return "10am"; }
};

onMounted(async () => {
  loading.value = true;
  try {
    const res = await newsModule.listArticles();
    const data = res?.results || res || [];
    articles.value = data.map((item) => ({
      title: item.title,
      slug: item.slug,
      image: item.featured_image || item.image,
      tag: item.tag || "News",
      date: formatDate(item.publish_date || item.date),
      comments: item.commentCount || 0,
      description: item.excerpt || item.content || item.description || ""
    }));
  } catch (err) {
    console.error("Failed to load articles:", err);
    error.value = "Could not load articles from server";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <section style="background-color: #e87a1814">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <div class="lg:col-span-6 mb-10 lg:mb-0">
            <h1 class="text-5xl font-extrabold leading-tight">
              <span class="text-orange-600">Stay up-to-date</span>
              <span class="text-green-800 block mt-2">with the latest health updates</span>
            </h1>
            <p class="mt-6 max-w-lg text-lg text-gray-700">
              We strive to enhance healthcare metrics and foster an environment for affordable, high-quality healthcare access for all Nigerians.
            </p>
          </div>
          <div class="lg:col-span-6 flex justify-center lg:justify-end">
            <div class="relative w-full max-w-5xl overflow-hidden rounded-3xl p-3">
              <img :src="latest" alt="HFN conference and networking" class="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-16 sm:py-24">
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-12 lg:gap-6">
          <div class="lg:col-span-8">
            <div class="mb-10">
              <h2 class="text-3xl text-center sm:text-4xl px-4 py-4 font-extrabold text-gray-900 mb-6 rounded-2xl border-2 border-green-50 bg-white shadow-md">
                Upcoming Events
              </h2>
              <select class="p-3 border rounded-xl border-gray-300 text-sm text-gray-700 focus:ring-green-500 focus:border-green-500">
                <option>October 2025</option>
                <option>November 2025</option>
                <option>December 2025</option>
              </select>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div v-for="(evt, i) in hardcodedEvents" :key="i"
                class="relative overflow-hidden shadow-lg pb-4"
                style="border-radius: 2rem; border: 1px solid #e0f2e0; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);"
              >
                <div class="relative aspect-[3/2] bg-gray-50 mb-3">
                  <img :src="evt.image" alt="Event graphic" class="w-full h-full object-cover" />
                  <span class="absolute bottom-[-5px] left-0 bg-green-700 text-white text-xs px-3 py-1 rounded-full">{{ evt.tag }}</span>
                </div>
                <div class="p-5 pt-0">
                  <p class="text-sm text-gray-700 mb-4 leading-relaxed">{{ evt.description }}</p>
                  <div class="space-y-2 mb-6">
                    <p class="text-sm text-gray-700 flex items-center space-x-2">
                      <svg class="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/></svg>
                      <span class="font-semibold text-orange-400">{{ evt.date }}</span>
                    </p>
                    <p class="text-sm text-gray-700 flex items-center space-x-2">
                      <svg class="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z"/></svg>
                      <span class="font-semibold text-orange-400">{{ evt.time }}</span>
                    </p>
                    <p class="text-sm text-gray-700 flex items-center space-x-2">
                      <svg class="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/></svg>
                      <span class="text-orange-400">{{ evt.location }}</span>
                    </p>
                  </div>
                  <a href="#" class="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-700 hover:bg-green-800 transition">
                    Register Now
                    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </a>
                </div>
              </div>
            </div>

            <div v-if="loading" class="flex justify-center items-center py-20">
              <div class="flex flex-col items-center gap-4">
                <div class="w-12 h-12 border-4 border-green-200 border-t-green-700 rounded-full animate-spin"></div>
                <p class="text-gray-500 text-sm font-medium">Loading articles...</p>
              </div>
            </div>

            <div v-else class="mt-16">
              <h2 class="text-3xl sm:text-4xl px-4 py-4 font-extrabold text-gray-900 mb-8 rounded-2xl border-2 border-green-50 bg-white shadow-md text-center">
                Latest Articles
              </h2>

              <div v-if="error" class="text-center py-8 text-gray-500">
                <p>{{ error }}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div v-for="(article, i) in paginatedArticles" :key="i"
                  class="relative overflow-hidden shadow-lg pb-4"
                  style="border-radius: 2rem; border: 1px solid #e0f2e0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);"
                >
                  <div class="relative aspect-[16/9] bg-gray-50 mb-3 overflow-hidden" style="border-top-left-radius: 2rem; border-top-right-radius: 2rem;">
                    <img :src="resolveImage(article)" alt="Article image" class="w-full h-full object-cover" />
                  </div>
                  <div class="p-5 pt-0">
                    <h3 class="text-xl font-bold text-gray-900 mb-3">{{ article.title }}</h3>
                    <p class="text-sm text-gray-700 mb-4 leading-relaxed">{{ article.description?.substring(0, 200) }}{{ article.description?.length > 200 ? '...' : '' }}</p>
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-orange-500 bg-orange-100 px-3 py-1 rounded-full">{{ article.tag || 'News' }}</span>
                      <RouterLink :to="{ name: 'BlogDetails', params: { slug: article.slug } }"
                        class="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-green-700 hover:bg-green-800 transition">
                        Read More ->
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="totalArticlePages > 1" class="flex items-center justify-center mt-12 text-gray-600 text-sm">
                <span class="mr-3">Page {{ currentPageArticles }} of {{ totalArticlePages }}</span>
                <button @click="currentPageArticles > 1 && currentPageArticles--"
                  class="flex items-center space-x-1 hover:text-green-700 transition mr-4"
                  :class="{ 'opacity-50 cursor-not-allowed': currentPageArticles <= 1 }">
                  <span>Previous</span>
                </button>
                <button @click="currentPageArticles < totalArticlePages && currentPageArticles++"
                  class="flex items-center space-x-1 hover:text-green-700 transition"
                  :class="{ 'opacity-50 cursor-not-allowed': currentPageArticles >= totalArticlePages }">
                  <span>Next</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </div>

          <div class="lg:col-span-4 mt-12 lg:mt-0 bg-[#f0fdf499] border-white rounded-2xl p-3">
            <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 pt-5">
              Latest Updates
            </h2>

            <div v-if="loading" class="flex justify-center py-10">
              <div class="w-8 h-8 border-4 border-green-200 border-t-green-700 rounded-full animate-spin"></div>
            </div>

            <div v-else class="space-y-8">
              <div v-for="(article, i) in displayArticles.slice(0, 4)" :key="'update-'+i"
                class="flex space-x-4 bg-white p-2 border-white rounded-xl">
                <div class="w-20 h-20 flex-shrink-0 relative overflow-hidden rounded-xl border border-gray-200" style="background-color: #f0f7f5">
                  <img :src="resolveImage(article)" alt="Update thumbnail" class="w-full h-full object-cover" />
                  <span class="absolute bottom-[-1px] left-1/2 transform -translate-x-1/2 bg-green-700 text-white text-[0.6rem] px-3 py-1 rounded-full whitespace-nowrap font-medium" style="box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                    {{ article.tag || 'News' }}
                  </span>
                </div>
                <div>
                  <p class="text-xs text-gray-500 mb-1 flex items-center space-x-3">
                    <span class="flex items-center space-x-1 text-orange-600 font-semibold">
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/></svg>
                      <span>{{ article.date || 'October 10, 2025' }}</span>
                    </span>
                    <span class="flex items-center space-x-1 text-orange-600">
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.722-1.353l-2.035.795a1 1 0 01-1.222-1.222l.795-2.035A8.841 8.841 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM10 5a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 100-2h-3.586l.293-.293a1 1 0 00-1.414-1.414L9 7.586V6a1 1 0 00-1-1z"/></svg>
                      <span>{{ article.comments || 0 }} Comments</span>
                    </span>
                  </p>
                  <p class="text-sm text-gray-700 mb-1 leading-tight">{{ article.description?.substring(0, 100) }}{{ article.description?.length > 100 ? '...' : '' }}</p>
                  <RouterLink :to="{ name: 'BlogDetails', params: { slug: article.slug } }"
                    class="text-xs text-green-700 font-semibold hover:text-green-600 transition">
                    Read more...
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 sm:mt-24 w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
          <h2 class="text-3xl sm:text-4xl px-4 py-4 font-extrabold text-gray-900 rounded-2xl border-2 border-green-50 bg-white shadow-md">
            Programs and Initiatives
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="(prog, i) in hardcodedPrograms" :key="i"
            class="relative overflow-hidden shadow-lg pb-4"
            style="border-radius: 2rem; border: 1px solid #e0f2e0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div class="relative aspect-[16/9] bg-gray-50 mb-3 overflow-hidden" style="border-top-left-radius: 2rem; border-top-right-radius: 2rem;">
              <img :src="prog.image" alt="Program image" class="w-full h-full object-cover" />
            </div>
            <div class="p-5 pt-0">
              <div class="flex justify-between items-center mb-2">
                <h3 class="text-xl font-bold text-gray-900">{{ prog.title }}</h3>
                <span class="text-sm text-orange-500 bg-orange-100 px-3 py-1 rounded-full">{{ prog.tag }}</span>
              </div>
              <p class="text-sm text-gray-700 mb-4 leading-relaxed">{{ prog.description }}</p>
              <div class="space-y-2 mb-6">
                <p class="text-sm text-gray-700 flex items-center space-x-2">
                  <svg class="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/></svg>
                  <span class="font-semibold text-orange-600">{{ prog.date }}</span>
                </p>
                <p class="text-sm text-gray-700 flex items-center space-x-2">
                  <svg class="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z"/></svg>
                  <span class="font-semibold text-orange-600">{{ prog.time }}</span>
                </p>
                <p class="text-sm text-gray-700 flex items-center space-x-2">
                  <svg class="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/></svg>
                  <span class="text-orange-600">{{ prog.location }}</span>
                </p>
              </div>
              <a href="#" class="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-700 hover:bg-green-800 transition">
                Join Now
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
