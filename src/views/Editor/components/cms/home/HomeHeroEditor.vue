<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

// Helper to get News Months keys
const getNewsMonths = () => {
  return props.modelValue.news?.months ? Object.keys(props.modelValue.news.months) : []
}

// Helper to add/remove FAQ items
const addFAQ = () => props.modelValue.faqs.push({ question: '', answer: '' })
const removeFAQ = (index) => props.modelValue.faqs.splice(index, 1)
</script>

<template>
  <div class="max-w-5xl mx-auto p-6 space-y-10 bg-gray-50 min-h-screen">
    
    <div class="flex justify-between items-center border-b pb-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Home Page Content Manager</h1>
        <p class="text-sm text-slate-500">Edit hero, mandates, news, and team details</p>
      </div>
    </div>

    <section class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 class="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
        <span class="w-2 h-6 bg-blue-600 rounded-full"></span> Hero Section
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div class="group">
            <label class="text-[10px] font-bold uppercase text-slate-400">Title Highlight</label>
            <input v-model="modelValue.hero.titleHighlight" type="text" class="w-full border-b focus:border-blue-500 outline-none py-1 text-lg font-medium" />
          </div>
          <div class="group">
            <label class="text-[10px] font-bold uppercase text-slate-400">Main Title</label>
            <input v-model="modelValue.hero.titleMain" type="text" class="w-full border-b focus:border-blue-500 outline-none py-1 text-lg font-bold" />
          </div>
          <div class="group">
            <label class="text-[10px] font-bold uppercase text-slate-400">Intro Line</label>
            <input v-model="modelValue.hero.introLine" type="text" class="w-full border-b focus:border-blue-500 outline-none py-1" />
          </div>
        </div>
        <div class="space-y-4">
          <div class="group">
            <label class="text-[10px] font-bold uppercase text-slate-400">CTA Text</label>
            <input v-model="modelValue.hero.ctaText" type="text" class="w-full border-b focus:border-blue-500 outline-none py-1" />
          </div>
          <div class="group">
            <label class="text-[10px] font-bold uppercase text-slate-400">Slide Image URLs (Cloudinary)</label>
            <div v-for="(slide, i) in modelValue.hero.slides" :key="i" class="mt-2">
              <input v-model="modelValue.hero.slides[i]" type="text" class="w-full text-xs border rounded p-2 bg-slate-50 font-mono" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 class="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
        <span class="w-2 h-6 bg-blue-600 rounded-full"></span> About & Statistics
      </h2>
      <div class="space-y-4">
        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-1 border p-3 rounded-lg">
            <label class="text-[10px] font-bold text-slate-400 uppercase">Stats Number</label>
            <input v-model="modelValue.about.stats.number" class="w-full text-xl font-bold text-blue-600 outline-none" />
          </div>
          <div class="col-span-2 border p-3 rounded-lg">
            <label class="text-[10px] font-bold text-slate-400 uppercase">Stats Label</label>
            <input v-model="modelValue.about.stats.label" class="w-full text-lg outline-none" />
          </div>
        </div>
        <div class="border p-3 rounded-lg">
          <label class="text-[10px] font-bold text-slate-400 uppercase">About Description</label>
          <textarea v-model="modelValue.about.description" rows="4" class="w-full text-sm outline-none resize-none"></textarea>
        </div>
      </div>
    </section>

    <section class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 class="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
        <span class="w-2 h-6 bg-blue-600 rounded-full"></span> Mandate Pillars
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="(action, i) in modelValue.mandate.actions" :key="i" class="p-4 border rounded-lg bg-slate-50/50">
          <input v-model="action.title" class="font-bold text-slate-700 mb-1 w-full bg-transparent border-b border-transparent focus:border-blue-400 outline-none" />
          <textarea v-model="action.description" rows="2" class="text-xs text-slate-500 w-full bg-transparent outline-none resize-none"></textarea>
        </div>
      </div>
    </section>

    <section class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 class="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
        <span class="w-2 h-6 bg-blue-600 rounded-full"></span> Executive Images
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="(exec, i) in modelValue.executives" :key="i" class="flex items-center gap-3 p-3 border rounded-lg bg-white">
          <div class="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
            <img v-if="typeof exec.image === 'string'" :src="exec.image" class="w-full h-full object-cover" />
          </div>
          <div class="overflow-hidden">
            <p class="text-[10px] font-bold truncate">{{ exec.name }}</p>
            <input v-model="modelValue.executives[i].image" type="text" class="w-full text-[8px] border p-1 rounded" placeholder="Image URL" />
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 class="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
        <span class="w-2 h-6 bg-blue-600 rounded-full"></span> News Feed Images
      </h2>
      <div class="space-y-6">
        <div v-for="month in getNewsMonths()" :key="month" class="p-4 border rounded-xl bg-slate-50">
          <h3 class="font-bold text-slate-700 mb-3">{{ month }}</h3>
          <div class="space-y-3">
            <div class="bg-white p-2 rounded border">
              <label class="text-[9px] font-bold text-blue-500 block uppercase">Featured Article Image</label>
              <input v-model="modelValue.news.months[month].featured.image" type="text" class="w-full text-xs font-mono p-1" />
            </div>
            <div v-for="(news, ni) in modelValue.news.months[month].newsList" :key="ni" class="bg-white p-2 rounded border">
              <label class="text-[9px] font-bold text-slate-400 block uppercase truncate">{{ news.title }}</label>
              <input v-model="news.image" type="text" class="w-full text-xs font-mono p-1" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-bold text-blue-700 flex items-center gap-2">
          <span class="w-2 h-6 bg-blue-600 rounded-full"></span> Frequently Asked Questions
        </h2>
        <button @click="addFAQ" class="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700">+ Add FAQ</button>
      </div>
      <div class="space-y-4">
        <div v-for="(faq, i) in modelValue.faqs" :key="i" class="p-4 border rounded-lg relative group">
          <button @click="removeFAQ(i)" class="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">×</button>
          <input v-model="faq.question" placeholder="Question" class="w-full font-bold text-sm mb-2 outline-none border-b border-transparent focus:border-blue-200" />
          <textarea v-model="faq.answer" placeholder="Answer text..." rows="2" class="w-full text-sm text-slate-600 outline-none resize-none"></textarea>
        </div>
      </div>
    </section>

  </div>
</template>
