<script setup>
import assets from "@/assets/assets.png";
import SuperAdminSidebar from "@/views/SuperAdmin/SuperAdminSidebar.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

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

const revenueData = reactive({
  labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
  datasets: [
    {
      label: "Revenue",
      backgroundColor: "rgba(0, 204, 102, 0.3)",
      borderColor: "#00cc66",
      pointBackgroundColor: "#00cc66",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#00cc66",
      data: [5000, 10000, 30000, 60000, 10000, 20000, 70000, 95000],
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

const mostViewedCourses = reactive([
  { name: "Pregnancy", value: "120K", progress: "100%" },
  { name: "Pregnancy", value: "120K", progress: "100%" },
  { name: "Pregnancy", value: "80K", progress: "66%" },
  { name: "Pregnancy", value: "80K", progress: "66%" },
  { name: "Pregnancy", value: "70K", progress: "58%" },
  { name: "Pregnancy", value: "70K", progress: "58%" },
  { name: "Pregnancy", value: "50K", progress: "42%" },
  { name: "Pregnancy", value: "50K", progress: "42%" },
  { name: "Pregnancy", value: "50K", progress: "42%" },
]);

const summaryData = reactive([
  {
    title: "Total Visits",
    value: "12,456",
    trendValue: "Up 12%",
    trendType: "up",
  },
  {
    title: "Unique Visits",
    value: "456",
    trendValue: "Down 29%",
    trendType: "down",
  },
  {
    title: "Bounce Rate",
    value: "12,456",
    trendValue: "Up 12%",
    trendType: "up",
  },
  {
    title: "Time spent on Courses",
    value: "36,090 hrs",
    trendValue: "Up 12%",
    trendType: "up",
  },
]);

const courseData = reactive([
  { name: "Pregnancy", enrollments: 340 },
  { name: "Data Science Course", enrollments: 275 },
  { name: "Digital Illustration", enrollments: 50 },
  { name: "Advanced Excel", enrollments: 410 },
]);

// --- STATS DATA ---
const statCards = [
  {
    title: "Total Courses",
    value: "13",
    change: "13% Increase",
    changeColor: "text-[#00cc66]",
  },
  {
    title: "Active Courses",
    value: "7",
    change: "13% Increase",
    changeColor: "text-[#00cc66]",
  },
  {
    title: "Average Enrollment",
    value: "13",
    change: "–5% Decrease",
    changeColor: "text-red-500",
  },
  {
    title: "Average Rating",
    value: "4.5",
    stars: true,
    change: "0% Increase",
    changeColor: "text-gray-500",
  },
];

const engagementData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Engagement",
      backgroundColor: "#28a745",
      borderRadius: 8,
      data: [60, 80, 40, 70, 100, 90, 80, 110, 95, 85, 70, 90],
    },
  ],
};

const completionData = {
  labels: ["Completed", "In Progress", "Pending"],
  datasets: [
    {
      label: "Course Completion",
      backgroundColor: ["#28a745", "#ffb300", "#ff5252"],
      data: [45, 35, 20],
    },
  ],
};

const growthData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Students",
      borderColor: "#fdc700",
      backgroundColor: "#fdc7008a",
      fill: true,
      tension: 0.4,
      data: [150, 200, 180, 260, 300, 400, 380, 420, 450, 480, 460, 500],
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
</script>

<template>
  <div class="flex min-h-screen font-sans">
    <SuperAdminSidebar />
    <main class="flex-1 p-8 overflow-auto bg-white">
      <div class="mb-8">
        <h1 class="text-4xl font-extrabold text-[#E87A18]">Welcome Super Admin!</h1>
        <p class="text-gray-700 mt-2">
          Here is how your courses are performing today.
        </p>
      </div>

      <div class="flex justify-between items-stretch mb-10 space-x-6">
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
            v-for="card in summaryData"
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
            v-for="course in courseData"
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
                <img
                  :src="assets"
                  alt="Instructor"
                  class="w-10 h-10 rounded-full mb-1 border-2 border-orange-300"
                />
                <p class="text-lg font-bold text-gray-800">Naturopathy 101</p>
                <p class="text-sm text-gray-600">Dr. Kanu Nwarikwo</p>
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
              v-for="(course, index) in mostViewedCourses"
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




