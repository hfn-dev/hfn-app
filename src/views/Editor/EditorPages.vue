<script setup>
import pagesApi from '@/api/pageManagement';
import { pageSchemas } from '@/schemas/pageSchemas';
import { useRouter } from 'vue-router';
import HomeHeroEditor from './components/cms/home/HomeHeroEditor.vue';
import { computed, onMounted, ref, watch } from 'vue';
import EditorSidebar from './EditorSidebar.vue';
  
import HomeFaqsEditor from './components/cms/home/HomeFaqsEditor.vue';
import HomeAboutEditor from './components/cms/home/HomeAboutEditor.vue';
import HomeMandateEditor from './components/cms/home/HomeMandateEditor.vue';
import HomeNewsEditor from './components/cms/home/HomeNewsEditor.vue';
import HomeExecutivesEditor from './components/cms/home/HomeExecutivesEditor.vue';
import HomePartnerEditor from './components/cms/home/HomePartnerEditor.vue';
  
import AboutHeroEditor from './components/cms/about/AboutHeroEditor.vue';
import AboutStoryEditor from './components/cms/about/AboutStoryEditor.vue';
import AboutItemEditor from './components/cms/about/AboutItemEditor.vue';
import AboutHistoryEditor from './components/cms/about/AboutHistoryEditor.vue';
import AboutGovernanceEditor from './components/cms/about/AboutGovernanceEditor.vue';
import AboutCtaSectionEditor from './components/cms/about/AboutCtaSectionEditor.vue';
import AboutCommitmentSection from './components/cms/about/AboutCommitmentSection.vue';
import AboutRoleSectionEditor from './components/cms/about/AboutRoleSectionEditor.vue';
  
import GovernanceHeroEditor from './components/cms/governance/GovernanceHeroEditor.vue';
import BoardOfTrusteesEditor from './components/cms/governance/GovernanceBoardOfTrustees.vue';
import ExecutiveCommitteeEditor from './components/cms/governance/GovernanceExecutiveCommittee.vue';

import NewsHeroEditor from './components/cms/news/NewsHeroEditor.vue';
import NewsLatestEditor from './components/cms/news/NewsLatestEditor.vue';
import NewsPolicyEditor from './components/cms/news/NewsPolicyEditor.vue';

import ResourcesHeroEditor from './components/cms/resources/ResourcesHeroEditor.vue';
import ResourcesNewsletterEditor from './components/cms/resources/ResourcesNewsletterEditor.vue';
import ResourcesPublicationEditor from './components/cms/resources/ResourcesPublicationEditor.vue';

import EventHeroEditor from './components/cms/events/EventHeroEditor.vue';
import EventSearchAndFilterEditor from './components/cms/events/EventSearchAndFilterEditor.vue';
import EventFeaturedEditor from './components/cms/events/EventFeaturedEditor.vue';
import EventLatestEditor from './components/cms/events/EventLatestEditor.vue';
import EventPastEditor from './components/cms/events/EventPastEditor.vue';  

import GalleryHeroEditor from './components/cms/gallery/GalleryHeroEditor.vue';
import GalleryFilterEditor from './components/cms/gallery/GalleryFilterEditor.vue';
import GalleryListEditor from './components/cms/gallery/GalleryListEditor.vue'; 
  
import GetinvolvedHeroEditor from './components/cms/getinvolved/GetinvolvedHeroEditor.vue';
import GetinvolvedDonationsEditor from './components/cms/getinvolved/GetinvolvedDonationsEditor.vue';
import GetinvolvedPartnershipsEditor from './components/cms/getinvolved/GetinvolvedPartnershipsEditor.vue'; 
import GetinvolvedOpportunitiesEditor from './components/cms/getinvolved/GetinvolvedOpportunitiesEditor.vue'; 
import GetinvolvedVolunteeringEditor from './components/cms/getinvolved/GetinvolvedVolunteeringEditor.vue'; 
import GetinvolvedModalEditor from './components/cms/getinvolved/GetinvolvedModalEditor.vue'; 


import MemberHeroEditor from './components/cms/member/MemberHeroEditor.vue';
import MemberSectionTitleEditor from './components/cms/member/MemberSectionTitleEditor.vue';
import MemberCategoriesEditor from './components/cms/member/MemberCategoriesEditor.vue';

  
const newYear = ref('');
const newCategory = ref('');
const currentView = ref('manager');
const activePage = ref(null);
const activeSection = ref('hero');
const router = useRouter();
const hasPages = computed(() => pages.value && pages.value.length > 0);
const currentSectionData = ref(null);

