<script setup>
import AdminSidebar from '@/components/layout/AdminSidebar.vue';
import { computed, reactive, ref } from 'vue';

// ==============================================
// 💡 NEW STATE: Account Type Switcher
// Set this to `true` for Organization or `false` for Individual.
const isOrganization = ref(true);
// ==============================================

// --- State & Navigation ---
// This controls which major page the sidebar selects
const currentView = ref('My Account');

// This controls which internal tab is active on the 'My Account' page
const activeTab = ref('My Profile');

const navLinks = [
  {
    name: 'Dashboard',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  }, // Dashboard
  {
    name: 'My Learning',
    icon: 'M12 6.253v13M3.475 12h17.052M18.82 8.16l-1.397 1.5M5.18 8.16l1.397 1.5',
  }, // My Learning (Book/Course)
  {
    name: 'Messages',
    icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z',
  }, // Messages (Chat bubble)
  {
    name: 'My Account',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  }, // My Account (User)
  {
    name: 'Support',
    icon: 'M18.364 5.636l-1.414 1.414M16 12a4 4 0 10-8 0 4 4 0 008 0zM12 1v2M12 19v2M5.636 18.364l1.414-1.414M19 12h2M3 12h2M5.636 5.636l1.414 1.414M18.364 18.364l-1.414-1.414',
  }, // Support (Headphones/Settings)
  {
    name: 'Logout',
    icon: 'M11 16l-4-4m0 0l4-4m-4 4h14M3 12h2a2 2 0 002-2V6a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 00-2 2v-4',
  }, // Logout (Sign out)
];

// --- Profile Page State (Content for the 'My Profile' tab) ---

// 1a. Organization Details State (Used if isOrganization is true)
const isOrgEditing = ref(false);
const orgDetails = reactive({
  name: 'Ruthie & Co Nigeria Limited',
  email: 'peterpan@gmail.com.us',
  phone: '+234 123 456 78',
  password: '********',
});
const orgDetailsKeys = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email Address' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'password', label: 'Password' },
];

// 1b. 💡 NEW STATE: Individual Details State (Used if isOrganization is false)
const isIndividualEditing = ref(false);
const individualDetails = reactive({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 555 123 4567',
  password: '********',
});
const individualDetailsKeys = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'email', label: 'Email Address' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'password', label: 'Password' },
];

// 2. Other Details State (Shared by both account types)
const isOtherDetailsEditing = ref(false);
const otherDetails = reactive({
  addressLine1: 'Address Line 1',
  addressLine2: 'Address Line 2',
  state: 'Mock State',
  country: 'Mock Country',
  description: 'Sample Text',
});

// 3. Invitations State (Primarily Organization-specific, shown conditionally)
const invitations = reactive([
  { id: 1, email: 'peterpan@gmail.com', sent: true },
  { id: 2, email: '', sent: false },
  { id: 3, email: '', sent: false },
]);

const sentInvitesCount = computed(
  () => invitations.filter((i) => i.sent).length
);

// 4. Interests State (Shared by both account types)
const interests = reactive([
  { id: 10, name: 'Mother', selected: true, isMainCategory: true },
  { id: 11, name: 'Child', selected: true, isMainCategory: true },
  { id: 12, name: 'Baby', selected: true, isMainCategory: true },
  { id: 13, name: 'Pregnancy', selected: true, isMainCategory: true },
  { id: 1, name: 'Marketing', selected: true, isMainCategory: false },
  { id: 2, name: 'Gynaecology', selected: true, isMainCategory: false },
  { id: 3, name: 'Paediatrics', selected: true, isMainCategory: false },
  { id: 4, name: 'General Health', selected: false, isMainCategory: false },
  { id: 5, name: 'Insurance', selected: false, isMainCategory: false },
  { id: 6, name: 'Dentistry', selected: false, isMainCategory: false },
]);

const selectedInterestsCount = computed(
  () => interests.filter((i) => i.selected && !i.isMainCategory).length
);

// --- Logic Methods ---

