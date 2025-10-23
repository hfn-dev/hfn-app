<script setup>
import registerImage from '@/assets/register.jpg';
import { useAuth } from '@/store/authStore';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { login } = useAuth();
const verificationCode = ref(['', '', '', '', '', '']);
const timerSeconds = ref(3 * 60);
const isTimerRunning = ref(true);
const timerInterval = ref(null);
const inputRefs = ref([]);

const displayTime = computed(() => {
  const minutes = Math.floor(timerSeconds.value / 60);
  const seconds = timerSeconds.value % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});

const startTimer = () => {
  if (timerInterval.value) clearInterval(timerInterval.value);
  isTimerRunning.value = true;
  timerSeconds.value = 3 * 60;
  timerInterval.value = setInterval(() => {
    if (timerSeconds.value > 0) {
      timerSeconds.value--;
    } else {
      clearInterval(timerInterval.value);
      isTimerRunning.value = false;
    }
  }, 1000);
};

onMounted(() => {
  startTimer();
  if (inputRefs.value[0]) {
    inputRefs.value[0].focus();
  }
});

onUnmounted(() => {
  clearInterval(timerInterval.value);
});

const handleInput = (index, event) => {
  const value = event.target.value;

  if (value.length > 1) {
    event.target.value = value.charAt(0);
    verificationCode.value[index] = value.charAt(0);
  } else {
    verificationCode.value[index] = value;
  }

  if (value && index < verificationCode.value.length - 1) {
    inputRefs.value[index + 1].focus();
  }
};

const handleKeydown = (index, event) => {
  if (
    event.key === 'Backspace' &&
    !verificationCode.value[index] &&
    index > 0
  ) {
    inputRefs.value[index - 1].focus();
    verificationCode.value[index - 1] = '';
  }
};

const fullCode = computed(() => verificationCode.value.join(''));

const handleVerification = () => {
  if (fullCode.value.length === 6) {
    console.log('Verifying code:', fullCode.value);
    alert('Verification attempted for code: ' + fullCode.value);
  } else {
    alert('Please enter the full 6-digit code.');
  }
};

const handleResend = () => {
  console.log('Resend email initiated');
  startTimer();
  alert('Verification code resent! Timer reset.');
};

const alert = (message) => {
  console.log(message);
};

const handleSignupVerification = () => {
  login();
  router.push('/signin');
};

// const handleVerification = () => {
//   if (fullCode.value.length === 6) {
//     console.log('Verifying code:', fullCode.value);
//     alert('Verification successful!');
//     setTimeout(() => {
//       router.push('/signin'); 
//     }, 1000);
//   } else {
//     alert('Please enter the full 6-digit code.');
//   }
// };
</script>

<template>
  <div class="min-h-screen grid lg:grid-cols-5 bg-white w-full h-full">
    <div
      class="hidden lg:block lg:col-span-2 relative bg-cover bg-center rounded-r-[300px]"
      :style="{ backgroundImage: `url(${registerImage})` }"
    ></div>

    <div
      class="lg:col-span-3 p-8 md:p-12 lg:p-16 flex items-center justify-center w-full"
    >
      <div class="max-w-md w-full space-y-8">
        <div class="mb-16">
          <div
            class="w-full px-4 py-4 sm:px-6 rounded-2xl border-2 border-green-100 bg-white shadow-md text-center"
          >
            <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Email Verification
            </h2>
          </div>
        </div>

        <p class="text-center text-gray-600 text-sm">
          Check your inbox. Enter the 6-digit code sent to your email to finish
          sign up.
        </p>

        <form @submit.prevent="handleVerification" class="space-y-6">
          <div class="flex justify-center space-x-2 sm:space-x-3">
            <input
              v-for="(digit, index) in verificationCode"
              :key="index"
              :ref="(el) => (inputRefs[index] = el)"
              :value="digit"
              @input="handleInput(index, $event)"
              @keydown="handleKeydown(index, $event)"
              type="text"
              maxlength="1"
              required
              inputmode="numeric"
              pattern="[0-9]*"
              class="w-1/6 aspect-square text-center text-2xl font-bold border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#0c6b39] focus:border-[#0c6b39] transition-all duration-150 ease-in-out"
              :class="{ 'opacity-50 pointer-events-none': !isTimerRunning }"
            />
          </div>

          <div class="flex justify-between items-center text-sm mt-4">
            <div class="text-gray-600">
              Didn't receive email?
              <button
                type="button"
                @click="handleResend"
                :disabled="isTimerRunning"
                class="font-semibold transition-colors duration-150 ease-in-out"
                :class="
                  isTimerRunning
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-[#0c6b39] hover:text-[#09572d]'
                "
              >
                Resend
              </button>
            </div>

            <span
              class="font-medium"
              :class="isTimerRunning ? 'text-gray-700' : 'text-red-600'"
            >
              {{ isTimerRunning ? displayTime + ' minutes' : 'Expired' }}
            </span>
          </div>

          <div>
            <!-- <router-link
              to="/admin/dashboard"
              type="submit"
              :disabled="fullCode.length !== 6 || !isTimerRunning"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0c6b39] transition-all duration-150 ease-in-out"
              :class="
                fullCode.length === 6 && isTimerRunning
                  ? 'bg-[#0c6b39] hover:bg-[#09572d]'
                  : 'bg-gray-400 cursor-not-allowed'
              "
            >
              Sign Up
            </router-link> -->
            <button
              @click="handleSignupVerification"
              :disabled="fullCode.length !== 6 || !isTimerRunning"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white shadow-sm transition-all duration-150 ease-in-out"
              :class="
                fullCode.length === 6 && isTimerRunning
                  ? 'bg-[#0c6b39] hover:bg-[#09572d]'
                  : 'bg-gray-400 cursor-not-allowed'
              "
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}
.h-full {
  height: 100%;
}
</style>
