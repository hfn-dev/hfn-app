<script setup>
import courseApi from '@/api/learningModule.js';
import SuperAdminSidebar from '@/views/SuperAdmin/SuperAdminSidebar.vue';
import { computed, onMounted, watch } from 'vue';
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
import { ref } from 'vue';

const courseTabs = ref(['Published', 'Drafts', 'Archived', 'Approvals']);
const currentTab = ref('Published');
const router = useRouter();
const courses = ref([]);
const loading = ref(false);
const searchQuery = ref('');

const tabStatusMap = {
  Published: 'published',
  Drafts: 'draft',
  Archived: 'archived',
  Approvals: 'pending',
};

const fetchCourses = async () => {
  loading.value = true;

  try {
    const status = tabStatusMap[currentTab.value];

    const response = await courseApi.listCourses({
      status,
      search: searchQuery.value,
      page: currentPage.value,
    });

    courses.value = response.results || response.data || [];
  } finally {
    loading.value = false;
  }
};

const activeCourses = computed(() => {
  if (!searchQuery.value) return courses.value;

  return courses.value.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const isApprovalTab = computed(() => currentTab.value === 'Approvals');

const handleAction = async (action, course) => {
  switch (action) {
    case 'View':
      router.push(`/superadmin/courses/${course.slug}`);
      break;

    case 'Edit':
      router.push(`/superadmin/courses/${course.slug}/edit`);
      break;

    case 'Delete':
      if (!confirm('Delete this course?')) return;
      await courseApi.deleteCourse(course.id);
      fetchCourses();
      break;

    case 'Approve':
      await courseApi.approveCourse(course.id);
      fetchCourses();
      break;
  }
};

const currentPage = ref(1);
const totalPages = 2;

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages) {
    currentPage.value = page;
  }
};

watch(searchQuery, fetchCourses);
watch(currentTab, () => {
  currentPage.value = 1;
  fetchCourses();
});

onMounted(fetchCourses);
</script>

<template>
  <div class="flex min-h-screen font-sans">
    <SuperAdminSidebar />
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
            to="/superadmin/create-course"
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

              <!-- If APPROVAL tab -->
              <template v-if="isApprovalTab">
                <th class="py-3 px-3 text-left">Created By</th>
                <th class="py-3 px-3 text-left">Creation Date</th>
                <th class="py-3 px-3 text-center rounded-tr-lg">Action</th>
              </template>

              <!-- Otherwise normal tabs -->
              <template v-else>
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
              </template>

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
              <td class="py-3 px-3">
                <input type="checkbox" class="h-4 w-4 text-[#00cc66]" />
              </td>

              <td class="py-3 px-3 font-medium text-[#006633]">
                {{ course.title }}
              </td>

              <!-- APPROVAL TAB body -->
              <template v-if="isApprovalTab">
                <td class="py-3 px-3">
                  {{ course.created_by?.name }}
                </td>
                <td class="py-3 px-3">
                  {{ course.created_at }}
                </td>
                <td class="py-3 px-3">
                  <button
                    @click="handleAction('Approve', course)"
                    class="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                </td>
              </template>

              <!-- NORMAL TAB body -->
              <template v-else>
                <td class="py-3 px-3">
                  {{ course.enrollments_count ?? '-' }}
                </td>
                <td class="py-3 px-3">
                  <span
                    :class="{
                      'text-green-600 font-semibold':
                        course.completion?.includes('100'),
                      'text-orange-500':
                        parseFloat(course.completion) < 50 &&
                        course.completion !== '-',
                    }"
                  >
                    {{ course.completion_rate ?? '-' }}
                  </span>
                </td>
                <td class="py-3 px-3">
                  {{ course.updated_at }}
                </td>
              </template>

              <td class="py-3 px-3 text-center">
                <div class="flex item-center justify-center space-x-2">
                  <button
                    @click="handleAction('View', course)"
                    class="w-6 h-6 hover:text-blue-500"
                  >
                    <Eye class="w-full h-full" />
                  </button>
                  <button
                    @click="handleAction('Edit', course)"
                    class="w-6 h-6 hover:text-green-500"
                  >
                    <Edit2 class="w-full h-full" />
                  </button>
                  <button
                    @click="handleAction('Delete', course)"
                    class="w-6 h-6 hover:text-red-500"
                  >
                    <Trash2 class="w-full h-full" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

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
