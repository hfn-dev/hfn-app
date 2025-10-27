<script setup>
import bridge from "@/assets/bridge.png";
import emzor from "@/assets/emzor.png";
import event from "@/assets/event.png";
import group from "@/assets/group.png";
import health from "@/assets/health.png";
import hfn_partner from "@/assets/hfn_partner.png";
import wef from "@/assets/wef.jpg";

import group1 from "@/assets/group1.png";
import hba from "@/assets/hba.png";
import Image from "@/assets/image.jpg";
import oando from "@/assets/oando_logo.png";
import pharm from "@/assets/pharm.png";
import society from "@/assets/society.png";

import { onMounted, ref, watch } from "vue";

const selectedMonth = ref("October 2025");

const allNews = {
  "October 2025": {
    featured: {
      image: hfn_partner,
      tag: "Programs & Initiatives",
      date: "October 10, 2025",
      comments: 0,
      description:
        "Healthcare Federation of Nigeria (HFN) hosted a High-Level Roundtable on Local Manufacturing of Medicines in Nigeria with the World Bank Group and NEPAD.",
    },
    newsList: [
      {
        image: health,
        tag: "Programs & Initiatives",
        date: "October 10, 2025",
        comments: 12,
        description:
          "Nigeria continues to push boundaries in healthcare innovation through HFN-led collaborations.",
      },
      {
        image: wef,
        tag: "Health Alert",
        date: "October 9, 2025",
        comments: 5,
        description:
          "HFN President joins global health leaders at the WEF in Dubai to discuss investments in healthcare.",
      },
      {
        image: event,
        tag: "Public Health Stories",
        date: "October 8, 2025",
        comments: 10,
        description:
          "HFN participated in the Eko Health Convention, focusing on driving innovation in Lagos healthcare.",
      },
    ],
  },

  "September 2025": {
    featured: {
      image: group,
      tag: "Health Policy",
      date: "September 18, 2025",
      comments: 7,
      description:
        "HFN met with the Federal Ministry of Health to discuss strengthening healthcare policy frameworks.",
    },
    newsList: [
      {
        image: pharm,
        tag: "Programs & Initiatives",
        date: "September 15, 2025",
        comments: 4,
        description:
          "HFN continues its collaboration with pharmaceutical partners to ensure access to quality medicines.",
      },
      {
        image: oando,
        tag: "Health Alert",
        date: "September 10, 2025",
        comments: 6,
        description:
          "Oando Foundation and HFN partner to improve workplace health and wellness programs.",
      },
      {
        image: hba,
        tag: "Public Health Stories",
        date: "September 2, 2025",
        comments: 3,
        description:
          "HFN hosted a national workshop on healthcare business sustainability strategies.",
      },
    ],
  },

  "August 2025": {
    featured: {
      image: emzor,
      tag: "Programs & Initiatives",
      date: "August 20, 2025",
      comments: 3,
      description:
        "HFN collaborated with Emzor Pharmaceuticals to discuss the future of local drug production.",
    },
    newsList: [
      {
        image: society,
        tag: "Health Alert",
        date: "August 18, 2025",
        comments: 2,
        description:
          "Society for Family Health and HFN partner to improve primary care delivery systems.",
      },
      {
        image: bridge,
        tag: "Public Health Stories",
        date: "August 12, 2025",
        comments: 1,
        description:
          "Bridge Clinic joins HFN network to promote advanced fertility care across Nigeria.",
      },
      {
        image: health,
        tag: "Programs & Initiatives",
        date: "August 5, 2025",
        comments: 4,
        description:
          "HFN launched its Healthcare Innovation Accelerator to support health-tech startups.",
      },
    ],
  },
};

const featured = ref(allNews[selectedMonth.value].featured);
const newsList = ref(allNews[selectedMonth.value].newsList);

watch(selectedMonth, (newMonth) => {
  featured.value = allNews[newMonth].featured;
  newsList.value = allNews[newMonth].newsList;
});


