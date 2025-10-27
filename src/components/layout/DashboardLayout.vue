<script setup>
import { computed } from "vue";

import AdminSidebar from "@/components/layout/AdminSidebar.vue";
import EditorSidebar from "@/views/Editor/EditorSidebar.vue";
import SuperAdminSidebar from "@/views/SuperAdmin/SuperAdminSidebar.vue";

const userRole = localStorage.getItem("role") || "user";

const sidebarComponent = computed(() => {
  switch (userRole) {
    case "editor":
      return EditorSidebar;
    case "superadmin":
      return SuperAdminSidebar;
    default:
      return AdminSidebar;
  }
});

const isSidebarOpen = ref(false)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <AdminHeader @toggle-sidebar="toggleSidebar" />

    <div class="flex flex-1">
      <component
        :is="sidebarComponent"
        :class="[
          'fixed lg:static top-0 left-0 z-40 transform transition-transform duration-300',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        ]"
      />
      
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
        @click="toggleSidebar"
      ></div>

      <main class="flex-1 p-8 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>
