<script setup>
import learningModule from '@/api/learningModule';
import courses from '@/assets/courses.jpg';
import {
  Book,
  Check,
  ChevronDown,
  DollarSign,
  Edit2,
  Lock,
  Minimize2,
  Plus,
  Trash2,
  UploadCloud,
} from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useToast } from 'vue-toastification';
import AdminSidebar from './AdminSidebar.vue';

const route = useRoute();
const categories = ref([]);
const router = useRouter();
const isLoadingCategories = ref(false);
const categoryError = ref(null);

const toast = useToast();
const currentStep = ref(1);
const slug = route.params.slug;
const mode = route.props?.mode || 'edit';
const basicInfoForm = ref({
  title: '',
  shortDescription: '',
  category: '',
  level: '',
  fullOverview: '',
  durationHours: '00',
  durationMinutes: '00',
  durationSeconds: '00',
  learnOutcomes: [],
});

const curriculumForm = ref({
  modules: [],
  newLessonTitle: '',
  newModuleNumber: '',
  materialsIncluded: [],
  instructorName: '',
  briefBiography: '',
});

const pricingAccessForm = ref({
  courseAccessType: 'paid',
  courseVisibility: 'public',
  price: 0,
  currency: 'NGN',
  discountAmount: 'none',
  discountAvailability: 'all',
});

const getCoursePayload = () => {
  return {
    title: basicInfoForm.value.title,
    shortDescription: basicInfoForm.value.shortDescription,
    category: basicInfoForm.value.category,
    level: basicInfoForm.value.level,
    fullOverview: basicInfoForm.value.fullOverview,
    duration: `${basicInfoForm.value.durationHours}:${basicInfoForm.value.durationMinutes}:${basicInfoForm.value.durationSeconds}`,
    learnOutcomes: basicInfoForm.value.learnOutcomes.map((o) => o.text),
    curriculum: curriculumForm.value.modules.map((module) => ({
      title: module.title,
      lessons: module.lessons.map((lesson) => ({
        title: lesson.title,
        duration: lesson.duration,
        contentType: lesson.contentType || 'Video File',
      })),
      resources: module.resources,
    })),
    materialsIncluded: curriculumForm.value.materialsIncluded.map(
      (m) => m.text
    ),
    instructor: {
      name: curriculumForm.value.instructorName,
      biography: curriculumForm.value.briefBiography,
    },
    pricing: {
      accessType: pricingAccessForm.value.courseAccessType,
      visibility: pricingAccessForm.value.courseVisibility,
      price: pricingAccessForm.value.price,
      currency: pricingAccessForm.value.currency,
      discountAmount: pricingAccessForm.value.discountAmount,
      discountAvailability: pricingAccessForm.value.discountAvailability,
    },
  };
};

const totalLessons = computed(() => {
  return curriculumForm.value.modules.reduce((count, module) => {
    return count + module.lessons.length;
  }, 0);
});

const steps = [
  { id: 1, title: 'Basic Information' },
  { id: 2, title: 'Curriculum Builder' },
  { id: 3, title: 'Pricing & Access' },
  { id: 4, title: 'Preview & Submit' },
];


const course = ref(null);
const isLoading = ref(false);
const error = ref(null);

const fetchCourse = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await learningModule.getCoursesDetails(slug);
    course.value = response.data;

    basicInfoForm.value.title = course.value.title;
    basicInfoForm.value.shortDescription = course.value.short_description;
    basicInfoForm.value.category = course.value.category?.id || '';
    basicInfoForm.value.level = course.value.level;
    basicInfoForm.value.fullOverview = course.value.description;
    basicInfoForm.value.learnOutcomes = course.value.learning_outcomes.map((o, i) => ({
      id: i + 1,
      text: o,
      charCount: o.length,
    }));

    curriculumForm.value.modules = course.value.modules.map((m) => ({
      ...m,
      isOpen: false,
      lessons: m.lessons.map((l) => ({
        ...l,
      })),
    }));

    curriculumForm.value.materialsIncluded = []; 
    curriculumForm.value.instructorName = course.value.instructor?.first_name || '';
    curriculumForm.value.briefBiography = course.value.instructor?.biography || '';

    pricingAccessForm.value.courseAccessType = course.value.is_free ? 'free' : 'paid';
    pricingAccessForm.value.courseVisibility = course.value.status === 'published' ? 'public' : 'private';
    pricingAccessForm.value.price = parseFloat(course.value.price);
    pricingAccessForm.value.currency = 'NGN'; 
  } catch (err) {
    console.error(err);
    error.value = 'Failed to load course';
  } finally {
    isLoading.value = false;
  }
};