import ayodele from "@/assets/ayodele.png";
import babarinde from "@/assets/babarinde.png";
import chinyere from "@/assets/chinyere.png";
import jennifer from "@/assets/jennifer.png";
import njide from "@/assets/njide.png";
import reagan from "@/assets/reagan.png";

const executives = [
  { name: "Mrs. Njide Ndili", position: "President", image: njide },
  {
    name: "Dr. Ayodele Benson-Cole",
    position: "1st Vice President",
    image: ayodele,
  },
  {
    name: "Dr. Jennifer Anyanti",
    position: "2nd Vice President",
    image: jennifer,
  },
  {
    name: "Mrs. Chinyere Okorocha",
    position: "Public Relations Secretary",
    image: chinyere,
  },
  {
    name: "Mr. Babarinde Olayode",
    position: "Financial Secretary",
    image: babarinde,
  },
  { name: "Mr. Reagan Rowland", position: "Treasurer", image: reagan },
];

onMounted(() => {
  const toggles = document.querySelectorAll(".faq-toggle");
  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const targetId = toggle.getAttribute("data-target");
      const content = document.getElementById(targetId);
      const icon = toggle.querySelector(".faq-icon");
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";

      toggles.forEach((t) => {
        if (t !== toggle) {
          t.setAttribute("aria-expanded", "false");
          document.getElementById(
            t.getAttribute("data-target")
          ).style.maxHeight = "0";
          t.querySelector(".faq-icon").classList.remove("rotate-45");
        }
      });

      if (isExpanded) {
        toggle.setAttribute("aria-expanded", "false");
        content.style.maxHeight = "0";
        icon.classList.remove("rotate-45");
      } else {
        toggle.setAttribute("aria-expanded", "true");
        content.style.maxHeight = content.scrollHeight + "px";
        icon.classList.add("rotate-45");
      }
    });
  });
});
</script>

