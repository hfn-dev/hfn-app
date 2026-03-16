<script setup>
import learningModule from '@/api/learningModule';
import courses from '@/assets/courses.jpg';
import student from '@/assets/student.jpg';

import LearnerSidebar from './LearnerSidebar.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const DARK_GREEN = '#004d33';
const LIGHT_GREEN = '#f2f9f3';

const activeTab = ref('courseInfo');
const activeModule = ref(null);

const route = useRoute();
const slug = route.params.slug;
  const courseParam = route.params.slug || route.params.id;

const loading = ref(true);
const completedLessons = ref(new Set());
const course = ref(null);
const modules = ref([]);
const instructor = ref(null);
const similarCourses = ref([]);
const enrollment = ref(null);
const toggleModule = (moduleId) => {
  activeModule.value = activeModule.value === moduleId ? null : moduleId;
};

const isLessonCompleted = (lessonId) => {
  return completedLessons.value?.has(lessonId);
};
const fetchEnrollment = async () => {
  try {
    const res = await learningModule.getEnrollment({
      expand: "course",
    });

    const enrollments = Array.isArray(res.data)
      ? res.data
      : res.data.results || [];

    enrollment.value = enrollments.find(
      (e) => e.course_slug === courseParam || e.course === courseParam
    );
  } catch (error) {
    console.error("Failed to fetch enrollment", error);
  }
};

const fetchCourse = async () => {
  try {
    loading.value = true;
    const data = await learningModule.getCoursesDetails(slug);

    course.value = data.course;
    modules.value = data.modules || [];
    instructor.value = data.instructor;
    similarCourses.value = data.similar_courses || [];
  } catch (err) {
    console.error('Failed to load course', err);
  } finally {
    loading.value = false;
  }
};


const completeLesson = async (lessonId) => {
  try {
    await learningModule.completeLessonMark(lessonId);

completedLessons.value.add(lessonId);
    await fetchEnrollment();

  } catch (error) {
    console.error("Lesson completion failed", error);
  }
};  


const isCompleted = () => {
  return (
    enrollment.value &&
    (enrollment.value.status === "completed" ||
      Number(enrollment.value.progress_percentage) === 100)
  );
};


onMounted(() => {
  fetchCourse();
  fetchEnrollment();
});

