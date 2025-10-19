<!-- <script setup>
import { useAuthStore } from '@/store/authStore';
import AdminHeader from './AdminHeader.vue';
import Header from './Header.vue';

const authStore = useAuthStore();
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AdminHeader v-if="authStore.isAuthenticated" />
    <Header v-else />

    <main class="flex-grow">
      <slot></slot>
    </main>
  </div>
</template> -->

<script setup>
import { useAuth } from '@/store/authStore';
import AdminHeader from './AdminHeader.vue';
import Header from './Header.vue';

const { isAuthenticated } = useAuth();
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- <component :is="isAuthenticated ? AdminHeader : Header" /> -->
    <main class="flex-grow">
      <slot></slot>
    </main>
  </div>
</template>
