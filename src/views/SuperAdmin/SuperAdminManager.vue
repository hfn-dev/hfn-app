<template>
    <div id="app" class="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans">
        <!-- Main Content Container - Centered --><div class="mx-auto max-w-7xl">

            <!-- Header and Action Button (removed "Invite User" button as it's replaced by the Invitations tab functionality) --><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Access Management</h1>
            </div>

            <!-- Centered Tabs Container --><div class="flex justify-center w-full">
                <div class="border-b border-gray-200 mb-6 w-full max-w-4xl">
                    <div class="flex text-lg font-medium justify-center">
                        <button
                            v-for="tab in tabs"
                            :key="tab"
                            @click="changeTab(tab)"
                            :class="[
                                'py-2 px-6 transition border-b-2 mx-1 rounded-t-lg focus:outline-none',
                                currentTab === tab
                                    ? 'font-semibold border-emerald-600 text-emerald-600'
                                    : 'text-gray-500 hover:text-gray-900 border-transparent hover:border-gray-300'
                            ]"
                        >
                            {{ tab }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Search and Filters (removed from Invitations tab as per image) --><div v-if="currentTab === 'Users'" class="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
                <!-- Search Input --><div class="relative w-full md:w-1/3">
                    <input
                        type="text"
                        v-model="searchTerm"
                        :placeholder="`Search ${currentTab}...`"
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 shadow-sm transition"
                    />
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </div>

                <!-- Role Filter --><div class="w-full md:w-auto">
                    <label for="role-filter" class="sr-only">Filter by Role</label>
                    <select
                        id="role-filter"
                        v-model="selectedRoleFilter"
                        class="block w-full rounded-lg border border-gray-300 shadow-sm py-2 px-3 text-gray-700 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    >
                        <option v-for="role in roleOptions" :key="role" :value="role">{{ role }}</option>
                    </select>
                </div>
            </div>


            <!-- Dynamic Content Area --><div class="mt-4">
                <!-- Users Table --><div v-if="currentTab === 'Users'">
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

                <!-- Invitations Forms Tab Content --><div v-else-if="currentTab === 'Invitations'" class="max-w-4xl mx-auto space-y-8 mt-8">
                    <div v-for="(invitationsForRole, roleKey) in invitationsByRole" :key="roleKey" class="bg-white p-6 rounded-lg shadow-sm">
                        <div class="flex justify-between items-center mb-4 border-b pb-3">
                            <h3 class="text-xl font-semibold text-gray-800">
                                Invitations to {{ capitalize(roleKey) }}
                                <span class="text-gray-500 text-base ml-2">You have sent {{ invitationsForRole.filter(inv => inv.status === 'Sent').length }} Invites</span>
                            </h3>
                            <button @click="addNewInvitation(roleKey)" class="flex items-center text-emerald-600 hover:text-emerald-800 transition font-medium">
                                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                Add new
                            </button>
                        </div>
                        <div class="space-y-4">
                            <div v-for="(invite, index) in invitationsForRole" :key="index" class="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                                <div class="text-gray-600 font-medium text-sm">{{ index + 1 }}.</div>
                                <input
                                    type="text"
                                    v-model="invite.firstName"
                                    placeholder="First Name"
                                    class="col-span-1 md:col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                                />
                                <input
                                    type="text"
                                    v-model="invite.surname"
                                    placeholder="Surname"
                                    class="col-span-1 md:col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                                />
                                <input
                                    type="email"
                                    v-model="invite.email"
                                    placeholder="Email Address"
                                    class="col-span-1 md:col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                                />
                                <input
                                    type="text"
                                    v-model="invite.organization"
                                    placeholder="Organization"
                                    class="col-span-1 md:col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                                />
                                <button
                                    @click="sendInvitation(invite, roleKey, index)"
                                    :disabled="invite.status === 'Sent'"
                                    :class="[
                                        'px-4 py-2 rounded-md font-medium text-sm transition',
                                        invite.status === 'Sent'
                                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                    ]"
                                >
                                    {{ invite.status }}
                                </button>
                            </div>
                            <div v-if="invitationsForRole.length === 0" class="text-center text-gray-500 py-4">
                                No pending invitations for this role. Click "Add new" to invite.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

// --- MOCK DATA ---
const TABS = ['Overview', 'Invitations']; // Renamed "Users" to "Overview" as per image
const ROLE_OPTIONS = ['All Roles', 'Admin', 'Editor', 'Viewer'];