</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <div class="flex flex-grow">
      <LearnerSidebar />

      <main class="flex-grow p-4 md:p-8 lg:p-12">
        <div class="mb-8">
          <p class="text-sm text-gray-500 mb-1">
            Home > Course: {{ course?.title }}
          </p>
          <h1 class="text-4xl font-semibold text-gray-800">
            {{ course?.title }}
          </h1>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div class="lg:col-span-2 space-y-8">
            <div
              class="relative bg-black rounded-xl overflow-hidden shadow-lg aspect-video"
            >
              <img
                :src="courses"
                alt="Course Video"
                class="w-full h-full object-cover opacity-50"
              />
              <div
                class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
              >
                <p class="text-white text-xl md:text-2xl font-bold mb-4">
                  Subscribe to continue join the class
                </p>
                <p class="text-gray-200 text-sm mb-6">
                  Become a member of HFN and get exclusive discounts on all
                  courses.
                </p>
                <button
                  class="py-3 px-8 rounded-full font-bold text-white transition duration-200 hover:scale-105 shadow-lg"
                  :style="{ backgroundColor: DARK_GREEN }"
                >
                  Join Now
                </button>
              </div>
              <div
                class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-sm"
              >
                <div class="flex items-center space-x-2">
                  <button
                    class="p-1 rounded-full bg-gray-700/50 hover:bg-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </button>
                  <span>Course Info</span>
                </div>
                <div class="flex items-center space-x-2">
                  <button
                    class="p-1 rounded-full bg-gray-700/50 hover:bg-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect
                        width="20"
                        height="14"
                        x="2"
                        y="7"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M16 21V7"></path>
                      <path d="M8 7v14"></path>
                      <path d="M12 7v14"></path>
                    </svg>
                  </button>
                  <button
                    class="p-1 rounded-full bg-gray-700/50 hover:bg-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M12 5v14"></path>
                      <path d="M5 12h14"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="border-b border-gray-200 mb-6">
              <div class="flex text-lg font-medium">
                <button
                  @click="activeTab = 'courseInfo'"
                  :class="[
                    activeTab === 'courseInfo'
                      ? 'font-bold'
                      : 'text-gray-500 hover:text-gray-900',
                    'py-2 px-4 transition border-b-2',
                  ]"
                  :style="{
                    borderColor:
                      activeTab === 'courseInfo' ? DARK_GREEN : 'transparent',
                    color: activeTab === 'courseInfo' ? DARK_GREEN : '',
                  }"
                >
                  Course Info
                </button>
                <button
                  @click="activeTab = 'resources'"
                  :class="[
                    activeTab === 'resources'
                      ? 'font-bold'
                      : 'text-gray-500 hover:text-gray-900',
                    'py-2 px-4 transition border-b-2',
                  ]"
                  :style="{
                    borderColor:
                      activeTab === 'resources' ? DARK_GREEN : 'transparent',
                    color: activeTab === 'resources' ? DARK_GREEN : '',
                  }"
                >
                  Resources
                </button>
                <button
                  @click="activeTab = 'certificate'"
                  :class="[
                    activeTab === 'certificate'
                      ? 'font-bold'
                      : 'text-gray-500 hover:text-gray-900',
                    'py-2 px-4 transition border-b-2',
                  ]"
                  :style="{
                    borderColor:
                      activeTab === 'certificate' ? DARK_GREEN : 'transparent',
                    color: activeTab === 'certificate' ? DARK_GREEN : '',
                  }"
                >
                  Certificate
                </button>
              </div>
            </div>

            <div v-if="activeTab === 'courseInfo'" class="space-y-8">
              <div>
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                  Course Description
                </h3>
                <p class="text-gray-700 leading-relaxed">
                  {{ course?.description }}
                </p>
              </div>

              <div>
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                  Course Content
                </h3>
                <div v-if="modules.length === 0" class="text-gray-500 p-4">
                  No modules available for this course yet.
                </div>

                <div class="bg-white rounded-xl shadow-md overflow-hidden">
                  <div
                    v-for="module in modules"
                    :key="module.id"
                    class="border-b border-gray-200 last:border-b-0"
                  >
                    <button
                      @click="toggleModule(module.id)"
                      class="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                      <span>{{ module.title }}</span>
                      <svg
                        :class="{ 'rotate-180': activeModule === module.id }"
                        class="w-5 h-5 text-gray-500 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    <div
                      v-if="activeModule === module.id"
                      class="px-6 py-4 bg-gray-50 space-y-2"
                    >
                      <div
                        v-for="(lesson, idx) in module.lessons"
                        :key="idx"
                        class="flex justify-between items-center text-sm text-gray-600"
                      >
                        <span>Lesson {{ idx + 1 }}: {{ lesson.title }}</span>
                        <span>{{ lesson.duration }}</span>
                        <button
  @click="completeLesson(lesson.id)"
  :disabled="isLessonCompleted(lesson.id)"
  class="text-xs px-3 py-1 rounded text-white"
  :class="
    isLessonCompleted(lesson.id)
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-green-600'
  "
>
  {{ isLessonCompleted(lesson.id) ? "Completed" : "Mark Complete" }}
</button>
                      </div>
                      <div
                        v-for="(resource, idx) in module.resources"
                        :key="`res-${idx}`"
                        class="flex justify-between items-center text-sm"
                        :style="{ color: DARK_GREEN }"
                      >
                        <a href="#" class="hover:underline">{{
                          resource.title
                        }}</a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                          ></path>
                          <path
                            d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="activeTab === 'resources'" class="space-y-4">
              <p class="text-gray-700">
                Content for Resources tab will go here.
              </p>
            </div>

            <div v-else-if="activeTab === 'certificate'" class="space-y-6">

  <div v-if="!enrollment" class="text-gray-500">
    You are not enrolled in this course.
  </div>

  <div v-else-if="!isCompleted()" class="text-center py-10">
    <p class="text-lg font-semibold text-gray-700">
      Complete the course to unlock your certificate
    </p>

    <p class="text-sm text-gray-500 mt-2">
      Progress: {{ Math.round(enrollment.progress_percentage) }}%
    </p>
  </div>

  <div v-else class="space-y-6">

    <p class="text-green-700 font-semibold">
      Course completed on
      {{ new Date(enrollment.completed_at).toLocaleDateString() }}
    </p>

    <div class="border rounded-lg overflow-hidden h-[500px]">
      <iframe
        v-if="enrollment.certificate"
        :src="enrollment.certificate"
        class="w-full h-full"
      ></iframe>
    </div>

    <a
      v-if="enrollment.certificate"
      :href="enrollment.certificate"
      download
      class="inline-block px-6 py-3 rounded-lg font-semibold text-white"
      :style="{ backgroundColor: DARK_GREEN }"
    >
      Download Certificate
    </a>

  </div>

