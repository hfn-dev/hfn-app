<script setup>
import assets from "@/assets/assets.png";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import analyticsApi from "../../api/dashboard";

const isLoading = ref(true);

const statCards = ref([]);

const summaryData = ref([]);

const engagementData = reactive({ labels: [], datasets: [] });
const completionData = reactive({ labels: [], datasets: [] });
const growthData = reactive({ labels: [], datasets: [] });
const revenueData = reactive({ labels: [], datasets: [] });
const usersByRoleData = reactive({
  labels: [],
  datasets: []
});

const mostViewedCourses = ref([]);

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
import EditorSidebar from "./EditorSidebar.vue";


const fetchDashboardAnalytics = async () => {
  try {
    isLoading.value = true;

    const dashboard = await analyticsApi.fetchDashboard();

    statCards.value = [
      {
        title: "Total Visits",
        value: dashboard.total_page_views,
        change: dashboard.total_visits_change,
        changeColor: dashboard.total_visits_change?.includes("Increase")
          ? "text-[#00cc66]"
          : "text-red-500",
      },
      {
        title: "Unique Visits",
        value: dashboard.total_unique_visitors || 0,
        change: dashboard.unique_visits_change,
        changeColor: "text-[#00cc66]",
      },
      {
        title: "Time Spent on website",
        value: dashboard.average_session_duration_minutes,
        change: dashboard.time_spent_change,
        changeColor: "text-red-500",
      },
      {
        title: "Bounce Rate",
        value: dashboard.bounce_rate,
        change: dashboard.bounce_rate_change,
        changeColor: "text-gray-500",
      },
    ];

    summaryData.value = dashboard.summary || [];

    engagementData.labels = dashboard.engagement?.labels || [];
    engagementData.datasets = [
      {
        label: "Engagement",
        backgroundColor: "#28a745",
        borderRadius: 8,
        data: dashboard.engagement?.data || [],
      },
    ];

    completionData.labels = dashboard.page_visits?.labels || [];
    completionData.datasets = [
      {
        backgroundColor: ["#28a745", "#ffb300", "#ff5252"],
        data: dashboard.page_visits?.data || [],
      },
    ];

    growthData.labels = dashboard.visitors_growth?.labels || [];
    growthData.datasets = [
      {
        label: "Visitors",
        borderColor: "#fdc700",
        backgroundColor: "#fdc7008a",
        fill: true,
        tension: 0.4,
        data: dashboard.visitors_growth?.data || [],
      },
    ];

    revenueData.labels = dashboard.revenue?.labels || [];
    revenueData.datasets = [
      {
        label: "Content Uploaded",
        backgroundColor: "rgba(0, 204, 102, 0.3)",
        borderColor: "#00cc66",
        fill: true,
        tension: 0.4,
        data: dashboard.revenue?.data || [],
      },
    ];

    mostViewedCourses.value = dashboard.top_articles || [];

    usersByRoleData.labels = dashboard.users_by_role?.map(
      item => item.role
    ) || [];

    usersByRoleData.datasets = [
      {
        label: "Users",
        backgroundColor: [
          "#00cc66",
          "#E87A18",
          "#fdc700",
          "#4caf50",
          "#ff5252",
          "#2196f3"
        ],
        data: dashboard.users_by_role?.map(
          item => item.count
        ) || [],
      },
    ];


  } catch (err) {
    console.error("Failed to load dashboard analytics", err);
  } finally {
    isLoading.value = false;
  }
};



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

