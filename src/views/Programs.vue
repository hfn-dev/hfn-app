<template>
  <div class="programs-page font-sans bg-white">
    <section class="bg-[#E87A1814] pt-10 pb-16">
      <div class="container mx-auto px-4 md:px-8">
        <div
          class="flex flex-col lg:flex-row items-start lg:items-center justify-between"
        >
          <div class="lg:w-1/2 mb-8 lg:mb-0">
            <h1
              class="text-4xl md:text-5xl font-bold text-gray-800 leading-tight"
            >
              <span class="text-green-700">Empowering Healthcare</span>
              <br />
              <span class="text-gray-900">Through Sustainable Programs</span>
            </h1>
            <p class="mt-4 text-gray-600 max-w-lg">
              Our programs are designed to create long-term impact within
              Nigeria’s healthcare ecosystem. From digital innovation to quality
              improvement and workforce development, the Healthcare Federation
              of Nigeria (HFN) leads initiatives that strengthen systems,
              support professionals, and improve patient outcomes nationwide.  
                                   
            </p>
          </div>

          <div
            class="lg:w-1/2 flex justify-center w-full h-64 sm:h-80 lg:h-96 relative"
          >
            <img
              :src="latest"
              alt="Latest programs"
              class="object-cover w-full h-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>

    <main class="container mx-auto px-4 md:px-8 py-16">
      <h2 class="text-2xl font-bold text-gray-800 text-center mb-16">
        Programs & Initiatives
      </h2>

      <section class="mb-20">
        <h3 class="text-xl font-normal text-gray-800 mb-8 max-w-4xl mx-auto">
          Ongoing Programs
        </h3>
        <p class="text-gray-600 mb-12 max-w-4xl mx-auto">
          HFN’s ongoing programs address workforce gaps, policy advocacy, and
          system inefficiencies. Each initiative is designed to deliver
          measurable outcomes and sustainable change within Nigeria’s healthcare
          landscape.
        </p>

        <div class="flex flex-col mb-16 space-y-8 max-w-5xl mx-auto">
          <div
            class="flex flex-col lg:flex-row items-start lg:space-x-8 space-y-8 lg:space-y-0"
          >
            <div class="lg:w-1/2 w-full pt-20">
              <h4 class="text-xl font-bold text-gray-900 mb-4 underline">
                Project 1
              </h4>

              <p class="text-gray-600 mb-8 text-sm">
                Leveraging technology to improve patient care, enhance hospital
                efficiency, and expand access to telemedicine across urban and
                rural areas.
              </p>
            </div>

            <div
              class="lg:w-1/2 w-full rounded-xl overflow-hidden shadow-xl border-2 border-green-300"
            >
              <img
                :src="group"
                alt="Project 1 Image"
                class="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div>
              <h5 class="font-normal text-lg text-gray-900 mb-2">Problem</h5>
              <p class="text-gray-600 text-sm">
                Nigeria’s healthcare sector faces gaps in data management,
                limited patient tracking, and poor digital record systems that
                slow down service delivery.
              </p>
            </div>

            <div>
              <h5 class="font-normal text-lg text-gray-900 mb-2">Solution</h5>
              <p class="text-gray-600 text-sm">
                Implementation of interoperable digital health systems and
                training healthcare professionals on e-health tools for
                real-time patient management.
              </p>
            </div>

            <div>
              <h5 class="font-normal text-lg text-gray-900 mb-2">
                Goals & Expected Outcome
              </h5>
              <p class="text-gray-600 text-sm">
                Improved efficiency in care coordination, enhanced data
                accuracy, and expanded access to telehealth solutions
                nationwide.
              </p>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col space-y-8 max-w-5xl mx-auto bg-[#F2F9F3] px-10 py-10 rounded-3xl"
        >
          <div
            class="flex flex-col lg:flex-row items-start lg:space-x-8 space-y-8 lg:space-y-0"
          >
            <div
              class="lg:w-1/2 w-full rounded-xl overflow-hidden shadow-xl border-2 border-green-300 order-2 lg:order-1"
            >
              <img
                :src="hands1"
                alt="Project 2 Image"
                class="w-full h-auto object-cover"
              />
            </div>

            <div class="lg:w-1/2 w-full order-1 lg:order-2 lg:ml-8 pt-20">
              <h4 class="text-xl font-bold text-gray-900 mb-4 underline">
                Project 2
              </h4>

              <p class="text-gray-600 mb-8 text-sm">
                Strengthening the capacity of Nigeria’s healthcare professionals
                through leadership training, technical upskilling, and
                mentorship opportunities.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div>
              <h5 class="font-normal text-lg text-gray-900 mb-2">Problem</h5>
              <p class="text-gray-600 text-sm">
                The shortage of qualified healthcare workers and migration of
                skilled professionals continue to hinder access to quality care
                in many regions.
              </p>
            </div>

            <div>
              <h5 class="font-normal text-lg text-gray-900 mb-2">Solution</h5>
              <p class="text-gray-600 text-sm">
                Launching continuous professional development programs,
                mentorship initiatives, and policy dialogues to improve
                retention and career growth.
              </p>
            </div>

            <div>
              <h5 class="font-normal text-lg text-gray-900 mb-2">
                Goals & Expected Outcome
              </h5>
              <p class="text-gray-600 text-sm">
                A more skilled, motivated, and well-distributed healthcare
                workforce equipped to meet Nigeria’s growing health demands.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-5xl mx-auto pt-8">
        <h3 class="text-2xl font-normal text-gray-800 mb-2">
          Past Initiatives
        </h3>
        <p class="text-gray-600 mb-10">
          Over the years, HFN has implemented multiple programs that have
          advanced healthcare quality, access, and policy advocacy across
          Nigeria. Here are a few notable initiatives.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="flex flex-col">
            <div
              class="w-full h-48 mb-4 rounded-xl overflow-hidden border-2 border-green-400/50 shadow-md"
            >
              <img
                :src="hands"
                alt="Project XYZ Image 1"
                class="w-full h-full object-cover"
              />
            </div>

            <h4 class="text-lg font-semibold text-gray-900 mb-2">
              Quality Improvement & Patient Safety Program Project
            </h4>
            <p class="text-gray-600 text-sm mb-3">
              Enhanced clinical governance through training on patient safety
              and standard operating procedures for private and public
              hospitals.
            </p>
            <a
              href="#"
              class="text-orange-600 text-sm font-medium hover:text-orange-700 transition"
            >
              Learn more...
            </a>
          </div>

          <div class="flex flex-col">
            <div
              class="w-full h-48 mb-4 rounded-xl overflow-hidden border-2 border-green-400/50 shadow-md"
            >
              <img
                :src="hands2"
                alt="Project Image 2"
                class="w-full h-full object-cover"
              />
            </div>

            <h4 class="text-lg font-semibold text-gray-900 mb-2">
              Access to Care Project
            </h4>
            <p class="text-gray-600 text-sm mb-3">
              Partnered with community clinics and mobile health teams to
              provide essential services to underserved populations.
            </p>
            <a
              href="#"
              class="text-orange-600 text-sm font-medium hover:text-orange-700 transition"
            >
              Learn more...
            </a>
          </div>

          <div class="flex flex-col">
            <div
              class="w-full h-48 mb-4 rounded-xl overflow-hidden border-2 border-green-400/50 shadow-md"
            >
              <img
                :src="hands3"
                alt="Project XYZ Image 3"
                class="w-full h-full object-cover"
              />
            </div>

            <h4 class="text-lg font-semibold text-gray-900 mb-2">
              Policy Dialogue Series Project
            </h4>
            <p class="text-gray-600 text-sm mb-3">
              Created a platform for government and private sector leaders to
              collaborate on national health reforms and sustainable financing.
            </p>
            <a
              href="#"
              class="text-orange-600 text-sm font-medium hover:text-orange-700 transition"
            >
              Learn more...
            </a>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
const latest =
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769715462/7b1cf2bb015edf7a3b174efeea1885c9_S_rmdi9e.jpg";

const group =
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769715462/9b5a0a3fd69afdefa5535542b438e3b5_L_ttzh44.jpg";

const hands1 =
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769715460/7f1f2889896f4672f824c99531afb22a_L_ded16z.jpg";
const hands2 =
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769715462/3d5f5fa3430c20ad8e03385fc8424f4d_M_o3dquk.jpg";
const hands3 =
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769715460/47ed312dbee39b4feb4a261300270374_M_loxrhx.jpg";
const hands =
  "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769715457/0647a6ce9fdb90a9ec50f1f223793960_M_n4hpgb.jpg";
</script>
