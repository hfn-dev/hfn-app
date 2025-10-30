<script setup>
// import hero from "@/assets/hero.png";
// import section1 from "@/assets/section1.png";
// import section2 from "@/assets/section2.png";
// import section3 from "@/assets/section3.png";
// import section5 from "@/assets/section5.png";
// import section6 from "@/assets/section6.png";
import { useRouter } from "vue-router";

import { computed, ref } from "vue";
import EditorSidebar from "./EditorSidebar.vue";

const currentView = ref("manager");
const activePage = ref(null);
const activeSection = ref("hero");
const router = useRouter();

const pages = ref([
  {
    id: 1,
    slug: "/",
    title: "Home",
    isVisible: true,
    sections: {
      hero: {
        name: "Hero Section",
        title: "Health Advocacy Partnership, Leadership",
        subText:
          "Healthcare Federation of Nigeria is uniting healthcare providers, insurers, and tech leaders to drive transformation. Gain cutting-edge certifications, seamlessly manage your membership, unlock exclusive resources and connect with the sectors most influential network.",
        cta: "Join the Coalition",
        imagePlaceholder:
          "https://placehold.co/400x250/F0FDF4/1e4040?text=Image+Uploaded",
        backgroundColor: "#F2E9F3",
        previewUrl: "https://res.cloudinary.com/djoacytdk/image/upload/v1761825555/map-DalHobDl_lrlx11.png",
      },
      section1: {
        name: "Section 1",
        title: "Health Guardians",
        logos: [
          {
            id: 101,
            name: "Mzor",
            src: "https://placehold.co/80x40/E5E7EB/4B5563?text=Mzor",
          },
          {
            id: 102,
            name: "Oando",
            src: "https://placehold.co/80x40/E5E7EB/4B5563?text=Oando",
          },
          {
            id: 103,
            name: "Health Policy",
            src: "https://placehold.co/80x40/E5E7EB/4B5563?text=Health+Policy",
          },
          {
            id: 104,
            name: "Academy",
            src: "https://placehold.co/80x40/E5E7EB/4B5563?text=Academy",
          },
          {
            id: 105,
            name: "Bridge Clinic",
            src: "https://placehold.co/80x40/E5E7EB/4B5563?text=BridgeClinic",
          },
          {
            id: 106,
            name: "PharmAccess",
            src: "https://placehold.co/80x40/E5E7EB/4B5563?text=PharmAccess",
          },
        ],
        previewUrl: "https://res.cloudinary.com/djoacytdk/image/upload/v1761825555/map-DalHobDl_lrlx11.png",
      },
      section2: {
        name: "Section 2",
        title: "Our HFN Story",
        subText:
          "The Healthcare Federation of Nigeria (HFN) is the umbrella body for private healthcare stakeholders in Nigeria, representing the interests of health professionals, companies, investors, associations, and institutions. HFN provides members with access to advocacy platforms, strategic partnerships, knowledge sharing, and investment opportunities aimed at building a stronger, more resilient health system.",
        imagePlaceholder:
          "https://placehold.co/300x200/F0F9FF/1D4ED8?text=Section+2+Image",
        altText: "A group of people collaborating at a healthcare conference.",
        cta: "Join the Coalition",
        metrics: [
          {
            id: 201,
            label: "Vision",
            color: "text-green-600",
            text: "To be the voice of private healthcare in Nigeria.",
          },
          {
            id: 202,
            label: "Projects Impact",
            color: "text-orange-600",
            text: "Driving key policy changes through partnerships.",
          },
          {
            id: 203,
            label: "Regulatory Control",
            color: "text-blue-600",
            text: "Lobbying for fair and clear industry regulations.",
          },
          {
            id: 204,
            label: "Expert Synapse",
            color: "text-purple-600",
            text: "Networking events and knowledge exchange programs.",
          },
        ],
        previewUrl: "https://res.cloudinary.com/djoacytdk/image/upload/v1761825555/map-DalHobDl_lrlx11.png",
      },
      section3: {
        name: "Section 3",
        primaryNews: {
          title: "HFN News",
          subText:
            "Our “Healthy Mothers, Healthy Nation” initiative focuses on maternal and child healthcare through accessible antenatal services, nutrition education, and support for safe deliveries in underserved areas. Be part of the movement to reduce maternal mortality in Nigeria.",
          imagePlaceholder:
            "https://placehold.co/300x200/FFFBEB/D97706?text=Primary+News+Image",
          metadate: "Comments",
          date: "2025-10-20",
          contentType: "Programs & Initiatives",
          cta: "Read More",
        },
        secondaryNews: [
          {
            id: 301,
            title: "Other News Content",
            content:
              "Public health experts have reported a rise in seasonal flu cases.",
          },
          {
            id: 302,
            title: "Other News Content",
            content:
              " We advise all residents to get vaccinated, maintain proper hygiene, and avoid self-medication.",
          },
          {
            id: 303,
            title: "Other News Content",
            content:
              "HFN extends heartfelt appreciation to its Health Guardians.",
          },
        ],
        previewUrl: "https://res.cloudinary.com/djoacytdk/image/upload/v1761825555/map-DalHobDl_lrlx11.png",
      },
      section4: {
        name: "Section 4",
        teamMember: {
          title: "HFN Executives",
          name: "Mrs. Njide Ndili",
          position: "President",
          imagePlaceholder:
            "https://placehold.co/200x250/E0F2F7/0284C7?text=Team+Photo",
        },
        previewUrl: "https://res.cloudinary.com/djoacytdk/image/upload/v1761825555/map-DalHobDl_lrlx11.png",
      },
      section5: {
        name: "Section 5",
        title: "Frequently Asked Questions (FAQ)",
        introText:
          "The Healthcare Federation of Nigeria is uniting healthcare providers, insurers, and tech leaders to drive.",
        faqs: [
          {
            id: 501,
            question:
              "Question 1: What is the Healthcare Federation of Nigeria?",
            response:
              "The Healthcare Federation of Nigeria (HFN) is the umbrella body for private healthcare stakeholders in Nigeria, representing the interests of health professionals, companies, investors, associations, and institutions.",
          },
          {
            id: 502,
            question: "Question 2: Who are the members of the HFN?",
            response:
              "Our members include private hospitals, clinics, diagnostic centers, pharmaceutical companies, medical equipment suppliers, health insurance providers, and other key players in the Nigerian healthcare ecosystem.",
          },
          {
            id: 503,
            question: "Question 3: How can I become a member?",
            response:
              "Membership is open to all legitimate private sector organizations and individuals operating in the healthcare space in Nigeria. You can apply through our online portal and a team member will follow up.",
          },
          {
            id: 504,
            question: "Question 4: What are the benefits of joining HFN?",
            response:
              "Benefits include access to advocacy platforms, strategic partnerships, knowledge sharing, networking events, and investment opportunities aimed at building a stronger, more resilient health system.",
          },
        ],
        previewUrl: "https://res.cloudinary.com/djoacytdk/image/upload/v1761825555/map-DalHobDl_lrlx11.png",
      },
    },
  },
  {
    id: 2,
    slug: "/about",

    title: "About Us",
    isVisible: true,
    sections: {
      hero: { name: "Hero Section", title: "About Us Intro", subText: "..." },
    },
  },
  {
    id: 3,
    slug: "/blog",

    title: "Latest Updates",
    isVisible: true,
    sections: {
      hero: { name: "Hero Section", title: "Latest News", subText: "..." },
    },
  },
  {
    id: 4,
    slug: "/membership",

    title: "Member Area",
    isVisible: true,
    sections: {
      hero: { name: "Hero Section", title: "Members Only", subText: "..." },
    },
  },
  {
    id: 5,
    slug: "/contact",

    title: "Contact Us",
    isVisible: true,
    sections: {
      hero: { name: "Hero Section", title: "Get in Touch", subText: "..." },
    },
  },
]);

