

<script setup>
import { useAuth } from '@/store/authStore'
import { RouterView } from 'vue-router'

import FeedbackFlag from '@/components/layout/FeedbackFlag.vue'
import AdminHeader from './components/layout/AdminHeader.vue'
import Footer from './components/layout/Footer.vue'
import Header from './components/layout/Header.vue'

import './style.css'

const { role } = useAuth()
</script>

<!-- <template>
  <div id="app" class="antialiased text-gray-800">
    <component :is="role === 'admin' || role === 'editor' || role === 'user' || role === 'tutor' || role === 'superadmin' || role === 'learner' ? AdminHeader : Header" />

    <RouterView />
    <FeedbackFlag />
    <Footer />
  </div>
</template> -->

<template>
  <div id="app" class="font-sans antialiased text-gray-800">
    <component :is="['admin', 'editor', 'user', 'tutor', 'superadmin', 'learner'].includes(role) ? AdminHeader : Header" />

    <RouterView v-slot="{ Component }">
      <transition name="fade-slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>

    <FeedbackFlag />
    <Footer />
  </div>
</template>

<style>
/* Transition duration and timing function */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease-out;
}

/* State when the page is leaving */
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px); /* Slides slightly to the left as it disappears */
}

/* State before the page enters */
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px); /* Slides in from the right */
}

/* Ensure the background stays clean during transition */
#app {
  overflow-x: hidden;
  width: 100%;
}
</style>