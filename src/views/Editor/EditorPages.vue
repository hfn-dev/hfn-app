<script setup>
import pagesApi from "@/api/pageManagement";
import { pageSchemas } from "@/schemas/pageSchemas";
import { useRouter } from "vue-router";

import { computed, onMounted, ref, watch } from "vue";
import EditorSidebar from "./EditorSidebar.vue";

const currentView = ref("manager");
const activePage = ref(null);
const activeSection = ref("hero");
const router = useRouter();
const hasPages = computed(() => pages.value && pages.value.length > 0);
const currentSectionData = ref(null);

const pages = ref([]);
const isLoading = ref(false);

const availablePageTypes = computed(() =>
  Object.keys(pageSchemas)
);


const createPage = async (pageType) => {
  try {
    const schema = pageSchemas[pageType];

    if (!schema) {
      console.error(`No schema found for page type: ${pageType}`);
      return;
    }

    const exists = pages.value.some(
      (p) => p.page_type.toLowerCase() === pageType.toLowerCase()
    );

    if (exists) {
      alert(`${pageType} page already exists`);
      return;
    }


    const payload = {
      page_type: pageType,
      status: "draft",
      is_visible: false,
      content: structuredClone(schema),
    };

    const newPage = await pagesApi.createPage(payload);

    const normalizedPage = {
      ...newPage,
      title: newPage.page_type_display ?? pageType,
      slug: `/${pageType}`,
      sections: structuredClone(schema),
    };

    pages.value.push(normalizedPage);
    editPage(normalizedPage);
  } catch (e) {
    console.error("Failed to create page", e);
  }
};

const fetchPages = async () => {
  isLoading.value = true;
  try {
    const rawPages = await pagesApi.listPages();

    pages.value = rawPages.map((page) => {
      const schema = pageSchemas[page.page_type.toLowerCase()];
      const content = structuredClone(schema);

      if (page.content && typeof page.content === 'object' && Object.keys(page.content).length > 0) {
        for (const sectionKey in schema) {
          if (page.content[sectionKey]) {
            content[sectionKey] = { ...schema[sectionKey], ...page.content[sectionKey] };
          }
        }
      }

      return {
        ...page,
        title: page.page_type_display,
        slug: `/${page.page_type}`,
        sections: content,
      };
    });
  } catch (e) {
    console.error("Failed to load pages", e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchPages);

const sectionKeys = computed(() => {
  if (!activePage.value?.sections) return [];
  return Object.keys(activePage.value.sections);
});

const newPageTitle = ref("");

const viewPage = (page) => {
  router.push({
    path: page.slug,
    query: { preview: "true" },
  });
};

const uploadSectionImage = async (event, sectionKey) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const { url } = await pagesApi.uploadImage(file);
    activePage.value.sections[sectionKey].imageUrl = url;
    activePage.value.sections[sectionKey].previewUrl = url;
  } catch (e) {
    console.error("Image upload failed", e);
  }
};

const editPage = (page) => {
  activePage.value = page;
  activeSection.value = "hero";
  currentView.value = "editor";
};

const goBackToManager = () => {
  currentView.value = "manager";
  activePage.value = null;
};

const deletePage = (id) => {
  console.log(`Confirmation bypassed. Deleting page with ID ${id}...`);
  pages.value = pages.value.filter((page) => page.id !== id);
};

const addNewSection = () => {
  console.log("Simulating 'Add New Section' action.");
};

const addNewLogo = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const { url } = await pagesApi.uploadImage(file);

  activePage.value.sections.section1.logos.push({
    id: Date.now(),
    name: "New Logo",
    src: url,
  });
};

const deleteLogo = (logoId) => {
  const section = activePage.value.sections["section1"];
  if (section && section.logos) {
    section.logos = section.logos.filter((logo) => logo.id !== logoId);
    console.log(`Deleted logo with ID: ${logoId}`);
  }
};

const addNewMetric = () => {
  const section = activePage.value.sections["section2"];
  if (section && section.metrics) {
    const newId = Math.max(...section.metrics.map((m) => m.id), 0) + 1;
    section.metrics.push({
      id: newId,
      label: `New Metric ${newId}`,
      color: "text-gray-600",
      text: "New detail text here.",
    });
  }
  console.log("Added new metric placeholder.");
};

