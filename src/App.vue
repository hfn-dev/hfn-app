

<script setup>
import { RouterView } from 'vue-router'
import { useAuth } from '@/store/authStore'

import Header from './components/layout/Header.vue'
import AdminHeader from './components/layout/AdminHeader.vue'
import Footer from './components/layout/Footer.vue'
import FeedbackFlag from '@/components/layout/FeedbackFlag.vue'

import './style.css'

const { role } = useAuth()
</script>

<template>
  <div id="app" class="antialiased text-gray-800">
    <component :is="role === 'admin' || role === 'editor' || role === 'tutor' || role === 'superadmin' ? AdminHeader : Header" />

    <RouterView />
    <FeedbackFlag />
    <Footer />
  </div>
</template>
