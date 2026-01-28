<script setup>
import { ref, onMounted } from 'vue';
import eventsApi from '@/api/eventsApi';
import uploadsApi from '@/api/contentUploadsApi';

/* ================= EVENTS ================= */
const events = ref([]);
const loadingEvents = ref(false);

const eventForm = ref({
  title: '',
  description: '',
  event_type: 'webinar',
  status: 'upcoming',
  start_datetime: '',
  end_datetime: '',
  location: '',
  meeting_url: '',
  max_attendees: null,
  registration_deadline: '',
  is_free: true,
  price: '',
});

const fetchEvents = async () => {
  loadingEvents.value = true;
  events.value = await eventsApi.listEvents();
  loadingEvents.value = false;
};

const createEvent = async () => {
  const payload = {
    ...eventForm.value,
    price: eventForm.value.is_free ? null : eventForm.value.price,
  };

  await eventsApi.createCalenderEvent(payload);
  await fetchEvents();

  Object.assign(eventForm.value, {
    title: '',
    description: '',
    event_type: 'webinar',
    status: 'upcoming',
    start_datetime: '',
    end_datetime: '',
    location: '',
    meeting_url: '',
    max_attendees: null,
    registration_deadline: '',
    is_free: true,
    price: '',
  });
};

/* ============== UPLOADS ================= */
const uploads = ref([]);

const uploadForm = ref({
  title: '',
  type: 'newsletter',
  description: '',
  file: '',
});

const fetchUploads = async () => {
  uploads.value = await uploadsApi.list();
};

const uploadFile = async (e) => {
  const file = e.target.files[0];
  const { url } = await uploadsApi.upload(file);
  uploadForm.value.file = url;
};

const createUpload = async () => {
  await uploadsApi.create(uploadForm.value);
  await fetchUploads();

  uploadForm.value = {
    title: '',
    type: 'newsletter',
    description: '',
    file: '',
  };
};

onMounted(() => {
  fetchEvents();
  fetchUploads();
});
</script>


<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-2xl font-bold mb-8">Events & Newsletters</h1>

    <!-- ================= EVENTS ================= -->
    <section>
      <h2 class="text-xl font-semibold mb-4">Create Event</h2>

      <div class="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow">
        <input v-model="eventForm.title" class="input" placeholder="Title" />
        <select v-model="eventForm.event_type" class="input">
          <option value="webinar">Webinar</option>
          <option value="physical">Physical</option>
        </select>

        <input type="datetime-local" v-model="eventForm.start_datetime" class="input" />
        <input type="datetime-local" v-model="eventForm.end_datetime" class="input" />

        <input v-model="eventForm.location" class="input" placeholder="Location" />
        <input v-model="eventForm.meeting_url" class="input" placeholder="Meeting URL" />

        <input type="number" v-model="eventForm.max_attendees" class="input" placeholder="Max attendees" />
        <input type="datetime-local" v-model="eventForm.registration_deadline" class="input" />
      </div>

      <textarea
        v-model="eventForm.description"
        class="input mt-4 w-full h-24"
        placeholder="Description"
      />

      <div class="flex items-center gap-4 mt-4">
        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="eventForm.is_free" />
          Free Event
        </label>

        <input
          v-if="!eventForm.is_free"
          v-model="eventForm.price"
          class="input"
          placeholder="Price"
        />
      </div>

      <button @click="createEvent" class="btn-primary mt-4">
        Create Event
      </button>

      <!-- Events list -->
      <div class="mt-8">
        <h3 class="font-semibold mb-3">Existing Events</h3>

        <table class="w-full text-sm bg-white rounded-xl overflow-hidden">
          <thead class="bg-gray-100 text-left">
            <tr>
              <th class="p-3">Title</th>
              <th>Status</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in events" :key="event.id" class="border-t">
              <td class="p-3 font-medium">{{ event.title }}</td>
              <td>{{ event.status }}</td>
              <td>{{ event.event_type }}</td>
              <td>{{ event.start_datetime }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

       <div class="my-12 flex items-center gap-4">
      <div class="flex-1 h-px bg-gray-300"></div>
      <span class="text-sm text-gray-500">NEWSLETTERS & DOCUMENTS</span>
      <div class="flex-1 h-px bg-gray-300"></div>
    </div>


        <!-- ============== UPLOADS ================= -->
    <section>
      <h2 class="text-xl font-semibold mb-4">Upload Newsletter / Document</h2>

      <div class="bg-white p-6 rounded-xl shadow max-w-xl">
        <input v-model="uploadForm.title" class="input mb-3" placeholder="Title" />

        <select v-model="uploadForm.type" class="input mb-3">
          <option value="newsletter">Newsletter</option>
          <option value="document">Document</option>
        </select>

        <textarea
          v-model="uploadForm.description"
          class="input mb-3"
          placeholder="Description"
        />

        <input type="file" @change="uploadFile" class="mb-4" />

        <button @click="createUpload" class="btn-primary">
          Upload
        </button>
      </div>

      <!-- Upload list -->
      <div class="mt-8">
        <h3 class="font-semibold mb-3">Uploaded Content</h3>

        <ul class="bg-white rounded-xl divide-y">
          <li
            v-for="item in uploads"
            :key="item.id"
            class="p-4 flex justify-between"
          >
            <div>
              <p class="font-medium">{{ item.title }}</p>
              <p class="text-xs text-gray-500">{{ item.type }}</p>
            </div>

            <a :href="item.file" target="_blank" class="text-primary">
              View
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
    
