<script setup>
import { computed, reactive, ref } from "vue";
import EditorSidebar from "./EditorSidebar.vue";

// const subscription = reactive({
//   expiryDate: "31st December 2025",
//   invoices: [
//     {
//       id: 1,
//       invoiceNo: "001",
//       invoiceDate: "Monday, December 19 2024",
//       dueDate: "Monday, December 31 2025",
//       total: "₦200,000.00",
//       status: "Paid",
//     },
//     {
//       id: 2,
//       invoiceNo: "001",
//       invoiceDate: "Monday, December 29 2023",
//       dueDate: "Monday, December 31 2024",
//       total: "₦200,000.00",
//       status: "Paid",
//     },
//     {
//       id: 3,
//       invoiceNo: "001",
//       invoiceDate: "Monday, December 01 2022",
//       dueDate: "Monday, December 31 2023",
//       total: "₦200,000.00",
//       status: "Paid",
//     },
//   ],
//   currentPage: 1,
//   totalPages: 2,
//   totalEntries: 10,
// });

// const makePayment = () => {
//   console.log("Initiating payment process...");
//   alert("Redirecting to payment gateway...");
// };

const goToPage = (page) => {
  if (page >= 1 && page <= subscription.totalPages) {
    subscription.currentPage = page;
    console.log(`Navigating to page ${page}`);
  }
};

const isOrganization = ref(true);
const currentView = ref("My Account");
const activeTab = ref("Subscription");

const isOrgEditing = ref(false);
const orgDetails = reactive({
  name: "Ruthie & Co Nigeria Limited",
  email: "peterpan@gmail.com.us",
  phone: "+234 123 456 78",
  password: "********",
});
const orgDetailsKeys = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email Address" },
  { key: "phone", label: "Phone Number" },
  { key: "password", label: "Password" },
];

const isIndividualEditing = ref(false);
const individualDetails = reactive({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 555 123 4567",
  password: "********",
});
const individualDetailsKeys = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "email", label: "Email Address" },
  { key: "phone", label: "Phone Number" },
  { key: "password", label: "Password" },
];

const isOtherDetailsEditing = ref(false);
const otherDetails = reactive({
  addressLine1: "Address Line 1",
  addressLine2: "Address Line 2",
  state: "Mock State",
  country: "Mock Country",
  description: "Sample Text",
});

const invitations = reactive([
  { id: 1, email: "peterpan@gmail.com", sent: true },
  { id: 2, email: "", sent: false },
  { id: 3, email: "", sent: false },
]);

const sentInvitesCount = computed(
  () => invitations.filter((i) => i.sent).length
);

const interests = reactive([
  { id: 10, name: "Mother", selected: true, isMainCategory: true },
  { id: 11, name: "Child", selected: true, isMainCategory: true },
  { id: 12, name: "Baby", selected: true, isMainCategory: true },
  { id: 13, name: "Pregnancy", selected: true, isMainCategory: true },
  { id: 1, name: "Marketing", selected: true, isMainCategory: false },
  { id: 2, name: "Gynaecology", selected: true, isMainCategory: false },
  { id: 3, name: "Paediatrics", selected: true, isMainCategory: false },
  { id: 4, name: "General Health", selected: false, isMainCategory: false },
  { id: 5, name: "Insurance", selected: false, isMainCategory: false },
  { id: 6, name: "Dentistry", selected: false, isMainCategory: false },
]);

const selectedInterestsCount = computed(
  () => interests.filter((i) => i.selected && !i.isMainCategory).length
);

const toggleOrgEdit = () => {
  if (isOrgEditing.value) {
    console.log(
      "Saving Organization Details:",
      JSON.parse(JSON.stringify(orgDetails))
    );
  }
  isOrgEditing.value = !isOrgEditing.value;
};

const toggleIndividualEdit = () => {
  if (isIndividualEditing.value) {
    console.log(
      "Saving Individual Details:",
      JSON.parse(JSON.stringify(individualDetails))
    );
  }
  isIndividualEditing.value = !isIndividualEditing.value;
};

// const toggleOtherDetailsEdit = () => {
//   if (isOtherDetailsEditing.value) {
//     console.log(
//       "Saving Other Details:",
//       JSON.parse(JSON.stringify(otherDetails))
//     );
//   }
//   isOtherDetailsEditing.value = !isOtherDetailsEditing.value;
// };