const deleteMetric = (metricId) => {
  const section = activePage.value.sections["section2"];
  if (section && section.metrics) {
    section.metrics = section.metrics.filter((m) => m.id !== metricId);
    console.log(`Deleted metric with ID: ${metricId}`);
  }
};

const activeSecondaryContent = ref(null);

const toggleSecondaryContent = (itemId) => {
  activeSecondaryContent.value =
    activeSecondaryContent.value === itemId ? null : itemId;
};

const addNewFaq = () => {
  const section = activePage.value.sections["section5"];
  if (section && section.faqs) {
    const newId = Math.max(...section.faqs.map((f) => f.id), 0) + 1;
    section.faqs.push({
      id: newId,
      question: `Question ${newId}: New FAQ Question here...`,
      response: "New answer text here...",
    });
  }
  console.log("Added new FAQ item.");
};

const deleteFaq = (faqId) => {
  const section = activePage.value.sections["section5"];
  if (section && section.faqs) {
    section.faqs = section.faqs.filter((faq) => faq.id !== faqId);
    console.log(`Deleted FAQ with ID: ${faqId}`);
  }
};



const saveChanges = async () => {
  try {
    const payload = {
      content: {
        [activeSection.value]: currentSectionData.value
      }
    };

    await pagesApi.partialUpdatePage(
      activePage.value.page_type,
      payload
    );

    activePage.value.sections[activeSection.value] =
      structuredClone(currentSectionData.value);

    goBackToManager();
  } catch (e) {
    console.error("Failed to save section", e);
  }
};

const breadcrumbViewName = computed(() => {
  if (currentView.value === "view") return `View: ${activePage.value.title}`;
  if (currentView.value === "editor") return `Edit: ${activePage.value.title}`;
  return "Page Manager";
});

watch(
  [activePage, activeSection],
  () => {
    if (!activePage.value) return;

    const section = activePage.value.sections?.[activeSection.value];

    currentSectionData.value =
      section ??
      structuredClone(
        pageSchemas[activePage.value.page_type]?.[activeSection.value] ?? {}
      );
  },
  { immediate: true }
);

const toggleVisibility = async (page) => {
  page.is_visible = !page.is_visible;
  try {
    await pagesApi.updatePageVisibility(page.id, page.is_visible);
  } catch (e) {
    page.is_visible = !page.is_visible;
  }
};

</script>