const componentMap = {
  home: {
    hero: HomeHeroEditor,
    faqs: HomeFaqsEditor,
    about: HomeAboutEditor,
    mandate: HomeMandateEditor,
    news: HomeNewsEditor,
    executives: HomeExecutivesEditor,
    partners: HomePartnerEditor,
  },
  about: {
    hero: AboutHeroEditor,
    story: AboutStoryEditor,
    roleSection: AboutRoleSectionEditor,
    history: AboutHistoryEditor,
    governance: AboutGovernanceEditor,
    items: AboutItemEditor,
    ctaSection: AboutCtaSectionEditor,
    commitment: AboutCommitmentSection,
  },
  governance: {
    hero: GovernanceHeroEditor,
    boardOfTrustees: BoardOfTrusteesEditor,
    executiveCommittee: ExecutiveCommitteeEditor,
  },
  latestnews: {
    hero: NewsHeroEditor,
    latestNewsSection: NewsLatestEditor,
    policyAdvocacySection: NewsPolicyEditor,
  },
  resources: {
    hero: ResourcesHeroEditor,
    newsletterSection: ResourcesNewsletterEditor,
    publicationsSection: ResourcesPublicationEdit or,
  },
  events: {
    hero: EventHeroEditor,
    searchAndFilter: EventSearchAndFilterEditor,
    featuredEvent: EventFeaturedEditor,
    latestEvents: EventLatestEditor,
    pastEvents: EventPastEditor,
  },
  gallery: {
    hero: GalleryHeroEditor,
    filtering: GalleryFilterEditor,
    galleryList: GalleryListEditor,
    
  },
  getinvolved: {
    hero: GetinvolvedHeroEditor,
    donations: GetinvolvedDonationsEditor,
    partnerships: GetinvolvedPartnershipsEditor,
    opportunities: GetinvolvedOpportunitiesEditor,
    volunteering: GetinvolvedVolunteeringEditor,
    donationModal: GetinvolvedModalEditor,
  },
  member: {
    hero: MemberHeroEditor,
    sectionTitle: MemberSectionTitleEditor,
    categories: MemberCategoriesEditor,
  
  },
};

const availablePageTypes = computed(() => Object.keys(pageSchemas));


const addYear = () => {
  if (!newYear.value.trim()) return;

  currentSectionData.value.searchAndFilter.years.push(newYear.value.trim());
  newYear.value = '';
};
const removeYear = (index) => {
  currentSectionData.value.searchAndFilter.years.splice(index, 1);
};
const addCategory = () => {
  if (!newCategory.value.trim()) return;

  currentSectionData.value.searchAndFilter.categories.push(
    newCategory.value.trim()
  );
  newCategory.value = '';
};
const removeCategory = (index) => {
  currentSectionData.value.searchAndFilter.categories.splice(index, 1);
};

const addLatestEvent = () => {
  currentSectionData.value.latestEvents.items.push({
    id: Date.now(),
    title: '',
    category: '',
    date: '',
    time: '',
    location: '',
    frequency: '',
    description: '',
    image: '',
    registerLink: '',
  });
};

const removeLatestEvent = (index) => {
  currentSectionData.value.latestEvents.items.splice(index, 1);
};

const addPastEvent = () => {
  currentSectionData.value.pastEvents.items.push({
    title: '',
    category: '',
    date: '',
    theme: '',
    image: '',
  });
};

const removePastEvent = (index) => {
  currentSectionData.value.pastEvents.items.splice(index, 1);
};

const pages = ref([]);
const isLoading = ref(false);

const addStoryStat = () => {
  currentSectionData.value.stats.push({ label: '', value: '' });
};

const removeStoryStat = (index) => {
  currentSectionData.value.stats.splice(index, 1);
};

