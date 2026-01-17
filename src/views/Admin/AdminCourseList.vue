<script setup>
import dashboardApi from "@/api/dashboard";
import AdminSidebar from "@/views/Admin/AdminSidebar.vue";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toastification';

import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Eye,
  MoreVertical,
  Plus,
  Search,
  Trash2,
} from "lucide-vue-next";

const toast = useToast();
const courseTabs = ref(["Published", "Drafts", "Archived", "Approvals"]);
const currentTab = ref("Published");
const router = useRouter();

const publishedCourses = ref([]);
const draftCourses = ref([]);
const archivedCourses = ref([]);
const approvedCourses = ref([]);
const isLoading = ref(false);
const error = ref(null);

const fetchCourseAnalytics = async (ordering = '-enrollment_count') => {
  isLoading.value = true;
  error.value = null;

  try {
    // Use the dashboardApi.fetchCourseAnalytics method
    const courses = await dashboardApi.fetchCourseAnalytics({ ordering });

    // Transform API response to match component structure
    publishedCourses.value = courses.map(course => ({
      id: course.course_id,
      slug: course.course_slug,
      title: course.course_title,
      enrollments: course.total_enrollments,
      completion: `${course.completion_rate.toFixed(1)}%`,
      lastUpdate: "Recently updated", // This field might not be in your API response
      activeStudents: course.active_students,
      completedStudents: course.completed_students,
      averageRating: course.average_rating,
      totalViews: course.total_views,
      totalTimeHours: course.total_time_hours,
      completionRate: course.completion_rate
    }));

    // todo API calls
    draftCourses.value = [];
    archivedCourses.value = [];
    approvedCourses.value = [];

    // Update total pages based on response if your API supports pagination
    // totalPages.value = Math.ceil(courses.length / pageSize);

  } catch (err) {
    console.error("Error fetching course analytics:", err);
    error.value = err.response?.data?.detail || "Failed to fetch course data";

    if (err.response?.status === 403) {
      toast.error("You are not authorized to view course analytics");
    } else {
      toast.error("Failed to load course data");
    }

    // Clear data on error
    publishedCourses.value = [];
  } finally {
    isLoading.value = false;
  }
};