// const sendInvitation = (id) => {
//   const invite = invitations.find((i) => i.id === id);
//   if (invite && invite.email !== "") {
//     console.log(`Sending invite to: ${invite.email}`);
//     invite.sent = true;
//   }
// };

// const removeInvitation = (id) => {
//   const invite = invitations.find((i) => i.id === id);
//   if (invite) {
//     invite.email = "";
//     invite.sent = false;
//   }
// };

// const toggleInterest = (id) => {
//   const item = interests.find((i) => i.id === id);

//   if (item && !item.isMainCategory) {
//     const willBeSelected = !item.selected;

//     if (willBeSelected && selectedInterestsCount.value >= 4) {
//       console.log("Cannot select more than 4 secondary interests.");
//       return;
//     }

//     item.selected = willBeSelected;
//   }
// };
</script>

<template>
  <div class="flex flex-col lg:flex-row min-h-screen font-inter">
    <EditorSidebar />

    <main class="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
      <span class="text-sm text-gray-500"
        >Home / My Account / {{ activeTab }}</span
      >

      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold mt-2 text-gray-800">{{ currentView }}</h1>
      </header>

      <div v-if="currentView === 'My Account'">
        <div
          class="flex justify-center border-b border-gray-200 mb-8 space-x-6"
        >
          <button
            @click="activeTab = 'My Profile'"
            :class="[
              'py-2 px-1 border-b-2 transition duration-150 font-medium',
              activeTab === 'My Profile'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            ]"
          >
            My Profile
          </button>
          <!-- <button
            @click="activeTab = 'Subscription'"
            :class="[
              'py-2 px-1 border-b-2 transition duration-150 font-medium',
              activeTab === 'Subscription'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            ]"
          >
            Signatures
          </button> -->
        </div>

        <div v-if="activeTab === 'My Profile'" class="space-y-10">
          <div v-if="isOrganization" class="p-6 bg-white shadow-lg space-y-8">
            <h2 class="text-xl font-semibold text-gray-800">
             Profile
            </h2>

            <div class="grid md:grid-cols-2 gap-8">
              <div
                class="flex flex-col items-center p-6 border border-gray-200 rounded-xl"
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
                    class="px-4 py-2 text-sm text-green-800 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg shadow-sm transition duration-150"
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

                <!-- <div class="flex justify-end mt-6">
                  <button
                    @click="toggleOrgEdit"
                    :class="
                      isOrgEditing
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-[#0c6b39] hover:bg-[#09572d]'
                    "
                    class="px-6 py-2 text-sm text-white rounded-lg shadow-md transition duration-150"
                  >
                    {{ isOrgEditing ? "Save Changes" : "Edit" }}
                  </button>
                </div> -->
              </div>
            </div>
          </div>

          <div v-else class="p-6 bg-white rounded-xl shadow-lg space-y-8">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold">My Personal Profile</h2>
              <!-- <button
                @click="toggleIndividualEdit"
                :class="
                  isIndividualEditing
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-[#0c6b39] hover:bg-[#09572d]'
                "
                class="px-6 py-2 text-sm text-white rounded-lg shadow-md transition duration-150"
              >
                {{ isIndividualEditing ? "Save Changes" : "Edit" }}
              </button> -->
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
                    class="px-4 py-2 text-sm text-green-800 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg shadow-sm transition duration-150"
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

              <div class="p-6 rounded-xl shadow-md bg-[#F2F9F3] relative">
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
                <div class="flex justify-end mt-6">
                  <button
                    @click="toggleIndividualEdit"
                    :class="
                      isIndividualEditing
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-[#0c6b39] hover:bg-[#09572d]'
                    "
                    class="px-6 py-2 text-sm text-white rounded-lg shadow-md transition duration-150"
                  >
                    {{ isIndividualEditing ? "Save Changes" : "Edit" }}
                  </button>
                </div>
              </div>
            </div>

            <div class="text-center mt-8 pt-6 border-t border-gray-200">
              <h3 class="text-xl font-bold mb-2 text-gray-800">
                Account Status: <span class="text-green-600">VERIFIED</span>
              </h3>
            </div>
          </div>

          <!-- <div v-if="isOrganization" class="p-6 bg-white shadow-lg">
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
                  :disabled="invite.sent"
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
          </div> -->
        </div>

        <!-- <div v-else-if="activeTab === 'Subscription'" class="space-y-10">
          <div
            class="p-10 bg-[#F2F9F3] rounded-xl shadow-lg text-center border-2 border-green-300"
          >
            <h2 class="text-2xl font-semibold mb-3 text-gray-800">
              Your subscription expires on:
            </h2>
            <p class="text-4xl font-bold text-orange-600 mb-6">
              {{ subscription.expiryDate }}
            </p>
            <button
              @click="makePayment"
              class="px-8 py-3 text-lg text-white bg-[#0c6b39] hover:bg-[#09572d] rounded-lg shadow-md transition duration-150 font-semibold"
            >
              Make Payment
            </button>
          </div>

          <div>
            <h2 class="text-2xl font-semibold mb-6 text-gray-800">
              My Invoices
            </h2>

            <div
              class="flex justify-between items-center mb-4 p-4 bg-gray-50 rounded-t-lg"
            >
              <p class="text-sm text-gray-700">
                Showing 1 to {{ subscription.invoices.length }} of
                {{ subscription.totalEntries }} entries
              </p>
              <div class="relative">
                <input
                  type="text"
                  placeholder="Search"
                  class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
                <svg
                  class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>

            <div
              class="overflow-x-auto bg-white border border-gray-200 shadow-lg rounded-b-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Invoice #
                      <span class="ml-1 text-gray-400">⋮</span>
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Invoice Date
                      <span class="ml-1 text-gray-400">⋮</span>
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Due Date
                      <span class="ml-1 text-gray-400">⋮</span>
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                      <span class="ml-1 text-gray-400">⋮</span>
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status/Action
                      <span class="ml-1 text-gray-400">⋮</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="invoice in subscription.invoices"
                    :key="invoice.id"
                  >
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {{ invoice.invoiceNo }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ invoice.invoiceDate }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ invoice.dueDate }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {{ invoice.total }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                      >
                        {{ invoice.status }}
                      </span>
                      <a
                        href="#"
                        class="ml-4 text-green-600 hover:text-green-900 flex items-center inline-block"
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
                          class="w-4 h-4 mr-1"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" x2="12" y1="15" y2="3" />
                        </svg>
                        Download
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              class="flex justify-end items-center mt-4 text-sm text-gray-600"
            >
              <p class="mr-4">
                Page {{ subscription.currentPage }} of
                {{ subscription.totalPages }}
              </p>
              <button
                @click="goToPage(subscription.currentPage - 1)"
                :disabled="subscription.currentPage === 1"
                class="flex items-center text-gray-400 hover:text-gray-600 disabled:opacity-50 mr-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Prev
              </button>
              <button
                @click="goToPage(subscription.currentPage + 1)"
                :disabled="subscription.currentPage === subscription.totalPages"
                class="flex items-center text-gray-400 hover:text-gray-600 disabled:opacity-50"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div> -->

        <!-- <div
          v-else
          class="p-10 text-center bg-white rounded-xl shadow-lg text-gray-500"
        >
          <h2 class="text-2xl font-semibold mb-3">
            Content for {{ activeTab }}
          </h2>
          <p>
            This section will contain details related to your
            {{ activeTab }} preferences or status.
          </p>
        </div> -->
      </div>

      <!-- <div
        v-else
        class="p-10 text-center bg-white rounded-xl shadow-lg text-gray-500"
      >
        <h2 class="text-2xl font-semibold mb-3">
          Welcome to the {{ currentView }} Page
        </h2>
        <p>
          This is where the content for the primary {{ currentView }} view would
          be rendered. The sidebar controls the major page view.
        </p>
      </div> -->
    </main>
  </div>
</template>

<style scoped>
:root {
  --primary-green: #0c6b39;
  --sidebar-green: #104037;
  --sidebar-green-dark: #09572d;
  --light-green-bg: #f2f9f3;
  --active-light-green: #d1fae5;
}

.font-inter {
  font-family: "Inter", sans-serif;
}

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

.tab-active {
  border-bottom: 2px solid var(--primary-green);
  color: var(--primary-green);
  font-weight: 600;
}
</style>