const createPage = async (pageName) => {
  try {
    const pageType = pageName.toLowerCase().trim().replace(/\s+/g, '-');
    const schema = structuredClone(pageSchemas[pageType]);

    const exists = pages.value.some((p) => p.page_type === pageType);
    if (exists) {
      console.log(`${pageName} page already exists`);
      return;
    }

    const payload = {
      page_type: pageType,
      name: pageName,
      status: 'draft',
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
    console.error('Failed to create page', e);
  }
};

const fetchPages = async () => {
  isLoading.value = true;
  try {
    const rawPages = await pagesApi.listPages();
    pages.value = rawPages.map((page) => {
      const schema = pageSchemas[page.page_type?.toLowerCase()] ?? {};

      const content = structuredClone(schema ?? {});

      if (
        schema &&
        Object.keys(schema).length > 0 &&
        page.content &&
        typeof page.content === 'object'
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
          .replace(/\s+/g, '-')}`,
        sections: content,
      };
    });
  } catch (e) {
    console.error('Failed to load pages', e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchPages);

const sectionKeys = computed(() => {
  if (!activePage.value?.sections) return [];
  return Object.keys(activePage.value.sections);
});

const newPageTitle = ref('');

const viewPage = (page) => {
  router.push({
    path: page.slug,
    query: { preview: 'true' },
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
    console.error('Image upload failed', e);
  }
};

const editPage = (page) => {
  activePage.value = page;
  activeSection.value = 'hero';
  currentView.value = 'editor';
};

const goBackToManager = () => {
  currentView.value = 'manager';
  activePage.value = null;
};

const deletePage = async (id) => {
  if (!confirm('Are you sure you want to delete this page?')) return;

  try {
    await pagesApi.deletePage(id);
    pages.value = pages.value.filter((page) => page.id !== id);
    fetchPages();
    console.log(`Deleted page with slug: ${id}`);
  } catch (e) {
    console.error('Failed to delete page', e);
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
    name: 'New Logo',
    src: url,
  });
};

const deleteLogo = (logoId) => {
  const section = activePage.value.sections['section1'];
  if (section && section.logos) {
    section.logos = section.logos.filter((logo) => logo.id !== logoId);
    console.log(`Deleted logo with ID: ${logoId}`);
  }
};

const addNewMetric = () => {
  const section = activePage.value.sections['section2'];
  if (section && section.metrics) {
    const newId = Math.max(...section.metrics.map((m) => m.id), 0) + 1;
    section.metrics.push({
      id: newId,
      label: `New Metric ${newId}`,
      color: 'text-gray-600',
      text: 'New detail text here.',
    });
  }
  console.log('Added new metric placeholder.');
};

const deleteMetric = (metricId) => {
  const section = activePage.value.sections['section2'];
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
    console.error('Failed to save section', e);
  }
};

const breadcrumbViewName = computed(() => {
  if (currentView.value === 'view') return `View: ${activePage.value.title}`;
  if (currentView.value === 'editor') return `Edit: ${activePage.value.title}`;
  return 'Page Manager';
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
        pageSchemas[activePage.value.page_type?.toLowerCase()]?.[
          activeSection.value
        ]
      );
  },
  { immediate: true }
);

const toggleVisibility = async (page) => {
  page.is_visible = !page.is_visible;
  try {
    await pagesApi.updatePageVisibility(
      page.page_type.toLowerCase(),
      page.is_visible
    );
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
                {{ page.is_visible ? 'VISIBLE' : 'HIDDEN' }}
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
              key.replace('section', 'Section ')
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
          <component
            v-if="activePage.page_type.toLowerCase() === 'about'"
            :is="componentMap.about?.[activeSection]"
            v-model="currentSectionData"
          />
          <component
            v-if="activePage.page_type.toLowerCase() === 'governance'"
            :is="componentMap.governance?.[activeSection]"
            v-model="currentSectionData"
          />
          <component
            v-if="activePage.page_type.toLowerCase() === 'latestnews'"
            :is="componentMap.latestnews?.[activeSection]"
            v-model="currentSectionData"
          />
          <component
            v-if="activePage.page_type.toLowerCase() === 'resources'"
            :is="componentMap.resources?.[activeSection]"
            v-model="currentSectionData"
          />
          <component
            v-if="activePage.page_type.toLowerCase() === 'events'"
            :is="componentMap.events?.[activeSection]"
            v-model="currentSectionData"
          />
          <component
            v-if="activePage.page_type.toLowerCase() === 'gallery'"
            :is="componentMap.gallery?.[activeSection]"
            v-model="currentSectionData"
          />
          <component
            v-if="activePage.page_type.toLowerCase() === 'getinvolved'"
            :is="componentMap.getinvolved?.[activeSection]"
            v-model="currentSectionData"
          />
          <component
            v-if="activePage.page_type.toLowerCase() === 'member'"
            :is="componentMap.member?.[activeSection]"
            v-model="currentSectionData"
          />

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
                <image-uploader v-model="currentSectionData.image.src" />

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
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type='color']::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type='color']::-webkit-color-swatch {
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
