<template>
    <div class="programs-page font-sans bg-white">

        <section class="bg-pink-50 pt-10 pb-16">
            <div class="container mx-auto px-4 md:px-8">
                <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                    
                    <div class="lg:w-1/2 mb-8 lg:mb-0">
                        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                            <span class="text-green-700">Lorem Ipsum</span>
                            <br>
                            <span class="text-gray-900">Lorem Ipsum, ipsum</span>
                        </h1>
                        <p class="mt-4 text-gray-600 max-w-lg">
                            Duis etiam duls. Euismod magna id purus eget nunc ligula suspendisse dal netus. Condimentum blandit rutrum at mauris enim pulvinar duis etiam duls. Euismod magna id purus eget nunc.
                        </p>
                    </div>
                    
                    <div class="lg:w-1/2 flex justify-center w-full h-64 sm:h-80 lg:h-96 relative">
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
            
            <h2 class="text-4xl font-bold text-gray-900 text-center mb-16">Programs & Initiatives</h2>
            
            <section class="mb-20">
                <h3 class="text-3xl font-semibold text-gray-800 mb-4 border-b-2 border-green-700/50 pb-2 inline-block">Ongoing Programs</h3>
                <p class="text-gray-600 mb-12 max-w-4xl">
                    The Healthcare Federation of Nigeria (HFN) actively pursues several high-impact programs designed to strengthen the healthcare delivery ecosystem, foster public-private collaboration, and drive evidence-based policy reform across the country.
                </p>

                <div class="flex flex-col lg:flex-row items-center justify-between mb-16 space-y-8 lg:space-y-0 lg:space-x-8">
                    
                    <div class="lg:w-1/2">
                        <h4 class="text-2xl font-bold text-gray-900 mb-4">Project 1: Standardizing Healthcare Quality (SHQ)</h4>
                        <p class="text-gray-600 mb-8">
                            This initiative focuses on developing and advocating for minimum quality standards across all private and public healthcare facilities to ensure safety and effectiveness of care delivery nationwide.
                        </p>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            <div>
                                <h5 class="font-bold text-lg text-red-600 mb-2">Problem</h5>
                                <p class="text-gray-600 text-sm">
                                    Lack of unified, enforceable quality benchmarks leads to significant variations in patient outcomes and difficulty in regulating substandard practices.
                                </p>
                            </div>
                            
                            <div>
                                <h5 class="font-bold text-lg text-green-700 mb-2">Solution</h5>
                                <p class="text-gray-600 text-sm">
                                    Establish a multi-stakeholder committee to create National Healthcare Quality Guidelines and lobby for legislative adoption and independent enforcement.
                                </p>
                            </div>
                            
                            <div>
                                <h5 class="font-bold text-lg text-blue-600 mb-2">Goals & Expected Outcome</h5>
                                <p class="text-gray-600 text-sm">
                                    Achieve a 40% reduction in preventable patient safety incidents within 3 years and enhance consumer trust in the healthcare system.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="lg:w-1/2 rounded-lg overflow-hidden shadow-xl">
                        <img 
                            :src="latest" 
                            alt="Standardizing Healthcare Quality Initiative" 
                            class="w-full h-auto object-cover"
                        />
                    </div>
                </div>

                <div class="flex flex-col lg:flex-row-reverse items-center justify-between space-y-8 lg:space-y-0 lg:space-x-reverse lg:space-x-8">
                    
                    <div class="lg:w-1/2 rounded-lg overflow-hidden shadow-xl">
                        <img 
                            :src="latest" 
                            alt="Technology Adoption Project" 
                            class="w-full h-auto object-cover"
                        />
                    </div>

                    <div class="lg:w-1/2">
                        <h4 class="text-2xl font-bold text-gray-900 mb-4">Project 2: Technology Adoption in Rural Healthcare</h4>
                        <p class="text-gray-600 mb-8">
                            This program aims to bridge the digital divide by facilitating the subsidized adoption of electronic health records (EHR) and telehealth solutions in primary care centers located in underserved rural areas.
                        </p>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            <div>
                                <h5 class="font-bold text-lg text-red-600 mb-2">Problem</h5>
                                <p class="text-gray-600 text-sm">
                                    Rural health centers rely heavily on paper records, leading to fragmented patient data, high error rates, and slow clinical decision-making.
                                </p>
                            </div>
                            
                            <div>
                                <h5 class="font-bold text-lg text-green-700 mb-2">Solution</h5>
                                <p class="text-gray-600 text-sm">
                                    Provide subsidized access to certified EHR software, offer technical training, and establish connectivity support for pilot rural health facilities.
                                </p>
                            </div>
                            
                            <div>
                                <h5 class="font-bold text-lg text-blue-600 mb-2">Goals & Expected Outcome</h5>
                                <p class="text-gray-600 text-sm">
                                    Increase data reporting compliance by 60% and improve patient access to specialist consultations via telehealth by the end of the pilot phase.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h3 class="text-3xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-400/50 pb-2 inline-block">Past Initiatives</h3>
                <p class="text-gray-600 mb-6 max-w-4xl">
                    HFN has a strong history of successful completed projects that laid the groundwork for current programs. These initiatives focused on early advocacy, capacity building, and emergency response planning.
                </p>
                
                <ul class="list-disc list-inside space-y-2 pl-4 text-gray-700">
                    <li>"Health Policy Dialogue 2022": A successful conference that resulted in a white paper presented to the Ministry of Health on funding mechanisms.</li>
                    <li>"Post-Pandemic Capacity Building": A nation-wide training program focused on supply chain resilience and infectious disease management for private clinics.</li>
                    <li>"Community Health Workers Empowerment": A completed pilot program that equipped 50 community health workers with essential diagnostic kits and mobile reporting tools.</li>
                </ul>

            </section>

        </main>
    </div>
</template>

<script setup>
import latest from "@/assets/latest_news.png";

</script>  
