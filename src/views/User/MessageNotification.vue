<script setup>
import UserSidebar from '@/components/layout/UserSidebar.vue';
import { computed, ref, onMounted, watch, onUnmounted } from 'vue';
import messagingApi from '@/api/messaging'; 
import userDirectory from '@/api/userDirectory';  
import { useToast } from 'vue-toastification';

const toast = useToast();
const DARK_GREEN = '#004d33';
const LIGHT_GREEN = '#f2f9f3';

const currentTab = ref('Directory');
const currentGroup = ref('General');
const currentDMUser = ref('Ade John');
const messageInput = ref('');
const searchQuery = ref('');

// Loading states
const isLoading = ref({
  directory: false,
  connections: false,
  notifications: false,
  groups: false,
  messages: false
});

// API data states
const directoryUsers = ref([]);
const connectionRequests = ref([]);
const connections = ref([]);
const notifications = ref([]);
const groups = ref([]);
const directMessages = ref([]);
const chatMessages = ref([]);
const unreadCount = ref(0);
const directoryPagination = ref({
  count: 0,
  next: null,
  previous: null,
  page: 1,
  pageSize: 20,
  currentLetter: 'A',
  currentSearch: ''
});

const tabs = ['Directory', 'Direct Messages', 'Groups', 'Notifications', 'Connections'];

// API calls
const fetchDirectoryUsers = async (letter = null, search = '', page = 1) => {
  isLoading.value.directory = true;
  
  // Update state
  if (letter !== null) {
    directoryPagination.value.currentLetter = letter;
    directoryPagination.value.currentSearch = '';
    searchQuery.value = letter;
  }
  
  if (search !== undefined && search !== null) {
    directoryPagination.value.currentSearch = search;
  }
  
  directoryPagination.value.page = page;
  
  try {
    const params = {
      page: page,
      page_size: directoryPagination.value.pageSize
    };
    
    // Use search if provided, otherwise use letter filter
    if (directoryPagination.value.currentSearch) {
      params.search = directoryPagination.value.currentSearch;
    } else if (directoryPagination.value.currentLetter) {
      params.letter = directoryPagination.value.currentLetter;
    }
    
    // listDirectoryUsers function
    const response = await  userDirectory.listDirectoryUsers(params);
    
    // Update pagination info
    directoryPagination.value.count = response.count;
    directoryPagination.value.next = response.next;
    directoryPagination.value.previous = response.previous;
    
    // Transform API response to match component structure
    directoryUsers.value = response.results.map(user => ({
      id: user.id,
      name: `${user.first_name} ${user.last_name}`.trim(),
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      status: user.connection_status, // API returns: 'none', 'pending', 'accepted', 'declined', 'blocked'
      isConnected: user.is_connected, // Boolean
      initial: (user.first_name?.[0] || '') + (user.last_name?.[0] || '') || '??',
      profileImage: user.profile_image,
      firstLetter: user.first_letter
    }));
    
  } catch (error) {
    console.error('Error fetching directory users:', error);
    toast.error('Failed to load directory users');
  } finally {
    isLoading.value.directory = false;
  }
};

// Handle letter click in directory - FIXED
const handleLetterClick = (letter) => {
  // Clear search when clicking a letter
  searchQuery.value = letter;
  fetchDirectoryUsers(letter, '', 1);
};

// Handle search in directory - FIXED
const handleSearch = () => {
  const query = searchQuery.value.trim();
  if (query) {
    // If search query is a single letter, treat it as letter filter
    if (query.length === 1 && /[A-Za-z]/.test(query)) {
      const upperLetter = query.toUpperCase();
      fetchDirectoryUsers(upperLetter, '', 1);
    } else {
      // Otherwise, treat as search
      fetchDirectoryUsers(null, query, 1);
    }
  } else {
    // If search is empty, show all users starting with A
    fetchDirectoryUsers('A', '', 1);
  }
};

// Handle sort by - FIXED
const handleSortBy = (sortType) => {
  fetchDirectoryUsers(
    directoryPagination.value.currentLetter,
    directoryPagination.value.currentSearch,
    1
  );
};

