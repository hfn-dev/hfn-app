<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import authApi from "../../api/userRegister";
import { useAuth } from "../../store/authStore";
import EditorSidebar from "./EditorSidebar.vue";
const profileImage = ref(null);
const selectedFile = ref(null);
const isUploading = ref(false);
const showSidebar = ref(false);

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

const closeSidebar = () => {
  showSidebar.value = false;
};

const { user, role } = useAuth();


const profileFields = computed(() => {
  if (isOrganization.value) {
    return [
      { key: "name", label: "Organization Name", model: orgDetails },
      { key: "email", label: "Email Address", model: orgDetails },
      { key: "phone", label: "Phone Number", model: orgDetails },
      { key: "password", label: "Password", model: orgDetails },
    ];
  }

  return [
    { key: "firstName", label: "First Name", model: individualDetails },
    { key: "lastName", label: "Last Name", model: individualDetails },
    { key: "email", label: "Email Address", model: individualDetails },
    { key: "phone", label: "Phone Number", model: individualDetails },
    { key: "password", label: "Password", model: individualDetails },
  ];
});


const fetchUserProfile = async () => {
  try {
    const data = await authApi.getUser();

    isOrganization.value = data.role === 'organization' || !!data.organization_name;

    profileImage.value = data.profile || null;

    if (isOrganization.value) {
      orgDetails.name = data.organization_name || data.full_name || "N/A";
      orgDetails.email = data.email;
      orgDetails.phone = data.phone_number;
    } else {
      individualDetails.firstName = data.first_name || "";
      individualDetails.lastName = data.last_name || "";
      individualDetails.email = data.email || "";
      individualDetails.phone = data.phone_number || "";
    }
  } catch (error) {
    console.error("Failed to fetch user profile");
  }
};


const onProfileImageSelect = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (!["image/jpeg", "image/png"].includes(file.type)) {
    console.log("Only JPG and PNG allowed");
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    console.log("Max size is 2MB");
    return;
  }

  selectedFile.value = file;
  profileImage.value = URL.createObjectURL(file);
};




const uploadProfileImage = async () => {
  if (!selectedFile.value) return;

  try {
    isUploading.value = true;

    const formData = new FormData();
    formData.append("profile", selectedFile.value);

    const response = await authApi.uploadProfileImage(formData);

    profileImage.value = response.profile;
    selectedFile.value = null;
  } catch (err) {
    console.error("Profile image upload failed", err);
  } finally {
    isUploading.value = false;
  }
};


onMounted(() => {
  fetchUserProfile();
});


const isOrganization = ref(null);
const currentView = ref("My Account");
const activeTab = ref("My Profile");
const isOrgEditing = ref(false);

const orgDetails = reactive({
  name: "",
  email: "",
  phone: "",
  password: "********",
});

const orgDetailsKeys = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email Address" },
  { key: "phone", label: "Phone Number" },
  { key: "password", label: "Password" },
];

const individualDetails = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "********",
});

</script>

<template>
  <div class="relative flex flex-col lg:flex-row min-h-screen bg-white border-0 font-inter">
    <button
      @click="toggleSidebar"
      class="lg:hidden fixed top-20 right-4 z-50 bg-[#004d33] text-white p-2 rounded-md shadow-md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <div
      v-if="showSidebar"
      class="fixed inset-0 bg-gray-500 bg-opacity-50 z-30 lg:hidden"
      @click="closeSidebar"
    ></div>

    <div
      :class="[
        'fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 w-72 max-w-full lg:static lg:translate-x-0 lg:w-64 lg:min-h-screen',
        showSidebar ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <EditorSidebar @closeSidebar="closeSidebar" />
    </div>

    <main class="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
      <span class="text-sm text-gray-500">Home > My Account > {{ activeTab }}</span>

      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold mt-2 text-gray-800">{{ currentView }}</h1>
      </header>

      <div v-if="currentView === 'My Account'">
        <div class="flex justify-center border-b border-gray-200 mb-8 space-x-6">
          <button @click="activeTab = 'My Profile'" :class="[
            'py-2 px-1 border-b-2 transition duration-150 font-medium',
            activeTab === 'My Profile'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700',
          ]">
            My Profile
          </button>

        </div>

        <div v-if="activeTab === 'My Profile'" class="space-y-10">
          <div v-if="isOrganization !== null" class="p-6 bg-white shadow-lg space-y-8">
            <h2 class="text-xl font-semibold text-gray-800">
  {{ isOrganization ? "Organization Profile" : "My Profile" }}
</h2>


            <div class="grid md:grid-cols-2 gap-8">
              <div class="flex flex-col items-center p-6 border border-gray-200 rounded-xl">

                <div
                  class="w-24 h-24 bg-white border border-gray-300 rounded-lg flex items-center justify-center mb-3 shadow-inner overflow-hidden">
                  <img v-if="profileImage" :src="profileImage" class="w-full h-full object-cover" alt="Profile" />
                  <svg v-else class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
                  </svg>
                </div>


                <span class="text-xs text-gray-500 mb-4">
                  Allowed file types: JPG, PNG, JPEG
                </span>


                <div class="flex space-x-3">
                  <button @click="uploadProfileImage" :disabled="!selectedFile || isUploading"
                    class="px-4 py-2 text-sm text-green-800 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg shadow-sm disabled:opacity-50">
                    {{ isUploading ? "Saving..." : "Save" }}
                  </button>

                  <label for="logoUpload"
                    class="px-4 py-2 text-sm text-white bg-[#0c6b39] hover:bg-[#09572d] rounded-lg shadow-md cursor-pointer">
                    Upload
                  </label>

                  <input type="file" id="logoUpload" class="hidden" accept=".jpg,.png,.jpeg"
                    @change="onProfileImageSelect" />
                </div>

              </div>

              <div class="p-6 rounded-xl shadow-md bg-[#F2F9F3] relative">
                <div class="space-y-4 text-sm text-gray-700">
                  <div v-for="field in profileFields" :key="field.key" class="flex justify-between items-center">
                    <span class="font-semibold text-gray-600">
                      {{ field.label }}:
                    </span>

                    <input :type="field.key === 'password' ? 'password' : 'text'" v-model="field.model[field.key]"
                      :disabled="!isOrgEditing" :class="isOrgEditing
                        ? 'bg-white border border-gray-400 rounded-md p-1.5'
                        : 'bg-transparent border-none'" class="text-right w-2/3 transition duration-150" />
                  </div>
                </div>


              </div>
            </div>
          </div>

        </div>


      </div>

    </main>
  </div>
</template>

<style scoped>
:root {
  --primary-green: #0c6b39;
  --sidebar-green: #104037;
  --sidebar-green-dark: #09572d;
  --light-green-bg: #f2f9f3;
  --active-light-green: #d1fae5;
}

.font-inter {
  font-family: "Inter", sans-serif;
}

.main-button {
  background-color: var(--primary-green);
  transition: all 0.2s;
}

.main-button:hover {
  background-color: var(--sidebar-green-dark);
}

.org-info-card {
  background-color: var(--light-green-bg);
}

.tab-active {
  border-bottom: 2px solid var(--primary-green);
  color: var(--primary-green);
  font-weight: 600;
}
</style>
