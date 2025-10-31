<!-- <script setup>
import course from "@/assets/courses.jpg";
import user from "@/assets/user.png";
import user1 from "@/assets/user1.png";
import user2 from "@/assets/user2.png";
import { useRouter } from "vue-router";

import UserSidebar from "@/components/layout/UserSidebar.vue";

import { ref } from "vue";
const router = useRouter();

const DARK_GREEN = "#004d33";
const LIGHT_GREEN = "#f2f9f3";
const ACCENT_GRAY = "#f9fafb";
const ACCENT_ORANGE = "#ff6600";
const LIGHT_PINKISH_GRAY = "#fcf3f6";

const userName = "Ruthie";
const activeSidebarItem = ref("Dashboard");
const activeCourseTrack = ref("Care");

// const goToCourseDetails = () => {
//   router.push({ name: "CourseDetails", params: { id: 1 } });
// };

const courses = [
  {
    title: "The Power of Natural Healing in Modern Wellness",
    instructor: "Mrs Njide Ndili",
    rating: 4.5,
    reviews: 78,
    date: "October 10, 2025",
    price: "Free",
    image: course,
    excerpt:
      "Discover how natural healing methods are reshaping modern health practices — from nutrition to mindfulness and herbal care.",
  },
  {
    title: "Building a Sustainable Lifestyle Through Herbal Nutrition",
    instructor: "Mrs Chinyere",
    rating: 4.5,
    reviews: 78,
    date: "September 22, 2025",

    price: "Free",
    image: course,
    excerpt:
      "Learn practical ways to integrate herbal foods and plant-based meals into your daily life for long-term vitality.",
  },
  {
    title: "How to Strengthen Your Immune System Naturally",
    instructor: "HFN Editorial team",
    rating: 4.5,
    reviews: 78,
    date: "August 30, 2025",

    price: "Free",
    image: course,
    excerpt:
      "Your immune system is your best defense. Explore science-backed natural methods to boost and protect it year-round.",
  },
  {
    title: "Mindful Living: The Key to Inner Balance and Healing",
    instructor: "Mrs Njide Ndili",
    rating: 4.5,
    reviews: 78,
    date: "August 5, 2025",

    price: "Free",
    image: course,
    excerpt:
      "Embrace mindfulness as a healing tool. Discover daily practices that can transform your stress levels and mindset.",
  },
  {
    title: "The Future of Holistic Medicine in Africa",
    instructor: "Mrs Njide Ndili",
    rating: 4.5,
    reviews: 78,
    date: "July 15, 2025",

    price: "Free",
    image: course,
    excerpt:
      "From research to real-world application, see how holistic medicine is finding its place in Africa’s healthcare evolution.",
  },
  {
    title: "Healthy Living Through Nature: A Beginner’s Guide",
    instructor: "Mrs Chinyere",
    rating: 4.5,
    reviews: 78,
    date: "June 20, 2025",

    price: "Free",
    image: course,
    excerpt:
      "If you’re new to holistic health, this guide will help you understand the foundations of living close to nature.",
  },
];

const latestCourses = [
  {
    title: "HFN Wellness Conference 2025",
    instructor: "HFN Editorial team",
    rating: 4.5,
    reviews: 78,
    date: "December 14, 2025",

    price: "Free",
    image: course,
    excerpt:
      "Join experts and enthusiasts for a 2-day event focused on holistic health, nutrition, and natural therapies.",
  },
  {
    title: "Virtual Herbal Therapy Masterclass",
    instructor: "HFN Editorial team",
    rating: 4.5,
    reviews: 78,
    date: "November 25, 2025",

    price: "Free",
    image: course,
    excerpt:
      "A live masterclass exploring the fundamentals of herbal therapy — how to prepare, use, and benefit from natural remedies.",
  },
  {
    title: "HFN Community Wellness Walk",
    instructor: "HFN Editorial team",
    rating: 4.5,
    reviews: 78,
    date: "November 5, 2025",

    price: "Free",
    image: course,
    excerpt:
      "An energizing outdoor walk to promote physical activity, mindfulness, and connection with the HFN community.",
  },
];

const courseTracks = [
  "Business",
  "Care",
  "Insurance",
  "Entrepreneurship",
  "Nursing",
  "Dentistry",
];