// Handle pagination - FIXED
const goToNextPage = () => {
  if (directoryPagination.value.next) {
    fetchDirectoryUsers(
      directoryPagination.value.currentLetter,
      directoryPagination.value.currentSearch,
      directoryPagination.value.page + 1
    );
  }
};

const goToPrevPage = () => {
  if (directoryPagination.value.previous) {
    fetchDirectoryUsers(
      directoryPagination.value.currentLetter,
      directoryPagination.value.currentSearch,
      directoryPagination.value.page - 1
    );
  }
};

const fetchPendingConnections = async () => {
  isLoading.value.connections = true;
  try {
    const response = await messagingApi.getPendingConnections();
    connectionRequests.value = response.map(req => ({
      id: req.id,
      name: req.from_user.full_name,
      time: formatTimeAgo(req.created_at),
      fromUserId: req.from_user.id,
      initial: (req.from_user.first_name?.[0] || '') + (req.from_user.last_name?.[0] || '') || '??'
    }));
  } catch (error) {
    console.error('Error fetching pending connections:', error);
    toast.error('Failed to load connection requests');
  } finally {
    isLoading.value.connections = false;
  }
};

const fetchConnections = async () => {
  isLoading.value.connections = true;
  try {
    const response = await messagingApi.listConnections();
    connections.value = response.map(conn => ({
      id: conn.id,
      name: conn.user.full_name,
      position: conn.user.title || conn.user.role || 'Member',
      email: conn.user.email,
      userId: conn.user.id,
      initial: (conn.user.first_name?.[0] || '') + (conn.user.last_name?.[0] || '') || '??'
    }));
  } catch (error) {
    console.error('Error fetching connections:', error);
    toast.error('Failed to load connections');
  } finally {
    isLoading.value.connections = false;
  }
};

const fetchNotifications = async () => {
  isLoading.value.notifications = true;
  try {
    const response = await messagingApi.listNotifications({ ordering: '-created_at' });
    notifications.value = response.map(notif => ({
      id: notif.id,
      category: notif.category?.toUpperCase() || 'SYSTEM',
      time: formatTime(notif.created_at),
      title: notif.title,
      body: notif.message,
      type: notif.requires_action ? 'ACTION' : 'INFO',
      isRead: notif.is_read
    }));
  } catch (error) {
    console.error('Error fetching notifications:', error);
    toast.error('Failed to load notifications');
  } finally {
    isLoading.value.notifications = false;
  }
};

const fetchUnreadCount = async () => {
  try {
    const response = await messagingApi.getUnreadCount();
    unreadCount.value = response.count;
  } catch (error) {
    console.error('Error fetching unread count:', error);
  }
};

const fetchGroups = async () => {
  isLoading.value.groups = true;
  try {
    const response = await messagingApi.listGroups();
    groups.value = response.map(group => ({
      id: group.id,
      name: group.name,
      count: group.unread_count || 0,
      path: group.slug,
      icon: group.icon,
      memberCount: group.member_count,
      isMember: group.is_member
    }));
  } catch (error) {
    console.error('Error fetching groups:', error);
    toast.error('Failed to load groups');
  } finally {
    isLoading.value.groups = false;
  }
};

const fetchConversations = async () => {
  isLoading.value.messages = true;
  try {
    const response = await messagingApi.getConversations();
    directMessages.value = response.map(conv => ({
      id: conv.id,
      name: conv.other_user.full_name,
      initial: (conv.other_user.first_name?.[0] || '') + (conv.other_user.last_name?.[0] || '') || '??',
      count: conv.unread_count,
      path: `dm-${conv.other_user.id}`,
      color: getRandomColor(),
      userId: conv.other_user.id,
      lastMessage: conv.last_message,
      lastMessageTime: conv.last_message_time
    }));
  } catch (error) {
    console.error('Error fetching conversations:', error);
    toast.error('Failed to load conversations');
  } finally {
    isLoading.value.messages = false;
  }
};

