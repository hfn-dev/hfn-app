<script setup>
import courses from '@/assets/courses.jpg';
import student from '@/assets/student.jpg';
import AdminSidebar from '@/components/layout/AdminSidebar.vue';
import { computed, ref } from 'vue';

const DARK_GREEN = '#004d33';
const LIGHT_GREEN = '#f2f9f3';

const activeCourses = ref([
  {
    id: 1,
    instructor: 'Kanu Nwankwo',
    title: 'Naturopathy',
    lessonsCompleted: 2,
    totalLessons: 54,
    progress: 2, 
    image: courses,
  },
  {
    id: 2,
    instructor: 'Kanu Nwankwo',
    title: 'Naturopathy',
    lessonsCompleted: 30,
    totalLessons: 60,
    progress: 50, 
    image: courses,
  },
  {
    id: 3,
    instructor: 'Kanu Nwankwo',
    title: 'Naturopathy',
    lessonsCompleted: 50,
    totalLessons: 99,
    progress: 50, 
    image: courses,
  },
  {
    id: 4,
    instructor: 'Kanu Nwankwo',
    title: 'Naturopathy',
    lessonsCompleted: 2,
    totalLessons: 54,
    progress: 2,
    image: courses,
  },
  {
    id: 5,
    instructor: 'Kanu Nwankwo',
    title: 'Naturopathy',
    lessonsCompleted: 20,
    totalLessons: 54,
    progress: 37,
    image: courses,
  },
]);

const completedCourses = ref([
  {
    id: 101,
    instructor: 'Kanu Nwankwo',
    title: 'Naturopathy',
    lessonsCompleted: 54,
    totalLessons: 54,
    progress: 100,
    image: courses,
  },
  {
    id: 102,
    instructor: 'Kanu Nwankwo',
    title: 'Naturopathy',
    lessonsCompleted: 54,
    totalLessons: 54,
    progress: 100,
    image: courses,
  },
]);

const activePage = ref(1);
const activePerPage = 5; 
const totalActivePages = computed(() =>
  Math.ceil(activeCourses.value.length / activePerPage)
);

const paginatedActiveCourses = computed(() => {
  const start = (activePage.value - 1) * activePerPage;
  const end = start + activePerPage;
  return activeCourses.value.slice(start, end);
});

const completedPage = ref(1);
const completedPerPage = 3;
const totalCompletedPages = computed(() =>
  Math.ceil(completedCourses.value.length / completedPerPage)
);

const paginatedCompletedCourses = computed(() => {
  const start = (completedPage.value - 1) * completedPerPage;
  const end = start + completedPerPage;
  return completedCourses.value.slice(start, end);
});

const goToActivePage = (page) => {
  if (page >= 1 && page <= totalActivePages.value) {
    activePage.value = page;
  }
};

const goToCompletedPage = (page) => {
  if (page >= 1 && page <= totalCompletedPages.value) {
    completedPage.value = page;
  }
};


