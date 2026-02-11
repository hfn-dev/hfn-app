<script setup>
import uploadsApi from "@/api/contentUploadsApi";
import eventsApi from "@/api/events.js";
import newsApi from "@/api/newsModule";
import { useAuth } from "@/store/authStore";
import AdminSidebar from "@/views/Admin/AdminSidebar.vue";
import { computed, onMounted, ref } from "vue";

const events = ref([]);
const loadingEvents = ref(false);
const articles = ref([]);
const editingSlug = ref(null);
const isEditing = computed(() => !!editingSlug.value);
const publishingSlug = ref(null);
const showConfirm = ref(false);
const confirmTitle = ref("");
const confirmMessage = ref("");
const confirmAction = ref(null);
const confirmLoading = ref(false);
const deletingEventSlug = ref(null);

const isFile = (file) => {
  return (
    typeof window !== "undefined" &&
    typeof File !== "undefined" &&
    file instanceof File
  );
};

const previewUrl = (file) => {
  if (!isFile(file)) return null;
  return URL.createObjectURL(file);
};

const uploadBanner = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "your_preset");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dawrem2mi/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  eventForm.value.banner = data.secure_url;
};

const loading = ref(false);

const editArticle = (article) => {
  editingSlug.value = article.slug;

  newsForm.value = {
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    featured_image: article.featured_image,
    status: article.status,
    audience: article.audience,
    is_featured: article.is_featured ?? false,
    featured_order: article.featured_order ?? 0,
    videos: article.videos ? [...article.videos] : [],
  };

  window.scrollTo({ top: 0, behavior: "smooth" });
};

const auth = useAuth();

const visibleArticles = computed(() => {
  return articles.value.filter((article) => {
    if (article.audience === "all") return true;
    return auth.isAuthenticated;
  });
});

const deletingSlug = ref(null);

const deleteArticle = (slug) => {
  confirmTitle.value = "Delete Article";
  confirmMessage.value =
    "Are you sure you want to permanently delete this article? This action cannot be undone.";
  showConfirm.value = true;

  confirmAction.value = async () => {
    try {
      confirmLoading.value = true;
      deletingSlug.value = slug;

      await newsApi.deleteArticle(slug);
      articles.value = articles.value.filter((a) => a.slug !== slug);
    } catch (e) {
      console.error(e);
      console.log("Failed to delete article");
    } finally {
      deletingSlug.value = null;
      confirmLoading.value = false;
      showConfirm.value = false;
    }
  };
};

const fetchArticles = async () => {
  articles.value = await newsApi.listArticles();
};

onMounted(async () => {
  await fetchArticles();
});

const resetNewsForm = () => {
  editingSlug.value = null;
  newsForm.value = {
    title: "",
    excerpt: "",
    content: "",
    featured_image: "",
    status: "draft",
    audience: "all",
    is_featured: false,
    featured_order: 0,
    videos: [],
  };
};

const publishArticle = async (slug) => {
  const confirmed = confirm("Publish this article?");
  if (!confirmed) return;

  try {
    publishingSlug.value = slug;
    await newsApi.publishArticle(slug);
    await fetchArticles();
  } catch (e) {
    console.error(e);
    console.log("Failed to publish article");
  } finally {
    publishingSlug.value = null;
  }
};

const saveNews = async () => {
  try {
    const formData = new FormData();

    Object.entries(newsForm.value).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(`${key}[]`, v));
      } else {
        formData.append(key, value);
      }
    });

    if (isEditing.value) {
      await newsApi.partialUpdateArticle(editingSlug.value, formData);
    } else {
      await newsApi.createArticle(formData);
    }

    await fetchArticles();
    resetNewsForm();
  } catch (e) {
    console.error(e);
    console.log("Failed to save article");
  }
};

const uploadNewsImage = (e) => {
  newsForm.value.featured_image = e.target.files[0];
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
  audience: "all",
  is_featured: false,
  featured_order: 0,
  videos: [],
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
  banner: "",
});

