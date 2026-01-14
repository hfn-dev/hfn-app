<script setup>
import assets from '@/assets/assets.png';
import SuperAdminSidebar from '@/views/SuperAdmin/SuperAdminSidebar.vue';
import analyticsApi from '@/api/dashboard.js';  
import { reactive, ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import analyticsApi from '@/api/dashboard.js';

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
} from 'chart.js';
import { Bar, Line, Pie } from 'vue-chartjs';

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

const active = ref('Dashboard');
const router = useRouter();

const dashboardData = reactive({
  stats: [],
  summary: [],
  courses: [],
  mostViewed: [],
  revenue: {},
  enrollment: {},
  completion: {},
  growth: {},
});
const loading = ref(true);
const error = ref(null);

const revenueData = reactive({
  labels: [],
  datasets: [
    {
      label: 'Revenue',
      backgroundColor: 'rgba(0, 204, 102, 0.3)',
      borderColor: '#00cc66',
      pointBackgroundColor: '#00cc66',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#00cc66',
      data: [],
      fill: true,
      tension: 0.4,
    },
  ],
});

const revenueChartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
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
            return value / 1000 + 'k';
          }
          return value;
        },
        font: {
          size: 10,
        },
      },
      grid: {
        borderDash: [5, 5],
        color: 'rgba(0,0,0,0.1)',
      },
    },
  },
});

const engagementData = {
  labels: [],
  datasets: [
    {
      label: 'Engagement',
      backgroundColor: '#28a745',
      borderRadius: 8,
      data: [],
    },
  ],
};

const completionData = {
  labels: [],
  datasets: [
    {
      label: 'Course Completion',
      backgroundColor: ['#28a745', '#ffb300', '#ff5252'],
      data: [],
    },
  ],
};

const growthData = {
  labels: [],
  datasets: [
    {
      label: 'Students',
      borderColor: '#fdc700',
      backgroundColor: '#fdc7008a',
      fill: true,
      tension: 0.4,
      data: [],
    },
  ],
};

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
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' },
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

const showSidebar = ref(false);
const toggleSidebar = () => (showSidebar.value = !showSidebar.value);
const closeSidebar = () => (showSidebar.value = false);

