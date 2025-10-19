<script setup>
import handsJoining from '@/assets/handsJoining.jpg';
</script>

<template>
  <section class="bg-[#F2F9F3] py-16 lg:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
        <div class="mb-12 lg:mb-0">
          <h2
            class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4"
          >
            <span class="text-orange-500 block"
              >Unite. Influence. Transform.</span
            >
            <span class="text-green-700 block mt-2"
              >A digital coalition driving policy and innovation.</span
            >
          </h2>
          <p class="mt-6 text-lg text-gray-600 max-w-xl">
            Within the professional network, HFN offers access to a secure
            member directory that shapes industry dialogue, and tap into
            exclusive, high-impact collaborations.
          </p>
        </div>

        <div class="flex justify-center lg:justify-end">
          <div
            class="relative w-[320px] h-[240px] sm:w-[400px] sm:h-[300px] lg:w-[500px] lg:h-[375px] rounded-[30px] overflow-hidden shadow-2xl"
          >
            <img
              :src="handsJoining"
              alt="Diverse hands joining in a heart shape, symbolizing unity and healthcare"
              class="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="py-10 sm:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        class="text-3xl px-4 py-4 sm:px-6 rounded-2xl border-2 border-green-100 bg-white shadow-md sm:text-4xl font-serif font-extrabold text-gray-900 text-center mb-12"
      >
        Membership Categories
      </h2>

      <div class="max-w-4xl mx-auto">
        <div class="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-8">
          <button
            class="px-5 py-2 text-white bg-green-700 rounded-lg shadow-md font-medium"
          >
            Corporate
          </button>
          <button
            class="px-5 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:border-green-700"
          >
            Multinational
          </button>
          <button
            class="px-5 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:border-green-700"
          >
            Association
          </button>
          <button
            class="px-5 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:border-green-700"
          >
            Diaspora
          </button>
        </div>

        <div
          class="p-6 sm:p-10 rounded-[30px] border-2 border-green-200 bg-white shadow-xl flex flex-col lg:flex-row lg:justify-between gap-8"
        >
          <div class="flex-1 rounded-xl border border-gray-200 overflow-hidden">
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-1">Corporate 1</h3>
              <p class="text-sm text-gray-500 mb-6">
                Ideal for private companies
              </p>

              <div class="bg-orange-50/70 p-4 rounded-lg">
                <h4 class="text-sm font-semibold text-gray-700 mb-3">
                  Member Benefits
                </h4>
                <ul class="space-y-2 text-gray-700 text-sm">
                  <li class="flex items-start">
                    <svg
                      class="w-5 h-5 mr-2 text-green-700 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Ideal
                  </li>
                  <li class="flex items-start">
                    <svg
                      class="w-5 h-5 mr-2 text-green-700 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Unlimited Pages
                  </li>
                  <li class="flex items-start">
                    <svg
                      class="w-5 h-5 mr-2 text-green-700 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    No Ads
                  </li>
                  <li class="flex items-start">
                    <svg
                      class="w-5 h-5 mr-2 text-green-700 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Site Search
                  </li>
                  <li class="flex items-start">
                    <svg
                      class="w-5 h-5 mr-2 text-green-700 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Password Protection
                  </li>
                  <li class="flex items-start">
                    <svg
                      class="w-5 h-5 mr-2 text-green-700 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Classes
                  </li>
                  <li class="flex items-start">
                    <svg
                      class="w-5 h-5 mr-2 text-green-700 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    HD Video & Audio
                  </li>
                  <li class="flex items-start">
                    <svg
                      class="w-5 h-5 mr-2 text-green-700 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Up to 100 Members
                  </li>
                  <li class="flex items-start">
                    <svg
                      class="w-5 h-5 mr-2 text-green-700 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Membership Registration
                  </li>
                </ul>
              </div>
            </div>

            <div class="p-6 pt-0 text-center">
              <p class="text-3xl font-extrabold text-green-700 mb-4">
                ₦200,000 per month
              </p>
              <a
                href="#"
                class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-700 hover:bg-green-800 transition"
              >
                Join Now
                <svg
                  class="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          <div class="flex-1 rounded-xl border border-gray-200 overflow-hidden">
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-1">Corporate 2</h3>
              <p class="text-sm text-gray-500 mb-6">
                Ideal for insurance companies
              </p>

              <div class="bg-orange-50/70 p-4 rounded-lg">
                <h4 class="text-sm font-semibold text-gray-700 mb-3">
                  Member Benefits
                </h4>
                <ul class="space-y-2 text-gray-700 text-sm">
                  <li class="flex items-start">
                    <svg
                      class="w-5 h-5 mr-2 text-green-700 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Ideal
                  </li>
                  <li class="flex items-start">
                    <svg
                      class="w-5 h-5 mr-2 text-green-700 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Unlimited Pages
                  </li>
                  <li class="flex items-start">
                    <svg
                      class="w-5 h-5 mr-2 text-green-700 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    No Ads
                  </li>
                  <li class="flex items-start">
                    <svg
                      class="w-5 h-5 mr-2 text-green-700 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Site Search
                  </li>
                  <li class="flex items-start">
                    <svg
                      class="w-5 h-5 mr-2 text-green-700 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Password Protection
                  </li>
                  <li class="flex items-start">
                    <svg
                      class="w-5 h-5 mr-2 text-green-700 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Classes
                  </li>
                  <li class="flex items-start">
                    <svg
                      class="w-5 h-5 mr-2 text-green-700 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    HD Video & Audio
                  </li>
                  <li class="flex items-start">
                    <svg
                      class="w-5 h-5 mr-2 text-green-700 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Up to 100 Members
                  </li>
                  <li class="flex items-start">
                    <svg
                      class="w-5 h-5 mr-2 text-green-700 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Membership Registration
                  </li>
                </ul>
              </div>
            </div>

            <div class="p-6 pt-0 text-center">
              <p class="text-3xl font-extrabold text-green-700 mb-4">
                ₦200,000.00 per month
              </p>
              <a
                href="#"
                class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-700 hover:bg-green-800 transition"
              >
                Join Now
                <svg
                  class="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="py-10 sm:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        class="text-3xl px-4 py-4 sm:px-6 rounded-2xl border-2 border-green-100 bg-white shadow-md sm:text-4xl font-serif font-extrabold text-gray-900 text-center mb-10"
      >
        Member Directory
      </h2>

      <div
        class="p-4 sm:p-8 rounded-[30px] border-2 border-green-200 bg-white shadow-xl max-w-6xl mx-auto"
      >
        <div
          class="flex flex-col sm:flex-row justify-between items-center mb-8"
        >
          <div
            class="relative flex-grow w-full sm:w-auto sm:max-w-xl mb-4 sm:mb-0"
          >
            <input
              type="text"
              placeholder="Search"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>

          <button
            class="px-6 py-2 text-white bg-green-700 rounded-lg shadow-md font-medium hover:bg-green-800 transition"
          >
            Sort By
            <svg
              class="w-4 h-4 inline-block ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </div>

        <div
          class="flex flex-wrap justify-start border-b border-gray-200 pb-2 mb-8"
        >
          <button
            class="px-3 py-1 text-white bg-green-600 rounded-md font-medium text-sm mx-1 my-1 border border-green-600"
          >
            A
          </button>
          <button
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
          >
            B
          </button>
          <button
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
          >
            C
          </button>
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >D</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >E</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >F</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >G</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >H</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >I</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >J</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >K</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >L</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >M</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >N</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >O</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >P</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >Q</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >R</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >S</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >T</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >U</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >V</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >W</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >X</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >Y</span
          >
          <span
            class="px-3 py-1 text-gray-700 bg-white rounded-md font-medium text-sm mx-1 my-1 border border-gray-300 hover:border-green-500"
            >Z</span
          >
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 text-gray-800 text-sm mb-8"
        >
          <div class="space-y-2">
            <p>ABIOLA MORUF TAJUDEEN</p>
            <p>ABIOLA MORUF TAJUDEEN</p>
            <p>ABIOLA MORUF TAJUDEEN</p>
            <p>ABIOLA MORUF TAJUDEEN</p>
            <p>ANIEBE SOMTO EMELDA</p>
            <p>ANIEBE SOMTO EMELDA</p>
            <p>ANIEBE SOMTO EMELDA</p>
            <p>AROGUNDADE IFEOLUWAN THEOPHILUS</p>
            <p>AROGUNDADE IFEOLUWAN THEOPHILUS</p>
            <p>ATAGUBA FRANKLIN</p>
            <p>ATAGUBA FRANKLIN</p>
          </div>
          <div class="space-y-2">
            <p>ABIOLA MORUF TAJUDEEN</p>
            <p>ABIOLA MORUF TAJUDEEN</p>
            <p>ABIOLA MORUF TAJUDEEN</p>
            <p>ANIEBE SOMTO EMELDA</p>
            <p>ANIEBE SOMTO EMELDA</p>
            <p>ANIEBE SOMTO EMELDA</p>
            <p>AROGUNDADE IFEOLUWAN THEOPHILUS</p>
            <p>AROGUNDADE IFEOLUWAN THEOPHILUS</p>
            <p>AROGUNDADE IFEOLUWAN THEOPHILUS</p>
            <p>AROGUNDADE IFEOLUWAN THEOPHILUS</p>
            <p>ATAGUBA FRANKLIN</p>
          </div>
          <div class="space-y-2">
            <p>AROGUNDADE IFEOLUWAN THEOPHILUS</p>
            <p>AROGUNDADE IFEOLUWAN THEOPHILUS</p>
            <p>AROGUNDADE IFEOLUWAN THEOPHILUS</p>
            <p>AROGUNDADE IFEOLUWAN THEOPHILUS</p>
            <p>AROGUNDADE IFEOLUWAN THEOPHILUS</p>
          </div>
        </div>

        <div class="flex justify-end mt-6">
          <button
            class="flex items-center text-sm font-medium text-green-700 px-3 py-2 border border-green-700 rounded-lg hover:bg-green-50 transition"
          >
            Page 1 of 10
            <svg
              class="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
