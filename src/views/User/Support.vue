
<script setup>
import { ref, computed } from "vue";
import UserSidebar from "@/components/layout/UserSidebar.vue";
import TicketDetail from "./TicketDetail.vue";

const activeTab = ref("new-ticket");
const selectedTicketId = ref(null);

const formData = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const searchQuery = ref("");

const tickets = ref([
  {
    id: 1,
    number: "ED1001",
    type: "Payment Issue",
    dateCreated: "December 28 2024",
    status: "Published",
    lastUpdate: "December 28 2024",
    description:
      "This is the main description for ticket ED1001. I cannot seem to process payment for the latest course I purchased. Please investigate the transaction issue immediately.",
    update1:
      "Our team is currently looking into the payment gateway logs. We will provide an update within 24 hours.",
    userName: "Jerome Saka",
  },
  {
    id: 2,
    number: "ED2327",
    type: "Technical Bug",
    dateCreated: "December 19 2024",
    status: "Archived",
    lastUpdate: "December 19 2024",
    description:
      "The video player crashes every time I try to fast-forward on my mobile device. This is very frustrating.",
    update1:
      "A patch was deployed today to fix an issue with mobile video buffering. Please test and confirm the fix.",
    userName: "Peter Pan",
  },
  {
    id: 3,
    number: "ED004",
    type: "Content Request",
    dateCreated: "December 14 2024",
    status: "Published",
    lastUpdate: "December 14 2024",
    description:
      "I would like to see a new module on advanced Vue 3 composition API patterns. This would be a great addition.",
    update1:
      "Thank you for your suggestion! We have added it to our content roadmap for Q1 next year.",
    userName: "Alice Smith",
  },
  {
    id: 4,
    number: "ED004",
    type: "Account Issue",
    dateCreated: "November 19 2024",
    status: "Published",
    lastUpdate: "November 19 2024",
    description:
      "I forgot my password and the reset link is not arriving in my inbox.",
    update1:
      "We have manually reset your password and sent a temporary one to your verified email. Check spam if you don't see it in 5 minutes.",
    userName: "Bob Johnson",
  },
  {
    id: 5,
    number: "ED004",
    type: "General Inquiry",
    dateCreated: "November 11 2024",
    status: "Archived",
    lastUpdate: "November 11 2024",
    description: "Can you tell me more about the mentorship program?",
    update1:
      "We sent you an information packet detailing the tiers and availability of our mentorship program.",
    userName: "Charlie Brown",
  },
  {
    id: 6,
    number: "ED004",
    type: "Payment Issue",
    dateCreated: "November 10 2024",
    status: "Published",
    lastUpdate: "November 10 2024",
    description: "I was double-charged for my subscription this month.",
    update1:
      "We have processed a refund for the duplicate charge. It should reflect in your bank account in 3-5 business days.",
    userName: "Diana Prince",
  },
  {
    id: 7,
    number: "ED004",
    type: "Technical Bug",
    dateCreated: "November 9 2024",
    status: "Published",
    lastUpdate: "November 9 2024",
    description:
      "The site loads very slowly when I open the dashboard on Friday afternoons.",
    update1:
      "We identified a server capacity issue during peak times and have scaled up our resources. The site should now be fast, even on Fridays.",
    userName: "Ethan Hunt",
  },
  {
    id: 8,
    number: "ED004",
    type: "Account Issue",
    dateCreated: "December 9 2024",
    status: "Archived",
    lastUpdate: "December 9 2024",
    description: "My account name is misspelled.",
    update1: "Your account name has been successfully updated.",
    userName: "Fiona Glenanne",
  },
]);

const currentTicket = computed(() => {
  return tickets.value.find((t) => t.id === selectedTicketId.value) || null;
});

const submitTicket = () => {
  console.log("Submitting ticket:", formData.value);
  window.alert(`Ticket for subject "${formData.value.subject}" submitted!`);
  formData.value.subject = "";
  formData.value.message = "";
};

const viewTicketDetails = (id) => {
  selectedTicketId.value = id;
  activeTab.value = "tickets";
};

