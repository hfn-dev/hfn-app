<script setup>
import learningModule from "@/api/learningModule.js";
import {
  ChevronDown,
  DollarSign,
  Lock,
  Plus,
  Trash2,
  UploadCloud,
} from "lucide-vue-next";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import TutorSidebar from "./TutorSidebar.vue";

const router = useRouter();
const route = useRoute();

const courseSlug = route.params.slug;

const mode = computed(() => {
  if (!courseSlug) return "create";
  if (route.path.includes("/edit")) return "edit";
  return "preview";
});

const isCreateMode = computed(() => mode.value === "create");
const isEditMode = computed(() => mode.value === "edit");
const isPreviewMode = computed(() => mode.value === "preview");

const categorySearch = ref("");
const showCategoryDropdown = ref(false);
const creatingCategory = ref(false);

const filteredCategories = computed(() => {
  if (!categorySearch.value) return categories.value;

  return categories.value.filter((c) =>
    c.name.toLowerCase().includes(categorySearch.value.toLowerCase())
  );
});

const canCreateCategory = computed(() => {
  if (!categorySearch.value) return false;

  return !categories.value.some(
    (c) => c.name.toLowerCase() === categorySearch.value.toLowerCase()
  );
});



const createCategory = async () => {
  if (!categorySearch.value.trim()) return;

  try {
    creatingCategory.value = true;

    const res = await courseApi.createCategory({
      name: categorySearch.value.trim(),
    });

    const newCategory = res.data;

    categories.value.push(newCategory);
    basicInfoForm.value.category = newCategory.id;

    categorySearch.value = newCategory.name;
    showCategoryDropdown.value = false;

    toast.success("Category created");
  } catch (err) {
    console.error(err);
    toast.error("Failed to create category");
  } finally {
    creatingCategory.value = false;
  }
};
  
const toast = useToast();

const currentStep = ref(1);
const isLoading = ref(false);

const basicInfoForm = ref({
  title: "",
  shortDescription: "",
  category: "",
  level: "",
  tags_list: [],
  prerequisites: "",
  thumbnail: null,
  fullOverview: "",
  durationHours: "",
  durationMinutes: "",
  durationSeconds: "",
  certificate_available: false,
  max_students: null,
  learnOutcomes: [{ id: Date.now(), text: "", charCount: 0 }],
});

const curriculumForm = ref({
  modules: [],
  newLessonTitle: "",
  materialsIncluded: [{ id: Date.now(), text: "", charCount: 0 }],
  instructorName: "",
  briefBiography: "",
});

const pricingAccessForm = ref({
  courseAccessType: "free",
  courseVisibility: "public",
  price: 0,
  currency: "NGN",
  discountAmount: "none",
  discountAvailability: "all",
});

const categories = ref([]);

const fetchCategories = async () => {
  try {
    const response = await learningModule.getCategories();
    if (Array.isArray(response.data)) {
      categories.value = response.data;
    } else {
      categories.value = [];
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    toast.error("Failed to load categories");
  }
};

const pricingStatus = computed(() => {
  const access = pricingAccessForm.value.courseAccessType;
  const visibility = pricingAccessForm.value.courseVisibility;

  if (access === "free") return { main: "Free", sub: "Public Access" };
  if (access === "paid")
    return {
      main: "Paid Only",
      sub: `${
        pricingAccessForm.value.currency
      } ${pricingAccessForm.value.price.toLocaleString("en-US")}`,
    };
  if (access === "membership")
    return { main: "Members Only", sub: "Subscription" };

  return { main: "Unknown", sub: "" };
});

const discountStatus = computed(() => {
  return pricingAccessForm.value.discountAvailability === "all"
    ? "All"
    : pricingAccessForm.value.discountAvailability === "members_only"
    ? "Members Only"
    : "None";
});

const totalLessons = computed(() => {
  return curriculumForm.value.modules.reduce((count, module) => {
    return count + module.lessons.length;
  }, 0);
});

const totalDurationHours = computed(() => {
  const totalSeconds = curriculumForm.value.modules.reduce((total, module) => {
    return (
      total +
      module.lessons.reduce((moduleTotal, lesson) => {
        return moduleTotal + lesson.video_duration;
      }, 0)
    );
  }, 0);

  return (totalSeconds / 3600).toFixed(2);
});

const steps = [
  { id: 1, title: "Basic Information" },
  { id: 2, title: "Curriculum Builder" },
  { id: 3, title: "Pricing & Access" },
  { id: 4, title: "Preview & Submit" },
];

const addOutcome = () => {
  const newId =
    basicInfoForm.value.learnOutcomes.length > 0
      ? Math.max(...basicInfoForm.value.learnOutcomes.map((o) => o.id)) + 1
      : 1;
  basicInfoForm.value.learnOutcomes.push({
    id: newId,
    text: "What you will teach in this course...",
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
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    basicInfoForm.value.thumbnail = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("Thumbnail uploaded:", file.name);
    };
    reader.readAsDataURL(file);

    toast.success("Thumbnail uploaded successfully");
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
    description: "",
    order: newId,
    is_published: true,
    lessons: [],
    quizzes: [],
    resources: "",
  });
};

