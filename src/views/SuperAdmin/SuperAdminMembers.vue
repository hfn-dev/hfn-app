<script setup>
import analyticsApi from '@/api/dashboard.js';
import membershipAPI from '@/api/membership.js';
import SuperAdminSidebar from '@/views/SuperAdmin/SuperAdminSidebar.vue';
import { computed } from 'vue';

import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Eye,
  MoreVertical,
  Search,
  Trash2,
} from 'lucide-vue-next';
import { ref } from 'vue';

const courseTabs = ref(['Published', 'Drafts', 'Archived']);
const currentTab = ref('Published');
const members = ref([]);
const itemsPerPage = 10;
const searchTerm = ref('');
const statCards = ref([]);

const currentPage = ref(1);
const totalPages = ref(1);

const loadMembershipAnalytics = async () => {
  try {
    const data = await analyticsApi.fetchMembershipAnalytics();

    statCards.value = [
      {
        title: 'Total Members',
        value: data.total_members ?? 0,
        change: '',
        changeColor: 'text-blue-300',
      },
      {
        title: 'Total New Members',
        value: data.new_members ?? 0,
        change: '',
        changeColor: 'text-[#00cc66]',
      },
      {
        title: 'Total Corporate',
        value: data.corporate ?? 0,
        change: '',
        changeColor: 'text-gray-500',
      },
      {
        title: 'Total Individual',
        value: data.individual ?? 0,
        change: '',
        changeColor: 'text-gray-500',
      },
      {
        title: 'Multinationals',
        value: data.multinationals ?? 0,
        change: '',
        changeColor: 'text-gray-500',
      },
      {
        title: 'Diaspora',
        value: data.diaspora ?? 0,
        change: '',
        changeColor: 'text-[#00cc66]',
      },
      {
        title: 'Health Guardians',
        value: data.health_guardians ?? 0,
        change: '',
        changeColor: 'text-blue-300',
      },
      {
        title: 'Total Associations',
        value: data.associations ?? 0,
        change: '',
        changeColor: 'text-gray-500',
      },
    ];
  } catch (error) {
    console.error('Failed to load membership analytics', error);
  }
};

const fetchMembers = async () => {
  try {
    const data = await membershipAPI.listApplications({
      page: currentPage.value,
    });
    members.value = data.results;
    totalPages.value = Math.ceil(data.count / itemsPerPage);
  } catch (error) {
    console.error('Failed to fetch members', error);
  }
};

onMounted(() => {
  fetchMembers();
  loadMembershipAnalytics();
});

const handleAction = async (action, memberId) => {
  try {
    if (action === 'Delete') {
      await membershipAPI.deleteApplication(memberId);
      members.value = members.value.filter((m) => m.id !== memberId);
    } else if (action === 'Edit') {
      console.log(`Edit member ID: ${memberId}`);
    } else if (action === 'View') {
      const data = await membershipAPI.getApplication(memberId);
      console.log('Member Details:', data);
    }
  } catch (error) {
    console.error(`${action} failed for member ${memberId}:`, error);
  }
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchMembers();
  }
};

const filteredMembers = computed(() => {
  if (!searchTerm.value) return members.value;

  const term = searchTerm.value.toLowerCase();
  return members.value.filter(
    (m) =>
      m.name.toLowerCase().includes(term) ||
      m.category?.toLowerCase().includes(term) ||
      (m.lastPayment || '').toLowerCase().includes(term)
  );
});

const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredMembers.value.slice(start, end);
});
</script>

<template>
  <div class="flex min-h-screen font-sans">
    <SuperAdminSidebar />
    <main class="flex-1 p-8 overflow-auto bg-white">
      <div class="text-sm text-gray-500 mb-6">
        <span class="text-[#006633]">Home</span> > Members
      </div>

      <div class="text-center mb-8">
        <h1
          class="text-3xl font-bold text-gray-800 mb-6 border-b border-[#006633]/30 inline-block pb-3"
        >
          Members
        </h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
      </div>

      <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div class="flex justify-end mb-6">
          <div class="relative w-full max-w-sm">
            <Search
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            />
            <input
              type="text"
              v-model="searchTerm"
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
                Name
                <MoreVertical
                  class="w-4 h-4 ml-1 text-gray-500 cursor-pointer"
                />
              </th>
              <th class="py-3 px-3 text-left">
                Category
                <MoreVertical
                  class="w-4 h-4 ml-1 text-gray-500 cursor-pointer"
                />
              </th>
              <th class="py-3 px-3 text-left">
                Last Payment
                <MoreVertical
                  class="w-4 h-4 ml-1 text-gray-500 cursor-pointer"
                />
              </th>
              <th class="py-3 px-3 text-left">
                Status
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
              v-for="member in paginatedMembers"
              :key="member.id"
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
                {{ member.name }}
              </td>
              <td class="py-3 px-3">
                {{ member.enrollments !== null ? member.enrollments : '-' }}
              </td>
              <td class="py-3 px-3">
                <span
                  :class="{
                    'text-green-600 font-semibold':
                      member.completion.includes('100'),
                    'text-orange-500':
                      parseFloat(course.completion) < 50 &&
                      member.completion !== '-',
                  }"
                >
                  {{ member.completion }}
                </span>
              </td>
              <td class="py-3 px-3">
                {{ member.lastUpdate }}
              </td>
              <td class="py-3 px-3 text-center">
                <div class="flex item-center justify-center space-x-2">
                  <button
                    @click="handleAction('View', member.id)"
                    class="w-6 h-6 transform hover:text-blue-500 hover:scale-110 transition-transform p-0.5"
                  >
                    <Eye
                      class="w-full h-full text-gray-500 hover:text-blue-500"
                    />
                  </button>
                  <button
                    @click="handleAction('Edit', member.id)"
                    class="w-6 h-6 transform hover:text-green-500 hover:scale-110 transition-transform p-0.5"
                  >
                    <Edit2
                      class="w-full h-full text-gray-500 hover:text-green-500"
                    />
                  </button>
                  <button
                    @click="handleAction('Delete', member.id)"
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
