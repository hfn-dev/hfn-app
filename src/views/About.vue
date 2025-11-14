<script setup>
import aboutImage from "@/assets/about-us.png";
import ayodele from "@/assets/ayodele.png";
import babarinde from "@/assets/babarinde.png";
import chinyere from "@/assets/chinyere.png";
import jennifer from "@/assets/jennifer.png";
import map from "@/assets/map.jpg";
import njide from "@/assets/njide.png";
import partnership from "@/assets/partnership-01.png";
import reagan from "@/assets/reagan.png";
</script>
<template>
  <div>
    <section class="relative bg-green-50 pb-16 pt-16 sm:pb-24 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          <div class="lg:col-span-6 xl:col-span-5 mb-10 lg:mb-0">
            <h1
              class="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight"
            >
              <span class="text-orange-600">Championing </span>
              <span class="text-green-700">Healthcare in Nigeria.</span>
            </h1>

            <p class="mt-6 text-lg text-gray-700">
              <span class="font-semibold text-green-700"
                >Healthcare Federation of Nigeria</span
              >
              is uniting healthcare providers, insurers, and tech leaders to
              drive transformation.
            </p>
            <p class="mt-4 text-gray-700 text-lg">
              HFN advocates for changes in policy and policy reform that will
              support the growth and development of the private health sector.
            </p>

            <div class="mt-10">
              <RouterLink
                to="/register"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-green-700 hover:bg-green-800 transition transform hover:scale-[1.02]"
              >
                Join the Coalition
                <svg
                  class="ml-3 -mr-1 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </RouterLink>
            </div>
          </div>

          <div
            class="lg:col-span-6 xl:col-span-7 relative flex justify-center lg:justify-end"
          >
            <div
              class="w-full max-w-lg lg:max-w-none p-4 overflow-hidden shadow-2xl"
              style="background-color: #f0f7f5; border-radius: 2rem"
            >
              <img
                :src="map"
                alt="World Map of Growing Greenery representing global health"
                class="w-full h-auto object-cover rounded-[2rem] transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-6 sm:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div
            class="w-full px-4 py-4 sm:px-6 rounded-2xl border-2 border-green-50 bg-white shadow-md text-center"
          >
            <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900">
              About Us
            </h2>
          </div>
        </div>

        <div class="lg:grid lg:grid-cols-12 lg:gap-12">
          <div class="lg:col-span-5 flex justify-center mb-10 lg:mb-0">
            <div class="relative w-full overflow-hidden">
              <img
                :src="aboutImage"
                alt="HFN advocacy and partnership"
                class="w-full h-full object-contain transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          <div class="lg:col-span-7 text-gray-700 text-lg space-y-6">
            <p>
              HFN is an umbrella body for private-sector stakeholders dedicated
              to improving healthcare delivery in Nigeria. As the leading
              advocate for private sector involvement in the healthcare
              industry, HFN plays a pivotal role in shaping policy, fostering
              partnerships, and driving innovations that enhance access to
              quality healthcare services for all Nigerians. HFN's work spans
              regulatory advocacy, capacity building, and supporting national
              health initiatives, ensuring that the private sector is an
              integral partner in Nigeria's healthcare transformation.
            </p>

            <p>
              We are driven by a vision to support the achievement of universal
              healthcare coverage through the activation and empowerment of the
              private sector.
            </p>

            <div>
              <h3 class="font-bold text-xl text-green-700 mb-2">
                Our mission
                <span class="text-gray-700 text-lg font-normal"
                  >is centered on advocacy, capacity building, and improving
                  access to finance for the private sector, all in collaboration
                  with the public sector.</span
                >
              </h3>
              <p class="text-lg text-gray-700">
                Healthcare Federation of Nigeria is independent of any
                governmental/political ideology, economic interest, religious
                affiliation; and is mainly funded by our membership and
                volitional donations from well-meaning Nigerians.
              </p>
            </div>

            <div>
              <h3 class="font-bold text-xl text-green-700 mb-2">
                Our vision
                <span class="text-gray-700 text-lg font-normal"
                  >is anchored on a “patient-centric” approach to policy
                  advocacy which is our driving force.</span
                >
              </h3>
              <p class="text-lg text-gray-700">
                This is anchored on the simple conclusion that, if life is basic
                and healthcare caters to life, then the Healthcare Federation of
                Nigeria should have no overarching motive for advocating better
                healthcare in Nigeria than human life
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-6 sm:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div
            class="w-full px-4 py-4 sm:px-6 rounded-2xl border-2 border-green-50 bg-white shadow-md text-center"
          >
            <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Why join HNF?
            </h2>
          </div>
        </div>
        <div class="mb-10 lg:mb-0">
          <div
            class="relative w-full overflow-hidden h-80 sm:h-96 md:h-[500px] bg-[#F2F9F3]"
          >
            <img
              :src="partnership"
              alt="HFN partnership"
              class="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-6 sm:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div
            class="w-full px-4 py-4 sm:px-6 rounded-2xl border-2 border-green-50 bg-white shadow-md text-center"
          >
            <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Our Leadership
            </h2>
          </div>
        </div>
        <section class="bg-white py-16 sm:py-24">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="space-y-20">
              <div class="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
                <div
                  class="lg:col-span-4 flex justify-center lg:justify-start mb-8 lg:mb-0"
                >
                  <div
                    class="relative w-full max-w-xs aspect-[4/5] rounded-t-[2.5rem] rounded-b-xl overflow-hidden shadow-2xl"
                    style="background-color: #f0f7f5"
                  >
                    <img
                      :src="njide"
                      alt="Mrs. Njide Ndili"
                      class="w-full h-full object-cover object-top"
                    />

                    <div
                      class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[85%] px-4 py-3 rounded-xl border border-green-300 bg-white shadow-xl text-center"
                    >
                      <h3 class="text-lg font-bold text-green-700">
                        Mrs. Njide Ndili
                      </h3>
                      <p class="text-sm text-gray-700">President</p>
                    </div>
                  </div>
                </div>

                <div class="lg:col-span-8 text-gray-700">
                  <h4 class="font-bold text-xl mb-4 text-gray-900">
                    Biography
                  </h4>
                  <p class="mb-6 text-lg">
                    Mrs. Njide Ndili is a seasoned healthcare leader with over
                    two decades of experience in hospital administration,
                    healthcare policy, and organizational development. Her
                    passion for strengthening healthcare systems has driven her
                    to lead several transformational initiatives focused on
                    patient care, operational efficiency, and workforce
                    training. A graduate of Business Administration with
                    advanced studies in Healthcare Management, Mrs. Ndili has
                    worked with both public and private health institutions to
                    improve service delivery standards. She is deeply committed
                    to mentoring young healthcare professionals and fostering
                    collaborations that advance sustainable healthcare practices
                    in Nigeria and beyond.
                  </p>
                  <h4 class="font-bold text-xl mb-2 text-gray-900">
                    Words on Marble...
                  </h4>
                  <p class="italic text-lg text-gray-800">
                    "True leadership in healthcare is measured not by titles,
                    but by the lives we touch and the systems we transform."
                  </p>
                </div>
              </div>

              <div class="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
                <div class="lg:col-span-8 text-gray-700 order-2 lg:order-1">
                  <h4 class="font-bold text-xl mb-4 text-gray-900">
                    Biography
                  </h4>
                  <p class="mb-6 text-lg">
                    Dr. Ayodele Benson-Cole is a respected physician and
                    healthcare strategist with over 18 years of clinical and
                    administrative experience. He has built a reputation for
                    promoting quality healthcare standards and patient-centered
                    innovations in both urban and underserved communities. Dr.
                    Benson-Cole earned his medical degree from the University of
                    Ibadan and holds certifications in Healthcare Leadership and
                    Quality Improvement. He has served as a consultant to
                    various public health projects and continues to advocate for
                    accessible healthcare systems that prioritize prevention,
                    education, and technology integration.
                  </p>
                  <h4 class="font-bold text-xl mb-2 text-gray-900">
                    Words on Marble...
                  </h4>
                  <p class="italic text-lg text-gray-800">
                    "Medicine is not just about curing the sick; it is about
                    inspiring hope, preserving dignity, and leading with
                    compassion."
                  </p>
                </div>

                <div
                  class="lg:col-span-4 flex justify-center lg:justify-end mb-8 lg:mb-0 order-1 lg:order-2"
                >
                  <div
                    class="relative w-full max-w-xs aspect-[4/5] rounded-t-[2.5rem] rounded-b-xl overflow-hidden shadow-2xl"
                    style="background-color: #fcefe7"
                  >
                    <img
                      :src="ayodele"
                      alt="Dr. Ayodele Benson-Cole"
                      class="w-full h-full object-cover object-top"
                    />

                    <div
                      class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[85%] px-4 py-3 rounded-xl border border-orange-300 bg-white shadow-xl text-center"
                    >
                      <h3 class="text-lg font-bold text-orange-700">
                        Dr. Ayodele Benson-Cole
                      </h3>
                      <p class="text-sm text-gray-700">1st Vice-President</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="bg-white py-16 sm:py-24">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="space-y-20">
              <div class="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
                <div
                  class="lg:col-span-4 flex justify-center lg:justify-start mb-8 lg:mb-0"
                >
                  <div
                    class="relative w-full max-w-xs aspect-[4/5] rounded-t-[2.5rem] rounded-b-xl overflow-hidden shadow-2xl"
                    style="background-color: #f0f7f5"
                  >
                    <img
                      :src="jennifer"
                      alt="Dr. Jennifer Anyati"
                      class="w-full h-full object-cover object-top"
                    />

                    <div
                      class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[85%] px-4 py-3 rounded-xl border border-green-300 bg-white shadow-xl text-center"
                    >
                      <h3 class="text-lg font-bold text-green-700">
                        Dr. Jennifer Anyati
                      </h3>
                      <p class="text-sm text-gray-700">2nd Vice President</p>
                    </div>
                  </div>
                </div>

                <div class="lg:col-span-8 text-gray-700">
                  <h4 class="font-bold text-xl mb-4 text-gray-900">
                    Biography
                  </h4>
                  <p class="mb-6 text-lg">
                    Dr. Jennifer Anyati is a dynamic public health professional
                    and advocate for equitable healthcare delivery. With a
                    strong background in epidemiology and healthcare planning,
                    she has led numerous community health programs aimed at
                    improving maternal and child health outcomes. Her work
                    emphasizes the power of data-driven decision-making and
                    collaboration between government, private, and non-profit
                    sectors. Dr. Anyati has also served as a mentor to emerging
                    healthcare practitioners, encouraging innovation and ethical
                    practice in all aspects of healthcare delivery.
                  </p>
                  <h4 class="font-bold text-xl mb-2 text-gray-900">
                    Words on Marble...
                  </h4>
                  <p class="italic text-lg text-gray-800">
                    "When we uplift communities through healthcare, we heal not
                    just individuals but the future of our nation."
                  </p>
                </div>
              </div>

              <div class="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
                <div class="lg:col-span-8 text-gray-700 order-2 lg:order-1">
                  <h4 class="font-bold text-xl mb-4 text-gray-900">
                    Biography
                  </h4>
                  <p class="mb-6 text-lg">
                    Mrs. Chinyere Okorocha is an accomplished communications
                    professional with over 15 years of experience in healthcare
                    public relations and stakeholder engagement. She has
                    successfully managed campaigns that increased public
                    awareness about preventive health, vaccination, and patient
                    rights. Her expertise lies in crafting clear and empathetic
                    messages that bridge the gap between healthcare providers
                    and the public. Mrs. Okorocha believes that effective
                    communication is vital to trust, transparency, and health
                    system strengthening.
                  </p>
                  <h4 class="font-bold text-xl mb-2 text-gray-900">
                    Words on Marble...
                  </h4>
                  <p class="italic text-lg text-gray-800">
                    "When people understand healthcare, they make choices that
                    transform lives — communication is the heartbeat of
                    progress."
                  </p>
                </div>

                <div
                  class="lg:col-span-4 flex justify-center lg:justify-end mb-8 lg:mb-0 order-1 lg:order-2"
                >
                  <div
                    class="relative w-full max-w-xs aspect-[4/5] rounded-t-[2.5rem] rounded-b-xl overflow-hidden shadow-2xl"
                    style="background-color: #fcefe7"
                  >
                    <img
                      :src="chinyere"
                      alt="Mrs. Chinyere Okorocha"
                      class="w-full h-full object-cover object-top"
                    />

                    <div
                      class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[85%] px-4 py-3 rounded-xl border border-orange-300 bg-white shadow-xl text-center"
                    >
                      <h3 class="text-lg font-bold text-orange-700">
                        Mrs. Chinyere Okorocha
                      </h3>
                      <p class="text-sm text-gray-700">
                        Public Relations Secretary
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="bg-white py-16 sm:py-24">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="space-y-20">
              <div class="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
                <div
                  class="lg:col-span-4 flex justify-center lg:justify-start mb-8 lg:mb-0"
                >
                  <div
                    class="relative w-full max-w-xs aspect-[4/5] rounded-t-[2.5rem] rounded-b-xl overflow-hidden shadow-2xl"
                    style="background-color: #f0f7f5"
                  >
                    <img
                      :src="babarinde"
                      alt="Mr. Babarinde Olayode"
                      class="w-full h-full object-cover object-top"
                    />

                    <div
                      class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[85%] px-4 py-3 rounded-xl border border-green-300 bg-white shadow-xl text-center"
                    >
                      <h3 class="text-lg font-bold text-green-700">
                        Mr. Babarinde Olayode
                      </h3>
                      <p class="text-sm text-gray-700">Financial Secretary</p>
                    </div>
                  </div>
                </div>

                <div class="lg:col-span-8 text-gray-700">
                  <h4 class="font-bold text-xl mb-4 text-gray-900">
                    Biography
                  </h4>
                  <p class="mb-6 text-lg">
                    Mr. Babarinde Olayode is a certified finance professional
                    with over 12 years of experience managing budgets,
                    investments, and financial systems within the healthcare
                    sector. His strategic financial planning has enabled
                    organizations to allocate resources efficiently while
                    maintaining accountability and transparency. With a
                    background in Accounting and an MBA in Health Economics, Mr.
                    Olayode is passionate about improving financial
                    sustainability in healthcare institutions and driving
                    innovations in health financing.
                  </p>
                  <h4 class="font-bold text-xl mb-2 text-gray-900">
                    Words on Marble...
                  </h4>
                  <p class="italic text-lg text-gray-800">
                    "Financial integrity in healthcare is not just about numbers
                    — it’s about ensuring every naira spent saves a life."
                  </p>
                </div>
              </div>

              <div class="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
                <div class="lg:col-span-8 text-gray-700 order-2 lg:order-1">
                  <h4 class="font-bold text-xl mb-4 text-gray-900">
                    Biography
                  </h4>
                  <p class="mb-6 text-lg">
                    Mr. Reagan Rowland is a results-oriented finance
                    administrator dedicated to promoting accountability and
                    fiscal discipline in the healthcare industry. With over a
                    decade of experience in financial management and audit
                    processes, he has supported several healthcare organizations
                    in achieving operational excellence through strategic cost
                    control and transparent reporting. He is known for his
                    collaborative leadership and ability to translate financial
                    insights into actionable growth strategies that strengthen
                    healthcare systems.
                  </p>
                  <h4 class="font-bold text-xl mb-2 text-gray-900">
                    Words on Marble...
                  </h4>
                  <p class="italic text-lg text-gray-800">
                    "Transparency is the foundation upon which trust and
                    progress in healthcare are built."
                  </p>
                </div>

                <div
                  class="lg:col-span-4 flex justify-center lg:justify-end mb-8 lg:mb-0 order-1 lg:order-2"
                >
                  <div
                    class="relative w-full max-w-xs aspect-[4/5] rounded-t-[2.5rem] rounded-b-xl overflow-hidden shadow-2xl"
                    style="background-color: #fcefe7"
                  >
                    <img
                      :src="reagan"
                      alt="Mr. Reagan Rowland"
                      class="w-full h-full object-cover object-top"
                    />

                    <div
                      class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[85%] px-4 py-3 rounded-xl border border-orange-300 bg-white shadow-xl text-center"
                    >
                      <h3 class="text-lg font-bold text-orange-700">
                        Mr. Reagan Rowland
                      </h3>
                      <p class="text-sm text-gray-700">Treasurer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>
