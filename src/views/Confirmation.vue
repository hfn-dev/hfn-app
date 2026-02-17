<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/signin');
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 text-center">
      
      <div class="relative w-24 h-24 mx-auto mb-8">
        <div class="absolute inset-0 border-4 border-green-100 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
        
        <div class="absolute inset-0 flex items-center justify-center">
          <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
      </div>

      <h1 class="text-2xl font-bold text-gray-900 mb-3">
        Confirming Payment
        <span><p>Return to home</p></span>
      </h1>
      <p class="text-gray-600 mb-8 leading-relaxed">
        Thank you! Your payment <span class="font-semibold text-green-700">will be confirmed shortly</span> once our system finishes processing the transaction.
      </p>

      <button 
        @click="goHome"
        class="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-xl transition duration-300 shadow-sm"
      >
        Return to Home
      </button>

      <p class="mt-8 text-sm text-gray-400">
        You will receive an email notification once confirmed.
      </p>
    </div>
  </div>
</template>

<style scoped>
.animate-spin {
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
