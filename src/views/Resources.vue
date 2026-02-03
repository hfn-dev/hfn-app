<template>
  <div class="news-page font-sans bg-white">
    <section class="bg-[#E87A1814] pt-10 pb-16">
      <div class="container mx-auto px-4 md:px-8">
        <div
          class="flex flex-col lg:flex-row items-start lg:items-center justify-between"
        >
          <div class="lg:w-1/2 mb-8 lg:mb-0">
            <h1
              class="text-4xl md:text-5xl font-bold text-gray-800 leading-tight"
            >
              <span class="text-green-700">Stay Informed:</span>
              <br />
              <span class="text-gray-900"
                >Latest Healthcare News & Updates</span
              >
            </h1>
            <p class="mt-4 text-gray-600 max-w-lg">
              Get the latest insights, announcements, and policy developments
              from the Healthcare Federation of Nigeria and across the health
              sector.
            </p>
          </div>

          <div
            class="lg:w-1/2 flex justify-center w-full h-64 sm:h-80 lg:h-96 relative"
          >
            <img
              :src="latest"
              alt="Latest news and updates"
              class="object-cover w-full h-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>

    <main class="container mx-auto px-4 md:px-8 py-16">
      <h2 class="text-4xl font-bold text-gray-900 text-center mb-12">
        Newsletters
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
      <div v-for="(item, index) in newsletters" :key="index" 
           class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col">
        
        <div class="relative group h-60 overflow-hidden bg-gray-100">
           <img
            :src="getPdfPreview(item.pdfUrl)"
            alt="Newsletter Preview"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            @error="(e) => e.target.src = newsletter_placeholder" 
          />
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <span class="text-white bg-green-700 px-3 py-1 rounded text-xs">View Document</span>
          </div>
        </div>

        <div class="p-6 flex-grow flex flex-col">
          <p class="text-sm text-orange-500 mb-4 flex items-center space-x-4">
            <span class="flex items-center">
              {{ item.date }}
            </span>
            </p>
          <p class="text-gray-700 text-base mb-4 flex-grow">
            {{ item.text }}
          </p>
          
          <div class="mt-auto pt-4 flex space-x-2">
            <a
              :href="item.pdfUrl"
              download
              target="_blank"
              class="flex-1 text-center bg-green-700 text-white text-sm px-5 py-2 rounded-full hover:bg-green-800 transition-colors"
            >
              Download PDF
            </a>
            
            <a
              :href="item.pdfUrl"
              target="_blank"
              class="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              title="Open in browser"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>

      <div class="max-w-7xl mx-auto mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-12"></h2>
      </div>

      
      <div
        class="flex justify-center items-center space-x-4 text-gray-600 mb-20"
      >
        <span class="text-sm">Page 1 of 2</span>
        <a
          href="https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770067797/IMPACT_REPORT_-_Updated_p18np1.pdf"
          class="flex items-center space-x-1 text-green-700 hover:underline"
        >
          <span>Next</span>
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </a>
      </div>

      <h2 class="text-3xl font-bold text-gray-900 mb-12">Publications</h2>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16 py-10 px-10 rounded-3xl bg-[#F2F9F3]"
      >
        <div
  v-for="(pub, index) in publications"
  :key="index"
  class="flex flex-col text-center"
>
  <div
    class="w-full h-48 mb-4 rounded-xl overflow-hidden border-2 border-green-400/50 shadow-md flex items-center justify-center bg-white"
  >
    <img
      :src="getPdfPreview(pub.pdfUrl)"
      alt="Publication preview"
      class="w-full h-full object-cover"
      @error="(e) => e.target.src = hands"
    />
  </div>

  <h4 class="text-lg font-semibold text-gray-900 mb-2">
    {{ pub.title }}
  </h4>

  <p class="text-gray-600 text-sm mb-4">
    {{ pub.description }}
  </p>

  <a
    :href="pub.pdfUrl"
    target="_blank"
    download
    class="inline-block bg-green-700 text-white text-sm px-5 py-2 rounded-full hover:bg-green-800 transition-colors"
  >
    Download
  </a>
</div>

      </div>
      <div class="flex justify-center items-center space-x-4 text-gray-600">
        <span class="text-sm">Page 1 of 2</span>
        <a
          href="#"
          class="flex items-center space-x-1 text-green-700 hover:underline"
        >
          <span>Next</span>
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </a>
      </div>
    </main>
  </div>
</template>

<script setup>
import hands from "@/assets/hands.png";
import latest from "@/assets/latest_news.png";
import newsletter from "@/assets/newsletter.png";

  const getPdfPreview = (url) => {
  return url.replace(".pdf", ".jpg");
};

const publications = [
  {
    title: "Strengthening Emergency Healthcare in Nigeria through Partnership",
    description: "HFN and the Federal Ministry of Health jointly announced a new partnership model to enhance emergency medical infrastructure across Nigeria’s six geopolitical zones.",
    pdfUrl: "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770067797/IMPACT_REPORT_-_Updated_p18np1.pdf"
  },
  {
    title: "Policy Framework for Health Technology Adoption",
    description: "HFN’s Policy and Advocacy team released a new white paper encouraging structured regulation and faster adoption of digital health tools in clinical settings.",
    pdfUrl: "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770067797/IMPACT_REPORT_-_Updated_p18np1.pdf"
  },
  {
    title: "Public-Private Dialogue on Universal Health Coverage (UHC)",
    description: "Stakeholders met in Abuja to evaluate funding mechanisms and policy frameworks driving Nigeria’s progress toward universal access to affordable healthcare.",
    pdfUrl: "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770067797/IMPACT_REPORT_-_Updated_p18np1.pdf"
  }
];

const newsletters = [
  {
    date: "October 24, 2025",
    comments: 0,
    text: "The Healthcare Federation of Nigeria (HFN), in collaboration with the West Africa Private Healthcare Federation (FOASPS), the Presidential Initiative for Unlocking the Healthcare Value Chain (PVAC), the African Union Development Agency (AUDA-NEPAD), and the World Bank, convened a High-Level
Roundtable on Local Manufacturing of Medicines in Nigeria on Wednesday, October 22, 2025, in Abuja",
    pdfUrl: "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770067783/hfn-report_roundtable-on-local-manufacturing_esqq68.pdf"
  },
  {
    date: "October 24, 2025",
    comments: 0,
    text: "At the 28th NUNSA Annual General Assembly and Scientific Conference themed “Empowering Nurses: A Catalyst for Sustainable Healthcare in Africa,” HFN President Njide Ndili delivered a compelling address emphasizing the indispensable role of nurses in Nigeria's healthcare landscape.", 
    pdfUrl: "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770067784/hfn-quarterly-newsletter-q-2---2025_jfakrt.pdf"
  },
  {
    date: "October 24, 2025",
    comments: 0,
    text: "As we step into 2025 with hope and determination, the Healthcare Federation of Nigeria (HFN) is delighted to present our Q4 2024 newsletter—a reflection of the strides we made in the final quarter of the year. This period was marked by notable collaborations, policy advancements, and landmark events, each
contributing to our shared mission of achieving Universal Health Coverage (UHC).",
    pdfUrl: "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770067784/hfn-quarterly-newsletter-q-4_2024_rqpvhf.pdf"
  },
  {
    date: "October 24, 2025",
    comments: 0,
    text: "A delegation from HFN joined the World Economic Forum’s Health Innovators Group to discuss equitable access to care and technology-driven solutions for Africa.",
    pdfUrl: "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770067793/2025-hfn-conference-report_hapfj9.pdf"
  }
];
  
</script>


<style scoped>
</style>
