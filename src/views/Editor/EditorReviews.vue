<script setup>
import {
  ArrowLeft,
  Book,
  ChevronDown,
  Eye,
  Home,
  LifeBuoy,
  LogOut,
  Search,
  Star,
  User,
} from "lucide-vue-next";
import { computed, ref } from "vue";
import EditorSidebar from "./EditorSidebar.vue";

const reviews = ref([
  {
    id: 1,
    title: "Naturopathy 101",
    status: "Published",
    rating: 4.8,
    lastUpdate: "December 28 2024",
  },
  {
    id: 2,
    title: "Health & Wellness Fundamentals",
    status: "Archived",
    rating: 3.5,
    lastUpdate: "December 19 2024",
  },
  {
    id: 3,
    title: "Herbal Infusions Masterclass",
    status: "Published",
    rating: 4.0,
    lastUpdate: "December 19 2024",
  },
  {
    id: 4,
    title: "Nutrition for Athletes",
    status: "Published",
    rating: 3.2,
    lastUpdate: "December 14 2024",
  },
  {
    id: 5,
    title: "Naturopathy 101",
    status: "Published",
    rating: 5.0,
    lastUpdate: "November 19 2024",
  },
  {
    id: 6,
    title: "Health & Wellness Fundamentals",
    status: "Published",
    rating: 2.7,
    lastUpdate: "November 19 2024",
  },
  {
    id: 7,
    title: "Herbal Infusions Masterclass",
    status: "Archived",
    rating: 3.9,
    lastUpdate: "November 11 2024",
  },
  {
    id: 8,
    title: "Nutrition for Athletes",
    status: "Published",
    rating: 4.1,
    lastUpdate: "November 10 2024",
  },
  {
    id: 9,
    title: "Naturopathy 101",
    status: "Published",
    rating: 3.4,
    lastUpdate: "November 9 2024",
  },
  {
    id: 10,
    title: "Health & Wellness Fundamentals",
    status: "Archived",
    rating: 2.5,
    lastUpdate: "December 19 2024",
  },
]);

const mockCourseDetails = {
  title: "Naturopathy 101",
  averageRating: 4.8,
  ratingDistribution: [
    { stars: 5, count: 75, percentage: 75 },
    { stars: 4, count: 21, percentage: 21 },
    { stars: 3, count: 3, percentage: 3 },
    { stars: 2, count: 1, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 },
  ],
  feedback: [
    {
      id: 1,
      user: "Guy Hawkins",
      time: "1 week ago",
      rating: 5,
      comment: "Thank you!",
      avatar: "https://placehold.co/40x40/cccccc/333333?text=GH",
    },
    {
      id: 2,
      user: "Dianne Russell",
      time: "51 mins ago",
      rating: 5,
      comment:
        "This course is just amazing! has great course content, the best practices, and a lot of real-world knowledge. I love the way of giving examples, the best tips by the instructor which are pretty interesting, fun and knowledgeable and I was never getting bored throughout the course.",
      avatar: "https://placehold.co/40x40/f0e68c/333333?text=DR",
    },
    {
      id: 3,
      user: "Eleanor Pena",
      time: "1 days ago",
      rating: 4,
      comment:
        "This course meets more than my expectation and, I made the best investment of time to learn and practice what I am passionate about. Thank you so much to our excellent instructor Fermi!! Highly recommend this course! Take the next step.",
      avatar: "https://placehold.co/40x40/add8e6/333333?text=EP",
    },
    {
      id: 4,
      user: "Eleanor Pena",
      time: "1 days ago",
      rating: 3,
      comment:
        "I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Dr. Obed.",
      avatar: "https://placehold.co/40x40/add8e6/333333?text=EP",
    },
    {
      id: 5,
      user: "Eleanor Pena",
      time: "1 days ago",
      rating: 4,
      comment:
        "I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Dr. Obed.",
      avatar: "https://placehold.co/40x40/add8e6/333333?text=EP",
    },
  ],
};

const currentView = ref("list"); 
const selectedCourse = ref(mockCourseDetails);

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 8;