const removeModule = (id) => {
  curriculumForm.value.modules = curriculumForm.value.modules.filter(
    (m) => m.id !== id
  );
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
    text: "What materials are included...",
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

    if (validateCurrentStep()) {
      currentStep.value += 1;
    }
  } else {
    submitCourse();
  }
};

const validateCurrentStep = () => {
  switch (currentStep.value) {
    case 1:
      if (!basicInfoForm.value.title.trim()) {
        toast.error("Course title is required");
        return false;
      }
      if (!basicInfoForm.value.shortDescription.trim()) {
        toast.error("Short description is required");
        return false;
      }
      if (!basicInfoForm.value.category) {
        toast.error("Category is required");
        return false;
      }
      if (!basicInfoForm.value.level) {
        toast.error("Level is required");
        return false;
      }
      if (!basicInfoForm.value.fullOverview.trim()) {
        toast.error("Course overview is required");
        return false;
      }
      if (basicInfoForm.value.learnOutcomes.length === 0) {
        toast.error("Please add at least one learning outcome");
        return false;
      }
      return true;

    case 2:
      console.log("Validating step 2 - Curriculum Builder");

      console.log("Step 2 validation passed");
      return true;

    case 3:
      if (
        pricingAccessForm.value.courseAccessType === "paid" &&
        !pricingAccessForm.value.price
      ) {
        toast.error("Price is required for paid courses");
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
  title: "",
  durationHours: "00",
  durationMinutes: "00",
  durationSeconds: "00",
  contentType: "video",
  videoUrl: "",
  articleContent: "",
  isPreview: false,
  currentModuleId: null,
});

const openAddLessonDialog = (moduleId) => {
  resetLessonForm();
  lessonForm.value.currentModuleId = moduleId;
  isLessonDialogOpen.value = true;
};

const handleQuizAdded = () => {
  const module = curriculumForm.value.modules.find(
    (m) => m.id === quizForm.value.currentModuleId
  );

  if (!module) {
    toast.error("Module not found");
    return;
  }

  if (!module.quizzes) module.quizzes = [];

  const newQuiz = {
    id:
      module.quizzes.length > 0
        ? Math.max(...module.quizzes.map((q) => q.id)) + 1
        : module.id * 1000 + 1,
    title: quizForm.value.title || "Untitled Quiz",
    questions: quizForm.value.questions,
    order: module.quizzes.length + 1,
    is_published: true,
  };

  module.quizzes.push(newQuiz);

  toast.success("Quiz added successfully");
  closeAddQuizDialog();
};

const addQuizQuestion = () => {
  if (!quizForm.value.newQuestion.trim()) return;

  quizForm.value.questions.push({
    id: Date.now(),
    text: quizForm.value.newQuestion.trim(),
  });

  quizForm.value.newQuestion = "";
};

const removeQuizQuestion = (id) => {
  quizForm.value.questions = quizForm.value.questions.filter(
    (q) => q.id !== id
  );
};

const closeAddLessonDialog = () => {
  isLessonDialogOpen.value = false;
  resetLessonForm();
};

const resetLessonForm = () => {
  lessonForm.value = {
    title: "",
    durationHours: "00",
    durationMinutes: "00",
    durationSeconds: "00",
    contentType: "video",
    videoUrl: "",
    articleContent: "",
    isPreview: false,
    currentModuleId: null,
  };
};

const activeModuleId = ref(null);

const activeModule = computed(() => {
  return (
    curriculumForm.value.modules.find((m) => m.id === activeModuleId.value) ||
    null
  );
});

const handleLessonAdded = () => {
  if (!lessonForm.value.currentModuleId) {
    toast.error("No module selected");
    return;
  }

  const module = curriculumForm.value.modules.find(
    (m) => m.id === lessonForm.value.currentModuleId
  );
  if (!module) {
    toast.error("Module not found");
    return;
  }

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
    duration: {
      hours: Number(lessonForm.value.durationHours),
      minutes: Number(lessonForm.value.durationMinutes),
      seconds: Number(lessonForm.value.durationSeconds),
    },
    content_type: lessonForm.value.contentType,
    video_url: lessonForm.value.videoUrl || "",
    video_duration: durationInSeconds,
    order: module.lessons.length + 1,
    is_preview: lessonForm.value.isPreview || false,
    is_published: true,
    content:
      lessonForm.value.contentType === "text"
        ? lessonForm.value.articleContent || ""
        : "",
  };

  console.log("Adding new lesson:", newLesson);

  module.lessons.push(newLesson);

  toast.success("Lesson added successfully");
  closeAddLessonDialog();
};

