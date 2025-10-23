<script setup>
import awards from '@/assets/awards.png';
import hands from '@/assets/hands.png';
import latest from '@/assets/latest.png';
</script>

<template>
  <section style="background-color: #fcf7f5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div class="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
        <div class="lg:col-span-6 mb-10 lg:mb-0">
          <h1 class="text-5xl font-extrabold leading-tight">
            <span class="text-orange-600">Stay up-to-date</span>
            <span class="text-green-800 block mt-2"
              >with the latest health updates</span
            >
          </h1>

          <p class="mt-6 max-w-lg text-lg text-gray-700">
            Euismod magna id purus eget nunc ligula suspendisse dui netus.
            Condimentum blandit rutrum at mauris enim pulvinar duis etiam duis.
            Euismod magna id purus eget nunc ligula suspendisse.
          </p>
        </div>

        <div class="lg:col-span-6 flex justify-center lg:justify-end">
          <div
            class="relative w-full max-w-xl aspect-[16/9] overflow-hidden rounded-3xl p-3 shadow-2xl"
            style="background-color: #f0f7f5; border: 4px solid #38a169"
          >
            <img
              :src="latest"
              alt="HFN conference and networking"
              class="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-white py-16 sm:py-24">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-6">
        <div class="lg:col-span-8">
          <div class="mb-10">
            <h2
              class="text-3xl text-center sm:text-4xl px-4 py-4 font-extrabold text-gray-900 mb-6 rounded-2xl border-2 border-green-50 bg-white shadow-md"
            >
              Upcoming Events
            </h2>

            <select
              class="p-3 border rounded-xl border-gray-300 text-sm text-gray-700 focus:ring-green-500 focus:border-green-500"
            >
              <option>October 2025</option>
              <option>November 2025</option>
              <option>December 2025</option>
            </select>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              class="relative overflow-hidden shadow-lg pb-4"
              style="
                border-radius: 2rem;
                border: 1px solid #e0f2e0; 
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
              "
            >
              <div class="relative aspect-[3/2] bg-gray-50 mb-3">
                <img
                  :src="hands"
                  alt="Event graphic"
                  class="w-full h-full object-cover"
                />

                <span
                  class="absolute bottom-[-5px] left-0 bg-green-700 text-white text-xs px-3 py-1 rounded-full"
                >
                  Programs & Initiatives
                </span>
              </div>

              <div class="p-5 pt-0">
                <p class="text-sm text-gray-700 mb-4 leading-relaxed">
                  Euismod magna id purus eget nunc ligula suspendisse dui netus.
                  Condimentum blandit rutrum at mauris enim pulvinar duis etiam
                  duis. Euismod magna id purus eget nunc
                </p>

                <div class="space-y-2 mb-6">
                  <p class="text-sm text-gray-700 flex items-center space-x-2">
                    <svg
                      class="w-4 h-4 text-orange-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="font-semibold text-orange-400"
                      >October 10, 2025</span
                    >
                  </p>

                  <p class="text-sm text-gray-700 flex items-center space-x-2">
                    <svg
                      class="w-4 h-4 text-orange-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="font-semibold text-orange-400">10am</span>
                  </p>

                  <p class="text-sm text-gray-700 flex items-center space-x-2">
                    <svg
                      class="w-4 h-4 text-orange-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="text-orange-400"
                      >No 12 Ifeanyi str, Ikeja Lagos</span
                    >
                  </p>
                </div>

                <a
                  href="#"
                  class="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-700 hover:bg-green-800 transition"
                >
                  Register Now
                  <svg
                    class="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>

            <div
              class="relative overflow-hidden shadow-lg pb-4"
              style="
                border-radius: 2rem;
                border: 1px solid #e0f2e0; 
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
              "
            >
              <div class="relative aspect-[3/2] bg-gray-50 mb-3">
                <img
                  :src="hands"
                  alt="Event graphic"
                  class="w-full h-full object-cover"
                />

                <span
                  class="absolute bottom-[-5px] left-0 bg-green-700 text-white text-xs px-3 py-1 rounded-full"
                >
                  Programs & Initiatives
                </span>
              </div>

              <div class="p-5 pt-0">
                <p class="text-sm text-gray-700 mb-4 leading-relaxed">
                  Euismod magna id purus eget nunc ligula suspendisse dui netus.
                  Condimentum blandit rutrum at mauris enim pulvinar duis etiam
                  duis. Euismod magna id purus eget nunc
                </p>

                <div class="space-y-2 mb-6">
                  <p class="text-sm text-gray-700 flex items-center space-x-2">
                    <svg
                      class="w-4 h-4 text-orange-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="font-semibold text-orange-400"
                      >October 10, 2025</span
                    >
                  </p>

                  <p class="text-sm text-gray-700 flex items-center space-x-2">
                    <svg
                      class="w-4 h-4 text-orange-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="font-semibold text-orange-400">10am</span>
                  </p>

                  <p class="text-sm text-gray-700 flex items-center space-x-2">
                    <svg
                      class="w-4 h-4 text-orange-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="text-orange-400"
                      >No 12 Ifeanyi str, Ikeja Lagos</span
                    >
                  </p>
                </div>

                <a
                  href="#"
                  class="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-700 hover:bg-green-800 transition"
                >
                  Register Now
                  <svg
                    class="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
            <div
              class="relative overflow-hidden shadow-lg pb-4"
              style="
                border-radius: 2rem;
                border: 1px solid #e0f2e0; 
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
              "
            >
              <div class="relative aspect-[3/2] bg-gray-50 mb-3">
                <img
                  :src="hands"
                  alt="Event graphic"
                  class="w-full h-full object-cover"
                />
                <span
                  class="absolute bottom-[-5px] left-0 bg-red-900 text-white text-xs px-3 py-1 rounded-full"
                >
                  Health Alert
                </span>
              </div>

              <div class="p-3">
                <p
                  class="text-sm text-gray-500 mb-1 flex items-center justify-between"
                >
                  <span class="font-semibold text-orange-400"
                    >October 10, 2025</span
                  >

                  <span
                    class="flex items-center gap-1 text-orange-400 font-semibold"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 text-orange-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7 8h10M7 12h5m-5 4h8m4 0V8a2 2 0 00-2-2H7l-4 4v8a2 2 0 002 2h12z"
                      />
                    </svg>
                    20 Views
                  </span>
                </p>

                <p class="text-sm text-gray-700 mb-20 leading-relaxed">
                  Euismod magna id purus eget nunc ligula suspendisse dui netus.
                  Condimentum blandit rutrum at mauris enim pulvinar duis etiam
                  duis. Euismod magna id purus eget nunc
                </p>
                <a
                  href="#"
                  class="inline-flex items-center justify-center px-9 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-green-700 hover:bg-green-800 transition"
                >
                  Read More ->
                </a>
              </div>
            </div>
          </div>

          <div
            class="flex items-center justify-center mt-12 text-gray-600 text-sm"
          >
            <span class="mr-3">Page 1 of 2</span>
            <a
              href="#"
              class="flex items-center space-x-1 hover:text-green-700 transition"
            >
              <span>Next</span>
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </a>
          </div>
        </div>

        <div
          class="lg:col-span-4 mt-12 lg:mt-0 bg-gray-100 border-white rounded-2xl p-3"
        >
          <h2
            class="text-3xl sm:text-4xl font-extrabold text-gray-600 mb-8 pt-5"
          >
            Latest Updates
          </h2>

          <div class="space-y-8">
            <div class="flex space-x-4 bg-white p-2 border-white rounded-xl">
              <div
                class="w-20 h-20 flex-shrink-0 relative overflow-hidden rounded-xl border border-gray-200"
                style="background-color: #f0f7f5"
              >
                <img
                  :src="awards"
                  alt="Update thumbnail"
                  class="w-full h-full object-cover"
                />

                <span
                  class="absolute bottom-[-1px] left-1/2 transform -translate-x-1/2 bg-green-700 text-white text-[0.6rem] px-3 py-1 rounded-full whitespace-nowrap font-medium"
                  style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2)"
                >
                  Programs & Initiatives
                </span>

                <span
                  class="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 py-0.5 rounded-bl-md"
                >
                  SAVE
                </span>
              </div>
              <div>
                <p
                  class="text-xs text-gray-500 mb-1 flex items-center space-x-3"
                >
                  <span
                    class="flex items-center space-x-1 text-orange-600 font-semibold"
                  >
                    <svg
                      class="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>October 10, 2025</span>
                  </span>
                  <span class="flex items-center space-x-1 text-orange-600">
                    <svg
                      class="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.722-1.353l-2.035.795a1 1 0 01-1.222-1.222l.795-2.035A8.841 8.841 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM10 5a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 100-2h-3.586l.293-.293a1 1 0 00-1.414-1.414L9 7.586V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>0 Comments</span>
                  </span>
                </p>
                <p class="text-sm text-gray-700 mb-1 leading-tight">
                  Euismod magna id purus eget nunc ligula suspendisse dui netus.
                  Condimentum blandit rutrum at mauris enim pulvinar duis etiam
                  duis.
                </p>
                <a
                  href="#"
                  class="text-xs text-green-700 font-semibold hover:text-green-600 transition"
                  >Read more...</a
                >
              </div>
            </div>

            <div class="flex space-x-4 bg-white p-2 border-white rounded-xl">
              <div
                class="w-20 h-20 flex-shrink-0 relative overflow-hidden rounded-xl border border-gray-200"
                style="background-color: #f0f7f5"
              >
                <img
                  :src="awards"
                  alt="Update thumbnail"
                  class="w-full h-full object-cover"
                />
                <span
                  class="absolute bottom-[-1px] left-1/2 transform -translate-x-1/2 bg-custom-maroon text-white text-[0.6rem] px-3 py-1 rounded-full whitespace-nowrap font-medium"
                  style="
                    background-color: #9d1c44;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                  "
                >
                  Health Alert
                </span>
              </div>

              <div>
                <p
                  class="text-xs text-gray-500 mb-1 flex items-center space-x-3"
                >
                  <span
                    class="flex items-center space-x-1 text-orange-600 font-semibold"
                  >
                    <svg
                      class="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>October 10, 2025</span>
                  </span>
                  <span class="flex items-center space-x-1 text-orange-600">
                    <svg
                      class="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.722-1.353l-2.035.795a1 1 0 01-1.222-1.222l.795-2.035A8.841 8.841 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM10 5a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 100-2h-3.586l.293-.293a1 1 0 00-1.414-1.414L9 7.586V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>0 Comments</span>
                  </span>
                </p>
                <p class="text-sm text-gray-700 mb-1 leading-tight">
                  Euismod magna id purus eget nunc ligula suspendisse dui netus.
                  Condimentum blandit rutrum at mauris enim.
                </p>
                <a
                  href="#"
                  class="text-xs text-green-700 font-semibold hover:text-green-600 transition"
                  >Read more...</a
                >
              </div>
            </div>
            <div class="flex space-x-4 bg-white p-2 border-white rounded-xl">
              <div
                class="w-20 h-20 flex-shrink-0 relative overflow-hidden rounded-xl border border-gray-200"
                style="background-color: #f0f7f5"
              >
                <img
                  :src="awards"
                  alt="Update thumbnail"
                  class="w-full h-full object-cover"
                />
                <span
                  class="absolute bottom-[-1px] left-1/2 transform -translate-x-1/2 bg-custom-maroon text-white text-[0.6rem] px-3 py-1 rounded-full whitespace-nowrap font-medium"
                  style="
                    background-color: #9d1c44;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                  "
                >
                  Health Alert
                </span>
              </div>

              <div>
                <p
                  class="text-xs text-gray-500 mb-1 flex items-center space-x-3"
                >
                  <span
                    class="flex items-center space-x-1 text-orange-600 font-semibold"
                  >
                    <svg
                      class="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>October 10, 2025</span>
                  </span>
                  <span class="flex items-center space-x-1 text-orange-600">
                    <svg
                      class="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.722-1.353l-2.035.795a1 1 0 01-1.222-1.222l.795-2.035A8.841 8.841 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM10 5a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 100-2h-3.586l.293-.293a1 1 0 00-1.414-1.414L9 7.586V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>0 Comments</span>
                  </span>
                </p>
                <p class="text-sm text-gray-700 mb-1 leading-tight">
                  Euismod magna id purus eget nunc ligula suspendisse dui netus.
                  Condimentum blandit rutrum at mauris enim.
                </p>
                <a
                  href="#"
                  class="text-xs text-green-700 font-semibold hover:text-green-600 transition"
                  >Read more...</a
                >
              </div>
            </div>
            <div class="flex space-x-4 bg-white p-2 border-white rounded-xl">
              <div
                class="w-20 h-20 flex-shrink-0 relative overflow-hidden rounded-xl border border-gray-200"
                style="background-color: #f0f7f5"
              >
                <img
                  :src="awards"
                  alt="Update thumbnail"
                  class="w-full h-full object-cover"
                />
                <span
                  class="absolute bottom-[-1px] left-1/2 transform -translate-x-1/2 bg-custom-maroon text-white text-[0.6rem] px-3 py-1 rounded-full whitespace-nowrap font-medium"
                  style="
                    background-color: #f54a00;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                  "
                >
                  Health Alert
                </span>
              </div>

              <div>
                <p
                  class="text-xs text-gray-500 mb-1 flex items-center space-x-3"
                >
                  <span
                    class="flex items-center space-x-1 text-orange-600 font-semibold"
                  >
                    <svg
                      class="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>October 10, 2025</span>
                  </span>
                  <span class="flex items-center space-x-1 text-orange-600">
                    <svg
                      class="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.722-1.353l-2.035.795a1 1 0 01-1.222-1.222l.795-2.035A8.841 8.841 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM10 5a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 100-2h-3.586l.293-.293a1 1 0 00-1.414-1.414L9 7.586V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>0 Comments</span>
                  </span>
                </p>
                <p class="text-sm text-gray-700 mb-1 leading-tight">
                  Euismod magna id purus eget nunc ligula suspendisse dui netus.
                  Condimentum blandit rutrum at mauris enim.
                </p>
                <a
                  href="#"
                  class="text-xs text-green-700 font-semibold hover:text-green-600 transition"
                  >Read more...</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-12 lg:gap-6">
          <div class="lg:col-span-8">
            <div
              class="flex items-center justify-center mt-12 text-gray-600 text-sm"
            ></div>

            <div class="mt-16 sm:mt-24 w-full">
              <div class="text-center mb-10">
                <h2
                  class="text-3xl sm:text-4xl px-4 py-4 font-extrabold text-gray-900 rounded-2xl border-2 border-green-50 bg-white shadow-md"
                >
                  Programs and Initiatives
                </h2>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div
                  class="relative overflow-hidden shadow-lg pb-4"
                  style="
                    border-radius: 2rem;
                    border: 1px solid #e0f2e0;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                  "
                >
                  <div
                    class="relative aspect-[16/9] bg-gray-50 mb-3 overflow-hidden"
                    style="
                      border-top-left-radius: 2rem;
                      border-top-right-radius: 2rem;
                    "
                  >
                    <img
                      :src="awards"
                      alt="HFN Walk for Life Event"
                      class="w-full h-full object-cover"
                    />
                  </div>

                  <div class="p-5 pt-0">
                    <div class="flex justify-between items-center mb-2">
                      <h3 class="text-xl font-bold text-gray-900">
                        HFN Walk for Life
                      </h3>
                      <span
                        class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
                        >Annually</span
                      >
                    </div>

                    <p class="text-sm text-gray-700 mb-4 leading-relaxed">
                      Euismod magna id purus eget nunc ligula suspendisse dui
                      netus. Condimentum blandit rutrum at mauris enim pulvinar
                      duis etiam duis. Euismod magna id purus eget nunc
                    </p>

                    <div class="space-y-2 mb-6">
                      <p
                        class="text-sm text-gray-700 flex items-center space-x-2"
                      >
                        <svg
                          class="w-4 h-4 text-orange-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span class="font-semibold text-orange-600"
                          >October 10, 2025</span
                        >
                      </p>
                      <p
                        class="text-sm text-gray-700 flex items-center space-x-2"
                      >
                        <svg
                          class="w-4 h-4 text-orange-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span class="font-semibold text-orange-600">10am</span>
                      </p>
                      <p
                        class="text-sm text-gray-700 flex items-center space-x-2"
                      >
                        <svg
                          class="w-4 h-4 text-orange-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span class="text-gray-700"
                          >No 12 Ifeanyi str, Ikeja Lagos</span
                        >
                      </p>
                    </div>

                    <a
                      href="#"
                      class="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-700 hover:bg-green-800 transition"
                    >
                      Join Now
                      <svg
                        class="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>

                <div
                  class="relative overflow-hidden shadow-lg pb-4"
                  style="
                    border-radius: 2rem;
                    border: 1px solid #e0f2e0;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                  "
                >
                  <div
                    class="relative aspect-[16/9] bg-gray-50 mb-3 overflow-hidden"
                    style="
                      border-top-left-radius: 2rem;
                      border-top-right-radius: 2rem;
                    "
                  >
                    <img
                      :src="awards"
                      alt="HFN Walk for Life Event"
                      class="w-full h-full object-cover"
                    />
                  </div>

                  <div class="p-5 pt-0">
                    <div class="flex justify-between items-center mb-2">
                      <h3 class="text-xl font-bold text-gray-900">
                        HFN Walk for Life
                      </h3>
                      <span
                        class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
                        >Annually</span
                      >
                    </div>

                    <p class="text-sm text-gray-700 mb-4 leading-relaxed">
                      Euismod magna id purus eget nunc ligula suspendisse dui
                      netus. Condimentum blandit rutrum at mauris enim pulvinar
                      duis etiam duis. Euismod magna id purus eget nunc
                    </p>

                    <div class="space-y-2 mb-6">
                      <p
                        class="text-sm text-gray-700 flex items-center space-x-2"
                      >
                        <svg
                          class="w-4 h-4 text-orange-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span class="font-semibold text-orange-600"
                          >October 10, 2025</span
                        >
                      </p>
                      <p
                        class="text-sm text-gray-700 flex items-center space-x-2"
                      >
                        <svg
                          class="w-4 h-4 text-orange-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span class="font-semibold text-orange-600">10am</span>
                      </p>
                      <p
                        class="text-sm text-gray-700 flex items-center space-x-2"
                      >
                        <svg
                          class="w-4 h-4 text-orange-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span class="text-gray-700"
                          >No 12 Ifeanyi str, Ikeja Lagos</span
                        >
                      </p>
                    </div>

                    <a
                      href="#"
                      class="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-700 hover:bg-green-800 transition"
                    >
                      Join Now
                      <svg
                        class="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