onMounted(async () => {
  try {
    loading.value = true;

    const dash = await analyticsApi.fetchDashboard();

    dashboardData.stats = dash.stats;
    dashboardData.summary = dash.summary;
    dashboardData.courses = dash.courses;
    dashboardData.mostViewed = dash.mostViewed;
    dashboardData.revenue = dash.revenue;
    dashboardData.enrollment = dash.enrollment;
    dashboardData.completion = dash.completion;
    dashboardData.growth = dash.growth;

    const revenueAnalytics = await analyticsApi.fetchRevenueAnalytics();
    dashboardData.revenue = revenueAnalytics.highlights || {};

    if (revenueAnalytics.chartData) {
      revenueData.labels = revenueAnalytics.chartData.labels || [];
      revenueData.datasets[0].data = revenueAnalytics.chartData.data || [];
    }

    const courseAnalytics = await analyticsApi.fetchCourseAnalytics();

    if (courseAnalytics.enrollmentByMonth) {
      engagementData.labels = courseAnalytics.enrollmentByMonth.labels || [];
      engagementData.datasets[0].data =
        courseAnalytics.enrollmentByMonth.data || [];
      dashboardData.enrollment = courseAnalytics.enrollmentByMonth;
    }

    if (courseAnalytics.completionStatus) {
      completionData.labels = courseAnalytics.completionStatus.labels || [];
      completionData.datasets[0].data =
        courseAnalytics.completionStatus.data || [];
      dashboardData.completion = courseAnalytics.completionStatus;
    }

    const membershipAnalytics = await analyticsApi.fetchMembershipAnalytics();

    if (membershipAnalytics.studentGrowth) {
      growthData.labels = membershipAnalytics.studentGrowth.labels || [];
      growthData.datasets[0].data =
        membershipAnalytics.studentGrowth.data || [];
      dashboardData.growth = membershipAnalytics.studentGrowth;
    }
  } catch (err) {
    console.error('Failed to load dashboard data', err);
    error.value = err;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="flex min-h-screen font-sans relative">
    <button
      @click="toggleSidebar"
      class="lg:hidden fixed top-15 left-0 z-50 bg-[#004d33] text-white p-2 rounded-md shadow-md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <div
      class="fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300 lg:translate-x-0"
      :class="showSidebar ? 'translate-x-0' : '-translate-x-full'"
    >
      <SuperAdminSidebar @closeSidebar="closeSidebar" />
    </div>

    <div
      v-if="showSidebar"
      class="fixed inset-0 bg-gray bg-opacity-10 z-30 lg:hidden"
      @click="closeSidebar"
    ></div>
    <main class="flex-1 p-8 overflow-auto bg-white">
      <div class="mb-8">
        <h1 class="text-4xl font-extrabold text-[#E87A18]">
          Welcome Super Admin!
        </h1>
        <p class="text-gray-700 mt-2">
          Here is how your courses are performing today.
        </p>
      </div>

      <div class="flex justify-between items-stretch mb-10 space-x-6">
        <div
          v-for="(stat, index) in dashboardData.stats"
          :key="stat.title"
          class="flex-1 p-6 text-center bg-white shadow-lg border-y border-[#00cc66] relative overflow-hidden group transition-all duration-300"
          :class="{
            'rounded-tl-4xl rounded-br-4xl': index === 0 || index === dashboardData.stats.length - 1,
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

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-xl shadow-lg lg:col-span-3">
          <h2 class="text-xl font-semibold mb-4 text-[#006633]">
            Student Monthly Enrollment
          </h2>
          <div class="h-[300px] w-full">
            <Bar :data="engagementData" :options="barOptions" />
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-lg w-full">
          <h2 class="text-xl font-semibold mb-4 text-[#006633]">
            Course Completion
          </h2>
          <div class="h-[300px] w-full">
            <Pie :data="completionData" :options="pieOptions" />
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-lg w-full">
          <h2 class="text-xl font-semibold mb-4 text-[#006633]">
            Subscriptions
          </h2>
          <div class="h-[300px] w-full">
            <Line :data="growthData" :options="lineOptions" />
          </div>
        </div>
      </div>
      <div class="p-6 bg-white rounded-xl">
        <div class="flex justify-between items-stretch mb-8 space-x-6">
          <div
            v-for="card in dashboardData.summary"
            :key="card.title"
            class="summary-card-alt flex-1 p-6 text-center bg-white shadow-lg relative overflow-hidden group transition-all duration-300"
            :class="{
              'rounded-tl-4xl rounded-br-4xl': true,
            }"
          >
            <div class="absolute inset-y-0 left-0 w-1 bg-[#00cc66]"></div>
            <div class="absolute inset-y-0 right-0 w-1 bg-[#00cc66]"></div>

            <p class="text-gray-600 text-sm mb-1">{{ card.title }}</p>

            <div class="text-4xl font-bold text-gray-800 mb-1">
              <span>{{ card.value }}</span>
            </div>

            <p
              :class="[
                card.trendType === 'up' ? 'text-[#00cc66]' : 'text-red-500',
                'text-sm font-medium',
              ]"
            >
              {{ card.trendValue }}
            </p>
          </div>
        </div>

        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Most Viewed Courses
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="course in dashboardData.courses"
            :key="course.name"
            class="course-card"
          >
            <div class="flex justify-between items-center mb-1">
              <p class="text-base font-bold text-gray-800">
                {{ course.name }}
              </p>
              <button
                class="text-xl font-bold text-gray-400 hover:text-gray-600 p-1"
              >
                &vellip;
              </button>
            </div>
            <p class="text-sm text-gray-600">
              Enrollments: {{ course.enrollments }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-white rounded-lg"
      >
        <div class="lg:col-span-2">
          <div class="bg-white p-6 rounded-lg shadow-sm mb-0">
            <div class="flex justify-between items-start mb-4">
              <h2 class="text-2xl font-bold text-gray-800">Revenue</h2>
              <div
                class="p-2 border border-gray-300 rounded-md text-sm cursor-pointer flex items-center"
              >
                Yearly <span class="ml-1 text-xs">⌄</span>
              </div>
            </div>
            <div class="h-80">
              <Line :data="revenueData" :options="revenueChartOptions" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-0 mt-[-10px]">
            <div class="highlight-card-wrapper border-r border-orange-100">
              <div class="highlight-card">
                <p class="text-sm text-gray-500 mb-1">Top month</p>
                <p class="text-3xl font-bold text-[#E87A18]">
                  {{ dashboardData.revenue.topMonth?.name || 'N/A' }}
                </p>
                <p class="text-xl font-semibold text-[#E87A18] mt-1">
                  {{ dashboardData.revenue.topMonth?.year || 'N/A' }}
                </p>
              </div>
            </div>

            <div class="highlight-card-wrapper border-r border-orange-100">
              <div class="highlight-card">
                <p class="text-sm text-gray-500 mb-1">Top year</p>
                <p class="text-3xl font-bold text-[#E87A18]">
                  {{ dashboardData.revenue.topYear?.year || 'N/A' }}
                </p>
                <p class="text-xl font-semibold text-gray-600 mt-1">
                  {{ dashboardData.revenue.topYear?.sales || 'N/A' }}
                </p>
              </div>
            </div>

            <div class="highlight-card-wrapper">
              <div class="highlight-card">
                <p class="text-sm text-gray-500 mb-1">Best Seller</p>
                <img
                  :src="assets"
                  alt="Instructor"
                  class="w-10 h-10 rounded-full mb-1 border-2 border-orange-300"
                />
                <p class="text-lg font-bold text-gray-800">
                  {{ dashboardData.revenue.bestSeller?.name || 'N/A' }}
                </p>
                <p class="text-sm text-gray-600">
                  {{ dashboardData.revenue.bestSeller?.instructor || 'N/A' }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">
            Most Viewed Courses
          </h2>
          <div class="space-y-4">
            <div
              v-for="(course, index) in dashboardData.mostViewed"
              :key="index"
              class="flex items-center"
            >
              <div
                class="relative flex-grow h-8 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-orange-300 to-orange-400 rounded-lg"
                  :style="{ width: course.progress }"
                ></div>
                <p
                  class="relative z-10 text-sm font-semibold text-gray-800 px-3 py-1 flex justify-between items-center h-full"
                >
                  <span>{{ course.name }}</span>
                  <span>{{ course.value }}</span>
                </p>
              </div>
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
  content: '';
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
  content: '';
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
