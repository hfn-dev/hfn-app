<template>
  <div class="min-h-screen bg-white">
    <section class="max-w-6xl mx-auto pt-10 pb-16 px-6 sm:px-10 flex flex-col md:flex-row gap-8 bg-hero-orange">
      
      <div class="md:w-1/2">
        <h1 class="text-4xl font-extrabold text-green-700 mb-2 leading-tight">Lorem Ipsum</h1>
        <h2 class="text-4xl font-bold text-gray-800 mb-4 leading-tight">Lorem Ipsum, ipsum</h2>
        <p class="text-gray-600 max-w-lg">Euismod magna id purus eget nunc ligula suspendisse dul netus. Condimentum blandit rutrum at mauris enim pulvinar duis etiam donec. Euismod magna id purus eget nunc.</p>
      </div>

      <div class="md:w-1/2 relative h-72 sm:h-80 lg:h-96">
        <div class="absolute inset-0 bg-gray-200 rounded-lg shadow-xl overflow-hidden transform rotate-1">
             <img :src="latest" alt="Healthcare professionals in a meeting" class="w-full h-full object-cover opacity-80" />
        </div>
        
        <div class="absolute w-5/6 h-2/3 top-8 left-10 bg-white rounded-lg shadow-2xl p-4 transform -rotate-3 border border-gray-100">
             <img :src="latest" alt="Digital document preview" class="w-full h-full object-contain" />
        </div>

        <div class="absolute bottom-0 right-0 w-48 h-64 bg-white rounded-lg shadow-2xl overflow-hidden p-2 transform rotate-6 border border-gray-100">
            <img :src="latest" alt="Newsletter cover preview" class="w-full h-full object-cover" />
        </div>
      </div>
    </section>

    <div class="py-12 px-6 sm:px-10 text-center">
      <h2 class="inline-block text-3xl font-bold text-gray-800 border-b-2 border-green-700 pb-1 px-4">Resources</h2>
    </div>

    <section class="max-w-6xl mx-auto mb-16 px-6 sm:px-10">
      <h3 class="text-2xl font-semibold text-gray-700 mb-6">Newsletters</h3>
      
      <div v-if="pagedNewsletters && pagedNewsletters.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <NewsletterCard 
          v-for="item in pagedNewsletters" 
          :key="item.id" 
          :item="item" 
        />
      </div>
      <div v-else class="text-center py-10 text-gray-500">
        No newsletters found.
      </div>
      
      <PaginationControls
        v-if="totalNewsletterPages > 0"
        :current-page="currentNewsletterPage"
        :total-pages="totalNewsletterPages"
        @page-change="(newPage) => changePage('newsletters', newPage)"
      />
    </section>

    <section class="max-w-6xl mx-auto mb-16 px-6 sm:px-10">
      <h3 class="text-2xl font-semibold text-gray-700 mb-6">Publications</h3>
      
      <div v-if="pagedPublications && pagedPublications.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PublicationCard 
          v-for="item in pagedPublications" 
          :key="item.id" 
          :item="item" 
        />
      </div>
      <div v-else class="text-center py-10 text-gray-500">
        No publications found.
      </div>
      
      <PaginationControls
        v-if="totalPublicationPages > 0"
        :current-page="currentPublicationPage"
        :total-pages="totalPublicationPages"
        @page-change="(newPage) => changePage('publications', newPage)"
      />
    </section>

    
    <teleport to="body">
      
      <template id="newsletter-card-template">
        <div v-if="item" class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col">
          <div class="relative h-48 bg-gray-100/50 flex flex-col">
              <img 
                :src="latest" 
                :alt="'HFCN Quarterly Newsletter Cover ' + item?.quarter" 
                class="w-full h-full object-cover" 
              />
              <div class="absolute top-4 left-1/2 transform -translate-x-1/2 w-4/5 text-center bg-orange-500 text-white text-xs font-bold py-1 px-2 rounded-sm shadow-md">
                QUARTERLY NEWSLETTER
              </div>
          </div>
          
          <div class="p-4 flex flex-col flex-grow text-left">
            <h4 class="text-sm font-medium text-gray-700 mb-1">HFN Quarterly Newsletter - {{ item?.quarter }}</h4>
            <p class="text-xs text-gray-500 mb-2">{{ item.date }} | <span class="text-green-600">2 Downloads</span></p>
            <p class="text-sm text-gray-600 mb-4 flex-grow">{{ item.description }}</p>
            <a :href="item.downloadLink" target="_blank" class="mt-auto block w-full text-center py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition duration-150">
              Download
            </a>
          </div>
        </div>
      </template>

      <template id="publication-card-template">
        <div v-if="item" class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col">
          <div class="h-64 bg-white relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-tr from-white to-green-50"></div>
            <div class="absolute top-0 right-0 w-full h-full bg-green-500/5 opacity-50 transform -skew-y-6 translate-y-1/4 translate-x-1/2"></div>
            
            <img 
              :src="latest" 
              :alt="item.title + ' Cover'" 
              class="absolute w-full h-full object-contain p-4" 
            />
            
            <div class="absolute p-4 bottom-0 left-0 text-left w-full z-10 bg-white/50 backdrop-blur-sm">
              <p class="text-xs text-gray-500 mb-1">Healthcare Federation of Nigeria (HFN)</p>
              <p class="text-lg text-gray-800 font-medium">{{ item.reportType.toUpperCase() }}</p>
              <h3 class="text-xl font-bold text-gray-900 leading-tight">{{ item.title }}</h3>
            </div>
          </div>
          
          <div class="p-4 flex flex-col flex-grow">
            <p class="text-xs text-gray-500 mb-2">{{ item.date }} | <span class="text-green-600">2 Downloads</span></p>
            <p class="text-sm text-gray-600 mb-4 flex-grow">{{ item.description }}</p>
            <a :href="item.downloadLink" target="_blank" class="mt-auto block w-full text-center py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition duration-150">
              Download
            </a>
          </div>
        </div>
      </template>

      <template id="pagination-controls-template">
        <div class="flex justify-center items-center mt-8 space-x-2 text-sm font-medium">
          <a
            v-if="currentPage > 1"
            @click.prevent="$emit('page-change', currentPage - 1)"
            href="#"
            class="text-gray-700 hover:text-green-600 transition"
          >
            &larr; Page {{ currentPage - 1 }}
          </a>

          <span class="text-gray-600">
            Page {{ currentPage }} of {{ totalPages }}
          </span>

          <a 
            v-if="currentPage < totalPages"
            @click.prevent="$emit('page-change', currentPage + 1)"
            href="#"
            class="text-gray-700 font-bold hover:text-green-600 transition"
          >
            &rarr; Next
          </a>
          <span v-else class="text-gray-400">&rarr; Next</span>
        </div>
      </template>
    </teleport>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import latest from "@/assets/latest_news.png";

