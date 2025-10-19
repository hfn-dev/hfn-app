<script setup>
import registerImage from '@/assets/register.jpg';
// import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/store/authStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const username = ref('');
const password = ref('');
const rememberMe = ref(false);
const router = useRouter();
const { login } = useAuth();

// const authStore = useAuthStore();

// const handleLogin = () => {
//   console.log('Attempting to log in with:', {
//     username: username.value,
//     password: password.value,
//     rememberMe: rememberMe.value,
//   });
//   alert('Login attempted! (See console for details)');
// };

// const handleLogin = () => {
//   if (username.value && password.value) {
//     authStore.login();
//     router.push('/admin/dashboard');
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   } else {
//     console.error('Login failed: Missing email or password.');
//   }
// };

const handleLogin = () => {
  login();
  router.push('/admin/dashboard');
};

const handleGoogleSignIn = () => {
  console.log('Google Sign-in initiated');
  alert('Google Sign-in is not implemented in this demo.');
};

const alert = (message) => {
  console.log(message);
};
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
              Sign In
            </h2>
          </div>
        </div>

        <button
          @click="handleGoogleSignIn"
          class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-150 ease-in-out"
        >
          <svg
            class="w-5 h-5 mr-3"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.312-5.748 7.257-10.666 7.257-6.046 0-10.923-4.908-10.923-10.953 0-6.045 4.877-10.953 10.923-10.953 3.03 0 5.673 1.25 7.627 3.097l5.48-5.353C33.723 9.47 28.536 7 24 7c-9.06 0-16.398 7.373-16.398 16.423 0 9.05 7.338 16.423 16.398 16.423 9.324 0 16.634-6.52 16.634-16.22C40.634 22.924 43.431 20.835 43.611 20.083z"
            />
            <path
              fill="#FF3D00"
              d="M7.674 24.327l-.004-.004L7.673 24.321C7.397 23.376 7.25 22.395 7.25 21.378c0-1.02.147-2.003.424-2.95l-.004-.004L3.65 14.54l-.005.011C2.56 16.409 2 18.804 2 21.378c0 2.574.56 4.969 1.645 6.828l4.029-3.834z"
            />
            <path
              fill="#4CAF50"
              d="M24 39.75c6.241 0 11.458-4.321 12.868-10.038H24v-7.917h17.653c.123.70.187 1.432.187 2.183 0 1.93-.357 3.792-1.033 5.487-.71 1.83-1.64 3.498-2.825 5.044-3.564 4.79-8.995 7.917-15.982 7.917z"
            />
            <path
              fill="#1976D2"
              d="M24 8.75c3.27 0 6.27.79 8.94 2.164l5.48-5.354C34.78 3.518 29.593 1 24 1 18.96 1 14.28 2.872 10.667 6.036l4.029 3.833C17.31 8.5 20.59 7.75 24 7.75z"
            />
          </svg>
          Sign in with Google
        </button>

        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-white px-2 text-gray-500"> OR </span>
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300"></div>
          </div>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              v-model="username"
              required
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#0c6b39] focus:border-[#0c6b39] sm:text-sm transition-all duration-150 ease-in-out"
              placeholder="Username"
            />
          </div>

          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password-field"
              name="password"
              type="password"
              v-model="password"
              required
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#0c6b39] focus:border-[#0c6b39] sm:text-sm transition-all duration-150 ease-in-out"
              placeholder="Password"
            />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                v-model="rememberMe"
                class="h-4 w-4 text-[#0c6b39] focus:ring-[#0c6b39] border-gray-300 rounded transition-colors duration-150 ease-in-out"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a
                href="#"
                class="text-[#0c6b39] hover:text-[#09572d] font-medium transition-colors duration-150 ease-in-out"
              >
                Forgot Password
              </a>
            </div>
          </div>

          <div>
            <!-- <router-link
              to="/signinverification"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#0c6b39] hover:bg-[#09572d] shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0c6b39] transition-all duration-150 ease-in-out"
            >
              Login
            </router-link> -->
            <button
              @click="handleSignIn"
              class="w-full flex justify-center py-3 px-4 rounded-lg bg-[#0c6b39] text-white font-medium hover:bg-[#09572d] transition"
            >
              Sign In
            </button>
          </div>
        </form>

        <div class="text-center text-sm text-gray-600">
          Don't have an account?
          <router-link
            to="/register"
            class="text-[#0c6b39] hover:text-[#09572d] font-medium transition-colors duration-150 ease-in-out"
          >
            Register here
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-inter {
  font-family: 'Inter', sans-serif;
}
</style>
