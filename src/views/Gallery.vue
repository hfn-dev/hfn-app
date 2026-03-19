<template>
  <div class="gallery-page font-sans bg-white">
    <section class="bg-[#E87A1814]">
      <div class="container mx-auto px-4 md:px-8 pt-10 pb-16">
        <div
          class="flex flex-col lg:flex-row items-start lg:items-center justify-between"
        >
          <div class="lg:w-1/2 mb-8 lg:mb-0">
            <h1
              class="text-4xl md:text-5xl font-bold text-gray-800 leading-tight"
            >
              <span class="text-green-700">Relive Our Moments</span>
              <br />
              <span class="text-gray-900"></span>
            </h1>
            <p class="mt-4 text-gray-600 max-w-lg">
              Explore the highlights of our past conferences, workshops, and
              community engagements. Witness the impact and the vibrant energy
              of our network in action.
            </p>
          </div>

          <div
            class="lg:w-1/2 flex justify-center w-full h-64 sm:h-80 lg:h-96 relative"
          >
            <img
              :src="latest"
              alt="Gallery highlight"
              class="object-cover w-full h-full rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 md:px-8 py-8">
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <h3 class="text-2xl font-semibold text-gray-800">Filter Memories</h3>

        <div class="flex flex-wrap gap-3">
          <select
            class="p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 bg-white"
          >
            <option>All Years</option>
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
          </select>

          <select
            class="p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 bg-white"
          >
            <option>All Categories</option>
            <option>Conferences</option>
            <option>Workshops</option>
            <option>Community Outreaches</option>
          </select>
        </div>
      </div>
    </section>

    <hr class="border-gray-100" />

    <section class="container mx-auto px-4 md:px-8 py-12">
      <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        <router-link
          v-for="item in galleryItems"
          :key="item.slug"
          :to="`/gallery/${item.slug}`"
          class="block break-inside-avoid group relative overflow-hidden rounded-xl bg-gray-100 transition-all duration-300 hover:shadow-2xl"
        >
          <div class="relative overflow-hidden">
            <img
              :src="item.cover"
              :alt="item.title"
              class="w-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
            >
              <span
                class="text-orange-400 text-xs font-bold uppercase tracking-wider mb-2"
                >{{ item.category }}</span
              >
              <h4 class="text-white text-xl font-bold">{{ item.title }}</h4>
              <p class="text-gray-200 text-sm mt-2">{{ item.date }}</p>
            </div>
          </div>

          <div
            class="p-4 bg-white border-x border-b border-gray-100 md:group-hover:hidden"
          >
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] font-bold text-orange-600 uppercase">{{
                  item.category
                }}</span>
                <h4 class="text-lg font-bold text-green-900">
                  {{ item.title }}
                </h4>
              </div>
            </div>
          </div>
        </router-link>
      </div>

      <div class="mt-16 text-center">
        <button
          class="px-8 py-3 bg-green-800 text-white rounded-full font-semibold hover:bg-green-700 transition transform hover:-translate-y-1"
        >
          View More Photos
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import awards from "@/assets/awards.png";
// import latest from "@/assets/latest_news.png";
import { ref, onMounted, computed } from "vue";
import gallery from "@/api/contentUploadsApi";

const galleryItems = ref([...dummyGalleryItems]);
const loading = ref(false);
const error = ref(null);
const event =
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769739050/850a9bd13a177b57467b2c6d7c3dfec3_L_g8tmki.jpg";
const event1 =
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769739050/646e54f3224499907f10b9e476e85f82_S_xa0w1q.jpg";
const event2 =
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769739049/1327d600f17579e414edbf44c080e3b5_L_1_p2vdpq.jpg";
const event3 =
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769739049/47ed312dbee39b4feb4a261300270374_M_1_jqdrbm.jpg";
const event4 =
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769739049/176305b02b8b14f75f2e6c696c06f6d6_M_fyowa4.jpg";
const latest =
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769738844/675362aef61a36df3271398e6ff1e414_S_c6duhw.jpg";

const dummyGalleryItems = [
  {
    slug: "digital-skills-bootcamp-2025",
    title: "Digital Skills Bootcamp 2025",
    category: "Workshop",
    date: "November 20, 2025",
    cover: awards,
    images: [event, event1, event2, event3],
  },
  {
    slug: "women-in-tech-summit",
    title: "Women in Tech Summit",
    category: "Conference",
    date: "December 5, 2025",
    cover: latest,
    images: [event, event1, event2, event3],
  },
  {
    slug: "community-outreach-lagos",
    title: "Community Outreach Lagos",
    category: "Social",
    date: "October 12, 2025",
    cover: event1,
    images: [event, event1, event2, event3],
  },
  {
    slug: "health-wellness-webinar",
    title: "Health & Wellness Webinar",
    category: "Webinar",
    date: "January 12, 2026",
    cover: event2,
    images: [event, event1, event2, event3],
  },
  {
    slug: "annual-leadership-awards",
    title: "Annual Leadership Awards",
    category: "Gala",
    date: "December 20, 2025",
    cover: event3,
    images: [event, event1, event2, event3],
  },
  {
    slug: "tech-innovation-expo",
    title: "Tech Innovation Expo",
    category: "Conference",
    date: "March 15, 2026",
    cover: event,
    images: [event, event1, event2, event3],
  },
];


const fetchGalleryFromApi = async () => {
  loading.value = true;
  error.value = null;

  try {
    const [allRes, nonMembersRes] = await Promise.all([
      gallery.list({ audience: "all" }),
      gallery.list({ audience: "non-members" }),
    ]);

    const apiData = [
      ...(allRes.results || allRes),
      ...(nonMembersRes.results || nonMembersRes),
    ];

    const mappedApiItems = apiData.map((item) => ({
      slug: item.slug,
      title: item.title,
      category: item.category || "General",
      date: formatDate(item.date),
      cover: resolveImage(item),
      images: item.images || [],
    }));

    galleryItems.value = [...dummyGalleryItems, ...mappedApiItems];
  } catch (err) {
    console.error("Failed to load gallery", err);
    error.value = "Failed to load gallery items";
  } finally {
    loading.value = false;
  }
};
  
onMounted(() => {
  fetchGalleryFromApi();
});  
</script>

<style scoped>
.break-inside-avoid {
  break-inside: avoid;
}
</style>
