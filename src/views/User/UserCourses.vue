<script setup>
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
    title: "Kanu Nwakwo",
    instructor: "Professor of medicine",
    rating: 4.5,
    reviews: 78,
    date: "October 10, 2025",
    price: "Free",
    image: course,
    excerpt:
      "Discover how natural healing methods are reshaping modern health practices — from nutrition to mindfulness and herbal care.",
  },
  {
    title: "Mrs Njide Ndili",
    instructor: "Scientist",
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
                How HFN Learning hub works...
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
            Our Course Tracks
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
                  Take Course
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
            Our Latest Courses
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
                  Take Course
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
</style>
