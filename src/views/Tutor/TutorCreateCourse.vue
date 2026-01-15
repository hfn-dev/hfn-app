<script setup>
import learningModule from '@/api/learningModule.js';
import {
  Book,
  ChevronDown,
  DollarSign,
  Edit2,
  Lock,
  Plus,
  Trash2,
  UploadCloud,
} from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import TutorSidebar from './TutorSidebar.vue';

const router = useRouter();
const route = useRoute();

const isEditMode = computed(() => !!route.params.slug);
const courseSlug = route.params.slug;

// todo uncomment the case 2 to 3 validation logic after and separately models to different components. also check if admin or tutor to create course.

const toast = useToast();

const currentStep = ref(1);
const isLoading = ref(false);

const basicInfoForm = ref({
  title: '',
  shortDescription: '',
  category: '',
  level: '',
  tags_list: [],
  prerequisites: '',
  thumbnail: null,
  fullOverview: '',
  durationHours: '',
  durationMinutes: '',
  durationSeconds: '',
  certificate_available: false,
  max_students: null,
  learnOutcomes: [{ id: Date.now(), text: '', charCount: 0 }],
});

const curriculumForm = ref({
  modules: [],
  newLessonTitle: '',
  materialsIncluded: [{ id: Date.now(), text: '', charCount: 0 }],
  instructorName: '',
  briefBiography: '',
});


const pricingAccessForm = ref({
  courseAccessType: 'free',
  courseVisibility: 'public',
  price: 0,
  currency: 'NGN',
  discountAmount: 'none',
  discountAvailability: 'all',
});

const categories = ref([]);

onMounted(async () => {
  await fetchCategories();

  if (!isEditMode.value) return;

  try {
    const course = await learningModule.getCourseDetails(courseSlug);
    populateCourse(course);
  } catch (error) {
    console.error(error);
    toast.error('Failed to load course');
  }
});