const closeTicketDetails = () => {
  selectedTicketId.value = null;
};
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <UserSidebar />

    <div class="flex-1 flex flex-col overflow-hidden relative">
      <header class="p-6 bg-white">
        <div class="text-sm text-gray-500">
          <span class="hover:underline cursor-pointer">Home</span> >
          <span class=" text-gray-800">Support</span>
          <span v-if="activeTab === 'tickets'" class="text-gray-500">
            >
            <span v-if="!selectedTicketId" class=" text-gray-800"
              >Tickets</span
            >
            <span v-else class="text-gray-500">
              <span
                @click="closeTicketDetails"
                class="hover:underline cursor-pointer"
                >Tickets</span
              >
              &gt;
              <span class="font-semibold text-gray-800">{{
                currentTicket ? currentTicket.number : "Details"
              }}</span>
            </span>
          </span>
        </div>
      </header>

      <main
        class="flex-1 overflow-x-hidden overflow-y-auto bg-white p-6 sm:p-8"
      >
        <h1 class="text-3xl font-normal text-gray-800 mb-8 text-center">
          Support
        </h1>

        <div class="bg-white rounded-lg shadow-sm">
          <!-- Tab Navigation -->
          <div
            class="flex space-x-4 border-b border-gray-200 justify-center px-8 pt-4"
          >
            <button
              class="px-2 py-3 text-sm font-medium border-b-2 transition duration-150 ease-in-out"
              :class="{
                'text-green-600 border-green-600': activeTab === 'new-ticket',
                'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300':
                  activeTab !== 'new-ticket',
              }"
              @click="
                activeTab = 'new-ticket';
                selectedTicketId = null;
              "
            >
              New Ticket
            </button>
            <button
              class="px-2 py-3 text-sm font-medium border-b-2 transition duration-150 ease-in-out"
              :class="{
                'text-green-600 border-green-600': activeTab === 'tickets',
                'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300':
                  activeTab !== 'tickets',
              }"
              @click="activeTab = 'tickets'"
            >
              Tickets
            </button>
          </div>

          <div class="p-8">
            <!-- New Ticket Form -->
            <div v-if="activeTab === 'new-ticket'">
              <p class="text-gray-600 mb-8 text-center">
                Can't find what you are looking for? Having trouble with
                something? Leave a message and we will get back to you shortly.
              </p>

              <form @submit.prevent="submitTicket" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div
                      class="mt-1 relative border border-gray-300 rounded-md shadow-sm p-4"
                    >
                      <input
                        type="text"
                        id="name"
                        v-model="formData.name"
                        placeholder=""
                        required
                        class="block w-full border-none focus:ring-0 focus:outline-none p-0 text-base placeholder-gray-500 form-input-text"
                      />
                      <span class="absolute top-2 left-4 text-xs text-gray-400"
                        >Name</span
                      >
                    </div>
                  </div>
                  <div>
                    <div
                      class="mt-1 relative border border-gray-300 rounded-md shadow-sm p-4"
                    >
                      <input
                        type="email"
                        id="email"
                        v-model="formData.email"
                        placeholder=""
                        required
                        class="block w-full border-none focus:ring-0 focus:outline-none p-0 text-base placeholder-gray-500 form-input-text"
                      />
                      <span class="absolute top-2 left-4 text-xs text-gray-400"
                        >Email Address</span
                      >
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    class="mt-1 relative border border-gray-300 rounded-md shadow-sm p-4"
                  >
                    <input
                      type="text"
                      id="subject"
                      v-model="formData.subject"
                      placeholder=""
                      required
                      class="block w-full border-none focus:ring-0 focus:outline-none p-0 text-base placeholder-gray-500 form-input-text"
                    />
                    <span class="absolute top-2 left-4 text-xs text-gray-400"
                      >Subject</span
                    >
                  </div>
                </div>
                <div>
                  <div
                    class="mt-1 relative border border-gray-300 rounded-md shadow-sm p-4"
                  >
                    <textarea
                      id="message"
                      v-model="formData.message"
                      rows="7"
                      placeholder=""
                      required
                      class="block w-full border-none focus:ring-0 focus:outline-none p-0 text-base resize-none"
                    ></textarea>
                    <span class="absolute top-2 left-4 text-xs text-gray-400"
                      >Message</span
                    >
                  </div>
                </div>

                <div class="flex justify-center pt-4">
                  <button
                    type="submit"
                    class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  >
                    Send Message
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="ml-3 -mr-1 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 12h14M12 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            <!-- Tickets Tab Content -->
            <div v-else>
              <TicketDetail
                v-if="selectedTicketId && currentTicket"
                :ticket="currentTicket"
                @close="closeTicketDetails"
              />

              <div v-else>
                <div class="mb-4">
                  <div class="relative w-full sm:w-1/2">
                    <svg
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="search"
                      v-model="searchQuery"
                      placeholder="Search..."
                      class="pl-10 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 block w-full text-sm"
                    />
                  </div>
                </div>

                <div v-if="tickets.length">
                  <div
                    class="overflow-x-auto border border-gray-200 rounded-lg"
                  >
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-10"
                          >
                            <input
                              type="checkbox"
                              class="h-4 w-4 text-green-600 border-gray-300 rounded"
                            />
                          </th>
                          <th
                            v-for="header in [
                              'Ticket Number',
                              'Date Created',
                              'Status',
                              'Last Update',
                            ]"
                            :key="header"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer hover:bg-gray-100"
                          >
                            <div class="flex items-center">
                              {{ header }}
                              <svg
                                class="ml-1 h-3 w-3 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M3 4h13M3 8h9m-9 4h9m5-4l4 4m-4-4l-4 4"
                                />
                              </svg>
                            </div>
                          </th>
                          <th
                            class="px-6 py-3 text-center text-xs font-medium text-gray-500 tracking-wider w-20"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr
                          v-for="ticket in tickets"
                          :key="ticket.id"
                          class="hover:bg-gray-50"
                        >
                          <td class="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              class="h-4 w-4 text-green-600 border-gray-300 rounded"
                            />
                          </td>

                          <td
                            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                          >
                            {{ ticket.number }}
                          </td>

                          <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {{ ticket.dateCreated }}
                          </td>

                          <td class="px-6 py-4 whitespace-nowrap">
                            <span
                              :class="[
                                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                ticket.status === 'Published'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-orange-100 text-orange-800',
                              ]"
                            >
                              {{ ticket.status }}
                            </span>
                          </td>

                          <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {{ ticket.lastUpdate }}
                          </td>

                          <td
                            class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium"
                          >
                            <a
                              href="#"
                              @click.prevent="viewTicketDetails(ticket.id)"
                              class="text-gray-500 hover:text-green-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 inline-block"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!-- Pagination -->
                  <div
                    class="flex justify-end items-center pt-4 text-sm text-gray-600"
                  >
                    <span class="mr-4">Page 1 of 2</span>
                    <div class="flex space-x-2">
                      <button
                        class="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-150 ease-in-out"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        class="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-150 ease-in-out"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  v-else
                  class="text-center py-16 text-gray-500 border border-gray-200 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 class="mt-2 text-sm font-medium text-gray-900">
                    No Tickets Found
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.relative input.form-input-text,
.relative textarea {
  padding-top: 1.5rem !important;
  padding-bottom: 0 !important;
}
</style>
