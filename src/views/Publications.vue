<template>
  <div class="publications-page font-sans bg-gray-50 min-h-screen">
    <section class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 md:px-8 pt-12 pb-16">
        <div class="flex flex-col lg:flex-row items-center justify-between">
          <div class="lg:w-1/2 mb-8 lg:mb-0">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              <span class="text-green-700">Resources &</span>
              <br>
              <span>Publications</span>
            </h1>
            <p class="mt-4 text-gray-600 max-w-lg text-lg">
              Access our latest research papers, annual reports, and industry insights. 
              Stay informed with our curated collection of downloadable documents.
            </p>
          </div>
          <div class="lg:w-1/3 hidden lg:block">
             <div class="p-8 bg-green-50 rounded-2xl border-2 border-dashed border-green-200 flex flex-col items-center">
                <svg class="w-20 h-20 text-green-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span class="text-green-800 font-medium">Digital Knowledge Base</span>
             </div>
          </div>
        </div>
      </div>
    </section>

    <section class="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
      <div class="container mx-auto px-4 md:px-8 py-6">
        <div class="flex flex-col md:flex-row gap-4 items-center">
          <div class="relative flex-grow w-full">
            <input 
              type="text" 
              placeholder="Search by title or keyword..." 
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            />
            <svg class="w-5 h-5 absolute left-3 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>

          <div class="flex gap-3 w-full md:w-auto">
            <select class="flex-1 md:w-32 p-3 border border-gray-300 rounded-lg bg-white">
              <option>Year</option>
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
            </select>
            
            <select class="flex-1 md:w-40 p-3 border border-gray-300 rounded-lg bg-white">
              <option>Category</option>
              <option>Annual Report</option>
              <option>Whitepaper</option>
              <option>Policy Brief</option>
            </select>
            
            <button class="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition font-semibold">
              Filter
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 md:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(doc, index) in publications"
          :key="index"
          class="bg-white border border-gray-200 rounded-xl hover:shadow-xl transition-shadow duration-300 flex flex-col"
        >
          <div class="relative h-48 bg-gray-100 rounded-t-xl overflow-hidden group">
            <img
              :src="doc.thumbnail || awards"
              class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-black/5 flex items-center justify-center">
                <span class="bg-white/90 px-4 py-2 rounded-md shadow-sm text-sm font-bold text-gray-700 uppercase">
                    {{ doc.fileType }}
                </span>
            </div>
          </div>

          <div class="p-6 flex-grow">
            <div class="flex justify-between items-start mb-3">
              <span class="text-xs font-bold text-orange-600 uppercase tracking-wide">
                {{ doc.category }}
              </span>
              <span class="text-xs text-gray-500">{{ doc.fileSize }}</span>
            </div>
            
            <h4 class="text-xl font-bold text-gray-900 mb-2 leading-tight">
              {{ doc.title }}
            </h4>
            
            <p class="text-sm text-gray-600 mb-6 line-clamp-2">
              {{ doc.description }}
            </p>

            <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <div class="text-xs text-gray-500 flex flex-col">
                <span class="font-semibold">Published:</span>
                <span>{{ doc.date }}</span>
              </div>
              
              <a 
                :href="doc.downloadUrl" 
                download
                class="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-700 hover:text-white transition-colors duration-200 font-bold text-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Download
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 flex justify-center">
        <nav class="flex gap-2">
            <button class="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100">1</button>
            <button class="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100">2</button>
            <button class="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100">Next</button>
        </nav>
      </div>
    </section>
  </div>
</template>

<script setup>
import latest from "@/assets/latest_news.png";
import awards from "@/assets/awards.png";

const publications = [
  {
    title: "2025 Annual Impact Report",
    category: "Annual Report",
    date: "January 10, 2026",
    fileType: "PDF",
    fileSize: "4.2 MB",
    description: "A comprehensive review of our community projects, financial growth, and strategic milestones achieved over the last fiscal year.",
    downloadUrl: "/files/annual-report-2025.pdf",
    thumbnail: latest
  },
  {
    title: "Digital Transformation Whitepaper",
    category: "Whitepaper",
    date: "November 15, 2025",
    fileType: "PDF",
    fileSize: "1.8 MB",
    description: "Exploring the shift in digital infrastructure across emerging markets and its impact on small businesses.",
    downloadUrl: "/files/digital-transformation.pdf",
    thumbnail: awards
  },
  {
    title: "Youth Empowerment Guidelines",
    category: "Policy Brief",
    date: "October 05, 2025",
    fileType: "DOCX",
    fileSize: "850 KB",
    description: "Step-by-step documentation on the implementation of youth-led innovation hubs in local communities.",
    downloadUrl: "/files/policy-guidelines.docx",
    thumbnail: latest
  },
];
</script>