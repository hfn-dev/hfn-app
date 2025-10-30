<script setup>
import cert from "@/assets/cert.png";
import sign from "@/assets/sign.png";
import SuperAdminSidebar from "@/views/SuperAdmin/SuperAdminSidebar.vue";
import { computed, reactive, ref } from "vue";

const isOrganization = ref(true);
const currentView = ref("My Profile");
const activeTab = ref("My Profile");
const previewImageUrl = ref(null);
const uploadedFileName = ref(null);
const uploadStatus = ref("Awaiting Upload");
const fileInput = ref(null);
const profileImageUrl = ref(null);

let nextSignatureId = 3;
const orgDetails = reactive({
  name: "Ruthie & Co Nigeria Limited",
  email: "peterpan@gmail.com.us",
  phone: "+234 123 456 78",
  password: "********",
});
const orgDetailsKeys = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email Address" },
  { key: "phone", label: "Phone Number" },
  { key: "password", label: "Password" },
];

const individualDetails = reactive({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 555 123 4567",
  password: "********",
});
const individualDetailsKeys = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "email", label: "Email Address" },
  { key: "phone", label: "Phone Number" },
  { key: "password", label: "Password" },
];

const invitations = reactive([
  { id: 1, email: "peterpan@gmail.com", sent: true },
  { id: 2, email: "", sent: false },
  { id: 3, email: "", sent: false },
]);

const sentInvitesCount = computed(
  () => invitations.filter((i) => i.sent).length
);

const interests = reactive([
  { id: 10, name: "Mother", selected: true, isMainCategory: true },
  { id: 11, name: "Child", selected: true, isMainCategory: true },
  { id: 12, name: "Baby", selected: true, isMainCategory: true },
  { id: 13, name: "Pregnancy", selected: true, isMainCategory: true },
  { id: 1, name: "Marketing", selected: true, isMainCategory: false },
  { id: 2, name: "Gynaecology", selected: true, isMainCategory: false },
  { id: 3, name: "Paediatrics", selected: true, isMainCategory: false },
  { id: 4, name: "General Health", selected: false, isMainCategory: false },
  { id: 5, name: "Insurance", selected: false, isMainCategory: false },
  { id: 6, name: "Dentistry", selected: false, isMainCategory: false },
]);

const handleProfilePicUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
    alert("Please upload a valid JPG or PNG image.");
    return;
  }

  if (file.size > 1024 * 1024) {
    alert("File size exceeds 1MB limit.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    profileImageUrl.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  uploadedFileName.value = file ? file.name : null;

  if (!file) {
    clearPreview();
    uploadStatus.value = "No file selected";
    return;
  }

  if (
    ![
      "application/zip",
      "application/x-rar-compressed",
      "image/jpeg",
      "image/png",
    ].includes(file.type) &&
    file.type !== ""
  ) {
    alert("Invalid file type. Please upload a zip, rar, jpg, or png file.");
    clearPreview();
    uploadStatus.value = "Invalid file type";
    return;
  }

  if (file.size > 1024 * 1024) {
    alert("File size exceeds 1MB limit.");
    clearPreview();
    uploadStatus.value = "File too large (Max 1Mb)";
    return;
  }

  if (file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImageUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
    uploadStatus.value = `File ready: ${file.name}`;
  } else {
    previewImageUrl.value = null;
    uploadStatus.value = `File ready: ${file.name}`;
  }
};

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const clearPreview = () => {
  previewImageUrl.value = null;
  uploadedFileName.value = null;
  uploadStatus.value = "Awaiting Upload";
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const sendInvitation = (id) => {
  const invite = invitations.find((i) => i.id === id);
  if (invite && invite.email !== "") {
    console.log(`Sending invite to: ${invite.email}`);
    invite.sent = true;
  }
};

const removeInvitation = (id) => {
  const invite = invitations.find((i) => i.id === id);
  if (invite) {
    invite.email = "";
    invite.sent = false;
  }
};

const signatures = reactive([
  {
    id: 1,
    name: "Signature 1",
    date: "Created on October 25, 2025",
    imageUrl: sign,
  },
  {
    id: 2,
    name: "Signature 2",
    date: "Created on October 25, 2025",
    imageUrl: sign,
  },
]);

const addSignature = () => {
  if (!previewImageUrl.value) {
    alert("Please upload a valid image file first to add a signature.");
    return;
  }

  const newSignature = {
    id: nextSignatureId++,
    name: uploadedFileName.value
      ? uploadedFileName.value.split(".")[0]
      : `New Signature ${nextSignatureId - 1}`,
    date: `Uploaded on ${new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`,
    imageUrl: previewImageUrl.value,
  };

  signatures.push(newSignature);
  clearPreview();
  alert(`Signature "${newSignature.name}" added successfully!`);
};

const deleteSignature = (id) => {
  const index = signatures.findIndex((sig) => sig.id === id);
  if (index !== -1) {
    const deletedName = signatures[index].name;
    signatures.splice(index, 1);
    alert(`Signature "${deletedName}" deleted successfully.`);
  }
};

const downloadSignature = (imageUrl, fileName) => {
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = `${fileName || "signature"}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  console.log(`Signature "${fileName}" downloaded.`);
};
</script>

<template>
  <div class="flex flex-col lg:flex-row min-h-screen font-sans">
    <SuperAdminSidebar />

    <main class="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
      <span class="text-sm text-gray-500"
        >Home / My Account / {{ activeTab }}</span
      >

      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold mt-2 text-gray-800">{{ currentView }}</h1>
      </header>

      <div v-if="currentView === 'My Profile'">
        <div
          class="flex justify-center border-b border-gray-200 mb-8 space-x-6"
        >
          <button
            @click="activeTab = 'My Profile'"
            :class="[
              'py-2 px-1 border-b-2 transition duration-150 font-medium',
              activeTab === 'My Profile'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            ]"
          >
            My Profile
          </button>
          <button
            @click="activeTab = 'Signatures'"
            :class="[
              'py-2 px-1 border-b-2 transition duration-150 font-medium',
              activeTab === 'Signatures'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            ]"
          >
            Signatures
          </button>
        </div>

        <div v-if="activeTab === 'My Profile'" class="space-y-10">
          <div v-if="isOrganization" class="p-6 bg-white shadow-lg space-y-8">
            <h2 class="text-xl font-semibold text-gray-800">Profile</h2>

            <div class="grid md:grid-cols-2 gap-8">
              <div
                class="flex flex-col items-center p-6 border border-gray-200 rounded-xl"
              >
                <div
                  class="w-24 h-24 bg-white border border-gray-300 rounded-lg flex items-center justify-center mb-3 shadow-inner"
                >
                  <img
                    v-if="profileImageUrl"
                    :src="profileImageUrl"
                    alt="Profile Picture"
                    class="w-full h-full object-cover"
                  />
                  <svg
                    v-else
                    class="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>

                <span class="text-xs text-gray-500 mb-4">
                  Allowed file types: JPG, PNG, JPEG
                </span>

                <div class="flex space-x-3">
                  <button
                    class="px-4 py-2 text-sm text-green-800 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg shadow-sm transition duration-150"
                  >
                    Save
                  </button>
                  <label
                    for="logoUpload"
                    class="px-4 py-2 text-sm text-white bg-[#0c6b39] hover:bg-[#09572d] rounded-lg shadow-md cursor-pointer transition duration-150"
                  >
                    Upload
                  </label>
                  <input
                    type="file"
                    id="logoUpload"
                    class="hidden"
                    accept=".jpg,.png,.jpeg"
                    @change="handleProfilePicUpload"
                  />
                </div>
              </div>

              <div class="p-6 rounded-xl shadow-md bg-[#F2F9F3] relative">
                <div class="space-y-4 text-sm text-gray-700">
                  <div
                    v-for="detail in orgDetailsKeys"
                    :key="detail.key"
                    class="flex justify-between items-center"
                  >
                    <span class="font-semibold text-gray-600"
                      >{{ detail.label }}:</span
                    >
                    <input
                      :type="detail.key === 'password' ? 'password' : 'text'"
                      v-model="orgDetails[detail.key]"
                      :disabled="!isOrgEditing"
                      :class="
                        isOrgEditing
                          ? 'bg-white border border-gray-400 rounded-md p-1.5'
                          : 'bg-transparent border-none'
                      "
                      class="text-right w-2/3 transition duration-150"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="p-6 bg-white rounded-xl shadow-lg space-y-8">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold">My Personal Profile</h2>
              <button
                @click="toggleIndividualEdit"
                :class="
                  isIndividualEditing
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-[#0c6b39] hover:bg-[#09572d]'
                "
                class="px-6 py-2 text-sm text-white rounded-lg shadow-md transition duration-150"
              >
                {{ isIndividualEditing ? "Save Changes" : "Edit" }}
              </button>
            </div>

            <div class="grid md:grid-cols-2 gap-8">
              <div
                class="flex flex-col items-center p-6 border border-gray-200 rounded-xl bg-gray-50"
              >
                <div
                  class="w-24 h-24 bg-white border border-gray-300 rounded-full flex items-center justify-center mb-3 shadow-inner overflow-hidden"
                >
                  <img
                    v-if="profileImageUrl"
                    :src="profileImageUrl"
                    alt="Profile Picture"
                    class="w-full h-full object-cover"
                  />
                  <svg
                    v-else
                    class="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>

                <span class="text-xs text-gray-500 mb-4">
                  Allowed file types: JPG, PNG, JPEG
                </span>

                <div class="flex space-x-3">
                  <button
                    class="px-4 py-2 text-sm text-green-800 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg shadow-sm transition duration-150"
                  >
                    Save
                  </button>
                  <label
                    for="profilePicUpload"
                    class="px-4 py-2 text-sm text-white bg-[#0c6b39] hover:bg-[#09572d] rounded-lg shadow-md cursor-pointer transition duration-150"
                  >
                    Upload
                  </label>
                  <input
                    type="file"
                    id="profilePicUpload"
                    class="hidden"
                    accept=".jpg,.png,.jpeg"
                    @change="handleProfilePicUpload"
                  />
                </div>
              </div>

              <div class="p-6 rounded-xl shadow-md bg-[#F2F9F3] relative">
                <div class="space-y-4 text-sm text-gray-700">
                  <div
                    v-for="detail in individualDetailsKeys"
                    :key="detail.key"
                    class="flex justify-between items-center"
                  >
                    <span class="font-semibold text-gray-600"
                      >{{ detail.label }}:</span
                    >
                    <input
                      :type="detail.key === 'password' ? 'password' : 'text'"
                      v-model="individualDetails[detail.key]"
                      :disabled="!isIndividualEditing"
                      :class="
                        isIndividualEditing
                          ? 'bg-white border border-gray-400 rounded-md p-1.5'
                          : 'bg-transparent border-none'
                      "
                      class="text-right w-2/3 transition duration-150"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center mt-8 pt-6 border-t border-gray-200">
              <h3 class="text-xl font-bold mb-2 text-gray-800">
                Account Status: <span class="text-green-600">VERIFIED</span>
              </h3>
            </div>
          </div>

          <div v-if="isOrganization" class="p-6 bg-white shadow-lg">
            <h2 class="text-xl font-semibold mb-6">Invitations</h2>
            <p class="text-gray-600 mb-4">
              You have sent
              <span class="font-semibold text-gray-800"
                >{{ sentInvitesCount }} of {{ invitations.length }}</span
              >
              invites.
            </p>

            <div class="space-y-4">
              <div
                v-for="invite in invitations"
                :key="invite.id"
                class="flex items-center space-x-3"
              >
                <input
                  type="email"
                  :placeholder="'Enter email for invite ' + invite.id"
                  v-model="invite.email"
                  :readonly="invite.sent"
                  :disabled="invite.sent"
                  :class="
                    invite.sent
                      ? 'bg-gray-100'
                      : 'bg-white focus:ring-primary-green focus:border-primary-green'
                  "
                  class="flex-grow p-3 border border-gray-300 rounded-lg"
                />
                <button
                  v-if="invite.sent"
                  @click="removeInvitation(invite.id)"
                  class="text-red-600 text-sm font-semibold hover:underline"
                >
                  Remove
                </button>
                <button
                  v-else
                  :disabled="invite.email === ''"
                  @click="sendInvitation(invite.id)"
                  class="text-sm font-semibold px-4 py-2 text-white rounded-lg main-button w-24 disabled:opacity-50"
                >
                  Invite
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="activeTab === 'Signatures'" class="space-y-10">
          <div class="p-6 bg-white shadow-lg space-y-6">
            <h2 class="text-xl font-semibold text-gray-800">
              Certificate Template
            </h2>
            <div class="flex justify-center">
              <img
                :src="cert"
                alt="Certificate Template Preview"
                class="w-full max-w-lg border border-gray-300 rounded-lg shadow-xl"
              />
            </div>
          </div>

          <div class="p-6 bg-white shadow-lg space-y-6">
            <h2 class="text-xl font-semibold text-gray-800">
              Upload Signature
            </h2>

            <input
              type="file"
              ref="fileInput"
              @change="handleFileUpload"
              class="hidden"
              accept=".zip,.rar,.jpg,.png,.jpeg"
            />

            <div
              class="flex justify-center items-center p-12 border-2 border-dashed rounded-xl transition duration-150 cursor-pointer"
              :class="[
                previewImageUrl || uploadStatus.includes('File ready')
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 bg-gray-50 hover:bg-gray-100',
              ]"
              @click="triggerFileInput"
            >
              <div class="text-center">
                <img
                  v-if="previewImageUrl"
                  :src="previewImageUrl"
                  alt="Signature Preview"
                  class="mx-auto max-h-40 max-w-full mb-3 border border-gray-200 shadow-md"
                />

                <svg
                  v-else
                  class="w-10 h-10 mx-auto mb-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.885-7.734L6 8m6 4a4 4 0 01-3.615 2.152L12 14.5l-3.615 2.152A4 4 0 017 16m0 0l-1 1m7 0l1 1m-2-2l2-2m-2 2l-2-2m4 4h.01M6 18h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>

                <p
                  :class="[
                    previewImageUrl || uploadStatus.includes('File ready')
                      ? 'text-green-700'
                      : 'text-gray-600',
                  ]"
                  class="text-sm font-medium"
                >
                  {{
                    uploadStatus === "Awaiting Upload"
                      ? "Click to select file for upload"
                      : uploadStatus
                  }}
                </p>
                <p class="text-xs text-gray-400 mt-1">
                  Supports zip, rar, jpg, png files (Max 1Mb)
                </p>
              </div>
            </div>
            <div class="flex justify-end pt-4 border-t border-gray-100">
              <button
                @click="addSignature"
                class="px-6 py-2 text-sm text-white rounded-lg shadow-md bg-green-700 hover:bg-green-800 transition duration-150"
              >
                Add Signature
              </button>
            </div>
          </div>
          <div class="p-6 bg-white shadow-lg">
            <h2 class="text-xl font-semibold mb-6 text-gray-800">
              My Uploaded Signatures
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="sig in signatures"
                :key="sig.id"
                class="p-4 border border-gray-200 rounded-lg flex flex-col items-center text-center"
              >
                <div
                  class="w-full h-24 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center mb-3 overflow-hidden"
                >
                  <img
                    :src="sig.imageUrl"
                    :alt="sig.name"
                    class="h-full w-full object-contain"
                  />
                </div>
                <h3 class="font-semibold text-gray-700 mb-1">
                  {{ sig.name }}
                </h3>
                <p class="text-xs text-gray-500 mb-3">
                  {{ sig.date }}
                </p>
                <div class="flex space-x-4 text-sm">
                  <button
                    @click="deleteSignature(sig.id)"
                    class="flex items-center text-red-600 hover:text-red-800 transition duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Delete
                  </button>
                  <button
                    @click="downloadSignature(sig.imageUrl, sig.name)"
                    class="flex items-center text-green-600 hover:text-green-800 transition duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                      />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="p-10 text-center bg-white rounded-xl shadow-lg text-gray-500"
      >
        <h2 class="text-2xl font-semibold mb-3">
          Welcome to the {{ currentView }} Page
        </h2>
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