<template>
  <section
    class="relative pt-16 pb-24 lg:pt-32 lg:pb-40 overflow-hidden bg-[#F2F9F3]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:flex lg:items-center">
        <div class="lg:w-1/2">
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-gray-900"
          >
            <span class="text-orange-600">Accelerate</span>
            <span class="text-primary"> Your Healthcare Leadership.</span>
          </h1>
          <p class="text-lg text-gray-600 mb-8 max-w-lg">
            <span class="text-green-600">Healthcare Federation of Nigeria</span>
            is uniting healthcare providers, insurers, and tech leaders to drive
            transformation.
          </p>
          <p class="text-lg text-gray-600 mb-8 max-w-lg">
            Gain cutting-edge certifications, seamlessly manage your membership,
            unlock exclusive resources and connect with the sector’s most
            influential network.
          </p>
          <RouterLink
            to="/register"
            class="inline-block py-3 px-8 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-90 transition duration-300 transform hover:scale-[1.02]"
          >
            Join the Coalition ->
          </RouterLink>
        </div>

        <div
          class="lg:w-1/2 mt-12 lg:mt-0 lg:ml-12 flex justify-center lg:justify-end"
        >
          <div
            class="w-full max-w-md lg:max-w-full h-80 sm:h-96 lg:h-[450px] bg-gray-300 rounded-xl shadow-2xl relative overflow-hidden"
          >
            <img
              :src="Image"
              alt="Medical tools and documents illustrating healthcare leadership"
              class="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <!-- <div
            class="absolute w-[27%] h-[37%] rounded-xl overflow-hidden origin-bottom-right"
            style="bottom: 0; left: 454px; top: 304px"
          >
            <img
              :src="print"
              alt="Slanted overlapping image"
              class="object-cover w-full h-full"
            />
          </div> -->
        </div>
      </div>
    </div>
  </section>

  <div class="py-6 border-b border-gray-200 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-6">
        <span
          class="text-lg font-semibold text-gray-500 uppercase tracking-wider"
        >
          Health Guardians
        </span>
      </div>

      <div
        class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-75"
      >
        <div class="flex items-center justify-center h-10">
          <img
            :src="emzor"
            alt="Emzor Logo"
            class="max-h-full max-w-full object-contain"
          />
        </div>

        <div class="flex items-center justify-center h-10">
          <img
            :src="oando"
            alt="Oando Logo"
            class="max-h-full max-w-full object-contain"
          />
        </div>

        <div class="flex items-center justify-center h-10">
          <img
            :src="society"
            alt="Society for Family Health Logo"
            class="max-h-full max-w-full object-contain"
          />
        </div>

        <div class="flex items-center justify-center h-10">
          <img
            :src="hba"
            alt="Health Business Academy Logo"
            class="max-h-full max-w-full object-contain"
          />
        </div>

        <div class="flex items-center justify-center h-10">
          <img
            :src="bridge"
            alt="Bridge Clinic Logo"
            class="max-h-full max-w-full object-contain"
          />
        </div>

        <div class="flex items-center justify-center h-10">
          <img
            :src="pharm"
            alt="Pharm Logo"
            class="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
    </div>
  </div>

  <section class="bg-white py-16 px-6 md:px-12 lg:px-24">
    <div class="text-center mb-10">
      <h2
        class="text-3xl md:text-4xl font-bold text-gray-900 rounded-2xl border-2 border-green-50 bg-white shadow-md px-4 py-4"
      >
        Our HFN Story
      </h2>
    </div>

    <div class="grid md:grid-cols-2 gap-10 items-center">
      <div class="relative w-full max-w-2xl mx-auto h-[400px] sm:h-[450px]">
        <div
          class="absolute inset-x-0 bottom-0 w-[100%] sm:w-[80%] h-[350px] sm:h-[350px] rounded-[30px] overflow-hidden shadow-2xl border-4 border-green-500/50"
        >
          <img
            :src="group1"
            alt="HFN team"
            class="object-cover w-full h-full"
          />
        </div>

        <div
          class="absolute top-0 right-0 w-[30%] sm:w-[40%] h-[140px] sm:h-[180px] rounded-xl overflow-hidden shadow-2xl border-4 border-green-500"
        >
          <img :src="group" alt="HFN team" class="object-cover w-full h-full" />
        </div>
      </div>

      <div class="text-gray-700 leading-relaxed">
        <p class="mb-8">
          The Healthcare Federation of Nigeria (HFN) is the umbrella body for
          private healthcare stakeholders in Nigeria, representing the interests
          of health professionals, companies, investors, associations, and
          institutions. HFN provides members with access to advocacy platforms,
          strategic collaborations, knowledge-sharing, and investment
          opportunities aimed at building a stronger, more resilient health
          system.
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center mt-10">
          <div>
            <h3 class="text-3xl font-bold text-green-900">1</h3>
            <p class="text-green-800 font-semibold">Vision</p>
          </div>
          <div>
            <h3 class="text-3xl font-bold text-red-600">11000+</h3>
            <p class="text-green-800 font-semibold">
              Registered Health Guardians
            </p>
          </div>
          <div>
            <h3 class="text-3xl font-bold text-green-900">10+</h3>
            <p class="text-green-800 font-semibold">Partners</p>
          </div>
          <div>
            <h3 class="text-3xl font-bold text-red-600">104</h3>
            <p class="text-green-800 font-semibold">Projects Executed</p>
          </div>
          <div>
            <h3 class="text-3xl font-bold text-red-600">104</h3>
            <p class="text-green-800 font-semibold">Projects Executed</p>
          </div>
          <div>
            <h3 class="text-3xl font-bold text-red-600">11000+</h3>
            <p class="text-green-800 font-semibold">
              Registered Health Guardians
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div
        class="flex justify-center items-center h-20 relative rounded-2xl border-2 border-green-50 bg-white shadow-sm"
      >
        <select
          v-model="selectedMonth"
          class="absolute left-6 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700 appearance-none bg-white pr-8"
        >
          <option>October 2025</option>
          <option>September 2025</option>
          <option>August 2025</option>
        </select>

        <h2
          class="text-3xl md:text-4xl font-serif font-extrabold text-gray-900 tracking-tight"
        >
          HFN News
        </h2>
      </div>
    </div>
  </section>

  <section class="bg-[#f6faf8] py-16 px-6 md:px-12 lg:px-24">
    <div class="grid lg:grid-cols-3 gap-8">
      <div
        class="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
      >
        <div class="relative">
          <img
            :src="featured.image"
            alt="Featured news"
            class="w-full h-72 object-cover"
          />
          <span
            class="absolute bottom-4 left-4 bg-green-700 text-white text-xs font-semibold px-3 py-1 rounded-full"
          >
            {{ featured.tag }}
          </span>
        </div>

        <div class="p-6">
          <div class="flex items-center text-sm text-orange-600 mb-3 space-x-4">
            <span class="flex items-center gap-1">
              <i class="fa-regular fa-calendar"></i> {{ featured.date }}
            </span>
            <span class="flex items-center gap-1">
              <i class="fa-regular fa-comments"></i>
              {{ featured.comments }} Comments
            </span>
          </div>

          <p class="text-gray-700 mb-6">
            {{ featured.description }}
          </p>

          <a
            href="#"
            class="inline-flex items-center gap-2 bg-green-700 text-white px-5 py-2 rounded-full font-medium hover:bg-green-800 transition"
          >
            Read More <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <div
          v-for="(news, index) in newsList"
          :key="index"
          class="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 flex flex-col sm:flex-row transition hover:shadow-md"
        >
          <!-- Left: Image -->
          <div class="relative w-full sm:w-48">
            <img
              :src="news.image"
              alt="News image"
              class="w-full h-40 sm:h-full object-cover"
            />

            <!-- Tag on image -->
            <span
              class="absolute bottom-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full"
              :class="{
                'bg-red-700 text-white': news.tag === 'Health Alert',
                'bg-orange-600 text-white':
                  news.tag === 'Public Health Stories',
              }"
            >
              {{ news.tag }}
            </span>
          </div>

          <!-- Right: Text content -->
          <div class="flex flex-col justify-between p-4 flex-1">
            <div>
              <!-- Date and comments -->
              <div
                class="flex items-center text-xs text-orange-600 mb-2 space-x-6"
              >
                <span class="flex items-center gap-1">
                  <i class="fa-regular fa-calendar text-orange-600"></i>
                  {{ news.date }}
                </span>
                <span class="flex items-center gap-1">
                  <i class="fa-regular fa-comments text-orange-600"></i>
                  {{ news.comments }} Comments
                </span>
              </div>

              <!-- Description -->
              <p class="text-gray-700 text-sm leading-relaxed line-clamp-3">
                {{ news.description }}
              </p>
            </div>

            <!-- Bottom Tag -->
            <div class="mt-3">
              <span
                class="inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full"
                :class="{
                  'bg-red-700 text-white': news.tag === 'Health Alert',
                  'bg-orange-600 text-white':
                    news.tag === 'Public Health Stories',
                }"
              >
                {{ news.tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-16 bg-white">
    <div class="container mx-auto px-6 text-center">
      <h2
        class="text-3xl md:text-4xl font-serif mb-10 font-extrabold text-gray-900 rounded-2xl border-2 border-green-50 bg-white shadow-md px-4 py-4"
      >
        HFN Executives
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div
          v-for="(exec, index) in executives"
          :key="index"
          class="flex justify-center"
        >
          <div
            class="relative w-full max-w-xs aspect-[4/5] rounded-t-[2.5rem] rounded-b-xl overflow-hidden shadow-2xl"
            style="background-color: #f0f7f5"
          >
            <img
              :src="exec.image"
              :alt="exec.name"
              class="w-full h-full object-cover object-top"
            />

            <div
              class="absolute mb-5 bottom-0 left-1/2 transform -translate-x-1/2 w-[85%] px-4 py-3 rounded-xl border border-green-300 bg-white shadow-xl text-center"
            >
              <h3 class="text-lg font-bold text-green-700">
                {{ exec.name }}
              </h3>
              <p class="text-sm text-gray-700">
                {{ exec.position }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-20 lg:py-28 bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        class="text-3xl text-center md:text-4xl font-serif mb-10 font-extrabold text-gray-900 rounded-2xl border-2 border-green-50 bg-white shadow-md px-4 py-4"
      >
        Frequently Asked Questions (F.A.Q)
      </h2>

      <div id="faq-accordion" class="space-y-4">
        <div class="rounded-xl shadow-lg bg-white overflow-hidden">
          <button
            class="faq-toggle w-full flex justify-between items-center p-6 text-lg font-semibold hover:bg-gray-100 transition duration-150"
            aria-expanded="false"
            data-target="faq-1"
          >
            <span class="text-green-800"
              >What paves the Healthcare Federation of Nigeria (HFN) on?</span
            >
            <span
              class="faq-icon text-primary transform transition-transform duration-300"
              >+</span
            >
          </button>
          <div
            id="faq-1"
            class="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
          >
            <p class="px-6 pb-6 pt-0 text-gray-600">
              The HFN is paved on the mission to provide a unified voice for the
              private healthcare sector in Nigeria, fostering collaboration,
              promoting best practices, and driving policy change to achieve
              universal health coverage.
            </p>
          </div>
        </div>

        <div class="rounded-xl shadow-lg bg-white overflow-hidden">
          <button
            class="faq-toggle w-full flex justify-between items-center p-6 text-lg font-semibold hover:bg-gray-100 transition duration-150"
            aria-expanded="false"
            data-target="faq-2"
          >
            <span class="text-green-800">How can I join HFN?</span>
            <span
              class="faq-icon text-primary transform transition-transform duration-300"
              >+</span
            >
          </button>
          <div
            id="faq-2"
            class="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
          >
            <p class="px-6 pb-6 pt-0 text-gray-600">
              Membership is open to all legitimate private sector entities and
              individuals involved in the healthcare value chain, including
              hospitals, pharmaceutical companies, insurance providers, and
              technical service organizations. You can find the application form
              on our 'Membership' page.
            </p>
          </div>
        </div>

        <div class="rounded-xl shadow-lg bg-white overflow-hidden">
          <button
            class="faq-toggle w-full flex justify-between items-center p-6 text-lg font-semibold hover:bg-gray-100 transition duration-150"
            aria-expanded="false"
            data-target="faq-3"
          >
            <span class="text-green-800"
              >What are the benefits of HFN membership?</span
            >
            <span
              class="faq-icon text-primary transform transition-transform duration-300"
              >+</span
            >
          </button>
          <div
            id="faq-3"
            class="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
          >
            <p class="px-6 pb-6 pt-0 text-gray-600">
              Benefits include policy advocacy, networking opportunities with
              key industry leaders, access to exclusive research and reports,
              training programs, and a platform to influence the future of
              healthcare policy in Nigeria.
            </p>
          </div>
        </div>
        <div class="rounded-xl shadow-lg bg-white overflow-hidden">
          <button
            class="faq-toggle w-full flex justify-between items-center p-6 text-lg font-semibold hover:bg-gray-100 transition duration-150"
            aria-expanded="false"
            data-target="faq-4"
          >
            <span class="text-green-800">What does HFN do?</span>
            <span
              class="faq-icon text-primary transform transition-transform duration-300"
              >+</span
            >
          </button>
          <div
            id="faq-4"
            class="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
          >
            <p class="px-6 pb-6 pt-0 text-gray-600">
              Healthcare Federation Of Nigeria is independent of any
              governmental/political ideology, economic interest, religious
              affiliation; and is mission is centered on advocacy, capacity
              building, and improving access to finance for the private sector,
              all in collaboration with the public sector.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.container {
  max-width: 1100px;
}
</style>