const fetchMessagesWithUser = async (userId) => {
  if (!userId) return;
  
  isLoading.value.messages = true;
  try {
    const response = await messagingApi.getMessagesWithUser({ user_id: userId });
    chatMessages.value = response.map(msg => ({
      id: msg.id,
      sender: msg.sender.full_name,
      time: formatTime(msg.created_at),
      initial: (msg.sender.first_name?.[0] || '') + (msg.sender.last_name?.[0] || '') || '??',
      color: getColorForUser(msg.sender.id),
      body: msg.content,
      type: msg.attachment ? 'file' : 'text',
      file: msg.attachment?.name,
      isRead: msg.is_read,
      senderId: msg.sender.id
    }));
  } catch (error) {
    console.error('Error fetching messages:', error);
    toast.error('Failed to load messages');
  } finally {
    isLoading.value.messages = false;
  }
};

const fetchGroupMessages = async (groupId) => {
  if (!groupId) return;
  
  isLoading.value.messages = true;
  try {
    const response = await messagingApi.getGroupMessages(groupId);
    chatMessages.value = response.map(msg => ({
      id: msg.id,
      sender: msg.sender.full_name,
      time: formatTime(msg.created_at),
      initial: (msg.sender.first_name?.[0] || '') + (msg.sender.last_name?.[0] || '') || '??',
      color: getColorForUser(msg.sender.id),
      body: msg.content,
      type: msg.attachment ? 'file' : 'text',
      file: msg.attachment?.name,
      isRead: msg.is_read,
      senderId: msg.sender.id
    }));
  } catch (error) {
    console.error('Error fetching group messages:', error);
    toast.error('Failed to load group messages');
  } finally {
    isLoading.value.messages = false;
  }
};

// Action handlers
const sendConnectionRequest = async (userId) => {
  try {
    await messagingApi.sendConnectionRequest({ to_user: userId });
    toast.success('Connection request sent');
    
    // Update the user's status in directory
    const userIndex = directoryUsers.value.findIndex(u => u.id === userId);
    if (userIndex > -1) {
      directoryUsers.value[userIndex].status = 'pending';
    }
  } catch (error) {
    console.error('Error sending connection request:', error);
    toast.error('Failed to send connection request');
  }
};

const acceptConnectionRequest = async (requestId) => {
  try {
    await messagingApi.acceptConnectionRequest(requestId);
    toast.success('Connection request accepted');
    // Remove from pending requests
    connectionRequests.value = connectionRequests.value.filter(req => req.id !== requestId);
    // Refresh connections
    fetchConnections();
  } catch (error) {
    console.error('Error accepting connection request:', error);
    toast.error('Failed to accept connection request');
  }
};

const declineConnectionRequest = async (requestId) => {
  try {
    await messagingApi.declineConnectionRequest(requestId);
    toast.success('Connection request declined');
    // Remove from pending requests
    connectionRequests.value = connectionRequests.value.filter(req => req.id !== requestId);
  } catch (error) {
    console.error('Error declining connection request:', error);
    toast.error('Failed to decline connection request');
  }
};

const acceptAdminRequest = async (notification) => {
  try {
    // This would be a custom API endpoint for admin actions
    // For now, just mark as read
    await messagingApi.markNotificationAsRead(notification.id);
    toast.success('Admin request accepted');
    // Remove from notifications
    notifications.value = notifications.value.filter(n => n.id !== notification.id);
  } catch (error) {
    console.error('Error accepting admin request:', error);
    toast.error('Failed to accept admin request');
  }
};

const declineAdminRequest = async (notification) => {
  try {
    await messagingApi.markNotificationAsRead(notification.id);
    toast.success('Admin request declined');
    // Remove from notifications
    notifications.value = notifications.value.filter(n => n.id !== notification.id);
  } catch (error) {
    console.error('Error declining admin request:', error);
    toast.error('Failed to decline admin request');
  }
};

