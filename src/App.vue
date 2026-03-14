

<script setup>
import { useAuth } from "@/store/authStore";
import { RouterView } from "vue-router";

import FeedbackFlag from "@/components/layout/FeedbackFlag.vue";
import AdminHeader from "./components/layout/AdminHeader.vue";
import Footer from "./components/layout/Footer.vue";
import Header from "./components/layout/Header.vue";
import AppToast from "@/components/layout/AppToast.vue";
import "./style.css";

const { role } = useAuth();
</script>


<template>
  <div id="app" class="font-sans antialiased text-gray-800">
    <component
      :is="
        ['admin', 'editor', 'user', 'tutor', 'superadmin', 'learner'].includes(
          role
        )
          ? AdminHeader
          : Header
      "
    />

    <RouterView v-slot="{ Component, route }">
      <transition name="fade-slide" mode="out-in">
        <div>
          <component :is="Component" :key="route.fullPath" />
        </div>
      </transition>
    </RouterView>
    <AppToast />

    <FeedbackFlag />
    <Footer />
  </div>
</template>

<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease-out;
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

#app {
  overflow-x: hidden;
  width: 100%;
}
</style>
