<template>
    <div id="app" class="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans">
        <!-- Main Content Container - Centered -->
        <div class="mx-auto max-w-7xl">

            <!-- Header and Action Button -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Access Management</h1>
                <button
                    @click="showInviteModal = true"
                    class="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out font-medium"
                >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-3-4a4 4 0 11-8 0 4 4 0 018 0zM12 10h.01M16 16v.01"/>
                    </svg>
                    Invite User
                </button>
            </div>

            <!-- Centered Tabs Container -->
            <div class="flex justify-center w-full">
                <div class="border-b border-gray-200 mb-6 w-full max-w-4xl">
                    <div class="flex text-lg font-medium justify-center">
                        <button
                            v-for="tab in tabs"
                            :key="tab"
                            @click="changeTab(tab)"
                            :class="[
                                'py-2 px-6 transition border-b-2 mx-1 rounded-t-lg focus:outline-none',
                                currentTab === tab
                                    ? 'font-semibold border-indigo-600 text-indigo-600'
                                    : 'text-gray-500 hover:text-gray-900 border-transparent hover:border-gray-300'
                            ]"
                        >
                            {{ tab }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Search and Filters -->
            <div class="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
                <!-- Search Input -->
                <div class="relative w-full md:w-1/3">
                    <input
                        type="text"
                        v-model="searchTerm"
                        :placeholder="`Search ${currentTab}...`"
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"
                    />
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </div>

                <!-- Role Filter (Only for Users tab) -->
                <div v-if="currentTab === 'Users'" class="w-full md:w-auto">
                    <label for="role-filter" class="sr-only">Filter by Role</label>
                    <select
                        id="role-filter"
                        v-model="selectedRoleFilter"
                        class="block w-full rounded-lg border border-gray-300 shadow-sm py-2 px-3 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    >
                        <option v-for="role in roleOptions" :key="role" :value="role">{{ role }}</option>
                    </select>
                </div>

                <!-- Invitation Count (Only for Invitations tab) -->
                <div v-if="currentTab === 'Invitations'" class="w-full md:w-auto text-gray-500 py-2 px-3">
                    {{ invitations.length }} pending invitations
                </div>
            </div>


            <!-- Dynamic Content Area -->
            <div class="mt-4">
                <!-- Users Table -->
                <div v-if="currentTab === 'Users'">
                    <div class="mt-8 overflow-x-auto rounded-lg shadow-sm">
                        <table class="min-w-full divide-y divide-gray-200 bg-white">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Seen</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50 transition duration-150 ease-in-out">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                                        <div class="text-sm text-gray-500">{{ user.email }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span :class="getRoleBadgeClass(user.role)" class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium leading-none">
                                            {{ user.role }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.lastSeen }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span :class="getStatusBadgeClass(user.status)" class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium leading-none">
                                            {{ user.status }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div class="relative action-menu-container">
                                            <button
                                                @click="toggleActionMenu(user.id)"
                                                class="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition"
                                                :aria-expanded="activeActionMenuId === user.id"
                                                aria-label="User actions menu"
                                            >
                                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                                                </svg>
                                            </button>
                                            <div v-if="activeActionMenuId === user.id" class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                                                <div class="py-1">
                                                    <button @click="handleAction('editRole', user)" class="block w-full text-left px-4 py-2 text-sm transition hover:bg-gray-100 text-gray-700">Edit Role</button>
                                                    <button @click="handleAction('suspend', user)" class="block w-full text-left px-4 py-2 text-sm transition hover:bg-gray-100 text-gray-700">Suspend Account</button>
                                                    <button @click="handleAction('remove', user)" class="block w-full text-left px-4 py-2 text-sm transition hover:bg-gray-100 text-red-600">Remove User</button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="filteredUsers.length === 0">
                                    <td colspan="5" class="px-6 py-10 text-center text-gray-500 text-lg">
                                        No users match your criteria.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Invitations Table -->
                <div v-else-if="currentTab === 'Invitations'">
                    <div class="mt-8 overflow-x-auto rounded-lg shadow-sm">
                        <table class="min-w-full divide-y divide-gray-200 bg-white">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invited By</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Sent</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                <tr v-for="invite in filteredInvitations" :key="invite.id" class="hover:bg-gray-50 transition duration-150 ease-in-out">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ invite.email }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span :class="getRoleBadgeClass(invite.role)" class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium leading-none">
                                            {{ invite.role }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ invite.invitedBy }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ invite.dateSent }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div class="relative action-menu-container">
                                            <button
                                                @click="toggleActionMenu(invite.id)"
                                                class="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition"
                                                :aria-expanded="activeActionMenuId === invite.id"
                                                aria-label="Invitation actions menu"
                                            >
                                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                                                </svg>
                                            </button>
                                            <div v-if="activeActionMenuId === invite.id" class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                                                <div class="py-1">
                                                    <button @click="handleAction('resend', invite)" class="block w-full text-left px-4 py-2 text-sm transition hover:bg-gray-100 text-gray-700">Resend Invitation</button>
                                                    <button @click="handleAction('cancel', invite)" class="block w-full text-left px-4 py-2 text-sm transition hover:bg-gray-100 text-red-600">Cancel Invitation</button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="filteredInvitations.length === 0">
                                    <td colspan="5" class="px-6 py-10 text-center text-gray-500 text-lg">
                                        No pending invitations match your criteria.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>

        <!-- Invite User Modal -->
        <div :class="{'block': showInviteModal, 'hidden': !showInviteModal}" class="fixed inset-0 z-50 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <!-- Background overlay -->
                <div @click="showInviteModal = false" class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>

                <!-- Modal Panel -->
                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Invite User</h3>
                        <div class="mt-2 text-sm text-gray-500">
                            <p>This is where the user invitation form would go (e.g., email and role selection). For now, it's a simple confirmation.</p>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            @click="handleAction('sendInvite')"
                            type="button"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm transition"
                        >
                            Send Invitation
                        </button>
                        <button
                            @click="showInviteModal = false"
                            type="button"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

