<script setup>
import SuperAdminSidebar from "@/views/SuperAdmin/SuperAdminSidebar.vue";
import { computed } from "vue";

import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Eye,
  MoreVertical,
  Search,
  Trash2,
} from "lucide-vue-next";
import { ref } from "vue";

const courseTabs = ref(["Published", "Drafts", "Archived"]);
const currentTab = ref("Published");

const statCards = [
  {
    title: "Total Members",
    value: "13",
    change: "13% Increase",
    changeColor: "text-[#00cc66]",
  },
  {
    title: "Total New Members",
    value: "7",
    change: "13% Increase",
    changeColor: "text-[#00cc66]",
  },
  {
    title: "Total Corporate",
    value: "13",
    change: "–5% Decrease",
    changeColor: "text-red-500",
  },
  {
    title: "Total Individual",
    value: "4.5",
    change: "10% Increase",
    changeColor: "text-gray-500",
  },
  {
    title: "Multinationals",
    value: "23",
    change: "3% Increase",
    changeColor: "text-[#00cc66]",
  },
  {
    title: "Diaspora",
    value: "7",
    change: "13% Increase",
    changeColor: "text-[#00cc66]",
  },
  {
    title: "Health Guardians",
    value: "13",
    change: "–5% Decrease",
    changeColor: "text-red-500",
  },
  {
    title: "Total Associations",
    value: "4.5",
    change: "10% Increase",
    changeColor: "text-gray-500",
  },
];

const publishedCourses = ref([
  {
    id: 1,
    title: "Ruthie Bolade",
    enrollments: "Individual",
    completion: "November 11 2024",
    lastUpdate: "Active",
  },
  {
    id: 2,
    title: "Bidemi Joy",
    enrollments: "Individual",
    completion: "November 11 2024",
    lastUpdate: "Active",
  },
]);

const draftCourses = ref([
  {
    id: 3,
    title: "Kola Bidemi",
    enrollments: "Individual",
    completion: "November 11 2024",
    lastUpdate: "Active",
  },
  {
    id: 4,
    title: "Fagbiyi Femi",
    enrollments: "Individual",
    completion: "November 11 2024",
    lastUpdate: "Inactive",
  },
]);

const archivedCourses = ref([
  {
    id: 5,
    title: "Fola Abayomi",
    enrollments: "Individual",
    completion: "November 11 2024",
    lastUpdate: "Inactive",
  },
  {
    id: 6,
    title: "Adebiyi Boni",
    enrollments: "Individual",
    completion: "November 11 2024",
    lastUpdate: "Active",
  },
]);

const activeCourses = computed(() => {
  if (currentTab.value === "Published") return publishedCourses.value;
  if (currentTab.value === "Drafts") return draftCourses.value;
  if (currentTab.value === "Archived") return archivedCourses.value;
  return [];
});

const handleAction = (action, courseId) => {
  console.log(`${action} course ID: ${courseId}`);
  alert(`${action} action triggered for Course ID: ${courseId}`);
};

const currentPage = ref(1);
const totalPages = 2;

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages) {
    currentPage.value = page;
  }
};
</script>

