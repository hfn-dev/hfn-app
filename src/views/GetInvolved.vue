<template>
  <div class="get-involved-page font-sans bg-white">
    <section class="bg-green-50 pt-10 pb-16">
      <div class="container mx-auto px-4 md:px-8">
        <div
          class="flex flex-col lg:flex-row items-start lg:items-center justify-between"
        >
          <div class="lg:w-1/2 mb-8 lg:mb-0">
            <h1
              class="text-4xl md:text-5xl font-bold text-gray-800 leading-tight"
            >
              <span class="text-green-700">Engage With HFN</span>
              <br />
              <span class="text-gray-900">Beyond Membership</span>
            </h1>
            <p class="mt-4 text-gray-600 max-w-lg">
              Partner with us to build a stronger, healthier Nigeria through
              innovation, advocacy, and collaboration. Together, we can make
              quality healthcare accessible to every citizen.
            </p>
          </div>

          <div
            class="lg:w-1/2 flex justify-center w-full h-64 sm:h-80 lg:h-96 relative"
          >
            <img
              :src="latest"
              alt="Get involved"
              class="object-cover w-full h-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>

    <main class="container mx-auto px-4 md:px-8 py-16">
      <h2 class="text-4xl font-bold text-gray-900 text-center mb-16">
        Get Involved
      </h2>

      <hr class="border-gray-200 mb-12" />
      <section class="mb-20">
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">Donate</h3>
        <p class="text-gray-600 mb-4 max-w-4xl">
          HFN welcomes donations to support our work advancing healthcare.
        </p>
        <p class="text-gray-600 mb-8 max-w-4xl">
          Every contribution helps enable us to share knowledge and foster
          collaboration amongst our global network of healthcare professionals,
          improving patient outcomes for better lives. Whether you’d like to
          make a one-off gift or set up a regular payment, it’s easy to donate
          online. Click the button to get started.
        </p>
        <div class="flex justify-center">
          <button
            @click="showDonateModal = true"
            class="px-8 py-3 bg-green-700 text-white rounded-xl shadow-lg hover:bg-green-800 transition duration-150 font-bold"
          >
            Donate Now
          </button>
        </div>
      </section>

      <section class="mb-16">
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">Partnerships</h3>
        <p class="text-gray-600 mb-4 max-w-4xl">
          Healthcare Federation Of Nigeria is independent of any
          government/political ideology, economic interest, religious
          affiliation, and is mainly funded by our membership and volitional
          donations from well-meaning Nigerians.
        </p>
        <p class="text-gray-600 mb-6 max-w-4xl">
          This vision is anchored on a "patient-centric" approach to policy
          advocacy which is our driving force. This is anchored on the simple
          conclusion that, if life is basic and fundamental, there is no reason
          why the patient should suffer due to a faulty health system. We are
          the voice for advocating better healthcare in Nigeria that human life.
        </p>
        <p class="text-gray-600 max-w-4xl font-semibold">
          Our Partners support HFN in the medium and long term via our specially
          designed offerings, including:
        </p>
      </section>

      <section class="mb-20">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="border rounded-lg py-6 shadow-md bg-white hover:shadow-xl transition duration-300"
          >
            <h4 class="text-xl font-bold text-gray-900 mb-3 text-center">
              Event Sponsorship
            </h4>
            <p
              class="text-gray-600 text-sm mb-6 h-52 overflow-hidden bg-[#E87A1814] p-3"
            >
              HFN hosts over 10 events every year, attracting top policy makers,
              both physical and online. Sponsors can select from our various
              events and external delegates via different packages. This is a
              unique opportunity to identify opportunities that align with your
              brand.
              <span class="block mt-2 font-medium"
                >To learn more about this programme, please contact our
                partnership team</span
              >
            </p>
            <div class="flex justify-center">
              <button
                class="px-6 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 transition duration-150 text-sm font-semibold"
              >
                Contact Us
              </button>
            </div>
          </div>

          <div
            class="border rounded-lg py-6 shadow-md bg-white hover:shadow-xl transition duration-300"
          >
            <h4 class="text-xl font-bold text-gray-900 mb-3 text-center">
              Exhibitor Stands
            </h4>
            <p
              class="text-gray-600 text-sm mb-6 h-52 overflow-hidden bg-[#E87A1814] p-3"
            >
              This is an excellent way to showcase your brand directly to
              healthcare providers, key decision-makers and stakeholders within
              the healthcare sector. At various events, we can also offer
              exclusive packages.
              <span class="block mt-2 font-medium"
                >For further details, contact our team</span
              >
            </p>
            <div class="flex justify-center">
              <button
                class="px-6 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 transition duration-150 text-sm font-semibold"
              >
                Contact Us
              </button>
            </div>
          </div>

          <div
            class="border rounded-lg py-6 shadow-md bg-white hover:shadow-xl transition duration-300"
          >
            <h4 class="text-xl font-bold text-gray-900 mb-3 text-center">
              Advertisements
            </h4>
            <p
              class="text-gray-600 text-sm mb-6 h-52 overflow-hidden bg-[#E87A1814] p-3"
            >
              Our Quarterly Newsletter is distributed to all our members and to
              various categories of healthcare professions. We accept
              advertisements ranging from a half page to double page spreads,
              subject to editorial approval by the secretary.
              <span class="block mt-2 font-medium"
                >For pricing, contact our team.</span
              >
            </p>
            <div class="flex justify-center">
              <button
                class="px-6 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 transition duration-150 text-sm font-semibold"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="py-10 px-10 rounded-3xl bg-[#F2F9F3]">
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">Volunteer</h3>
        <p class="text-gray-600 mb-4 max-w-4xl">
          Whether in logistics, community outreach, or event support, there’s
          always a role for you.
        </p>
        <p class="text-gray-600 mb-8 max-w-4xl">
          Join our network of passionate volunteers working together to improve
          healthcare outcomes in Nigeria.
        </p>
        <div class="flex justify-center">
          <button
            class="px-8 py-3 bg-green-700 text-white rounded-xl shadow-lg hover:bg-green-800 transition duration-150 font-bold"
          >
            Sign Up Now
          </button>
        </div>
      </section>
    </main>
  </div>
  <div
    v-if="showDonateModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
  >
    <div class="bg-white w-full max-w-2xl rounded-2xl p-6 relative">
      <button
        @click="showDonateModal = false"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      <h3 class="text-2xl font-bold text-gray-900 mb-2 text-center">
        What would you like to donate for?
      </h3>
      <p class="text-gray-600 text-center mb-6">
        Choose how you want your contribution to make an impact.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          v-for="option in donationOptions"
          :key="option.key"
          @click="selectDonation(option)"
          class="border rounded-xl p-4 text-left hover:border-green-700 hover:bg-green-50 transition"
        >
          <h4 class="font-semibold text-gray-900 mb-1">
            {{ option.title }}
          </h4>
          <p class="text-sm text-gray-600">
            {{ option.description }}
          </p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import latest from "@/assets/latest_news.png";

const showDonateModal = ref(false);

const donationOptions = [
  {
    key: "emergency",
    title: "Emergency Healthcare Fund",
    description: "Support rapid response and lifesaving emergency care.",
  },
  {
    key: "training",
    title: "Medical Training & Capacity Building",
    description: "Help train healthcare workers and first responders.",
  },
  {
    key: "research",
    title: "Research & Policy Advocacy",
    description: "Support evidence-based healthcare reforms.",
  },
  {
    key: "general",
    title: "General Donation",
    description: "Support all HFN programs where the need is greatest.",
  },
];

const selectDonation = (option) => {
  console.log("Selected donation:", option.key);
  showDonateModal.value = false;
};
</script>   
