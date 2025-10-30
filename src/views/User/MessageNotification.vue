<script setup>
import AdminSidebar from '@/components/layout/AdminSidebar.vue';
import { computed, ref } from 'vue';
// import AppLayout from '@/components/layout/AppLayout.vue';
// import AdminHeader from '../../components/layout/AdminHeader.vue';
// import AdminSidebar from '../../components/layout/AdminSidebar.vue';

const DARK_GREEN = '#004d33';
const LIGHT_GREEN = '#f2f9f3';

const currentTab = ref('Directory');
const currentGroup = ref('General');
const currentDMUser = ref('Ade John');
const messageInput = ref('');

const tabs = ['Directory', 'Direct Messages', 'Groups', 'Notifications', 'Connections'];

const directMessages = [
  {
    name: 'Ade John',
    initial: 'AJ',
    count: 5,
    path: 'ade-john',
    color: 'bg-orange-500',
  },
  {
    name: 'Victor Thompson',
    initial: 'VT',
    count: 2,
    path: 'victor-thompson',
    color: 'bg-amber-600',
  },
  {
    name: 'John Doe',
    initial: 'JD',
    count: 0,
    path: 'john-doe',
    color: 'bg-gray-500',
  },
  {
    name: 'Blessing Victor',
    initial: 'BV',
    count: 0,
    path: 'blessing-victor',
    color: 'bg-blue-500',
  },
];

const groups = [
  { name: 'General', count: 6, path: 'general', icon: '#' },
  { name: 'Paediatrics', count: 2, path: 'paediatrics', icon: '#' },
  { name: 'Doctors', count: 0, path: 'doctors', icon: '#' },
  { name: 'Diaspora', count: 0, path: 'diaspora', icon: '#' },
];

const chatMessages = [
  {
    sender: 'Ade John',
    time: '09:00 AM',
    initial: 'AJ',
    color: 'bg-orange-500',
    body: 'Lorem ipsum dolor sit amet consectetur. Et dui neque et fames volutpat. Vulputate feugiat nisl diam nec cursus malesuada. Viverra laoreet faucibus',
  },
  {
    sender: 'Salisu Orisha',
    time: '09:04 AM',
    initial: 'SO',
    color: 'bg-green-600',
    body: 'Lorem ipsum dolor sit amet consectetur. Et dui neque et fames volutpat. Vulputate feugiat nisl diam nec cursus malesuada. Viverra laoreet faucibus',
  },
  {
    sender: 'Ade John',
    time: '09:08 AM',
    initial: 'VT',
    color: 'bg-amber-600',
    body: 'Lorem ipsum dolor sit amet consectetur. Et dui neque et fames volutpat. Viverra laoreet faucibus',
  },
  { type: 'file', sender: 'Ade John', file: 'File.doc' },
  {
    sender: 'Salisu Orisha',
    time: '09:12 AM',
    initial: 'SO',
    color: 'bg-green-600',
    body: 'Lorem ipsum dolor sit amet consectetur. Et dui neque et fames volutpat. Vulputate feugiat nisl diam nec cursus malesuada. Viverra laoreet faucibus',
  },
];

const messageNotifications = [
  {
    category: 'COURSES',
    time: '09:14 AM',
    title: 'NATUROPATHY BY KANU NWANKWO HAS BEEN UPDATED',
    body: 'Do ullamco ex velit anim do proident exercitation et anim tempor. Lorem sunt deserunt labore non excepteur veniam enim quis officia magna ani...',
  },
  {
    category: 'SYSTEM',
    time: '09:14 AM',
    title: 'UPDATED TERMS AND CONDITIONS',
    body: 'Do ullamco ex velit anim do proident exercitation et anim tempor. Lorem sunt deserunt labore non excepteur veniam enim quis officia magna ani...',
  },
  {
    category: 'MY ACCOUNT',
    time: '09:14 AM',
    title: 'INCOMPLETE PROFILE',
    body: 'Do ullamco ex velit anim do proident exercitation et anim tempor. Lorem sunt deserunt labore non excepteur veniam enim quis officia magna ani...',
  },
  {
    category: 'SUBSCRIPTION',
    time: '09:14 AM',
    title: 'YOUR SUBSCRIPTION IS ABOUT TO END',
    body: 'Do ullamco ex velit anim do proident exercitation et anim tempor. Lorem sunt deserunt labore non excepteur veniam enim quis officia magna ani...',
  },
];

