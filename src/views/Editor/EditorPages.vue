<script setup>
import pagesApi from "@/api/pageManagement";
import { pageSchemas } from "@/schemas/pageSchemas";
import { useRouter } from "vue-router";
import HomeHeroEditor from './components/cms/home/HomeHeroEditor.vue'
import { computed, onMounted, ref, watch } from "vue";
import EditorSidebar from "./EditorSidebar.vue";
import HomeFaqsEditor from '@/components/cms/home/HomeFaqsEditor.vue'

const newYear = ref("");
const newCategory = ref("");
const newGalleryYear = ref("");
const newGalleryCategory = ref("");
const currentView = ref("manager");
const activePage = ref(null);
const activeSection = ref("hero");
const router = useRouter();
const hasPages = computed(() => pages.value && pages.value.length > 0);
const currentSectionData = ref(null);

const componentMap = {
  home: {
    hero: HomeHeroEditor,
    faqs: HomeFaqsEditor
  }
}  
  
const availablePageTypes = computed(() => Object.keys(pageSchemas));

const addGalleryYear = () => {
  if (!newGalleryYear.value.trim()) return;
  currentSectionData.value.filtering.years.push(newGalleryYear.value.trim());
  newGalleryYear.value = "";
};

const removeGalleryYear = (index) => {
  currentSectionData.value.filtering.years.splice(index, 1);
};

const addGalleryCategory = () => {
  if (!newGalleryCategory.value.trim()) return;
  currentSectionData.value.filtering.categories.push(
    newGalleryCategory.value.trim()
  );
  newGalleryCategory.value = "";
};

const removeGalleryCategory = (index) => {
  currentSectionData.value.filtering.categories.splice(index, 1);
};

const addGalleryItem = () => {
  currentSectionData.value.galleryList.items.push({
    id: Date.now(),
    title: "",
    category: "",
    date: "",
    image: "",
    year: "",
  });
};

const removeGalleryItem = (index) => {
  currentSectionData.value.galleryList.items.splice(index, 1);
};

const addTrustee = () => {
  currentSectionData.value.trustees.push({
    name: "",
    title: "",
    image: "",
    slug: "",
  });
};

const removeTrustee = (index) => {
  currentSectionData.value.trustees.splice(index, 1);
};

const addYear = () => {
  if (!newYear.value.trim()) return;

  currentSectionData.value.searchAndFilter.years.push(newYear.value.trim());
  newYear.value = "";
};
const removeYear = (index) => {
  currentSectionData.value.searchAndFilter.years.splice(index, 1);
};
const addCategory = () => {
  if (!newCategory.value.trim()) return;

  currentSectionData.value.searchAndFilter.categories.push(
    newCategory.value.trim()
  );
  newCategory.value = "";
};
const removeCategory = (index) => {
  currentSectionData.value.searchAndFilter.categories.splice(index, 1);
};

const addLatestEvent = () => {
  currentSectionData.value.latestEvents.items.push({
    id: Date.now(),
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    frequency: "",
    description: "",
    image: "",
    registerLink: "",
  });
};

const removeLatestEvent = (index) => {
  currentSectionData.value.latestEvents.items.splice(index, 1);
};

const addPastEvent = () => {
  currentSectionData.value.pastEvents.items.push({
    title: "",
    category: "",
    date: "",
    theme: "",
    image: "",
  });
};

const removePastEvent = (index) => {
  currentSectionData.value.pastEvents.items.splice(index, 1);
};

const addExecutives = () => {
  currentSectionData.value.members.push({
    name: "",
    role: "",
    slug: "",
    image: "",
    profile: "",
    socials: [],
  });
};

const removeExecutives = (index) => {
  currentSectionData.value.members.splice(index, 1);
};

const addSocial = (memberIndex) => {
  currentSectionData.value.members[memberIndex].socials.push({
    platform: "",
    url: "",
  });
};

const removeSocial = (memberIndex, socialIndex) => {
  currentSectionData.value.members[memberIndex].socials.splice(socialIndex, 1);
};

const pages = ref([]);
const isLoading = ref(false);

const addItem = () => {
  if (activeSection.value === "donations") {
    currentSectionData.value.paragraphs.push("");
  }

  if (activeSection.value === "partnerships") {
    currentSectionData.value.items.push({
      title: "",
      description: "",
      buttonText: "",
    });
  }

  if (activeSection.value === "opportunities") {
    currentSectionData.value.items.push({
      title: "",
      description: "",
      buttonText: "",
    });
  }

  if (activeSection.value === "donationModal") {
    currentSectionData.value.options.push({
      title: "",
      description: "",
    });
  }
  if (activeSection.value === "newsletterSection") {
    currentSectionData.value.items.push({
      date: "",
      text: "",
      pdfUrl: "",
    });
  }

  if (activeSection.value === "publicationsSection") {
    currentSectionData.value.items.push({
      title: "",
      description: "",
      pdfUrl: "",
    });
  }
};

const deleteItem = (index) => {
  if (activeSection.value === "donations") {
    currentSectionData.value.paragraphs.splice(index, 1);
  } else if (activeSection.value === "donationModal") {
    currentSectionData.value.options.splice(index, 1);
  } else {
    currentSectionData.value.items.splice(index, 1);
  }
};

const addStoryStat = () => {
  currentSectionData.value.stats.push({ label: "", value: "" });
};

const removeStoryStat = (index) => {
  currentSectionData.value.stats.splice(index, 1);
};

const createPage = async (pageName) => {
  try {
    const pageType = pageName.toLowerCase().trim().replace(/\s+/g, "-");
    const schema = structuredClone(pageSchemas[pageType]);

    const exists = pages.value.some((p) => p.page_type === pageType);
    if (exists) {
      console.log(`${pageName} page already exists`);
      return;
    }

    const payload = {
      page_type: pageType,
      name: pageName,
      status: "draft",
      is_visible: false,
      content: schema,
    };

    const newPage = await pagesApi.createPage(payload);

    pages.value.push({
      ...newPage,
      title: newPage.name,
      slug: `/${pageType}`,
      sections: schema,
    });
    await fetchPages();
    editPage(newPage);
  } catch (e) {
    console.error("Failed to create page", e);
  }
};