const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 <= 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starFilled = "★";
  const starHalf = "✭";
  const starEmpty = "☆";

  let starsHtml = "";
  starsHtml += `<span class="text-orange-400">${starFilled.repeat(
    fullStars
  )}</span>`;
  if (hasHalfStar) {
    starsHtml += `<span class="text-orange-400">${starHalf}</span>`;
  }
  starsHtml += `<span class="text-gray-300">${starEmpty.repeat(
    emptyStars
  )}</span>`;

  return starsHtml;
};

const filteredReviews = computed(() => {
  return reviews.value.filter((review) =>
    review.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredReviews.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredReviews.value.length / itemsPerPage);
});

const viewReviewDetails = (review) => {
  selectedCourse.value = {
    ...mockCourseDetails,
    title: review.title, 
    averageRating: review.rating,
  };
  currentView.value = "details";
};

const goBackToList = () => {
  currentView.value = "list";
  searchQuery.value = "";
  currentPage.value = 1;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<template>
  <div class="flex min-h-screen font-sans">
    <EditorSidebar />
    <!-- Main Content Area -->
    <main class="flex-1 p-8 overflow-auto bg-white">
      <!-- Breadcrumbs & Header -->
      <div class="text-sm text-gray-500 mb-6">
        <span class="text-[#006633]">Home</span> >
        <span v-if="currentView === 'list'" class="text-gray-700 font-medium"
          >Reviews</span
        >
        <span v-else>
          <button
            @click="goBackToList"
            class="text-[#006633] hover:underline flex items-center"
          >
            Reviews
          </button>
          >
          <span class="text-gray-700 font-medium">{{
            selectedCourse.title
          }}</span>
        </span>
      </div>

      <h1
        class="text-4xl text-center font-bold text-gray-800 mb-8 border-b border-gray-200 pb-4"
      >
        Reviews:
        {{ currentView === "details" ? selectedCourse.title : "Reviews" }}
      </h1>
      <div
        v-if="currentView === 'list'"
        class="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
      >
        <!-- Search Bar -->
        <div
          class="mb-6 flex items-center max-w-sm border border-gray-300 rounded-lg overflow-hidden bg-white"
        >
          <Search class="w-5 h-5 text-gray-400 ml-3 flex-shrink-0" />
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search for reviews or courses..."
            class="w-full p-3 text-gray-700 focus:outline-none focus:ring-0 border-none"
          />
        </div>

        <!-- Reviews Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <input
                    type="checkbox"
                    class="rounded text-[#006633] focus:ring-[#00cc66]"
                  />
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div class="flex items-center">
                    Course Title
                    <ChevronDown class="w-3 h-3 ml-1" />
                  </div>
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div class="flex items-center">
                    Status
                    <ChevronDown class="w-3 h-3 ml-1" />
                  </div>
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div class="flex items-center">
                    <span
                      class="border-b-2 border-[#00cc66] pb-0.5 inline-flex items-center"
                    >
                      Course Rating
                    </span>
                    <ChevronDown class="w-3 h-3 ml-1 text-gray-500" />
                  </div>
                </th>

                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div class="flex items-center">
                    Last Update
                    <ChevronDown class="w-3 h-3 ml-1" />
                  </div>
                </th>
                <th
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="review in paginatedReviews"
                :key="review.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-4 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    class="rounded text-[#006633] focus:ring-[#00cc66]"
                  />
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {{ review.title }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="{
                      'bg-green-100 text-green-800':
                        review.status === 'Published',
                      'bg-yellow-100 text-yellow-800':
                        review.status === 'Archived',
                    }"
                    class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  >
                    {{ review.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    v-html="renderStars(review.rating)"
                    class="text-xl"
                  ></span>
                  <span class="ml-2 text-xs font-medium text-gray-700"
                    >({{ review.rating }})</span
                  >
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ review.lastUpdate }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium"
                >
                  <button
                    @click="viewReviewDetails(review)"
                    class="text-gray-500 hover:text-[#006633] p-1 rounded-full hover:bg-gray-100 transition-colors"
                    title="View Review Details"
                  >
                    <Eye class="w-5 h-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          class="pt-4 flex justify-between items-center text-sm font-medium text-gray-600"
        >
          <span class="text-gray-500"
            >Page {{ currentPage }} of {{ totalPages }}</span
          >

          <div class="flex items-center">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              class="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors mr-2"
            >
              <ArrowLeft class="w-4 h-4 inline-block mr-1" /> Previous
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              :class="{
                'opacity-50 cursor-not-allowed': currentPage === totalPages,
              }"
              class="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Next
              <ArrowLeft class="w-4 h-4 inline-block ml-1 rotate-180" />
            </button>
          </div>
        </div>
      </div>

     
      <div v-if="currentView === 'details'" class="space-y-8">
        <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 class="text-xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-6">
            Course Rating
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <!-- Average Rating Box -->
            <div
              class="flex flex-col items-center justify-center space-y-2 p-6 bg-white rounded-xl border border-gray-200 shadow-sm w-full max-w-xs mx-auto md:mx-0"
            >
              <div class="text-7xl font-extrabold text-[#006633]">
                {{ selectedCourse.averageRating.toFixed(1) }}
              </div>
              <div
                v-html="renderStars(selectedCourse.averageRating)"
                class="text-3xl"
              ></div>
              <div class="text-base text-gray-600">Course Rating</div>
            </div>
            <div class="space-y-5 pt-4 md:pt-0">
              <div
                v-for="dist in selectedCourse.ratingDistribution"
                :key="dist.stars"
                class="flex items-center"
              >
                <!-- Star Count -->
                <div
                  class="w-49 flex-shrink-0 text-sm font-medium text-gray-700 flex items-center gap-x-2"
                >
                  <span
                    v-html="renderStars(dist.stars)"
                    class="text-xl flex space-x-1"
                  ></span>
                  <span>{{ dist.stars }} Star Rating</span>
                </div>

                <!-- Progress Bar -->
                <div
                  class="flex-1 mx-4 h-2 bg-pink-50 rounded-full overflow-hidden"
                >
                  <div
                    class="h-full bg-[#ff9900] transition-all duration-500"
                    :style="{ width: `${dist.percentage}%` }"
                  ></div>
                </div>

                <!-- Percentage -->
                <div class="w-10 text-right text-sm font-medium text-gray-600">
                  {{ dist.percentage }}%
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Students Feedback Row -->
        <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div class="flex justify-between items-center border-b border-gray-100 pb-2 mb-6">
            <h2 class="text-xl font-semibold text-gray-800">
              Students Feedback
            </h2>
            <select
              class="p-2 border border-gray-300 rounded-lg text-sm bg-white focus:border-[#00cc66] focus:ring-[#00cc66]"
            >
              <option value="5">5 Star Rating</option>
              <option value="4">4 Star Rating</option>
              <option value="3">3 Star Rating</option>
              <option value="2">2 Star Rating</option>
              <option value="1">1 Star Rating</option>
              <option value="all">All Ratings</option>
            </select>
          </div>

          <!-- Individual Feedback Entries -->
          <div class="space-y-6">
            <div
              v-for="feedback in selectedCourse.feedback"
              :key="feedback.id"
              class="flex space-x-4 border-b border-gray-100 pb-4 last:border-b-0"
            >
              <!-- Avatar -->
              <img
                :src="feedback.avatar"
                :alt="`${feedback.user} Avatar`"
                class="w-10 h-10 rounded-full object-cover flex-shrink-0"
                onerror="this.onerror=null;this.src='https://placehold.co/40x40/f1f1f1/888888?text=U'"
              />

              <!-- Content -->
              <div class="flex-1">
                <div class="flex justify-between items-start mb-1">
                  <span class="font-bold text-gray-800">{{
                    feedback.user
                  }}</span>
                  <span class="text-xs text-gray-500">{{ feedback.time }}</span>
                </div>
                <div class="mb-2">
                  <span
                    v-html="renderStars(feedback.rating)"
                    class="text-lg"
                  ></span>
                </div>
                <p class="text-gray-600 leading-relaxed text-sm">
                  {{ feedback.comment }}
                </p>
              </div>
            </div>
          </div>

          <!-- Feedback Pagination -->
          <div
            class="pt-4 flex justify-between items-center text-sm font-medium text-gray-600"
          >
            <span class="text-gray-500">Page 1 of 14</span>
            <div class="flex items-center">
              <button
                class="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors mr-2"
              >
                Previous
              </button>
              <button
                class="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Next
                <ArrowLeft class="w-4 h-4 inline-block ml-1 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.text-orange-400 {
  color: #f97316; 
}
.text-gray-300 {
  color: #d1d5db; 
}
.bg-orange-500 {
  background-color: #f97316; 
}
</style>
