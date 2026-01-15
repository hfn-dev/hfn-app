<script setup>
import hfn_logo from "@/assets/hfn-health.png";
import { useAuth } from "@/store/authStore";

import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const DARK_GREEN = "#004d33";
const ACTIVE_BG_COLOR = "#f2f9f3";
const currentPath = ref(route.path)
const isMobileMenuOpen = ref(false);


const { user, isAuthenticated, logout, role } = useAuth();

const dashboardLink = computed(() => {
  if (!isAuthenticated.value) return "/signin";
  
  const userRole = role.value || "member";
  const roleMap = {
    superadmin: "/superadmin/dashboard",
    admin: "/admin/dashboard",
    editor: "/editor/dashboard",
    tutor: '/tutor/dashboard',
    learner: '/learner/dashboard',
    member: "/user/dashboard",
  };
  return roleMap[userRole.toLowerCase()] || "/dashboard";
});

const handleLinkClick = (path) => {
  currentPath.value = path;
  isMobileMenuOpen.value = false;
};

const isLinkActive = (path) => path === currentPath.value;

const navLinks = [
  { title: "Home", path: "/", hasDropdown: false },
  { title: "About Us", path: "/about", hasDropdown: false },
  { title: "Latest Updates", path: "/blog", hasDropdown: true },
  { title: "Membership", path: "/membership", hasDropdown: true },
  { title: "Contact Us", path: "/contact", hasDropdown: false },
];



const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('refresh');
  localStorage.removeItem('role');
  localStorage.removeItem('user');

  logout();

  router.push("/");
  window.scrollTo({ top: 0, behavior: "smooth" });
};


watch(
  () => route.path,
  (newPath) => {
    currentPath.value = newPath;
  },
  { immediate: true }
);




</script>

<template>
  <header class="w-full bg-white shadow-sm top-0 z-10">
    <div :style="{ backgroundColor: DARK_GREEN }"
      class="text-white text-sm flex justify-end px-4 sm:px-8 py-2 rounded-b-xl">
      <div class="relative group cursor-pointer">
        <div class="flex items-center px-3 py-1 rounded-full bg-green-900 bg-opacity-10 hover:bg-opacity-20 transition">
          English
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="w-4 h-4 ml-1 transition-transform text-white">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        <div
          class="absolute right-0 mt-2 w-32 bg-white text-gray-800 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-10 overflow-hidden">
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">Hausa</a>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">Igbo</a>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">Yoruba</a>
        </div>
      </div>
    </div>
    <nav class="flex items-center justify-between lg:px-8 py-4 max-w-7xl mx-auto">
      <div class="flex items-center flex-shrink-0">


        <RouterLink to="/" @click="handleLinkClick('/')" class="cursor-pointer">
          <img :src="hfn_logo" alt="HFN Logo" class="w-54 h-auto mr-3 flex-shrink-0" />
        </RouterLink>
      </div>


      <div class="hidden lg:flex items-center space-x-4">
        <RouterLink v-for="link in navLinks" :key="link.title" :to="link.path" @click="handleLinkClick(link.path)"
          class="flex items-center px-4 py-3 font-semibold transition-all duration-200 rounded-lg whitespace-nowrap"
          :style="isLinkActive(link.path)
              ? {
                backgroundColor: ACTIVE_BG_COLOR,
                color: DARK_GREEN,
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }
              : {}
            " :class="[
            !isLinkActive(link.path)
              ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              : '',
          ]">
          {{ link.title }}
          <svg v-if="link.hasDropdown" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="[
              'w-4 h-4 ml-1 transition-transform',
              isLinkActive(link.path)
                ? `text-[${DARK_GREEN}]`
                : 'text-gray-500',
            ]">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </RouterLink>
      </div>

      <div class="hidden lg:flex items-center space-x-4">
        <button class="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.375 21a2 2 0 1 0 3.25 0" />
          </svg>
        </button>

        <div class="relative group cursor-pointer">
          <div :style="{
            backgroundColor: ACTIVE_BG_COLOR,
            borderColor: DARK_GREEN,
          }"
            class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-400 hover:border-green-600 transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              :style="{ color: DARK_GREEN }" class="w-6 h-6">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          
          <div v-if="user"
            class="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50 overflow-hidden ring-1 ring-gray-200">
            <div class="p-3 border-b">
              <p class="font-semibold text-sm">
                {{ user.name }}
              </p>
              <p class="text-xs text-gray-500">
                {{ user.email }}
              </p>
            </div>

            <RouterLink :to="dashboardLink" class="block px-4 py-2 hover:bg-gray-100 transition duration-150">
              Dashboard
            </RouterLink>

            <a href="#" @click.prevent="handleLogout"
              class="block px-4 py-2 hover:bg-gray-100 transition duration-150 text-red-600 font-medium">
              Logout
            </a>
          </div>

        </div>
      </div>
    </nav>
  </header>
</template>