const sendMessage = async () => {
  if (!messageInput.value.trim()) return;
  
  const currentUserId = directMessages.value.find(dm => dm.name === currentDMUser.value)?.userId;
  
  try {
    if (currentTab.value === 'Direct Messages' && currentUserId) {
      await messagingApi.sendMessage({
        recipient: currentUserId,
        content: messageInput.value
      });
    } else if (currentTab.value === 'Groups') {
      const currentGroupId = groups.value.find(g => g.name === currentGroup.value)?.id;
      if (currentGroupId) {
        await messagingApi.sendGroupMessage(currentGroupId, {
          content: messageInput.value
        });
      }
    }
    
    messageInput.value = '';
    toast.success('Message sent');
    
    // Refresh messages
    if (currentTab.value === 'Direct Messages' && currentUserId) {
      fetchMessagesWithUser(currentUserId);
    } else if (currentTab.value === 'Groups') {
      const currentGroupId = groups.value.find(g => g.name === currentGroup.value)?.id;
      if (currentGroupId) {
        fetchGroupMessages(currentGroupId);
      }
    }
  } catch (error) {
    console.error('Error sending message:', error);
    toast.error('Failed to send message');
  }
};

const markMessageAsRead = async (messageId) => {
  try {
    await messagingApi.markMessageAsRead(messageId);
  } catch (error) {
    console.error('Error marking message as read:', error);
  }
};