const fetchCategories = async () => {
  isLoadingCategories.value = true;
  categoryError.value = null;

  try {
    const response = await learningModule.getCategories();
    categories.value = response.data; 
  } catch (err) {
    console.error('Failed to fetch categories', err);
    categoryError.value = 'Failed to load categories';
  } finally {
    isLoadingCategories.value = false;
  }
};

const addOutcome = () => {
  const newId =
    basicInfoForm.value.learnOutcomes.length > 0
      ? Math.max(...basicInfoForm.value.learnOutcomes.map((o) => o.id)) + 1
      : 1;
  basicInfoForm.value.learnOutcomes.push({
    id: newId,
    text: 'What you will teach in this course...',
    charCount: 0,
  });
};

const removeOutcome = (id) => {
  basicInfoForm.value.learnOutcomes = basicInfoForm.value.learnOutcomes.filter(
    (o) => o.id !== id
  );
};

const updateCharCount = (outcome) => {
  outcome.charCount = outcome.text.length;
};

const toggleModule = (module) => {
  module.isOpen = !module.isOpen;
};
const addMaterial = () => {
  const newId =
    curriculumForm.value.materialsIncluded.length > 0
      ? Math.max(...curriculumForm.value.materialsIncluded.map((m) => m.id)) + 1
      : 1;
  curriculumForm.value.materialsIncluded.push({
    id: newId,
    text: 'What materials are included...',
    charCount: 0,
  });
};
const removeMaterial = (id) => {
  curriculumForm.value.materialsIncluded =
    curriculumForm.value.materialsIncluded.filter((m) => m.id !== id);
};
const updateMaterialCharCount = (material) => {
  material.charCount = material.text.length;
};

const saveAndContinue = () => {
  if (currentStep.value < 4) {
    currentStep.value += 1;
  } else {
    submitCourse();
  }
};

const goBack = () => {
  if (currentStep.value > 1) currentStep.value -= 1;
  else toast.success('Navigating back to My Courses list (Simulated).');
};

const isLessonDialogOpen = ref(false);
const isQuizDialogOpen = ref(false);

const lessonForm = ref({
  title: '',
  durationHours: '00',
  durationMinutes: '00',
  durationSeconds: '00',
  contentType: 'Select Option',
});

const currentModuleId = ref(null);

const openAddLessonDialog = (moduleId) => {
  currentModuleId.value = moduleId;
  isLessonDialogOpen.value = true;
};

const closeAddLessonDialog = () => {
  isLessonDialogOpen.value = false;
  resetLessonForm();
};

const resetLessonForm = () => {
  lessonForm.value = {
    title: '',
    durationHours: '00',
    durationMinutes: '00',
    durationSeconds: '00',
    contentType: 'Select Option',
  };
};

const resetForms = () => {
  basicInfoForm.value = { ...basicInfoForm.value, learnOutcomes: [] };
  curriculumForm.value = {
    modules: [],
    newLessonTitle: '',
    newModuleNumber: '',
    materialsIncluded: [],
    instructorName: '',
    briefBiography: '',
  };
  pricingAccessForm.value = {
    courseAccessType: 'paid',
    courseVisibility: 'public',
    price: 0,
    currency: 'NGN',
    discountAmount: 'none',
    discountAvailability: 'all',
  };
};

