<script setup>
import hfn_logo from '@/assets/hfn_logo.png';
</script>

<template>
  <footer class="w-full">
    <div
      class="bg-green-50 pt-16 pb-12 rounded-t-[2rem] shadow-inner border-t border-green-200"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-y-10">
          <div class="md:col-span-4 lg:col-span-3 flex flex-col space-y-4 pr-4">
            <div class="mb-4">
              <img :src="hfn_logo" alt="HFN Logo" class="h-16 w-auto" />
            </div>

            <div class="flex items-start space-x-2 text-base text-gray-700">
              <svg
                class="w-5 h-5 mt-0.5 text-green-700 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span class="leading-relaxed">
                3rd floor, 109, Awolowo Road, <br />
                Opposite Standard Chartered <br />
                Bank, Ikoyi, Lagos State, Nigeria
              </span>
            </div>

            <div class="flex items-center space-x-2 text-base text-gray-700">
              <svg
                class="w-5 h-5 text-green-700 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              <a
                href="mailto:info@hfnnigeria.com"
                class="hover:text-green-700 transition"
                >info@hfnnigeria.com</a
              >
            </div>

            <div class="flex items-center space-x-2 text-base text-gray-700">
              <svg
                class="w-5 h-5 text-green-700 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
              <a
                href="tel:+2347030567554"
                class="hover:text-green-700 transition"
                >+234 703 056 7554</a
              >
            </div>
          </div>

          <div
            class="md:col-span-8 lg:col-span-9 grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 gap-y-10 md:gap-x-4 lg:gap-x-8"
          >
            <div>
              <h5 class="font-bold text-lg mb-3 text-gray-900">
                <a href="#" class="border-b-2 border-green-700 pb-0.5"
                  >About Us</a
                >
              </h5>
              <ul class="space-y-2 text-base text-gray-700">
                <li>
                  <a href="#" class="hover:text-green-700 transition"
                    >Mission and Vision</a
                  >
                </li>
                <li>
                  <a href="#" class="hover:text-green-700 transition"
                    >Leadership</a
                  >
                </li>
                <li>
                  <a href="#" class="hover:text-green-700 transition"
                    >Partners</a
                  >
                </li>
              </ul>
            </div>

            <div>
              <h5 class="font-bold text-lg mb-3 text-gray-900">
                <a href="#" class="border-b-2 border-green-700 pb-0.5"
                  >Latest Updates</a
                >
              </h5>
              <ul class="space-y-2 text-base text-gray-700">
                <li>
                  <a href="#" class="hover:text-green-700 transition"
                    >Health Alerts</a
                  >
                </li>
                <li>
                  <a href="#" class="hover:text-green-700 transition"
                    >Public Health Stories</a
                  >
                </li>
                <li>
                  <a href="#" class="hover:text-green-700 transition"
                    >Programs and Initiatives</a
                  >
                </li>
              </ul>
            </div>

            <div>
              <h5 class="font-bold text-lg mb-3 text-gray-900">
                <a href="#" class="border-b-2 border-green-700 pb-0.5"
                  >Membership</a
                >
              </h5>
              <ul class="space-y-2 text-base text-gray-700">
                <li>
                  <a href="#" class="hover:text-green-700 transition"
                    >Categories</a
                  >
                </li>
                <li>
                  <a href="#" class="hover:text-green-700 transition"
                    >Member Directory</a
                  >
                </li>
              </ul>
            </div>

            <div>
              <h5 class="font-bold text-lg mb-3 text-gray-900">
                <a href="#" class="border-b-2 border-green-700 pb-0.5"
                  >Upcoming Activities</a
                >
              </h5>
            </div>

            <div class="col-span-2 sm:col-span-1 flex flex-col justify-start">
              <h5 class="font-bold text-lg mb-3 text-gray-900">
                <a href="#" class="border-b-2 border-green-700 pb-0.5"
                  >Contact Us</a
                >
              </h5>

              <h5 class="font-bold text-lg mb-3 mt-6 text-gray-900">
                <a href="#" class="border-b-2 border-green-700 pb-0.5"
                  >Follow Us</a
                >
              </h5>

              <div class="flex space-x-4 text-green-700">
                <a
                  href="#"
                  class="hover:text-green-600 transition"
                  aria-label="Facebook"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.656 9.126 8.432 9.873V15.45H8.214V12h2.218V9.456c0-2.195 1.343-3.39 3.297-3.39.948 0 1.849.17 2.102.247v2.324h-1.385c-1.105 0-1.32.525-1.32 1.3v1.71h2.585l-.417 3.45H13.111v6.425C17.944 21.126 22 16.991 22 12c0-5.523-4.477-10-10-10z"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  class="hover:text-green-600 transition"
                  aria-label="Instagram"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm-.2 2.7a.8.8 0 00-.8.8v8.9a.8.8 0 00.8.8h8.9a.8.8 0 00.8-.8V5.5a.8.8 0 00-.8-.8H7.6zm8.8 3.7c0-2.4-2.1-4.4-4.4-4.4s-4.4 2-4.4 4.4 2.1 4.4 4.4 4.4 4.4-2 4.4-4.4zm-4.4 2.8c-1.6 0-2.8-1.3-2.8-2.8s1.3-2.8 2.8-2.8 2.8 1.3 2.8 2.8-1.3 2.8-2.8 2.8zm5.6-7c0-.5-.4-.9-.9-.9h-.9c-.5 0-.9.4-.9.9s.4.9.9.9h.9c.5 0 .9-.4.9-.9z"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  class="hover:text-green-600 transition"
                  aria-label="LinkedIn"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.75c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm13.5 12.75h-3v-5.604c0-3.366-4-3.266-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    />
                  </svg>
                </a>
              </div>

              <div class="mt-8 text-right">
                <ul class="flex space-x-4 text-sm text-green-700 justify-end">
                  <li>
                    <a href="#" class="hover:underline transition text-xs"
                      >Privacy Policy</a
                    >
                  </li>
                  <li>
                    <a href="#" class="hover:underline transition text-xs"
                      >Terms of Service</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-green-900 text-white text-center py-4 text-sm">
      &copy; 2021. Healthcare Federation of Nigeria. All Rights Reserved.
    </div>
  </footer>
</template>