const sectionKeys = computed(() =>
  Object.keys(activePage.value?.sections || pages.value[0].sections)
);

const newPageTitle = ref("");

const viewPage = (page) => {
  const path = page.slug ? `/${page.slug}` : "/";
  router.push({ path });
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

const currentSectionData = computed(() => {
  if (activePage.value && activePage.value.sections) {
    return activePage.value.sections[activeSection.value] || {};
  }
  return {};
});

const addNewSection = () => {
  console.log("Simulating 'Add New Section' action.");
};

const addNewLogo = () => {
  const section = activePage.value.sections["section1"];
  if (section && section.logos) {
    const newId = Math.max(...section.logos.map((l) => l.id), 0) + 1;
    section.logos.push({
      id: newId,
      name: `New Client ${newId}`,
      src: `https://placehold.co/80x40/9CA3AF/374151?text=New+Logo`,
    });
  }
  console.log("Added new logo placeholder.");
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

const saveChanges = () => {
  console.log(`Changes saved for page: ${activePage.value.title}`);
  goBackToManager();
};

const breadcrumbViewName = computed(() => {
  if (currentView.value === "view") return `View: ${activePage.value.title}`;
  if (currentView.value === "editor") return `Edit: ${activePage.value.title}`;
  return "Page Manager";
});

const toggleVisibility = (page) => {
  page.isVisible = !page.isVisible;
  console.log(`Page '${page.title}' visibility set to: ${page.isVisible}`);
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

        <!-- <div
          class="mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div class="flex items-center space-x-4">
            <input
              v-model="newPageTitle"
              type="text"
              placeholder="Add New Page (e.g., 'New Page Title')"
              class="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-150"
            />
            <button
              @click="addPage"
              :disabled="!newPageTitle.trim()"
              class="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 shadow-md"
            >
              Add Page
            </button>
          </div>
        </div> -->

        <div class="space-y-3">
          <div
            v-for="page in pages"
            :key="page.id"
            class="flex items-center justify-between bg-white p-4 rounded-xl shadow-lg border border-gray-100 transform hover:shadow-xl hover:scale-[1.005] transition duration-200"
          >
            <div class="flex items-center space-x-3">
              <span
                class="px-3 py-1 text-xs font-semibold rounded-full min-w-[70px] text-center cursor-pointer"
                :class="
                  page.isVisible
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                "
                @click="toggleVisibility(page)"
                title="Click to toggle visibility"
              >
                {{ page.isVisible ? "VISIBLE" : "HIDDEN" }}
              </span>
              <span class="text-gray-700 font-medium">{{ page.title }}</span>
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
          <!-- <button
            @click="addNewSection"
            class="bg-green-800 text-white px-4 py-2 rounded-2xl hover:bg-green-900 transition duration-200 shadow-md flex items-center space-x-2"
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
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add New Section</span>
          </button> -->
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
              :src="currentSectionData.previewUrl || hero"
              alt="Section Preview"
              class="w-3/4 rounded-lg shadow-md"
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

          <div v-if="activeSection === 'hero'">
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
                    v-model="currentSectionData.cta"
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