const handleLessonAdded = () => {
  const module = curriculumForm.value.modules.find(
    (m) => m.id === currentModuleId.value
  );
  if (!module) return toast.error('Module not found.');

  const lessonData = {
    id: Date.now(),
    title: lessonForm.value.title,
    duration: `${lessonForm.value.durationHours}:${lessonForm.value.durationMinutes}:${lessonForm.value.durationSeconds}`,
    contentType: lessonForm.value.contentType,
  };

  module.lessons.push(lessonData);
  closeAddLessonDialog();
};

const openAddQuizDialog = () => {
  isQuizDialogOpen.value = true;
};

const closeAddQuizDialog = () => {
  isQuizDialogOpen.value = false;
};

const pricingStatus = computed(() => {
  const access = pricingAccessForm.value.courseAccessType;
  const visibility = pricingAccessForm.value.courseVisibility;

  if (access === 'free') return { main: 'Free', sub: 'Public Access' };
  if (access === 'paid')
    return {
      main: 'Paid Only',
      sub: `${pricingAccessForm.value.currency
        } ${pricingAccessForm.value.price.toLocaleString('en-US')}`,
    };
  if (access === 'membership')
    return { main: 'Members Only', sub: 'Subscription' };

  return { main: 'Unknown', sub: '' };
});

const discountStatus = computed(() => {
  return pricingAccessForm.value.discountAvailability === 'all'
    ? 'All'
    : pricingAccessForm.value.discountAvailability === 'members_only'
      ? 'Members Only'
      : 'None';
});

const handleQuizAdded = () => {
  console.log('New Quiz Added (Placeholder Action)');
  closeAddQuizDialog();
};

const submitCourse = async () => {
  try {
    const payload = getCoursePayload();

    let response;
    if (slug) {
      response = await learningModule.updateCourses(slug, payload);
      toast.success('Course Updated Successfully!');
    } else {
      response = await learningModule.createCourses(payload);
      toast.success('Course Created Successfully!');
      resetForms();
      currentStep.value = 1;
    }

    console.log('Course response:', response.data);
  } catch (error) {
    console.error('Course submit error:', error);
    toast.error('Failed to submit course.');
  }
};

onMounted(() => {
  if (slug) fetchCourse();
  fetchCategories()
});
</script>