// Existing Users data (now for "Overview" tab)
const USERS = ref([ // Made ref to allow future modifications if needed
    { id: 1, name: "Alice Johnson", email: "alice.j@corp.com", role: "Admin", lastSeen: "2 days ago", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob.s@corp.com", role: "Editor", lastSeen: "3 hours ago", status: "Active" },
    { id: 3, name: "Charlie Brown", email: "charlie.b@corp.com", role: "Viewer", lastSeen: "1 week ago", status: "Inactive" },
    { id: 4, name: "Diana Prince", email: "diana.p@corp.com", role: "Editor", lastSeen: "Just now", status: "Active" },
    { id: 5, name: "Eve Harrington", email: "eve.h@corp.com", role: "Viewer", lastSeen: "2 months ago", status: "Suspended" },
]);

// New Invitations data structure, categorized by role
const INVITATIONS_DATA = ref({
    administrators: [
        { id: 1, firstName: "Peter", surname: "Pan", email: "peterpan@gmail.com", organization: "HFN", status: "Sent" },
        { id: 2, firstName: "Peter", surname: "Pan", email: "peterpan@gmail.com", organization: "HFN", status: "Sent" },
        { id: 3, firstName: "Peter", surname: "Pan", email: "peterpan@gmail.com", organization: "HFN", status: "Sent" },
        { id: 4, firstName: "Sample Text", surname: "Sample Text", email: "sample@email.com", organization: "Sample Text", status: "Send" },
        { id: 5, firstName: "Sample Text", surname: "Sample Text", email: "sample@email.com", organization: "Sample Text", status: "Send" },
    ],
    editors: [
        { id: 101, firstName: "Peter", surname: "Pan", email: "peterpan@gmail.com", organization: "HFN", status: "Sent" },
        { id: 102, firstName: "Sample Text", surname: "Sample Text", email: "sample@email.com", organization: "Sample Text", status: "Send" },
    ],
    tutors: [ // Renamed "Viewer" to "Tutor" based on the image's "Invitations to Tutors"
        { id: 201, firstName: "Peter", surname: "Pan", email: "peterpan@gmail.com", organization: "UNTH", status: "Sent" },
        { id: 202, firstName: "Peter", surname: "Pan", email: "peterpan@gmail.com", organization: "HBA", status: "Sent" },
        { id: 203, firstName: "Peter", surname: "Pan", email: "peterpan@gmail.com", organization: "HBA", status: "Sent" },
        { id: 204, firstName: "Sample Text", surname: "Sample Text", email: "sample@email.com", organization: "Sample Text", status: "Send" },
        { id: 205, firstName: "Sample Text", surname: "Sample Text", email: "sample@email.com", organization: "Sample Text", status: "Send" },
    ],
});


// --- STATE ---
const currentTab = ref('Overview');
const searchTerm = ref('');
const selectedRoleFilter = ref('All Roles');
const activeActionMenuId = ref(null);

// Expose constants to the template
const tabs = TABS;
const roleOptions = ROLE_OPTIONS;

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
        case 'Active': return 'bg-emerald-100 text-emerald-800'; // Changed to emerald for active
        case 'Inactive': return 'bg-yellow-100 text-yellow-800';
        case 'Suspended': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};


// --- COMPUTED PROPERTIES ---

const filteredUsers = computed(() => {
    let filtered = USERS.value;

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

const invitationsByRole = computed(() => {
    // Return the reactive object directly
    return INVITATIONS_DATA.value;
});


// --- METHODS ---
const toggleActionMenu = (id) => {
    activeActionMenuId.value = activeActionMenuId.value === id ? null : id;
};

const closeActionMenu = (event) => {
    if (activeActionMenuId.value !== null && !event.target.closest('.action-menu-container')) {
        activeActionMenuId.value = null;
    }
};

const changeTab = (tab) => {
    currentTab.value = tab;
    searchTerm.value = ''; // Reset search on tab switch
    selectedRoleFilter.value = 'All Roles'; // Reset role filter
};

const addNewInvitation = (roleKey) => {
    const newId = Math.max(...INVITATIONS_DATA.value[roleKey].map(inv => inv.id), 0) + 1;
    INVITATIONS_DATA.value[roleKey].push({
        id: newId,
        firstName: '',
        surname: '',
        email: '',
        organization: '',
        status: 'Send',
    });
};

const sendInvitation = (invite, roleKey, index) => {
    // Basic validation
    if (!invite.firstName || !invite.surname || !invite.email || !invite.organization) {
        alert('Please fill in all fields before sending the invitation.');
        return;
    }
    // Simulate sending invitation
    console.log(`Sending invitation for ${invite.firstName} ${invite.surname} (${invite.email}) as ${roleKey}...`);
    INVITATIONS_DATA.value[roleKey][index].status = 'Sent';
    // In a real application, you'd send this data to an API
};


const handleAction = (action, item) => {
    console.log(`Action: ${action} on ${item.email || item.name}`);
    activeActionMenuId.value = null;
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
