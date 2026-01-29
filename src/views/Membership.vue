<script setup>
import paymentApi from "@/api/payments";
import handsJoining from "@/assets/handsJoining.jpg";
import logo from "@/assets/logo.png";
import { computed, ref } from "vue";
import { useRouter } from vue-router;

const router = useRouter()  
const isSubmitting = ref(false);

// const joinNow = async () => {
//   if (isSubmitting.value) return;

//   isSubmitting.value = true;

//   try {
//     const payload = {
//       payment_type: "subscription",
//       subscription_id: 0,
//       course_id: 0,
//       payment_method: "cash",
//     };

//     const response = await paymentApi.memberPayment(payload);

//     console.log("Payment intent created:", response);
//   } catch (error) {
//     console.error("Failed to initiate membership payment", error);
//   } finally {
//     isSubmitting.value = false;
//   }
// };

const joinNow = () => {
  router.push("/register");
};  

const tabs = [
  {
    id: "policy",
    name: "Policy Influence and Advocacy.",
    titleHtml: "Policy Influence <br />and Advocacy.",
    color: "default",
    contentHtml: `
      <p>
        <strong>Representation in Policy and Decision-Making:</strong>
        Members are represented in high-level national health policy
        discussions through HFN’s recognized advocacy platforms.
      </p>
      <p>
        <strong>Policy Advocacy:</strong> As the officially recognized
        body for the private health sector, HFN maintains close rapport
        with government policymakers while ensuring constant feedback on
        critical health matters.
      </p>
      <p>
        <strong>Improvement of the Operating Environment:</strong> HFN
        actively engages in lobbying and advocacy to create a more
        enabling and sustainable environment for healthcare operations.
      </p>
      <p>
        <strong>Opportunity to Shape the Future:</strong> Members enjoy
        ongoing opportunity to contribute to shaping the policies and
        frameworks that determine the fortunes of Nigeria’s healthcare
        sector.
      </p>
    `,
  },
  {
    id: "collaboration",
    name: "Collaboration, Networking, and Exposure.",
    titleHtml: "Collaboration, <br />Networking, <br />and Exposure.",
    color: "orange",
    contentHtml: `
      <p>
        <strong>Opportunities for Collaboration:</strong> Through its
        diverse membership base, HFN promotes sectoral, inter-sectoral,
        and multi-stakeholder collaboration across the healthcare value
        chain.
      </p>
      <p>
        <strong>Networking with Industry Leaders:</strong> Members enjoy
        access to exclusive networking events such as dinners,
        luncheons, and business forums with public and private industry
        policymakers, and international partners.
      </p>
      <p>
        <strong>Linkages and Business Development:</strong> Members gain
        access to both local and international partnerships, with
        referrals through business/private sector groups such as LCCI,
        NASIMA, and the Nigeria-South Africa Chamber of Commerce.
      </p>
      <p>
        <strong>Enhanced Access to Investment Opportunities:</strong>
        Members benefit from linkages to funding and investment
        institutions for health innovation and expansion.
      </p>
      <p>
        <strong>Invitation to Field Trips and International Programs:</strong>
        Participate in study tours, exchange programs, and global health
        forums.
      </p>
    `,
  },
  {
    id: "knowledge",
    name: "Information, Knowledge, and Capacity Development.",
    titleHtml: "Information, Knowledge, <br /> and Capacity Development.",
    color: "green",
    contentHtml: `
      <p>
        <strong>Access to Data and Sector Information:</strong> Members
        have exclusive access to research data, policy briefs, and
        insights on healthcare trends and opportunities.
      </p>
      <p>
        <strong>Information on Policies and Regulations:</strong>
        Receive timely updates on emerging policies and how they impact
        members’ businesses.
      </p>
      <p>
        <strong>Subsidized Training and Conferences:</strong> Members
        enjoy discounted participation in HFN conferences, training
        programs, and workshops.
      </p>
      <p>
        <strong>Right of First Refusal:</strong> Members receive
        priority consideration for opportunities and initiatives within
        the Federation.
      </p>
    `,
  },
  {
    id: "digital",
    name: "Digital and Media Visibility.",
    titleHtml: "Digital and <br />Media Visibility.",
    color: "orange",
    contentHtml: `
      <p>
        <strong>Membership Access to Website:</strong> Fully-subscribed
        members have unlimited access to restricted sections of the HFN
        website, containing premium content and opportunities.
      </p>
      <p>
        <strong>Increased Publicity:</strong> Registered members’
        profiles are published on the HFN website, providing visibility
        to potential partners and clients.
      </p>
      <p>
        <strong>Advertisement Opportunities:</strong> Members can
        advertise products and services on the HFN website and through
        HFN communication channels.
      </p>
      <p>
        <strong>International Exposure:</strong> Through HFN’s
        partnerships with international bodies such as the IFC and other
        development agencies, members gain global recognition and
        visibility.
      </p>
    `,
  },
  {
    id: "support",
    name: "Member Support, Benefits, and Privileges.",
    titleHtml: "Member Support, Benefits, <br /> and Privileges.",
    color: "green",
    contentHtml: `
      <p>
        <strong>HFN Support and Endorsement:</strong> Members benefit
        from the Federation’s credibility, brand recognition, and
        endorsements.
      </p>
      <p>
        <strong>Access to Discounted Services:</strong> Enjoy exclusive
        discounts on products and services offered by fellow members and
        partner organizations.
      </p>
      <p>
        <strong>Membership Card:</strong> Members receive an official
        HFN Membership Card which grants access to discounts and
        benefits.
      </p>
      <p>
        <strong>Job Offers and Recruitment Support:</strong> Members can
        access job postings, recruitment adverts, and downloadable
        resumes from the HFN database.
      </p>
    `,
  },
];