const fetchEvents = async () => {
  loadingEvents.value = true;
  events.value = await eventsApi.listEvents();
  loadingEvents.value = false;
};

const deleteEvent = (event) => {
  confirmTitle.value = "Delete Event";
  confirmMessage.value =
    "Are you sure you want to permanently delete this event? This action cannot be undone.";
  showConfirm.value = true;

  confirmAction.value = async () => {
    try {
      confirmLoading.value = true;
      deletingEventSlug.value = event.slug;

      await eventsApi.deleteEvent(event.slug);
      events.value = events.value.filter((e) => e.slug !== event.slug);
    } catch (e) {
      console.error("Failed to delete event", e);
    } finally {
      deletingEventSlug.value = null;
      confirmLoading.value = false;
      showConfirm.value = false;
    }
  };
};

const createEvent = async () => {
  const payload = {
    ...eventForm.value,
    banner: eventForm.value.banner,
    price: eventForm.value.is_free ? undefined : Number(eventForm.value.price),
  };
  if (eventForm.value.is_free) {
    delete payload.price;
  }

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
    banner: "",
  });
};

const uploads = ref([]);

const uploadForm = ref({
  title: "",
  type: "newsletter",
  description: "",
  files: [],
  bannerIndex: 0,
});

const fetchUploads = async () => {
  try {
    const [newsletters, minutes, documents, galleries] = await Promise.all([
      uploadsApi.listNewsletters(),
      uploadsApi.getMinutes(),
      uploadsApi.list(),
      uploadsApi.gallery(),
    ]);

    const normalizedNewsletters = newsletters.map((n) => ({
      id: n.id,
      title: n.title,
      type: "newsletter",
      file: n.file,
      created_at: n.created_at,
    }));

    const normalizedMinutes = minutes.map((m) => ({
      id: m.id,
      title: m.title,
      type: "minute",
      file: m.file,
      created_at: m.created_at,
    }));

    const normalizedDocuments = documents.map((d) => ({
      id: d.id,
      title: d.title,
      type: "document",
      file: d.file,
      created_at: d.created_at,
    }));

    const normalizedGalleries = galleries.map((g) => ({
      id: g.id,
      title: g.title,
      type: "gallery",
      file: g.image,
      created_at: g.created_at,
    }));

    uploads.value = [
      ...normalizedNewsletters,
      ...normalizedMinutes,
      ...normalizedDocuments,
      ...normalizedGalleries,
    ];
  } catch (error) {
    console.error("Failed to fetch uploads:", error);
  }
};

const uploadFile = (e) => {
  const selectedFiles = Array.from(e.target.files);
  if (uploadForm.value.type === "gallery") {
    uploadForm.value.files.push(...selectedFiles);
  } else {
    uploadForm.value.files = selectedFiles.slice(0, 1);
  }
};

const createUpload = async () => {
  if (!uploadForm.value.title || !uploadForm.value.files.length) return;

  try {
    const formData = new FormData();
    formData.append("title", uploadForm.value.title);
    formData.append("description", uploadForm.value.description);
    formData.append("type", uploadForm.value.type);

    if (uploadForm.value.type === "gallery") {
      uploadForm.value.files.forEach((file, i) => {
        formData.append("image", file);
      });
      formData.append("banner_index", uploadForm.value.bannerIndex);
    } else {
      formData.append("file", uploadForm.value.files[0]);
    }

    let res;
    switch (uploadForm.value.type) {
      case "gallery":
        res = await uploadsApi.createGallery(formData);
        break;
      case "newsletter":
        res = await uploadsApi.createNewsletters(formData);
        break;
      case "minute":
        res = await uploadsApi.createMinutes(formData);
        break;
      case "document":
        res = await uploadsApi.create(formData);
        break;

      default:
        res = await uploadsApi.create(formData);
    }

    await fetchUploads();

    uploadForm.value = {
      title: "",
      type: "newsletter",
      description: "",
      image: "",
      bannerIndex: 0,
    };
  } catch (error) {
    console.error("Upload failed:", error);
  }
};