const fetchPages = async () => {
  isLoading.value = true;
  try {
    const rawPages = await pagesApi.listPages();
    pages.value = rawPages.map((page) => {
  const schema =
    pageSchemas[page.page_type?.toLowerCase()] ?? {};

  const content = structuredClone(schema ?? {});

  if (
    schema &&
    Object.keys(schema).length > 0 &&
    page.content &&
    typeof page.content === "object"
  ) {
    for (const sectionKey in schema) {
      if (page.content?.[sectionKey]) {
        content[sectionKey] = {
          ...schema[sectionKey],
          ...page.content[sectionKey],
        };
      }
    }
  }

  return {
    ...page,
    title: page.name ?? page.page_type_display,
    slug: `/${(page.name ?? page.page_type)
      .toLowerCase()
      .replace(/\s+/g, "-")}`,
    sections: content,
  };
});


    // pages.value = rawPages.map((page) => {
      // const schema = pageSchemas[page.page_type.toLowerCase()];
      // const schema = pageSchemas[page.page_type?.toLowerCase()] ?? {};

    //   const content = structuredClone(schema);

    //   if (
    //     page.content &&
    //     typeof page.content === "object" &&
    //     Object.keys(page.content).length > 0
    //   ) {
    //     for (const sectionKey in schema) {
    //       if (page.content[sectionKey]) {
    //         content[sectionKey] = {
    //           ...schema[sectionKey],
    //           ...page.content[sectionKey],
    //         };
    //       }
    //     }
    //   }

    //   return {
    //     ...page,
    //     title: page.name ?? page.page_type_display,
    //     slug: `/${(page.name ?? page.page_type)
    //       .toLowerCase()
    //       .replace(/\s+/g, "-")}`,
    //     sections: content,
    //   };
    // });
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

const deletePage = async (id) => {
  if (!confirm("Are you sure you want to delete this page?")) return;

  try {
    await pagesApi.deletePage(id);
    pages.value = pages.value.filter((page) => page.id !== id);
    fetchPages();
    console.log(`Deleted page with slug: ${id}`);
  } catch (e) {
    console.error("Failed to delete page", e);
  }
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

const addPartnerLogo = () => {
  currentSectionData.value.logos.push("");
};

const removePartnerLogo = (index) => {
  currentSectionData.value.logos.splice(index, 1);
};

const activeSecondaryContent = ref(null);

const toggleSecondaryContent = (itemId) => {
  activeSecondaryContent.value =
    activeSecondaryContent.value === itemId ? null : itemId;
};


const addMonth = () => {
  currentSectionData.value.months["New Month"] = {
    featured: { image: "", tag: "", date: "", comments: 0, description: "" },
    newsList: [],
  };
};

const removeMonth = (month) => {
  delete currentSectionData.value.months[month];
};

const addNewsItem = (month) => {
  currentSectionData.value.months[month].newsList.push({
    image: "",
    tag: "",
    date: "",
    comments: 0,
    description: "",
  });
};

const removeNewsItem = (month, index) => {
  currentSectionData.value.months[month].newsList.splice(index, 1);
};

const saveChanges = async () => {
  try {
    const payload = {
      content: {
        [activeSection.value]: currentSectionData.value,
      },
    };

    await pagesApi.partialUpdatePage(activePage.value.page_type, payload);

    activePage.value.sections[activeSection.value] = structuredClone(
      currentSectionData.value
    );

    goBackToManager();
  } catch (e) {
    console.error("Failed to save section", e);
  }
};

const addExecutive = () => {
  currentSectionData.value.push({
    name: "",
    position: "",
    role: "",
    image: "",
  });
};

const removeExecutive = (index) => {
  currentSectionData.value.splice(index, 1);
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
        // pageSchemas[activePage.value.page_type]?.[activeSection.value] ?? {}
        pageSchemas[activePage.value.page_type?.toLowerCase()]?.[activeSection.value]

      );
  },
  { immediate: true }
);

const toggleVisibility = async (page) => {
  page.is_visible = !page.is_visible;
  try {
    await pagesApi.updatePageVisibility(page.page_type.toLowerCase(), page.is_visible);
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
            <option value="" disabled selected>Select page type</option>
            <option
              v-for="type in availablePageTypes"
              :key="type"
              :value="type"
            >
              {{ type.toUpperCase() }}
            </option>
          </select>
          <p>Create page by selecting page type</p>
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
              <button
  @click="toggleVisibility(page)"
  class="relative inline-flex h-6 w-11 items-center rounded-full transition"
  :class="page.is_visible ? 'bg-green-600' : 'bg-gray-300'"
>
  <span
    class="inline-block h-4 w-4 transform rounded-full bg-white transition"
    :class="page.is_visible ? 'translate-x-6' : 'translate-x-1'"
  />
</button>

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
                @click="deletePage(page.page_type)"
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

          <component
  v-if="activePage.page_type.toLowerCase() === 'home'"
  :is="componentMap.home?.[activeSection]"
  v-model="currentSectionData"
/>
          <div
            v-if="
              activePage.page_type.toLowerCase() === 'home' &&
              activeSection === 'partners'
            "
          >
            <div class="space-y-6">
              <!-- Title -->
              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Section Title
                </label>
                <input
                  v-model="currentSectionData.title"
                  type="text"
                  class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                />
              </div>

              <!-- Logos -->
              <div class="border border-gray-300 rounded-lg p-4 space-y-4">
                <div class="flex justify-between items-center">
                  <label class="text-xs font-semibold uppercase text-gray-500">
                    Partner Logos
                  </label>

                  <button
                    class="text-sm bg-black text-white px-3 py-1 rounded"
                    @click="addPartnerLogo"
                  >
                    + Add Logo
                  </button>
                </div>

                <div
                  v-for="(logo, index) in currentSectionData.logos"
                  :key="index"
                  class="flex items-center space-x-3 border rounded p-2"
                >
                  <input
                    v-model="currentSectionData.logos[index]"
                    type="text"
                    class="flex-grow border-none focus:ring-0"
                    placeholder="logo-key or cloudinary-id"
                  />

                  <button
                    class="text-red-500 text-sm"
                    @click="removePartnerLogo(index)"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="
              activePage.page_type.toLowerCase() === 'home' &&
              activeSection === 'story'
            "
          >
            <div class="space-y-6">
              <!-- Title -->
              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Story Title
                </label>
                <input
                  v-model="currentSectionData.title"
                  type="text"
                  class="w-full border-none focus:ring-0"
                />
              </div>

              <!-- Body -->
              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Story Body
                </label>
                <textarea
                  v-model="currentSectionData.body"
                  rows="6"
                  class="w-full border-none focus:ring-0 resize-none"
                />
              </div>

              <!-- Stats -->
              <div class="border border-gray-300 rounded-lg p-4 space-y-4">
                <div class="flex justify-between items-center">
                  <label class="text-xs font-semibold uppercase text-gray-500">
                    Statistics
                  </label>
                  <button
                    class="text-sm bg-black text-white px-3 py-1 rounded"
                    @click="addStoryStat"
                  >
                    + Add Stat
                  </button>
                </div>

                <div
                  v-for="(stat, index) in currentSectionData.stats"
                  :key="index"
                  class="grid grid-cols-2 gap-3 border rounded p-3"
                >
                  <input
                    v-model="stat.label"
                    placeholder="Label"
                    class="border-none focus:ring-0"
                  />
                  <input
                    v-model="stat.value"
                    placeholder="Value"
                    class="border-none focus:ring-0"
                  />

                  <button
                    class="col-span-2 text-red-500 text-sm text-left"
                    @click="removeStoryStat(index)"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="
              activePage.page_type.toLowerCase() === 'home' &&
              activeSection === 'news'
            "
          >
            <div class="space-y-8">
              <div
                v-for="(monthData, monthName) in currentSectionData.months"
                :key="monthName"
                class="border border-gray-300 rounded-lg p-4 space-y-6"
              >
                <!-- Month Header -->
                <div class="flex justify-between items-center">
                  <h3 class="font-semibold">{{ monthName }}</h3>
                  <button
                    class="text-red-500 text-sm"
                    @click="removeMonth(monthName)"
                  >
                    Delete Month
                  </button>
                </div>

                <!-- Featured -->
                <div class="space-y-2">
                  <label class="text-xs font-semibold uppercase text-gray-500">
                    Featured Description
                  </label>
                  <textarea
                    v-model="monthData.featured.description"
                    rows="3"
                    class="w-full border-none focus:ring-0 resize-none"
                  />
                </div>

                <!-- News List -->
                <div class="space-y-4">
                  <div class="flex justify-between">
                    <label
                      class="text-xs font-semibold uppercase text-gray-500"
                    >
                      News List
                    </label>
                    <button
                      class="text-sm bg-black text-white px-2 py-1 rounded"
                      @click="addNewsItem(monthName)"
                    >
                      + Add News
                    </button>
                  </div>

                  <div
                    v-for="(news, index) in monthData.newsList"
                    :key="index"
                    class="border rounded p-3 space-y-2"
                  >
                    <input
                      v-model="news.tag"
                      placeholder="Tag"
                      class="w-full border-none focus:ring-0"
                    />
                    <input
                      v-model="news.date"
                      placeholder="Date"
                      class="w-full border-none focus:ring-0"
                    />
                    <textarea
                      v-model="news.description"
                      rows="2"
                      class="w-full border-none focus:ring-0 resize-none"
                    />

                    <button
                      class="text-red-500 text-sm"
                      @click="removeNewsItem(monthName, index)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <button
                class="bg-black text-white px-4 py-2 rounded"
                @click="addMonth"
              >
                + Add New Month
              </button>
            </div>
          </div>
          <div
            v-if="
              activePage.page_type.toLowerCase() === 'home' &&
              activeSection === 'executives'
            "
          >
            <div class="space-y-6">
              <button
                class="bg-black text-white px-3 py-2 rounded"
                @click="addExecutive"
              >
                + Add Executive
              </button>

              <div
                v-for="(exec, index) in currentSectionData"
                :key="index"
                class="border rounded p-4 space-y-2"
              >
                <input
                  v-model="exec.name"
                  placeholder="Name"
                  class="w-full border-none focus:ring-0"
                />
                <input
                  v-model="exec.position"
                  placeholder="Position"
                  class="w-full border-none focus:ring-0"
                />
                <input
                  v-model="exec.role"
                  placeholder="Role"
                  class="w-full border-none focus:ring-0"
                />

                <button
                  class="text-red-500 text-sm"
                  @click="removeExecutive(index)"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
          <div
            v-if="
              activePage.page_type.toLowerCase() === 'home' &&
              activeSection === 'faqs'
            "
          >
            <div class="space-y-6">
              <button
                class="bg-black text-white px-3 py-2 rounded"
                @click="addFaq"
              >
                + Add FAQ
              </button>

              <div
                v-for="(faq, index) in currentSectionData"
                :key="index"
                class="border rounded p-4 space-y-3"
              >
                <input
                  v-model="faq.question"
                  placeholder="Question"
                  class="w-full border-none focus:ring-0"
                />

                <textarea
                  v-model="faq.answer"
                  rows="3"
                  placeholder="Answer"
                  class="w-full border-none focus:ring-0 resize-none"
                />

                <button class="text-red-500 text-sm" @click="removeFaq(index)">
                  Remove
                </button>
              </div>
            </div>
          </div>

          <!-- ABOUT HERO SECTION -->
          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'about' &&
              activeSection === 'hero'
            "
          >
            <div class="flex space-x-6">
              <!-- LEFT SIDE -->
              <div class="w-3/5 space-y-6">
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >Title Highlight</label
                  >
                  <input
                    v-model="currentSectionData.titleHighlight"
                    type="text"
                    class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                  />
                </div>

                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >Title Main</label
                  >
                  <input
                    v-model="currentSectionData.titleMain"
                    type="text"
                    class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                  />
                </div>

                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >Description Top</label
                  >
                  <textarea
                    v-model="currentSectionData.descriptionTop"
                    rows="2"
                    class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                  ></textarea>
                </div>

                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >Description Text</label
                  >
                  <textarea
                    v-model="currentSectionData.descriptionText"
                    rows="2"
                    class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                  ></textarea>
                </div>

                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >Description Bottom</label
                  >
                  <textarea
                    v-model="currentSectionData.descriptionBottom"
                    rows="2"
                    class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                  ></textarea>
                </div>

                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >CTA Label</label
                  >
                  <input
                    v-model="currentSectionData.ctaLabel"
                    type="text"
                    class="w-full text-base border-none focus:ring-0 p-0 m-0"
                  />
                </div>

                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >CTA Link</label
                  >
                  <input
                    v-model="currentSectionData.ctaLink"
                    type="text"
                    class="w-full text-base border-none focus:ring-0 p-0 m-0"
                  />
                </div>
              </div>

              <!-- RIGHT SIDE -->
              <div class="w-2/5 space-y-6">
                <image-uploader v-model="currentSectionData.image" />
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                    >Background Color</label
                  >
                  <input
                    type="color"
                    v-model="currentSectionData.backgroundColor"
                    class="w-12 h-8 rounded border-none p-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- ABOUT STORY SECTION -->
          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'about' &&
              activeSection === 'story'
            "
          >
            <div class="space-y-6">
              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                  >Section Title</label
                >
                <input
                  v-model="currentSectionData.sectionTitle"
                  type="text"
                  class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                />
              </div>

              <div
                v-for="(para, index) in currentSectionData.paragraphs"
                :key="index"
                class="border border-gray-300 rounded-lg p-3 space-y-2"
              >
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                  >Paragraph {{ index + 1 }}</label
                >
                <textarea
                  v-model="currentSectionData.paragraphs[index]"
                  rows="3"
                  class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                ></textarea>
                <button
                  class="text-red-500 text-sm"
                  @click="deleteParagraph(index)"
                >
                  Delete
                </button>
              </div>
              <button
                class="bg-black text-white px-4 py-2 rounded"
                @click="addParagraph"
              >
                Add Paragraph
              </button>

              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                  >Mission</label
                >
                <textarea
                  v-model="currentSectionData.mission"
                  rows="3"
                  class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                ></textarea>
              </div>

              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                  >Vision</label
                >
                <textarea
                  v-model="currentSectionData.vision"
                  rows="3"
                  class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                ></textarea>
              </div>

              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                  >Role Points</label
                >
                <div
                  v-for="(point, index) in currentSectionData.rolePoints"
                  :key="index"
                  class="flex justify-between items-center space-x-2"
                >
                  <input
                    v-model="currentSectionData.rolePoints[index]"
                    type="text"
                    class="flex-grow border-none focus:ring-0 p-0 m-0"
                  />
                  <button
                    class="text-red-500 text-sm"
                    @click="deleteRolePoint(index)"
                  >
                    Delete
                  </button>
                </div>
                <button
                  class="bg-black text-white px-3 py-1 rounded mt-2"
                  @click="addRolePoint"
                >
                  Add Point
                </button>
              </div>

              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                  >Commitment Goals</label
                >
                <div
                  v-for="(goal, index) in currentSectionData.commitmentGoals"
                  :key="index"
                  class="flex justify-between items-center space-x-2"
                >
                  <input
                    v-model="currentSectionData.commitmentGoals[index]"
                    type="text"
                    class="flex-grow border-none focus:ring-0 p-0 m-0"
                  />
                  <button
                    class="text-red-500 text-sm"
                    @click="deleteGoal(index)"
                  >
                    Delete
                  </button>
                </div>
                <button
                  class="bg-black text-white px-3 py-1 rounded mt-2"
                  @click="addCommitmentGoal"
                >
                  Add Goal
                </button>
              </div>

              <image-uploader v-model="currentSectionData.image" />
            </div>
          </div>

          <!-- ABOUT ITEMS SECTION -->
          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'about' &&
              activeSection === 'items'
            "
          >
            <div
              v-for="(item, index) in currentSectionData.items"
              :key="index"
              class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4"
            >
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Title</label
              >
              <input
                v-model="item.title"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Short Description</label
              >
              <input
                v-model="item.shortDesc"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Full Description</label
              >
              <textarea
                v-model="item.fullDesc"
                rows="3"
                class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
              ></textarea>

              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Color Class</label
              >
              <input
                v-model="item.colorClass"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <button
                class="text-red-500 text-sm mt-2"
                @click="deleteItem(index)"
              >
                Delete Item
              </button>
            </div>
            <button
              class="bg-black text-white px-4 py-2 rounded"
              @click="addItem"
            >
              Add New Item
            </button>
          </div>

          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'about' &&
              activeSection === 'history'
            "
          >
            <div class="border border-gray-300 rounded-lg p-3 mb-4">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Title</label
              >
              <input
                v-model="currentSectionData.title"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div
              v-for="(milestone, index) in currentSectionData.milestones"
              :key="index"
              class="border border-gray-300 rounded-lg p-3 mb-2 space-y-2"
            >
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Year</label
              >
              <input
                v-model="milestone.year"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Event</label
              >
              <textarea
                v-model="milestone.event"
                rows="2"
                class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
              ></textarea>

              <button
                class="text-red-500 text-sm"
                @click="deleteMilestone(index)"
              >
                Delete
              </button>
            </div>

            <button
              class="bg-black text-white px-4 py-2 rounded"
              @click="addMilestone"
            >
              Add Milestone
            </button>
          </div>

          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'about' &&
              activeSection === ''
            "
          >
            <div class="border border-gray-300 rounded-lg p-3 mb-4">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Title</label
              >
              <input
                v-model="currentSectionData.title"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 mb-2 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Description</label
              >
              <textarea
                v-model="currentSectionData.description"
                rows="3"
                class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
              ></textarea>
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Units</label
              >
              <div
                v-for="(unit, index) in currentSectionData.units"
                :key="index"
                class="flex justify-between items-center space-x-2"
              >
                <input
                  v-model="currentSectionData.units[index]"
                  type="text"
                  class="flex-grow border-none focus:ring-0 p-0 m-0"
                />
                <button class="text-red-500 text-sm" @click="deleteUnit(index)">
                  Delete
                </button>
              </div>
              <button
                class="bg-black text-white px-3 py-1 rounded mt-2"
                @click="addUnit"
              >
                Add Unit
              </button>
            </div>
          </div>

          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'contact' &&
              activeSection === 'hero'
            "
          >
            <div class="flex space-x-6">
              <!-- LEFT SIDE -->
              <div class="w-3/5 space-y-6">
                <!-- Badge Text -->
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                  >
                    Badge Text
                  </label>
                  <input
                    v-model="currentSectionData.badgeText"
                    type="text"
                    class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                  />
                </div>

                <!-- Headline Line 1 -->
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                  >
                    Headline Line 1
                  </label>
                  <input
                    v-model="currentSectionData.headline.line1"
                    type="text"
                    class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                  />
                </div>

                <!-- Headline Line 2 -->
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                  >
                    Headline Line 2
                  </label>
                  <input
                    v-model="currentSectionData.headline.line2"
                    type="text"
                    class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                  />
                </div>

                <!-- Subheadline -->
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                  >
                    Subheadline
                  </label>
                  <textarea
                    v-model="currentSectionData.subheadline"
                    rows="3"
                    class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                  />
                </div>

                <!-- Response Note -->
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                  >
                    Response Note
                  </label>
                  <input
                    v-model="currentSectionData.responseNote"
                    type="text"
                    class="w-full text-sm border-none focus:ring-0 p-0 m-0"
                  />
                </div>
              </div>

              <!-- RIGHT SIDE -->
              <div class="w-2/5 space-y-6">
                <!-- Image Upload -->
                <image-uploader v-model="currentSectionData.image.src" />

                <!-- Image Alt -->
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                  >
                    Image Alt Text
                  </label>
                  <input
                    v-model="currentSectionData.image.alt"
                    type="text"
                    class="w-full text-sm border-none focus:ring-0 p-0 m-0"
                  />
                </div>

                <!-- Background Color -->
                <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                  <label
                    class="block text-xs font-semibold uppercase text-gray-500"
                  >
                    Background Color Class
                  </label>
                  <input
                    v-model="currentSectionData.backgroundColor"
                    type="text"
                    class="w-full text-sm border-none focus:ring-0 p-0 m-0"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'contact' &&
              activeSection === 'form'
            "
          >
            <div class="space-y-6">
              <!-- Form Title -->
              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Form Title
                </label>
                <input
                  v-model="currentSectionData.title"
                  type="text"
                  class="w-full text-lg border-none focus:ring-0 p-0 m-0"
                />
              </div>

              <!-- Description -->
              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Description
                </label>
                <textarea
                  v-model="currentSectionData.description"
                  rows="3"
                  class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                />
              </div>

              <!-- Fields -->
              <div
                v-for="(field, index) in currentSectionData.fields"
                :key="index"
                class="border border-gray-300 rounded-lg p-4 space-y-4"
              >
                <div class="flex justify-between items-center">
                  <h4 class="text-sm font-semibold text-gray-700">
                    Field {{ index + 1 }}
                  </h4>
                  <button
                    @click="deleteField(index)"
                    class="text-red-500 text-xs font-semibold"
                  >
                    Delete
                  </button>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <input
                    v-model="field.label"
                    placeholder="Label"
                    class="border border-gray-200 rounded p-2 text-sm"
                  />
                  <input
                    v-model="field.placeholder"
                    placeholder="Placeholder"
                    class="border border-gray-200 rounded p-2 text-sm"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <select
                    v-model="field.type"
                    class="border border-gray-200 rounded p-2 text-sm"
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="textarea">Textarea</option>
                  </select>

                  <label class="flex items-center text-sm space-x-2">
                    <input type="checkbox" v-model="field.required" />
                    <span>Required</span>
                  </label>
                </div>
              </div>

              <button
                @click="addField"
                class="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold"
              >
                Add Field
              </button>

              <!-- Submit Button Text -->
              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Submit Button Text
                </label>
                <input
                  v-model="currentSectionData.submitButtonText"
                  type="text"
                  class="w-full text-sm border-none focus:ring-0 p-0 m-0"
                />
              </div>

              <!-- Success Message -->
              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Success Message
                </label>
                <textarea
                  v-model="currentSectionData.successMessage"
                  rows="2"
                  class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                />
              </div>
            </div>
          </div>
          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'contact' &&
              activeSection === 'details'
            "
          >
            <div class="space-y-6">
              <!-- Address -->
              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Address
                </label>
                <textarea
                  v-model="currentSectionData.address.text"
                  rows="2"
                  class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                />
              </div>

              <!-- Phone -->
              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Phone Number
                </label>
                <input
                  v-model="currentSectionData.phone"
                  type="text"
                  class="w-full text-sm border-none focus:ring-0 p-0 m-0"
                />
              </div>

              <!-- Email -->
              <div
                v-for="(email, index) in currentSectionData.emails"
                :key="index"
                class="border border-gray-300 rounded-lg p-3 space-y-2"
              >
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Email {{ index + 1 }}
                </label>
                <input
                  v-model="email.address"
                  type="text"
                  class="w-full text-sm border-none focus:ring-0 p-0 m-0"
                />
              </div>
            </div>
          </div>
          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'contact' &&
              activeSection === 'map'
            "
          >
            <div class="space-y-6">
              <!-- Iframe URL -->
              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Google Maps Iframe URL
                </label>
                <textarea
                  v-model="currentSectionData.iframeUrl"
                  rows="3"
                  class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                />
              </div>

              <!-- Map Height -->
              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Map Height
                </label>
                <input
                  v-model="currentSectionData.height"
                  type="number"
                  class="w-full text-sm border-none focus:ring-0 p-0 m-0"
                />
              </div>
            </div>
          </div>
          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'resources' &&
              activeSection === 'hero'
            "
            class="space-y-6"
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Title Line 1
              </label>
              <input
                v-model="currentSectionData.titleLine1"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Title Line 2
              </label>
              <input
                v-model="currentSectionData.titleLine2"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Description
              </label>
              <textarea
                v-model="currentSectionData.description"
                rows="3"
                class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
              ></textarea>
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Background Color
              </label>
              <input
                v-model="currentSectionData.backgroundColor"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <image-uploader
              v-model="currentSectionData.image"
              label="Hero Image"
            />
          </div>
          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'resources' &&
              activeSection === 'newsletterSection'
            "
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Section Title
              </label>
              <input
                v-model="currentSectionData.title"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <!-- Newsletter Items -->
            <div
              v-for="(item, index) in currentSectionData.items"
              :key="index"
              class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4"
            >
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Date
              </label>
              <input
                v-model="item.date"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Title
              </label>
              <input
                v-model="item.text"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                PDF URL
              </label>
              <input
                v-model="item.pdfUrl"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <button
                class="text-red-500 text-sm mt-2"
                @click="deleteItem(index)"
              >
                Delete Newsletter
              </button>
            </div>

            <button
              class="bg-black text-white px-4 py-2 rounded"
              @click="addItem"
            >
              Add Newsletter
            </button>

            <!-- Pagination -->
            <div class="border border-gray-300 rounded-lg p-3 space-y-2 mt-6">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Current Page
              </label>
              <input
                v-model="currentSectionData.pagination.currentPage"
                type="number"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Total Pages
              </label>
              <input
                v-model="currentSectionData.pagination.totalPages"
                type="number"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Next Page URL
              </label>
              <input
                v-model="currentSectionData.pagination.nextPageUrl"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>
          </div>
          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'resources' &&
              activeSection === 'publicationsSection'
            "
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Section Title
              </label>
              <input
                v-model="currentSectionData.title"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Background Color
              </label>
              <input
                v-model="currentSectionData.backgroundColor"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div
              v-for="(item, index) in currentSectionData.items"
              :key="index"
              class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4"
            >
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Title
              </label>
              <input
                v-model="item.title"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Description
              </label>
              <textarea
                v-model="item.description"
                rows="3"
                class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
              ></textarea>

              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                PDF URL
              </label>
              <input
                v-model="item.pdfUrl"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <button
                class="text-red-500 text-sm mt-2"
                @click="deleteItem(index)"
              >
                Delete Publication
              </button>
            </div>

            <button
              class="bg-black text-white px-4 py-2 rounded"
              @click="addItem"
            >
              Add Publication
            </button>

            <!-- Pagination -->
            <div class="border border-gray-300 rounded-lg p-3 space-y-2 mt-6">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Current Page
              </label>
              <input
                v-model="currentSectionData.pagination.currentPage"
                type="number"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Total Pages
              </label>
              <input
                v-model="currentSectionData.pagination.totalPages"
                type="number"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>
          </div>

          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'getinvolved' &&
              activeSection === 'hero'
            "
            class="space-y-6"
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Title Line 1</label
              >
              <input
                v-model="currentSectionData.titleLine1"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Title Line 2</label
              >
              <input
                v-model="currentSectionData.titleLine2"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Description</label
              >
              <textarea
                v-model="currentSectionData.description"
                rows="3"
                class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
              ></textarea>
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Background Color</label
              >
              <input
                v-model="currentSectionData.backgroundColor"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <image-uploader
              v-model="currentSectionData.image"
              label="Hero Image"
            />
          </div>
          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'getinvolved' &&
              activeSection === 'donations'
            "
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Title</label
              >
              <input
                v-model="currentSectionData.title"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Subtitle</label
              >
              <input
                v-model="currentSectionData.subtitle"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <!-- Paragraphs -->
            <div
              v-for="(paragraph, index) in currentSectionData.paragraphs"
              :key="index"
              class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4"
            >
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Paragraph {{ index + 1 }}
              </label>
              <textarea
                v-model="currentSectionData.paragraphs[index]"
                rows="3"
                class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
              ></textarea>

              <button
                class="text-red-500 text-sm mt-2"
                @click="deleteItem(index)"
              >
                Delete Paragraph
              </button>
            </div>

            <button
              class="bg-black text-white px-4 py-2 rounded mb-6"
              @click="addItem"
            >
              Add Paragraph
            </button>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Note</label
              >
              <textarea
                v-model="currentSectionData.note"
                rows="2"
                class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
              ></textarea>
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Quote</label
              >
              <textarea
                v-model="currentSectionData.quote"
                rows="2"
                class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
              ></textarea>
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Button Text</label
              >
              <input
                v-model="currentSectionData.buttonText"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>
          </div>
          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'getinvolved' &&
              activeSection === 'partnerships'
            "
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Title</label
              >
              <input
                v-model="currentSectionData.title"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Tagline</label
              >
              <input
                v-model="currentSectionData.tagline"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Description</label
              >
              <textarea
                v-model="currentSectionData.description"
                rows="3"
                class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
              ></textarea>
            </div>

            <div
              v-for="(item, index) in currentSectionData.items"
              :key="index"
              class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4"
            >
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Title</label
              >
              <input
                v-model="item.title"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Description</label
              >
              <textarea
                v-model="item.description"
                rows="3"
                class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
              ></textarea>

              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Button Text</label
              >
              <input
                v-model="item.buttonText"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <button
                class="text-red-500 text-sm mt-2"
                @click="deleteItem(index)"
              >
                Delete Item
              </button>
            </div>

            <button
              class="bg-black text-white px-4 py-2 rounded"
              @click="addItem"
            >
              Add Partnership Item
            </button>
          </div>
          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'getinvolved' &&
              activeSection === 'opportunities'
            "
          >
            <div
              v-for="(item, index) in currentSectionData.items"
              :key="index"
              class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4"
            >
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Title</label
              >
              <input
                v-model="item.title"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Description</label
              >
              <textarea
                v-model="item.description"
                rows="3"
                class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
              ></textarea>

              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Button Text</label
              >
              <input
                v-model="item.buttonText"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <button
                class="text-red-500 text-sm mt-2"
                @click="deleteItem(index)"
              >
                Delete Item
              </button>
            </div>

            <button
              class="bg-black text-white px-4 py-2 rounded"
              @click="addItem"
            >
              Add Opportunity
            </button>
          </div>
          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'getinvolved' &&
              activeSection === 'volunteering'
            "
            class="space-y-6"
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Title</label
              >
              <input
                v-model="currentSectionData.title"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Subtitle</label
              >
              <input
                v-model="currentSectionData.subtitle"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Description</label
              >
              <textarea
                v-model="currentSectionData.description"
                rows="3"
                class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
              ></textarea>
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Button Text</label
              >
              <input
                v-model="currentSectionData.buttonText"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Background Color</label
              >
              <input
                v-model="currentSectionData.backgroundColor"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>
          </div>
          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'getinvolved' &&
              activeSection === 'donationModal'
            "
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Modal Title</label
              >
              <input
                v-model="currentSectionData.title"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2 mb-6">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Subtitle</label
              >
              <input
                v-model="currentSectionData.subtitle"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div
              v-for="(item, index) in currentSectionData.options"
              :key="index"
              class="border border-gray-300 rounded-lg p-3 space-y-2 mb-4"
            >
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Option Title</label
              >
              <input
                v-model="item.title"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />

              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Description</label
              >
              <textarea
                v-model="item.description"
                rows="2"
                class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
              ></textarea>

              <button
                class="text-red-500 text-sm mt-2"
                @click="deleteItem(index)"
              >
                Delete Option
              </button>
            </div>

            <button
              class="bg-black text-white px-4 py-2 rounded"
              @click="addItem"
            >
              Add Option
            </button>
          </div>
          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'member' &&
              activeSection === 'hero'
            "
            class="space-y-4"
          >
            <div>
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Headline Top
              </label>
              <input
                v-model="currentSectionData.headlineTop"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div>
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Headline Bottom
              </label>
              <input
                v-model="currentSectionData.headlineBottom"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>

            <div>
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Description
              </label>
              <textarea
                v-model="currentSectionData.description"
                rows="4"
                class="w-full border-none focus:ring-0 p-0 m-0 resize-none"
              />
            </div>

            <div>
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Hero Image
              </label>
              <input
                v-model="currentSectionData.image"
                type="text"
                class="w-full border-none focus:ring-0 p-0 m-0"
              />
            </div>
          </div>
          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'member' &&
              activeSection === 'sectionTitle'
            "
          >
            <label class="block text-xs font-semibold uppercase text-gray-500">
              Section Title
            </label>
            <input
              v-model="currentSectionData"
              type="text"
              class="w-full border-none focus:ring-0 p-0 m-0"
            />
          </div>

          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'member' &&
              activeSection === 'categories'
            "
            class="space-y-6"
          >
            <div
              v-for="(category, catIndex) in currentSectionData"
              :key="catIndex"
              class="border border-gray-300 rounded-lg p-4 space-y-4"
            >
              <!-- Category Info -->
              <div>
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Category Name
                </label>
                <input
                  v-model="category.name"
                  type="text"
                  class="w-full border-none focus:ring-0 p-0 m-0"
                />
              </div>

              <div>
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Description
                </label>
                <input
                  v-model="category.description"
                  type="text"
                  class="w-full border-none focus:ring-0 p-0 m-0"
                />
              </div>

              <!-- Plans -->
              <div
                v-for="(plan, planIndex) in category.plans"
                :key="planIndex"
                class="border border-gray-200 rounded-md p-3 space-y-2"
              >
                <input
                  v-model="plan.title"
                  placeholder="Plan Title"
                  class="w-full border-none p-0 m-0"
                />
                <input
                  v-model="plan.price"
                  placeholder="Price"
                  class="w-full border-none p-0 m-0"
                />
                <input
                  v-model="plan.audience"
                  placeholder="Audience"
                  class="w-full border-none p-0 m-0"
                />

                <!-- Benefits -->
                <div
                  v-for="(benefit, benefitIndex) in plan.benefits"
                  :key="benefitIndex"
                  class="flex items-center gap-2"
                >
                  <input
                    v-model="plan.benefits[benefitIndex]"
                    class="flex-1 border-none p-0 m-0"
                  />
                  <button
                    class="text-red-500 text-sm"
                    @click="plan.benefits.splice(benefitIndex, 1)"
                  >
                    X
                  </button>
                </div>

                <button
                  class="text-sm text-black"
                  @click="plan.benefits.push('New benefit')"
                >
                  + Add Benefit
                </button>

                <button
                  class="text-red-500 text-sm"
                  @click="category.plans.splice(planIndex, 1)"
                >
                  Delete Plan
                </button>
              </div>

              <button
                class="text-sm bg-black text-white px-3 py-1 rounded"
                @click="
                  category.plans.push({
                    title: '',
                    price: '',
                    audience: '',
                    benefits: [],
                  })
                "
              >
                + Add Plan
              </button>

              <button
                class="text-red-500 text-sm"
                @click="currentSectionData.splice(catIndex, 1)"
              >
                Delete Category
              </button>
            </div>

            <button
              class="bg-black text-white px-4 py-2 rounded"
              @click="
                currentSectionData.push({
                  id: '',
                  name: '',
                  description: '',
                  plans: [],
                })
              "
            >
              + Add Category
            </button>
          </div>
          <div
            v-else-if="
              activePage.page_type.toLowerCase() === 'member' &&
              activeSection === 'valuePropositionTabs'
            "
            class="space-y-6"
          >
            <div
              v-for="(tab, index) in currentSectionData"
              :key="index"
              class="border border-gray-300 rounded-lg p-4 space-y-3"
            >
              <input
                v-model="tab.name"
                placeholder="Tab Name"
                class="w-full border-none p-0 m-0"
              />
              <input
                v-model="tab.titleHtml"
                placeholder="Title HTML"
                class="w-full border-none p-0 m-0"
              />
              <input
                v-model="tab.color"
                placeholder="Color"
                class="w-full border-none p-0 m-0"
              />

              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Content HTML
              </label>
              <textarea
                v-model="tab.contentHtml"
                rows="6"
                class="w-full border-none resize-none p-0 m-0"
              />

              <button
                class="text-red-500 text-sm"
                @click="currentSectionData.splice(index, 1)"
              >
                Delete Tab
              </button>
            </div>

            <button
              class="bg-black text-white px-4 py-2 rounded"
              @click="
                currentSectionData.push({
                  id: '',
                  name: '',
                  titleHtml: '',
                  color: '',
                  contentHtml: '',
                })
              "
            >
              + Add Tab
            </button>
          </div>

          <div
            v-if="
              activePage.page_type.toLowerCase() === 'latestnews' &&
              activeSection === 'hero'
            "
            class="space-y-6"
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Hero Title Line 1
              </label>
              <input
                v-model="currentSectionData.titleLine1"
                type="text"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Hero Title Line 2
              </label>
              <input
                v-model="currentSectionData.titleLine2"
                type="text"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Hero Description
              </label>
              <textarea
                v-model="currentSectionData.description"
                rows="4"
                class="w-full border-none focus:ring-0 resize-none"
              ></textarea>
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Hero Image URL
              </label>
              <input
                v-model="currentSectionData.image"
                type="text"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Hero Background Color
              </label>
              <input
                v-model="currentSectionData.backgroundColor"
                type="color"
                class="w-16 h-10 p-0 border-none focus:ring-0"
              />
            </div>
          </div>

          <div
            v-if="
              activePage.page_type.toLowerCase() === 'latestnews' &&
              activeSection === 'latestNewsSection'
            "
            class="space-y-8"
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Filters
              </label>
              <div class="flex gap-2 flex-wrap">
                <span
                  v-for="(filter, index) in currentSectionData.filters"
                  :key="index"
                  class="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {{ filter }}
                  <button
                    @click="removeFilter(index)"
                    class="text-red-500 font-bold"
                  >
                    ×
                  </button>
                </span>
                <input
                  v-model="newFilter"
                  @keyup.enter="addFilter"
                  placeholder="Add filter"
                  class="border p-1 rounded focus:ring-0 w-32"
                />
              </div>
            </div>

            <div
              v-for="(article, index) in currentSectionData.articles"
              :key="article.id"
              class="border border-gray-300 rounded-lg p-4 space-y-3"
            >
              <div class="flex justify-between items-center">
                <h4 class="font-semibold text-sm">Article {{ index + 1 }}</h4>
                <button
                  @click="removeArticle(index)"
                  class="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>

              <div class="space-y-2">
                <label class="text-xs font-semibold uppercase text-gray-500"
                  >Title</label
                >
                <input
                  v-model="article.title"
                  class="w-full border-none focus:ring-0"
                />

                <label class="text-xs font-semibold uppercase text-gray-500"
                  >Excerpt</label
                >
                <textarea
                  v-model="article.excerpt"
                  rows="3"
                  class="w-full border-none focus:ring-0 resize-none"
                ></textarea>

                <label class="text-xs font-semibold uppercase text-gray-500"
                  >Description</label
                >
                <textarea
                  v-model="article.description"
                  rows="5"
                  class="w-full border-none focus:ring-0 resize-none"
                ></textarea>

                <label class="text-xs font-semibold uppercase text-gray-500"
                  >Image URL</label
                >
                <input
                  v-model="article.image"
                  class="w-full border-none focus:ring-0"
                />

                <label class="text-xs font-semibold uppercase text-gray-500"
                  >Date</label
                >
                <input
                  v-model="article.date"
                  type="date"
                  class="w-full border-none focus:ring-0"
                />

                <label class="text-xs font-semibold uppercase text-gray-500"
                  >Link</label
                >
                <input
                  v-model="article.link"
                  class="w-full border-none focus:ring-0"
                />

                <label class="text-xs font-semibold uppercase text-gray-500"
                  >Slug</label
                >
                <input
                  v-model="article.slug"
                  class="w-full border-none focus:ring-0"
                />

                <label class="text-xs font-semibold uppercase text-gray-500"
                  >Tag</label
                >
                <input
                  v-model="article.tag"
                  class="w-full border-none focus:ring-0"
                />
              </div>
            </div>

            <button
              @click="addArticle"
              class="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
            >
              + Add Article
            </button>
          </div>

          <div
            v-if="
              activePage.page_type.toLowerCase() === 'latestnews' &&
              activeSection === 'policyAdvocacySection'
            "
            class="space-y-6"
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Section Title</label
              >
              <input
                v-model="currentSectionData.title"
                type="text"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Background Color</label
              >
              <input
                v-model="currentSectionData.backgroundColor"
                type="color"
                class="w-16 h-10 border-none focus:ring-0"
              />
            </div>

            <div
              v-for="(update, index) in currentSectionData.updates"
              :key="update.id"
              class="border border-gray-300 rounded-lg p-4 space-y-2"
            >
              <div class="flex justify-between items-center">
                <h4 class="font-semibold text-sm">Update {{ index + 1 }}</h4>
                <button
                  @click="removeUpdate(index)"
                  class="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Title</label
              >
              <input
                v-model="update.title"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Description</label
              >
              <textarea
                v-model="update.description"
                rows="3"
                class="w-full border-none focus:ring-0 resize-none"
              ></textarea>

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Image URL</label
              >
              <input
                v-model="update.image"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Link</label
              >
              <input
                v-model="update.link"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Slug</label
              >
              <input
                v-model="update.slug"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Tag</label
              >
              <input
                v-model="update.tag"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <button
              @click="addUpdate"
              class="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
            >
              + Add Update
            </button>
          </div>
          <div
            v-if="
              activePage.page_type.toLowerCase() === 'governance' &&
              activeSection === 'hero'
            "
            class="space-y-6"
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Title Highlight
              </label>
              <input
                v-model="currentSectionData.titleHighlight"
                type="text"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Title Main
              </label>
              <input
                v-model="currentSectionData.titleMain"
                type="text"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Description
              </label>
              <textarea
                v-model="currentSectionData.description"
                rows="4"
                class="w-full border-none focus:ring-0 resize-none"
              ></textarea>
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Hero Image URL
              </label>
              <input
                v-model="currentSectionData.image"
                type="text"
                class="w-full border-none focus:ring-0"
              />
            </div>
          </div>

          <div
            v-if="
              activePage.page_type.toLowerCase() === 'governance' &&
              activeSection === 'boardOfTrustees'
            "
            class="space-y-8"
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Section Title
              </label>
              <input
                v-model="currentSectionData.title"
                type="text"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-4 space-y-3">
              <h4 class="font-semibold text-sm">Chair</h4>

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Name</label
              >
              <input
                v-model="currentSectionData.chair.name"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Role</label
              >
              <input
                v-model="currentSectionData.chair.role"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Slug</label
              >
              <input
                v-model="currentSectionData.chair.slug"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Tag</label
              >
              <input
                v-model="currentSectionData.chair.tag"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Image URL</label
              >
              <input
                v-model="currentSectionData.chair.image"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div
              v-for="(trustee, index) in currentSectionData.trustees"
              :key="index"
              class="border border-gray-300 rounded-lg p-4 space-y-3"
            >
              <div class="flex justify-between items-center">
                <h4 class="font-semibold text-sm">Trustee {{ index + 1 }}</h4>
                <button
                  @click="removeTrustee(index)"
                  class="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Name</label
              >
              <input
                v-model="trustee.name"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Title</label
              >
              <input
                v-model="trustee.title"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Slug</label
              >
              <input
                v-model="trustee.slug"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Image URL</label
              >
              <input
                v-model="trustee.image"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <button
              @click="addTrustee"
              class="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
            >
              + Add Trustee
            </button>
          </div>
          <div
            v-if="
              activePage.page_type.toLowerCase() === 'governance' &&
              activeSection === 'executiveCommittee'
            "
            class="space-y-8"
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Section Title
              </label>
              <input
                v-model="currentSectionData.title"
                type="text"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div
              v-for="(member, index) in currentSectionData.members"
              :key="index"
              class="border border-gray-300 rounded-lg p-4 space-y-3"
            >
              <div class="flex justify-between items-center">
                <h4 class="font-semibold text-sm">Member {{ index + 1 }}</h4>
                <button
                  @click="removeExecutives(index)"
                  class="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Name</label
              >
              <input
                v-model="member.name"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Role</label
              >
              <input
                v-model="member.role"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Slug</label
              >
              <input
                v-model="member.slug"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Image URL</label
              >
              <input
                v-model="member.image"
                class="w-full border-none focus:ring-0"
              />

              <label class="text-xs font-semibold uppercase text-gray-500"
                >Profile</label
              >
              <textarea
                v-model="member.profile"
                rows="3"
                class="w-full border-none focus:ring-0 resize-none"
              ></textarea>

              <div
                v-for="(social, sIndex) in member.socials"
                :key="sIndex"
                class="flex gap-2 items-center"
              >
                <input
                  v-model="social.platform"
                  placeholder="Platform"
                  class="border p-1 rounded focus:ring-0 w-32"
                />
                <input
                  v-model="social.url"
                  placeholder="URL"
                  class="border p-1 rounded focus:ring-0 flex-1"
                />
                <button
                  @click="removeSocial(index, sIndex)"
                  class="text-red-500"
                >
                  ×
                </button>
              </div>

              <button
                @click="addSocial(index)"
                class="bg-gray-200 px-3 py-1 rounded text-sm"
              >
                + Add Social
              </button>
            </div>

            <button
              @click="addExecutives"
              class="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
            >
              + Add Member
            </button>
          </div>
          <div
            v-if="
              activePage.page_type.toLowerCase() === 'events' &&
              activeSection === 'hero'
            "
            class="space-y-6"
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Hero Title Line 1
              </label>
              <input
                v-model="currentSectionData.titleLine1"
                type="text"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Hero Title Line 2
              </label>
              <input
                v-model="currentSectionData.titleLine2"
                type="text"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Hero Description
              </label>
              <textarea
                v-model="currentSectionData.description"
                rows="4"
                class="w-full border-none focus:ring-0 resize-none"
              ></textarea>
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Hero Image URL
              </label>
              <input
                v-model="currentSectionData.image"
                type="text"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Hero Background Color
              </label>
              <input
                v-model="currentSectionData.backgroundColor"
                type="color"
                class="w-16 h-10 p-0 border-none focus:ring-0"
              />
            </div>
          </div>
          <div
            v-if="
              activePage.page_type.toLowerCase() === 'events' &&
              activeSection === 'searchAndFilter'
            "
            class="space-y-8"
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Section Title
              </label>
              <input
                v-model="currentSectionData.title"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Search Placeholder
              </label>
              <input
                v-model="currentSectionData.searchPlaceholder"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <!-- Years -->
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Years
              </label>
              <div class="flex gap-2 flex-wrap">
                <span
                  v-for="(year, index) in currentSectionData.years"
                  :key="index"
                  class="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {{ year }}
                  <button
                    @click="removeYear(index)"
                    class="text-red-500 font-bold"
                  >
                    ×
                  </button>
                </span>
                <input
                  v-model="newYear"
                  @keyup.enter="addYear"
                  placeholder="Add year"
                  class="border p-1 rounded focus:ring-0 w-24"
                />
              </div>
            </div>

            <!-- Categories -->
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Categories
              </label>
              <div class="flex gap-2 flex-wrap">
                <span
                  v-for="(category, index) in currentSectionData.categories"
                  :key="index"
                  class="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {{ category }}
                  <button
                    @click="removeCategory(index)"
                    class="text-red-500 font-bold"
                  >
                    ×
                  </button>
                </span>
                <input
                  v-model="newCategory"
                  @keyup.enter="addCategory"
                  placeholder="Add category"
                  class="border p-1 rounded focus:ring-0 w-32"
                />
              </div>
            </div>
          </div>
          <div
            v-if="
              activePage.page_type.toLowerCase() === 'events' &&
              activeSection === 'featuredEvent'
            "
            class="space-y-6"
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Tag</label
              >
              <input
                v-model="currentSectionData.tag"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Title</label
              >
              <input
                v-model="currentSectionData.title"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Date</label
              >
              <input
                v-model="currentSectionData.date"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Location</label
              >
              <input
                v-model="currentSectionData.location"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Description</label
              >
              <textarea
                v-model="currentSectionData.description"
                rows="4"
                class="w-full border-none focus:ring-0 resize-none"
              ></textarea>
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Image URL</label
              >
              <input
                v-model="currentSectionData.image"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label class="block text-xs font-semibold uppercase text-gray-500"
                >Register Link</label
              >
              <input
                v-model="currentSectionData.registerLink"
                class="w-full border-none focus:ring-0"
              />
            </div>
          </div>
          <div
            v-if="
              activePage.page_type.toLowerCase() === 'events' &&
              activeSection === 'latestEvents'
            "
            class="space-y-8"
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Section Title
              </label>
              <input
                v-model="currentSectionData.title"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div
              v-for="(event, index) in currentSectionData.items"
              :key="event.id"
              class="border border-gray-300 rounded-lg p-4 space-y-3"
            >
              <div class="flex justify-between items-center">
                <h4 class="font-semibold text-sm">Event {{ index + 1 }}</h4>
                <button
                  @click="removeLatestEvent(index)"
                  class="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>

              <input
                v-model="event.title"
                placeholder="Title"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="event.category"
                placeholder="Category"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="event.date"
                placeholder="Date"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="event.time"
                placeholder="Time"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="event.location"
                placeholder="Location"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="event.frequency"
                placeholder="Frequency"
                class="w-full border-none focus:ring-0"
              />
              <textarea
                v-model="event.description"
                rows="3"
                placeholder="Description"
                class="w-full border-none focus:ring-0 resize-none"
              ></textarea>
              <input
                v-model="event.image"
                placeholder="Image URL"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="event.registerLink"
                placeholder="Register Link"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <button
              @click="addLatestEvent"
              class="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
            >
              + Add Event
            </button>
          </div>
          <div
            v-if="
              activePage.page_type.toLowerCase() === 'events' &&
              activeSection === 'pastEvents'
            "
            class="space-y-8"
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Section Title
              </label>
              <input
                v-model="currentSectionData.title"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div
              v-for="(event, index) in currentSectionData.items"
              :key="index"
              class="border border-gray-300 rounded-lg p-4 space-y-3"
            >
              <div class="flex justify-between items-center">
                <h4 class="font-semibold text-sm">
                  Past Event {{ index + 1 }}
                </h4>
                <button
                  @click="removePastEvent(index)"
                  class="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>

              <input
                v-model="event.title"
                placeholder="Title"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="event.category"
                placeholder="Category"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="event.date"
                placeholder="Date"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="event.theme"
                placeholder="Theme"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="event.image"
                placeholder="Image URL"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <button
              @click="addPastEvent"
              class="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
            >
              + Add Past Event
            </button>
          </div>
          <div
            v-if="
              activePage.page_type.toLowerCase() === 'gallery' &&
              activeSection === 'hero'
            "
            class="space-y-6"
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Hero Title Line 1
              </label>
              <input
                v-model="currentSectionData.titleLine1"
                type="text"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Hero Title Line 2
              </label>
              <input
                v-model="currentSectionData.titleLine2"
                type="text"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Description
              </label>
              <textarea
                v-model="currentSectionData.description"
                rows="4"
                class="w-full border-none focus:ring-0 resize-none"
              ></textarea>
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Image URL
              </label>
              <input
                v-model="currentSectionData.image"
                type="text"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Background Color
              </label>
              <input
                v-model="currentSectionData.backgroundColor"
                type="color"
                class="w-16 h-10 p-0 border-none focus:ring-0"
              />
            </div>
          </div>
          <div
            v-if="
              activePage.page_type.toLowerCase() === 'gallery' &&
              activeSection === 'filtering'
            "
            class="space-y-8"
          >
            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Section Title
              </label>
              <input
                v-model="currentSectionData.title"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Years
              </label>
              <div class="flex gap-2 flex-wrap">
                <span
                  v-for="(year, index) in currentSectionData.years"
                  :key="index"
                  class="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {{ year }}
                  <button
                    @click="removeGalleryYear(index)"
                    class="text-red-500 font-bold"
                  >
                    ×
                  </button>
                </span>
                <input
                  v-model="newGalleryYear"
                  @keyup.enter="addGalleryYear"
                  placeholder="Add year"
                  class="border p-1 rounded focus:ring-0 w-24"
                />
              </div>
            </div>

            <div class="border border-gray-300 rounded-lg p-3 space-y-2">
              <label
                class="block text-xs font-semibold uppercase text-gray-500"
              >
                Categories
              </label>
              <div class="flex gap-2 flex-wrap">
                <span
                  v-for="(category, index) in currentSectionData.categories"
                  :key="index"
                  class="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {{ category }}
                  <button
                    @click="removeGalleryCategory(index)"
                    class="text-red-500 font-bold"
                  >
                    ×
                  </button>
                </span>
                <input
                  v-model="newGalleryCategory"
                  @keyup.enter="addGalleryCategory"
                  placeholder="Add category"
                  class="border p-1 rounded focus:ring-0 w-32"
                />
              </div>
            </div>
          </div>
          <div
            v-if="
              activePage.page_type.toLowerCase() === 'gallery' &&
              activeSection === 'galleryList'
            "
            class="space-y-8"
          >
            <div
              v-for="(item, index) in currentSectionData.items"
              :key="item.id"
              class="border border-gray-300 rounded-lg p-4 space-y-3"
            >
              <div class="flex justify-between items-center">
                <h4 class="font-semibold text-sm">
                  Gallery Item {{ index + 1 }}
                </h4>
                <button
                  @click="removeGalleryItem(index)"
                  class="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>

              <input
                v-model="item.title"
                placeholder="Title"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="item.category"
                placeholder="Category"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="item.date"
                placeholder="Date"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="item.year"
                placeholder="Year"
                class="w-full border-none focus:ring-0"
              />
              <input
                v-model="item.image"
                placeholder="Image URL"
                class="w-full border-none focus:ring-0"
              />
            </div>

            <button
              @click="addGalleryItem"
              class="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
            >
              + Add Gallery Item
            </button>

            <div class="border border-gray-300 rounded-lg p-4 space-y-3">
              <label class="flex items-center gap-2 text-sm">
                <input type="checkbox" v-model="currentSectionData.hasMore" />
                Has More
              </label>

              <div>
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Next Cursor
                </label>
                <input
                  v-model="currentSectionData.nextCursor"
                  type="number"
                  class="w-full border-none focus:ring-0"
                />
              </div>
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