const closeAddQuizDialog = () => {
  isQuizDialogOpen.value = false;
};

const prepareCourseData = () => {
  const payload = {
    title: basicInfoForm.value.title,
    description: basicInfoForm.value.fullOverview,
    short_description: basicInfoForm.value.shortDescription,
    category: parseInt(basicInfoForm.value.category),
    level: basicInfoForm.value.level,
    status: pricingAccessForm.value.status,
    duration_hours: parseFloat(totalDurationHours.value),
    price:
      pricingAccessForm.value.courseAccessType === "paid"
        ? parseFloat(pricingAccessForm.value.price)
        : 0,
    is_free: pricingAccessForm.value.courseAccessType === "free",
    max_students: basicInfoForm.value.max_students
      ? parseInt(basicInfoForm.value.max_students)
      : null,
    certificate_available: basicInfoForm.value.certificate_available,
    prerequisites: basicInfoForm.value.prerequisites || "",
    learning_outcomes: basicInfoForm.value.learnOutcomes.map(
      (outcome) => outcome.text
    ),
    tags_list: basicInfoForm.value.tags_list,
    modules: curriculumForm.value.modules.map((module) => ({
      title: module.title,
      description: module.description || "",
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
        content: lesson.content || "",
      })),
    })),
  };

  return payload;
};

const populateCourse = (course) => {
  basicInfoForm.value = {
    title: course.title || "",
    shortDescription: course.short_description || "",
    fullOverview: course.description || "",
    level: course.level || "",
    category: course.category?.id || "",
    tags_list: course.tags_list || [],
    prerequisites: course.prerequisites || "",
    certificate_available: !!course.certificate_available,
    max_students: course.max_students || null,

    learnOutcomes: course.learning_outcomes?.length
      ? course.learning_outcomes.map((text, index) => ({
          id: index + 1,
          text: text,
          charCount: text.length,
        }))
      : [{ id: Date.now(), text: "", charCount: 0 }],
  };

  curriculumForm.value.modules = (course.modules || []).map((module) => ({
    id: module.id,
    title: module.title,
    description: module.description || "",
    isOpen: true,
    order: module.order,
    is_published: module.is_published,
    quizzes: [],
    lessons: (module.lessons || []).map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      duration: {
        hours: Math.floor(lesson.video_duration / 3600),
        minutes: Math.floor((lesson.video_duration % 3600) / 60),
        seconds: lesson.video_duration % 60,
      },

      content_type: lesson.content_type,
      video_url: lesson.video_url || "",
      video_duration: lesson.video_duration || 0,
      is_preview: !!lesson.is_preview,
      is_published: !!lesson.is_published,
      order: lesson.order,
      content: lesson.content || "",
    })),
  }));

  pricingAccessForm.value = {
    courseAccessType: course.is_free ? "free" : "paid",
    courseVisibility: course.status === "published" ? "public" : "private",
    price: course.price ? parseFloat(course.price) : 0,
    currency: "NGN",
    discountAmount: "none",
    discountAvailability: "all",
  };

  if (course.thumbnail) {
    console.log("Current Thumbnail URL:", course.thumbnail);
  }
};

