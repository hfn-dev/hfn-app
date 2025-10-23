<template>
  <div class="flex h-screen bg-gray-50">
    <AdminSidebar />

    <div class="flex-1 flex flex-col overflow-hidden relative">
      <header class="p-6 bg-white border-t border-gray-200">
        <div class="text-sm text-gray-500">
          <span class="hover:underline cursor-pointer">Home</span>
          &gt;
          <span class="font-semibold text-gray-800">
            Membership Subscription
          </span>
        </div>
      </header>

      <main
        class="flex-1 overflow-x-hidden overflow-y-auto bg-white p-6 sm:p-10"
      >
        <h1 class="text-3xl font-bold text-center mb-10 text-gray-800">
          Membership Subscription
        </h1>

        <div
          class="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-100"
        >
          <p class="text-center text-gray-600 mb-6">
            Kindly confirm your subscription. You will be redirected to our
            payment gateway.
          </p>

          <div class="flex justify-center space-x-4 mb-8">
            <button
              v-for="type in membershipTypes"
              :key="type.title"
              @click="selectedType = type.title"
              :class="[ 
                'px-6 py-2 rounded-lg font-semibold transition-all duration-300 border-2 relative',
                selectedType === type.title
                  ? 'active-tab-curve'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#006633]'
              ]"
            >
              {{ type.title }}
            </button>
          </div>

          <div class="relative p-6 border-2 border-gray-200 rounded-lg bg-white">
            <div class="text-center">
              <h2 class="text-2xl font-bold mb-4 text-gray-800">
                {{ selectedDetail.title }}
              </h2>
              <p class="text-gray-600 mb-6">
                {{ selectedDetail.description }}
              </p>
              <p class="text-2xl font-bold text-[#006633] mb-6">
                {{ selectedDetail.price }}
              </p>
              <button
                class="flex items-center justify-center mx-auto px-6 py-3 bg-[#006633] text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-colors"
              >
                Proceed to Payment
                <svg
                  class="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import AdminSidebar from "@/components/layout/AdminSidebar.vue";
import { computed, reactive, ref } from "vue";

const membershipTypes = reactive([
  {
    title: "Corporate",
    description: "For locally registered healthcare businesses.",
    price: "₦200,000 per year.",
  },
  {
    title: "Multinational",
    description: "For international healthcare organizations.",
    price: "₦500,000 per year.",
  },
  {
    title: "Association",
    description: "For registered healthcare professional associations.",
    price: "₦150,000 per year.",
  },
  {
    title: "Diaspora",
    description: "For healthcare professionals residing outside the country.",
    price: "₦50,000 per year.",
  },
]);

const selectedType = ref("Corporate");

const selectedDetail = computed(() =>
  membershipTypes.find((type) => type.title === selectedType.value)
);
</script>

<style scoped>
/* --- REMOVE decorative green corner curves --- */
/* .detail-card-wrapper::before,
.detail-card-wrapper::after {
  content: none !important;
} */

/* --- ACTIVE TAB WITH GRAY CURVED OUTLINE --- */
.active-tab-curve {
  background-color: #006633 !important;
  color: white !important;
  border: none !important;
  padding: 10px 24px;
  border-radius: 8px;
  z-index: 1;
}

.active-tab-curve::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  background-color: transparent;
  z-index: -1;
}
</style>
