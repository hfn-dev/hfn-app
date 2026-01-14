<script setup>
import analyticsApi from '@/api/dashboard.js';
import membershipApi from '@/api/membership.js';

import { useToast } from '@/composables/useToast';
import AdminSidebar from '@/views/Admin/AdminSidebar.vue';
import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Eye,
  MoreVertical,
  Search,
  Trash2,
} from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isEditOpen = ref(false);
const editingSubscription = ref(null);
const selectedType = ref(null);
const toast = useToast();
const courseTabs = ref(['Published', 'Drafts', 'Archived']);
const currentTab = ref('Published');
const statCards = ref([]);
const members = ref([]);
const activeCourses = computed(() => members.value);
const searchTerm = ref('');

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

const loadMembers = async () => {
  try {
    const data = await membershipApi.listSubscriptions({
      page: currentPage.value,
      search: searchTerm.value,
    });

    members.value = data.results.map((item) => ({
      id: item.id,
      title: item.user?.full_name || '—',
      enrollments: item.membership_type?.name || '—',
      completion: item.last_payment_date || '—',
      lastUpdate: item.status === 'active' ? 'Active' : 'Inactive',
    }));

    totalPages.value = Math.ceil(data.count / 10);
  } catch (error) {
    console.error('Failed to load members', error);
  }
};

// const activeCourses = computed(() => {
//   if (currentTab.value === 'Published') return publishedCourses.value;
//   if (currentTab.value === 'Drafts') return draftCourses.value;
//   if (currentTab.value === 'Archived') return archivedCourses.value;
//   return [];
// });

const handleAction = (action, member) => {
  if (action === 'View') {
    router.push(`/admin/members/${member.id}`);
  }

  if (action === 'Edit') {
    editingSubscription.value = { ...member };
    selectedType.value = member.membershipTypeId;
    isEditOpen.value = true;
  }

  if (action === 'Delete') {
    cancelSubscription(member.id);
  }
};

const cancelSubscription = async (id) => {
  const confirmCancel = confirm(
    'Are you sure you want to cancel this subscription?'
  );

  if (!confirmCancel) return;

  try {
    await membershipApi.cancelSubscription(id);
    await loadMembers(); // refresh list
  } catch (error) {
    console.error('Failed to cancel subscription', error);
  }
};

const currentPage = ref(1);
const totalPages = 2;

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    loadMembers();
  }
};

const saveEdit = async () => {
  try {
    await membershipApi.updateSubscription(editingSubscription.value.id, {
      membership_type: selectedType.value,
      status: editingSubscription.value.status,
    });

    isEditOpen.value = false;
    editingSubscription.value = null;

    await loadMembers(); // refresh table
  } catch (error) {
    console.error('Failed to update subscription', error);
  }
};

onMounted(() => {
  loadMembershipAnalytics();
  loadMembers();
});
</script>

<template>
  <div class="flex min-h-screen font-sans">
    <AdminSidebar />
    <main class="flex-1 p-8 overflow-auto bg-white">
      <!-- Breadcrumbs -->
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
              @input="loadMembers"
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
              <td class="py-3 px-3">
                {{ course.enrollments !== null ? course.enrollments : '-' }}
              </td>
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
                    @click="handleAction('Delete', course.id)"
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

        <!-- Edit Subscription Modal -->
        <div
          v-if="isEditOpen"
          class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <h3 class="text-xl font-semibold mb-4">Edit Subscription</h3>

            <!-- Membership Type -->
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1"
                >Membership Type</label
              >
              <select
                v-model="selectedType"
                class="w-full border rounded-lg px-3 py-2"
              >
                <option
                  v-for="type in membershipTypes"
                  :key="type.id"
                  :value="type.id"
                >
                  {{ type.name }}
                </option>
              </select>
            </div>

            <!-- Status -->
            <div class="mb-6">
              <label class="block text-sm font-medium mb-1">Status</label>
              <select
                v-model="editingSubscription.status"
                class="w-full border rounded-lg px-3 py-2"
              >
                <option value="active">Active</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <!-- Actions -->
            <div class="flex justify-end space-x-3">
              <button
                @click="isEditOpen = false"
                class="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                @click="saveEdit"
                class="px-4 py-2 rounded-lg bg-[#00cc66] text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

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
