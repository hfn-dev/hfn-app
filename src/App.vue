

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

<template>
  <div id="app" class="antialiased text-gray-800">
    <component :is="role === 'admin' || role === 'editor' || role === 'user' || role === 'tutor' || role === 'superadmin' || role === 'learner' ? AdminHeader : Header" />

    <RouterView />
    <FeedbackFlag />
    <Footer />
  </div>
</template>
