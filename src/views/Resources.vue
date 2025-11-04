<template>
  <div class="min-h-screen bg-white">

    <section class="max-w-6xl mx-auto pt-10 pb-16 px-6 sm:px-10 flex flex-col md:flex-row gap-8 bg-hero-orange">
      
      <div class="md:w-1/2">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-green-700 mb-2 leading-none">Lorem Ipsum</h1>
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 leading-none">Lorem Ipsum, ipsum</h2>
        <p class="text-gray-600 max-w-lg">Euismod magna id purus eget nunc ligula suspendisse dul netus. Condimentum blandit rutrum at mauris enim pulvinar duis etiam donec. Euismod magna id purus eget nunc.</p>
      </div>

      <div class="md:w-1/2 relative h-64 sm:h-80">
        <div class="absolute right-0 top-1/4 w-40 h-56 bg-white border border-gray-300 shadow-xl p-2 transform rotate-3">
            <p class="text-[8px] font-bold text-center text-red-500">LOREM NEWSLETTER</p>
            <div class="h-full bg-gray-50 flex items-center justify-center text-[10px] text-gray-400">Card 1</div>
        </div>

        <div class="absolute right-10 top-0 w-48 h-32 bg-white border border-gray-300 shadow-lg p-2 transform -rotate-6">
            <div class="h-full bg-gray-50 flex items-center justify-center text-[10px] text-gray-400">Card 2</div>
        </div>
        
        <div class="absolute left-0 bottom-0 w-3/4 h-40 bg-gray-200 shadow-md flex items-end justify-end p-2 text-sm text-gray-500">
            
        </div>
      </div>
    </section>

    <h2 class="text-3xl font-bold text-gray-800 pt-8 pb-4 mb-8 max-w-6xl mx-auto px-6 sm:px-10">Resources</h2>

    <section class="max-w-6xl mx-auto mb-16 px-6 sm:px-10">
      <h3 class="text-2xl font-semibold text-gray-700 mb-6">Newsletters</h3>
      
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <NewsletterCard 
          v-for="item in pagedNewsletters" 
          :key="item.id" 
          :item="item" 
        />
      </div>
      
      <PaginationControls
        :current-page="currentNewsletterPage"
        :total-pages="totalNewsletterPages"
        @page-change="(newPage) => changePage('newsletters', newPage)"
      />
    </section>

    <section class="max-w-6xl mx-auto mb-16 px-6 sm:px-10">
      <h3 class="text-2xl font-semibold text-gray-700 mb-6">Publications</h3>
      
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PublicationCard 
          v-for="item in pagedPublications" 
          :key="item.id" 
          :item="item" 
        />
      </div>
      
      <PaginationControls
        :current-page="currentPublicationPage"
        :total-pages="totalPublicationPages"
        @page-change="(newPage) => changePage('publications', newPage)"
      />
    </section>

    <teleport to="body">
      
      <template id="newsletter-card-template">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300 flex flex-col">
          <div class="h-48 bg-gray-100 flex items-end justify-center pt-8 px-4">
            <span class="text-xs font-bold text-center text-orange-500 bg-white/70 p-1">QUARTERLY NEWSLETTER</span>
          </div>
          <div class="p-4 flex flex-col flex-grow text-center">
            <h4 class="text-base font-semibold text-gray-800 mb-1">HFCN Quarterly Newsletter - {{ item.quarter }}</h4>
            <p class="text-xs text-gray-500 mb-2">{{ item.date }}</p>
            <p class="text-sm text-gray-600 mb-4 flex-grow">{{ item.description }}</p>
            <a :href="item.downloadLink" target="_blank" class="mt-auto block w-full text-center py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition duration-150">
              Download
            </a>
          </div>
        </div>
      </template>

      <template id="publication-card-template">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300 flex flex-col">
          <div class="h-64 bg-white relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-white to-green-50/50"></div>
            <div class="absolute top-0 right-0 w-1/4 h-full bg-green-50 opacity-50 transform skew-x-12 -translate-x-1/2"></div>
            <div class="absolute p-6 bottom-0 left-0 text-left">
              <p class="text-xs text-gray-500">Healthcare Federation of Nigeria (HFN)</p>
              <h3 class="text-xl font-bold text-gray-900 leading-tight">{{ item.reportType.toUpperCase() }}</h3>
            </div>
          </div>
          <div class="p-4 flex flex-col flex-grow">
            <h4 class="text-sm font-medium text-gray-700 mb-1">Healthcare Federation of Nigeria (HFN)</h4>
            <h3 class="text-lg font-bold text-gray-900 mb-2">{{ item.title }}</h3>
            <p class="text-sm text-gray-600 mb-4 flex-grow">{{ item.description }}</p>
            <a :href="item.downloadLink" target="_blank" class="mt-auto block w-full text-center py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition duration-150">
              Download
            </a>
          </div>
        </div>
      </template>

      <template id="pagination-controls-template">
        <div class="flex justify-center items-center mt-8 space-x-4">
          <button 
            :disabled="currentPage === 1" 
            @click="$emit('page-change', currentPage - 1)"
            class="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Page {{ currentPage > 1 ? currentPage - 1 : '1' }} &larr;
          </button>
          <span class="text-sm font-medium text-gray-600">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button 
            :disabled="currentPage === totalPages" 
            @click="$emit('page-change', currentPage + 1)"
            class="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            &rarr; Next
          </button>
        </div>
      </template>
    </teleport>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// --- Local Component Definitions (Composition API) ---

