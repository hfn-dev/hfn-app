<!-- <template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-gray-900 mb-2">
      {{ gallery.title }}
    </h1>

    <p class="text-gray-500 mb-8">
      {{ gallery.category }} • {{ gallery.date }}
    </p>

    <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      <img
        v-for="(img, index) in gallery.images"
        :key="index"
        :src="img"
        class="w-full rounded-xl shadow hover:scale-[1.02] transition"
      />
    </div>
  </div>
</template> -->

<template>
  <div v-if="gallery" class="container mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-gray-900 mb-2">
      {{ gallery.title }}
    </h1>

    <p class="text-gray-500 mb-8">
      {{ gallery.category }} • {{ gallery.date }}
    </p>

    <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      <img
        v-for="(img, index) in gallery.images"
        :key="index"
        :src="img"
        class="w-full rounded-xl shadow hover:scale-[1.02] transition"
      />
    </div>
  </div>

  <div v-else class="text-center py-20 text-gray-500">
    Gallery not found.
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const event = 'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769739050/850a9bd13a177b57467b2c6d7c3dfec3_L_g8tmki.jpg';
const event1 = 'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769739050/646e54f3224499907f10b9e476e85f82_S_xa0w1q.jpg';
const event2 = 'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769739049/1327d600f17579e414edbf44c080e3b5_L_1_p2vdpq.jpg';
const event3 = 'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769739049/47ed312dbee39b4feb4a261300270374_M_1_jqdrbm.jpg';

const galleries = [
  {
    slug: "digital-skills-bootcamp-2025",
    title: "Digital Skills Bootcamp 2025",
    category: "Workshop",
    date: "November 20, 2025",
    images: [
      "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769739050/850a9bd13a177b57467b2c6d7c3dfec3_L_g8tmki.jpg",
      "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769739049/47ed312dbee39b4feb4a261300270374_M_1_jqdrbm.jpg",
    ],
  },
  {
    slug: "women-in-tech-summit",
    title: "Women in Tech Summit",
    category: "Conference",
    date: "December 5, 2025",
    images: [event, event1, event2, event3],
  },
];

const gallery = computed(() =>
  galleries.find(g => g.slug === route.params.slug)
);
</script>
