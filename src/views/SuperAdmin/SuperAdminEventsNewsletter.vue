<script setup>
import uploadsApi from "@/api/contentUploadsApi";
import eventsApi from "@/api/events.js";
import SuperAdminSidebar from "@/views/SuperAdmin/SuperAdminSidebar.vue";
import { onMounted, ref, computed } from "vue";
 import newsApi from "@/api/news";
import { useAuth } from "@/stores/auth";

const events = ref([]);
const loadingEvents = ref(false);
const articles = ref([]);



const auth = useAuthStore();

const visibleArticles = computed(() => {
  return articles.value.filter(article => {
    if (article.visibility === "public") return true;
    return auth.isAuthenticated;
  });
});



  
onMounted(async () => {
  articles.value = await newsApi.listArticles({
    status: "published"
  });
});

const createNews = async () => {
  await newsApi.createArticle(newsForm.value);

  Object.assign(newsForm.value, {
    title: "",
    excerpt: "",
    content: "",
    featured_image: "",
    status: "draft",
    visibility: "public",
    is_featured: false,
    featured_order: 0,
    videos: []
  });
};
 

  const uploadNewsImage = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const { url } = await uploadsApi.upload(file);
  newsForm.value.featured_image = url;
};

  const addVideo = () => {
  if (!videoInput.value) return;
  newsForm.value.videos.push(videoInput.value);
  videoInput.value = "";
};

const removeVideo = (index) => {
  newsForm.value.videos.splice(index, 1);
};

const newsForm = ref({
  title: "",
  excerpt: "",
  content: "",
  featured_image: "",
  status: "draft",
  visibility: "public",
  is_featured: false,
  featured_order: 0,
  videos: []
});

const videoInput = ref("");
  
const eventForm = ref({
  title: "",
  description: "",
  event_type: "webinar",
  status: "upcoming",
  start_datetime: "",
  end_datetime: "",
  location: "",
  meeting_url: "",
  max_attendees: null,
  registration_deadline: "",
  is_free: true,
  price: "",
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
    banner: eventForm.value.banner,
  };

  await eventsApi.createCalenderEvent(payload);
  await fetchEvents();

  Object.assign(eventForm.value, {
    title: "",
    description: "",
    event_type: "webinar",
    status: "upcoming",
    start_datetime: "",
    end_datetime: "",
    location: "",
    meeting_url: "",
    max_attendees: null,
    registration_deadline: "",
    is_free: true,
    price: "",
    banner: ""
  });
};

const uploads = ref([]);

const uploadForm = ref({
  title: "",
  type: "newsletter",
  description: "",
  file: "",
});


const uploadBanner = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const { url } = await uploadsApi.upload(file);
    eventForm.value.banner = url;
  } catch (error) {
    console.error("Banner upload failed", error);
  }
};


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
    title: "",
    type: "newsletter",
    description: "",
    file: "",
  };
};

onMounted(() => {
  fetchEvents();
  fetchUploads();
});
</script>


<template>
  <div class="flex min-h-screen font-sans">
    <SuperAdminSidebar />

    <main class="flex-1 p-6 overflow-auto bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold mb-8">Events & Newsletters</h1>

        <section>
          <h2 class="text-xl font-semibold mb-4">Create Event</h2>

          <div class="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow">
            <input
              v-model="eventForm.title"
              class="input"
              placeholder="Title"
            />
            <select v-model="eventForm.event_type" class="input">
              <option value="webinar">Webinar</option>
              <option value="physical">Physical</option>
            </select>

            <input
              type="datetime-local"
              v-model="eventForm.start_datetime"
              class="input"
            />
            <input
              type="datetime-local"
              v-model="eventForm.end_datetime"
              class="input"
            />

            <input
              v-model="eventForm.location"
              class="input"
              placeholder="Location"
            />
            <input
              v-model="eventForm.meeting_url"
              class="input"
              placeholder="Meeting URL"
            />

            <input
              type="number"
              v-model="eventForm.max_attendees"
              class="input"
              placeholder="Max attendees"
            />
            <input
              type="datetime-local"
              v-model="eventForm.registration_deadline"
              class="input"
            />
          </div>

          <textarea
            v-model="eventForm.description"
            class="input mt-4 w-full h-24"
            placeholder="Description"
          ></textarea>

<div class="mt-4">
  <label class="block mb-2 font-medium text-gray-700">Event Banner</label>
  <input type="file" @change="uploadBanner" class="border border-gray-300 rounded-md px-3 py-2 w-full" />
  
  <div v-if="eventForm.banner" class="mt-3">
    <img :src="eventForm.banner" alt="Event Banner" class="h-40 w-full object-cover rounded-md shadow-md" />
  </div>
</div>


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

        <section class="mt-16">
  <h2 class="text-xl font-semibold mb-4">Create News Article</h2>

  <div class="bg-white p-6 rounded-xl shadow space-y-4 max-w-3xl">
    <input v-model="newsForm.title" class="input" placeholder="Title" />
    <input v-model="newsForm.excerpt" class="input" placeholder="Excerpt" />

    <textarea
      v-model="newsForm.content"
      class="input h-40"
      placeholder="Full article content"
    />

    <div>
      <label class="block mb-2">Featured Image</label>
      <input type="file" @change="uploadNewsImage" />
      <img
        v-if="newsForm.featured_image"
        :src="newsForm.featured_image"
        class="h-40 mt-2 rounded"
      />
    </div>

    <div>
      <label class="block mb-1 font-medium">Video links</label>
      <div class="flex gap-2">
        <input v-model="videoInput" class="input flex-1" />
        <button @click="addVideo" class="btn-secondary">Add</button>
      </div>

      <ul class="mt-2 text-sm">
        <li
          v-for="(video, i) in newsForm.videos"
          :key="i"
          class="flex justify-between"
        >
          {{ video }}
          <button @click="removeVideo(i)" class="text-red-600">✕</button>
        </li>
      </ul>
    </div>

    <div class="flex gap-4">
      <select v-model="newsForm.status" class="input">
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>

      <select v-model="newsForm.visibility" class="input">
        <option value="public">Public</option>
        <option value="members">Members only</option>
      </select>
    </div>

    <button @click="createNews" class="btn-primary">
      Publish Article
    </button>
  </div>
</section>


        <div class="my-12 flex items-center gap-4">
          <div class="flex-1 h-px bg-gray-300"></div>
          <span class="text-sm text-gray-500">NEWSLETTERS & DOCUMENTS</span>
          <div class="flex-1 h-px bg-gray-300"></div>
        </div>

        <section>
          <h2 class="text-xl font-semibold mb-4">
            Upload Newsletter / Document
          </h2>

          <div class="bg-white p-6 rounded-xl shadow max-w-xl">
            <input
              v-model="uploadForm.title"
              class="input mb-3"
              placeholder="Title"
            />

            <select v-model="uploadForm.type" class="input mb-3">
              <option value="newsletter">Newsletter</option>
              <option value="document">Document</option>
            </select>

            <textarea
              v-model="uploadForm.description"
              class="input mb-3"
              placeholder="Description"
            ></textarea>

            <input type="file" @change="uploadFile" class="mb-4" />

            <button @click="createUpload" class="btn-primary">Upload</button>
          </div>

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
    </main>
  </div>
</template>
    