const activeTab = ref(tabs[0].id);
const searchQuery = ref("");
const members = ref([
  "ABIOLA MORUF TAJUDEENA",
  "ABIOLA MORUF TAJUDEENB",
  "ABIOLA MORUF TAJUDEENC",
  "ABIOLA MORUF TAJUDEEND",
  "ANIEBE SOMTO EMELDAA",
  "ANIEBE SOMTO EMELDAB",
  "ANIEBE SOMTO EMELDAC",
  "AROGUNDADE IFEOLUWAN THEOPHILUSA",
  "AROGUNDADE IFEOLUWAN THEOPHILUSB",
  "ATAGUBA FRANKLINA",
  "ATAGUBA FRANKLINB",

  // second column
  "ABIOLA MORUF TAJUDEENE",
  "ABIOLA MORUF TAJUDEENF",
  "ABIOLA MORUF TAJUDEENG",
  "ANIEBE SOMTO EMELDAD",
  "ANIEBE SOMTO EMELDAE",
  "ANIEBE SOMTO EMELDAF",
  "AROGUNDADE IFEOLUWAN THEOPHILUSC",
  "AROGUNDADE IFEOLUWAN THEOPHILUSD",
  "AROGUNDADE IFEOLUWAN THEOPHILUSE",
  "AROGUNDADE IFEOLUWAN THEOPHILUSF",
  "ATAGUBA FRANKLINC",

  // third column
  "AROGUNDADE IFEOLUWAN THEOPHILUSG",
  "AROGUNDADE IFEOLUWAN THEOPHILUSH",
  "AROGUNDADE IFEOLUWAN THEOPHILUSI",
  "AROGUNDADE IFEOLUWAN THEOPHILUSJ",
  "AROGUNDADE IFEOLUWAN THEOPHILUSK",
]);

const selectedMember = ref(null);
const showDialog = ref(false);