const getIconPaths = (name) => {
  const icons = {
    dashboard:
      '<path d="M3 3v18h18"/><rect x="9" y="9" width="6" height="6" rx="1" /><path d="M12 3v18m0-12h12m0 6h-12M6 6h12m-6 0v18"/>',
    learning:
      '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    messages:
      '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    account:
      '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    support:
      '<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14v-4m0-4h.01"/>',
    logout:
      '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
    search:
      '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/>',
    bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    "chevron-down": '<polyline points="6 9 12 15 18 9"/>',
    "star-fill":
      '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    next: '<polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>',
    prev: '<polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/>',
  };
  return icons[name] || "";
};

</script>

<template>
  <div class="min-h-screen flex flex-col bg-white border-0 font-sans">
    <div class="flex flex-grow overflow-hidden">
      <UserSidebar />
      <main
        class="flex-grow overflow-y-auto pb-12"
        :style="{ backgroundColor: WHITE }"
      >
        <div class="max-w-6xl mx-auto p-4 sm:p-8">
          <div class="mb-10 pt-4">
            <h1 class="text-3xl font-bold" style="color: #e87a18">
              Welcome {{ userName }},
            </h1>
            <p class="text-xl font-medium text-gray-700 mt-1">
              Accelerate your career in as little as 3 months
            </p>
          </div>

          <div
            class="w-screen mb-12 py-16 shadow-inner relative left-1/2 right-1/2 -mx-[50vw]"
            :style="{ backgroundColor: LIGHT_PINKISH_GRAY }"
          >
            <div class="max-w-6xl mx-auto px-6">
              <h2
                class="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10"
              >
                How HFN Community hub works...
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  class="bg-[#F2F9F3] rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition duration-300"
                >
                  <img
                    :src="user"
                    alt="Profile Icon"
                    class="h-34 mx-auto mb-4"
                  />
                  <h3
                    class="text-lg font-bold mb-2"
                    :style="{ color: DARK_GREEN }"
                  >
                    Complete your Profile
                  </h3>
                  <p class="text-sm text-gray-600">
                    Tell us about your wellness interests and goals so we can
                    personalize your experience.
                  </p>
                </div>

                <div
                  class="bg-[#F2F9F3] rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition duration-300"
                >
                  <img
                    :src="user1"
                    alt="Search Icon"
                    class="h-34 mx-auto mb-4"
                  />
                  <h3
                    class="text-lg font-bold mb-2"
                    :style="{ color: DARK_GREEN }"
                  >
                    Search for Courses
                  </h3>
                  <p class="text-sm text-gray-600">
                    Find health tips, natural living guides, and upcoming events
                    that align with your interests.
                  </p>
                </div>

                <div
                  class="bg-[#F2F9F3] rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition duration-300"
                >
                  <img
                    :src="user2"
                    alt="Connect Icon"
                    class="h-34 mx-auto mb-4"
                  />
                  <h3
                    class="text-lg font-bold mb-2"
                    :style="{ color: DARK_GREEN }"
                  >
                    Make a Connection
                  </h3>
                  <p class="text-sm text-gray-600">
                    Join a growing community of health enthusiasts and
                    professionals sharing their experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">
            Our Latest Post
          </h2>

          <div
            class="flex flex-wrap justify-center gap-2 mb-8 bg-white p-2 rounded-xl shadow-md"
          >
            <button
              v-for="track in courseTracks"
              :key="track"
              @click="activeCourseTrack = track"
              :class="[
                'px-5 py-2 rounded-lg font-medium transition duration-200 text-sm md:text-base',
                track === activeCourseTrack
                  ? 'text-white shadow-inner'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100',
              ]"
              :style="
                track === activeCourseTrack
                  ? { backgroundColor: DARK_GREEN }
                  : {}
              "
            >
              {{ track }}
            </button>
          </div>

          <div
            class="bg-[#F2F9F3] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <div
              v-for="(course, index) in courses"
              :key="'track-course-' + index"
              class="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
            >
              <img
                :src="course.image"
                alt="Course Thumbnail"
                class="w-full h-36 object-cover"
              />

              <div class="p-4">
                <p class="text-xs text-gray-500 font-semibold uppercase">
                  {{ course.date }}
                </p>
                <h3 class="text-lg font-bold text-gray-800 mt-1 line-clamp-2">
                  {{ course.title }}
                </h3>
                <p class="text-sm text-gray-600">By {{ course.instructor }}</p>

                <div class="flex items-center my-3 text-yellow-500">
                  <svg
                    v-for="n in 5"
                    :key="n"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 mr-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="none"
                    stroke-width="0"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    v-html="getIconPaths('star-fill')"
                  ></svg>
                  <span class="text-xs text-gray-500 ml-1"
                    >({{ course.reviews }} reviews)</span
                  >
                </div>

                <p class="text-sm text-gray-500 line-clamp-3">
                  {{ course.excerpt }}
                </p>

                <button
                  class="mt-4 w-full py-2 rounded-lg font-semibold text-white transition duration-200 hover:opacity-90"
                  :style="{ backgroundColor: DARK_GREEN }"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>

          <div
            class="flex justify-center items-center mt-10 space-x-4 text-gray-600"
          >
            <a
              href="#"
              class="text-sm font-medium hover:text-gray-900 transition flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                v-html="getIconPaths('prev')"
              ></svg>
              Prev
            </a>
            <span class="text-sm">Page 1 of 4</span>
            <a
              href="#"
              class="text-sm font-medium hover:text-gray-900 transition flex items-center"
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                v-html="getIconPaths('next')"
              ></svg>
            </a>
          </div>

          <h2 class="text-2xl font-bold text-gray-800 mt-12 mb-6">
            Our Events
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(course, index) in latestCourses"
              :key="'latest-course-' + index"
              class="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
            >
              <img
                :src="course.image"
                alt="Course Thumbnail"
                class="w-full h-36 object-cover"
              />

              <div class="p-4">
                <p class="text-xs text-gray-500 font-semibold uppercase">
                  {{ course.date }}
                </p>
                <h3 class="text-lg font-bold text-gray-800 mt-1 line-clamp-2">
                  {{ course.title }}
                </h3>
                <p class="text-sm text-gray-600">By {{ course.instructor }}</p>

                <div class="flex items-center my-3 text-yellow-500">
                  <svg
                    v-for="n in 5"
                    :key="n"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 mr-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="none"
                    stroke-width="0"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    v-html="getIconPaths('star-fill')"
                  ></svg>
                  <span class="text-xs text-gray-500 ml-1"
                    >({{ course.reviews }} reviews)</span
                  >
                </div>

                <p class="text-sm text-gray-500 line-clamp-3">
                  {{ course.excerpt }}
                </p>

                <button
                  class="mt-4 w-full py-2 rounded-lg font-semibold text-white transition duration-200 hover:opacity-90"
                  :style="{ backgroundColor: DARK_GREEN }"
                >
                  Join Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
