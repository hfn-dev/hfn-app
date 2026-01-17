<script setup>
import dashboardApi from "@/api/dashboard";
import AdminSidebar from "@/views/Admin/AdminSidebar.vue";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toastification';

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Line, Pie } from "vue-chartjs";

// check if admin to access. 

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const toast = useToast();
const router = useRouter();
const active = ref("Dashboard");
const isLoading = ref(true);
const dashboardData = ref(null);

// Reactive chart data
const revenueData = ref({
  labels: [],
  datasets: [
    {
      label: "Revenue",
      backgroundColor: "rgba(0, 204, 102, 0.3)",
      borderColor: "#00cc66",
      pointBackgroundColor: "#00cc66",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#00cc66",
      data: [],
      fill: true,
      tension: 0.4,
    },
  ],
});

const engagementData = ref({
  labels: [],
  datasets: [
    {
      label: "Enrollments",
      backgroundColor: "#28a745",
      borderRadius: 8,
      data: [],
    },
  ],
});

const completionData = ref({
  labels: ["Completed", "In Progress", "Dropped"],
  datasets: [
    {
      label: "Course Completion",
      backgroundColor: ["#28a745", "#ffb300", "#ff5252"],
      data: [0, 0, 0],
    },
  ],
});

const growthData = ref({
  labels: [],
  datasets: [
    {
      label: "New Users",
      borderColor: "#fdc700",
      backgroundColor: "#fdc7008a",
      fill: true,
      tension: 0.4,
      data: [],
    },
  ],
});

const revenueChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";
          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(context.parsed.y);
          }
          return label;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 10,
        },
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value) {
          if (value >= 1000) {
            return value / 1000 + "k";
          }
          return value;
        },
        font: {
          size: 10,
        },
      },
      grid: {
        borderDash: [5, 5],
        color: "rgba(0,0,0,0.1)",
      },
    },
  },
});

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true },
  },
};

const pieOptions = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: ctx => `${ctx.label}: ${ctx.raw}%`,
      },
    },
    legend: { position: "bottom" },
  },
};



const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true },
  },
};

const statCards = computed(() => {
  if (!dashboardData.value) return [];

  return [
    {
      title: "Total Courses",
      value: dashboardData.value.total_courses || 0,
      change: "Active",
      changeColor: "text-[#00cc66]",
    },
    {
      title: "Active Courses",
      value: dashboardData.value.active_courses || 0,
      change: `${Math.round(((dashboardData.value.active_courses || 0) / (dashboardData.value.total_courses || 1)) * 100)}%`,
      changeColor: "text-[#00cc66]",
    },
    {
      title: "Total Enrollments",
      value: dashboardData.value.total_enrollments || 0,
      change: dashboardData.value.active_enrollments ? `${dashboardData.value.active_enrollments} Active` : "0 Active",
      changeColor: "text-[#00cc66]",
    },
    {
      title: "Average Rating",
      value: dashboardData.value.average_course_rating?.toFixed(1) || "0.0",
      stars: true,
      change: "Based on all courses",
      changeColor: "text-gray-500",
    },
  ];
});

// Compute summary data from API
const summaryData = computed(() => {
  if (!dashboardData.value) return [];

  return [
    {
      title: "Total Visits",
      value: dashboardData.value.total_page_views?.toLocaleString() || "0",
      trendValue: `${dashboardData.value.total_unique_visitors || 0} Unique`,
      trendType: "up",
    },
    {
      title: "Bounce Rate",
      value: `${dashboardData.value.bounce_rate?.toFixed(1) || 0}%`,
      trendValue: dashboardData.value.bounce_rate < 40 ? "Good" : "Needs Improvement",
      trendType: dashboardData.value.bounce_rate < 40 ? "up" : "down",
    },
    {
      title: "Avg Session Time",
      value: `${dashboardData.value.average_session_duration_minutes?.toFixed(0) || 0} mins`,
      trendValue: "Per session",
      trendType: "up",
    },
    {
      title: "Time on Courses",
      value: `${dashboardData.value.average_time_spent_minutes?.toFixed(0) || 0} mins`,
      trendValue: "Per student",
      trendType: "up",
    },
  ];
});

// Compute most viewed courses from API
const mostViewedCourses = computed(() => {
  if (!dashboardData.value?.most_viewed_courses) return [];

  const maxEnrollments = Math.max(
    ...dashboardData.value.most_viewed_courses.map(c => c.enrollment_count || 0)
  );

  return dashboardData.value.most_viewed_courses.map(course => ({
    name: course.title,
    value: course.enrollment_count || 0,
    progress:
      maxEnrollments > 0
        ? `${Math.round((course.enrollment_count / maxEnrollments) * 100)}%`
        : "0%",
    course_id: course.id,
  }));
});

