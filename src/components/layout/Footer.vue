<script setup>
import logo from "@/assets/logo.png";

const currentYear = new Date().getFullYear();

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
              <img :src="logo" alt="HFN Logo" class="h-19 w-auto" />
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
                  href="https://www.facebook.com/hfnigeria"
                  target="_blank"
                  aria-label="Facebook"
                  class="hover:text-green-600 transition"
                >
                  <i class="fa-brands fa-square-facebook-f text-2xl"></i>
                </a>

                <a
                  href="https://www.instagram.com/hfnigeria"
                  target="_blank"
                  aria-label="Instagram"
                  class="hover:text-green-600 transition"
                >
                  <i class="fab fa-square-instagram text-2xl"></i>
                </a>

                <a
                  href="https://www.linkedin.com/company/hfnigeria"
                  target="_blank"
                  aria-label="LinkedIn"
                  class="hover:text-green-600 transition"
                >
                  <i class="fa-brands fa-square-linkedin text-2xl"></i>
                </a>

                <a
                  href="https://x.com/hfnigeria"
                  target="_blank"
                  aria-label="Twitter"
                  class="hover:text-green-600 transition"
                >
                  <i class="fab fa-square-x-twitter text-2xl"></i>
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
      &copy; {{ currentYear }}. Healthcare Federation of Nigeria. All Rights Reserved.
    </div>
  </footer>
</template>