</style> -->


<template>
  <div class="flex min-h-screen bg-white">
    <!-- Sidebar -->
    <UserSidebar />

    <!-- Main Content -->
    <div class="flex-1 p-6 md:p-10 overflow-y-auto">
      <!-- Header -->
      <h2 class="text-xl md:text-2xl font-semibold text-[#f54a00]">
        Welcome Ruthie,
      </h2>
      <p class="text-[#555] mt-1">Stay up to date with the latest on HFN</p>

      <div
        class="w-screen py-16 shadow-inner relative left-1/2 right-1/2 -mx-[50vw]"
        :style="{ backgroundColor: '#F8F3EE' }"
      >
        <section class="max-w-6xl mx-auto px-6 text-center">
          <h3 class="text-3xl font-serif text-[#333] mb-8">
            Missed the Last HFN Meeting?
          </h3>

          <div class="mb-8 flex justify-center">
            <div
              class="p-4 border border-gray-200 rounded-xl bg-white shadow-md"
            >
              <div
                class="w-40 md:w-48 p-6 bg-white border border-green-100 rounded-lg flex flex-col items-center justify-center relative"
              >
                <div class="absolute top-2 left-2"></div>
                <div class="relative w-16 h-16 mb-4"></div>

                <p class="text-sm font-semibold text-[#333] mt-2 leading-none">
                  Meeting Minutes
                </p>
                <p class="text-xs text-gray-500">No 07 29-10-2025</p>
              </div>
            </div>
          </div>

          <a
            href="[Link_to_your_PDF]"
            download
            class="inline-block bg-[#004D33] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#006644] transition shadow-lg"
          >
            Download Minutes
          </a>
        </section>
      </div>
      <!-- Newsletter -->
      <section class="mt-10 max-w-6xl mx-auto px-4">
        <h3 class="text-3xl font-sans font-bold text-black text-center mb-10">
          HFN Newsletter
        </h3>

        <div class="bg-white rounded-xl overflow-hidden shadow-lg p-6 md:p-10">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div class="order-2 md:order-1">
              <div class="w-full relative">
                <img
                  :src="newsletters[0].image"
                  :alt="newsletters[0].title"
                  class="w-full h-auto rounded-xl shadow-lg border-2 border-gray-100"
                />
              </div>
            </div>

            <div class="order-1 md:order-2">
              <h4 class="text-4xl font-extrabold text-[#333] mb-4 leading-snug">
                {{ newsletters[0].title }}
              </h4>
              <p class="text-lg text-gray-700 mb-6">
                {{ newsletters[0].description_short }}
              </p>
              <ul
                class="list-disc list-inside text-gray-700 space-y-1 mb-8 pl-4"
              >
                <li>Unlocking Nigeria’s Healthcare Value Chain.</li>
                <li>Policy Partnership in Action -The HFN–PVAC MOU.</li>
                <li>
                  Collaborating on policy reforms that incentivize local
                  manufacturing and investment.
                </li>
              </ul>
              <button
                class="bg-[#004D33] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#006644] transition duration-300"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>
      <section class="mt-10 max-w-6xl mx-auto px-4">
        <h3 class="text-3xl font-sans font-bold text-[#333] text-center mb-6">
          Upcoming Events
        </h3>

        <div class="flex justify-start mb-8">
          <select
            class="border border-gray-300 rounded-lg p-2 text-sm font-medium text-gray-700 focus:ring-[#004D33] focus:border-[#004D33]"
          >
            <option>October 2025</option>
            <option>November 2025</option>
            <option>December 2025</option>
          </select>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(event, index) in events"
            :key="index"
            class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
            :class="{ 'p-0': true }"
          >
            <div class="relative">
              <img
                :src="event.image"
                :alt="event.title"
                class="w-full h-48 object-cover rounded-t-xl"
              />

              <span
                class="absolute bottom-0 left-0 px-3 py-1 text-xs font-semibold text-white rounded-tr-lg"
                :class="{
                  'bg-green-700': event.tag === 'Programs & Initiatives',
                  'bg-red-700': event.tag === 'Health Alert',
                }"
              >
                {{ event.tag }}
              </span>
            </div>

            <div class="p-6">
              <p class="text-sm text-gray-700 mb-4">
                What does it really take to de-risk healthcare investments in
                Nigeria, and make “Made in Nigeria, Made for Health” a
                sustainable national reality?
              </p>

              <div
                class="flex flex-wrap justify-between items-center text-sm text-gray-500 mb-4 space-y-1"
              >
                <div class="flex items-center text-orange-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 mr-1 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 18H5V8h14v13z"
                    />
                  </svg>
                  <span class="text-xs">{{ event.date }}</span>
                </div>

                <div
                  v-if="event.time"
                  class="flex items-center text-orange-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 mr-1 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.8 14.8l-4.4-4.4L12 11.2V6h2v6h5.2l-1.6 1.6 4.4 4.4L12.8 20.8 12 20l-1.6 1.6z"
                    />
                  </svg>
                  <span class="text-xs">{{ event.time }}</span>
                </div>

                <div v-if="event.views" class="flex items-center text-red-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 mr-1 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                    />
                  </svg>
                  <span class="text-xs">{{ event.views }} Views</span>
                </div>
              </div>

              <div
                v-if="event.location"
                class="flex items-center text-sm text-green-700 mb-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 mr-1 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  />
                </svg>
                <span class="font-medium text-xs">{{ event.location }}</span>
              </div>

              <button
                class="w-full mt-4 bg-[#004D33] text-white px-4 py-3 rounded-lg font-medium hover:bg-[#006644] transition"
              >
                {{ event.buttonText }}
              </button>
            </div>
          </div>
        </div>
      </section>
      <section class="mt-10 mb-16 max-w-6xl mx-auto px-4">
        <h3 class="text-2xl font-sans font-bold text-[#333] text-center mb-10">
          Topics that might interest you
        </h3>

        <div class="grid sm:grid-cols-2 gap-6">
          <div
            v-for="(topic, index) in topics"
            :key="index"
            class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden p-0"
          >
            <div class="grid grid-cols-1 sm:grid-cols-5 h-full">
              <div
                class="relative col-span-2 h-full min-h-[150px] flex flex-col justify-end p-4 bg-gray-50 rounded-l-2xl border-r-2 border-dashed border-gray-200"
              >
                <img
                  :src="topic.visualImage"
                  :alt="'Visual for ' + topic.tag"
                  class="absolute inset-0 w-full h-full object-cover"
                  aria-hidden="true"
                />
                <div
                  class="absolute inset-0 flex items-center justify-center opacity-70"
                ></div>

                <span
                  class="text-xs font-semibold px-3 py-1 text-white rounded-lg shadow-md z-10"
                  :style="{ backgroundColor: topic.tagColor || '#ff6600' }"
                >
                  {{ topic.tag || "Public Health Stories" }}
                </span>
              </div>

              <div class="col-span-3 p-5 flex flex-col justify-between">
                <div>
                  <div
                    class="flex items-center space-x-4 text-xs font-medium mb-3"
                  >
                    <span class="flex items-center text-orange-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4 mr-1 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 18H5V8h14v13z"
                        />
                      </svg>
                      {{ topic.date || "October 10, 2025" }}
                    </span>
                    <span class="flex items-center text-orange-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4 mr-1 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                        />
                      </svg>
                      {{ topic.comments || "0 Comments" }}
                    </span>
                  </div>

                  <p class="text-sm text-gray-700 mb-2">
                    {{ topic.description }}
                  </p>
                </div>

                <a
                  href="#"
                  class="text-sm font-medium text-green-700 hover:text-green-800 transition self-start mt-2"
                >
                  Read more...
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import UserSidebar from "@/components/layout/UserSidebar.vue";

