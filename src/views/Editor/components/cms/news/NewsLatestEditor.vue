<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: Object,
});

const emit = defineEmits(["update:modelValue"]);

const currentSectionData = ref({
  filters: [],
  articles: [],
  ...props.modelValue,
});

const newFilter = ref("");

watch(
  () => props.modelValue,
  (val) => {
    currentSectionData.value = {
      filters: [],
      articles: [],
      ...(val || {}),
    };
  },
  { immediate: true }
);

watch(
  currentSectionData,
  (val) => {
    emit("update:modelValue", val);
  },
  { deep: true }
);

const addFilter = () => {
  if (!newFilter.value.trim()) return;

  if (!currentSectionData.value.filters) {
    currentSectionData.value.filters = [];
  }

  currentSectionData.value.filters.push(newFilter.value.trim());
  newFilter.value = "";
};

const removeFilter = (index) => {
  currentSectionData.value.filters.splice(index, 1);
};

const addArticle = () => {
  if (!currentSectionData.value.articles) {
    currentSectionData.value.articles = [];
  }

  currentSectionData.value.articles.push({
    id: Date.now(), 
    title: "",
    excerpt: "",
    description: "",
    image: "",
    date: "",
    created_at: "",
    link: "",
    slug: "",
    tag: "News",
    commentCount: 0,
  });
};

const removeArticle = (index) => {
  currentSectionData.value.articles.splice(index, 1);
};
</script>

<template>

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
          

</template>  
