<script setup>
import globe from "@/assets/globe.png";

</script>

<template>
  <section class="bg-[#F2F9F3] py-16 lg:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
        <div class="mb-12 lg:mb-0">
          <h2
            class="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-orange-500"
          >
            Let's keep in touch!
          </h2>
          <p class="mt-2 text-xl font-semibold text-green-700">
            Healthcare Federation of Nigeria would love to hear from you.
          </p>
          <p class="mt-6 text-lg text-gray-600 max-w-xl">
            For any inquiries, partnerships, or further information on how we
            can work together to improve healthcare in Nigeria, feel free to
            reach out to us through any of the following contact options.
          </p>
        </div>

        <div class="flex justify-center lg:justify-end">
          <div
            class="relative w-[320px] h-[240px] sm:w-[400px] sm:h-[300px] lg:w-[500px] lg:h-[375px] rounded-[30px] overflow-hidden shadow-2xl flex items-center justify-center p-4"
          >
            <img
              :src="globe"
              alt="Globe with pins and contact icons, symbolizing global reach and communication"
              class="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="py-16 sm:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2
          class="text-3xl px-4 py-4 sm:px-6 rounded-2xl border-2 border-green-100 bg-white shadow-md sm:text-4xl font-serif font-extrabold text-gray-900 mb-2"
        >
          Contact Us
        </h2>
        <p class="text-gray-500 max-w-2xl mx-auto mt-10">
          We are here to help!
          <br class="hidden sm:block" />
          Whether you have a question about our service, need assistance with
          your account, or want to provide feedback, our team is ready to assist
          you.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div
          class="lg:col-span-2 p-6 sm:p-8 rounded-[20px] border-2 border-green-200 bg-white shadow-lg"
        >
          <form class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700"
                  >Name</label
                >
                <input
                  type="text"
                  id="name"
                  placeholder="Peter Pan"
                  class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                  >Email Address</label
                >
                <input
                  type="email"
                  id="email"
                  placeholder="p.pan@yahoo.co.us"
                  class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label
                for="subject"
                class="block text-sm font-medium text-gray-700"
                >Subject</label
              >
              <input
                type="text"
                id="subject"
                class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label
                for="message"
                class="block text-sm font-medium text-gray-700"
                >Message</label
              >
              <textarea
                id="message"
                rows="5"
                class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </div>

            <div class="pt-2">
              <button
                type="submit"
                class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-700 hover:bg-green-800 transition"
              >
                Send Message
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
              </button>
            </div>
          </form>
        </div>

        <div
          class="lg:col-span-1 p-6 sm:p-8 rounded-[20px] border-2 border-green-200 bg-white shadow-lg space-y-8"
        >
          <div class="flex items-start">
            <svg
              class="w-6 h-6 mr-3 text-green-700 flex-shrink-0"
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
            <p class="text-gray-700 text-base">
              3rd floor, 109, Awolowo Road, Opposite Standard Chartered Bank,
              Ikoyi, Lagos State, Nigeria.
            </p>
          </div>

          <div class="flex items-center">
            <svg
              class="w-6 h-6 mr-3 text-green-700 flex-shrink-0"
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
            <p class="text-gray-700 text-base">info@hfnigeria.com</p>
          </div>

          <div class="flex items-center">
            <svg
              class="w-6 h-6 mr-3 text-green-700 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 3h2a2 2 0 012 2v2M16 21h2a2 2 0 002-2v-2M4 21h2a2 2 0 002-2v-2M4 3h2a2 2 0 012 2v2m0 0h8m-8 0H8m0 0a2 2 0 012-2h4a2 2 0 012 2m-2-5v14"
              ></path>
            </svg>
            <p class="text-gray-700 text-base">+234 703 056 7554</p>
          </div>
          <div class="pt-4 border-t border-green-100 space-y-4">
            <h3 class="text-lg font-semibold text-gray-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2 text-green-700"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              </svg>
              Connect With Us
            </h3>
            
          </div>

          <div
            class="flex items-center space-x-5 pt-4 border-t border-green-100"
          >
            <a
              href="https://www.facebook.com/hfnigeria"
              target="_blank"
              aria-label="Facebook"
              class="text-green-700 hover:text-green-900 transition"
            >
              <i class="fab fa-square-facebook text-2xl"></i>
            </a>

            <a
              href="https://www.instagram.com/hfnigeria"
              target="_blank"
              aria-label="Instagram"
              class="text-green-700 hover:text-green-900 transition"
            >
              <i class="fab fa-square-instagram text-2xl"></i>
            </a>

            <a
              href="https://www.linkedin.com/company/hfnigeria"
              target="_blank"
              aria-label="LinkedIn"
              class="text-green-700 hover:text-green-900 transition"
            >
              <i class="fab fa-square-linkedin text-2xl"></i>
            </a>

            <a
              href="https://x.com/hfnigeria"
              target="_blank"
              aria-label="Twitter"
              class="text-green-700 hover:text-green-900 transition"
            >
              <i class="fab fa-square-x-twitter text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="py-16 sm:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="max-w-6xl mx-auto rounded-[20px] overflow-hidden shadow-2xl border-4 border-green-200"
      >
        <iframe
          src="https://maps.google.com/maps?q=109+Awolowo+Road,+Ikoyi,+Lagos,+Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="500"
          frameborder="0"
          style="border: 0; border-radius: 18px"
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </div>
    </div>
  </section>
</template>
