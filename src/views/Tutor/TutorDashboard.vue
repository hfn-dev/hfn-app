<script setup>
import analyticsService from '@/api/dashboard.js';
import TutorSidebar from '@/views/Tutor/TutorSidebar.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

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
const statCards = ref([]);
const engagementData = ref(null);
const completionData = ref(null);
const growthData = ref(null);
const loading = ref(false);

// // --- STATS DATA ---
// const statCards = [
//   {
//     title: "Total Courses",
//     value: "13",
//     change: "13% Increase",
//     changeColor: "text-[#00cc66]",
//   },
//   {
//     title: "Active Courses",
//     value: "7",
//     change: "13% Increase",
//     changeColor: "text-[#00cc66]",
//   },
//   {
//     title: "Average Enrollment",
//     value: "13",
//     change: "–5% Decrease",
//     changeColor: "text-red-500",
//   },
//   {
//     title: "Average Rating",
//     value: "4.5",
//     stars: true,
//     change: "0% Increase",
//     changeColor: "text-gray-500",
//   },
// ];

// const engagementData = {
//   labels: [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ],
//   datasets: [
//     {
//       label: "Engagement",
//       backgroundColor: "#28a745",
//       borderRadius: 8,
//       data: [60, 80, 40, 70, 100, 90, 80, 110, 95, 85, 70, 90],
//     },
//   ],
// };

// const completionData = {
//   labels: ["Completed", "In Progress", "Pending"],
//   datasets: [
//     {
//       label: "Course Completion",
//       backgroundColor: ["#28a745", "#ffb300", "#ff5252"],
//       data: [45, 35, 20],
//     },
//   ],
// };

// const growthData = {
//   labels: [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ],
//   datasets: [
//     {
//       label: "Students",
//       borderColor: "#fdc700",
//       backgroundColor: "#fdc7008a",
//       fill: true,
//       tension: 0.4,
//       data: [150, 200, 180, 260, 300, 400, 380, 420, 450, 480, 460, 500],
//     },
//   ],
// };

const fetchDashboardStats = async () => {
  const res = await analyticsService.fetchDashboard();

  statCards.value = [
    {
      title: 'Total Courses',
      value: res.total_courses,
      change: `${res.total_courses_change}% Increase`,
      changeColor: 'text-[#00cc66]',
    },
    {
      title: 'Active Courses',
      value: res.active_courses,
      change: `${res.active_courses_change}% Increase`,
      changeColor: 'text-[#00cc66]',
    },
    {
      title: 'Average Enrollment',
      value: res.average_enrollment,
      change: `${res.enrollment_change}%`,
      changeColor:
        res.enrollment_change < 0 ? 'text-red-500' : 'text-[#00cc66]',
    },
    {
      title: 'Average Rating',
      value: res.average_rating,
      stars: true,
      change: '—',
      changeColor: 'text-gray-500',
    },
  ];
};

const fetchEngagement = async () => {
  const res = await analyticsService.fetchWebsiteAnalytics();

  engagementData.value = {
    labels: res.labels,
    datasets: [
      {
        label: 'Engagement',
        backgroundColor: '#28a745',
        borderRadius: 8,
        data: res.data,
      },
    ],
  };
};

const fetchCompletion = async () => {
  const res = await analyticsService.fetchCourseAnalytics();

  completionData.value = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        backgroundColor: ['#28a745', '#ffb300', '#ff5252'],
        data: [res.completed, res.in_progress, res.pending],
      },
    ],
  };
};

const fetchGrowth = async () => {
  const res = await analyticsService.fetchUserAnalytics();

  growthData.value = {
    labels: res.months,
    datasets: [
      {
        label: 'Students',
        borderColor: '#fdc700',
        backgroundColor: '#fdc7008a',
        fill: true,
        tension: 0.4,
        data: res.students,
      },
    ],
  };
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

onMounted(async () => {
  loading.value = true;
  try {
    await Promise.all([
      fetchDashboardStats(),
      fetchEngagement(),
      fetchCompletion(),
      fetchGrowth(),
    ]);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="flex min-h-screen font-sans">
    <TutorSidebar />
    <main class="flex-1 p-8 overflow-auto bg-white">
      <div class="mb-8">
        <h1 class="text-4xl font-extrabold text-[#E87A18]">Welcome HBA!</h1>
        <p class="text-gray-700 mt-2">
          Here is how your courses are performing today.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
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
            Student Monthly Engagement
          </h2>
          <div class="h-[300px] w-full">
            <Bar
              v-if="engagementData"
              :data="engagementData"
              :options="barOptions"
            />
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-lg w-full">
          <h2 class="text-xl font-semibold mb-4 text-[#006633]">
            Course Completion
          </h2>
          <div class="h-[300px] w-full">
            <Pie
              v-if="completionData"
              :data="completionData"
              :options="pieOptions"
            />
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-lg w-full">
          <h2 class="text-xl font-semibold mb-4 text-[#006633]">
            Student Enrollment Growth
          </h2>
          <div class="h-[300px] w-full">
            <Line v-if="growthData" :data="growthData" :options="lineOptions" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.h-\[300px\] {
  height: 300px;
}
</style>