const NewsletterCard = {
  props: ['item'],
  template: '#newsletter-card-template' 
};

const PublicationCard = {
  props: ['item'],
  template: '#publication-card-template'
};

const PaginationControls = {
  props: ['currentPage', 'totalPages'],
  emits: ['page-change'],
  template: '#pagination-controls-template'
};

// --- Mock Data --- 
const newslettersData = ref([
  { id: 1, quarter: 'Q4 2024', date: 'October 30, 2024', description: 'We’re thrilled to present to you once again the HFN Quarterly Newsletter...', downloadLink: '#' },
  { id: 2, quarter: 'Q3 2024', date: 'July 30, 2024', description: 'Exploring the federation\'s activities during the third quarter.', downloadLink: '#' },
  { id: 3, quarter: 'Q2 2024', date: 'April 30, 2024', description: 'It has indeed been an eventful year already!', downloadLink: '#' },
  { id: 4, quarter: 'Q1 2024', date: 'January 30, 2024', description: 'The first quarterly report for the year, detailing key events.', downloadLink: '#' },
  { id: 5, quarter: 'Q4 2023', date: 'October 30, 2023', description: 'Archived newsletter for the previous year.', downloadLink: '#' },
  { id: 6, quarter: 'Q3 2023', date: 'July 30, 2023', description: 'Archived newsletter for the previous year.', downloadLink: '#' },
]);

const publicationsData = ref([
  { id: 101, reportType: 'Impact Report', title: 'Impact Evaluation Report: Delta State Access to Finance Scheme', description: 'We’re thrilled to present to you once again the HFN Quarterly Newsletter...', downloadLink: '#' },
  { id: 102, reportType: 'Policy Brochure', title: 'Healthcare Policy Dialogue Brochure', description: 'We’re thrilled to present to you once again the HFN Quarterly Newsletter...', downloadLink: '#' },
  { id: 103, reportType: 'Impact Report', title: 'Impact Evaluation Report: Delta State Access to Finance Scheme', description: 'We’re thrilled to present to you once again the HFN Quarterly Newsletter...', downloadLink: '#' },
  { id: 104, reportType: 'Annual Report', title: 'The HFN Annual Activities Report for 2023', description: 'A comprehensive review of the federation\'s activities and financial standing.', downloadLink: '#' },
  { id: 105, reportType: 'White Paper', title: 'Future of Healthcare Investment', description: 'A detailed white paper on strategic healthcare investment.', downloadLink: '#' },
]);

// --- Pagination State and Logic ---
const currentNewsletterPage = ref(1);
const newsletterItemsPerPage = 4;
const currentPublicationPage = ref(1);
const publicationItemsPerPage = 3;

const totalNewsletterPages = computed(() => Math.ceil(newslettersData.value.length / newsletterItemsPerPage));
const pagedNewsletters = computed(() => {
  const start = (currentNewsletterPage.value - 1) * newsletterItemsPerPage;
  const end = start + newsletterItemsPerPage;
  return newslettersData.value.slice(start, end);
});

const totalPublicationPages = computed(() => Math.ceil(publicationsData.value.length / publicationItemsPerPage));
const pagedPublications = computed(() => {
  const start = (currentPublicationPage.value - 1) * publicationItemsPerPage;
  const end = start + publicationItemsPerPage;
  return publicationsData.value.slice(start, end);
});

const changePage = (type, newPage) => {
  if (type === 'newsletters') {
    currentNewsletterPage.value = newPage;
  } else if (type === 'publications') {
    currentPublicationPage.value = newPage;
  }
};
</script>

<style scoped>

.bg-hero-orange {
  background-color: rgba(232, 122, 24, 0.08); 
}
</style>