// Compute course data for enrollment visualization
const courseData = computed(() => {
  if (!dashboardData.value?.most_viewed_courses) return [];

  return dashboardData.value.most_viewed_courses.slice(0, 4).map(course => ({
    name: course.title,
    enrollments: course.enrollment_count || 0,
    course_id: course.id,
  }));
});

// Compute top revenue months
const topRevenueData = computed(() => {
  if (!dashboardData.value?.monthly_revenue) return null;

  const monthlyData = dashboardData.value.monthly_revenue;
  const entries = Object.entries(monthlyData);

  if (entries.length === 0) return null;

  // Find top month
  let topMonth = { month: "", revenue: 0 };
  let topYear = { year: 0, total: 0 };

  entries.forEach(([month, revenue]) => {
    if (revenue > topMonth.revenue) {
      topMonth = { month, revenue };
    }
    topYear.total += revenue;
  });

  return {
    topMonth: topMonth.month,
    topMonthRevenue: topMonth.revenue,
    topYear: "2024", // Default to current year or from API
    totalYearRevenue: topYear.total,
  };
});

// Fetch dashboard data
const fetchDashboardData = async () => {
  try {
    isLoading.value = true;
const data = await dashboardApi.fetchDashboard();

    if (data) {
      dashboardData.value = data;
      updateChartData();
    } else {
      toast.error('Failed to load dashboard data');
    }
  } catch (error) {
    console.error('Dashboard fetch error:', error);
    toast.error('Failed to load dashboard data. Please try again.');
  } finally {
    isLoading.value = false;
  }
};

// Update chart data from API response
const updateChartData = () => {
  if (!dashboardData.value) return;

  // Revenue
  if (dashboardData.value.monthly_revenue) {
    revenueData.value = {
      ...revenueData.value,
      labels: Object.keys(dashboardData.value.monthly_revenue),
      datasets: [{
        ...revenueData.value.datasets[0],
        data: Object.values(dashboardData.value.monthly_revenue)
      }]
    };
  }

  // Enrollments
  if (dashboardData.value.enrollments_by_month) {
    engagementData.value = {
      ...engagementData.value,
      labels: Object.keys(dashboardData.value.enrollments_by_month),
      datasets: [{
        ...engagementData.value.datasets[0],
        data: Object.values(dashboardData.value.enrollments_by_month)
      }]
    };
  }

  // Completion
  if (dashboardData.value.course_completion_stats) {
    const stats = dashboardData.value.course_completion_stats;
    completionData.value = {
      ...completionData.value,
      datasets: [{
        ...completionData.value.datasets[0],
        data: [
          Number(stats.completed_count) || 0,
          Number(stats.in_progress_count) || 0,
          Number(stats.dropped_count) || 0
        ]
      }]
    };
  }
};
// On component mount
onMounted(() => {
  fetchDashboardData();
});

// Toggle sidebar for mobile
const showSidebar = ref(false);
const toggleSidebar = () => (showSidebar.value = !showSidebar.value);
const closeSidebar = () => (showSidebar.value = false);
</script>

