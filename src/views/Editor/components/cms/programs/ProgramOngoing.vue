<script setup>
import { ref, watch } from "vue";

// Props
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue"]);

// Default section structure
const getDefaultSectionData = () => ({
  title: "",
  subtitle: "",
  description: "",
  projects: [
    {
      id: Date.now(), // unique temporary ID
      title: "",
      summary: "",
      image: "",
      problem: "",
      solution: "",
      outcomes: "",
      layoutReverse: false,
      useAlternativeBg: false,
    },
  ],
});

// Merge incoming prop with defaults
const mergeData = (incoming = {}) => ({
  title: incoming?.title || "",
  subtitle: incoming?.subtitle || "",
  description: incoming?.description || "",
  projects: Array.isArray(incoming?.projects) && incoming.projects.length
    ? incoming.projects.map(p => ({ ...p }))
    : getDefaultSectionData().projects,
});

// Reactive state
const currentSectionData = ref(mergeData(props.modelValue));

// Watch for late prop updates
watch(
  () => props.modelValue,
  (newVal) => {
    const merged = mergeData(newVal);
    if (JSON.stringify(merged) !== JSON.stringify(currentSectionData.value)) {
      currentSectionData.value = merged;
    }
  },
  { deep: true, immediate: true }
);

// Emit updates
watch(
  currentSectionData,
  (val) => {
    emit("update:modelValue", JSON.parse(JSON.stringify(val)));
  },
  { deep: true }
);

// Add a new project
const addProject = () => {
  currentSectionData.value.projects.push({
    id: Date.now(),
    title: "",
    summary: "",
    image: "",
    problem: "",
    solution: "",
    outcomes: "",
    layoutReverse: false,
    useAlternativeBg: false,
  });
};

// Remove a project by index
const removeProject = (index) => {
  currentSectionData.value.projects.splice(index, 1);
};
</script>

<template>
  <div class="space-y-6 bg-white p-4 border rounded-md">
    <!-- Debug -->
    <pre class="text-[10px] bg-gray-100 p-2 overflow-auto max-h-32">
      DEBUG: {{ currentSectionData }}
    </pre>

    <!-- Section Info -->
    <div class="space-y-2">
      <label class="block text-xs font-bold text-gray-500 uppercase">Section Title</label>
      <input v-model="currentSectionData.title" type="text" class="w-full p-1 border rounded" />

      <label class="block text-xs font-bold text-gray-500 uppercase">Subtitle</label>
      <input v-model="currentSectionData.subtitle" type="text" class="w-full p-1 border rounded" />

      <label class="block text-xs font-bold text-gray-500 uppercase">Description</label>
      <textarea v-model="currentSectionData.description" rows="3" class="w-full p-1 border rounded resize-none" />
    </div>

    <!-- Projects -->
    <div v-for="(project, index) in currentSectionData.projects" :key="project.id" class="border border-gray-300 rounded p-3 space-y-2">
      <div class="flex justify-between items-center">
        <span class="font-bold text-sm">Project {{ index + 1 }}</span>
        <button @click="removeProject(index)" class="text-red-500 text-xs">Remove</button>
      </div>

      <label class="block text-xs font-bold text-gray-500 uppercase">Title</label>
      <input v-model="project.title" type="text" class="w-full p-1 border rounded" />

      <label class="block text-xs font-bold text-gray-500 uppercase">Summary</label>
      <textarea v-model="project.summary" rows="2" class="w-full p-1 border rounded resize-none" />

      <label class="block text-xs font-bold text-gray-500 uppercase">Image</label>
      <input v-model="project.image" type="text" class="w-full p-1 border rounded" />

      <label class="block text-xs font-bold text-gray-500 uppercase">Problem</label>
      <textarea v-model="project.problem" rows="2" class="w-full p-1 border rounded resize-none" />

      <label class="block text-xs font-bold text-gray-500 uppercase">Solution</label>
      <textarea v-model="project.solution" rows="2" class="w-full p-1 border rounded resize-none" />

      <label class="block text-xs font-bold text-gray-500 uppercase">Outcomes</label>
      <textarea v-model="project.outcomes" rows="2" class="w-full p-1 border rounded resize-none" />

      <div class="flex space-x-4 mt-2">
        <label class="flex items-center space-x-1 text-xs">
          <input type="checkbox" v-model="project.layoutReverse" />
          <span>Layout Reverse</span>
        </label>
        <label class="flex items-center space-x-1 text-xs">
          <input type="checkbox" v-model="project.useAlternativeBg" />
          <span>Use Alternative Background</span>
        </label>
      </div>
    </div>

    <!-- Add new project -->
    <button @click="addProject" class="px-3 py-1 bg-green-500 text-white rounded text-xs">Add Project</button>
  </div>
</template>