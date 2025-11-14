<template>
  <div class="news-page font-sans bg-white">

    <section class="bg-[#E87A1814] pt-10 pb-16">
      <div class="container mx-auto px-4 md:px-8">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          
          <div class="lg:w-1/2 mb-8 lg:mb-0">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              <span class="text-green-700">Stay Informed:</span>
              <br>
              <span class="text-gray-900">Latest Healthcare News & Updates</span>
            </h1>
            <p class="mt-4 text-gray-600 max-w-lg">
              Get the latest insights, announcements, and policy developments from the Healthcare Federation of Nigeria and across the health sector.
            </p>
          </div>
          
          <div class="lg:w-1/2 flex justify-center w-full h-64 sm:h-80 lg:h-96 relative">
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
      <h2 class="text-4xl font-bold text-gray-900 text-center mb-12">Latest News</h2>

      <div class="max-w-7xl mx-auto mb-8">
        <select class="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm">
          <option>October 2025</option>
          <option>September 2025</option>
          <option>August 2025</option>
        </select>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-16">
        <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <img :src="event" alt="News Headline" class="w-full h-60 object-cover"/>
          <div class="p-6">
            <p class="text-sm text-orange-500 mb-4 flex items-center space-x-4">
              <span class="flex items-center"><svg class="w-4 h-4 mr-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h8M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> October 24, 2025</span>
              <span class="flex items-center"><svg class="w-4 h-4 mr-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg> 2 Comments</span>
            </p>
            <p class="text-gray-700 text-base mb-4">
              The Lagos State Ministry of Health has partnered with private hospitals to enhance emergency response times across key districts. This initiative, supported by HFN, ensures faster patient care and improved coordination among healthcare facilities.
            </p>
            <a href="#" class="inline-block bg-green-700 text-white text-sm px-5 py-2 rounded-full hover:bg-green-800 transition-colors">Read More</a>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <img :src="group" alt="News Headline" class="w-full h-60 object-cover"/>
          <div class="p-6">
            <p class="text-sm text-orange-500 mb-4 flex items-center space-x-4">
              <span class="flex items-center"><svg class="w-4 h-4 mr-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h8M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> October 24, 2025</span>
              <span class="flex items-center"><svg class="w-4 h-4 mr-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg> 2 Comments</span>
            </p>
            <p class="text-gray-700 text-base mb-4">
              The Healthcare Federation of Nigeria convened stakeholders from public and private sectors to discuss frameworks for digital health transformation, data management, and interoperability standards.
            </p>
            <a href="#" class="inline-block bg-green-700 text-white text-sm px-5 py-2 rounded-full hover:bg-green-800 transition-colors">Read More</a>
          </div>
        </div>

         <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <img :src="group1" alt="News Headline" class="w-full h-60 object-cover"/>
          <div class="p-6">
            <p class="text-sm text-orange-500 mb-4 flex items-center space-x-4">
              <span class="flex items-center"><svg class="w-4 h-4 mr-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h8M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> October 24, 2025</span>
              <span class="flex items-center"><svg class="w-4 h-4 mr-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg> 2 Comments</span>
            </p>
            <p class="text-gray-700 text-base mb-4">
              In collaboration with donor agencies, HFN supported Kaduna’s investment in solar-powered clinics, ensuring sustainable and reliable care in rural communities.
            </p>
            <a href="#" class="inline-block bg-green-700 text-white text-sm px-5 py-2 rounded-full hover:bg-green-800 transition-colors">Read More</a>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <img :src="wef" alt="News Headline" class="w-full h-60 object-cover"/>
          <div class="p-6">
            <p class="text-sm text-orange-500 mb-4 flex items-center space-x-4">
              <span class="flex items-center"><svg class="w-4 h-4 mr-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h8M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> October 24, 2025</span>
              <span class="flex items-center"><svg class="w-4 h-4 mr-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg> 2 Comments</span>
            </p>
            <p class="text-gray-700 text-base mb-4">
              A delegation from HFN joined the World Economic Forum’s Health Innovators Group to discuss equitable access to care, technology-driven solutions, and investment opportunities for Africa.
            </p>
            <a href="#" class="inline-block bg-green-700 text-white text-sm px-5 py-2 rounded-full hover:bg-green-800 transition-colors">Read More</a>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center space-x-4 text-gray-600 mb-20">
        <span class="text-sm">Page 1 of 2</span>
        <a href="#" class="flex items-center space-x-1 text-green-700 hover:underline">
          <span>Next</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </a>
      </div>

      <h2 class="text-4xl font-bold text-gray-900 text-center mb-12">Policy & Advocacy</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16 py-10 px-10 bg-[#F2F9F3] border rounded-md">
        <div class="flex flex-col text-center">
            <div class="w-full h-48 mb-4 rounded-xl overflow-hidden border-2 border-green-400/50 shadow-md flex items-center justify-center">
                <img 
                    :src="hands" 
                    alt="Strengthening Emergency Healthcare" 
                    class="w-full h-full object-cover"
                />
            </div>

            <h4 class="text-lg font-semibold text-gray-900 mb-2">Strengthening Emergency Healthcare in Nigeria through Partnership.</h4>
            <p class="text-gray-600 text-sm mb-3">
                HFN and the Federal Ministry of Health jointly announced a new partnership model to enhance emergency medical infrastructure across Nigeria’s six geopolitical zones.
            </p>
            <a href="#" class="text-orange-600 text-sm font-medium hover:text-orange-700 transition mx-auto">
                Learn more...
            </a>
        </div>

        <div class="flex flex-col text-center">
            <div class="w-full h-48 mb-4 rounded-xl overflow-hidden border-2 border-green-400/50 shadow-md flex items-center justify-center">
                <img 
                    :src="hands" 
                    alt="Strengthening Emergency Healthcare" 
                    class="w-full h-full object-cover"
                />
            </div>

            <h4 class="text-lg font-semibold text-gray-900 mb-2">Policy Framework for Health Technology Adoption</h4>
            <p class="text-gray-600 text-sm mb-3">
                HFN’s Policy and Advocacy team released a new white paper encouraging structured regulation and faster adoption of digital health tools in clinical settings.
            </p>
            <a href="#" class="text-orange-600 text-sm font-medium hover:text-orange-700 transition mx-auto">
                Learn more...
            </a>
        </div>

        <div class="flex flex-col text-center">
            <div class="w-full h-48 mb-4 rounded-xl overflow-hidden border-2 border-green-400/50 shadow-md flex items-center justify-center">
                <img 
                    :src="hands" 
                    alt="Strengthening Emergency Healthcare" 
                    class="w-full h-full object-cover"
                />
            </div>

            <h4 class="text-lg font-semibold text-gray-900 mb-2">Public-Private Dialogue on Universal Health Coverage (UHC)</h4>
            <p class="text-gray-600 text-sm mb-3">
                Stakeholders met in Abuja to evaluate funding mechanisms and policy frameworks driving Nigeria’s progress toward universal access to affordable healthcare.
            </p>
            <a href="#" class="text-orange-600 text-sm font-medium hover:text-orange-700 transition mx-auto">
                Learn more...
            </a>
        </div>
      </div>
       <div class="flex justify-center items-center space-x-4 text-gray-600">
        <span class="text-sm">Page 1 of 2</span>
        <a href="#" class="flex items-center space-x-1 text-green-700 hover:underline">
          <span>Next</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </a>
      </div>

    </main>
  </div>
</template>

<script setup>
import event from "@/assets/event.png"; 
import hands from "@/assets/hands.png"; 
import latest from "@/assets/latest_news.png"; 
import group from "@/assets/group.png";
import group1 from "@/assets/group1.png";
import wef from "@/assets/wef.jpg";

</script>

<style scoped>
</style>
