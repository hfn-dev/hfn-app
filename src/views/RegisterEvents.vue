<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      
      <div class="bg-green-700 p-8 text-white">
        <h1 class="text-3xl font-bold">2026 HFN Annual Conference</h1>
        <p class="mt-2 text-green-100 italic">Healthcare Federation of Nigeria (HFN) Event Registration</p>
      </div>

      <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label class="block text-sm font-semibold text-gray-700">Name</label>
            <input v-model="form.name" type="text" required placeholder="Enter Name"
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" />
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-semibold text-gray-700">Email</label>
            <textarea v-model="form.email" type="text" required placeholder="Enter Email"
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"></textarea>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700">Event Type</label>
            <select v-model="form.event_type" class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white">
              <option value="online">Online</option>
              <option value="onsite">Onsite</option>
              <option value="workshop">Workshop</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700">Select Audience</label>
            <select v-model="form.audience" class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white">
              <option value="members">HFN Member</option>
              <option value="public">Public</option>
              <option value="stakeholders">Stakeholders</option>
            </select>
          </div>
        </div>

        <hr class="border-gray-100" />

        

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700">Location</label>
            <input v-model="form.location" type="text" placeholder="Home Address"
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700">Phone Number</label>
            <input v-model.number="form.phone" type="number" placeholder="Enter Phone Number"
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg" />
          </div>
        </div>

        <div class="bg-gray-50 p-4 rounded-xl flex items-center justify-between border border-gray-200">
          <div class="flex items-center">
            <input v-model="form.is_free" type="checkbox" id="is_free" 
              class="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500" />
            <label for="is_free" class="ml-3 block text-sm font-bold text-gray-700">I'm a member</label>
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
  price: "50000.00",
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