onMounted(() => {
  fetchEvents();
  fetchUploads();
});
</script>


<template>
  <div class="flex min-h-screen font-sans">
    <AdminSidebar />

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
            <label class="block mb-2 font-medium text-gray-700"
              >Event Banner</label
            >
            <input
              type="file"
              @change="uploadBanner"
              class="border border-gray-300 rounded-md px-3 py-2 w-full"
            />

            <div v-if="eventForm.banner" class="mt-3">
              <img
                :src="eventForm.banner"
                alt="Event Banner"
                class="h-40 w-full object-cover rounded-md shadow-md"
              />
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
                  <th class="text-right pr-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="event in events"
                  :key="event.id"
                  class="border-t hover:bg-gray-50"
                >
                  <td class="p-3 font-medium">{{ event.title }}</td>
                  <td>{{ event.status }}</td>
                  <td>{{ event.event_type }}</td>
                  <td>
                    {{ new Date(event.start_datetime).toLocaleDateString() }}
                  </td>

                  <td class="text-right pr-3 space-x-2">
                    <button
                      @click="deleteEvent(event)"
                      class="text-red-600 hover:underline text-xs"
                      :disabled="deletingEventSlug === event.slug"
                    >
                      {{
                        deletingEventSlug === event.slug
                          ? "Deleting…"
                          : "Delete"
                      }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="mt-16">
          <h2 class="text-xl font-semibold mb-4">
            {{ isEditing ? "Edit News Article" : "Create News Article" }}
          </h2>

          <div class="bg-white p-6 rounded-xl shadow space-y-4 max-w-3xl">
            <input v-model="newsForm.title" class="input" placeholder="Title" />
            <input
              v-model="newsForm.excerpt"
              class="input"
              placeholder="Excerpt"
            />

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
                  <button @click="removeVideo(i)" class="text-red-600">
                    ✕
                  </button>
                </li>
              </ul>
            </div>

            <div class="flex gap-4">
              <select v-model="newsForm.status" class="input">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>

              <select v-model="newsForm.audience" class="input">
                <option value="all">All</option>
                <option value="members">Members only</option>
              </select>
            </div>

            <button @click="saveNews" class="btn-primary">
              {{ isEditing ? "Update Article" : "Save as Draft" }}
            </button>

            <button
              v-if="isEditing"
              @click="resetNewsForm"
              class="btn-secondary ml-2"
            >
              Cancel
            </button>
          </div>
        </section>
        <section class="mt-12">
          <h3 class="text-lg font-semibold mb-4">Existing Articles</h3>

          <div class="bg-white rounded-xl shadow overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-gray-100 text-left">
                <tr>
                  <th class="p-3">Title</th>
                  <th>Status</th>
                  <th>Audience</th>
                  <th>Date</th>
                  <th class="text-right p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="article in articles"
                  :key="article.id"
                  class="border-t hover:bg-gray-50"
                >
                  <td class="p-3 font-medium">
                    {{ article.title }}
                  </td>

                  <td>
                    <span
                      class="px-2 py-1 rounded text-xs font-medium"
                      :class="
                        article.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-200 text-gray-600'
                      "
                    >
                      {{ article.status }}
                    </span>
                  </td>

                  <td>
                    <span
                      class="px-2 py-1 rounded text-xs font-medium"
                      :class="
                        article.audience === 'all'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-orange-100 text-orange-700'
                      "
                    >
                      {{ article.audience }}
                    </span>
                  </td>

                  <td>
                    {{ new Date(article.publish_date).toLocaleDateString() }}
                  </td>

                  <td class="p-3 text-right space-x-2">
                    <button
                      @click="editArticle(article)"
                      class="text-blue-600 hover:underline text-xs"
                    >
                      Edit
                    </button>

                    <button
                      v-if="article.status === 'draft'"
                      @click="publishArticle(article.slug)"
                      class="text-green-600 hover:underline text-xs"
                      :disabled="publishingSlug === article.slug"
                    >
                      {{
                        publishingSlug === article.slug
                          ? "Publishing…"
                          : "Publish"
                      }}
                    </button>

                    <RouterLink
                      :to="`/blog/${article.slug}`"
                      class="text-gray-600 hover:underline text-xs"
                      target="_blank"
                    >
                      View
                    </RouterLink>

                    <button
                      @click="deleteArticle(article.slug)"
                      class="text-red-600 hover:underline text-xs"
                      :disabled="deletingSlug === article.slug"
                    >
                      {{
                        deletingSlug === article.slug ? "Deleting…" : "Delete"
                      }}
                    </button>
                  </td>
                </tr>

                <tr v-if="!articles.length">
                  <td colspan="5" class="p-6 text-center text-gray-500">
                    No articles created yet
                  </td>
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
              <option value="gallery">Gallery</option>
              <option value="minute">Minute</option>
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

            <table class="w-full text-sm bg-white rounded-xl overflow-hidden">
              <thead class="bg-gray-100 text-left">
                <tr>
                  <th class="p-3">Title</th>
                  <th>Type</th>
                  <th class="p-3">Preview / File</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in uploads"
                  :key="item.id"
                  class="border-t hover:bg-gray-50"
                >
                  <td class="p-3 font-medium">{{ item.title }}</td>
                  <td>
                    <span
                      class="px-2 py-1 rounded text-xs font-medium"
                      :class="{
                        'bg-blue-100 text-blue-700': item.type === 'newsletter',
                        'bg-green-100 text-green-700': item.type === 'minute',
                        'bg-gray-200 text-gray-700': item.type === 'document',
                        'bg-purple-100 text-purple-700':
                          item.type === 'gallery',
                      }"
                    >
                      {{ item.type }}
                    </span>
                  </td>
                  <td class="p-3">
                    <a
                      v-if="item.file"
                      :href="item.file"
                      target="_blank"
                      class="text-primary"
                    >
                      <img
                        v-if="item.type === 'gallery'"
                        :src="item.file"
                        class="h-16 w-16 object-cover rounded"
                      />
                      <span v-else>View</span>
                    </a>
                    <span v-else class="text-gray-400">No file</span>
                  </td>
                </tr>
                <tr v-if="!uploads.length">
                  <td colspan="3" class="p-6 text-center text-gray-500">
                    No uploads yet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <div
          v-if="uploadForm.type === 'gallery' && uploadForm.files.length"
          class="mb-4"
        >
          <p class="font-medium mb-1">Gallery Images (choose banner)</p>
          <div class="flex gap-3 overflow-x-auto">
            <div
              v-for="(file, index) in uploadForm.files"
              :key="index"
              class="relative"
            >
              <img
                v-if="previewUrl(file)"
                :src="previewUrl(file)"
                class="h-24 w-24 object-cover rounded cursor-pointer border-2"
                :class="{
                  'border-green-500': uploadForm.bannerIndex === index,
                  'border-gray-300': uploadForm.bannerIndex !== index,
                }"
                @click="uploadForm.bannerIndex = index"
              />
              <button
                class="absolute top-0 right-0 text-red-600 font-bold"
                @click.prevent="uploadForm.files.splice(index, 1)"
              >
                ✕
              </button>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-1">
            Click an image to mark as banner/thumbnail
          </p>
        </div>
      </div>
    </main>
  </div>
  <div
    v-if="showConfirm"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
      <h3 class="text-lg font-semibold mb-2">
        {{ confirmTitle }}
      </h3>

      <p class="text-sm text-gray-600 mb-6">
        {{ confirmMessage }}
      </p>

      <div class="flex justify-end gap-3">
        <button
          @click="showConfirm = false"
          class="btn-secondary"
          :disabled="confirmLoading"
        >
          Cancel
        </button>

        <button
          @click="confirmAction"
          class="btn-danger"
          :disabled="confirmLoading"
        >
          {{ confirmLoading ? "Please wait…" : "Confirm" }}
        </button>
      </div>
    </div>
  </div>
</template>
    
