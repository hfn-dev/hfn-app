<template>
  <div>
    <div
      v-if="member"
      class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-5xl mx-auto">
        <button
          @click="$router.back()"
          class="group mb-8 flex items-center text-green-700 font-semibold hover:text-green-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Leadership
        </button>

        <div
          class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div class="flex flex-col md:flex-row">
            <div class="md:w-2/5 relative">
              <div class="h-full min-h-[400px] md:min-h-[600px]">
                <img
                  :src="member.image"
                  :alt="member.name"
                  class="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"
                ></div>
              </div>
            </div>

            <div class="md:w-3/5 p-8 md:p-12 lg:p-16">
              <div class="mb-8">
                <span
                  class="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-4 uppercase tracking-wider"
                >
                  HFN Leadership
                </span>
                <h1
                  class="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2"
                >
                  {{ member.name }}
                </h1>
                <p class="text-xl lg:text-2xl font-medium text-orange-600">
                  {{ member.title }}
                </p>
                <p class="text-gray-600 text-lg italic mb-8">
                  {{ member.profile }}
                </p>
              </div>
              <div
                v-if="member.socials && member.socials.length"
                class="flex gap-4 mb-6"
              >
                <a
                  v-for="social in member.socials"
                  :key="social.platform"
                  :href="social.url"
                  target="_blank"
                  class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-all duration-300 shadow-sm"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    />
                  </svg>
                </a>
              </div>
              <div class="prose prose-lg max-w-none">
                <div class="flex items-center space-x-2 mb-6">
                  <div class="h-1 w-12 bg-green-700 rounded-full"></div>
                  <span
                    class="text-gray-400 font-bold uppercase text-xs tracking-widest"
                    ></span
                  >
                </div>

                <p
                  class="text-gray-700 leading-relaxed text-lg whitespace-pre-line"
                >
                  {{
                    member.bio ||
                    member.profile ||
                    ""
                  }}
                </p>
              </div>

              <div class="mt-12 pt-8 border-t border-gray-100">
                <div class="flex items-center space-x-4">
                  <p
                    class="text-sm font-bold text-gray-400 uppercase tracking-widest"
                  ></p>
                  <p class="text-sm text-gray-600 font-medium"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="min-h-screen flex flex-col items-center justify-center text-gray-500"
    >
      <div class="animate-pulse text-6xl mb-4">👤</div>
      <h2 class="text-2xl font-bold">Member not found</h2>
      <router-link to="/governance" class="mt-4 text-green-700 underline"
        >Return to Directory</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { chair, executives, trustees } from "@/data/leadership.js";
import { useRoute } from "vue-router";

const route = useRoute();
const slug = route.params.slug;

const allMembers = [chair, ...trustees, ...executives];

const member = allMembers.find((m) => m.slug === slug);
</script>
