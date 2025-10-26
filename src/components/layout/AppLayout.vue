<script setup>
import { useAuth } from '@/store/authStore'
import AdminHeader from './AdminHeader.vue'
import Header from './Header.vue'

const { isAuthenticated } = useAuth()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <component :is="isAuthenticated ? AdminHeader : Header" />

    <main class="flex-grow">
      <slot></slot>
    </main>
  </div>
</template>