const newsletters = [
  {
    image: new URL("@/assets/event.png", import.meta.url).href,
    title: "Q4 2025 ISSUE IS AVAILABLE!",
    description:
      "Catch up on the latest insights, stories, and updates from our HFN community. Stay informed and inspired.",
    buttonText: "Read Newsletter",
  },
  {
    image: new URL("@/assets/event.png", import.meta.url).href,
    title: "Q3 2025 RECAP",
    description:
      "Highlights from our previous edition. Learn what’s been trending in the HFN circle.",
    buttonText: "View Now",
  },
];

const events = [
  {
    image: new URL("@/assets/event.png", import.meta.url).href,
    title: "HFN Medical Summit",
    description: "Join experts discussing healthcare innovation and impact.",
    buttonText: "Register Now",
    tag: "Programs & Initiatives",
    date: "October 10, 2025",
    time: "10 am",
    location: "No 12 Ifeanyi Str, Ikeja Lagos",
  },
  {
    image: new URL("@/assets/event.png", import.meta.url).href,
    title: "Health Awareness Campaign",
    description:
      "Be part of our initiative to spread wellness across communities.",
    buttonText: "Join Us",
    tag: "Programs & Initiatives",
    date: "October 10, 2025",
    time: "10 am",
    location: "No 12 Ifeanyi Str, Ikeja Lagos",
  },
  {
    image: new URL("@/assets/event.png", import.meta.url).href,
    title: "Women in Health Forum",
    description:
      "Empowering women professionals to lead in healthcare and beyond.",
    buttonText: "Learn More",
    tag: "Programs & Initiatives",
    date: "October 10, 2025",
    time: "10 am",
    location: "No 12 Ifeanyi Str, Ikeja Lagos",
  },
];

