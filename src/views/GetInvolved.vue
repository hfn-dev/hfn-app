<template>
    <div class="get-involved-page font-sans bg-white">

        <section class="bg-green-50 pt-10 pb-16"> 
            <div class="container mx-auto px-4 md:px-8">
                <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                    
                    <div class="lg:w-1/2 mb-8 lg:mb-0">
                        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                            <span class="text-green-700">Join the Movement</span>
                            <br>
                            <span class="text-gray-900">Transform Healthcare in Nigeria</span>
                        </h1>
                        <p class="mt-4 text-gray-600 max-w-lg">
                            Partner with us to build a stronger, healthier Nigeria through innovation, advocacy, and collaboration.
              Together, we can make quality healthcare accessible to every citizen.
                        </p>
                    </div>
                    
                    <div class="lg:w-1/2 flex justify-center w-full h-64 sm:h-80 lg:h-96 relative">
                        <img 
                    :src="latest" 
                    alt="Get involved"
                    class="object-cover w-full h-full rounded-lg"
                />
                         </div>
                </div>
            </div>
        </section>

        <main class="container mx-auto px-4 md:px-8 py-16">
            
            <h2 class="text-4xl font-bold text-gray-900 text-center mb-16">Get Involved</h2>
            
            <hr class="border-gray-200 mb-12">

            <section class="mb-16">
                <h3 class="text-2xl font-semibold text-gray-800 mb-4">Partnerships</h3>
                <p class="text-gray-600 mb-4 max-w-4xl">
                    Healthcare Federation Of Nigeria is independent of any government/political ideology, economic interest, religious affiliation, and is mainly funded by our membership and volitional donations from well-meaning Nigerians.
                </p>
                <p class="text-gray-600 mb-6 max-w-4xl">
                    This vision is anchored on a "patient-centric" approach to policy advocacy which is our driving force. This is anchored on the simple conclusion that, if life is basic and fundamental, there is no reason why the patient should suffer due to a faulty health system. We are the voice for advocating better healthcare in Nigeria that human life.
                </p>
                <p class="text-gray-600 max-w-4xl font-semibold">
                    Our Partners support HFN in the medium and long term via our specially designed offerings, including:
                </p>
            </section>

            <section class="mb-20">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    <div class="border rounded-lg p-6 shadow-md bg-white hover:shadow-xl transition duration-300">
                        <h4 class="text-xl font-bold text-gray-900 mb-3">Event Sponsorship</h4>
                        <p class="text-gray-600 text-sm mb-6 h-32 overflow-hidden bg-pink-100 p-3">
                            HFN hosts over 10 events every year, attracting top policy makers, both physical and online. Sponsors can select from our various events and external delegates via different packages. This is a unique opportunity to identify opportunities that align with your brand.
                            <span class="block mt-2 font-medium">To learn more about this programme, please contact our partnership team</span>
                        </p>
                        <div class="flex justify-center">
                            <button class="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition duration-150 text-sm font-semibold">
                                Contact Us
                            </button>
                        </div>
                    </div>

                    <div class="border rounded-lg p-6 shadow-md bg-white hover:shadow-xl transition duration-300">
                        <h4 class="text-xl font-bold text-gray-900 mb-3">Exhibitor Stands</h4>
                        <p class="text-gray-600 text-sm mb-6 h-32 overflow-hidden bg-pink-100 p-3">
                            This is an excellent way to showcase your brand directly to healthcare providers, key decision-makers and stakeholders within the healthcare sector. At various events, we can also offer exclusive packages.
                            <span class="block mt-2 font-medium">For further details, contact our team</span>
                        </p>
                        <div class="flex justify-center">
                            <button class="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition duration-150 text-sm font-semibold">
                                Contact Us
                            </button>
                        </div>
                    </div>

                    <div class="border rounded-lg p-6 shadow-md bg-white hover:shadow-xl transition duration-300">
                        <h4 class="text-xl font-bold text-gray-900 mb-3">Advertisements</h4>
                        <p class="text-gray-600 text-sm mb-6 h-32 overflow-hidden bg-pink-100 p-3">
                            Our Quarterly Newsletter is distributed to all our members and to various categories of healthcare professions. We accept advertisements ranging from a half page to double page spreads, subject to editorial approval by the secretary.
                            <span class="block mt-2 font-medium">For pricing, contact our team.</span>
                        </p>
                        <div class="flex justify-center">
                            <button class="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition duration-150 text-sm font-semibold">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section class="mb-20">
                <h3 class="text-2xl font-semibold text-gray-800 mb-4">Donate</h3>
                <p class="text-gray-600 mb-4 max-w-4xl">
                    HFN welcomes donations to support our work advancing healthcare.
                </p>
                <p class="text-gray-600 mb-8 max-w-4xl">
                    Every contribution helps enable us to share knowledge and foster collaboration amongst our global network of healthcare professionals, improving patient outcomes for better lives. Whether you’d like to make a one-off gift or set up a regular payment, it’s easy to donate online. Click the button to get started.
                </p>
                <div class="flex justify-center">
                    <button class="px-8 py-3 bg-green-700 text-white rounded-md shadow-lg hover:bg-green-800 transition duration-150 font-bold">
                        Donate Now
                    </button>
                </div>
            </section>

            <section>
                <h3 class="text-2xl font-semibold text-gray-800 mb-4">Volunteer</h3>
                <p class="text-gray-600 mb-4 max-w-4xl">
          Whether in logistics, community outreach, or event support, there’s always a role for you.
                </p>
                <p class="text-gray-600 mb-8 max-w-4xl">
          Join our network of passionate volunteers working together to improve healthcare outcomes in Nigeria.
                </p>
                <div class="flex justify-center">
                    <button class="px-8 py-3 bg-green-700 text-white rounded-md shadow-lg hover:bg-green-800 transition duration-150 font-bold">
                        Sign Up Now
                    </button>
                </div>
            </section>

        </main>
    </div>
</template>

<script setup>
import latest from "@/assets/latest_news.png";

</script>   