const isGroupActive = (name) => name === currentGroup.value;
const isDMActive = (name) => name === currentDMUser.value;

const activeChatTitle = computed(() => {
  if (currentTab.value === 'Groups') {
    return currentGroup.value;
  }
  if (currentTab.value === 'Direct Messages') {
    return currentDMUser.value;
  }
  return '';
});

const selectDMUser = (name) => {
  currentDMUser.value = name;
  if (currentTab.value !== 'Direct Messages') {
    currentTab.value = 'Direct Messages';
  }
};

const selectGroup = (name) => {
  currentGroup.value = name;
  if (currentTab.value !== 'Groups') {
    currentTab.value = 'Groups';
  }
};

 const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const directoryUsers = [
  { name: 'ABIOLA MORUF TAJUDEEN', status: 'connect', initial: 'AM' },
  { name: 'ANIEBE SOMTO EMELDA', status: 'connect', initial: 'AS' },
  { name: 'AROGUNDADE IFEOLUWAN THEOPHILUS', status: 'connected', initial: 'AI' },
  { name: 'ATAGUBA FRANKLIN', status: 'connect', initial: 'AF' },
  // Adding more dummy data to fill the list
  { name: 'Blessing Victor', status: 'connected', initial: 'BV' },
  { name: 'Chukwuma David', status: 'connect', initial: 'CD' },
  { name: 'Esther Kanu', status: 'connected', initial: 'EK' },
];

const connectionRequests = [
  { name: 'Request from John Doe', time: '1 hour ago' },
  { name: 'Request from Jane Smith', time: '5 hours ago' },
]; 
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <div class="flex flex-grow">
      <AdminSidebar class="hidden md:flex" />

      <main class="flex-grow p-4 md:p-8 lg:p-12">
        <!-- <h1 class="text-4xl font-semibold text-gray-800 mb-8">Messages</h1> -->
