<script setup>
import learningModule from '@/api/learningModule.js';
import TutorSidebar from '@/views/Tutor/TutorSidebar.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';


import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Eye,
  MoreVertical,
  Plus,
  Search,
  Trash2,
} from 'lucide-vue-next';

const courseTabs = ref(['Published', 'Drafts', 'Archived', 'Approval']);
const currentTab = ref('Published');
const loading = ref(false);
const searchQuery = ref('');
const router = useRouter()
const publishedCourses = ref([]);
const draftCourses = ref([]);
const archivedCourses = ref([]);
const approvalCourses = ref([]);

const activeCourses = computed(() => {
  if (currentTab.value === 'Published') return publishedCourses.value;
  if (currentTab.value === 'Drafts') return draftCourses.value;
  if (currentTab.value === 'Archived') return archivedCourses.value;
  if (currentTab.value === 'Approval') return approvalCourses.value;

  return [];
});

const mapCourse = (course) => ({
  id: course.id,
  slug: course.slug,
  title: course.title,
  enrollments: course.enrollments ?? null,
  completion: course.completion_rate ? `${course.completion_rate}%` : '-',
  lastUpdate: new Date(course.updated_at).toLocaleDateString(),
  approvalStatus: course.approval_status, // Approved | Pending | Declined
  status: course.status, // published | draft | archived | approval
});

const fetchCourses = async () => {
  loading.value = true;
  try {
    const res = await learningModule.getAllCourses({
      status: currentTab.value.toLowerCase(),
      page: currentPage.value,
      search: searchQuery.value,
    });

    const courses = (res.results || res.data || []).map(mapCourse);

    if (currentTab.value === 'Published') publishedCourses.value = courses;
    if (currentTab.value === 'Drafts') draftCourses.value = courses;
    if (currentTab.value === 'Archived') archivedCourses.value = courses;
    if (currentTab.value === 'Approval') approvalCourses.value = courses;
  } catch (err) {
    console.error('Failed to fetch courses', err);
  } finally {
    loading.value = false;
  }
};

const handleAction = async (action, course) => {
  if (action === 'View') {
    router.push(`/tutor/courses/${course.slug}`);
  }

  if (action === 'Edit') {
    router.push(`/tutor/courses/${course.slug}/edit`);
  }

  if (action === 'Delete') {
    await handleDelete(course.slug);
  }
};

const currentPage = ref(1);
const totalPages = 2;

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages) {
    currentPage.value = page;
  }
};

const handleDelete = async (slug) => {
  const confirmDelete = confirm('Are you sure you want to delete this course?');

  if (!confirmDelete) return;

  try {
    await learningModule.deleteCourse(slug);

    publishedCourses.value = publishedCourses.value.filter(
      (c) => c.slug !== slug
    );
    draftCourses.value = draftCourses.value.filter((c) => c.id !== courseId);
    archivedCourses.value = archivedCourses.value.filter(
      (c) => c.slug !== slug
    );
    approvalCourses.value = approvalCourses.value.filter(
      (c) => c.slug !== slug
    );
  } catch (err) {
    console.error('Delete failed', err);
    alert('Failed to delete course');
  }
};

onMounted(fetchCourses);

watch([currentTab, currentPage], () => {
  fetchCourses();
});

watch(searchQuery, () => {
  currentPage.value = 1;
  fetchCourses();
});
</script>

<template>
  <div class="flex min-h-screen font-sans">
    <TutorSidebar />
    <main class="flex-1 p-8 overflow-auto bg-white">
      <!-- Breadcrumbs -->
      <div class="text-sm text-gray-500 mb-6">
        <span class="text-[#006633]">Home</span> > My Courses
      </div>

      <div class="text-center mb-8">
        <h1
          class="text-3xl font-bold text-gray-800 mb-6 border-b border-[#006633]/30 inline-block pb-3"
        >
          My Courses
        </h1>

        <div class="relative flex justify-center items-center">
          <div class="flex border-b border-gray-200 space-x-4">
            <button
              v-for="tab in courseTabs"
              :key="tab"
              @click="currentTab = tab"
              class="py-2 px-4 text-lg font-medium transition-colors"
              :class="{
                'text-[#006633] border-b-2 border-[#00cc66]':
                  currentTab === tab,
                'text-gray-500 hover:text-[#00994d]': currentTab !== tab,
              }"
            >
              {{ tab }}
            </button>
          </div>

          <router-link
            to="/tutor/create-course"
            class="absolute right-0 flex items-center px-4 py-2 bg-[#006633] text-white rounded-lg shadow-md hover:bg-[#00994d] transition-colors font-medium"
          >
            <Plus class="w-5 h-5 mr-2" />
            Create New Course
          </router-link>
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
              v-model="searchQuery"
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
                Course Title
                <MoreVertical
                  class="w-4 h-4 ml-1 text-gray-500 cursor-pointer"
                />
              </th>
              <th class="py-3 px-3 text-left">
                Enrollments
                <MoreVertical
                  class="w-4 h-4 ml-1 text-gray-500 cursor-pointer"
                />
              </th>
              <th class="py-3 px-3 text-left">
                Completion Rate
                <MoreVertical
                  class="w-4 h-4 ml-1 text-gray-500 cursor-pointer"
                />
              </th>
              <th class="py-3 px-3 text-left">
                Last Update
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
              <template v-if="currentTab === 'Approval'">
                <!-- Approval Status Column -->
                <td class="py-3 px-3">
                  <span
                    class="px-3 py-1 font-semibold text-xs rounded-full"
                    :class="{
                      'bg-green-100 text-green-800':
                        course.approvalStatus === 'Approved',
                      'bg-red-100 text-red-800':
                        course.approvalStatus === 'Declined',
                    }"
                  >
                    {{ course.approvalStatus }}
                  </span>
                </td>
                <!-- Blank cell to align with the empty header slot -->
                <td class="py-3 px-3"></td>
              </template>
              <template v-else>
                <!-- Enrollments Column -->
                <td class="py-3 px-3">
                  {{ course.enrollments !== null ? course.enrollments : '-' }}
                </td>
                <!-- Completion Rate Column -->
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
              </template>
              <td class="py-3 px-3">
                {{ course.lastUpdate }}
              </td>
              <td class="py-3 px-3 text-center">
                <div class="flex item-center justify-center space-x-2">
                  <button
                    @click="handleAction('View', course)"
                    class="w-6 h-6 transform hover:text-blue-500 hover:scale-110 transition-transform p-0.5"
                  >
                    <Eye
                      class="w-full h-full text-gray-500 hover:text-blue-500"
                    />
                  </button>
                  <button
                    @click="handleAction('Edit', course)"
                    class="w-6 h-6 transform hover:text-green-500 hover:scale-110 transition-transform p-0.5"
                  >
                    <Edit2
                      class="w-full h-full text-gray-500 hover:text-green-500"
                    />
                  </button>
                  <button
                    @click="handleAction('Delete', course)"
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

<style scoped></style>
