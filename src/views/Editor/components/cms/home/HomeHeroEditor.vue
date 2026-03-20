<script setup>
import { ref } from 'vue'

const heroUploadRef = ref(null)            
const props = defineProps({
  modelValue: Object
})

const emit = defineEmits(['update:modelValue'])
const resetHeroColor = () => {
  props.modelValue.backgroundColor = '#FFFFFF'
}
const handleHeroImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 1024 * 1024) {
    alert("Image must be less than 1MB");
    return;
  }

  currentSectionData.value.heroImage = file;

  const reader = new FileReader();
  reader.onload = (e) => {
    currentSectionData.value.heroImagePreview = e.target.result;
  };
  reader.readAsDataURL(file);
};

const addHeroSlide = () => {
  props.modelValue.hero.slides.push("")
}
const removeHeroSlide = (index) => {
  props.modelValue.hero.slides.splice(index, 1)
}

const getMonths = () => Object.keys(props.modelValue.news.months)  
            
</script>

<template>
  <div class="space-y-12 p-6 bg-gray-50">
    
    <section class="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <h2 class="text-lg font-bold border-b pb-2">Hero Section</h2>
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="text-xs font-bold text-gray-500 uppercase">Title Highlight</label>
          <input v-model="modelValue.titleHighlight" type="text" class="w-full border rounded p-2" />
        </div>
        <div class="space-y-2">
          <label class="text-xs font-bold text-gray-500 uppercase">Main Title</label>
          <input v-model="modelValue.titleMain" type="text" class="w-full border rounded p-2" />
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-xs font-bold text-gray-500 uppercase">Hero Slides (Image URLs)</label>
        <div v-for="(slide, index) in modelValue.slides" :key="index" class="flex items-center gap-2 mb-2">
          <input v-model="modelValue.slides[index]" type="text" class="flex-grow border rounded p-2 text-sm" placeholder="https://..." />
          <button @click="removeHeroSlide(index)" class="text-red-500 text-xs">Remove</button>
        </div>
        <button @click="addHeroSlide" class="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded">+ Add Slide</button>
      </div>
    </section>

    <section class="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <h2 class="text-lg font-bold border-b pb-2">About Section</h2>
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="text-xs font-bold text-gray-500 uppercase">Stats Number</label>
          <input v-model="modelValue.about.stats.number" type="text" class="w-full border rounded p-2" />
        </div>
        <div class="space-y-2">
          <label class="text-xs font-bold text-gray-500 uppercase">Stats Label</label>
          <input v-model="modelValue.about.stats.label" type="text" class="w-full border rounded p-2" />
        </div>
      </div>
      <div class="space-y-2">
        <label class="text-xs font-bold text-gray-500 uppercase">Tags/Features</label>
        <div v-for="(feat, index) in modelValue.about.features" :key="index" class="grid grid-cols-2 gap-2 p-2 border rounded">
          <input v-model="feat.title" placeholder="Title" class="text-sm border-none" />
          <input v-model="feat.sub" placeholder="Sub-text" class="text-sm border-none" />
        </div>
      </div>
    </section>

    <section class="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <h2 class="text-lg font-bold border-b pb-2">Mandate Section</h2>
      <div class="space-y-2">
        <label class="text-xs font-bold text-gray-500 uppercase">Mandate Badge</label>
        <input v-model="modelValue.mandate.badge" type="text" class="w-full border rounded p-2" />
      </div>
      <div class="space-y-2">
        <label class="text-xs font-bold text-gray-500 uppercase">Main Description</label>
        <textarea v-model="modelValue.mandate.description" class="w-full border rounded p-2"></textarea>
      </div>
    </section>

    <section class="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <h2 class="text-lg font-bold border-b pb-2">Executives Section (Images)</h2>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="(exec, index) in modelValue.executives" :key="index" class="border p-3 rounded">
          <p class="font-bold text-sm">{{ exec.name }}</p>
          <label class="text-[10px] text-gray-400">IMAGE URL/PATH</label>
          <input v-model="modelValue.executives[index].image" type="text" class="w-full border p-1 text-xs" />
        </div>
      </div>
    </section>

    <section class="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <h2 class="text-lg font-bold border-b pb-2">News Section (Images)</h2>
      <div v-for="month in getMonths()" :key="month" class="space-y-4">
        <h3 class="text-sm font-bold text-blue-600">{{ month }}</h3>
        <div class="ml-4 p-2 border-l-2">
          <label class="text-xs font-bold">Featured Image URL</label>
          <input v-model="modelValue.news.months[month].featured.image" class="w-full border p-1 text-xs" />
        </div>
        <div v-for="(item, idx) in modelValue.news.months[month].newsList" :key="idx" class="ml-8 p-2 border-b">
          <label class="text-[10px]">{{ item.title }}</label>
          <input v-model="item.image" class="w-full border p-1 text-xs" placeholder="Image link" />
        </div>
      </div>
    </section>

  </div>
</template>