<div class="flex justify-center w-full items-center mb-8">
          <div class="w-full">
            <div class="mb-16 w-full">
              <div
                class="w-full px-4 py-4 sm:px-6 rounded-2xl border-2 border-green-100 bg-white shadow-md text-center"
              >
                <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900">
                  Messages
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div class="border-b border-gray-200 mb-6 max-w-7xl">
          <div class="flex text-lg font-medium">
            <button
              v-for="tab in tabs"
              :key="tab"
              @click="currentTab = tab"
              class="py-2 px-4 transition border-b-2"
              :class="
                currentTab === tab
                  ? 'font-bold'
                  : 'text-gray-500 hover:text-gray-900 border-transparent'
              "
              :style="
                currentTab === tab
                  ? { color: DARK_GREEN, borderColor: DARK_GREEN }
                  : {}
              "
            >
              {{ tab }}
            </button>
          </div>
        </div>

        <div v-if="currentTab === 'Directory'" class="max-w-7xl bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div class="flex justify-between items-center mb-6">
                <div class="relative w-full max-w-sm mr-4">
                    <input type="text" placeholder="Search" class="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </div>
                <div class="flex items-center">
                    <span class="text-sm font-medium text-gray-700 mr-2">Sort By</span>
                    <select class="p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500">
                        <option>Name (A-Z)</option>
                        <option>Status</option>
                    </select>
                </div>
            </div>

            <div class="flex flex-wrap justify-start gap-1 p-2 bg-gray-50 rounded-lg mb-6 border border-gray-200">
                <button
                    v-for="letter in alphabet"
                    :key="letter"
                    class="w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-lg transition-all"
                    :class="{
                        'bg-green-100 text-gray-800 border border-green-300': letter === 'A',
                        'text-gray-500 hover:bg-gray-100': letter !== 'A',
                    }"
                    :style="letter === 'A' ? { borderColor: DARK_GREEN, backgroundColor: LIGHT_GREEN, color: DARK_GREEN } : {}"
                >
                    {{ letter }}
                </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 h-[50vh] overflow-y-auto">
                <div 
                    v-for="(user, index) in directoryUsers" 
                    :key="index" 
                    class="py-2 px-3 border-l-4 border-green-500 flex flex-col justify-center"
                >
                    <p class="text-sm font-semibold text-gray-800">{{ user.name }}</p>
                    <button 
                        v-if="user.status === 'connect'"
                        class="mt-1 text-xs px-2 py-1 border border-green-600 text-green-600 rounded-full w-fit hover:bg-green-50 transition"
                    >
                        Request to Connect
                    </button>
                    <span v-else class="mt-1 text-xs text-gray-500">Connected</span>
                </div>
            </div>

            <div class="mt-6 flex justify-end">
                <span class="text-sm text-gray-500">Page 1 of 10</span>
            </div>
        </div>

        <div v-if="currentTab === 'Notifications'" class="space-y-6 max-w-4xl">
          <div
            v-for="(message, index) in messageNotifications"
            :key="index"
            class="bg-white p-6 rounded-xl shadow-md border-l-4"
            :class="{
              'border-green-600': message.category === 'COURSES',
              'border-blue-600': message.category === 'SYSTEM',
              'border-yellow-600': message.category === 'MY ACCOUNT',
              'border-red-600': message.category === 'SUBSCRIPTION',
            }"
          >
            <div class="flex justify-between items-start mb-2">
              <div class="flex items-center space-x-2">
                <svg
                  v-if="message.category === 'COURSES'"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-5 h-5 text-green-600"
                >
                  <path
                    d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V5H6.5A2.5 2.5 0 0 0 4 7.5v12z"
                  />
                </svg>
                <span
                  class="text-xs font-semibold uppercase tracking-wider"
                  :class="{
                    'text-green-600': message.category === 'COURSES',
                    'text-blue-600': message.category === 'SYSTEM',
                    'text-yellow-600': message.category === 'MY ACCOUNT',
                    'text-red-600': message.category === 'SUBSCRIPTION',
                  }"
                >
                  {{ message.category }}
                </span>
                <div class="w-1 h-1 bg-gray-300 rounded-full"></div>
                <span class="text-xs text-gray-500">{{ message.time }}</span>
              </div>
            </div>
            <p class="text-base font-bold text-gray-900 mb-1">
              {{ message.title }}
            </p>
            <p class="text-sm text-gray-600 line-clamp-2">
              {{ message.body }}
            </p>
          </div>
        </div>

        <div v-else-if="currentTab === 'Connections'" class="max-w-7xl bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Connection Requests ({{ connectionRequests.length }})</h3>
            <div v-if="connectionRequests.length > 0" class="space-y-3">
                <div v-for="(request, index) in connectionRequests" :key="index" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-sm font-bold text-purple-700">
                            {{ request.name.match(/\b(\w)/g).join('') }}
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-800">{{ request.name }}</p>
                            <span class="text-xs text-gray-500">{{ request.time }}</span>
                        </div>
                    </div>
                    <div class="space-x-2">
                        <button class="px-3 py-1 text-sm rounded-lg text-white" :style="{ backgroundColor: DARK_GREEN }">Accept</button>
                        <button class="px-3 py-1 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">Decline</button>
                    </div>
                </div>
            </div>
            <p v-else class="text-gray-500">You have no pending connection requests.</p>
            
            <h3 class="text-xl font-bold text-gray-800 mt-8 mb-4">Your Connections</h3>
            <p class="text-gray-500">List of your established connections will go here.</p>
        </div>

        <div
          v-if="currentTab === 'Groups' || currentTab === 'Direct Messages'"
          class="flex h-[80vh] min-h-[600px] max-w-7xl border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          <aside
            class="w-72 bg-white p-4 border-r border-gray-100 flex-shrink-0 overflow-y-auto"
          >
            <h2 class="text-xl font-bold text-gray-800 mb-4">
              {{ currentTab }}
            </h2>

            <div v-if="currentTab === 'Direct Messages'" class="space-y-1">
              <button
                v-for="dm in directMessages"
                :key="dm.name"
                @click="selectDMUser(dm.name)"
                class="flex items-center justify-between w-full p-2 rounded-lg transition-colors"
                :class="
                  isDMActive(dm.name)
                    ? 'font-semibold'
                    : 'hover:bg-gray-50 text-gray-600'
                "
                :style="
                  isDMActive(dm.name)
                    ? { backgroundColor: LIGHT_GREEN, color: DARK_GREEN }
                    : {}
                "
              >
                <div class="flex items-center">
                  <div
                    class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white mr-3 flex-shrink-0"
                    :class="dm.color"
                  >
                    {{ dm.initial }}
                  </div>
                  {{ dm.name }}
                </div>
                <span
                  v-if="dm.count > 0"
                  class="text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full text-white bg-green-700 ml-2"
                >
                  {{ dm.count }}
                </span>
              </button>
            </div>

            <div v-else-if="currentTab === 'Groups'" class="space-y-1">
              <button
                v-for="group in groups"
                :key="group.name"
                @click="selectGroup(group.name)"
                class="flex justify-between items-center w-full p-2 rounded-lg transition-colors"
                :class="
                  isGroupActive(group.name)
                    ? 'font-semibold'
                    : 'hover:bg-gray-50 text-gray-600'
                "
                :style="
                  isGroupActive(group.name)
                    ? { backgroundColor: LIGHT_GREEN, color: DARK_GREEN }
                    : {}
                "
              >
                <span class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-4 h-4 mr-2"
                  >
                    <line x1="16" y1="3" x2="8" y2="21"></line>
                    <line x1="21" y1="8" x2="3" y2="16"></line>
                  </svg>
                  {{ group.name }}
                </span>
                <span
                  v-if="group.count > 0"
                  class="text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full text-white bg-green-700"
                >
                  {{ group.count }}
                </span>
              </button>
            </div>
          </aside>

          <section class="flex-grow flex flex-col bg-white">
            <header class="p-4 border-b border-gray-100">
              <h3 class="text-xl font-semibold text-gray-800">
                {{ activeChatTitle }}
              </h3>
            </header>

            <div class="flex-grow p-6 space-y-4 overflow-y-auto">
              <div class="text-center my-4">
                <span class="text-xs text-gray-400">January 10</span>
              </div>

              <div
                v-for="(message, idx) in chatMessages"
                :key="idx"
                class="flex space-x-3"
              >
                <div v-if="message.type === 'file'" class="ml-12 w-full">
                  <a
                    href="#"
                    class="inline-flex items-center p-2 text-sm bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="w-4 h-4 mr-2"
                    >
                      <path
                        d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
                      />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    {{ message.file }}
                  </a>
                </div>

                <template v-else>
                  <div
                    class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                    :class="message.color"
                  >
                    {{ message.initial }}
                  </div>

                  <div class="flex flex-col">
                    <p class="text-sm font-semibold text-gray-800">
                      {{ message.sender }}
                      <span class="text-xs font-normal text-gray-400 ml-1">{{
                        message.time
                      }}</span>
                    </p>
                    <p class="text-gray-600 text-base">
                      {{ message.body }}
                    </p>
                  </div>
                </template>
              </div>
            </div>

            <footer class="p-4 border-t border-gray-100">
              <div
                class="flex items-center bg-gray-50 rounded-xl border border-gray-200 pr-2"
              >
                <button
                  class="p-3 text-gray-400 hover:text-gray-600 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5 h-5"
                  >
                    <path
                      d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19A4 4 0 0 1 18 3.5l-9.19 9.19a2 2 0 0 0 2.83 2.83l8.61-8.61"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  v-model="messageInput"
                  placeholder="Type your message"
                  class="flex-grow p-3 bg-transparent focus:outline-none text-gray-700"
                  @keyup.enter="sendMessage"
                />
                <button
                  class="p-3 text-white rounded-lg transition"
                  :style="{ backgroundColor: DARK_GREEN }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5 h-5"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 15 2 11 22 2" />
                  </svg>
                </button>
              </div>
            </footer>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped></style>