</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <div class="flex flex-grow">
      <AdminSidebar class="hidden md:flex" />

      <main class="flex-grow p-4 md:p-8 lg:p-12">
        <!-- Header & Breadcrumbs -->
        <div class="flex justify-center w-full items-center mb-8">
          <div class="w-full">
            <div class="mb-16 w-full">
              <div
                class="w-full px-4 py-4 sm:px-6 rounded-2xl border-2 border-green-100 bg-white shadow-md text-center"
              >
                <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900">
                  My Learning
                </h2>
              </div>
            </div>
          </div>
        </div>

        <!-- Active Courses Section -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Active Courses</h2>

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl"
          >
            <!-- Course Card -->
            <div
              v-for="course in paginatedActiveCourses"
              :key="course.id"
              class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform transition-all duration-300 hover:shadow-xl"
            >
              <!-- Course Image -->
              <div class="relative w-full h-36 bg-gray-100">
                <img
                  :src="course.image"
                  alt="Course Thumbnail"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute bottom-0 left-4 transform translate-y-1/2 p-1 bg-white rounded-full shadow-lg"
                >
                  <img
                    :src="student"
                    alt="Instructor"
                    class="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              </div>

              <!-- Course Details -->
              <div class="p-4 pt-8 flex flex-col flex-grow">
                <p class="text-xs text-gray-500 font-medium">Kanu Nwankwo</p>
                <p class="text-xs text-gray-500 mb-2">Professor of Medicine</p>
                <h3 class="text-lg font-bold text-gray-800 mb-4">
                  {{ course.title }}
                </h3>

                <!-- Progress Bar / Status -->
                <div v-if="course.progress !== 100" class="mb-4">
                  <div class="h-1 bg-gray-200 rounded-full mb-1">
                    <div
                      class="h-1 rounded-full"
                      :style="{
                        width: course.progress + '%',
                        backgroundColor: DARK_GREEN,
                      }"
                    ></div>
                  </div>
                  <p class="text-xs text-gray-500">
                    Lesson {{ course.lessonsCompleted }} of
                    {{ course.totalLessons }} | {{ course.progress }}% complete
                  </p>
                </div>

                <p v-else class="text-sm text-gray-600 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    :style="{ color: DARK_GREEN }"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  100% complete
                </p>

                <!-- Action Button -->
                <button
                  class="mt-auto py-2 rounded-lg font-semibold transition duration-200"
                  :style="
                    course.progress === 100
                      ? {
                          backgroundColor: LIGHT_GREEN,
                          color: DARK_GREEN,
                          border: '1px solid #004d33',
                        }
                      : { backgroundColor: DARK_GREEN, color: 'white' }
                  "
                >
                  {{ course.progress === 100 ? 'Review Course' : 'Continue' }}
                </button>
              </div>
            </div>
            <!-- End Course Card -->
          </div>

          <!-- Pagination for Active Courses -->
          <div
            v-if="totalActivePages > 1"
            class="flex justify-center items-center mt-8 space-x-4"
          >
            <button
              @click="goToActivePage(activePage - 1)"
              :disabled="activePage === 1"
              class="text-gray-500 disabled:opacity-50 hover:text-gray-700 p-2 rounded-full transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 transform rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            <span class="text-sm text-gray-600">
              Page {{ activePage }} of {{ totalActivePages }}
            </span>
            <button
              @click="goToActivePage(activePage + 1)"
              :disabled="activePage === totalActivePages"
              class="text-gray-500 disabled:opacity-50 hover:text-gray-700 p-2 rounded-full transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- Completed Courses Section -->
        <div>
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            Completed Courses
          </h2>

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl"
          >
            <!-- Course Card -->
            <div
              v-for="course in paginatedCompletedCourses"
              :key="course.id"
              class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform transition-all duration-300 hover:shadow-xl"
            >
              <!-- Course Image -->
              <div class="relative w-full h-36 bg-gray-100">
                <img
                  :src="course.image"
                  alt="Course Thumbnail"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute bottom-0 left-4 transform translate-y-1/2 p-1 bg-white rounded-full shadow-lg"
                >
                  <img
                    :src="student"
                    alt="Instructor"
                    class="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              </div>

              <!-- Course Details -->
              <div class="p-4 pt-8 flex flex-col flex-grow">
                <p class="text-xs text-gray-500 font-medium">Kanu Nwankwo</p>
                <p class="text-xs text-gray-500 mb-2">Professor of Medicine</p>
                <h3 class="text-lg font-bold text-gray-800 mb-4">
                  {{ course.title }}
                </h3>

                <!-- Progress Bar / Status -->
                <div v-if="course.progress !== 100" class="mb-4">
                  <div class="h-1 bg-gray-200 rounded-full mb-1">
                    <div
                      class="h-1 rounded-full"
                      :style="{
                        width: course.progress + '%',
                        backgroundColor: DARK_GREEN,
                      }"
                    ></div>
                  </div>
                  <p class="text-xs text-gray-500">
                    Lesson {{ course.lessonsCompleted }} of
                    {{ course.totalLessons }} | {{ course.progress }}% complete
                  </p>
                </div>

                <!-- Completed Text -->
                <p v-else class="text-sm text-gray-600 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    :style="{ color: DARK_GREEN }"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  100% complete
                </p>

                <!-- Action Button -->
                <button
                  class="mt-auto py-2 rounded-lg font-semibold transition duration-200"
                  :style="
                    course.progress === 100
                      ? {
                          backgroundColor: LIGHT_GREEN,
                          color: DARK_GREEN,
                          border: '1px solid #004d33',
                        }
                      : { backgroundColor: DARK_GREEN, color: 'white' }
                  "
                >
                  {{ course.progress === 100 ? 'Review Course' : 'Continue' }}
                </button>
              </div>
            </div>
            <!-- End Course Card -->
          </div>

          <!-- Pagination for Completed Courses -->
          <div
            v-if="totalCompletedPages > 1"
            class="flex justify-center items-center mt-8 space-x-4"
          >
            <button
              @click="goToCompletedPage(completedPage - 1)"
              :disabled="completedPage === 1"
              class="text-gray-500 disabled:opacity-50 hover:text-gray-700 p-2 rounded-full transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 transform rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            <span class="text-sm text-gray-600">
              Page {{ completedPage }} of {{ totalCompletedPages }}
            </span>
            <button
              @click="goToCompletedPage(completedPage + 1)"
              :disabled="completedPage === totalCompletedPages"
              class="text-gray-500 disabled:opacity-50 hover:text-gray-700 p-2 rounded-full transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped></style>
