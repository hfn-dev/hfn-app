<script setup>
import { default as courseApi, default as learningModule } from "@/api/learningModule";
import AdminSidebar from "@/views/Admin/AdminSidebar.vue";
import {
  Edit2,
  Eye,
  MoreVertical,
  Plus,
  Search,
  Trash2
} from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toastification';

const toast = useToast();
const courseTabs = ref(["Published", "Drafts", "Archived", "Approvals"]);
const currentTab = ref("Published");
const router = useRouter();
const currentSorting = ref('-enrollment_count');
const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = ref(1);
const totalItems = ref(0);

const searchQuery = ref('');
const publishedCourses = ref([]);
const draftCourses = ref([]);
const archivedCourses = ref([]);
const approvedCourses = ref([]);
const isLoading = ref(false);
const error = ref(null);



const fetchCourses = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const response = await learningModule.getAllCourses({
      page: currentPage.value,
      page_size: pageSize.value,
      search: searchQuery.value,
      ordering: currentSorting.value,
      status:
        currentTab.value === "Published"
          ? "published"
          : currentTab.value === "Drafts"
          ? "draft"
          : "archived",
    });

    const courses = response.data;

    const mappedCourses = courses.map(course => ({
      ...course,
      enrollments: course.enrollment_count || 0,
      completionRate: course.completion_rate || 0,
      averageRating: parseFloat(course.rating_average) || 0,
      totalViews: course.view_count || 0,
      activeStudents: course.enrollment_count || 0,
    }));

    if (currentTab.value === "Published") {
      publishedCourses.value = mappedCourses;
    } else if (currentTab.value === "Drafts") {
      draftCourses.value = mappedCourses;
    } else {
      archivedCourses.value = mappedCourses;
    }

    totalItems.value = mappedCourses.length;
    totalPages.value = Math.ceil(mappedCourses.length / pageSize.value);

  } catch (err) {
    console.error('Fetch courses failed', err);
    error.value = 'Failed to load courses';
  } finally {
    isLoading.value = false;
  }
};

const handleDeleteCourse = async (slug) => {
  if (!confirm("Are you sure you want to delete this course?")) return;

  try {
    await courseApi.deleteCourse(slug);
    toast.success('Course deleted successfully');

    publishedCourses.value = publishedCourses.value.filter(c => c.slug !== slug);
  } catch (err) {
    console.error('Delete course failed', err);
    toast.error('Failed to delete course');
  }
};


// Handle sorting
const updateSorting = (ordering) => {
  currentSorting.value = ordering;
  fetchCourses(ordering);
};

const fetchApprovalCourses = async () => {
  isLoading.value = true;
  try {
    const data = await learningModule.fetchCoursesPendingApproval({
      page: currentPage.value,
      search: searchQuery.value
    });

    approvedCourses.value = data.results;
totalPages.value = Math.ceil(data.count / pageSize.value);
  } finally {
    isLoading.value = false;
  }
};

const approveCourse = async (slug) => {
  try {
    await courseApi.updateCourses(slug, {
      is_approved: true
    });

    toast.success("Course approved");
    fetchApprovalCourses();
  } catch {
    toast.error("Approval failed");
  }
};


const rejectCourse = async (slug) => {
  try {
    await courseApi.updateCourses(slug, {
      is_approved: false,
      is_published: false
    });

    toast.success("Course rejected");
    fetchApprovalCourses();
  } catch {
    toast.error("Rejection failed");
  }
};


// Handle tab changes
const handleTabChange = async (tab) => {
  currentTab.value = tab;
  currentPage.value = 1;
  searchQuery.value = '';

  await fetchActiveTab();
};

const fetchActiveTab = async () => {
  currentPage.value = Math.max(currentPage.value, 1);

  if (currentTab.value === "Approvals") {
    await fetchApprovalCourses();
  } else {
    await fetchCourses();
  }
};


const isApprovalTab = computed(() => currentTab.value === "Approvals");

const activeCourses = computed(() => {
  if (currentTab.value === "Published") return publishedCourses.value;
  if (currentTab.value === "Drafts") return draftCourses.value;
  if (currentTab.value === "Archived") return archivedCourses.value;
  if (currentTab.value === "Approvals") return approvedCourses.value;
  return [];
});

const handleAction = (action, slug) => {
  switch (action) {
    case 'Edit':
      router.push(`/admin/courses/${slug}/edit`);
      break;
    case 'Delete':
      handleDeleteCourse(slug);
      break;
    case 'View':
      router.push(`/admin/courses/${slug}`);
      break;
    case 'Approve':
      toast.success(`Course ${slug} approved`);
      break;
  }
};

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  fetchActiveTab();
};


let searchTimeout = null;

