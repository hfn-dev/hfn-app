<script setup>
import Header from './components/layout/Header.vue' 
import Footer from './components/layout/Footer.vue' 
import { RouterView } from 'vue-router'
import './style.css';

</script>

<template>
    <div id="app" class="antialiased text-gray-800">
        <Header />

        <RouterView />
        
        <Footer />
    </div>
</template>