const removeLesson = (moduleId, lessonId) => {
  const module = curriculumForm.value.modules.find((m) => m.id === moduleId);
  if (!module) return;

  module.lessons = module.lessons.filter((l) => l.id !== lessonId);
};

watch(
  () => curriculumForm.value.modules.length,
  (len) => {
    if (len > 0 && !activeModuleId.value) {
      activeModuleId.value = curriculumForm.value.modules[0].id;
    }
  },
  { immediate: true }
);

const openAddQuizDialog = (moduleId) => {
  quizForm.value = {
    title: "",
    questions: [],
    newQuestion: "",
    currentModuleId: moduleId,
  };
  isQuizDialogOpen.value = true;
};

const quizForm = ref({
  title: "",
  questions: [],
  newQuestion: "",
  currentModuleId: null,
});

const submitCourse = async () => {
  if (isPreviewMode.value) return;

  if (!validateCurrentStep()) return;

  isLoading.value = true;

  try {
    const payload = prepareCourseData();

    if (isEditMode.value) {
      await learningModule.updateCourses(courseSlug, payload);
      toast.success("Course updated successfully");
    } else {
      await learningModule.createCourses(payload);
      toast.success("Course created successfully");
    }

    router.push({ name: "TutorCourseList" });

    // router.push("/tutor/courses");
  } catch (error) {
    console.error(error);
    toast.error("Failed to save course");
  } finally {
    isLoading.value = false;
  }
};

const uploadThumbnail = async (courseId) => {
  try {
    if (!basicInfoForm.value.thumbnail) return;

    const formData = new FormData();
    formData.append("thumbnail", basicInfoForm.value.thumbnail);

    await learningModule.uploadThumbnail(courseId, formData);

    toast.success("Thumbnail uploaded successfully");
  } catch (error) {
    console.error("Thumbnail upload error:", error);
    toast.error("Failed to upload thumbnail");
  }
};