<template>
  <div class="flex min-h-screen font-sans">
    <AdminSidebar />
    <main class="flex-1 p-8 overflow-auto bg-white">
      <div class="text-sm text-gray-500 mb-6">
        <span class="text-[#006633]">Home</span> > My Courses >
        <span class="text-gray-700 font-medium">Create New Course</span>
      </div>

      <h1 class="text-4xl font-bold text-gray-800 mb-8 border-b border-gray-200 pb-4">
        Create New Course
      </h1>

      <div class="flex justify-between items-start mb-12 relative">
        <div class="absolute top-4 left-1/4 right-1/4 h-1 bg-gray-300"></div>
        <div class="absolute top-4 h-1 bg-[#00cc66] transition-all duration-500" :style="{
          width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          left: '25%',
        }"></div>

        <div v-for="step in steps" :key="step.id" class="flex flex-col items-center z-10 w-1/4">
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-colors duration-300"
            :class="{
              'bg-[#00cc66]': step.id <= currentStep,
              'bg-gray-400': step.id > currentStep,
            }">
            {{ step.id }}
          </div>
          <span class="text-sm text-center transition-colors duration-300" :class="{
            'text-[#006633] font-semibold': step.id === currentStep,
            'text-gray-600': step.id !== currentStep,
          }">
            {{ step.title }}
          </span>
        </div>
      </div>

      <div class="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div v-if="currentStep === 1">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
            Basic Information
          </h2>

          <div class="flex flex-col lg:flex-row gap-8">
            <div class="flex-1 space-y-6">
              <div>
                <label for="course-title" class="block text-sm font-medium text-gray-700">Course Title</label>
                <input type="text" id="course-title" v-model="basicInfoForm.title" placeholder="Sample Text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border" />
              </div>

              <div>
                <label for="short-description" class="block text-sm font-medium text-gray-700">Short Description</label>
                <input type="text" id="short-description" v-model="basicInfoForm.shortDescription"
                  placeholder="Sample Text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border" />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                  <select id="category" v-model="basicInfoForm.category"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border bg-white">
                    <option v-for="cat in categories" :key="cat.id" :value="cat.name">
                      {{ cat.name }}
                    </option>
                  </select>

                </div>
                <div>
                  <label for="level" class="block text-sm font-medium text-gray-700">Level</label>
                  <select id="level" v-model="basicInfoForm.level"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border bg-white">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              class="lg:w-1/3 flex flex-col items-center justify-center p-6 border-2 border-gray-300 border-dashed rounded-xl bg-gray-50 h-56">
              <UploadCloud class="w-10 h-10 text-gray-400 mb-3" />
              <p class="text-sm text-gray-600 font-medium">Thumbnail Upload</p>
              <p class="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>

          <div class="mt-6">
            <label for="full-overview" class="block text-sm font-medium text-gray-700">Full Course Overview</label>
            <textarea id="full-overview" rows="4" v-model="basicInfoForm.fullOverview" placeholder="Sample Text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border resize-none"></textarea>
          </div>

          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Estimated Duration</label>
            <div class="flex space-x-4">
              <div class="flex flex-col items-center">
                <input type="number" v-model="basicInfoForm.durationHours" placeholder="00" min="0" max="99"
                  class="w-16 text-center rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border" />
                <span class="text-xs text-gray-500 mt-1">Hours</span>
              </div>
              <div class="flex flex-col items-center">
                <input type="number" v-model="basicInfoForm.durationMinutes" placeholder="00" min="0" max="59"
                  class="w-16 text-center rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border" />
                <span class="text-xs text-gray-500 mt-1">Minutes</span>
              </div>
              <div class="flex flex-col items-center">
                <input type="number" v-model="basicInfoForm.durationSeconds" placeholder="00" min="0" max="59"
                  class="w-16 text-center rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border" />
                <span class="text-xs text-gray-500 mt-1">Seconds</span>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-4 border-t border-gray-200">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-gray-800">
                What users will learn
              </h3>
              <button @click="addOutcome" type="button"
                class="flex items-center text-[#00cc66] hover:text-[#00994d] text-sm font-medium">
                <Plus class="w-4 h-4 mr-1" /> Add new
              </button>
            </div>

            <div v-for="(outcome, index) in basicInfoForm.learnOutcomes" :key="outcome.id"
              class="flex items-center mb-3">
              <span class="w-4 text-gray-500 mr-3 text-sm font-medium">{{
                index + 1
              }}</span>
              <input type="text" v-model="outcome.text" @input="updateCharCount(outcome)" maxlength="120"
                class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border" />
              <span class="text-xs text-gray-500 w-12 text-right ml-2">{{ outcome.charCount }}/120</span>
              <button @click="removeOutcome(outcome.id)" type="button" class="ml-4 text-red-500 hover:text-red-700">
                <Trash2 class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div v-if="currentStep === 2">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
            Curriculum Builder
          </h2>
          <p class="text-gray-600 mb-8">
            Add the course modules and lesson content.
          </p>

          <div class="space-y-4 mb-8">
            <div v-for="module in curriculumForm.modules" :key="module.id"
              class="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div @click="toggleModule(module)"
                class="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div class="font-semibold text-gray-700">
                  {{ module.title }}
                </div>
                <ChevronDown :class="{ 'transform rotate-180': module.isOpen }"
                  class="w-5 h-5 text-gray-500 transition-transform" />
              </div>

              <div v-if="module.isOpen" class="p-4 bg-white border-t border-gray-100">
                <div v-for="lesson in module.lessons" :key="lesson.id"
                  class="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div class="flex items-center text-gray-600">
                    <Book class="w-4 h-4 mr-3 text-[#006633]" />
                    <span>{{ lesson.title }}</span>
                  </div>
                  <div class="flex items-center space-x-4">
                    <span class="text-sm text-gray-500">{{
                      lesson.duration
                    }}</span>
                    <Edit2 class="w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer" />
                    <Trash2 class="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer" />
                  </div>
                </div>

                <div class="flex items-center justify-between mt-4">
                  <div class="flex space-x-3 items-center w-full max-w-sm">
                    <input type="text" v-model="curriculumForm.newLessonTitle" placeholder="Lesson Title"
                      class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border text-sm" />
                    <button type="button" @click="openAddLessonDialog(module.id)"
                      class="flex items-center px-3 py-1 bg-[#00cc66] text-white rounded-md text-sm hover:bg-[#00994d]">
                      <Plus class="w-4 h-4 mr-1" /> Add Lesson
                    </button>
                  </div>

                  <button type="button" @click="openAddQuizDialog"
                    class="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                    <Plus class="w-4 h-4 mr-1" /> Add Quiz
                  </button>
                </div>
                <div v-if="isLessonDialogOpen"
                  class="fixed inset-0 bg-gray-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4">
                  <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
                    <h2 class="text-xl font-bold mb-4">Add Lesson</h2>

                    <form @submit.prevent="handleLessonAdded">
                      <div class="mb-4">
                        <label for="lesson-title" class="text-sm text-gray-700">Course Title</label>
                        <input type="text" id="lesson-title" v-model="lessonForm.title" placeholder="Sample Text"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-[#00cc66] focus:ring-[#00cc66]"
                          required />
                      </div>

                      <div class="mb-4">
                        <label class="block text-sm text-gray-700">Estimated Duration</label>
                        <div class="flex space-x-2 mt-1 items-center">
                          <input type="number" placeholder="00" v-model="lessonForm.durationHours" min="0" max="99"
                            class="w-1/4 rounded-md border-gray-300 shadow-sm p-2 border text-center" />
                          <span class="text-sm">Hours</span>
                          <input type="number" placeholder="00" v-model="lessonForm.durationMinutes" min="0" max="59"
                            class="w-1/4 rounded-md border-gray-300 shadow-sm p-2 border text-center" />
                          <span class="text-sm">Minutes</span>
                          <input type="number" placeholder="00" v-model="lessonForm.durationSeconds" min="0" max="59"
                            class="w-1/4 rounded-md border-gray-300 shadow-sm p-2 border text-center" />
                          <span class="text-sm">Seconds</span>
                        </div>
                      </div>

                      <div class="mb-4">
                        <label for="content-type" class="block text-sm text-gray-700">Upload Content Type</label>
                        <select id="content-type" v-model="lessonForm.contentType"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-[#00cc66] focus:ring-[#00cc66]"
                          required>
                          <option disabled value="Select Option">
                            Select Option
                          </option>
                          <option>Video File</option>
                          <option>PDF Document</option>
                          <option>External Link</option>
                        </select>
                      </div>

                      <div
                        class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer mb-6 hover:border-[#00cc66] transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <p class="mt-1 text-sm text-gray-600">Upload Content</p>
                      </div>

                      <div class="flex justify-end space-x-3">
                        <button type="button" @click="closeAddLessonDialog"
                          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                          Cancel
                        </button>
                        <button type="submit" class="px-4 py-2 bg-[#00cc66] text-white rounded-md hover:bg-[#00994d]">
                          Add Lesson
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div v-if="isQuizDialogOpen"
                  class="fixed inset-0 bg-gray-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4">
                  <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                    <h2 class="text-xl font-bold mb-4">Add Quiz</h2>
                    <p class="text-gray-600 mb-6">
                      This is a placeholder for the "Add Quiz" configuration
                      form.
                    </p>

                    <div class="mb-4">
                      <label for="quiz-title" class="text-sm text-gray-700">Quiz Title</label>
                      <input type="text" id="quiz-title" placeholder="e.g., Chapter 1 Assessment"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                    </div>

                    <div class="flex justify-end space-x-3">
                      <button type="button" @click="closeAddQuizDialog"
                        class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                        Cancel
                      </button>
                      <button type="button" @click="handleQuizAdded"
                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800">
                        Create Quiz
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-4 border-t border-gray-200">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-gray-800">
                What materials are included:
              </h3>
              <button @click="addMaterial" type="button"
                class="flex items-center text-[#00cc66] hover:text-[#00994d] text-sm font-medium">
                <Plus class="w-4 h-4 mr-1" /> Add new
              </button>
            </div>

            <div v-for="(material, index) in curriculumForm.materialsIncluded" :key="material.id"
              class="flex items-center mb-3">
              <span class="w-4 text-gray-500 mr-3 text-sm font-medium">{{
                index + 1
              }}</span>
              <input type="text" v-model="material.text" @input="updateMaterialCharCount(material)" maxlength="120"
                class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border" />
              <span class="text-xs text-gray-500 w-12 text-right ml-2">{{ material.charCount }}/120</span>
              <button @click="removeMaterial(material.id)" type="button" class="ml-4 text-red-500 hover:text-red-700">
                <Trash2 class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="mt-8 pt-4 border-t border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
              About the Instructor.
            </h3>
            <p class="text-sm text-gray-600 mb-4">
              Add brief details about the course instructor.
            </p>

            <div class="mb-4">
              <label for="instructor-name" class="block text-sm font-medium text-gray-700">Instructor's Full Name
                (Include title(s))</label>
              <input type="text" id="instructor-name" v-model="curriculumForm.instructorName" placeholder="Dr. Jane Doe"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border" />
            </div>

            <div>
              <label for="biography" class="block text-sm font-medium text-gray-700">Brief Biography</label>
              <textarea id="biography" rows="3" v-model="curriculumForm.briefBiography"
                placeholder="Sample text about the instructor, their experience, and credentials."
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border resize-none"></textarea>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 3">
          <div class="flex justify-between items-start mb-10">
            <h2 class="text-2xl font-semibold text-gray-800 border-b pb-2">
              Pricing and Access
            </h2>

            <div class="space-y-2 text-right p-3 border border-gray-200 rounded-lg bg-gray-50">
              <div class="flex items-center justify-end">
                <DollarSign v-if="pricingAccessForm.courseAccessType === 'paid'" class="w-4 h-4 text-[#006633] mr-1" />
                <Lock v-else-if="
                  pricingAccessForm.courseAccessType === 'membership'
                " class="w-4 h-4 text-blue-500 mr-1" />
                <span class="text-sm text-gray-500">{{
                  pricingStatus.main
                }}</span>
              </div>
              <div class="font-bold text-lg text-gray-800">
                {{
                  pricingAccessForm.courseAccessType === 'paid'
                    ? pricingStatus.sub
                    : 'Access Policy'
                }}
              </div>
              <div class="text-xs text-gray-500">
                Discount Availability:
                <span class="font-medium text-gray-700">{{
                  discountStatus
                }}</span>
              </div>
            </div>
          </div>

          <p class="text-gray-600 mb-8">
            Set course access (free or paid), price and optional discount codes.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <div>
              <label for="access-type" class="block text-sm font-medium text-gray-700">Course Access Type</label>
              <select id="access-type" v-model="pricingAccessForm.courseAccessType"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border bg-white">
                <option value="paid">Paid</option>
                <option value="free">Free</option>
                <option value="membership">Membership/Subscription</option>
              </select>
            </div>

            <div>
              <label for="visibility" class="block text-sm font-medium text-gray-700">Course Visibility</label>
              <select id="visibility" v-model="pricingAccessForm.courseVisibility"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border bg-white">
                <option value="public">Public</option>
                <option value="private">Private (Link only)</option>
                <option value="members_only">Members Only</option>
              </select>
            </div>

            <div v-if="pricingAccessForm.courseAccessType === 'paid'">
              <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
              <div class="relative mt-1">
                <input type="number" id="price" v-model="pricingAccessForm.price" placeholder="10,000.00"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border" />
              </div>
            </div>

            <div v-if="pricingAccessForm.courseAccessType === 'paid'">
              <label for="currency" class="block text-sm font-medium text-gray-700">Currency</label>
              <select id="currency" v-model="pricingAccessForm.currency"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border bg-white">
                <option value="NGN">NGN - Nigerian Naira</option>
                <option value="USD">USD - US Dollar</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>

            <div>
              <label for="discount-amount" class="block text-sm font-medium text-gray-700">Discount Amount</label>
              <select id="discount-amount" v-model="pricingAccessForm.discountAmount"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border bg-white">
                <option value="none">Select Option (No Discount)</option>
                <option value="10%">10% Off</option>
                <option value="20%">20% Off</option>
                <option value="fixed">Fixed Amount Discount</option>
              </select>
            </div>

            <div>
              <label for="discount-availability" class="block text-sm font-medium text-gray-700">Discount
                Availability</label>
              <select id="discount-availability" v-model="pricingAccessForm.discountAvailability"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border bg-white">
                <option value="all">All</option>
                <option value="members_only">Members Only</option>
                <option value="new_users">New Users Only</option>
              </select>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 4">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6">
            Preview & Submit
          </h2>
          <p class="text-gray-600 mb-8">
            Preview your course details before submitting.
          </p>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-8">
              <div class="w-full h-80 bg-gray-100 rounded-xl overflow-hidden shadow-md relative">
                <img :src="courses" alt="Course" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/20 flex items-end p-6">
                  <h3 class="text-3xl font-bold text-white leading-tight">
                    {{ basicInfoForm.title }}
                  </h3>
                </div>
              </div>

              <div>
                <h4 class="text-xl font-semibold text-gray-800 mb-3 border-b pb-1">
                  Course Description
                </h4>
                <p class="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {{ basicInfoForm.fullOverview }}
                </p>
              </div>

              <div>
                <h4 class="text-xl font-semibold text-gray-800 mb-3 border-b pb-1">
                  Course Content
                </h4>
                <div class="text-sm text-gray-500 mb-4 flex justify-between items-center">
                  <span>Lesson {{ totalLessons }} of 34</span>
                  <span>{{ basicInfoForm.durationHours }}h
                    {{ basicInfoForm.durationMinutes }}m Complete</span>
                </div>

                <div class="space-y-3">
                  <div v-for="module in curriculumForm.modules" :key="module.id"
                    class="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300">
                    <div @click="toggleModule(module)"
                      class="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <span class="font-semibold text-gray-700">{{
                        module.title
                      }}</span>
                      <ChevronDown :class="{ 'transform rotate-180': module.isOpen }"
                        class="w-5 h-5 text-gray-500 transition-transform" />
                    </div>
                    <div v-if="module.isOpen" class="p-4 bg-white border-t border-gray-100">
                      <div v-for="lesson in module.lessons" :key="lesson.id"
                        class="flex justify-between items-center py-1.5 text-sm text-gray-600">
                        <div class="flex items-center">
                          <Minimize2 class="w-3 h-3 mr-2 text-gray-400" />
                          <span>{{ lesson.title }}</span>
                        </div>
                        <span class="text-xs text-gray-500">{{
                          lesson.duration
                        }}</span>
                      </div>
                      <p class="text-sm font-medium text-[#006633] mt-2">
                        {{ module.resources }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="lg:col-span-1 space-y-8">
              <div class="p-6 bg-[#f0fff0] border border-[#00cc66] rounded-xl shadow-lg text-center">
                <div class="text-4xl font-extrabold text-[#006633]">
                  {{ pricingAccessForm.currency }}
                  {{ pricingAccessForm.price.toLocaleString('en-US') }}
                </div>
                <p v-if="pricingAccessForm.discountAmount !== 'none'" class="text-sm text-gray-600 mt-1">
                  Get {{ pricingAccessForm.discountAmount }} off exclusive to
                  HFN Members.
                </p>
                <p v-else class="text-sm text-gray-600 mt-1">
                  Full access to all modules and materials.
                </p>
              </div>

              <div>
                <h4 class="text-xl font-semibold text-gray-800 mb-3 border-b pb-1">
                  About the Instructor
                </h4>
                <div class="flex items-center mb-3">
                  <img src="https://placehold.co/60x60/cccccc/333333?text=User" alt="Instructor Image"
                    class="w-12 h-12 rounded-full mr-4 object-cover" />
                  <span class="font-bold text-lg text-gray-700">{{
                    curriculumForm.instructorName
                  }}</span>
                </div>
                <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {{ curriculumForm.briefBiography }}
                </p>
              </div>

              <div>
                <h4 class="text-xl font-semibold text-gray-800 mb-3 border-b pb-1">
                  What you will learn
                </h4>
                <ul class="space-y-2">
                  <li v-for="outcome in basicInfoForm.learnOutcomes" :key="outcome.id"
                    class="flex items-start text-gray-600 text-sm">
                    <Check class="w-4 h-4 text-[#006633] mr-2 flex-shrink-0 mt-1" />
                    <span>{{ outcome.text }}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 class="text-xl font-semibold text-gray-800 mb-3 border-b pb-1">
                  Material Includes:
                </h4>
                <ul class="space-y-2">
                  <li class="flex items-start text-gray-600 text-sm">
                    <Check class="w-4 h-4 text-[#006633] mr-2 flex-shrink-0 mt-1" />
                    {{ basicInfoForm.durationHours }} Hours on-demand video.
                  </li>
                  <li class="flex items-start text-gray-600 text-sm">
                    <Check class="w-4 h-4 text-[#006633] mr-2 flex-shrink-0 mt-1" />
                    Unlimited access.
                  </li>
                  <li class="flex items-start text-gray-600 text-sm">
                    <Check class="w-4 h-4 text-[#006633] mr-2 flex-shrink-0 mt-1" />
                    Accessible on mobile and desktop.
                  </li>
                  <li v-for="material in curriculumForm.materialsIncluded" :key="material.id"
                    class="flex items-start text-gray-600 text-sm">
                    <Check class="w-4 h-4 text-[#006633] mr-2 flex-shrink-0 mt-1" />
                    <span>{{ material.text }}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 class="text-xl font-semibold text-gray-800 mb-3 border-b pb-1">
                  Requirements
                </h4>
                <ul class="space-y-2">
                  <li class="flex items-start text-gray-600 text-sm">
                    <Check class="w-4 h-4 text-[#006633] mr-2 flex-shrink-0 mt-1" />
                    Beginner (No prior knowledge required).
                  </li>
                </ul>
              </div>

              <button @click="goBack"
                class="w-full px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                Edit
              </button>
              <button @click="saveAndContinue"
                class="w-full px-6 py-2 bg-[#00cc66] text-white rounded-lg font-medium hover:bg-[#00994d] transition-colors shadow-md">
                Submit
              </button>
            </div>
          </div>
        </div>

        <div v-if="currentStep < 4" class="flex justify-end space-x-4 pt-8 border-t border-gray-200">
          <button @click="goBack"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            Back
          </button>
          <button @click="currentStep < 4 ? saveAndContinue() : submitCourse()"
            class="px-6 py-2 bg-[#00cc66] text-white rounded-lg font-medium hover:bg-[#00994d] transition-colors shadow-md">
            {{ currentStep < 4 ? 'Save & Continue' : 'Submit Course' }} </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
select:focus,
textarea:focus,
input:focus {
  border-color: #00cc66 !important;
  box-shadow: 0 0 0 1px #00cc66 !important;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}

.text-sm.text-gray-500.mb-4 span:first-child {
  font-weight: 500;
}
</style>