// --- MOCK DATA ---
const TABS = ['Users', 'Invitations'];
const ROLE_OPTIONS = ['All Roles', 'Admin', 'Editor', 'Viewer'];

// NOTE: In a real app, these would be managed by Firebase Firestore
const USERS = [
    { id: 1, name: "Alice Johnson", email: "alice.j@corp.com", role: "Admin", lastSeen: "2 days ago", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob.s@corp.com", role: "Editor", lastSeen: "3 hours ago", status: "Active" },
    { id: 3, name: "Charlie Brown", email: "charlie.b@corp.com", role: "Viewer", lastSeen: "1 week ago", status: "Inactive" },
    { id: 4, name: "Diana Prince", email: "diana.p@corp.com", role: "Editor", lastSeen: "Just now", status: "Active" },
    { id: 5, name: "Eve Harrington", email: "eve.h@corp.com", role: "Viewer", lastSeen: "2 months ago", status: "Suspended" },
];

const INVITATIONS = [
    { id: 101, email: "new.hire1@corp.com", role: "Editor", invitedBy: "Alice Johnson", dateSent: "2025-10-20" },
    { id: 102, email: "partner@external.com", role: "Viewer", invitedBy: "Bob Smith", dateSent: "2025-10-25" },
    { id: 103, email: "marketing@corp.com", role: "Admin", invitedBy: "Diana Prince", dateSent: "2025-10-28" },
];

// --- STATE ---
const currentTab = ref('Users');
const searchTerm = ref('');
const selectedRoleFilter = ref('All Roles');
const activeActionMenuId = ref(null);
const showInviteModal = ref(false);

// Expose constants to the template
const tabs = TABS;
const roleOptions = ROLE_OPTIONS;
const users = USERS;
const invitations = INVITATIONS;


// --- UTILITY FUNCTIONS ---
const getRoleBadgeClass = (role) => {
    switch (role) {
        case 'Admin': return 'bg-red-100 text-red-800';
        case 'Editor': return 'bg-blue-100 text-blue-800';
        case 'Viewer': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'Active': return 'bg-green-100 text-green-800';
        case 'Inactive': return 'bg-yellow-100 text-yellow-800';
        case 'Suspended': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

// --- COMPUTED PROPERTIES ---

const filteredUsers = computed(() => {
    let filtered = users;

    if (selectedRoleFilter.value !== 'All Roles') {
        filtered = filtered.filter(user => user.role === selectedRoleFilter.value);
    }

    if (searchTerm.value) {
        const lowerSearch = searchTerm.value.toLowerCase();
        filtered = filtered.filter(user =>
            user.name.toLowerCase().includes(lowerSearch) ||
            user.email.toLowerCase().includes(lowerSearch)
        );
    }
    return filtered;
});

const filteredInvitations = computed(() => {
    if (!searchTerm.value) return invitations;

    const lowerSearch = searchTerm.value.toLowerCase();
    return invitations.filter(invitation =>
        invitation.email.toLowerCase().includes(lowerSearch) ||
        invitation.invitedBy.toLowerCase().includes(lowerSearch)
    );
});

// --- METHODS ---
const toggleActionMenu = (id) => {
    // Toggle the menu for the specific user/invitation ID
    activeActionMenuId.value = activeActionMenuId.value === id ? null : id;
};

const closeActionMenu = (event) => {
    // Close menu if click is outside the action button/menu
    if (activeActionMenuId.value !== null && !event.target.closest('.action-menu-container')) {
        activeActionMenuId.value = null;
    }
};

const changeTab = (tab) => {
    currentTab.value = tab;
    searchTerm.value = ''; // Reset search on tab switch
    selectedRoleFilter.value = 'All Roles'; // Reset role filter
}

const handleAction = (action, item) => {
    if (action === 'sendInvite') {
        // Custom non-alert message for modal
        console.log('Placeholder: Invitation sent successfully!');
        showInviteModal.value = false;
    } else {
        console.log(`Action: ${action} on ${item.email || item.name}`);
        activeActionMenuId.value = null;
    }
};

// --- LIFECYCLE HOOKS ---
onMounted(() => {
    window.addEventListener('click', closeActionMenu);
});

onBeforeUnmount(() => {
    window.removeEventListener('click', closeActionMenu);
});
</script>

<style scoped>
/* Custom scrollbar for better appearance on overflow tables */
.overflow-x-auto::-webkit-scrollbar {
    height: 8px;
}
.overflow-x-auto::-webkit-scrollbar-thumb {
    background-color: #d1d5db; /* gray-300 */
    border-radius: 4px;
}
.overflow-x-auto::-webkit-scrollbar-track {
    background-color: #f3f4f6; /* gray-100 */
}
</style>