onMounted(async () => {
  await fetchCategories();

  if (isCreateMode.value) return;

  try {
    const response = await learningModule.getCoursesDetails(courseSlug);
    const course = response.data;
    populateCourse(course);

    const selectedCategory = categories.value.find(
      (c) => c.id === course.category?.id
    );

    if (selectedCategory) {
      categorySearch.value = selectedCategory.name;
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to load course");
  }
});
</script>

<template>
  <div class="flex min-h-screen font-sans">
    <TutorSidebar />
    <main class="flex-1 p-8 overflow-auto bg-white">
      <div class="text-sm text-gray-500 mb-6">
        <span class="text-[#006633]">Home</span> > My Courses >
        <span class="text-gray-700 font-medium">Create New Course</span>
      </div>

      <h1 class="text-4xl font-bold text-gray-800 mb-8">
        {{
          isCreateMode
            ? "Create New Course"
            : isEditMode
            ? "Edit Course"
            : "Course Preview"
        }}
      </h1>

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

      <div class="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div v-if="currentStep === 1">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
            Basic Information
          </h2>

          <div class="flex flex-col lg:flex-row gap-8">
            <div class="flex-1 space-y-6">
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

              <div class="grid grid-cols-2 gap-4">
                <div>
  <label class="block text-sm font-medium text-gray-700">
    Category
  </label>

  <div class="relative">
    <input
      type="text"
      v-model="categorySearch"
      @focus="showCategoryDropdown = true"
      @blur="setTimeout(() => (showCategoryDropdown = false), 150)"
      placeholder="Select or create category"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-[#00cc66]"
    />

    <div
      v-if="showCategoryDropdown"
      class="absolute z-20 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg max-h-56 overflow-auto"
    >
      <div
        v-for="category in filteredCategories"
        :key="category.id"
        @click="
          basicInfoForm.category = category.id;
          categorySearch = category.name;
          showCategoryDropdown = false;
        "
        class="px-4 py-2 hover:bg-green-50 cursor-pointer text-sm"
      >
        {{ category.icon }} {{ category.name }}
      </div>

      <div
        v-if="canCreateCategory"
        @click="createCategory"
        class="px-4 py-2 bg-green-50 hover:bg-green-100 cursor-pointer text-sm text-[#006633] font-medium"
      >
        ➕ Create category “{{ categorySearch }}”
      </div>

      <div
        v-if="filteredCategories.length === 0 && !canCreateCategory"
        class="px-4 py-2 text-sm text-gray-400"
      >
        No categories found
      </div>
    </div>
  </div>
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

          <div class="mb-12 flex items-start gap-12">
            <div
              class="text-[#E67E22] text-4xl font-sans italic pt-8 select-none"
            >
              Preview
            </div>

            <div class="flex-1">
              <div
                v-for="module in curriculumForm.modules"
                :key="module.id"
                class="border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden w-full"
              >
                <div
                  @click="
                    activeModuleId = module.id;
                    toggleModule(module);
                  "
                  class="bg-[#F1F8F4] p-5 flex justify-between items-center border-b border-gray-100 cursor-pointer"
                >
                  <span class="font-bold text-gray-800 text-lg">
                    {{ module.title || "Untitled Module" }}
                  </span>
                  <div class="flex items-center gap-3">
                    <button
                      v-if="curriculumForm.modules.length > 1"
                      @click.stop="removeModule(module.id)"
                      class="text-red-500 hover:text-red-700"
                      title="Delete module"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>

                    <ChevronDown
                      @click="toggleModule(module)"
                      class="w-5 h-5 text-gray-400 transition-transform cursor-pointer"
                      :class="{ 'rotate-180': module.isOpen }"
                    />
                  </div>
                </div>

                <div
                  v-if="
                    module.isOpen &&
                    module.lessons.length === 0 &&
                    module.quizzes.length === 0
                  "
                  class="p-8 text-center text-gray-400 italic"
                >
                  No lessons or quizzes added to this module yet.
                </div>

                <div v-if="module.isOpen">
                  <draggable
                    v-model="module.lessons"
                    item-key="id"
                    handle=".drag-handle"
                    animation="200"
                  >
                    <template #item="{ element: lesson }">
                      <div
                        class="flex items-center justify-between p-4 border-b last:border-0 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <div class="flex items-center gap-4">
                          <span
                            class="drag-handle cursor-grab text-gray-300 hover:text-gray-500 text-xl"
                          >
                            ⋮⋮
                          </span>
                          <span class="text-base text-gray-700 font-medium">
                            {{ lesson.title }}
                          </span>
                        </div>

                        <span
                          class="text-sm font-sans text-gray-400 bg-gray-50 px-2 py-1 rounded"
                        >
                          {{
                            lesson.duration.hours > 0
                              ? lesson.duration.hours + "h"
                              : ""
                          }}
                          {{ lesson.duration.minutes }}m
                        </span>
                        <button
                          @click.stop="removeLesson(module.id, lesson.id)"
                          class="text-red-500 hover:text-red-700"
                          title="Delete lesson"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </div>
                    </template>
                  </draggable>
                </div>

                <div
                  v-for="quiz in module.quizzes"
                  :key="quiz.id"
                  class="p-4 border-t bg-blue-50/30 flex items-center gap-3 text-blue-700 font-semibold"
                >
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Quiz: {{ quiz.title }}
                </div>

                <div class="p-3 bg-gray-50/50 text-xs text-gray-400 text-right">
                  Module Preview Mode
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6 mb-6">
            <div class="space-y-1">
              <label class="text-xs font-medium text-gray-500"
                >Module Title</label
              >
              <input
                v-if="activeModule"
                type="text"
                placeholder="Enter Title"
                v-model="activeModule.title"
                class="w-full border-b border-gray-300 py-2 outline-none focus:border-[#006633]"
              />

              <input
                v-else
                type="text"
                placeholder="Select a module first"
                disabled
                class="w-full border-b border-gray-200 py-2 text-gray-400"
              />
            </div>
            <div class="space-y-1">
              <button
                @click="addModule()"
                class="w-full border border-dashed border-[#006633] py-2 rounded text-[#006633] text-sm font-medium hover:bg-green-50 transition"
              >
                + Add New Module
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-10">
            <button
              @click="
                openAddLessonDialog(
                  activeModuleId || curriculumForm.modules[0]?.id
                )
              "
              class="border border-gray-200 rounded py-2 text-[#006633] text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              Add Lesson <Plus class="w-4 h-4" />
            </button>

            <button
              @click="
                openAddQuizDialog(
                  activeModuleId || curriculumForm.modules[0]?.id
                )
              "
              class="border border-gray-200 rounded py-2 text-[#006633] text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              Add Quiz <Plus class="w-4 h-4" />
            </button>
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
          <div
            v-if="isLessonDialogOpen"
            class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          >
            <div class="bg-white w-full max-w-lg rounded-xl p-6 shadow-xl">
              <h3 class="text-lg font-semibold mb-4">Add Lesson</h3>

              <form @submit.prevent="handleLessonAdded" class="space-y-4">
                <div>
                  <label class="text-sm text-gray-600">Lesson Title</label>
                  <input
                    v-model="lessonForm.title"
                    class="w-full border rounded p-2"
                    required
                  />
                </div>

                <div class="flex gap-2">
                  <input
                    type="number"
                    v-model="lessonForm.durationHours"
                    placeholder="HH"
                    class="w-1/3 border rounded p-2"
                  />
                  <input
                    type="number"
                    v-model="lessonForm.durationMinutes"
                    placeholder="MM"
                    class="w-1/3 border rounded p-2"
                  />
                  <input
                    type="number"
                    v-model="lessonForm.durationSeconds"
                    placeholder="SS"
                    class="w-1/3 border rounded p-2"
                  />
                </div>

                <select
                  v-model="lessonForm.contentType"
                  class="w-full border rounded px-3 py-2 text-sm"
                >
                  <option value="" disabled>Select content type</option>
                  <option value="video">Video</option>
                  <option value="text">Article</option>
                  <option value="document">Document</option>
                  <option value="live">Live Class</option>
                </select>
                <div
                  v-if="lessonForm.contentType === 'video'"
                  class="space-y-3"
                >
                  <label class="block text-xs font-medium">Video Source</label>

                  <div class="flex gap-4 text-sm">
                    <label class="flex items-center gap-1">
                      <input
                        type="radio"
                        value="url"
                        v-model="lessonForm.videoSource"
                      />
                      Video URL
                    </label>

                    <label class="flex items-center gap-1">
                      <input
                        type="radio"
                        value="file"
                        v-model="lessonForm.videoSource"
                      />
                      Upload Video
                    </label>
                  </div>

                  <div v-if="lessonForm.videoSource === 'url'">
                    <input
                      v-model="lessonForm.videoUrl"
                      type="url"
                      placeholder="https://youtube.com/..."
                      class="w-full border rounded px-3 py-2 text-sm"
                    />
                  </div>

                  <div v-if="lessonForm.videoSource === 'file'">
                    <input
                      type="file"
                      accept="video/*"
                      @change="
                        (e) => (lessonForm.videoFile = e.target.files[0])
                      "
                      class="w-full text-sm"
                    />
                    <p class="text-xs text-gray-400 mt-1">
                      MP4, MOV • max size depends on server
                    </p>
                  </div>
                </div>

                <div v-if="lessonForm.contentType === 'text'">
                  <label class="block text-xs font-medium mb-1"
                    >Article Content</label
                  >
                  <textarea
                    v-model="lessonForm.articleContent"
                    rows="5"
                    placeholder="Write lesson content..."
                    class="w-full border rounded px-3 py-2 text-sm"
                  ></textarea>
                </div>
                <div v-if="lessonForm.contentType === 'document'">
                  <label class="block text-xs font-medium mb-1"
                    >Upload Document</label
                  >
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    @change="
                      (e) => (lessonForm.documentFile = e.target.files[0])
                    "
                    class="w-full text-sm"
                  />
                </div>
                <div v-if="lessonForm.contentType === 'live'" class="space-y-3">
                  <div>
                    <label class="block text-xs font-medium mb-1"
                      >Class Date</label
                    >
                    <input
                      v-model="lessonForm.liveDate"
                      type="datetime-local"
                      class="w-full border rounded px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-medium mb-1"
                      >Meeting Link</label
                    >
                    <input
                      v-model="lessonForm.liveLink"
                      type="url"
                      placeholder="Zoom / Google Meet link"
                      class="w-full border rounded px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div class="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    @click="closeAddLessonDialog"
                    class="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="px-4 py-2 bg-[#00cc66] text-white rounded"
                  >
                    Add Lesson
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div
            v-if="isQuizDialogOpen"
            class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          >
            <div class="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
              <h3 class="text-lg font-semibold mb-4">Add Quiz</h3>

              <input
                v-model="quizForm.title"
                placeholder="Quiz title"
                class="w-full border rounded p-2 mb-4"
              />

              <div class="flex gap-2 mb-3">
                <input
                  v-model="quizForm.newQuestion"
                  placeholder="Enter quiz question"
                  class="flex-1 border rounded p-2"
                />
                <button
                  type="button"
                  @click="addQuizQuestion"
                  class="px-3 bg-[#00cc66] text-white rounded"
                >
                  Add
                </button>
              </div>

              <ul class="space-y-2 mb-4">
                <li
                  v-for="q in quizForm.questions"
                  :key="q.id"
                  class="flex justify-between items-center bg-gray-50 px-3 py-2 rounded text-sm"
                >
                  <span>{{ q.text }}</span>
                  <button
                    @click="removeQuizQuestion(q.id)"
                    class="text-red-500 text-xs"
                  >
                    Remove
                  </button>
                </li>
              </ul>

              <div class="flex justify-end gap-3">
                <button
                  @click="closeAddQuizDialog"
                  class="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  @click="handleQuizAdded"
                  class="px-4 py-2 bg-[#006633] text-white rounded"
                >
                  Add Quiz
                </button>
              </div>
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
                  pricingAccessForm.courseAccessType === "paid"
                    ? pricingStatus.sub
                    : "Access Policy"
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

        <div v-if="currentStep === 4">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6">
            Preview & Submit
          </h2>
          <p class="text-gray-600 mb-8">
            Preview your course details before submitting.
          </p>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-8">
              <div
                class="w-full h-80 bg-gray-100 rounded-xl overflow-hidden shadow-md relative"
              >
                <img
                  :src="courses"
                  alt="Course"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-black/20 flex items-end p-6">
                  <h3 class="text-3xl font-bold text-white leading-tight">
                    {{ basicInfoForm.title }}
                  </h3>
                </div>
              </div>

              <div>
                <h4
                  class="text-xl font-semibold text-gray-800 mb-3 border-b pb-1"
                >
                  Course Description
                </h4>
                <p class="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {{ basicInfoForm.fullOverview }}
                </p>
              </div>

              <div>
                <h4
                  class="text-xl font-semibold text-gray-800 mb-3 border-b pb-1"
                >
                  Course Content
                </h4>
                <div
                  class="text-sm text-gray-500 mb-4 flex justify-between items-center"
                >
                  <span>Lesson {{ totalLessons }} of 34</span>
                  <span
                    >{{ basicInfoForm.durationHours }}h
                    {{ basicInfoForm.durationMinutes }}m Complete</span
                  >
                </div>

                <div class="space-y-3">
                  <div
                    v-for="module in curriculumForm.modules"
                    :key="module.id"
                    class="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300"
                  >
                    <div
                      @click="toggleModule(module)"
                      class="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span class="font-semibold text-gray-700">{{
                        module.title
                      }}</span>
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
                        class="flex justify-between items-center py-1.5 text-sm text-gray-600"
                      >
                        <div class="flex items-center">
                          <Minimize2 class="w-3 h-3 mr-2 text-gray-400" />
                          <span>{{ lesson.title }}</span>
                        </div>
                        <span class="text-xs text-gray-500"
                          >{{ lesson.duration.hours }}h
                          {{ lesson.duration.minutes }}m
                        </span>
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
              <div
                class="p-6 bg-[#f0fff0] border border-[#00cc66] rounded-xl shadow-lg text-center"
              >
                <div class="text-4xl font-extrabold text-[#006633]">
                  {{ pricingAccessForm.currency }}
                  {{ pricingAccessForm.price.toLocaleString("en-US") }}
                </div>
                <p
                  v-if="pricingAccessForm.discountAmount !== 'none'"
                  class="text-sm text-gray-600 mt-1"
                >
                  Get {{ pricingAccessForm.discountAmount }} off exclusive to
                  HFN Members.
                </p>
                <p v-else class="text-sm text-gray-600 mt-1">
                  Full access to all modules and materials.
                </p>
              </div>

              <div>
                <h4
                  class="text-xl font-semibold text-gray-800 mb-3 border-b pb-1"
                >
                  About the Instructor
                </h4>
                <div class="flex items-center mb-3">
                  <img
                    src="https://placehold.co/60x60/cccccc/333333?text=User"
                    alt="Instructor Image"
                    class="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <span class="font-bold text-lg text-gray-700">{{
                    curriculumForm.instructorName
                  }}</span>
                </div>
                <p
                  class="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap"
                >
                  {{ curriculumForm.briefBiography }}
                </p>
              </div>

              <div>
                <h4
                  class="text-xl font-semibold text-gray-800 mb-3 border-b pb-1"
                >
                  What you will learn
                </h4>
                <ul class="space-y-2">
                  <li
                    v-for="outcome in basicInfoForm.learnOutcomes"
                    :key="outcome.id"
                    class="flex items-start text-gray-600 text-sm"
                  >
                    <Check
                      class="w-4 h-4 text-[#006633] mr-2 flex-shrink-0 mt-1"
                    />
                    <span>{{ outcome.text }}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4
                  class="text-xl font-semibold text-gray-800 mb-3 border-b pb-1"
                >
                  Material Includes:
                </h4>
                <ul class="space-y-2">
                  <li class="flex items-start text-gray-600 text-sm">
                    <Check
                      class="w-4 h-4 text-[#006633] mr-2 flex-shrink-0 mt-1"
                    />
                    {{ basicInfoForm.durationHours }} Hours on-demand video.
                  </li>
                  <li class="flex items-start text-gray-600 text-sm">
                    <Check
                      class="w-4 h-4 text-[#006633] mr-2 flex-shrink-0 mt-1"
                    />
                    Unlimited access.
                  </li>
                  <li class="flex items-start text-gray-600 text-sm">
                    <Check
                      class="w-4 h-4 text-[#006633] mr-2 flex-shrink-0 mt-1"
                    />
                    Accessible on mobile and desktop.
                  </li>
                  <li
                    v-for="material in curriculumForm.materialsIncluded"
                    :key="material.id"
                    class="flex items-start text-gray-600 text-sm"
                  >
                    <Check
                      class="w-4 h-4 text-[#006633] mr-2 flex-shrink-0 mt-1"
                    />
                    <span>{{ material.text }}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4
                  class="text-xl font-semibold text-gray-800 mb-3 border-b pb-1"
                >
                  Requirements
                </h4>
                <ul class="space-y-2">
                  <li class="flex items-start text-gray-600 text-sm">
                    <Check
                      class="w-4 h-4 text-[#006633] mr-2 flex-shrink-0 mt-1"
                    />
                    Beginner (No prior knowledge required).
                  </li>
                </ul>
              </div>
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

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.text-sm.text-gray-500.mb-4 span:first-child {
  font-weight: 500;
}
</style>
