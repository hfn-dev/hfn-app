<template>
    <div class="events-page font-sans bg-white">

        <section class="bg-pink-50"> <div class="container mx-auto px-4 md:px-8 pt-10 pb-16">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            
            <div class="lg:w-1/2 mb-8 lg:mb-0">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                    <span class="text-green-700">Upcoming Events</span>
                    <br>
                    <span class="text-gray-900">Connect, Learn & Grow With Us</span>
                </h1>
                <p class="mt-4 text-gray-600 max-w-lg">
                   Stay updated with our latest conferences, webinars, and community programs.
              Whether you're looking to expand your knowledge, network with industry leaders,
              or engage with our vibrant community, there's an event for you.
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
                            Join thought leaders, innovators, and entrepreneurs across Africa as we explore
              the next phase of sustainable growth, technology-driven change, and inclusive
              business practices.
                        </p>
                        <button class="self-start px-6 py-2 bg-green-900 text-white justify-center rounded-md hover:bg-green-700 transition duration-150 text-sm">
                            Register Now
                        </button>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(event, index) in events"
          :key="index"
          class="border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300"
        >
          <div class="relative h-48">
            <img
              :src="awards"
              alt="Event image"
              class="w-full h-full object-cover brightness-[0.7] transition duration-300"
            />

            <span
              class="absolute top-4 left-4 px-3 py-1 bg-white text-green-700 text-xs font-semibold rounded-full shadow-md"
            >
              {{ event.category }}
            </span>
          </div>

          <div class="p-4">
            <div class="flex justify-between items-center mb-2">
              <h4 class="text-lg font-bold text-green-900 leading-snug">
                {{ event.title }}
              </h4>
              <span class="text-orange-600 text-xs flex items-center whitespace-nowrap">
                <svg
                  class="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                {{ event.frequency }}
              </span>
            </div>

            <p class="text-sm text-gray-600 mb-3 line-clamp-3">
              {{ event.description }}
            </p>

            <hr class="my-3 border-gray-100" />

            <div class="grid grid-cols-2 gap-2 text-sm text-orange-600 mb-4">
              <div class="flex items-center">
                <svg
                  class="w-4 h-4 mr-1 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <span class="text-orange-600">{{ event.date }}</span>
              </div>

              <div class="flex items-center">
                <svg
                  class="w-4 h-4 mr-1 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span class="text-orange-600">{{ event.time }}</span>
              </div>

              <div class="flex items-center col-span-2">
                <svg
                  class="w-4 h-4 mr-1 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span class="text-orange-600">{{ event.location }}</span>
              </div>
            </div>

            <button
              class="px-3 py-2 bg-green-700 text-white rounded-full justify-center hover:bg-green-800 transition duration-150 text-sm font-semibold mt-2"
            >
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


 const events = [
  {
    title: "Digital Skills Bootcamp",
    category: "Workshop",
    date: "November 20, 2025",
    time: "9:00 AM",
    location: "Online via Zoom",
    frequency: "Monthly",
    description:
      "A hands-on training designed to help beginners and professionals master essential digital tools for marketing, communication, and collaboration.",
  },
  {
    title: "Women in Tech Summit",
    category: "Conference",
    date: "December 5, 2025",
    time: "10:00 AM",
    location: "Civic Centre, Victoria Island",
    frequency: "Annually",
    description:
      "A gathering of tech enthusiasts and leaders driving innovation and inclusion in the African tech ecosystem.",
  },
  {
    title: "Health & Wellness Webinar",
    category: "Webinar",
    date: "January 12, 2026",
    time: "11:00 AM",
    location: "Online",
    frequency: "Quarterly",
    description:
      "Join medical experts and lifestyle coaches to discuss simple ways to achieve holistic wellness in a fast-paced world.",
  },
];   
</script>    
