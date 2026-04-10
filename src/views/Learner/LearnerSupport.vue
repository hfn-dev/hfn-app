<script setup>
import ticketApi from '@/api/tickets.js';
import LearnerSidebar from './LearnerSidebar.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import TicketDetail from './TicketDetail.vue';

const activeTab = ref('new-ticket');
const selectedTicketId = ref(null);
const toast = useToast();

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const searchQuery = ref('');
const tickets = ref([]);
const filteredTickets = ref([]);

const mapTicket = (t) => ({
  id: t.id,
  number: t.ticket_number,
  userName: t.user_full_name,
  subject: t.subject,
  description: t.message,
  status: t.status,
  dateCreated: new Date(t.created_at).toLocaleString(),
  lastUpdate: new Date(t.updated_at).toLocaleString(),
  update1: t.update1 ?? null,
});

const fetchTickets = async () => {
  try {
    const data = await ticketApi.getTickets();
    tickets.value = data.map(mapTicket);
    filteredTickets.value = tickets.value;
  } catch (error) {
    console.error('Failed to fetch tickets');
  }
};


const submitTicket = async () => {
  try {
    const created = await ticketApi.createTicket(formData.value);
    toast.success(`Ticket "${created.subject}" submitted successfully!`);
    await fetchTickets();
    formData.value = { name: '', email: '', subject: '', message: '' };

    activeTab.value = 'tickets';
  } catch (error) {
    console.error('Failed to create ticket');
    toast.error('Failed to submit ticket. Try again later.');
  }
};

const viewTicketDetails = async (id) => {
  selectedTicketId.value = id;
  activeTab.value = 'tickets';

  try {
    const res = await ticketApi.viewTicketDetails(id);
    const mapped = mapTicket(res);

    const index = tickets.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      tickets.value[index] = mapped;
    }
  } catch (error) {
    console.error('Failed to fetch ticket details');
  }
};

const closeTicketDetails = () => {
  selectedTicketId.value = null;
};

watch(searchQuery, (newQuery) => {
  if (!newQuery) {
    filteredTickets.value = tickets.value;
  } else {
    filteredTickets.value = tickets.value.filter(
      (t) =>
        t.number.toLowerCase().includes(newQuery.toLowerCase()) ||
        t.subject?.toLowerCase().includes(newQuery.toLowerCase()) ||
        t.status?.toLowerCase().includes(newQuery.toLowerCase())
    );
  }
});

onMounted(fetchTickets);

const currentTicket = computed(() => {
  return tickets.value.find((t) => t.id === selectedTicketId.value) || null;
});
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <LearnerSidebar />

    <div class="flex-1 flex flex-col overflow-hidden relative">
      <header class="p-6 bg-white">
        <div class="text-sm text-gray-500">
          <span class="hover:underline cursor-pointer">Home</span> >
          <span class="text-gray-800">Support</span>
          <span v-if="activeTab === 'tickets'" class="text-gray-500">
            >
            <span v-if="!selectedTicketId" class="text-gray-800">Tickets</span>
            <span v-else class="text-gray-500">
              <span
                @click="closeTicketDetails"
                class="hover:underline cursor-pointer"
                >Tickets</span
              >
              &gt;
              <span class="font-semibold text-gray-800">{{
                currentTicket ? currentTicket.number : 'Details'
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
                          v-for="ticket in filteredTickets"
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