</div>
          </div>

          <div class="lg:col-span-1 space-y-8">
            <div
              class="bg-white rounded-xl shadow-lg p-6 border-b-4"
              :style="{ borderBottomColor: DARK_GREEN }"
            >
              <p class="text-3xl font-bold text-gray-800 mb-2">
                ₦{{ course?.discount_price || course?.price }}
              </p>
              <p class="text-xs text-gray-500 mb-4">
                Get 20% off exclusive to HFN members.
              </p>
              <div class="flex space-x-2 mb-4">
                <button
                  class="flex-grow py-3 rounded-lg font-semibold text-white transition duration-200 hover:scale-105 shadow-md"
                  :style="{ backgroundColor: DARK_GREEN }"
                >
                  Buy Now
                </button>
                <button
                  class="flex-grow py-3 rounded-lg font-semibold border transition duration-200 hover:scale-105 shadow-md"
                  :style="{
                    borderColor: DARK_GREEN,
                    color: DARK_GREEN,
                    backgroundColor: LIGHT_GREEN,
                  }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="inline-block w-5 h-5 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                    ></path>
                  </svg>
                  Wishlist
                </button>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-4">
                About the Instructor.
              </h3>
              <div class="flex items-center mb-4">
                <img
                  :src="student"
                  alt="Instructor Avatar"
                  class="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <p class="font-bold text-gray-800">
                    {{ instructor?.name }}
                  </p>
                  <p class="text-sm text-gray-600">{{ instructor.title }}</p>
                </div>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {{ course?.description }}
              </p>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-4">
                What you will learn
              </h3>
              <ul class="space-y-2 text-gray-700 text-sm">
                <li class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 mr-2 flex-shrink-0"
                    :style="{ color: DARK_GREEN }"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Euismod magna id purus eget nunc
                </li>
                <li class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 mr-2 flex-shrink-0"
                    :style="{ color: DARK_GREEN }"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Condimentum blandit rutrum at mauris enim
                </li>
                <li class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 mr-2 flex-shrink-0"
                    :style="{ color: DARK_GREEN }"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  pulvinar diam metus duis. Euismod magna id
                </li>
                <li class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 mr-2 flex-shrink-0"
                    :style="{ color: DARK_GREEN }"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Euismod magna id purus eget nunc
                </li>
              </ul>
            </div>

            <!-- Material Includes -->
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-4">
                Material Includes
              </h3>
              <ul class="space-y-2 text-gray-700 text-sm">
                <li class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 mr-2 flex-shrink-0"
                    :style="{ color: DARK_GREEN }"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  36 hours on-demand video.
                </li>
                <li class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 mr-2 flex-shrink-0"
                    :style="{ color: DARK_GREEN }"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Unlimited access.
                </li>
                <li class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 mr-2 flex-shrink-0"
                    :style="{ color: DARK_GREEN }"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Accessible on mobile and desktop.
                </li>
                <li class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 mr-2 flex-shrink-0"
                    :style="{ color: DARK_GREEN }"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Downloadable additional resources.
                </li>
                <li class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 mr-2 flex-shrink-0"
                    :style="{ color: DARK_GREEN }"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Euismod magna id purus eget nunc
                </li>
              </ul>
            </div>

            <!-- Requirements -->
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-4">Requirements</h3>
              <ul class="space-y-2 text-gray-700 text-sm">
                <li class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 mr-2 flex-shrink-0"
                    :style="{ color: DARK_GREEN }"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Beginner (No prior knowledge required).
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="mt-12">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            Similar courses you might like...
          </h2>
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl"
          >
            <div
              v-for="course in similarCourses"
              :key="course.id"
              class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform transition-all duration-300 hover:shadow-xl"
            >
              <div class="relative w-full h-36 bg-gray-100">
                <img
                  :src="course.thumbnail"
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
              <div class="p-4 pt-8 flex flex-col flex-grow">
                <p class="text-xs text-gray-500 font-medium">
                  {{ course.instructor }}
                </p>
                <p class="text-xs text-gray-500 mb-2">
                  {{ course.profession }}
                </p>
                <h3 class="text-lg font-bold text-gray-800 mb-2">
                  {{ course.title }}
                </h3>
                <div class="flex items-center text-sm text-gray-600">
                  <div class="flex items-center mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 text-yellow-400 mr-1"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polygon
                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                      ></polygon>
                    </svg>
                    <span>{{ course.rating }}</span>
                  </div>
                  <span class="text-xs text-gray-500"
                    >({{ course.reviews }} reviews)</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped></style>
