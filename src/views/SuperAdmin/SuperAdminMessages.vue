<script setup>
import SuperAdminSidebar from '@/views/SuperAdmin/SuperAdminSidebar.vue';
import { computed, ref } from 'vue';

const DARK_GREEN = '#004d33';
const LIGHT_GREEN = '#f2f9f3';

const currentTab = ref('Direct Messages');
const currentGroup = ref('General');
const currentDMUser = ref('Ade John');
const messageInput = ref('');
const directMessages = ref([]);
const chatMessages = ref([]);
const selectedUserId = ref(null);

const tabs = ['Direct Messages'];
const searchQuery = ref('');

const filteredDMs = computed(() =>
  directMessages.value.filter((dm) =>
    dm.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const loadConversations = async () => {
  try {
    const res = await messagingApi.getConversations();
    directMessages.value = res.results.map((c) => ({
      id: c.user.id,
      name: c.user.full_name,
      initial: c.user.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2),
      count: c.unread_count,
      color: 'bg-green-600',
    }));
  } catch (err) {
    console.error(err);
  }
};

const loadMessages = async (userId) => {
  try {
    const res = await messagingApi.getMessagesWithUser({
      user_id: userId,
    });

    chatMessages.value = res.results.map((m) => ({
      id: m.id,
      sender: m.sender.full_name,
      time: new Date(m.created_at).toLocaleTimeString(),
      initial: m.sender.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2),
      color: m.sender.is_admin ? 'bg-green-600' : 'bg-gray-500',
      body: m.content,
    }));
  } catch (err) {
    console.error(err);
  }
};

const sendMessage = async () => {
  if (!messageInput.value || !selectedUserId.value) return;

  try {
    const res = await messagingApi.sendMessage({
      receiver_id: selectedUserId.value,
      content: messageInput.value,
    });

    chatMessages.value.push({
      sender: 'You',
      time: new Date(res.created_at).toLocaleTimeString(),
      initial: 'AD',
      color: 'bg-green-600',
      body: res.content,
    });

    messageInput.value = '';
  } catch (err) {
    console.error(err);
  }
};

const isGroupActive = (name) => name === currentGroup.value;
const isDMActive = (dm) => dm.id === selectedUserId.value;

const activeChatTitle = computed(() => {
  if (currentTab.value === 'Groups') {
    return currentGroup.value;
  }
  if (currentTab.value === 'Direct Messages') {
    return currentDMUser.value;
  }
  return '';
});

const selectDMUser = async (dm) => {
  currentDMUser.value = dm.name;
  selectedUserId.value = dm.id;

  await loadMessages(dm.id);
};

const selectGroup = (name) => {
  currentGroup.value = name;
  if (currentTab.value !== 'Groups') {
    currentTab.value = 'Groups';
  }
};

onMounted(() => {
  loadConversations();
});
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <SuperAdminSidebar />

    <main class="flex-1 p-8 overflow-auto md:p-8 lg:p-12">
      <!-- Breadcrumbs -->
      <div class="text-sm text-gray-500 mb-6">
        <span class="text-[#006633]">Home</span> > Messages
      </div>
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
            <div class="mb-3">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search user..."
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <button
              v-for="dm in filteredDMs"
              :key="dm.name"
              @click="selectDMUser(dm)"
              class="flex items-center justify-between w-full p-2 rounded-lg transition-colors"
              :class="
                isDMActive(dm)
                  ? 'font-semibold'
                  : 'hover:bg-gray-50 text-gray-600'
              "
              :style="
                isDMActive(dm)
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

            <p
              v-if="filteredDMs.length === 0"
              class="text-gray-400 text-sm mt-3 text-center"
            >
              No user found
            </p>
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
              <button class="p-3 text-gray-400 hover:text-gray-600 transition">
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
                @click="sendMessage"
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
</template>

<style scoped></style>