const fetchCategories = async () => {
  try {
    const response = await learningModule.getCategories();
    if (Array.isArray(response.data)) {
      categories.value = response.data; 
    } else {
      categories.value = [];
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    toast.error('Failed to load categories');
  }
};

const pricingStatus = computed(() => {
  const access = pricingAccessForm.value.courseAccessType;
  const visibility = pricingAccessForm.value.courseVisibility;

  if (access === 'free') return { main: 'Free', sub: 'Public Access' };
  if (access === 'paid')
    return {
      main: 'Paid Only',
      sub: `${
        pricingAccessForm.value.currency
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

// Calculate total lessons and lesson duration for Step 4
const totalLessons = computed(() => {
  return curriculumForm.value.modules.reduce((count, module) => {
    return count + module.lessons.length;
  }, 0);
});

// Calculate total duration in hours
const totalDurationHours = computed(() => {
  const totalSeconds = curriculumForm.value.modules.reduce((total, module) => {
    return (
      total +
      module.lessons.reduce((moduleTotal, lesson) => {
        return moduleTotal + lesson.video_duration;
      }, 0)
    );
  }, 0);

  return (totalSeconds / 3600).toFixed(2); // Convert seconds to hours
});

const steps = [
  { id: 1, title: 'Basic Information' },
  { id: 2, title: 'Curriculum Builder' },
  { id: 3, title: 'Pricing & Access' },
  { id: 4, title: 'Preview & Submit' },
];

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

// Handle thumbnail upload
const handleThumbnailUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error('Image size should be less than 5MB');
      return;
    }

    basicInfoForm.value.thumbnail = file;

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      // You can store the preview URL if needed
      console.log('Thumbnail uploaded:', file.name);
    };
    reader.readAsDataURL(file);

    toast.success('Thumbnail uploaded successfully');
  }
};

const toggleModule = (module) => {
  module.isOpen = !module.isOpen;
};

const addModule = () => {
  const newId =
    curriculumForm.value.modules.length > 0
      ? Math.max(...curriculumForm.value.modules.map((m) => m.id)) + 1
      : 1;

  curriculumForm.value.modules.push({
    id: newId,
    title: `Module ${newId}: New Module`,
    isOpen: true,
    description: '',
    order: newId,
    is_published: true,
    lessons: [],
    resources: '',
  });
};

const removeModule = (id) => {
  curriculumForm.value.modules = curriculumForm.value.modules.filter(
    (m) => m.id !== id
  );
  // Reorder modules after removal
  curriculumForm.value.modules.forEach((module, index) => {
    module.order = index + 1;
  });
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
    console.log(
      `Saving Step ${currentStep.value} and continuing to Step ${
        currentStep.value + 1
      }: ${steps[currentStep.value].title}`
    );

    // Validate current step before continuing
    if (validateCurrentStep()) {
      currentStep.value += 1;
    }
  } else {
    // Final step - submit course
    submitCourse();
  }
};

const validateCurrentStep = () => {
  switch (currentStep.value) {
    case 1:
      if (!basicInfoForm.value.title.trim()) {
        toast.error('Course title is required');
        return false;
      }
      if (!basicInfoForm.value.shortDescription.trim()) {
        toast.error('Short description is required');
        return false;
      }
      if (!basicInfoForm.value.category) {
        toast.error('Category is required');
        return false;
      }
      if (!basicInfoForm.value.level) {
        toast.error('Level is required');
        return false;
      }
      if (!basicInfoForm.value.fullOverview.trim()) {
        toast.error('Course overview is required');
        return false;
      }
      if (basicInfoForm.value.learnOutcomes.length === 0) {
        toast.error('Please add at least one learning outcome');
        return false;
      }
      return true;

    case 2:
      console.log('Validating step 2 - Curriculum Builder');
      console.log('Modules:', curriculumForm.value.modules);

      // if (curriculumForm.value.modules.length === 0) {
      //   toast.error('Please add at least one module');
      //   return false;
      // }

      // Check if all modules have at least one lesson
      // Make sure we're checking the correct property name
      // const hasEmptyModules = curriculumForm.value.modules.some(module => {
      //   const lessonCount = module.lessons ? module.lessons.length : 0;
      //   console.log(`Module "${module.title}" has ${lessonCount} lessons`);
      //   return lessonCount === 0;
      // });

      // if (hasEmptyModules) {
      //   toast.error('All modules must have at least one lesson');
      //   return false;
      // }

      // Check if all lessons have required fields
      // const allModulesValid = curriculumForm.value.modules.every(module => {
      //   return module.lessons.every(lesson => {
      //     const isValid = lesson.title && lesson.title.trim();
      //     if (!isValid) {
      //       console.log('Invalid lesson found:', lesson);
      //     }
      //     return isValid;
      //   });
      // });

      // if (!allModulesValid) {
      //   toast.error('All lessons must have a title');
      //   return false;
      // }

      console.log('Step 2 validation passed');
      return true;

    case 3:
      if (
        pricingAccessForm.value.courseAccessType === 'paid' &&
        !pricingAccessForm.value.price
      ) {
        toast.error('Price is required for paid courses');
        return false;
      }
      return true;

    default:
      return true;
  }
};

const goBack = () => {
  if (currentStep.value > 1) {
    currentStep.value -= 1;
  } else {
    // Navigate back to courses list
    window.history.back();
  }
};

const isLessonDialogOpen = ref(false);
const isQuizDialogOpen = ref(false);

const lessonForm = ref({
  title: 'Sample Text',
  durationHours: '00',
  durationMinutes: '00',
  durationSeconds: '00',
  contentType: 'video',
  videoUrl: '',
  content: '',
  isPreview: false,
  currentModuleId: null,
});

const openAddLessonDialog = (moduleId) => {
  lessonForm.value.currentModuleId = moduleId;
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
    contentType: 'video',
    videoUrl: '',
    content: '',
    isPreview: false,
    currentModuleId: null,
  };
};

const handleLessonAdded = () => {
  if (!lessonForm.value.currentModuleId) {
    toast.error('No module selected');
    return;
  }

  const module = curriculumForm.value.modules.find(
    (m) => m.id === lessonForm.value.currentModuleId
  );
  if (!module) {
    toast.error('Module not found');
    return;
  }

  // Ensure lessons array exists
  if (!module.lessons) {
    module.lessons = [];
  }

  const newId =
    module.lessons.length > 0
      ? Math.max(...module.lessons.map((l) => l.id)) + 1
      : module.id * 100 + 1;

  const durationInSeconds =
    parseInt(lessonForm.value.durationHours) * 3600 +
    parseInt(lessonForm.value.durationMinutes) * 60 +
    parseInt(lessonForm.value.durationSeconds);

  const newLesson = {
    id: newId,
    title: lessonForm.value.title.trim(),
    duration: `${lessonForm.value.durationHours.padStart(
      2,
      '0'
    )}:${lessonForm.value.durationMinutes.padStart(
      2,
      '0'
    )}:${lessonForm.value.durationSeconds.padStart(2, '0')}`,
    content_type: lessonForm.value.contentType,
    video_url: lessonForm.value.videoUrl || '',
    video_duration: durationInSeconds,
    order: module.lessons.length + 1,
    is_preview: lessonForm.value.isPreview || false,
    is_published: true,
    content:
      lessonForm.value.contentType === 'text'
        ? lessonForm.value.content || ''
        : '',
  };

  console.log('Adding new lesson:', newLesson);

  module.lessons.push(newLesson);

  toast.success('Lesson added successfully');
  closeAddLessonDialog();
};

const openAddQuizDialog = () => {
  isQuizDialogOpen.value = true;
};

const closeAddQuizDialog = () => {
  isQuizDialogOpen.value = false;
};

const handleQuizAdded = () => {
  console.log('New Quiz Added (Placeholder Action)');
  toast.info('Quiz functionality will be added in future updates');
  closeAddQuizDialog();
};

// --- Course Submission Logic ---
const prepareCourseData = () => {
  // Convert form data to API payload
  const payload = {
    title: basicInfoForm.value.title,
    description: basicInfoForm.value.fullOverview,
    short_description: basicInfoForm.value.shortDescription,
    category: parseInt(basicInfoForm.value.category),
    level: basicInfoForm.value.level,
    status: pricingAccessForm.value.status,
    duration_hours: parseFloat(totalDurationHours.value),
    price:
      pricingAccessForm.value.courseAccessType === 'paid'
        ? parseFloat(pricingAccessForm.value.price)
        : 0,
    is_free: pricingAccessForm.value.courseAccessType === 'free',
    max_students: basicInfoForm.value.max_students
      ? parseInt(basicInfoForm.value.max_students)
      : null,
    certificate_available: basicInfoForm.value.certificate_available,
    prerequisites: basicInfoForm.value.prerequisites || '',
    learning_outcomes: basicInfoForm.value.learnOutcomes.map(
      (outcome) => outcome.text
    ),
    tags_list: basicInfoForm.value.tags_list,
    modules: curriculumForm.value.modules.map((module) => ({
      title: module.title,
      description: module.description || '',
      order: module.order,
      is_published: module.is_published,
      lessons: module.lessons.map((lesson) => ({
        title: lesson.title,
        content_type: lesson.content_type,
        video_url: lesson.video_url,
        video_duration: lesson.video_duration,
        order: lesson.order,
        is_preview: lesson.is_preview,
        is_published: lesson.is_published,
        content: lesson.content || '',
      })),
    })),
  };

  return payload;
};

const populateCourse = (course) => {
  // BASIC INFO
  basicInfoForm.value.title = course.title;
  basicInfoForm.value.shortDescription = course.short_description;
  basicInfoForm.value.fullOverview = course.description;
  basicInfoForm.value.category = course.category?.id;
  basicInfoForm.value.level = course.level;
  basicInfoForm.value.max_students = course.max_students;
  basicInfoForm.value.certificate_available = course.certificate_available;
  basicInfoForm.value.prerequisites = course.prerequisites;

  // TAGS & OUTCOMES
  basicInfoForm.value.tags_list = course.tags_list || [];
  basicInfoForm.value.learnOutcomes = (course.learning_outcomes || []).map(
    (text) => ({ text })
  );

  // PRICING
  pricingAccessForm.value.courseAccessType = course.is_free ? 'free' : 'paid';
  pricingAccessForm.value.price = course.price;
  pricingAccessForm.value.currency = course.currency;
  pricingAccessForm.value.status = course.status;

  // MODULES & LESSONS
  curriculumForm.value.modules = (course.modules || []).map((module) => ({
    id: module.id,
    title: module.title,
    description: module.description,
    is_published: module.is_published,
    lessons: (module.lessons || []).map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      content_type: lesson.content_type,
      content: lesson.content,
      video_url: lesson.video_url,
      video_duration: lesson.video_duration,
      is_preview: lesson.is_preview,
      is_published: lesson.is_published,
    })),
  }));
};

// const submitCourse = async () => {
//   try {
//     isLoading.value = true;

//     // Validate final step
//     if (!validateCurrentStep()) {
//       return;
//     }

//     const courseData = prepareCourseData();

//     console.log('Submitting course data:', courseData);

//     // Submit to API
//     const response = await learningModule.createCourses(courseData);

//     if (response.data) {
//       toast.success('Course created successfully!');

//       // If thumbnail was uploaded, upload it separately
//       if (basicInfoForm.value.thumbnail) {
//         await uploadThumbnail(response.data.id);
//       }

//       // Redirect to course management or dashboard
//       setTimeout(() => {
//         // You might want to redirect to the course edit page or courses list
//         window.location.href = '/tutor/courses';
//       }, 1500);
//     } else {
//       toast.error('Failed to create course');
//     }
//   } catch (error) {
//     console.error('Course creation error:', error);

//     if (error.response) {
//       const errorMsg =
//         error.response.data?.detail ||
//         error.response.data?.message ||
//         `Error: ${error.response.status}`;
//       toast.error(errorMsg);

//       // Handle validation errors
//       if (error.response.data) {
//         for (const [field, errors] of Object.entries(error.response.data)) {
//           if (Array.isArray(errors)) {
//             toast.error(`${field}: ${errors[0]}`);
//           }
//         }
//       }
//     } else if (error.request) {
//       toast.error('Network error. Please check your connection and try again.');
//     } else {
//       toast.error('An unexpected error occurred. Please try again.');
//     }
//   } finally {
//     isLoading.value = false;
//   }
// };

const submitCourse = async () => {
  if (!validateCurrentStep()) return;

  isLoading.value = true;

  try {
    const payload = prepareCourseData();

    if (isEditMode.value) {
      await learningModule.updateCourse(courseSlug, payload);
      toast.success('Course updated successfully ');
    } else {
      await learningModule.createCourses(payload);
      toast.success('Course created successfully ');
    }

    router.push('/tutor/courses');
  } catch (error) {
    console.error(error);
    toast.error('Failed to save course');
  } finally {
    isLoading.value = false;
  }
};

const uploadThumbnail = async (courseId) => {
  try {
    if (!basicInfoForm.value.thumbnail) return;

    const formData = new FormData();
    formData.append('thumbnail', basicInfoForm.value.thumbnail);

    // This assumes you have an endpoint for thumbnail upload
    // You might need to adjust this based on your API
    await learningModule.uploadThumbnail(courseId, formData);

    toast.success('Thumbnail uploaded successfully');
  } catch (error) {
    console.error('Thumbnail upload error:', error);
    toast.error('Failed to upload thumbnail');
  }
};
</script>

<template>
  <div class="flex min-h-screen font-sans">
    <TutorSidebar />
    <main class="flex-1 p-8 overflow-auto bg-white">
      <div class="text-sm text-gray-500 mb-6">
        <span class="text-[#006633]">Home</span> > My Courses >
        <span class="text-gray-700 font-medium">Create New Course</span>
      </div>

      <h1
        class="text-4xl font-bold text-gray-800 mb-8 border-b border-gray-200 pb-4"
      >
        Create New Course
      </h1>

      <!-- Stepper Component -->
      <div class="flex justify-between items-start mb-12 relative">
        <div class="absolute top-4 left-1/4 right-1/4 h-1 bg-gray-300"></div>
        <div
          class="absolute top-4 h-1 bg-[#00cc66] transition-all duration-500"
          :style="{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            left: '25%',
          }"
        ></div>

        <div
          v-for="step in steps"
          :key="step.id"
          class="flex flex-col items-center z-10 w-1/4"
        >
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-colors duration-300"
            :class="{
              'bg-[#00cc66]': step.id <= currentStep,
              'bg-gray-400': step.id > currentStep,
            }"
          >
            {{ step.id }}
          </div>
          <span
            class="text-sm text-center transition-colors duration-300"
            :class="{
              'text-[#006633] font-semibold': step.id === currentStep,
              'text-gray-600': step.id !== currentStep,
            }"
          >
            {{ step.title }}
          </span>
        </div>
      </div>
      <!-- END Stepper Component -->

      <!-- Form Card -->
      <div class="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div v-if="currentStep === 1">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
            Basic Information
          </h2>

          <div class="flex flex-col lg:flex-row gap-8">
            <div class="flex-1 space-y-6">
              <!-- Course Title -->
              <div>
                <label
                  for="course-title"
                  class="block text-sm font-medium text-gray-700"
                  >Course Title*</label
                >
                <input
                  type="text"
                  id="course-title"
                  v-model="basicInfoForm.title"
                  placeholder="Enter course title"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border"
                  required
                />
              </div>

              <!-- Short Description -->
              <div>
                <label
                  for="short-description"
                  class="block text-sm font-medium text-gray-700"
                  >Short Description*</label
                >
                <input
                  type="text"
                  id="short-description"
                  v-model="basicInfoForm.shortDescription"
                  placeholder="Brief description of the course"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border"
                  required
                />
              </div>

              <!-- Category & Level -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label
                    for="category"
                    class="block text-sm font-medium text-gray-700"
                    >Category*</label
                  >
                  <select
                    id="category"
                    v-model="basicInfoForm.category"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border bg-white"
                    required
                  >
                    <option value="">Select Category</option>
                    <option
                      v-for="cat in categories"
                      :key="cat.id"
                      :value="cat.id"
                    >
                      {{ cat.name }}
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    for="level"
                    class="block text-sm font-medium text-gray-700"
                    >Level*</label
                  >
                  <select
                    id="level"
                    v-model="basicInfoForm.level"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border bg-white"
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="all">All Levels</option>
                  </select>
                </div>
              </div>

              <!-- Tags -->
              <div>
                <label
                  for="tags"
                  class="block text-sm font-medium text-gray-700"
                  >Tags (comma-separated)</label
                >
                <input
                  type="text"
                  id="tags"
                  v-model="basicInfoForm.tags_list"
                  placeholder="python, programming, beginner"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border"
                  @input="
                    (e) =>
                      (basicInfoForm.tags_list = e.target.value
                        .split(',')
                        .map((tag) => tag.trim()))
                  "
                />
                <p class="text-xs text-gray-500 mt-1">
                  Separate tags with commas
                </p>
              </div>

              <!-- Prerequisites -->
              <div>
                <label
                  for="prerequisites"
                  class="block text-sm font-medium text-gray-700"
                  >Prerequisites</label
                >
                <textarea
                  id="prerequisites"
                  rows="2"
                  v-model="basicInfoForm.prerequisites"
                  placeholder="What students should know before taking this course"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border resize-none"
                ></textarea>
              </div>
            </div>

            <div class="lg:w-1/3">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Course Thumbnail
              </label>
              <div
                class="flex flex-col items-center justify-center p-6 border-2 border-gray-300 border-dashed rounded-xl bg-gray-50 h-56 cursor-pointer hover:border-[#00cc66] transition-colors"
                @click="document.getElementById('thumbnail-upload').click()"
              >
                <UploadCloud class="w-10 h-10 text-gray-400 mb-3" />
                <p class="text-sm text-gray-600 font-medium">
                  Click to upload thumbnail
                </p>
                <p class="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                <input
                  type="file"
                  id="thumbnail-upload"
                  accept="image/*"
                  @change="handleThumbnailUpload"
                  class="hidden"
                />
                <p
                  v-if="basicInfoForm.thumbnail"
                  class="text-xs text-green-600 mt-2"
                >
                  ✓ {{ basicInfoForm.thumbnail.name }}
                </p>
              </div>
            </div>
          </div>

          <!-- Full Course Overview -->
          <div class="mt-6">
            <label
              for="full-overview"
              class="block text-sm font-medium text-gray-700"
              >Full Course Overview*</label
            >
            <textarea
              id="full-overview"
              rows="4"
              v-model="basicInfoForm.fullOverview"
              placeholder="Detailed description of the course content"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border resize-none"
              required
            ></textarea>
          </div>

          <!-- Certificate Availability -->
          <div class="mt-6 flex items-center">
            <input
              id="certificate-available"
              type="checkbox"
              v-model="basicInfoForm.certificate_available"
              class="h-4 w-4 text-[#00cc66] focus:ring-[#00cc66] border-gray-300 rounded"
            />
            <label
              for="certificate-available"
              class="ml-2 block text-sm text-gray-900"
            >
              Certificate of Completion available
            </label>
          </div>

          <!-- Max Students -->
          <div class="mt-6">
            <label
              for="max-students"
              class="block text-sm font-medium text-gray-700"
              >Maximum Students (optional)</label
            >
            <input
              type="number"
              id="max-students"
              v-model="basicInfoForm.max_students"
              placeholder="Leave empty for unlimited"
              min="1"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border"
            />
            <p class="text-xs text-gray-500 mt-1">
              Leave empty for unlimited enrollment
            </p>
          </div>

          <!-- What users will learn -->
          <div class="mt-8 pt-4 border-t border-gray-200">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-gray-800">
                What users will learn*
              </h3>
              <button
                @click="addOutcome"
                type="button"
                class="flex items-center text-[#00cc66] hover:text-[#00994d] text-sm font-medium"
              >
                <Plus class="w-4 h-4 mr-1" /> Add new
              </button>
            </div>

            <div
              v-for="(outcome, index) in basicInfoForm.learnOutcomes"
              :key="outcome.id"
              class="flex items-center mb-3"
            >
              <span class="w-4 text-gray-500 mr-3 text-sm font-medium">{{
                index + 1
              }}</span>
              <input
                type="text"
                v-model="outcome.text"
                @input="updateCharCount(outcome)"
                maxlength="120"
                placeholder="What students will learn from this course"
                class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border"
                required
              />
              <span class="text-xs text-gray-500 w-12 text-right ml-2"
                >{{ outcome.charCount }}/120</span
              >
              <button
                @click="removeOutcome(outcome.id)"
                type="button"
                class="ml-4 text-red-500 hover:text-red-700"
                v-if="basicInfoForm.learnOutcomes.length > 1"
              >
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
            <div
              v-for="module in curriculumForm.modules"
              :key="module.id"
              class="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <div
                @click="toggleModule(module)"
                class="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div class="font-semibold text-gray-700">
                  {{ module.title }}
                </div>
                <ChevronDown
                  :class="{ 'transform rotate-180': module.isOpen }"
                  class="w-5 h-5 text-gray-500 transition-transform"
                />
              </div>

              <div
                v-if="module.isOpen"
                class="p-4 bg-white border-t border-gray-100"
              >
                <div
                  v-for="lesson in module.lessons"
                  :key="lesson.id"
                  class="flex justify-between items-center py-2 border-b last:border-b-0"
                >
                  <div class="flex items-center text-gray-600">
                    <Book class="w-4 h-4 mr-3 text-[#006633]" />
                    <span>{{ lesson.title }}</span>
                  </div>
                  <div class="flex items-center space-x-4">
                    <span class="text-sm text-gray-500">{{
                      lesson.duration
                    }}</span>
                    <Edit2
                      class="w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                    />
                    <Trash2
                      class="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer"
                    />
                  </div>
                </div>

                <div class="flex items-center justify-between mt-4">
                  <div class="flex space-x-3 items-center w-full max-w-sm">
                    <input
                      type="text"
                      v-model="curriculumForm.newLessonTitle"
                      placeholder="Lesson Title"
                      class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border text-sm"
                    />
                    <button
                      type="button"
                      @click="openAddLessonDialog"
                      class="flex items-center px-3 py-1 bg-[#00cc66] text-white rounded-md text-sm hover:bg-[#00994d]"
                    >
                      <Plus class="w-4 h-4 mr-1" /> Add Lesson
                    </button>
                  </div>

                  <button
                    type="button"
                    @click="openAddQuizDialog"
                    class="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    <Plus class="w-4 h-4 mr-1" /> Add Quiz
                  </button>
                </div>
                <div
                  v-if="isLessonDialogOpen"
                  class="fixed inset-0 bg-gray-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4"
                >
                  <div
                    class="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg"
                  >
                    <h2 class="text-xl font-bold mb-4">Add Lesson</h2>

                    <form @submit.prevent="handleLessonAdded">
                      <div class="mb-4">
                        <label for="lesson-title" class="text-sm text-gray-700"
                          >Course Title</label
                        >
                        <input
                          type="text"
                          id="lesson-title"
                          v-model="lessonForm.title"
                          placeholder="Sample Text"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-[#00cc66] focus:ring-[#00cc66]"
                          required
                        />
                      </div>

                      <div class="mb-4">
                        <label class="block text-sm text-gray-700"
                          >Estimated Duration</label
                        >
                        <div class="flex space-x-2 mt-1 items-center">
                          <input
                            type="number"
                            placeholder="00"
                            v-model="lessonForm.durationHours"
                            min="0"
                            max="99"
                            class="w-1/4 rounded-md border-gray-300 shadow-sm p-2 border text-center"
                          />
                          <span class="text-sm">Hours</span>
                          <input
                            type="number"
                            placeholder="00"
                            v-model="lessonForm.durationMinutes"
                            min="0"
                            max="59"
                            class="w-1/4 rounded-md border-gray-300 shadow-sm p-2 border text-center"
                          />
                          <span class="text-sm">Minutes</span>
                          <input
                            type="number"
                            placeholder="00"
                            v-model="lessonForm.durationSeconds"
                            min="0"
                            max="59"
                            class="w-1/4 rounded-md border-gray-300 shadow-sm p-2 border text-center"
                          />
                          <span class="text-sm">Seconds</span>
                        </div>
                      </div>

                      <div class="mb-4">
                        <label
                          for="content-type"
                          class="block text-sm text-gray-700"
                          >Upload Content Type</label
                        >
                        <select
                          id="content-type"
                          v-model="lessonForm.contentType"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-[#00cc66] focus:ring-[#00cc66]"
                          required
                        >
                          <option disabled value="Select Option">
                            Select Option
                          </option>
                          <option>Video File</option>
                          <option>PDF Document</option>
                          <option>External Link</option>
                        </select>
                      </div>

                      <div
                        class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer mb-6 hover:border-[#00cc66] transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="mx-auto h-12 w-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                        <p class="mt-1 text-sm text-gray-600">Upload Content</p>
                      </div>

                      <div class="flex justify-end space-x-3">
                        <button
                          type="button"
                          @click="closeAddLessonDialog"
                          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          class="px-4 py-2 bg-[#00cc66] text-white rounded-md hover:bg-[#00994d]"
                        >
                          Add Lesson
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div
                  v-if="isQuizDialogOpen"
                  class="fixed inset-0 bg-gray-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4"
                >
                  <div
                    class="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
                  >
                    <h2 class="text-xl font-bold mb-4">Add Quiz</h2>
                    <p class="text-gray-600 mb-6">
                      This is a placeholder for the "Add Quiz" configuration
                      form.
                    </p>

                    <div class="mb-4">
                      <label for="quiz-title" class="text-sm text-gray-700"
                        >Quiz Title</label
                      >
                      <input
                        type="text"
                        id="quiz-title"
                        placeholder="e.g., Chapter 1 Assessment"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      />
                    </div>

                    <div class="flex justify-end space-x-3">
                      <button
                        type="button"
                        @click="closeAddQuizDialog"
                        class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        @click="handleQuizAdded"
                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
                      >
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
              <button
                @click="addMaterial"
                type="button"
                class="flex items-center text-[#00cc66] hover:text-[#00994d] text-sm font-medium"
              >
                <Plus class="w-4 h-4 mr-1" /> Add new
              </button>
            </div>

            <div
              v-for="(material, index) in curriculumForm.materialsIncluded"
              :key="material.id"
              class="flex items-center mb-3"
            >
              <span class="w-4 text-gray-500 mr-3 text-sm font-medium">{{
                index + 1
              }}</span>
              <input
                type="text"
                v-model="material.text"
                @input="updateMaterialCharCount(material)"
                maxlength="120"
                class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border"
              />
              <span class="text-xs text-gray-500 w-12 text-right ml-2"
                >{{ material.charCount }}/120</span
              >
              <button
                @click="removeMaterial(material.id)"
                type="button"
                class="ml-4 text-red-500 hover:text-red-700"
              >
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
              <label
                for="instructor-name"
                class="block text-sm font-medium text-gray-700"
                >Instructor's Full Name (Include title(s))</label
              >
              <input
                type="text"
                id="instructor-name"
                v-model="curriculumForm.instructorName"
                placeholder="Dr. Jane Doe"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border"
              />
            </div>

            <div>
              <label
                for="biography"
                class="block text-sm font-medium text-gray-700"
                >Brief Biography</label
              >
              <textarea
                id="biography"
                rows="3"
                v-model="curriculumForm.briefBiography"
                placeholder="Sample text about the instructor, their experience, and credentials."
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 3">
          <div class="flex justify-between items-start mb-10">
            <h2 class="text-2xl font-semibold text-gray-800 border-b pb-2">
              Pricing and Access
            </h2>

            <div
              class="space-y-2 text-right p-3 border border-gray-200 rounded-lg bg-gray-50"
            >
              <div class="flex items-center justify-end">
                <DollarSign
                  v-if="pricingAccessForm.courseAccessType === 'paid'"
                  class="w-4 h-4 text-[#006633] mr-1"
                />
                <Lock
                  v-else-if="
                    pricingAccessForm.courseAccessType === 'membership'
                  "
                  class="w-4 h-4 text-blue-500 mr-1"
                />
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
              <label
                for="access-type"
                class="block text-sm font-medium text-gray-700"
                >Course Access Type</label
              >
              <select
                id="access-type"
                v-model="pricingAccessForm.courseAccessType"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border bg-white"
              >
                <option value="paid">Paid</option>
                <option value="free">Free</option>
                <option value="membership">Membership/Subscription</option>
              </select>
            </div>

            <div>
              <label
                for="visibility"
                class="block text-sm font-medium text-gray-700"
                >Course Visibility</label
              >
              <select
                id="visibility"
                v-model="pricingAccessForm.courseVisibility"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border bg-white"
              >
                <option value="public">Public</option>
                <option value="private">Private (Link only)</option>
                <option value="members_only">Members Only</option>
              </select>
            </div>

            <div v-if="pricingAccessForm.courseAccessType === 'paid'">
              <label for="price" class="block text-sm font-medium text-gray-700"
                >Price</label
              >
              <div class="relative mt-1">
                <input
                  type="number"
                  id="price"
                  v-model="pricingAccessForm.price"
                  placeholder="10,000.00"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border"
                />
              </div>
            </div>

            <div v-if="pricingAccessForm.courseAccessType === 'paid'">
              <label
                for="currency"
                class="block text-sm font-medium text-gray-700"
                >Currency</label
              >
              <select
                id="currency"
                v-model="pricingAccessForm.currency"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border bg-white"
              >
                <option value="NGN">NGN - Nigerian Naira</option>
                <option value="USD">USD - US Dollar</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>

            <div>
              <label
                for="discount-amount"
                class="block text-sm font-medium text-gray-700"
                >Discount Amount</label
              >
              <select
                id="discount-amount"
                v-model="pricingAccessForm.discountAmount"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border bg-white"
              >
                <option value="none">Select Option (No Discount)</option>
                <option value="10%">10% Off</option>
                <option value="20%">20% Off</option>
                <option value="fixed">Fixed Amount Discount</option>
              </select>
            </div>

            <div>
              <label
                for="discount-availability"
                class="block text-sm font-medium text-gray-700"
                >Discount Availability</label
              >
              <select
                id="discount-availability"
                v-model="pricingAccessForm.discountAvailability"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00cc66] focus:ring-[#00cc66] p-2 border bg-white"
              >
                <option value="all">All</option>
                <option value="members_only">Members Only</option>
                <option value="new_users">New Users Only</option>
              </select>
            </div>
          </div>
        </div>

        <div
          v-if="currentStep < 4"
          class="flex justify-end space-x-4 pt-8 border-t border-gray-200"
        >
          <button
            @click="goBack"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            :disabled="isLoading"
          >
            Back
          </button>
          <button
            @click="saveAndContinue"
            :disabled="isLoading"
            class="px-6 py-2 bg-[#00cc66] text-white rounded-lg font-medium hover:bg-[#00994d] transition-colors shadow-md flex items-center justify-center min-w-[120px]"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
            <span v-else>Save & Continue</span>
          </button>
        </div>

        <!-- Final Submit button for step 4 -->
        <div
          v-if="currentStep === 4"
          class="flex justify-end space-x-4 pt-8 border-t border-gray-200"
        >
          <button
            @click="goBack"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            :disabled="isLoading"
          >
            Edit Course
          </button>
          <button
            @click="submitCourse"
            :disabled="isLoading"
            class="px-6 py-2 bg-[#00cc66] text-white rounded-lg font-medium hover:bg-[#00994d] transition-colors shadow-md flex items-center justify-center min-w-[120px]"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating Course...
            </span>
            <span v-else>Submit Course</span>
          </button>
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
