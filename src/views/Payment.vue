<script setup>
import { ref, onMounted } from 'vue';

const copied = ref(false);
const paymentInfo = ref(null)

onMounted(() => {
  const saved = localStorage.getItem('membership_payment')
  if (saved) {
    paymentInfo.value = JSON.parse(saved)
  }
})  

const accountDetails = {
  bankName: "Globus Bank",
  accountName: "Healthcare Federation Of Nigeria",
  accountNumber: "0123456789",
  referenceCode: "TRANS-" + Math.floor(10000 + Math.random() * 90000)
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-[#004d33]">Complete Your Payment</h1>
        <p class="text-gray-600 mt-2">Transfer the exact amount to the account below</p>
      </div>

      <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div class="bg-[#004d33] p-8 text-white text-center">
          <p class="text-green-200 text-xs uppercase tracking-widest mb-1 font-semibold">Amount Due</p>
          <h2 class="text-4xl font-black">
  ₦{{ paymentInfo?.amount.toLocaleString() }}
</h2>

<p class="text-green-200 text-sm mt-1">
  {{ paymentInfo?.category_name }} Membership
</p>

        </div>

        <div class="p-8 space-y-5">
          <div v-for="(value, label) in { 
            'Bank Name': accountDetails.bankName, 
            'Account Name': accountDetails.accountName, 
            'Account Number': accountDetails.accountNumber 
          }" :key="label" class="group">
            <p class="text-xs text-gray-400 uppercase font-semibold mb-1">{{ label }}</p>
            <div class="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-transparent group-hover:border-green-200 transition-all">
              <span class="text-gray-800 font-bold">{{ value }}</span>
              <button 
                @click="copyToClipboard(value)"
                class="text-[#E87A18] hover:bg-orange-50 p-2 rounded-lg transition-colors"
                title="Copy"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
          </div>

          <div class="mt-6 p-4 bg-orange-50 rounded-2xl border-2 border-dashed border-[#E87A18]/30">
            <p class="text-xs text-[#E87A18] font-bold uppercase mb-1">Payment Reference</p>
            <div class="flex justify-between items-center">
              <span class="text-xl font-mono font-black text-[#E87A18]">{{ accountDetails.referenceCode }}</span>
              <button @click="copyToClipboard(accountDetails.referenceCode)" class="text-[#E87A18] font-bold text-sm underline">Copy</button>
            </div>
            <p class="text-[10px] text-gray-500 mt-2 uppercase italic tracking-tighter">* MUST include this in your transfer description</p>
          </div>
        </div>

        <div class="px-8 pb-8 space-y-3">
          <button 
            @click="$router.push('/confirmation')" 
            class="w-full bg-[#00cc66] hover:bg-[#00aa55] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-green-100 active:scale-[0.98]"
          >
            I've Sent the Funds
          </button>
          <button 
            @click="$router.go(-1)" 
            class="w-full text-gray-400 text-sm font-medium py-2 hover:text-gray-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>

      <div class="mt-8 flex items-center justify-center gap-2 text-gray-400 text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Secure Bank Transfer
      </div>
    </div>

    <transition name="pop">
      <div v-if="copied" class="fixed bottom-8 bg-gray-900 text-white px-6 py-3 rounded-full shadow-xl text-sm font-bold z-50">
        Copied to clipboard!
      </div>
    </transition>
  </div>
</template>

<style scoped>
.pop-enter-active { animation: pop-in 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.pop-leave-active { animation: pop-in 0.3s reverse ease-in; }
@keyframes pop-in {
  0% { opacity: 0; transform: translateY(20px) scale(0.8); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