<template>
  <div class="flex min-h-screen font-sans relative">
    <!-- Mobile sidebar toggle -->
    <button @click="toggleSidebar"
      class="lg:hidden fixed top-15 left-0 z-50 bg-[#004d33] text-white p-2 rounded-md shadow-md">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- SIDEBAR -->
    <div class="fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300 lg:translate-x-0"
      :class="showSidebar ? 'translate-x-0' : '-translate-x-full'">
      <AdminSidebar @closeSidebar="closeSidebar" />
    </div>

    <!-- Overlay for mobile sidebar -->
    <div v-if="showSidebar" class="fixed inset-0 bg-gray-500 bg-opacity-50 z-30 lg:hidden" @click="closeSidebar"></div>

    <!-- Main content -->
    <main class="flex-1 p-8 overflow-auto bg-white">
      <!-- Loading state -->
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00cc66]"></div>
      </div>

      <!-- Dashboard content -->
      <div v-else>
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-extrabold text-[#E87A18]">
            Welcome Admin!
          </h1>
          <p class="text-gray-700 mt-2">
            Here is how your courses are performing today.
          </p>
        </div>

        <!-- Stat Cards -->
        <div class="flex justify-between items-stretch mb-10 space-x-6">
          <div v-for="(stat, index) in statCards" :key="stat.title"
            class="flex-1 p-6 text-center bg-white shadow-lg border-y border-[#00cc66] relative overflow-hidden group transition-all duration-300"
            :class="{
              'rounded-tl-4xl rounded-br-4xl': index === 0,
              'rounded-tl-4xl rounded-br-4xl': index === statCards.length - 1,
              'rounded-tl-4xl rounded-br-4xl': true,
            }">
            <div class="absolute inset-y-0 left-0 w-1 bg-[#00cc66]"></div>
            <div class="absolute inset-y-0 right-0 w-1 bg-[#00cc66]"></div>

            <p class="text-gray-600 text-sm mb-1">{{ stat.title }}</p>

            <div class="text-4xl font-bold text-gray-800 mb-1">
              <span v-if="stat.stars">
                <span class="text-[#ff9900]">
                  <span v-for="i in 5" :key="i">
                    <span v-if="i <= Math.floor(parseFloat(stat.value))">★</span>
                    <span v-else-if="i === Math.ceil(parseFloat(stat.value)) && stat.value % 1 !== 0">☆</span>
                    <span v-else class="text-gray-300">★</span>
                  </span>
                </span>
                <span class="text-sm ml-2">{{ stat.value }}</span>
              </span>
              <span v-else>{{ stat.value }}</span>
            </div>

            <p :class="[stat.changeColor, 'text-sm font-medium']">
              {{ stat.change }}
            </p>
          </div>
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <!-- Student Monthly Enrollment -->
          <div class="bg-white p-6 rounded-xl shadow-lg lg:col-span-3">
            <h2 class="text-xl font-semibold mb-4 text-[#006633]">
              Student Monthly Enrollment
            </h2>
            <div v-if="engagementData.labels.length > 0" class="h-[300px] w-full">
              <Bar :data="engagementData" :options="barOptions" />
            </div>
            <div v-else class="h-[300px] w-full flex items-center justify-center text-gray-500">
              No enrollment data available
            </div>
          </div>

          <!-- Course Completion -->
          <div class="bg-white p-6 rounded-xl shadow-lg w-full">
            <h2 class="text-xl font-semibold mb-4 text-[#006633]">
              Course Completion
            </h2>
            <div v-if="completionData.datasets[0].data.reduce((a, b) => a + b, 0) > 0" class="h-[300px] w-full">
              <Pie :data="completionData" :options="pieOptions" />
            </div>
            <div v-else class="h-[300px] w-full flex items-center justify-center text-gray-500">
              No completion data available
            </div>
          </div>

          <!-- User Growth -->
          <div class="bg-white p-6 rounded-xl shadow-lg w-full">
            <h2 class="text-xl font-semibold mb-4 text-[#006633]">
              New User Signups
            </h2>
            <div v-if="growthData.labels.length > 0" class="h-[300px] w-full">
              <Line :data="growthData" :options="lineOptions" />
            </div>
            <div v-else class="h-[300px] w-full flex items-center justify-center text-gray-500">
              No growth data available
            </div>
          </div>
        </div>

        <!-- Summary Stats and Top Courses -->
        <div class="p-6 bg-white rounded-xl mb-8">
          <!-- Summary Cards -->
          <div class="flex justify-between items-stretch mb-8 space-x-6">
            <div v-for="card in summaryData" :key="card.title"
              class="summary-card-alt flex-1 p-6 text-center bg-white shadow-lg relative overflow-hidden group transition-all duration-300"
              :class="{
                'rounded-tl-4xl rounded-br-4xl': true,
              }">
              <div class="absolute inset-y-0 left-0 w-1 bg-[#00cc66]"></div>
              <div class="absolute inset-y-0 right-0 w-1 bg-[#00cc66]"></div>

              <p class="text-gray-600 text-sm mb-1">{{ card.title }}</p>

              <div class="text-4xl font-bold text-gray-800 mb-1">
                <span>{{ card.value }}</span>
              </div>

              <p :class="[
                card.trendType === 'up' ? 'text-[#00cc66]' : 'text-red-500',
                'text-sm font-medium',
              ]">
                {{ card.trendValue }}
              </p>
            </div>
          </div>

          <!-- Top Courses by Enrollment -->
          <h2 class="text-xl font-semibold text-gray-800 mb-4">
            Most Enrolled Courses
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="course in courseData" :key="course.name" class="course-card">
              <div class="flex justify-between items-center mb-1">
                <p class="text-base font-bold text-gray-800 truncate">
                  {{ course.name }}
                </p>
                <button class="text-xl font-bold text-gray-400 hover:text-gray-600 p-1"
                  @click="$router.push(`/admin/courses/${course.course_id || '#'}`)">
                  &vellip;
                </button>
              </div>
              <p class="text-sm text-gray-600">
                Enrollments: {{ course.enrollments.toLocaleString() }}
              </p>
            </div>
          </div>
        </div>

        <!-- Revenue Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-white rounded-lg">
          <!-- Revenue Chart -->
          <div class="lg:col-span-2">
            <div class="bg-white p-6 rounded-lg shadow-sm mb-0">
              <div class="flex justify-between items-start mb-4">
                <h2 class="text-2xl font-bold text-gray-800">Revenue</h2>
                <div class="p-2 border border-gray-300 rounded-md text-sm cursor-pointer flex items-center">
                  Yearly <span class="ml-1 text-xs">⌄</span>
                </div>
              </div>
              <div v-if="revenueData.labels.length > 0" class="h-80">
                <Line :data="revenueData" :options="revenueChartOptions" />
              </div>
              <div v-else class="h-80 flex items-center justify-center text-gray-500">
                No revenue data available
              </div>
            </div>

            <!-- Revenue Highlights -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-0 mt-[-10px]">
              <!-- Top Month -->
              <div class="highlight-card-wrapper border-r border-orange-100" v-if="topRevenueData">
                <div class="highlight-card">
                  <p class="text-sm text-gray-500 mb-1">Top month</p>
                  <p class="text-3xl font-bold text-[#E87A18]">{{ topRevenueData.topMonth }}</p>
                  <p class="text-xl font-semibold text-[#E87A18] mt-1">
                    {{ new Intl.NumberFormat('en-US', {
                      style: 'currency', currency: 'USD', maximumFractionDigits: 0
                    }).format(topRevenueData.topMonthRevenue) }}
                  </p>
                </div>
              </div>

              <!-- Top Year -->
              <div class="highlight-card-wrapper border-r border-orange-100" v-if="topRevenueData">
                <div class="highlight-card">
                  <p class="text-sm text-gray-500 mb-1">Top year</p>
                  <p class="text-3xl font-bold text-[#E87A18]">{{ topRevenueData.topYear }}</p>
                  <p class="text-xl font-semibold text-gray-600 mt-1">
                    {{ new Intl.NumberFormat('en-US', {
                      style: 'currency', currency: 'USD', maximumFractionDigits: 0
                    }).format(topRevenueData.totalYearRevenue) }}
                  </p>
                </div>
              </div>

              <!-- Best Seller -->
              <div class="highlight-card-wrapper" v-if="mostViewedCourses.length > 0">
                <div class="highlight-card">
                  <p class="text-sm text-gray-500 mb-1">Best Seller</p>
                  <div
                    class="w-10 h-10 rounded-full mb-1 border-2 border-orange-300 bg-gray-200 flex items-center justify-center">
                    <span class="text-gray-600 font-bold">
                      {{ mostViewedCourses[0]?.name?.charAt(0) || 'N' }}
                    </span>
                  </div>
                  <p class="text-lg font-bold text-gray-800 truncate">
                    {{ mostViewedCourses[0]?.name || 'No data' }}
                  </p>
                  <p class="text-sm text-gray-600">
                    {{ mostViewedCourses[0]?.value || '0' }} views
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Most Viewed Courses Sidebar -->
          <div class="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">
              Most Viewed Courses
            </h2>
            <div class="space-y-4">
              <div v-for="(course, index) in mostViewedCourses" :key="index" class="flex items-center">
                <div
                  class="relative flex-grow h-8 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-r from-orange-300 to-orange-400 rounded-lg"
                    :style="{ width: course.progress }"></div>
                  <p
                    class="relative z-10 text-sm font-semibold text-gray-800 px-3 py-1 flex justify-between items-center h-full">
                    <span class="truncate">{{ course.name }}</span>
                    <span>{{ course.value }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div v-if="mostViewedCourses.length === 0" class="text-center text-gray-500 py-8">
              No course view data available
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.h-\[300px\] {
  height: 300px;
}

.highlight-card {
  @apply bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center;
  text-align: center;
}

.summary-card {
  @apply relative bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden;
}

.trend-pill {
  @apply py-2 px-4 rounded-full font-semibold text-sm border-2 transition-colors duration-200;
}

.rounded-t-\[50px_25px\] {
  border-top-left-radius: 50px 25px;
  border-top-right-radius: 50px 25px;
}

.course-card {
  @apply bg-white p-4 border border-gray-200 rounded-lg shadow-sm;
}

.summary-card-corrected {
  @apply relative bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden;
  padding: 10px;
}

.summary-card-corrected::before {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  width: 100px;
  height: 100px;
  border: 4px solid #4caf50;
  border-right: none;
  border-bottom: none;
  border-top-left-radius: 80% 60%;
  pointer-events: none;
  z-index: 10;
}

.summary-card-corrected::after {
  content: "";
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 100px;
  height: 100px;
  border: 4px solid #4caf50;
  border-top: none;
  border-left: none;
  border-bottom-right-radius: 80% 60%;
  pointer-events: none;
  z-index: 10;
}

.trend-pill-corrected {
  @apply py-2 px-6 rounded-full font-bold text-base transition-shadow duration-300;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

.text-orange-500 {
  color: #f97316;
}
</style>