// Filtered search
const filteredMembers = computed(() => {
  if (!searchQuery.value) return members.value;
  return members.value.filter((m) =>
    m.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

function openDialog(member, event) {
  selectedMember.value = member;
  showDialog.value = true;
}

function closeDialog() {
  showDialog.value = false;
}

const categories = ref([
  {
    name: "Individual",
    description: "Ideal for private and insurance companies",
    plans: [
      {
        title: "Individual ",
        price: "₦50,000 per year",
        audience: "Ideal for private companies",
        benefits: [
          "Advocacy/Public-Private Engagement project",
          "Networking/High Profile Breakfast Meetings",
          "Access to Finance",
          "Promotion & Brand Visibility",

          "Access to Industry Information for Members Only",
          "Partnership & Engagement with International Organizations",
        ],
      },
    ],
  },
  {
    name: "Corporate",
    description: "Ideal for private and insurance companies",
    plans: [
      {
        title: "Corporate ",
        price: "₦200,000 per year",
        audience: "Ideal for private companies",
        benefits: [
          "Advocacy/Public-Private Engagement project",
          "Networking/High Profile Breakfast Meetings",
          "Access to Finance",
          "Promotion & Brand Visibility",

          "Access to Industry Information for Members Only",
          "Partnership & Engagement with International Organizations",
        ],
      },
    ],
  },
  {
    name: "Multinational",
    description: "Designed for international and cross-border organizations",
    plans: [
      {
        title: "Global Partner ",
        price: "₦750,000 per year",
        audience: "Ideal for international firms",
        benefits: [
          "Advocacy/Public-Private Engagement project",
          "Networking/High Profile Breakfast Meetings",
          "Access to Finance",
          "Promotion & Brand Visibility",

          "Access to Industry Information for Members Only",
          "Partnership & Engagement with International Organizations",
        ],
      },
    ],
  },
  {
    name: "Association",
    description: "For registered professional or trade associations",
    plans: [
      {
        title: "Association Member",
        price: "₦150,000 per year",
        audience: "Ideal for professional bodies",
        benefits: [
          "Advocacy/Public-Private Engagement project",
          "Networking/High Profile Breakfast Meetings",
          "Access to Finance",
          "Promotion & Brand Visibility",
          "Access to Industry Information for Members Only",
          "Partnership & Engagement with International Organizations",
        ],
      },
    ],
  },
  {
    name: "Diaspora",
    description:
      "For professionals or organizations abroad supporting local development",
    plans: [
      {
        title: "Diaspora Partner",
        price: "$50 per year",
        audience: "Ideal for Nigerians in diaspora",
        benefits: [
          "Advocacy/Public-Private Engagement project",
          "Networking/High Profile Breakfast Meetings",
          "Access to Finance",
          "Promotion & Brand Visibility",

          "Access to Industry Information for Members Only",
          "Partnership & Engagement with International Organizations",
        ],
      },
    ],
  },
]);

const activeCategory = ref(categories.value[0]);
const activePlan = computed(() => activeCategory.value.plans[0]);
</script>

<template>
  <section class="bg-[#F2F9F3] py-16 lg:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
        <div class="mb-12 lg:mb-0">
          <h2
            class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4"
          >
            <span class="text-orange-500 block"
              >Unite. Influence. Transform.</span
            >
            <span class="text-green-700 block mt-2"
              >A digital coalition driving policy and innovation.</span
            >
          </h2>
          <p class="mt-6 text-lg text-gray-600 max-w-xl">
            Within the professional network, HFN offers access to a secure
            member directory that shapes industry dialogue, and tap into
            exclusive, high-impact collaborations.
          </p>
        </div>

        <div class="flex justify-center lg:justify-end">
          <div
            class="relative w-[320px] h-[240px] sm:w-[400px] sm:h-[300px] lg:w-[500px] lg:h-[375px] rounded-[30px] overflow-hidden shadow-2xl"
          >
            <img
              :src="handsJoining"
              alt="Diverse hands joining in a heart shape, symbolizing unity and healthcare"
              class="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="py-10 sm:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        class="text-3xl px-4 py-4 sm:px-6 rounded-2xl border-2 border-green-100 bg-white shadow-md sm:text-4xl font-serif font-extrabold text-gray-900 text-center mb-12"
      >
        Membership Categories
      </h2>

      <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div class="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-8">
          <button
            v-for="category in categories"
            :key="category.name"
            @click="activeCategory = category"
            :class="[
              'px-5 py-2 rounded-lg font-medium transition duration-200 ease-in-out whitespace-nowrap',
              activeCategory.name === category.name
                ? 'bg-green-700 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-green-700 hover:text-green-700',
            ]"
          >
            {{ category.name }}
          </button>
        </div>

        <div
          class="p-6 sm:p-10 rounded-[30px] border-2 border-green-200 bg-white shadow-xl flex flex-col gap-6"
        >
          <div class="text-center mb-6">
            <p class="text-3xl font-extrabold text-green-700">
              {{ activePlan.price }}
            </p>
          </div>

          <h3 class="text-2xl font-bold text-center text-gray-900 -mt-4">
            {{ activeCategory.name }} Membership
          </h3>

          <div class="benefits-section p-6 rounded-xl">
            <h5
              class="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-300"
            >
              Benefits to Members
            </h5>
            <ul class="space-y-3 text-gray-700 text-base">
              <li
                v-for="(benefit, i) in activePlan.benefits"
                :key="i"
                class="flex items-start"
              >
                <svg
                  class="w-5 h-5 mr-3 text-green-700 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-gray-700">{{ benefit }}</span>
              </li>
            </ul>
          </div>

          <div class="text-center mt-4">
            <button
              @click="joinNow"
              :disabled="isSubmitting"
              class="inline-flex items-center justify-center px-10 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-green-800 hover:bg-green-900 transition transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span v-if="!isSubmitting">Join Now</span>
              <span v-else>Processing...</span>
            </button>
          </div>
        </div>
      </div>
      <section class="bg-white">
        <div class="max-w-6xl mx-auto px-6">
          <h2 class="text-2xl font-semibold text-gray-800 mb-10">
            HFN Members enjoy…
          </h2>

          <div
            class="flex flex-wrap justify-center md:justify-start gap-4 mb-10"
          >
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'relative w-[200px] h-[200px] p-3 shadow-sm flex flex-col justify-center text-left transition-all duration-300 transform',
                'rounded-tr-[30px] rounded-bl-[30px]',

                tab.color === 'green' || tab.color === 'default'
                  ? 'bg-green-50'
                  : 'bg-[#E87A1814]',

                activeTab === tab.id
                  ? 'ring-2 ring-offset-2 scale-105 shadow-md ' +
                    (tab.color === 'green' || tab.color === 'default'
                      ? 'ring-green-700'
                      : 'ring-orange-500')
                  : 'hover:shadow-md hover:scale-[1.02]',
              ]"
            >
              <div
                :class="[
                  'absolute top-0 right-0 w-1 h-full rounded-tr-[30px] rounded-br-none',
                  tab.color === 'green' || tab.color === 'default'
                    ? 'bg-green-700'
                    : 'bg-orange-500',
                ]"
              ></div>

              <div class="relative z-10 pr-2">
                <div class="mb-2">
                  <img
                    :src="logo"
                    alt="Logo Icon"
                    class="inline-block w-8 h-8 object-contain opacity-75"
                  />
                </div>

                <span
                  :class="[
                    'font-bold text-lg leading-snug',
                    tab.color === 'green' || tab.color === 'default'
                      ? 'text-green-800'
                      : 'text-orange-800',
                  ]"
                  v-html="tab.titleHtml"
                >
                </span>
              </div>
            </button>
          </div>

          <div v-for="tab in tabs" :key="tab.id">
            <div v-if="activeTab === tab.id">
              <div
                class="text-gray-700 text-xl leading-relaxed space-y-5 px-6 py-4 border-l-4"
                :class="[
                  tab.color === 'green' || tab.color === 'default'
                    ? 'border-green-700'
                    : 'border-orange-500',
                ]"
                v-html="tab.contentHtml"
              ></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.benefits-section {
  background-color: #e87a1814;
  border-radius: 0.75rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
