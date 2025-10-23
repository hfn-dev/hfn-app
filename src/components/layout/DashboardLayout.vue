<script setup>
import { computed } from 'vue'

import AdminSidebar from '@/components/layout/AdminSidebar.vue'
import EditorSidebar from '@/views/Editor/EditorSidebar.vue'
import SuperAdminSidebar from '@/views/SuperAdmin/SuperAdminSidebar.vue'

const userRole = localStorage.getItem('role') || 'user'

const sidebarComponent = computed(() => {
  switch (userRole) {
    case 'editor': return EditorSidebar
    case 'superadmin': return SuperAdminSidebar
    default: return AdminSidebar
  }
})
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <component :is="sidebarComponent" />
    <main class="flex-1 p-8 overflow-y-auto">
      <router-view />
    </main>
  </div>
</template>