const markNotificationAsRead = async (notificationId) => {
  try {
    await messagingApi.markNotificationAsRead(notificationId);
    // Update notification in list
    const index = notifications.value.findIndex(n => n.id === notificationId);
    if (index > -1) {
      notifications.value[index].isRead = true;
    }
    // Update unread count
    fetchUnreadCount();
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};

const dismissNotification = async (notificationId) => {
  try {
    await messagingApi.dismissNotification(notificationId);
    // Remove from notifications
    notifications.value = notifications.value.filter(n => n.id !== notificationId);
    toast.success('Notification dismissed');
  } catch (error) {
    console.error('Error dismissing notification:', error);
    toast.error('Failed to dismiss notification');
  }
};

// Utility functions
const formatTime = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatTimeAgo = (timestamp) => {
  if (!timestamp) return '';
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
};

const getRandomColor = () => {
  const colors = ['bg-orange-500', 'bg-amber-600', 'bg-gray-500', 'bg-blue-500', 'bg-green-600', 'bg-purple-500', 'bg-pink-500'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getColorForUser = (userId) => {
  // Generate consistent color based on user ID
  const colors = ['bg-orange-500', 'bg-amber-600', 'bg-gray-500', 'bg-blue-500', 'bg-green-600', 'bg-purple-500', 'bg-pink-500'];
  const index = userId % colors.length;
  return colors[index];
};

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

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
  
  // Fetch messages for this user
  const userId = directMessages.value.find(dm => dm.name === name)?.userId;
  if (userId) {
    fetchMessagesWithUser(userId);
  }
};

const selectGroup = (name) => {
  currentGroup.value = name;
  if (currentTab.value !== 'Groups') {
    currentTab.value = 'Groups';
  }
  
  // Fetch messages for this group
  const groupId = groups.value.find(g => g.name === name)?.id;
  if (groupId) {
    fetchGroupMessages(groupId);
  }
};

// Watch for tab changes to load appropriate data
watch(currentTab, (newTab) => {
  switch (newTab) {
    case 'Directory':
      fetchDirectoryUsers();
      break;
    case 'Connections':
      fetchPendingConnections();
      fetchConnections();
      break;
    case 'Notifications':
      fetchNotifications();
      fetchUnreadCount();
      break;
    case 'Groups':
      fetchGroups();
      break;
    case 'Direct Messages':
      fetchConversations();
      break;
  }
});

// Initialize data on component mount
onMounted(() => {
  fetchDirectoryUsers('A');
  fetchUnreadCount();
});

// Poll for new notifications every 30 seconds
let notificationInterval;
onMounted(() => {
  notificationInterval = setInterval(() => {
    if (currentTab.value === 'Notifications') {
      fetchNotifications();
    }
    fetchUnreadCount();
  }, 30000);
});

// Clean up interval
onUnmounted(() => {
  if (notificationInterval) {
    clearInterval(notificationInterval);
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <div class="flex flex-grow">
      <UserSidebar />

      <main class="flex-grow p-4 md:p-8 lg:p-12">
        <div class="flex justify-center w-full items-center mb-8">
          <div class="w-full">
            <div class="mb-16 w-full">
              <div
                class="w-full px-4 py-4 sm:px-6 rounded-2xl border-2 border-green-100 bg-white shadow-md text-center"
              >
                <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900">
                  Messages
                  <span v-if="unreadCount > 0" class="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                    {{ unreadCount }}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center w-full">
          <div class="border-b border-gray-200 mb-6 max-w-7xl w-full ">
            <div class="flex text-lg font-medium justify-center">
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
                <span v-if="tab === 'Notifications' && unreadCount > 0" class="ml-1 text-xs bg-red-500 text-white rounded-full px-1">
                  {{ unreadCount }}
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Loading Indicator -->
        <div v-if="isLoading[currentTab.toLowerCase()]" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#004d33]"></div>
          <p class="mt-4 text-gray-600">Loading {{ currentTab.toLowerCase() }}...</p>
        </div>

        <div v-else>
          <!-- Directory Tab - FIXED -->
          <div v-if="currentTab === 'Directory'" class="max-w-7xl bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div class="flex justify-between items-center mb-6">
              <div class="relative w-full max-w-sm mr-4">
                <input 
                  v-model="searchQuery" 
                  @keyup.enter="handleSearch"
                  type="text" 
                  placeholder="Search by name or email..." 
                  class="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-700 mr-2">Show</span>
                <select 
                  v-model="directoryPagination.pageSize"
                  @change="fetchDirectoryUsers(directoryPagination.currentLetter, directoryPagination.currentSearch, 1)"
                  class="p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                >
                  <option value="20">20 per page</option>
                  <option value="50">50 per page</option>
                  <option value="100">100 per page</option>
                </select>
              </div>
            </div>

            <div class="flex flex-wrap justify-start gap-1 p-2 bg-gray-50 rounded-lg mb-6 border border-gray-200">
              <button
                v-for="letter in alphabet"
                :key="letter"
                @click="handleLetterClick(letter)"
                class="w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-lg transition-all"
                :class="{
                  'bg-green-100 text-gray-800 border border-green-300': directoryPagination.currentLetter === letter && !directoryPagination.currentSearch,
                  'text-gray-500 hover:bg-gray-100': directoryPagination.currentLetter !== letter || directoryPagination.currentSearch,
                }"
                :style="directoryPagination.currentLetter === letter && !directoryPagination.currentSearch ? { borderColor: DARK_GREEN, backgroundColor: LIGHT_GREEN, color: DARK_GREEN } : {}"
              >
                {{ letter }}
              </button>
            </div>

            <div v-if="isLoading.directory" class="text-center py-8">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#004d33]"></div>
              <p class="mt-2 text-gray-600">Loading users...</p>
            </div>
            
            <div v-else>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 h-[50vh] overflow-y-auto">
                <div 
                  v-for="(user, index) in directoryUsers" 
                  :key="index" 
                  class="py-2 px-3 border-l-4 border-green-500 flex flex-col justify-center hover:bg-gray-50 rounded-lg transition"
                >
                  <div class="flex items-center mb-2">
                    <div v-if="user.profileImage" class="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img :src="user.profileImage" :alt="user.name" class="w-full h-full object-cover">
                    </div>
                    <div v-else class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold mr-3">
                      {{ user.initial }}
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-gray-800">{{ user.name }}</p>
                      <p class="text-xs text-gray-500">{{ user.email }}</p>
                    </div>
                  </div>
                  
                  <div class="mt-2">
                    <!-- FIXED: Use correct status values from API -->
                    <button 
                      v-if="user.status === 'none'"
                      @click="sendConnectionRequest(user.id)"
                      class="text-xs px-3 py-1 border border-green-600 text-green-600 rounded-full hover:bg-green-50 transition"
                    >
                      Request to Connect
                    </button>
                    <span 
                      v-else-if="user.status === 'pending'"
                      class="text-xs px-3 py-1 border border-amber-600 text-amber-600 rounded-full bg-amber-50 inline-block"
                    >
                      Request Pending
                    </span>
                    <span 
                      v-else-if="user.status === 'accepted' && user.isConnected"
                      class="text-xs px-3 py-1 border border-green-600 text-green-600 rounded-full bg-green-50 inline-block"
                    >
                      Connected
                    </span>
                    <span 
                      v-else-if="user.status === 'declined'"
                      class="text-xs px-3 py-1 border border-red-600 text-red-600 rounded-full bg-red-50 inline-block"
                    >
                      Request Declined
                    </span>
                    <span 
                      v-else
                      class="text-xs text-gray-500"
                    >
                      {{ user.status }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Pagination -->
              <div v-if="directoryUsers.length > 0" class="mt-6 flex justify-between items-center">
                <div>
                  <span class="text-sm text-gray-500">
                    Showing {{ ((directoryPagination.page - 1) * directoryPagination.pageSize) + 1 }} to 
                    {{ Math.min(directoryPagination.page * directoryPagination.pageSize, directoryPagination.count) }} of 
                    {{ directoryPagination.count }} users
                  </span>
                </div>
                <div class="flex items-center space-x-2">
                  <button
                    @click="goToPrevPage"
                    :disabled="!directoryPagination.previous"
                    class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span class="text-sm text-gray-600">
                    Page {{ directoryPagination.page }}
                  </span>
                  <button
                    @click="goToNextPage"
                    :disabled="!directoryPagination.next"
                    class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
              
              <div v-else class="text-center py-12 text-gray-500">
                <p>No users found</p>
                <p v-if="directoryPagination.currentSearch" class="text-sm mt-2">
                  No results for "{{ directoryPagination.currentSearch }}"
                </p>
                <p v-else class="text-sm mt-2">
                  No users found starting with "{{ directoryPagination.currentLetter }}"
                </p>
              </div>
            </div>
          </div>

          <!-- Rest of the template remains the same... -->
          <!-- Notifications Tab -->
          <div v-if="currentTab === 'Notifications'" class="space-y-6 max-w-4xl">
            <div
              v-for="(message, index) in notifications"
              :key="index"
              class="bg-white p-6 rounded-xl shadow-md border-l-4"
              :class="{
                'border-green-600': message.category === 'COURSES',
                'border-blue-600': message.category === 'SYSTEM',
                'border-yellow-600': message.category === 'MY ACCOUNT',
                'border-red-600': message.category === 'SUBSCRIPTION',
                'border-purple-600': message.category === 'ADMIN',
                'opacity-75': message.isRead
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
                  <svg
                    v-if="message.category === 'ADMIN'"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5 h-5 text-purple-600"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <polyline points="17 11 19 13 23 9" />
                  </svg>
                  <span
                    class="text-xs font-semibold uppercase tracking-wider"
                    :class="{
                      'text-green-600': message.category === 'COURSES',
                      'text-blue-600': message.category === 'SYSTEM',
                      'text-yellow-600': message.category === 'MY ACCOUNT',
                      'text-red-600': message.category === 'SUBSCRIPTION',
                      'text-purple-600': message.category === 'ADMIN',
                    }"
                  >
                    {{ message.category }}
                  </span>
                  <div class="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <span class="text-xs text-gray-500">{{ message.time }}</span>
                </div>
                <div class="flex space-x-2">
                  <button 
                    @click="markNotificationAsRead(message.id)"
                    class="text-xs text-gray-400 hover:text-gray-600"
                  >
                    Mark as read
                  </button>
                  <button 
                    @click="dismissNotification(message.id)"
                    class="text-xs text-gray-400 hover:text-gray-600"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
              <p class="text-base font-bold text-gray-900 mb-1">
                {{ message.title }}
              </p>
              <p class="text-sm text-gray-600 line-clamp-2">
                {{ message.body }}
              </p>
              <div v-if="message.type === 'ACTION'" class="mt-4 flex space-x-3">
                <button
                  @click="acceptAdminRequest(message)"
                  class="px-4 py-2 text-sm font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition shadow-md"
                >
                  Accept
                </button>
                <button
                  @click="declineAdminRequest(message)"
                  class="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                >
                  Decline
                </button>
              </div>
            </div>
            
            <div v-if="notifications.length === 0" class="text-center py-12 text-gray-500">
              <p>No notifications yet</p>
            </div>
          </div>

          <!-- Connections Tab -->
          <div v-else-if="currentTab === 'Connections'" class="max-w-7xl bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Connection Requests ({{ connectionRequests.length }})</h3>
            <div v-if="connectionRequests.length > 0" class="space-y-3">
              <div v-for="(request, index) in connectionRequests" :key="index" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-sm font-bold text-purple-700">
                    {{ request.initial }}
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">{{ request.name }}</p>
                    <span class="text-xs text-gray-500">{{ request.time }}</span>
                  </div>
                </div>
                <div class="space-x-2">
                  <button 
                    @click="acceptConnectionRequest(request.id)"
                    class="px-3 py-1 text-sm rounded-lg text-white" 
                    :style="{ backgroundColor: DARK_GREEN }"
                  >
                    Accept
                  </button>
                  <button 
                    @click="declineConnectionRequest(request.id)"
                    class="px-3 py-1 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
            <p v-else class="text-gray-500">You have no pending connection requests.</p>
            
            <h3 class="text-xl font-bold text-gray-800 mt-8 mb-4">Your Connections ({{ connections.length }})</h3>
            <div v-if="connections.length > 0" class="space-y-3">
              <div
                v-for="(connection, index) in connections"
                :key="index"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div class="flex items-center space-x-3">
                  <div
                    class="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-sm font-bold text-green-700"
                  >
                    {{ connection.initial }}
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">
                      {{ connection.name }}
                    </p>
                    <span class="text-xs text-gray-500">{{ connection.position }}</span>
                  </div>
                </div>
                <button
                  @click="selectDMUser(connection.name)"
                  class="px-3 py-1 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Message
                </button>
              </div>
            </div>

            <p v-else class="text-gray-500">You currently have no active connections.</p>
          </div>

          <!-- Groups/Direct Messages Chat Interface -->
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
                    <div class="truncate">{{ dm.name }}</div>
                  </div>
                  <span
                    v-if="dm.count > 0"
                    class="text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full text-white bg-green-700 ml-2"
                  >
                    {{ dm.count }}
                  </span>
                </button>
                
                <div v-if="directMessages.length === 0" class="text-center py-4 text-gray-500">
                  <p class="text-sm">No conversations yet</p>
                </div>
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
                  <span class="flex items-center truncate">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="w-4 h-4 mr-2 flex-shrink-0"
                    >
                      <line x1="16" y1="3" x2="8" y2="21"></line>
                      <line x1="21" y1="8" x2="3" y2="16"></line>
                    </svg>
                    <span class="truncate">{{ group.name }}</span>
                  </span>
                  <span
                    v-if="group.count > 0"
                    class="text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full text-white bg-green-700 flex-shrink-0"
                  >
                    {{ group.count }}
                  </span>
                </button>
                
                <div v-if="groups.length === 0" class="text-center py-4 text-gray-500">
                  <p class="text-sm">No groups yet</p>
                </div>
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
                  <span class="text-xs text-gray-400">{{ new Date().toLocaleDateString() }}</span>
                </div>

                <div v-if="chatMessages.length === 0" class="text-center py-12 text-gray-500">
                  <p>No messages yet. Start the conversation!</p>
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
                    @keyup.enter="sendMessage"
                    placeholder="Type your message"
                    class="flex-grow p-3 bg-transparent focus:outline-none text-gray-700"
                  />
                  <button
                    @click="sendMessage"
                    :disabled="!messageInput.trim()"
                    class="p-3 text-white rounded-lg transition"
                    :class="{ 'opacity-50 cursor-not-allowed': !messageInput.trim() }"
                    :style="{ backgroundColor: messageInput.trim() ? DARK_GREEN : '#ccc' }"
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
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>