<template>
  <div class="flex min-h-screen font-sans">
    <EditorSidebar />
    <div class="flex-grow p-6 bg-white border-0">
      <nav class="mb-6 text-sm text-gray-500">
        <a href="#" class="hover:underline">Home</a>
        <span class="mx-1">></span>
        <button @click="goBackToManager" class="hover:underline text-gray-500">
          Page Manager
        </button>
        <span v-if="currentView !== 'manager'" class="mx-1">></span>
        <span
          v-if="currentView !== 'manager'"
          class="text-green-700 font-medium"
          >{{ breadcrumbViewName }}</span
        >
      </nav>

      <div v-if="currentView === 'manager'">
        <div class="mb-8 p-4 bg-white rounded-lg shadow-md">
          <h1 class="text-3xl font-bold text-gray-800 text-center">
            Page Manager
          </h1>
        </div>
        <div class="flex items-center space-x-3 mb-6">
          <select
            @change="createPage($event.target.value)"
            class="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
          >
            <option value="" disabled selected>
              Select page type
            </option>
            <option
              v-for="type in availablePageTypes"
              :key="type"
              :value="type"
            >
              {{ type.toUpperCase() }}
            </option>
          </select>
        </div>

        <div class="space-y-3">
          <div v-if="isLoading" class="text-center text-gray-500 py-10">
            Loading pages...
          </div>

          <div
            v-else-if="!hasPages"
            class="text-center py-16 bg-gray-50 border border-dashed border-gray-300 rounded-xl"
          >
            <h3 class="text-lg font-semibold text-gray-700 mb-2">
              No pages yet
            </h3>
            <p class="text-sm text-gray-500">
              Pages you create will appear here.
            </p>
          </div>
          <div
            v-else
            v-for="page in pages"
            :key="page.id"
            class="flex items-center justify-between bg-white p-4 rounded-xl shadow-lg border border-gray-100 transform hover:shadow-xl hover:scale-[1.005] transition duration-200"
          >
            <div class="flex items-center space-x-3">
              <span
                class="px-3 py-1 text-xs font-semibold rounded-full min-w-[70px] text-center cursor-pointer"
                :class="
                  page.is_visible
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                "
                @click="toggleVisibility(page)"
                title="Click to toggle visibility"
              >
                {{ page.is_visible ? "VISIBLE" : "HIDDEN" }}
              </span>
              <span class="text-gray-700 font-medium">{{
                page.page_type
              }}</span>
            </div>

            <div class="flex items-center space-x-3">
              <button
                @click="viewPage(page)"
                class="text-blue-500 hover:text-blue-700 transition duration-200 p-2 rounded-full hover:bg-gray-100"
                aria-label="View Page"
                title="View Page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>

              <button
                @click="editPage(page)"
                class="text-green-500 hover:text-green-700 transition duration-200 p-2 rounded-full hover:bg-gray-100"
                aria-label="Edit Page"
                title="Edit Page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5L2 22l1.5-5.5L17 3z"
                  />
                </svg>
              </button>

              <button
                @click="deletePage(page.id)"
                class="text-red-500 hover:text-red-700 transition duration-200 p-2 rounded-full hover:bg-red-50"
                aria-label="Delete Page"
                title="Delete Page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="currentView === 'editor' && activePage">
        <div
          class="mb-8 flex flex-col items-center justify-center text-center space-y-3"
        >
          <h1 class="text-3xl font-bold text-gray-800">
            {{ activePage.title }}
          </h1>
        </div>

        <div
          class="flex justify-center border-b border-gray-200 mb-8 overflow-x-auto"
        >
          <button
            v-for="key in sectionKeys"
            :key="key"
            @click="activeSection = key"
            class="px-4 py-3 text-sm font-medium transition duration-200 whitespace-nowrap"
            :class="{
              'text-green-700 border-b-2 border-green-700 bg-green-50':
                activeSection === key,
              'text-gray-500 hover:text-gray-700 hover:bg-gray-100':
                activeSection !== key,
            }"
          >
            {{
              activePage.sections[key]?.name ||
              key.replace("section", "Section ")
            }}
          </button>
        </div>

        <div class="space-y-6">
          <div
            class="p-4 border border-gray-300 rounded-xl flex items-center justify-center"
          >
            <div class="w-1/4 text-center text-orange-600 font-bold text-xl">
              Preview
            </div>
            <img
              v-if="
                currentSectionData?.previewUrl || currentSectionData?.heroImage
              "
              :src="
                currentSectionData.previewUrl ?? currentSectionData.heroImage
              "
              alt="Section Preview"
            />
          </div>

          <div
            v-if="
              activeSection !== 'section1' &&
              activeSection !== 'section2' &&
              activeSection !== 'section5'
            "
            class="flex items-center p-2 bg-white border border-gray-200 rounded-lg space-x-4"
          >
            <select class="p-1 border border-gray-300 rounded text-sm bg-white">
              <option>Paragraph</option>
              <option>Heading 1</option>
              <option>Heading 2</option>
            </select>
            <input
              type="number"
              value="14"
              class="w-12 text-center p-1 border border-gray-300 rounded text-sm"
            />

            <button
              title="Bold"
              class="p-1 text-gray-700 hover:bg-gray-100 rounded font-bold"
            >
              A
            </button>
            <button
              title="Italic"
              class="p-1 text-gray-700 hover:bg-gray-100 rounded italic"
            >
              I
            </button>
            <button
              title="Underline"
              class="p-1 text-gray-700 hover:bg-gray-100 rounded underline"
            >
              U
            </button>

            <span class="text-gray-300">|</span>

            <button
              title="Left Align"
              class="p-1 text-gray-700 hover:bg-gray-100 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="17" y2="18"></line>
              </svg>
            </button>
            <button
              title="Center Align"
              class="p-1 text-gray-700 hover:bg-gray-100 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="21" y1="12" x2="3" y2="12"></line>
                <line x1="17" y1="6" x2="7" y2="6"></line>
                <line x1="17" y1="18" x2="7" y2="18"></line>
              </svg>
            </button>
            <button
              title="Right Align"
              class="p-1 text-gray-700 hover:bg-gray-100 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="21" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="6" x2="3" y2="6"></line>
                <line x1="21" y1="18" x2="7" y2="18"></line>
              </svg>
            </button>
            <button
              title="Link"
              class="p-1 text-gray-700 hover:bg-gray-100 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                ></path>
                <path
                  d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                ></path>
              </svg>
            </button>
            <button
              title="Image"
              class="p-1 text-gray-700 hover:bg-gray-100 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </button>
            <button
              title="More options"
              class="p-1 text-gray-700 hover:bg-gray-100 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </button>
          </div>

          <div v-if="activePage.page_type.toLowerCase() === 'home' && activeSection === 'hero'">
            <div class="flex space-x-6">
              <div class="w-3/5 space-y-6">
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >Title</label
                  >
                  <input
                    v-model="currentSectionData.titleHighlight"
                    type="text"
                    class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                    placeholder="Enter section title"
                  />
                </div>

                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >Sub Text</label
                  >
                  <textarea
                    v-model="currentSectionData.subText"
                    rows="5"
                    class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                    placeholder="Enter detailed sub text"
                  ></textarea>
                </div>

                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >CTA</label
                  >
                  <input
                    v-model="currentSectionData.ctaText"
                    type="text"
                    class="w-full text-base border-none focus:ring-0 p-0 m-0"
                    placeholder="Enter Call to Action text"
                  />
                </div>
              </div>

              <div class="w-2/5 space-y-6">
                <div
                  class="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white shadow-inner"
                >
                  <div
                    class="bg-red-50 h-40 w-full mb-4 border border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center text-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-8 w-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <span class="text-sm text-gray-600 mt-2">Image Upload</span>
                  </div>
                  <div class="text-xs text-gray-500 space-y-1 w-full">
                    <p class="font-semibold">Image Requirements:</p>
                    <ul class="list-disc list-inside space-y-0">
                      <li>File types: jpeg, jpg, png.</li>
                      <li>File size: not more than 1MB.</li>
                      <li>Dimensions: 1024x1024px.</li>
                    </ul>
                  </div>
                </div>

                <div
                  class="border border-gray-300 rounded-lg p-3 space-y-2 bg-white"
                >
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >Background Colour</label
                  >
                  <div class="flex items-center space-x-2">
                    <input
                      v-model="currentSectionData.backgroundColor"
                      type="color"
                      class="w-8 h-8 rounded border-none p-0 cursor-pointer"
                    />
                    <input
                      v-model="currentSectionData.backgroundColor"
                      type="text"
                      class="flex-grow text-base border-none focus:ring-0 p-0 m-0 font-mono uppercase"
                      placeholder="#FFFFFF"
                    />
                    <button
                      class="text-gray-500 hover:text-green-600"
                      title="Reset Color"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="activePage.page_type.toLowerCase() === 'about' && activeSection === 'hero'">
            <div class="flex space-x-6">
              <div class="w-3/5 space-y-6">
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >Title</label
                  >
                  <input
                    v-model="currentSectionData.title"
                    type="text"
                    class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                    placeholder="Enter section title"
                  />
                </div>

                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >Subtitle</label
                  >
                  <input
                    v-model="currentSectionData.subtitle"
                    type="text"
                    class="w-full text-base border-none focus:ring-0 p-0 m-0"
                    placeholder="Enter subtitle"
                  />
                </div>

                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >Description</label
                  >
                  <textarea
                    v-model="currentSectionData.description"
                    rows="5"
                    class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                    placeholder="Enter description"
                  ></textarea>
                </div>
              </div>

              <div class="w-2/5 space-y-6">
                <div
                  class="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white shadow-inner"
                >
                  <div
                    class="bg-red-50 h-40 w-full mb-4 border border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center text-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-8 w-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <span class="text-sm text-gray-600 mt-2">Image Upload</span>
                  </div>
                  <div class="text-xs text-gray-500 space-y-1 w-full">
                    <p class="font-semibold">Image Requirements:</p>
                    <ul class="list-disc list-inside space-y-0">
                      <li>File types: jpeg, jpg, png.</li>
                      <li>File size: not more than 1MB.</li>
                      <li>Dimensions: 1024x1024px.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="activeSection === 'missionVision'">
            <div class="space-y-6">
              <div class="border border-gray-300 rounded-lg p-4">
                <h3 class="text-lg font-semibold mb-4">Our Mission</h3>
                <div class="space-y-4">
                  <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                    <label class="block text-xs font-semibold uppercase text-gray-500">Title</label>
                    <input
                      v-model="currentSectionData.mission.title"
                      type="text"
                      class="w-full text-base border-none focus:ring-0 p-0 m-0"
                      placeholder="Enter mission title"
                    />
                  </div>
                  <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                    <label class="block text-xs font-semibold uppercase text-gray-500">Text</label>
                    <textarea
                      v-model="currentSectionData.mission.text"
                      rows="4"
                      class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                      placeholder="Enter mission text"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="border border-gray-300 rounded-lg p-4">
                <h3 class="text-lg font-semibold mb-4">Our Vision</h3>
                <div class="space-y-4">
                  <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                    <label class="block text-xs font-semibold uppercase text-gray-500">Title</label>
                    <input
                      v-model="currentSectionData.vision.title"
                      type="text"
                      class="w-full text-base border-none focus:ring-0 p-0 m-0"
                      placeholder="Enter vision title"
                    />
                  </div>
                  <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                    <label class="block text-xs font-semibold uppercase text-gray-500">Text</label>
                    <textarea
                      v-model="currentSectionData.vision.text"
                      rows="4"
                      class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                      placeholder="Enter vision text"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="activeSection === 'section1'">
            <div class="flex flex-col space-y-6">
              <div
                class="w-full border border-gray-300 rounded-lg p-3 space-y-2"
              >
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                  >Title</label
                >
                <input
                  v-model="currentSectionData.title"
                  type="text"
                  class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                  placeholder="Health Guardians"
                />
              </div>

              <div
                class="w-full border border-gray-300 rounded-lg p-6 bg-white shadow-inner space-y-4"
              >
                <div class="flex justify-end">
                  <button
                    @click="addNewLogo"
                    class="text-green-600 hover:text-green-700 transition duration-200 flex items-center space-x-1 text-sm font-semibold"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Add new</span>
                  </button>
                </div>

                <div
                  class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4"
                >
                  <div
                    v-for="logo in currentSectionData.logos"
                    :key="logo.id"
                    class="relative group"
                  >
                    <img
                      :src="logo.src"
                      :alt="logo.name"
                      class="w-full h-auto border border-gray-200 rounded-lg p-2 object-contain bg-white shadow-sm"
                    />
                    <button
                      @click="deleteLogo(logo.id)"
                      class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 h-5 w-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition duration-200 shadow-md"
                      title="Delete Logo"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                    <input
                      v-model="logo.name"
                      type="text"
                      placeholder="Logo Name"
                      class="mt-1 w-full text-center text-xs p-1 border border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div
                  class="text-xs text-gray-500 space-y-1 w-full pt-4 border-t border-gray-100"
                >
                  <p class="font-semibold">Image Requirements:</p>
                  <ul class="list-disc list-inside space-y-0">
                    <li>File types: png, jpg, svg.</li>
                    <li>
                      File size: not more than 50KB (recommended for logos).
                    </li>
                    <li>Dimensions: 200x100px (recommended ratio).</li>
                  </ul>
                </div>
              </div>

              <div
                class="w-full border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white shadow-inner"
              >
                <div
                  class="bg-red-50 h-40 w-full mb-4 border border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  <span class="text-sm text-gray-600 mt-2">Image Upload</span>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="activeSection === 'section2'">
            <div class="flex space-x-6">
              <div class="w-1/2 space-y-6">
                <div
                  class="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center shadow-inner"
                >
                  <div
                    class="bg-red-50 h-48 w-full mb-4 border border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center text-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-8 w-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <span class="text-sm text-gray-600 mt-2">Image Upload</span>
                  </div>
                  <div class="text-xs text-gray-500 space-y-1 w-full">
                    <p class="font-semibold">Image Requirements:</p>
                    <ul class="list-disc list-inside space-y-0">
                      <li>File types: jpeg, jpg, png.</li>
                      <li>File size: not more than 1MB.</li>
                      <li>Dimensions: 1024x1024px.</li>
                    </ul>
                  </div>
                </div>

                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >Alt Text</label
                  >
                  <input
                    v-model="currentSectionData.altText"
                    type="text"
                    class="w-full text-base border-none focus:ring-0 p-0 m-0"
                    placeholder="Sample Text for accessibility"
                  />
                </div>
              </div>

              <div class="w-1/2 space-y-6">
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >Title</label
                  >
                  <input
                    v-model="currentSectionData.title"
                    type="text"
                    class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                    placeholder="Our HFN Story"
                  />
                </div>

                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >Sub Text</label
                  >
                  <textarea
                    v-model="currentSectionData.subText"
                    rows="5"
                    class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                    placeholder="The Healthcare Federation of Nigeria (HFN) is..."
                  ></textarea>
                </div>

                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >CTA</label
                  >
                  <input
                    v-model="currentSectionData.cta"
                    type="text"
                    class="w-full text-base border-none focus:ring-0 p-0 m-0"
                    placeholder="Join the Coalition"
                  />
                </div>

                <div
                  class="border border-gray-300 rounded-lg p-4 space-y-3 bg-white"
                >
                  <div class="flex justify-between items-center">
                    <h3 class="text-sm font-semibold text-gray-700 uppercase">
                      Key Metrics/Goals
                    </h3>
                    <button
                      @click="addNewMetric"
                      class="text-green-600 hover:text-green-700 transition duration-200 flex items-center space-x-1 text-sm font-semibold"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      <span>Add Goal</span>
                    </button>
                  </div>

                  <div
                    v-for="metric in currentSectionData.metrics"
                    :key="metric.id"
                    class="p-2 border border-gray-200 rounded-lg bg-gray-50 relative group"
                  >
                    <div class="flex items-start space-x-2">
                      <div class="w-1/4">
                        <input
                          v-model="metric.label"
                          type="text"
                          placeholder="Label"
                          class="w-full text-xs font-bold p-1 border border-gray-300 rounded"
                        />
                      </div>
                      <div class="w-3/4">
                        <input
                          v-model="metric.text"
                          type="text"
                          placeholder="Detail Text"
                          class="w-full text-sm p-1 border border-gray-300 rounded"
                        />
                      </div>

                      <button
                        @click="deleteMetric(metric.id)"
                        class="absolute top-1 right-1 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition duration-200"
                        title="Delete Goal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="activeSection === 'section3'">
            <div class="p-4 border border-gray-300 rounded-xl space-y-6">
              <h3 class="text-xl font-semibold text-gray-700">News Content</h3>
              <div class="flex space-x-6">
                <div class="w-1/3 space-y-3">
                  <div
                    class="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white shadow-inner"
                  >
                    <div
                      class="bg-red-50 h-32 w-full mb-4 border border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center text-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                      <span class="text-sm text-gray-600 mt-1"
                        >Image Upload</span
                      >
                    </div>
                    <div class="text-xs text-gray-500 w-full">
                      <p class="font-semibold">Image Requirements:</p>
                      <ul class="list-disc list-inside space-y-0">
                        <li>File types: png, jpg, jpeg.</li>
                        <li>File size: not more than 50kb.</li>
                        <li>Dimensions: 1024x1024px.</li>
                      </ul>
                    </div>
                  </div>

                  <div
                    class="border border-gray-300 rounded-lg p-3 space-y-2 bg-white"
                  >
                    <label
                      class="block text-xs font-semibold uppercase text-gray-500"
                      >Content Type</label
                    >
                    <select
                      v-model="currentSectionData.primaryNews.contentType"
                      class="w-full text-base border-none focus:ring-0 p-0 m-0"
                    >
                      <option>Programs & Initiatives</option>
                      <option>Policy & Advocacy</option>
                      <option>Member Success Stories</option>
                      <option>Industry News</option>
                    </select>
                  </div>
                </div>

                <div class="w-2/3 space-y-3">
                  <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                    <label
                      class="block text-xs font-semibold uppercase text-gray-500"
                      >Title</label
                    >
                    <input
                      v-model="currentSectionData.primaryNews.title"
                      type="text"
                      class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                      placeholder="HFN News"
                    />
                  </div>

                  <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                    <label
                      class="block text-xs font-semibold uppercase text-gray-500"
                      >Sub Text</label
                    >
                    <textarea
                      v-model="currentSectionData.primaryNews.subText"
                      rows="4"
                      class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                      placeholder="Enter article summary or main text..."
                    ></textarea>
                  </div>

                  <div class="flex space-x-3">
                    <div
                      class="w-1/2 border border-gray-300 rounded-lg p-3 space-y-2 bg-white"
                    >
                      <label
                        class="block text-xs font-semibold uppercase text-gray-500"
                        >Metadate</label
                      >
                      <select
                        v-model="currentSectionData.primaryNews.metadate"
                        class="w-full text-base border-none focus:ring-0 p-0 m-0"
                      >
                        <option>Comments</option>
                        <option>Views</option>
                        <option>Author</option>
                      </select>
                    </div>
                    <div
                      class="w-1/2 border border-gray-300 rounded-lg p-3 space-y-2 bg-white"
                    >
                      <label
                        class="block text-xs font-semibold uppercase text-gray-500"
                        >Date</label
                      >
                      <input
                        v-model="currentSectionData.primaryNews.date"
                        type="date"
                        class="w-full text-base border-none focus:ring-0 p-0 m-0"
                      />
                    </div>
                  </div>

                  <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                    <label
                      class="block text-xs font-semibold uppercase text-gray-500"
                      >CTA</label
                    >
                    <input
                      v-model="currentSectionData.primaryNews.cta"
                      type="text"
                      class="w-full text-base border-none focus:ring-0 p-0 m-0"
                      placeholder="Read More"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <h3 class="text-xl font-semibold text-gray-700 pt-4">
                Secondary News Content
              </h3>

              <div
                v-for="item in currentSectionData.secondaryNews"
                :key="item.id"
                class="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm"
              >
                <button
                  @click="toggleSecondaryContent(item.id)"
                  class="w-full flex justify-between items-center p-4 text-left font-medium text-gray-700 hover:bg-gray-50 transition duration-150"
                  :aria-expanded="activeSecondaryContent === item.id"
                >
                  <span>{{ item.title }}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 transition-transform duration-200"
                    :class="{
                      'rotate-180': activeSecondaryContent === item.id,
                    }"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>

                <div
                  v-show="activeSecondaryContent === item.id"
                  class="p-4 border-t border-gray-200 bg-gray-50"
                >
                  <div class="space-y-3">
                    <div
                      class="border border-gray-300 rounded-lg p-3 space-y-1"
                    >
                      <label
                        class="block text-xs font-semibold uppercase text-gray-500"
                        >Title</label
                      >
                      <input
                        v-model="item.title"
                        type="text"
                        class="w-full text-base border-none focus:ring-0 p-0 m-0"
                      />
                    </div>

                    <div
                      class="border border-gray-300 rounded-lg p-3 space-y-1"
                    >
                      <label
                        class="block text-xs font-semibold uppercase text-gray-500"
                        >Content Summary</label
                      >
                      <textarea
                        v-model="item.content"
                        rows="2"
                        class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                      ></textarea>
                    </div>

                    <div class="flex justify-end space-x-2 pt-2">
                      <button class="text-sm text-red-500 hover:text-red-700">
                        Delete
                      </button>
                      <button class="text-sm text-blue-500 hover:text-blue-700">
                        Reorder
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-center pt-2">
                <button
                  class="text-green-600 hover:text-green-700 transition duration-200 flex items-center space-x-1 text-sm font-semibold p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <span>Add New Secondary Item</span>
                </button>
              </div>
            </div>
          </div>

          <div v-else-if="activeSection === 'section4'">
            <div class="flex space-x-6">
              <div class="w-1/2 space-y-6">
                <div
                  class="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white shadow-inner"
                >
                  <div
                    class="bg-red-50 h-48 w-full mb-4 border border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center text-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-8 w-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <span class="text-sm text-gray-600 mt-2">Image Upload</span>
                  </div>
                  <div class="text-xs text-gray-500 space-y-1 w-full">
                    <p class="font-semibold">Image Requirements:</p>
                    <ul class="list-disc list-inside space-y-0">
                      <li>File types: png, jpg, jpeg.</li>
                      <li>File size: not more than 1MB.</li>
                      <li>Dimensions: 1024x1024px.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="w-1/2 space-y-6">
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >Title</label
                  >
                  <input
                    v-model="currentSectionData.teamMember.title"
                    type="text"
                    class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                    placeholder="HFN Executives"
                  />
                </div>

                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >Name</label
                  >
                  <input
                    v-model="currentSectionData.teamMember.name"
                    type="text"
                    class="w-full text-base border-none focus:ring-0 p-0 m-0"
                    placeholder="Mrs. Njide Ndili"
                  />
                </div>

                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >Position</label
                  >
                  <input
                    v-model="currentSectionData.teamMember.position"
                    type="text"
                    class="w-full text-base border-none focus:ring-0 p-0 m-0"
                    placeholder="President"
                  />
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="activeSection === 'section5'">
            <div class="space-y-6">
              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                  >Title</label
                >
                <input
                  v-model="currentSectionData.title"
                  type="text"
                  class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                  placeholder="Frequently Asked Questions (FAQ)"
                />
              </div>

              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                  >Intro Text</label
                >
                <textarea
                  v-model="currentSectionData.introText"
                  rows="2"
                  class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                  placeholder="Brief introductory text for the FAQ section."
                ></textarea>
              </div>

              <h3
                class="text-xl font-semibold text-gray-700 pt-2 border-t border-gray-200"
              >
                Questions & Answers
              </h3>

              <div
                v-for="(faq, index) in currentSectionData.faqs"
                :key="faq.id"
                class="border border-gray-300 rounded-lg p-4 bg-white shadow-sm relative group"
              >
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-bold text-gray-600"
                    >Q & A Item {{ index + 1 }}</span
                  >
                  <button
                    @click="deleteFaq(faq.id)"
                    class="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition duration-200 p-1 rounded-full"
                    title="Delete FAQ Item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                <div class="space-y-3">
                  <div class="border border-gray-300 rounded-lg p-3 space-y-1">
                    <label
                      class="block text-xs font-semibold uppercase text-gray-500"
                      >Question</label
                    >
                    <input
                      v-model="faq.question"
                      type="text"
                      class="w-full text-base border-none focus:ring-0 p-0 m-0"
                      :placeholder="`Question ${index + 1}`"
                      maxlength="120"
                    />
                    <div class="text-right text-xs text-gray-400">
                      {{ 120 - faq.question.length }} / 120
                    </div>
                  </div>

                  <div class="border border-gray-300 rounded-lg p-3 space-y-1">
                    <label
                      class="block text-xs font-semibold uppercase text-gray-500"
                      >Response</label
                    >
                    <textarea
                      v-model="faq.response"
                      rows="3"
                      class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                      :placeholder="`Response for Question ${index + 1}`"
                      maxlength="500"
                    ></textarea>
                    <div class="text-right text-xs text-gray-400">
                      {{ 500 - faq.response.length }} / 500
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-end pt-2">
                <button
                  @click="addNewFaq"
                  class="text-green-600 hover:text-green-700 transition duration-200 flex items-center space-x-1 text-sm font-semibold p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <span>Add item</span>
                </button>
              </div>
            </div>
          </div>

          <div v-else class="text-gray-600 p-6 bg-gray-100 border rounded-lg">
            <h3 class="text-xl font-medium mb-3">Section Content</h3>
            <p>
              Content for
              <strong>{{ currentSectionData.name || activeSection }}</strong>
              goes here. Use the title field below to update the content.
            </p>
            <div
              class="w-full border border-gray-300 rounded-lg p-3 space-y-2 mt-4"
            >
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Title (Fallback)</label
              >
              <input
                v-model="currentSectionData.title"
                type="text"
                class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                placeholder="Enter section title"
              />
            </div>
          </div>

          <div
            class="mt-10 flex justify-end space-x-4 border-t pt-4 border-gray-200"
          >
            <button
              @click="goBackToManager"
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-100 transition duration-200"
            >
              Cancel
            </button>
            <button
              @click="saveChanges"
              class="px-6 py-3 bg-green-800 text-white rounded-2xl hover:bg-green-900 transition duration-200 shadow-lg shadow-green-200"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type="color"]::-webkit-color-swatch {
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