<template>
  <div class="flex min-h-screen font-sans">
    <SuperAdminSidebar />
    <main class="flex-1 p-8 overflow-auto bg-white">
      <!-- Breadcrumbs -->
      <div class="text-sm text-gray-500 mb-6">
        <span class="text-[#006633]">Home</span> > Members
      </div>

      <div class="text-center mb-8">
        <h1
          class="text-3xl font-bold text-gray-800 mb-6 border-b border-[#006633]/30 inline-block pb-3"
        >
          Members
        </h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div
            v-for="(stat, index) in statCards"
            :key="stat.title"
            class="flex-1 p-6 text-center bg-white shadow-lg border-y border-[#00cc66] relative overflow-hidden group transition-all duration-300"
            :class="{
              'rounded-tl-4xl rounded-br-4xl': index === 0,
              'rounded-tl-4xl rounded-br-4xl': index === statCards.length - 1,

              'rounded-tl-4xl rounded-br-4xl': true,
            }"
          >
            <div class="absolute inset-y-0 left-0 w-1 bg-[#00cc66]"></div>
            <div class="absolute inset-y-0 right-0 w-1 bg-[#00cc66]"></div>

            <p class="text-gray-600 text-sm mb-1">{{ stat.title }}</p>

            <div class="text-4xl font-bold text-gray-800 mb-1">
              <span v-if="stat.stars">
                <span class="text-[#ff9900]">★★★★</span
                ><span class="text-gray-300">★</span>
              </span>
              <span v-else>{{ stat.value }}</span>
            </div>

            <p :class="[stat.changeColor, 'text-sm font-medium']">
              {{ stat.change }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div class="flex justify-end mb-6">
          <div class="relative w-full max-w-sm">
            <Search
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00cc66] focus:border-[#00cc66] transition-colors"
            />
          </div>
        </div>

        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr
              class="bg-[#f0fff0] text-gray-700 uppercase text-sm leading-normal border-b border-[#00cc66]/50"
            >
              <th class="py-3 px-3 text-left w-12 rounded-tl-lg">
                <input
                  type="checkbox"
                  class="h-4 w-4 text-[#00cc66] border-gray-300 rounded focus:ring-[#00cc66]"
                />
              </th>
              <th class="py-3 px-3 text-left flex items-center">
                Name
                <MoreVertical
                  class="w-4 h-4 ml-1 text-gray-500 cursor-pointer"
                />
              </th>
              <th class="py-3 px-3 text-left">
                Category
                <MoreVertical
                  class="w-4 h-4 ml-1 text-gray-500 cursor-pointer"
                />
              </th>
              <th class="py-3 px-3 text-left">
                Last Payment
                <MoreVertical
                  class="w-4 h-4 ml-1 text-gray-500 cursor-pointer"
                />
              </th>
              <th class="py-3 px-3 text-left">
                Status
                <MoreVertical
                  class="w-4 h-4 ml-1 text-gray-500 cursor-pointer"
                />
              </th>
              <th class="py-3 px-3 text-center rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody
            class="text-gray-600 text-sm font-light divide-y divide-gray-100"
          >
            <tr
              v-for="course in activeCourses"
              :key="course.id"
              class="hover:bg-[#f9fff9] transition-colors"
            >
              <td class="py-3 px-3 whitespace-nowrap">
                <input
                  type="checkbox"
                  class="h-4 w-4 text-[#00cc66] border-gray-300 rounded focus:ring-[#00cc66]"
                />
              </td>
              <td
                class="py-3 px-3 whitespace-nowrap font-medium text-[#006633]"
              >
                {{ course.title }}
              </td>
              <td class="py-3 px-3">
                {{ course.enrollments !== null ? course.enrollments : "-" }}
              </td>
              <td class="py-3 px-3">
                <span
                  :class="{
                    'text-green-600 font-semibold':
                      course.completion.includes('100'),
                    'text-orange-500':
                      parseFloat(course.completion) < 50 &&
                      course.completion !== '-',
                  }"
                >
                  {{ course.completion }}
                </span>
              </td>
              <td class="py-3 px-3">
                {{ course.lastUpdate }}
              </td>
              <td class="py-3 px-3 text-center">
                <div class="flex item-center justify-center space-x-2">
                  <button
                    @click="handleAction('View', course.id)"
                    class="w-6 h-6 transform hover:text-blue-500 hover:scale-110 transition-transform p-0.5"
                  >
                    <Eye
                      class="w-full h-full text-gray-500 hover:text-blue-500"
                    />
                  </button>
                  <button
                    @click="handleAction('Edit', course.id)"
                    class="w-6 h-6 transform hover:text-green-500 hover:scale-110 transition-transform p-0.5"
                  >
                    <Edit2
                      class="w-full h-full text-gray-500 hover:text-green-500"
                    />
                  </button>
                  <button
                    @click="handleAction('Delete', course.id)"
                    class="w-6 h-6 transform hover:text-red-500 hover:scale-110 transition-transform p-0.5"
                  >
                    <Trash2
                      class="w-full h-full text-gray-500 hover:text-red-500"
                    />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="flex justify-end items-center mt-6 text-sm text-gray-600">
          <span class="mr-4">Page {{ currentPage }} of {{ totalPages }}</span>
          <div class="flex space-x-2">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              class="p-2 border rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft class="w-4 h-4" />
            </button>
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              :class="{
                'opacity-50 cursor-not-allowed': currentPage === totalPages,
              }"
              class="p-2 border rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
</style>