const active = ref("Dashboard");
const router = useRouter();


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
  maintainAspectRatio: false,
  plugins: {
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

onMounted(() => {
  fetchDashboardAnalytics();
});

</script>

<template>
  <div class="flex min-h-screen font-sans">
    <EditorSidebar />
    <main class="flex-1 p-8 overflow-auto bg-white">
      <div class="mb-8">
        <h1 class="text-4xl font-extrabold text-[#E87A18]">Welcome Editor!</h1>
        <p class="text-gray-700 mt-2">
          Here is how your pages are performing today.
        </p>
      </div>

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
              <span class="text-[#ff9900]">★★★★</span><span class="text-gray-300">★</span>
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
            Website Visit
          </h2>
          <div class="h-[300px] w-full">
            <Bar v-if="engagementData.datasets.length" :data="engagementData" :options="barOptions" />

          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-lg w-full">
          <h2 class="text-xl font-semibold mb-4 text-[#006633]">
            Page Visits
          </h2>
          <div class="h-[300px] w-full">
            <Pie v-if="completionData.datasets.length" :data="completionData" :options="pieOptions" />
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-lg w-full">
          <h2 class="text-xl font-semibold mb-4 text-[#006633]">
            Number of visitors per page
          </h2>
          <div class="h-[300px] w-full">
            <Line v-if="growthData.datasets.length" :data="growthData" :options="lineOptions" />
          </div>
        </div>
      </div>
      <div class="p-6 bg-white rounded-xl">

        <div class="flex justify-between items-stretch mb-8 space-x-6">
          <div v-for="card in summaryData" :key="card.title"
            class="summary-card-alt flex-1 p-6 text-center bg-white shadow-lg relative overflow-hidden group transition-all duration-300"
            :class="{
              'rounded-tl-4xl rounded-br-4xl': true,
            }">
            <div class="absolute inset-y-0 left-0 w-1 bg-[#00cc66]"></div>
            <div class="absolute inset-y-0 right-0 w-1 bg-[#00cc66]"></div>

            <p class="text-gray-600 text-sm mb-1">{{ card.title }}</p>

            <div class="text-2xl font-bold text-gray-800 mb-1">
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


      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-white rounded-lg">
        <div class="lg:col-span-2">
          <div class="bg-white p-6 rounded-lg shadow-sm mb-0">
            <div class="flex justify-between items-start mb-4">
              <h2 class="text-2xl font-bold text-gray-800">Total Content Uploaded</h2>
              <div class="p-2 border border-gray-300 rounded-md text-sm cursor-pointer flex items-center">
                Yearly <span class="ml-1 text-xs">⌄</span>
              </div>
            </div>
            <div class="h-80">
              <Line v-if="revenueData.datasets.length" :data="revenueData" :options="revenueChartOptions" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-0 mt-[-10px]">
            <div class="highlight-card-wrapper border-r border-orange-100">
              <div class="highlight-card">
                <p class="text-sm text-gray-500 mb-1">Top month</p>
                <p class="text-3xl font-bold text-[#E87A18]">November</p>
                <p class="text-xl font-semibold text-[#E87A18] mt-1">2019</p>
              </div>
            </div>

            <div class="highlight-card-wrapper border-r border-orange-100">
              <div class="highlight-card">
                <p class="text-sm text-gray-500 mb-1">Top year</p>
                <p class="text-3xl font-bold text-[#E87A18]">2023</p>
                <p class="text-xl font-semibold text-gray-600 mt-1">
                  96K sold so far
                </p>
              </div>
            </div>

            <div class="highlight-card-wrapper">
              <div class="highlight-card">
                <p class="text-sm text-gray-500 mb-1">Best Seller</p>
                <img :src="assets" alt="Instructor" class="w-10 h-10 rounded-full mb-1 border-2 border-orange-300" />
                <p class="text-lg font-bold text-gray-800">Naturopathy 101</p>
                <p class="text-sm text-gray-600">Dr. Kanu Nwarikwo</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">
            Top most read articles
          </h2>
          <div class="space-y-4">
            <div v-for="(course, index) in mostViewedCourses" :key="index" class="flex items-center">
              <div
                class="relative flex-grow h-8 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-orange-300 to-orange-400 rounded-lg"
                  :style="{ width: course.progress }"></div>
                <p
                  class="relative z-10 text-sm font-semibold text-gray-800 px-3 py-1 flex justify-between items-center h-full">
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
