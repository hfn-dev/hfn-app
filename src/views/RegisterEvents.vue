<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      
      <div class="bg-green-700 p-8 text-white">
        <h1 class="text-3xl font-bold">Organize New Event</h1>
        <p class="mt-2 text-green-100 italic">Healthcare Federation of Nigeria (HFN) Portal</p>
      </div>

      <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label class="block text-sm font-semibold text-gray-700">Event Title</label>
            <input v-model="form.title" type="text" required placeholder="e.g. Annual Healthcare Summit"
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" />
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-semibold text-gray-700">Description</label>
            <textarea v-model="form.description" rows="4" required
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"></textarea>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700">Event Type</label>
            <select v-model="form.event_type" class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white">
              <option value="webinar">Webinar</option>
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700">Target Audience</label>
            <select v-model="form.audience" class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white">
              <option value="members">HFN Members Only</option>
              <option value="public">Public</option>
              <option value="stakeholders">Stakeholders</option>
            </select>
          </div>
        </div>

        <hr class="border-gray-100" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700">Start Date & Time</label>
            <input v-model="form.start_datetime" type="datetime-local" required
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700">End Date & Time</label>
            <input v-model="form.end_datetime" type="datetime-local" required
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700">Location</label>
            <input v-model="form.location" type="text" placeholder="Physical Address or Zoom Link"
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700">Max Attendees</label>
            <input v-model.number="form.max_attendees" type="number" placeholder="Leave empty for unlimited"
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg" />
          </div>
        </div>

        <div class="bg-gray-50 p-4 rounded-xl flex items-center justify-between border border-gray-200">
          <div class="flex items-center">
            <input v-model="form.is_free" type="checkbox" id="is_free" 
              class="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500" />
            <label for="is_free" class="ml-3 block text-sm font-bold text-gray-700">This is a free event</label>
          </div>
          <div v-if="!form.is_free" class="w-1/3">
            <input v-model="form.price" type="text" placeholder="Price (NGN)"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm" />
          </div>
        </div>

        <div class="pt-4">
          <button type="submit" :disabled="loading"
            class="w-full bg-orange-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all disabled:opacity-50 flex justify-center items-center">
            <span v-if="loading">Processing...</span>
            <span v-else>Register Event</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import eventsApi from "@/api/events";

const loading = ref(false);

const form = reactive({
  title: "",
  description: "",
  event_type: "webinar",
  status: "upcoming",
  organizer: 1,
  start_datetime: "",
  end_datetime: "",
  location: "",
  is_free: true,
  price: "0.00",
  banner_image: "",
  max_attendees: null,
  audience: "members",
});

const handleSubmit = async () => {
  loading.value = true;

  try {
    const payload = {
      ...form,
      start_datetime: new Date(form.start_datetime).toISOString(),
      end_datetime: new Date(form.end_datetime).toISOString(),
      price: form.is_free ? "0" : form.price,
    };

    const response = await eventsApi.createEvent(payload);
    Object.keys(form).forEach((key) => (form[key] = ""));
  } catch (error) {
    console.error("Failed to create event:", error);
  } finally {
    loading.value = false;
  }
};
</script>