const topics = [
  {
    title: "Understanding Health Policies",
    description:
      "Explore how public health policies shape healthcare systems today.",
    buttonText: "Apply Now",
    tagColor: "#ff6600",
    tag: "Public Health Stories",
    date: "October 10, 2025",
    comments: "0 Comments",
    visualImage: new URL("@/assets/courses.jpg", import.meta.url).href,
  },
  {
    title: "Nutrition and Wellness",
    description:
      "Simple guides to a healthier life through balanced nutrition.",
    buttonText: "Read More",
    tagColor: "#ff6600",
    tag: "Public Health Stories",
    date: "October 10, 2025",
    comments: "0 Comments",
    visualImage: new URL("@/assets/courses.jpg", import.meta.url).href,
  },
  {
    title: "HFN Community Highlights",
    description:
      "Catch up with stories and achievements from our vibrant community.",
    buttonText: "View Stories",
    tagColor: "#ff6600",
    tag: "Public Health Stories",
    date: "October 10, 2025",
    comments: "0 Comments",
    visualImage: new URL("@/assets/courses.jpg", import.meta.url).href,
  },
  {
    title: "Understanding Health Policies",
    description:
      "Explore how public health policies shape healthcare systems today.",
    buttonText: "Apply Now",
    tagColor: "#ff6600",
    tag: "Public Health Stories",
    date: "October 10, 2025",
    comments: "0 Comments",
    visualImage: new URL("@/assets/courses.jpg", import.meta.url).href,
  },
];
</script>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 10px;
}
</style>