const handleSearch = () => {
  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    currentPage.value = 1;
    fetchActiveTab();
  }, 400);
};

onMounted(() => {
  fetchCourses();
});
</script>

<template>
  <div class="flex min-h-screen font-sans">
    <AdminSidebar />
    <main class="flex-1 p-8 overflow-auto bg-white">
      <div class="text-sm text-gray-500 mb-6">
        <span class="text-[#006633]">Home</span> > My Courses
      </div>

      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-6 border-b border-[#006633]/30 inline-block pb-3">
          My Courses
        </h1>

        <div class="relative flex justify-center items-center">
          <div class="flex border-b border-gray-200 space-x-4">
            <button v-for="tab in courseTabs" :key="tab" @click="handleTabChange(tab)"
              class="py-2 px-4 text-lg font-medium transition-colors" :class="{
                'text-[#006633] border-b-2 border-[#00cc66]':
                  currentTab === tab,
                'text-gray-500 hover:text-[#00994d]': currentTab !== tab,
              }">
              {{ tab }}
            </button>
          </div>

          <router-link to="/admin/create-course"
            class="absolute right-0 flex items-center px-4 py-2 bg-[#006633] text-white rounded-lg shadow-md hover:bg-[#00994d] transition-colors font-medium">
            <Plus class="w-5 h-5 mr-2" />
            Create New Course
          </router-link>
        </div>
      </div>

      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#006633]"></div>
        <p class="mt-4 text-gray-600">Loading course data...</p>
      </div>

      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p class="text-red-600 font-medium">{{ error }}</p>
        <button @click="fetchCourses"
          class="mt-4 px-4 py-2 bg-[#006633] text-white rounded-lg hover:bg-[#00994d] transition-colors">
          Retry
        </button>
      </div>

      <div v-else class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div class="flex justify-between mb-6">
          <div class="flex space-x-2">
            <button @click="updateSorting('-enrollment_count')"
              class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              :class="{ 'bg-[#006633] text-white border-[#006633]': false }">
              Sort by Enrollments
            </button>
            <button @click="updateSorting('completion_rate')"
              class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              :class="{ 'bg-[#006633] text-white border-[#006633]': false }">
              Sort by Completion
            </button>
            <button @click="updateSorting('-average_rating')"
              class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              :class="{ 'bg-[#006633] text-white border-[#006633]': false }">
              Sort by Rating
            </button>
          </div>

          <div class="relative w-full max-w-sm">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input v-model="searchQuery" @keyup.enter="handleSearch" type="text" placeholder="Search courses..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00cc66] focus:border-[#00cc66] transition-colors" />
          </div>
        </div>

        <div v-if="activeCourses.length === 0 && currentTab === 'Published'" class="text-center py-12 text-gray-500">
          <div class="mb-4">
            <Plus class="w-16 h-16 mx-auto text-gray-300" />
          </div>
          <p class="text-lg mb-2">No courses found</p>
          <p class="mb-4">You haven't created any courses yet.</p>
          <router-link to="/admin/create-course"
            class="inline-flex items-center px-4 py-2 bg-[#006633] text-white rounded-lg hover:bg-[#00994d] transition-colors">
            <Plus class="w-4 h-4 mr-2" />
            Create Your First Course
          </router-link>
        </div>

        <div v-else-if="activeCourses.length === 0" class="text-center py-12 text-gray-500">
          <p class="text-lg mb-2">No courses found</p>
          <p>No courses in this category</p>
        </div>


        <table v-else class="min-w-full table-fixed divide-y divide-gray-200">
          <thead>
            <tr class="bg-[#f0fff0] text-gray-700 uppercase text-sm leading-normal border-b border-[#00cc66]/50">
              <th class="py-3 px-3 text-left w-12 rounded-tl-lg">
                <input type="checkbox" class="h-4 w-4 text-[#00cc66] border-gray-300 rounded focus:ring-[#00cc66]" />
              </th>

              <th class="py-3 px-3 text-left">
                <div class="flex items-center gap-1">
                  Course Title
                  <MoreVertical class="w-4 h-4 text-gray-500" />
                </div>
              </th>

              <template v-if="isApprovalTab">
                <th class="py-3 px-3 text-left">Created By</th>
                <th class="py-3 px-3 text-left">Creation Date</th>
              </template>

              <template v-else>
                <th class="py-3 px-3 text-left">
                  <div class="flex items-center gap-1">
                    Enrollments
                    <MoreVertical class="w-4 h-4 text-gray-500" />
                  </div>
                </th>

                <th class="py-3 px-3 text-left">
                  <div class="flex items-center gap-1">
                    Completion Rate
                    <MoreVertical class="w-4 h-4 text-gray-500" />
                  </div>
                </th>

                <th class="py-3 px-3 text-left">
                  <div class="flex items-center gap-1">
                    Average Rating
                    <MoreVertical class="w-4 h-4 text-gray-500" />
                  </div>
                </th>

                <th class="py-3 px-3 text-left">Active Students</th>
              </template>

              <th class="py-3 px-3 text-center rounded-tr-lg w-32">
                Action
              </th>
            </tr>
          </thead>

          <tbody class="text-gray-600 text-sm font-light divide-y divide-gray-100">
            <tr v-for="course in activeCourses" :key="course.id" class="hover:bg-[#f9fff9] transition-colors">
              <td class="py-3 px-3">
                <input type="checkbox" class="h-4 w-4 text-[#00cc66]" />
              </td>

              <td class="py-3 px-3 font-medium text-[#006633]">
                {{ course.title }}
                <div class="text-xs text-gray-500 mt-1">
                  {{ course.totalViews ? `${course.totalViews} views` : 'No views yet' }}
                </div>
              </td>

              <template v-if="isApprovalTab">
                <td class="py-3 px-3">
                  {{ course.createdBy || '-' }}
                </td>
                <td class="py-3 px-3">
                  {{ course.creationDate || '-' }}
                </td>
              </template>

              <template v-else>
                <td class="py-3 px-3 font-semibold">
                  {{ course.enrollments || 0 }}
                </td>

                <td class="py-3 px-3">
                  <div class="flex items-center gap-3">
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                      <div class="bg-green-600 h-2.5 rounded-full"
                        :style="{ width: `${Math.min(course.completionRate || 0, 100)}%` }"></div>
                    </div>
                    <span :class="{
                      'text-green-600 font-semibold': (course.completionRate || 0) >= 80,
                      'text-orange-500': (course.completionRate || 0) < 50,
                      'text-blue-600': (course.completionRate || 0) >= 50 && (course.completionRate || 0) < 80
                    }">
                      {{ course.completion || '0%' }}
                    </span>
                  </div>
                </td>

                <td class="py-3 px-3">
                  <span class="flex items-center gap-1">
                    ⭐ {{ course.averageRating?.toFixed(1) || '0.0' }}
                  </span>
                </td>

                <td class="py-3 px-3">
                  {{ course.activeStudents || 0 }}
                </td>
              </template>

              <td class="py-3 px-3 text-center">
                <div v-if="isApprovalTab" class="flex items-center justify-center gap-2">
                  <button @click="approveCourse(course.slug)"
                    class="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">
                    Approve
                  </button>

                  <button @click="rejectCourse(course.slug)"
                    class="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">
                    Reject
                  </button>
                </div>

                <div v-else class="flex items-center justify-center gap-2">
                  <button @click="handleAction('View', course.slug)" class="w-6 h-6 hover:text-blue-500">
                    <Eye class="w-full h-full" />
                  </button>

                  <button @click="handleAction('Edit', course.slug)" class="w-6 h-6 hover:text-green-500">
                    <Edit2 class="w-full h-full" />
                  </button>

                  <button @click="handleAction('Delete', course.slug)" class="w-6 h-6 hover:text-red-500">
                    <Trash2 class="w-full h-full" />
                  </button>
                </div>
              </td>

            </tr>
          </tbody>
        </table>


        <div v-if="activeCourses.length > 0 && !isApprovalTab" class="mt-6 pt-6 border-t border-gray-200">
          <div class="grid grid-cols-4 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-500">Total Courses</div>
              <div class="text-2xl font-bold text-[#006633]">{{ activeCourses.length }}</div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-500">Total Enrollments</div>
              <div class="text-2xl font-bold text-[#006633]">
                {{activeCourses.reduce((sum, course) => sum + (course.enrollments || 0), 0)}}
              </div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-500">Avg Completion</div>
              <div class="text-2xl font-bold text-[#006633]">
                {{
                  activeCourses.length > 0
                    ? `${(activeCourses.reduce((sum, course) => sum + (course.completionRate || 0), 0) /
                      activeCourses.length).toFixed(1)}%`
                    : '0%'
                }}
              </div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-500">Avg Rating</div>
              <div class="text-2xl font-bold text-[#006633]">
                {{
                  activeCourses.length > 0
                    ? activeCourses.reduce((sum, course) => sum + (course.averageRating || 0), 0) / activeCourses.length
                    : '0.0'
                }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeCourses.length > 0" class="flex justify-between items-center mt-6 text-sm text-gray-600">
          <div>
            Showing {{ activeCourses.length }} course{{ activeCourses.length !== 1 ? 's' : '' }}
          </div>
          <Pagination v-if="totalPages > 1" :current-page="currentPage" :total-pages="totalPages"
            @page-change="goToPage" />

        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>