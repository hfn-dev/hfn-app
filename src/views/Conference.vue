<script setup>
import { ref } from 'vue';

// Assets (Replace with your actual paths/Cloudinary)
const heroBg = "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770045591/243A7993_wxlzkg.jpg";
const logos = [
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769734457/Society_For_Family_Health_Logo_1_a5qcrp.png",
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769881267/oando_logo.png",
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769881265/emzor.png",
  // Add more logos here
];

const highlights = [
  { title: "500+", desc: "Healthcare Leaders" },
  { title: "20+", desc: "Expert Speakers" },
  { title: "10+", desc: "Policy Panels" },
  { title: "01", desc: "Unified Voice" }
];
</script>

<template>
  <div class="bg-white min-h-screen font-sans">
    <header class="relative h-[85vh] flex items-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img :src="heroBg" class="w-full h-full object-cover scale-105 brightness-[0.3]" />
        <div class="absolute inset-0 bg-gradient-to-r from-green-950/90 to-transparent"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-3xl">
          <div class="inline-block px-4 py-1 rounded-full bg-orange-500 text-white text-xs font-bold uppercase tracking-widest mb-6">
            Annual Conference 2026
          </div>
          <h1 class="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Building a <span class="text-orange-400">Sovereign</span> Health Future
          </h1>
          <p class="text-xl text-gray-200 mb-10 leading-relaxed">
            Join the Healthcare Federation of Nigeria (HFN) for the premier gathering of private sector leaders, 
            policymakers, and innovators as we bridge the gap to Universal Health Coverage.
          </p>
          <div class="flex flex-wrap gap-4">
            <router-link to="/register-events" class="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition shadow-lg">
              Register Now
            </router-link>
            <button class="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-green-900 transition">
              Sponsorship Deck
            </button>
          </div>
        </div>
      </div>
    </header>

    <section class="py-12 bg-gray-50 border-b overflow-hidden">
      <p class="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-8">Supported By Industry Giants</p>
      <div class="flex space-x-12 animate-scroll whitespace-nowrap">
        <div v-for="i in 2" :key="i" class="flex space-x-12 items-center">
          <img v-for="logo in logos" :key="logo" :src="logo" class="h-12 w-auto grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition duration-300" />
        </div>
      </div>
    </section>

    <section class="py-24 container mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 class="text-3xl md:text-4xl font-black text-green-900 mb-6">About the Conference</h2>
          <div class="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              Nigeria’s healthcare landscape is at a critical inflection point. The 2026 HFN Annual Conference serves as the ultimate 
              think-tank for the private sector to align with the national agenda for <strong>Universal Health Coverage (UHC)</strong>.
            </p>
            <p>
              This year’s theme, <span class="text-green-700 font-bold">"Bridging the Gap: Private Sector Solutions for Health Sovereignty,"</span> 
              focuses on local manufacturing, sustainable financing models, and digital transformation. We aren't just discussing problems; 
              we are blueprinting the solutions.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-8 mt-12">
            <div v-for="stat in highlights" :key="stat.title" class="border-l-4 border-orange-400 pl-4">
              <h4 class="text-3xl font-black text-green-900">{{ stat.title }}</h4>
              <p class="text-sm text-gray-500 font-medium">{{ stat.desc }}</p>
            </div>
          </div>
        </div>
        <div class="relative">
          <div class="aspect-square bg-green-100 rounded-[3rem] rotate-3 absolute inset-0"></div>
          <img :src="heroBg" class="relative z-10 aspect-square object-cover rounded-[3rem] shadow-2xl" />
          <div class="absolute -bottom-6 -right-6 z-20 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <p class="text-sm font-bold text-orange-600 uppercase">Venue</p>
            <p class="text-xl font-black text-green-900">Lagos Oriental Hotel</p>
            <p class="text-gray-500">Victoria Island, Lagos</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-green-900 rounded-[4rem] mx-6 mb-20 text-center text-white relative overflow-hidden">
        <div class="relative z-10 max-w-2xl mx-auto px-6">
            <h2 class="text-4xl font-black mb-6">Will you be in the room?</h2>
            <p class="text-green-100 mb-10 text-lg">Secure your seat today and join the conversation that will define the next decade of Nigerian healthcare.</p>
            <div class="flex justify-center gap-4">
                <button class="bg-white text-green-900 px-10 py-4 rounded-full font-bold shadow-lg hover:bg-orange-500 hover:text-white transition">Get Tickets</button>
            </div>
        </div>
        <div class="absolute top-0 left-0 w-64 h-64 bg-green-800 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-orange-600 rounded-full translate-x-1/3 translate-y-1/3 opacity-20"></div>
    </section>
  </div>
</template>

<style scoped>
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-scroll {
  display: flex;
  width: max-content;
  animation: scroll 30s linear infinite;
}

.animate-scroll:hover {
  animation-play-state: paused;
}
</style>
