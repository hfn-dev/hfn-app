<template>
  <div class="gallery-page font-sans bg-white">
    <section class="bg-[#E87A1814]">
      <div class="container mx-auto px-4 md:px-8 pt-10 pb-16">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div class="lg:w-1/2 mb-8 lg:mb-0">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              <span class="text-green-700">Event Gallery</span>
              <br>
              <span class="text-gray-900">Relive Our Moments</span>
            </h1>
            <p class="mt-4 text-gray-600 max-w-lg">
              Explore the highlights of our past conferences, workshops, and community engagements. 
              Witness the impact and the vibrant energy of our network in action.
            </p>
          </div>
          
          <div class="lg:w-1/2 flex justify-center w-full h-64 sm:h-80 lg:h-96 relative">
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
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 class="text-2xl font-semibold text-gray-800">Filter Memories</h3>
        
        <div class="flex flex-wrap gap-3">
          <select class="p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 bg-white">
            <option>All Years</option>
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
          </select>
          
          <select class="p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 bg-white">
            <option>All Categories</option>
            <option>Conferences</option>
            <option>Workshops</option>
            <option>Community Outreaches</option>
          </select>
        </div>
      </div>
    </section>

    <hr class="border-gray-100">

    <section class="container mx-auto px-4 md:px-8 py-12">
      <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        <div
          v-for="(item, index) in galleryItems"
          :key="index"
          class="break-inside-avoid group relative overflow-hidden rounded-xl bg-gray-100 transition-all duration-300 hover:shadow-2xl"
        >
          <div class="relative overflow-hidden">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span class="text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">{{ item.category }}</span>
              <h4 class="text-white text-xl font-bold">{{ item.title }}</h4>
              <p class="text-gray-200 text-sm mt-2">{{ item.date }}</p>
            </div>
          </div>

          <div class="p-4 bg-white border-x border-b border-gray-100 md:group-hover:hidden">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] font-bold text-orange-600 uppercase">{{ item.category }}</span>
                <h4 class="text-lg font-bold text-green-900">{{ item.title }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <button class="px-8 py-3 bg-green-800 text-white rounded-full font-semibold hover:bg-green-700 transition transform hover:-translate-y-1">
          View More Photos
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import awards from "@/assets/awards.png";
import latest from "@/assets/latest_news.png";

const galleryItems = [
  {
    title: "Digital Skills Bootcamp 2025",
    category: "Workshop",
    date: "November 20, 2025",
    image: awards, 
  },
  {
    title: "Women in Tech Summit",
    category: "Conference",
    date: "December 5, 2025",
    image: latest,
  },
  {
    title: "Community Outreach Lagos",
    category: "Social",
    date: "October 12, 2025",
    image: awards,
  },
  {
    title: "Health & Wellness Webinar",
    category: "Webinar",
    date: "January 12, 2026",
    image: latest,
  },
  {
    title: "Annual Leadership Awards",
    category: "Gala",
    date: "December 20, 2025",
    image: awards,
  },
  {
    title: "Tech Innovation Expo",
    category: "Conference",
    date: "March 15, 2026",
    image: latest,
  },
];
</script>

<style scoped>
.break-inside-avoid {
  break-inside: avoid;
}
</style>