// Profile Page Logic - Organization
const toggleOrgEdit = () => {
  if (isOrgEditing.value) {
    console.log(
      'Saving Organization Details:',
      JSON.parse(JSON.stringify(orgDetails))
    );
  }
  isOrgEditing.value = !isOrgEditing.value;
};

// 💡 NEW LOGIC: Profile Page Logic - Individual
const toggleIndividualEdit = () => {
  if (isIndividualEditing.value) {
    console.log(
      'Saving Individual Details:',
      JSON.parse(JSON.stringify(individualDetails))
    );
  }
  isIndividualEditing.value = !isIndividualEditing.value;
};

// Profile Page Logic - Shared (Other Details)
const toggleOtherDetailsEdit = () => {
  if (isOtherDetailsEditing.value) {
    console.log(
      'Saving Other Details:',
      JSON.parse(JSON.stringify(otherDetails))
    );
  }
  isOtherDetailsEditing.value = !isOtherDetailsEditing.value;
};

// Profile Page Logic - Invitations (Organization)
const sendInvitation = (id) => {
  const invite = invitations.find((i) => i.id === id);
  if (invite && invite.email !== '') {
    console.log(`Sending invite to: ${invite.email}`);
    invite.sent = true;
  }
};

const removeInvitation = (id) => {
  const invite = invitations.find((i) => i.id === id);
  if (invite) {
    invite.email = '';
    invite.sent = false;
  }
};

// Profile Page Logic - Interests (Shared)
const toggleInterest = (id) => {
  const item = interests.find((i) => i.id === id);

  if (item && !item.isMainCategory) {
    const willBeSelected = !item.selected;

    if (willBeSelected && selectedInterestsCount.value >= 4) {
      console.log('Cannot select more than 4 secondary interests.');
      return;
    }

    item.selected = willBeSelected;
  }
};
</script>

