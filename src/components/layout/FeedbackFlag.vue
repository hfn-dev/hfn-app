<template>
  <div class="fixed right-0 top-1/2 -translate-y-1/2 z-50">
    <button 
      @click="openFeedbackForm"
      class="bg-orange-500 text-white font-semibold py-3 px-2 rounded-l-lg shadow-lg hover:bg-orange-600 transition duration-150 ease-in-out"
      style="writing-mode: vertical-rl; text-orientation: mixed; transform: rotate(180deg);"
    >
      Feedback 
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline ml-1 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>
</template>

<script setup>
const openFeedbackForm = () => {
  alert('You clicked the Feedback button!');
};
</script>