const handleEditCourse = async (slug) => {
  try {
    // Fetch the course details first (if needed for pre-filling the form)
    const course = await courseApi.getCoursesDetails(slug);

    // Navigate to edit page and pass slug via query or params
    router.push({ path: `/admin/courses/${slug}/edit` });
  } catch (err) {
    console.error('Failed to fetch course for edit', err);
    toast.error('Failed to load course for editing');
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
  fetchCourseAnalytics(ordering);
};

// Handle tab changes
const handleTabChange = (tab) => {
  currentTab.value = tab;

  switch (tab) {
    case "Published":
      fetchCourseAnalytics();
      break;
    case "Drafts":
      //todo dashboardApi.fetchDraftCourses();
      break;
    case "Archived":
      //todo dashboardApi.fetchArchivedCourses();
      break;
    case "Approvals":
      //todo dashboardApi.fetchPendingApprovalCourses();
      break;
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

const currentPage = ref(1);
const totalPages = ref(1);
const searchQuery = ref("");

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    // Add pagination to API call if needed
    // fetchCourseAnalytics({ page, ordering: currentSorting.value });
  }
};

const handleSearch = () => {
  // Implement search functionality
  if (searchQuery.value.trim()) {
    // You might want to add a search parameter to your API
    // fetchCourseAnalytics({ search: searchQuery.value });
    toast.info(`Searching for: ${searchQuery.value}`);
  } else {
    fetchCourseAnalytics();
  }
};

// Initialize data
onMounted(() => {
  fetchCourseAnalytics();
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
        <button @click="fetchCourseAnalytics"
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

        <!-- <table v-else class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr
              class="bg-[#f0fff0] text-gray-700 uppercase text-sm leading-normal border-b border-[#00cc66]/50"
            >
              <th class="py-3 px-3 text-left w-12 rounded-tl-lg">
                <input type="checkbox" class="h-4 w-4 text-[#00cc66] border-gray-300 rounded focus:ring-[#00cc66]" />
              </th>

              <th class="py-3 px-3 text-left flex items-center">
                Course Title
                <MoreVertical class="w-4 h-4 ml-1 text-gray-500" />
              </th>

              <template v-if="isApprovalTab">
                <th class="py-3 px-3 text-left">Created By</th>
                <th class="py-3 px-3 text-left">Creation Date</th>
                <th class="py-3 px-3 text-center rounded-tr-lg">Action</th>
              </template>

<template v-else>
                <th class="py-3 px-3 text-left flex items-center">
                  Enrollments
                  <MoreVertical class="w-4 h-4 ml-1 text-gray-500" />
                </th>
                <th class="py-3 px-3 text-left flex items-center">
                  Completion Rate
                  <MoreVertical class="w-4 h-4 ml-1 text-gray-500" />
                </th>
                <th class="py-3 px-3 text-left flex items-center">
                  Average Rating
                  <MoreVertical class="w-4 h-4 ml-1 text-gray-500" />
                </th>
                <th class="py-3 px-3 text-left">
                  Active Students
                </th>
              </template>

<th class="py-3 px-3 text-center rounded-tr-lg">Action</th>
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
                  {{ course.createdBy || "-" }}
                </td>
                <td class="py-3 px-3">
                  {{ course.creationDate || "-" }}
                </td>
                <td class="py-3 px-3">
                  <button
                    @click="handleAction('Approve', course.id)"
                    class="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                </td>
              </template>

    <template v-else>
                <td class="py-3 px-3 font-semibold">
                  {{ course.enrollments || 0 }}
                </td>
                <td class="py-3 px-3">
                  <div class="flex items-center">
                    <div class="w-full bg-gray-200 rounded-full h-2.5 mr-3">
                      <div 
                        class="bg-green-600 h-2.5 rounded-full" 
                        :style="{ width: `${Math.min(course.completionRate || 0, 100)}%` }"
                      ></div>
                    </div>
                    <span
                      :class="{
                        'text-green-600 font-semibold': (course.completionRate || 0) >= 80,
                        'text-orange-500': (course.completionRate || 0) < 50,
                        'text-blue-600': (course.completionRate || 0) >= 50 && (course.completionRate || 0) < 80
                      }"
                    >
                      {{ course.completion }}
                    </span>
                  </div>
                </td>
                <td class="py-3 px-3">
                  <span class="flex items-center">
                    ⭐ {{ course.averageRating?.toFixed(1) || "0.0" }}
                  </span>
                </td>
                <td class="py-3 px-3">
                  {{ course.activeStudents || 0 }}
                </td>
              </template>

    <td class="py-3 px-3 text-center">
      <div class="flex item-center justify-center space-x-2">
        <button @click="handleAction('View', course.id)" class="w-6 h-6 hover:text-blue-500 transition-colors"
          title="View Course">
          <Eye class="w-full h-full" />
        </button>
        <button @click="handleAction('Edit', course.id)" class="w-6 h-6 hover:text-green-500 transition-colors"
          title="Edit Course">
          <Edit2 class="w-full h-full" />
        </button>
        <button @click="handleAction('Delete', course.id)" class="w-6 h-6 hover:text-red-500 transition-colors"
          title="Delete Course">
          <Trash2 class="w-full h-full" />
        </button>
      </div>
    </td>
  </tr>
</tbody>
</table> -->
        <table v-else class="min-w-full table-fixed divide-y divide-gray-200">
          <thead>
            <tr class="bg-[#f0fff0] text-gray-700 uppercase text-sm leading-normal border-b border-[#00cc66]/50">
              <!-- Checkbox -->
              <th class="py-3 px-3 text-left w-12 rounded-tl-lg">
                <input type="checkbox" class="h-4 w-4 text-[#00cc66] border-gray-300 rounded focus:ring-[#00cc66]" />
              </th>

              <!-- Course Title -->
              <th class="py-3 px-3 text-left">
                <div class="flex items-center gap-1">
                  Course Title
                  <MoreVertical class="w-4 h-4 text-gray-500" />
                </div>
              </th>

              <!-- Approval tab columns -->
              <template v-if="isApprovalTab">
                <th class="py-3 px-3 text-left">Created By</th>
                <th class="py-3 px-3 text-left">Creation Date</th>
              </template>

              <!-- Active tab columns -->
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

              <!-- Action -->
              <th class="py-3 px-3 text-center rounded-tr-lg w-32">
                Action
              </th>
            </tr>
          </thead>

          <tbody class="text-gray-600 text-sm font-light divide-y divide-gray-100">
            <tr v-for="course in activeCourses" :key="course.id" class="hover:bg-[#f9fff9] transition-colors">
              <!-- Checkbox -->
              <td class="py-3 px-3">
                <input type="checkbox" class="h-4 w-4 text-[#00cc66]" />
              </td>

              <!-- Course Title -->
              <td class="py-3 px-3 font-medium text-[#006633]">
                {{ course.title }}
                <div class="text-xs text-gray-500 mt-1">
                  {{ course.totalViews ? `${course.totalViews} views` : 'No views yet' }}
                </div>
              </td>

              <!-- Approval tab rows -->
              <template v-if="isApprovalTab">
                <td class="py-3 px-3">
                  {{ course.createdBy || '-' }}
                </td>
                <td class="py-3 px-3">
                  {{ course.creationDate || '-' }}
                </td>
              </template>

              <!-- Active tab rows -->
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

              <!-- Action buttons -->
              <td class="py-3 px-3 text-center">
                <div class="flex items-center justify-center gap-2">
                  <button @click="handleAction('View', course.slug)" class="w-6 h-6 hover:text-blue-500 transition-colors"
                    title="View Course">
                    <Eye class="w-full h-full" />
                  </button>

                  <button @click="handleAction('Edit', course.slug)"
                    class="w-6 h-6 hover:text-green-500 transition-colors" title="Edit Course">
                    <Edit2 class="w-full h-full" />
                  </button>

                  <button @click="handleAction('Delete', course.slug)"
                    class="w-6 h-6 hover:text-red-500 transition-colors" title="Delete Course">
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
          <div class="flex items-center">
            <span class="mr-4">Page {{ currentPage }} of {{ totalPages }}</span>
            <div class="flex space-x-2">
              <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
                class="p-2 border rounded-full hover:bg-gray-100 transition-colors" title="Previous Page">
                <ChevronLeft class="w-4 h-4" />
              </button>
              <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" :class="{
                'opacity-50 cursor-not-allowed': currentPage === totalPages,
              }" class="p-2 border rounded-full hover:bg-gray-100 transition-colors" title="Next Page">
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>