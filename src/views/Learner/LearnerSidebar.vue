<script setup>
import { useAuth } from '@/store/authStore';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
  const route = useRoute();

const { logout } = useAuth()

const DARK_GREEN = '#004d33';
const LIGHT_GREEN = '#f2f9f3';

const currentPath = ref(route.path);

watch(
  () => route.path,
  (newPath) => {
    currentPath.value = newPath;
  },
  { immediate: true }
);

  
const navLinks = [
  
  {
    title: 'My Learning',
    path: '/learner/dashboard',
    icon: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20zm-1-8V7h2v5h4l-5 5-5-5h4z',
  },

  {
    title: "Courses",
    path: "/learner/courses",
    icon: "M12 3L1 9l11 6 9-5.1V17h2V9L12 3zm0 4.2L18.6 9 12 12.8 5.4 9 12 7.2z",
  },
  
  {
    title: 'My Account',
    path: '/learner/account',
    icon: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2',
  },
  {
    title: 'Support',
    path: '/learner/support',
    icon: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20zm0-13a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1zm0 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
  },
];

const handleLogout = () => {
  logout() 
  router.push('/') 
    window.scrollTo({ top: 0, behavior: 'smooth' });

}

const isLinkActive = (path) => path === currentPath.value;
</script>

<template>
  <div
    :style="{ backgroundColor: DARK_GREEN }"
    class="w-64 min-h-screen flex flex-col justify-between border-r sticky top-0 left-0 pt-8 text-white shadow-xl"
  >
    <nav class="space-y-1 px-4 flex flex-col">
      <RouterLink
        v-for="link in navLinks"
        :key="link.title"
        :to="link.path"
        @click="currentPath = link.path"
        class="flex items-center p-3 text-lg font-medium rounded-xl transition-all duration-200 cursor-pointer"
        :class="
          isLinkActive(link.path)
            ? 'font-bold shadow-md'
            : 'text-gray-200 hover:bg-green-700/50 hover:text-white'
        "
        :style="
          isLinkActive(link.path)
            ? { backgroundColor: LIGHT_GREEN, color: DARK_GREEN }
            : {}
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-6 h-6 mr-3"
        >
          <path :d="link.icon" />
        </svg>
        {{ link.title }}
      </RouterLink>
      <div class="p-4 border-t border-green-700">
      <button
        @click="handleLogout"
        class="flex items-center p-3 text-lg font-medium rounded-xl transition-all duration-200 text-gray-200 hover:bg-red-700/50 hover:text-white w-full text-left"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-6 h-6 mr-3"
        >
          <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M21 12H9" />
        </svg>
        Logout
      </button>
    </div>
    </nav>

    
  </div>
</template>

