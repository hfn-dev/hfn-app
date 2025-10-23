<template>
  <div class="flex min-h-screen bg-gray-50">
    <AdminSidebar />

    <div class="flex-1 p-8 bg-white flex flex-col items-center overflow-auto">
      <div class="text-center mb-10 max-w-lg mx-auto">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          What interests you?
        </h1>
        <p class="text-gray-600">
          Select up to four categories you're into. We'll help you find great
          things to learn.
        </p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl">
        <div
          v-for="category in categories"
          :key="category.title"
          @click="toggleSelection(category.title)"
          :class="[
            'category-card-wrapper cursor-pointer transition-transform duration-200',
            selectedCategories.includes(category.title)
              ? 'scale-105 shadow-xl'
              : 'hover:scale-[1.03]',
          ]"
        >
          <div
            :class="[
              'category-card p-2 rounded-xl bg-white border-2 relative overflow-hidden',
              selectedCategories.includes(category.title)
                ? 'border-green-500'
                : 'border-gray-100',
            ]"
          >
            <div class="h-40 rounded-t-lg bg-gray-100 mb-2">
              <img
                :src="category.image"
                :alt="category.title"
                class="w-full h-full object-cover rounded-t-lg"
              />
            </div>

            <p class="text-center text-lg font-semibold py-2">
              {{ category.title }}
            </p>

            <div
              v-if="selectedCategories.includes(category.title)"
              class="absolute top-3 right-3 text-green-500"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 flex space-x-6">
        <button
          class="px-8 py-3 bg-white text-gray-700 font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-md"
        >
          Skip
        </button>
        <button
          @click="finishSelection"
          class="px-8 py-3 bg-[#006633] text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import aboutImage from '@/assets/interest.png';
import AdminSidebar from '@/components/layout/AdminSidebar.vue';
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const categories = [
  {
    title: "Paediatrics",
    image: aboutImage,
  },
  {
    title: "Gynaecology",
    image: aboutImage,
  },
  {
    title: "Insurance",
    image: aboutImage,
  },
  {
    title: "Pharmacy",
    image: aboutImage,
  },
  {
    title: "Business",
    image: aboutImage,
  },
  {
    title: "Business",
    image: aboutImage,
  },
  {
    title: "Business",
    image: aboutImage,
  },
  {
    title: "Business",
    image: aboutImage,
  },
];

const selectedCategories = ref([]);

const toggleSelection = (categoryTitle) => {
  const index = selectedCategories.value.indexOf(categoryTitle);
  if (index > -1) {
    selectedCategories.value.splice(index, 1);
  } else if (selectedCategories.value.length < 4) {
    selectedCategories.value.push(categoryTitle);
  }
};

const finishSelection = () => {
  localStorage.setItem("hasSelectedInterests", "true");
  router.push("/admin/dashboard");
};
</script>

<style scoped>
.category-card-wrapper {
  background-color: #f7fffb;
  border-radius: 1.5rem;
  padding: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
.category-card {
  border-radius: 0.75rem;
  padding: 0;
}

.category-card .h-40 {
  background-color: #f7fffb;
  border-radius: 0.5rem;
}
</style>