// --- Local Component Definitions (Composition API) ---

const NewsletterCard = { props: ['item'], template: '#newsletter-card-template' };
const PublicationCard = { props: ['item'], template: '#publication-card-template' };
const PaginationControls = { props: ['currentPage', 'totalPages'], emits: ['page-change'], template: '#pagination-controls-template' };

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
  { id: 101, reportType: 'Impact Report', title: 'Impact Evaluation Report: Delta State Access to Finance Scheme', date: 'October 25, 2024', description: 'We’re thrilled to present to you once again the HFN Quarterly Newsletter...', downloadLink: '#' },
  { id: 102, reportType: 'Policy Brochure', title: 'Healthcare Policy Dialogue Brochure', date: 'October 25, 2024', description: 'We’re thrilled to present to you once again the HFN Quarterly Newsletter...', downloadLink: '#' },
  { id: 103, reportType: 'Impact Report', title: 'Impact Evaluation Report: Delta State Access to Finance Scheme', date: 'October 25, 2024', description: 'We’re thrilled to present to you once again the HFN Quarterly Newsletter...', downloadLink: '#' },
  { id: 104, reportType: 'Annual Report', title: 'The HFN Annual Activities Report for 2023', date: 'October 25, 2024', description: 'A comprehensive review of the federation\'s activities and financial standing.', downloadLink: '#' },
  { id: 105, reportType: 'White Paper', title: 'Future of Healthcare Investment', date: 'October 25, 2024', description: 'A detailed white paper on strategic healthcare investment.', downloadLink: '#' },
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
