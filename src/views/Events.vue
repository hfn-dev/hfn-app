<template>
  <div class="events-page font-sans bg-white">
    <section class="bg-[#E87A1814]">
      <div class="container mx-auto px-4 md:px-8 pt-10 pb-16">
        <div
          class="flex flex-col lg:flex-row items-start lg:items-center justify-between"
        >
          <div class="lg:w-1/2 mb-8 lg:mb-0">
            <h1
              class="text-4xl md:text-5xl font-bold text-gray-800 leading-tight"
            >
              <span class="text-green-700">Events/Engagements</span>
              <br />
              <span class="text-gray-900"
                >Speaking with one voice for the private health sector</span
              >
            </h1>
            <p class="mt-4 text-gray-600 max-w-lg">
              Stay updated with our latest conferences, webinars, and community
              programs. Whether you're looking to expand your knowledge, network
              with industry leaders, or engage with our vibrant community,
              there's an event for you.
            </p>
          </div>

          <div
            class="lg:w-1/2 flex justify-center w-full h-64 sm:h-80 lg:h-96 relative"
          >
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

    <hr class="border-gray-200" />

    <section class="container mx-auto px-4 md:px-8 py-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-6">Find event</h3>

      <div
        class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-stretch sm:items-center"
      >
        <div class="relative flex-grow">
          <input
            type="text"
            placeholder="Search"
            class="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <select
          class="p-3 border border-gray-300 rounded-md appearance-none focus:ring-green-500 focus:border-green-500 sm:w-auto"
        >
          <option>2026</option>
          <option>2025</option>
          <option>2024</option>
        </select>

        <select
          class="p-3 border border-gray-300 rounded-md appearance-none focus:ring-green-500 focus:border-green-500 sm:w-auto"
        >
          <option>Category</option>
          <option>Webinar</option>
          <option>Conference</option>
        </select>

        <button
          class="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-150"
        >
          Search
        </button>
      </div>
    </section>

    <hr class="border-gray-200" />

    <section class="container mx-auto px-4 md:px-8 py-10">
      <h3 class="text-2xl font-semibold text-gray-800 mb-8">Latest Events</h3>

      <div
        class="mb-12 border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
      >
        <div class="flex flex-col lg:flex-row">
          <div class="lg:w-3/5">
            <img
              :src="newEvent"
              alt="Collage of past events"
              class="object-cover w-full h-full rounded-lg"
            />
          </div>

          <div class="lg:w-2/5 p-6 md:p-8 flex flex-col justify-center">
            <div
              class="self-start inline-block text-[10px] font-semibold uppercase text-orange-600 bg-white rounded-full px-3 py-1 shadow-sm border border-orange-100"
            >
              Members Only
            </div>

            <div
              class="flex items-center space-x-4 text-sm text-orange-500 mb-4 mt-5"
            >
              <span class="flex items-center">
                <svg
                  class="w-4 h-4 mr-1"
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
                Wednesday, March 4th 2026
              </span>
              <span class="flex items-center">
                <svg
                  class="w-4 h-4 mr-1"
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
                Lagos Oriental Hotel Lagos, LA
              </span>
            </div>
            <p class="text-gray-600 mb-6">
              Join HFN 2026 to explore bold private‑sector solutions driving
              healthcare financing and Universal Health Coverage in Nigeria. The
              Healthcare Federation of Nigeria (HFN) invites you to the HFN
              Annual Conference 2026, Nigeria’s premier gathering of
              private-sector healthcare leaders, policymakers, financiers,
              innovators, and development partners.
            </p>
            <a
              href="https://tix.africa/claim/2026-hfn-annual-conference/VGlja2V0LWE3MDc0Yjg4LTU3ZTUtNGE3My05MWU5LWNhMmYwYjZlYTJhYw=="
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex self-start px-6 py-2 bg-green-900 text-white justify-center rounded-full hover:bg-green-700 transition duration-150 text-sm"
            >
              Register Now
            </a>
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
              :src="event.image"
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
              <span
                class="text-orange-600 text-xs flex items-center whitespace-nowrap"
              >
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
                  class="w-4 h-4 mr-1 text-orange-600"
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

            <a
              :href="event.registerLink"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex justify-center px-3 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition duration-150 text-sm font-semibold mt-2 mx-auto"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="container mx-auto px-4 md:px-8 py-14">
      <h3 class="text-2xl font-semibold text-gray-800 mb-8">Past Events</h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(event, index) in pastEvents"
          :key="index"
          class="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
        >
          <img
            :src="event.image"
            class="w-full h-48 object-cover"
            alt="Past event"
          />

          <div class="p-5">
            <span class="text-xs font-semibold text-green-700 uppercase">
              {{ event.category }}
            </span>

            <h4 class="text-lg font-bold text-gray-900 mt-2">
              {{ event.title }}
            </h4>

            <p class="text-sm text-orange-600 mt-1">
              {{ event.date }}
            </p>

            <p class="text-sm text-gray-600 mt-3">
              <span class="font-semibold">Theme:</span> {{ event.theme }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from "vue";
import eventsApi from "@/api/events.js";
  
import awards from "@/assets/awards.png";
import newEvent from "@/assets/events.png";
// import latest from "@/assets/latest_news.png";

const apiEvents = ref([]);
const loadingEvents = ref(false);

  const fetchApiEvents = async () => {
  try {
    const apiEvents = await eventsApi.listEvents(); 
   
    const mappedApiEvents = apiEvents.map((e) => {
      const startDate = new Date(e.start_date || e.date);

      return {
        id: e.id,
        title: e.title,
        date: startDate.toISOString().slice(0, 10),
        time: startDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        tag: e.event_type || "General",
        image: e.banner_image || eventThumb,
        excerpt: e.description || "",
        details: e.description || "",
        slug: e.slug
      };
    });

    events.value = [...events.value, ...mappedApiEvents];
  } catch (error) {
    console.error("Failed to fetch API events:", error);
  }
};



const events = computed(() => {
  return [...apiEvents.value, ...staticEvents];
});
  

  
const event =
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769883047/events-CNRYrGt8_trfhaz.png";
const breakfast2025 =
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769881263/1758712162657_yclv7p.jpg";
const roundtable2025 =
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769881265/1764355254559_g2wv3t.jpg";
const hfn2025 =
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769881267/1746181486545_mtao0s.jpg";
const latest =
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770045591/243A7993_wxlzkg.jpg";

  
const staticEvents = [
  {
    title: "2026 HFN Annual Conference",
    category: "Member Only",
    date: "Wednesday, March 4th 2026",
    time: "10:00 AM",
    location: "Lagos Oriental Hotel Lagos, LA",
    frequency: "Free for Members",
    image: event,
    description:
      "Join HFN 2026 to explore bold private‑sector solutions driving healthcare financing and Universal Health Coverage in Nigeria.",
    registerLink:
      "https://tix.africa/claim/2026-hfn-annual-conference/VGlja2V0LWE3MDc0Yjg4LTU3ZTUtNGE3My05MWU5LWNhMmYwYjZlYTJhYw==",
  },
  {
    title: "2026 HFN Annual Conference",
    category: "Non-members",
    date: "Wednesday, March 4th 2026",
    time: "10:00 AM",
    location: "Lagos Oriental Hotel Lagos, LA",
    frequency: "Dollar Payment",
    image: event,
    description:
      "Join HFN 2026 to explore bold private‑sector solutions driving healthcare financing and Universal Health Coverage in Nigeria.",
    registerLink:
      "https://www.eventbrite.com/e/2026-hfn-annual-conference-tickets-1980514831174?aff=oddtdtcreator#location",
  },
  {
    title: "2026 HFN Annual Conference",
    category: "Non-members",
    date: "Wednesday, March 4th 2026",
    time: "10:00 AM",
    location: "Lagos Oriental Hotel Lagos, LA",
    frequency: "Naira Payment",
    image: event,
    description:
      "Join HFN 2026 to explore bold private‑sector solutions driving healthcare financing and Universal Health Coverage in Nigeria.",
    registerLink: "https://tix.africa/discover/2026-hfn-annual-conference",
  },
];

const pastEvents = [
  {
    title: "HFN Healthcare Leadership Conference 2025",
    category: "Conference",
    date: "June 2, 2025",
    theme:
      "Accelerating UHC and Health Sovereignty Through Public-Private Integration",
    image: hfn2025,
  },
  {
    title:
      "High-Level Roundtable on Local Manufacturing of Medicines in Nigeria",
    category: "Roundtable",
    date: "October 22, 2025",
    theme:
      "Strengthening Local Pharmaceutical Manufacturing for Sustainable Health Security in Africa",
    image: roundtable2025,
  },
  {
    title: "HFN–NHIA Private Sector Roundtable Breakfast Meeting",
    category: "Roundtable",
    date: "December 1, 2025",
    theme:
      "Leveraging Private Sector to Accelerate Health Insurance Coverage in Nigeria",
    image: breakfast2025,
  },
];

  onMounted(() => {
  fetchApiEvents();
});

</script>
