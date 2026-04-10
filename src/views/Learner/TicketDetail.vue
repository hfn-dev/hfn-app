<script setup>
import ticketApi from '@/api/tickets.js';
import { defineEmits, defineProps, ref } from 'vue';
import { useToast } from 'vue-toastification';

const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
});

const toast = useToast();

const emit = defineEmits(['close']);
const updateText = ref('');



const submitUpdate = async () => {
  const text = updateText.value.trim();
  if (!text) return;

  try {
    const updatedTicket = await ticketApi.updateTicket(props.ticket.id, {
      update: text,
    });

    props.ticket.update1 = updatedTicket.update1 || text;
    props.ticket.status = updatedTicket.status || props.ticket.status;

    toast.success(`Update submitted for Ticket #${props.ticket.number}.`);
    updateText.value = '';
  } catch (error) {
    console.error('Failed to submit ticket update');
    toast.error('Failed to submit update. Please try again later.');
  }
};

</script>

<template>
  <div class="space-y-8 p-4 sm:p-8 border border-gray-200 rounded-lg bg-white">
    <div class="pt-2 pb-4">
      <button
        @click="$emit('close')"
        class="text-sm text-green-600 hover:text-green-800 font-medium flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Tickets List
      </button>
    </div>

    <div class="mb-8 p-4 bg-green-50 rounded-lg border border-green-200">
      <p class="text-xl font-medium text-gray-800 mb-2">
        Dear {{ ticket.userName }},
      </p>
      <p class="text-green-800 text-sm">
        Your ticket has been successfully created with No.
        <span class="font-semibold">{{ ticket.number }}</span
        >. We will revert shortly. Thank you.
      </p>
    </div>

    <h2 class="text-2xl font-normal text-gray-800 border-b pb-2 mb-4">
      Details
    </h2>

    <dl class="text-sm text-gray-700">
      <div
        class="py-3 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50 rounded-t-md"
      >
        <dt class="font-medium text-gray-500">Ticket Number:</dt>
        <dd class="mt-1 sm:mt-0 sm:col-span-2 text-gray-900 font-semibold">
          {{ ticket.number }}
        </dd>
      </div>

      <div class="py-3 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="font-medium text-gray-500">Ticket Type:</dt>
        <dd class="mt-1 sm:mt-0 sm:col-span-2">{{ ticket.type }}</dd>
      </div>

      <div class="py-3 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
        <dt class="font-medium text-gray-500">Date Created:</dt>
        <dd class="mt-1 sm:mt-0 sm:col-span-2">{{ ticket.dateCreated }}</dd>
      </div>

      <div class="py-3 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="font-medium text-gray-500">Description:</dt>
        <dd class="mt-1 sm:mt-0 sm:col-span-2">{{ ticket.description }}</dd>
      </div>

      <div class="py-3 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
        <dt class="font-medium text-gray-500">Status:</dt>
        <dd class="mt-1 sm:mt-0 sm:col-span-2 flex items-center">
          <span
            :class="[
              'h-2.5 w-2.5 rounded-full mr-2',
              ticket.status === 'Published'
                ? 'bg-green-500'
                : ticket.status === 'Archived'
                ? 'bg-gray-500'
                : 'bg-orange-500',
            ]"
          ></span>
          <span class="font-semibold">{{ ticket.status }}</span>
        </dd>
      </div>

      <div
        class="py-3 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-b-md"
        v-if="ticket.update1"
      >
        <dt class="font-medium text-gray-500">Update 1:</dt>
        <dd class="mt-1 sm:mt-0 sm:col-span-2">{{ ticket.update1 }}</dd>
      </div>
    </dl>

    <form
      @submit.prevent="submitUpdate"
      class="pt-6 border-t border-gray-200 space-y-4"
    >
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start px-4 sm:px-6">
        <label
          for="update-description"
          class="block text-sm font-medium text-gray-500 sm:mt-px pt-2"
        >
          Update Description:
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <textarea
            id="update-description"
            v-model="updateText"
            rows="5"
            placeholder="Provide an update"
            class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md p-3"
          ></textarea>
        </div>
      </div>

      <div class="flex justify-center px-4 sm:px-6">
        <button
          type="submit"
          :disabled="!updateText.trim()"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Update
        </button>
      </div>
    </form>
  </div>
</template>