<template>
  <div class="flex flex-col lg:flex-row min-h-screen font-inter">
    <AdminSidebar class="hidden md:flex" />

    <main class="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
      <span class="text-sm text-gray-500">Home / {{ currentView }}</span>

      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold mt-2 text-gray-800">{{ currentView }}</h1>
      </header>

      <div v-if="currentView === 'My Account'">
        <div
          class="flex justify-center border-b border-gray-200 mb-8 space-x-6"
        >
          <button
            @click="activeTab = 'My Profile'"
            :class="{
              'tab-active': activeTab === 'My Profile',
              'text-gray-500 hover:text-gray-700': activeTab !== 'My Profile',
            }"
            class="py-2 px-1 transition duration-150"
          >
            My Profile
          </button>
          <button
            @click="activeTab = 'Subscription'"
            :class="{
              'tab-active': activeTab === 'Subscription',
              'text-gray-500 hover:text-gray-700': activeTab !== 'Subscription',
            }"
            class="py-2 px-1 transition duration-150"
          >
            Subscription
          </button>
          <button
            @click="activeTab = 'Settings'"
            :class="{
              'tab-active': activeTab === 'Settings',
              'text-gray-500 hover:text-gray-700': activeTab !== 'Settings',
            }"
            class="py-2 px-1 transition duration-150"
          >
            Settings
          </button>
        </div>

        <div v-if="activeTab === 'My Profile'" class="space-y-10">
          <div v-if="isOrganization">
            <div class="p-6 bg-white shadow-lg">
              <h2 class="text-xl font-semibold mb-6">Organization Details</h2>

              <div class="grid md:grid-cols-2 gap-8">
                <div
                  class="flex flex-col items-center p-6 border border-gray-200 rounded-xl "
                >
                  <div
                    class="w-24 h-24 bg-white border border-gray-300 rounded-lg flex items-center justify-center mb-3 shadow-inner"
                  >
                    <svg
                      class="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>

                  <span class="text-xs text-gray-500 mb-4">
                    Allowed file types: JPG, PNG, JPEG
                  </span>

                  <div class="flex space-x-3">
                    <button
                      class="px-4 py-2 text-sm text-green-800 bg-white hover:bg-[#09572d] rounded-lg shadow-md transition duration-150"
                    >
                      Save
                    </button>
                    <label
                      for="logoUpload"
                      class="px-4 py-2 text-sm text-white bg-[#0c6b39] hover:bg-[#09572d] rounded-lg shadow-md cursor-pointer transition duration-150"
                    >
                      Upload
                    </label>
                    <input
                      type="file"
                      id="logoUpload"
                      class="hidden"
                      accept=".jpg,.png,.jpeg"
                    />
                  </div>
                </div>

                <div class="p-6 rounded-xl shadow-md bg-[#F2F9F3] relative">
                  <div class="space-y-4 text-sm text-gray-700">
                    <div
                      v-for="detail in orgDetailsKeys"
                      :key="detail.key"
                      class="flex justify-between items-center"
                    >
                      <span class="font-semibold text-gray-600"
                        >{{ detail.label }}:</span
                      >
                      <input
                        :type="detail.key === 'password' ? 'password' : 'text'"
                        v-model="orgDetails[detail.key]"
                        :disabled="!isOrgEditing"
                        :class="
                          isOrgEditing
                            ? 'bg-white border border-gray-400 rounded-md p-1.5'
                            : 'bg-transparent border-none'
                        "
                        class="text-right w-2/3 transition duration-150"
                      />
                    </div>
                  </div>

                  <div class="flex justify-end mt-6">
                    <button
                      @click="toggleOrgEdit"
                      :class="
                        isOrgEditing
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-[#0c6b39] hover:bg-[#09572d]'
                      "
                      class="px-6 py-2 text-sm text-white rounded-lg shadow-md transition duration-150"
                    >
                      {{ isOrgEditing ? 'Save Changes' : 'Edit' }}
                    </button>
                  </div>
                </div>
              </div>

              <div class="text-center mt-8 pt-6 border-t border-gray-200">
                <h3 class="text-xl font-bold mb-2 text-gray-800">
                  Your Account is: <span class="text-green-600 bg-green-50 p-3 rounded-md">ACTIVE</span>
                </h3>
                <p class="text-gray-600">
                  Your Exclusive Discount Code is:
                  <span
                    class="font-mono font-bold text-lg text-gray-800 tracking-wider"
                    >INDISI2345</span
                  >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="inline-block align-text-bottom text-gray-400 ml-1 cursor-pointer"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </p>
              </div>
            </div>

            <div class="p-6 bg-white shadow-lg">
              <h2 class="text-xl font-semibold mb-6">Invitations</h2>
              <p class="text-gray-600 mb-4">
                You have sent
                <span class="font-semibold text-gray-800"
                  >{{ sentInvitesCount }} of {{ invitations.length }}</span
                >
                invites.
              </p>

              <div class="space-y-4">
                <div
                  v-for="invite in invitations"
                  :key="invite.id"
                  class="flex items-center space-x-3"
                >
                  <input
                    type="email"
                    :placeholder="'Enter email for invite ' + invite.id"
                    v-model="invite.email"
                    :readonly="invite.sent"
                    :disabled="!invite.sent && invite.email !== ''"
                    :class="
                      invite.sent
                        ? 'bg-gray-100'
                        : 'bg-white focus:ring-primary-green focus:border-primary-green'
                    "
                    class="flex-grow p-3 border border-gray-300 rounded-lg"
                  />
                  <button
                    v-if="invite.sent"
                    @click="removeInvitation(invite.id)"
                    class="text-red-600 text-sm font-semibold hover:underline"
                  >
                    Remove
                  </button>
                  <button
                    v-else
                    :disabled="invite.email === ''"
                    @click="sendInvitation(invite.id)"
                    class="text-sm font-semibold px-4 py-2 text-white rounded-lg main-button w-24 disabled:opacity-50"
                  >
                    Invite
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <div class="p-6 bg-white rounded-xl shadow-lg">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-semibold">My Personal Profile</h2>
                <button
                  @click="toggleIndividualEdit"
                  :class="
                    isIndividualEditing
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-[#0c6b39] hover:bg-[#09572d]'
                  "
                  class="px-6 py-2 text-sm text-white rounded-lg shadow-md transition duration-150"
                >
                  {{ isIndividualEditing ? 'Save Changes' : 'Edit' }}
                </button>
              </div>

              <div class="grid md:grid-cols-2 gap-8">
                <div
                  class="flex flex-col items-center p-6 border border-gray-200 rounded-xl bg-gray-50"
                >
                  <div
                    class="w-24 h-24 bg-white border border-gray-300 rounded-full flex items-center justify-center mb-3 shadow-inner"
                  >
                    <svg
                      class="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>

                  <span class="text-xs text-gray-500 mb-4">
                    Allowed file types: JPG, PNG, JPEG
                  </span>

                  <div class="flex space-x-3">
                    <button
                      class="px-4 py-2 text-sm text-white bg-[#0c6b39] hover:bg-[#09572d] rounded-lg shadow-md transition duration-150"
                    >
                      Save
                    </button>
                    <label
                      for="profilePicUpload"
                      class="px-4 py-2 text-sm text-white bg-[#0c6b39] hover:bg-[#09572d] rounded-lg shadow-md cursor-pointer transition duration-150"
                    >
                      Upload
                    </label>
                    <input
                      type="file"
                      id="profilePicUpload"
                      class="hidden"
                      accept=".jpg,.png,.jpeg"
                    />
                  </div>
                </div>

                <div class="p-6 rounded-xl shadow-md bg-white relative">
                  <div class="space-y-4 text-sm text-gray-700">
                    <div
                      v-for="detail in individualDetailsKeys"
                      :key="detail.key"
                      class="flex justify-between items-center"
                    >
                      <span class="font-semibold text-gray-600"
                        >{{ detail.label }}:</span
                      >
                      <input
                        :type="detail.key === 'password' ? 'password' : 'text'"
                        v-model="individualDetails[detail.key]"
                        :disabled="!isIndividualEditing"
                        :class="
                          isIndividualEditing
                            ? 'bg-white border border-gray-400 rounded-md p-1.5'
                            : 'bg-transparent border-none'
                        "
                        class="text-right w-2/3 transition duration-150"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-center mt-8 pt-6 border-t border-gray-200">
                <h3 class="text-xl font-bold mb-2 text-gray-800">
                  Account Status: <span class="text-green-600">VERIFIED</span>
                </h3>
              </div>
            </div>
          </div>

          <div class="p-6 bg-white rounded-xl shadow-lg">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold">Other Details</h2>
              <button
                @click="toggleOtherDetailsEdit"
                :class="
                  isOtherDetailsEditing
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'main-button'
                "
                class="px-6 py-2 text-sm text-white rounded-lg transition duration-150"
              >
                {{ isOtherDetailsEditing ? 'Save Changes' : 'Edit' }}
              </button>
            </div>
            <div class="space-y-4">
              <input
                type="text"
                placeholder="Address Line 1"
                v-model="otherDetails.addressLine1"
                :disabled="!isOtherDetailsEditing"
                :class="
                  isOtherDetailsEditing
                    ? 'bg-white border-gray-400'
                    : 'bg-gray-50 border-gray-300'
                "
                class="w-full p-3 border rounded-lg focus:ring-primary-green focus:border-primary-green transition duration-150"
              />
              <input
                type="text"
                placeholder="Address Line 2"
                v-model="otherDetails.addressLine2"
                :disabled="!isOtherDetailsEditing"
                :class="
                  isOtherDetailsEditing
                    ? 'bg-white border-gray-400'
                    : 'bg-gray-50 border-gray-300'
                "
                class="w-full p-3 border rounded-lg focus:ring-primary-green focus:border-primary-green transition duration-150"
              />

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  v-model="otherDetails.state"
                  :disabled="!isOtherDetailsEditing"
                  :class="
                    isOtherDetailsEditing
                      ? 'bg-white border-gray-400'
                      : 'bg-gray-50 border-gray-300'
                  "
                  class="w-full p-3 border rounded-lg appearance-none focus:ring-primary-green focus:border-primary-green transition duration-150"
                >
                  <option value="">Select Option (State)</option>
                  <option value="Mock State">Mock State</option>
                </select>
                <select
                  v-model="otherDetails.country"
                  :disabled="!isOtherDetailsEditing"
                  :class="
                    isOtherDetailsEditing
                      ? 'bg-white border-gray-400'
                      : 'bg-gray-50 border-gray-300'
                  "
                  class="w-full p-3 border rounded-lg appearance-none focus:ring-primary-green focus:border-primary-green transition duration-150"
                >
                  <option value="">Select Option (Country)</option>
                  <option value="Mock Country">Mock Country</option>
                </select>
              </div>

              <textarea
                rows="3"
                placeholder="Brief Description"
                v-model="otherDetails.description"
                :disabled="!isOtherDetailsEditing"
                :class="
                  isOtherDetailsEditing
                    ? 'bg-white border-gray-400'
                    : 'bg-gray-50 border-gray-300'
                "
                class="w-full p-3 border rounded-lg focus:ring-primary-green focus:border-primary-green resize-none transition duration-150"
              ></textarea>
            </div>
          </div>

          <div class="p-6 bg-white rounded-xl shadow-lg">
            <h2 class="text-xl font-semibold mb-4">My Interests</h2>
            <p class="text-sm text-gray-600 mb-6">
              Select up to four categories you're into. We'll help you find
              great things to learn. (Selected: {{ selectedInterestsCount }}/4)
            </p>

            <div class="flex flex-wrap gap-3">
              <button
                v-for="interest in interests"
                :key="interest.id"
                @click="toggleInterest(interest.id)"
                :disabled="
                  !interest.selected &&
                  selectedInterestsCount >= 4 &&
                  !interest.isMainCategory
                "
                :class="{
                  'bg-green-100 text-green-700': interest.isMainCategory,
                  'bg-orange-100 text-orange-700 hover:bg-orange-200':
                    interest.selected && !interest.isMainCategory,
                  'bg-gray-100 text-gray-700 hover:bg-gray-200':
                    !interest.selected && !interest.isMainCategory,
                }"
                class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {{ interest.name }}
                <svg
                  v-if="interest.isMainCategory"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4 h-4 ml-2"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <svg
                  v-else-if="interest.selected"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4 h-4 ml-2"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4 h-4 ml-2"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          v-else
          class="p-10 text-center bg-white rounded-xl shadow-lg text-gray-500"
        >
          <h2 class="text-2xl font-semibold mb-3">
            Content for {{ activeTab }}
          </h2>
          <p>
            This section will contain details related to your {{
              activeTab
            }} preferences or status.
          </p>
        </div>
      </div>

      <div
        v-else
        class="p-10 text-center bg-white rounded-xl shadow-lg text-gray-500"
      >
        <h2 class="text-2xl font-semibold mb-3">
          Welcome to the {{ currentView }} Page
        </h2>
        <p>
          This is where the content for the primary {{ currentView }} view
          would be rendered. The sidebar controls the major page view.
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Define CSS Variables for Theming */
:root {
  --primary-green: #104037; /* Deep Forest Green */
  --sidebar-green: #104037;
  --sidebar-green-dark: #0c3029;
  --light-green-bg: #e5f5e9; /* Very Light Mint/Greenish White */
  --active-light-green: #d1fae5; /* Tailwind green-100 */
}

/* Base Font */
.font-inter {
  font-family: 'Inter', sans-serif;
}

/* Utility Classes */
.main-button {
  background-color: var(--primary-green);
  transition: all 0.2s;
}
.main-button:hover {
  background-color: var(--sidebar-green-dark);
}
.org-info-card {
  background-color: var(--light-green-bg);
}

/* Active Internal Tab Style */
.tab-active {
  border-bottom: 2px solid var(--primary-green);
  color: var(--primary-green);
  font-weight: 600;
}
</style>
