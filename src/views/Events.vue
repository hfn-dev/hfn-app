<template>
    <div class="events-page font-sans bg-white">

        <section class="bg-pink-50"> <div class="container mx-auto px-4 md:px-8 pt-10 pb-16">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            
            <div class="lg:w-1/2 mb-8 lg:mb-0">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                    <span class="text-green-700">Lorem Ipsum</span>
                    <br>
                    <span class="text-gray-900">Lorem Ipsum, ipsum</span>
                </h1>
                <p class="mt-4 text-gray-600 max-w-lg">
                    Eutemod magna id purus eget nunc ligula suspendisse dal netus. Condimentum blandit nistrem at mauris enim pulvinar duie etset duls. Succiesseinae erat purue eget nunc.
                </p>
            </div>
            
            <div class="lg:w-1/2 flex justify-center w-full h-64 sm:h-80 lg:h-96 relative">
                <img 
                    :src="latest" 
                    alt="Collage of past events"
                    class="object-cover w-full h-full rounded-lg"
                />
            </div>
        </div>
    </div>
</section>

        <section class="container mx-auto px-4 md:px-8 py-4">
            <h2 class="text-4xl font-bold text-gray-900 text-center">Events</h2>
        </section>

        <hr class="border-gray-200">

        <section class="container mx-auto px-4 md:px-8 py-8">
            <h3 class="text-2xl font-semibold text-gray-800 mb-6">Find your next event</h3>
            
            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-stretch sm:items-center">
                
                <div class="relative flex-grow">
                    <input 
                        type="text" 
                        placeholder="Search" 
                        class="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                    </div>

                <select class="p-3 border border-gray-300 rounded-md appearance-none focus:ring-green-500 focus:border-green-500 sm:w-auto">
                    <option>2026</option>
                    <option>2025</option>
                    <option>2024</option>
                </select>
                
                <select class="p-3 border border-gray-300 rounded-md appearance-none focus:ring-green-500 focus:border-green-500 sm:w-auto">
                    <option>Category</option>
                    <option>Webinar</option>
                    <option>Conference</option>
                </select>

                <button class="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-150">
                    Search
                </button>
            </div>
        </section>

        <hr class="border-gray-200">

        <section class="container mx-auto px-4 md:px-8 py-10">
            <h3 class="text-2xl font-semibold text-gray-800 mb-8">Latest Events</h3>
            
            <div class="mb-12 border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                <div class="flex flex-col lg:flex-row">
                    <div class="lg:w-3/5">
                        <img 
                    :src="latest" 
                    alt="Collage of past events"
                    class="object-cover w-full h-full rounded-lg"
                />
                                            </div>
                    
                    <div class="lg:w-2/5 p-6 md:p-8 flex flex-col justify-center">
                        <div class="text-xs font-medium text-red-600 uppercase mb-2">
                            Conference
                        </div>
                        <h4 class="text-xl font-bold text-gray-900 mb-3">
                            Dr. ADEDAYOMI AKIN - Commission - Dr. COKERemi - Commissioner
                        </h4>
                        <div class="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                            <span class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                October 31, 2025
                            </span>
                            <span class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                @ Event-Location
                            </span>
                        </div>
                        <p class="text-gray-600 mb-6">
                            Eutemod magna id purus eget nunc ligula suspendisse dal netus. Condimentum blandit nistrem at mauris enim pulvinar duie etset duls.
                        </p>
                        <button class="self-start px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-150 text-sm">
                            Register Now
                        </button>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                <div v-for="n in 3" :key="n" class="border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300">
                    <div class="h-40 bg-gray-200">
                        <img
                      :src="awards"
                      alt="HFN Walk for Life Event"
                      class="w-full h-full object-cover"
                    />
                    </div>
                    
                    <div class="p-4">
                        <div class="flex justify-between items-center text-xs font-medium mb-2">
                            <span class="text-red-600 uppercase">Webinar</span>
                            <span class="text-gray-500 flex items-center">
                                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Virtually
                            </span>
                        </div>
                        <h4 class="text-md font-bold text-gray-900 mb-2">
                            HFN Walk for Life
                        </h4>
                        
                        <div class="text-xs text-gray-500 mb-4">
                            <p>October 31, 2025</p>
                            <p class="flex items-center mt-1">
                                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18V6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2z"></path></svg>
                                Zoom
                            </p>
                        </div>
                        
                        <button class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-150 text-sm">
                            Register Now
                        </button>
                    </div>
                </div>
                
            </div>
        </section>
        
    </div>
</template>


<script setup>
import latest from "@/assets/latest_news.png";
import awards from "@/assets/awards.png";

</script>    
