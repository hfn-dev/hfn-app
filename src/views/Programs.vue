<template>
    <div class="programs-page font-sans bg-white">

        <section class="bg-[#E87A1814] pt-10 pb-16">
            <div class="container mx-auto px-4 md:px-8">
                <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                    
                    <div class="lg:w-1/2 mb-8 lg:mb-0">
                        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                            <span class="text-green-700">Empowering Healthcare</span>
                            <br>
                            <span class="text-gray-900">Through Sustainable Programs</span>
                        </h1>
                        <p class="mt-4 text-gray-600 max-w-lg">
Our programs are designed to create long-term impact within Nigeria’s healthcare ecosystem. 
From digital innovation to quality improvement and workforce development, 
the Healthcare Federation of Nigeria (HFN) leads initiatives that strengthen systems, 
support professionals, and improve patient outcomes nationwide.                         </p>
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
            
            <h2 class="text-2xl font-bold text-gray-800 text-center mb-16">Programs & Initiatives</h2>
            
            <section class="mb-20">
                <h3 class="text-xl font-normal text-gray-800 mb-8 max-w-4xl mx-auto">Ongoing Programs</h3>
                <p class="text-gray-600 mb-12 max-w-4xl mx-auto">
                    Euismod magna id purus eget nunc ligula suspendisse dui metus. Condimentum blandit rutrum at mauris enim pulvinar duis etiam duis. Euismod magna id purus eget nunc ligula suspendisse dui.
                </p>

                <div class="flex flex-col mb-16 space-y-8 max-w-5xl mx-auto">
    
    <div class="flex flex-col lg:flex-row items-start lg:space-x-8 space-y-8 lg:space-y-0">
        
        <div class="lg:w-1/2 w-full">
            <h4 class="text-xl font-normal text-gray-900 mb-4">Project 1</h4>
            
            <p class="text-gray-600 mb-8 text-sm">
                Euismod magna id purus eget nunc ligula suspendisse dui
            </p>
            </div>
        
        <div class="lg:w-1/2 w-full rounded-xl overflow-hidden shadow-xl border-2 border-green-300">
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
                Euismod magna id purus eget nunc ligula suspendisse dui. Condimentum blandit rutrum at mauris enim pulvinar duis etiam duis. Euismod magna id purus eget nunc.
            </p>
        </div>
        
        <div>
            <h5 class="font-normal text-lg text-gray-900 mb-2">Solution</h5>
            <p class="text-gray-600 text-sm">
                Euismod magna id purus eget nunc ligula suspendisse dui. Condimentum blandit rutrum at mauris enim pulvinar duis etiam duis. Euismod magna id purus eget nunc.
            </p>
        </div>
        
        <div>
            <h5 class="font-normal text-lg text-gray-900 mb-2">Goals & Expected Outcome</h5>
            <p class="text-gray-600 text-sm">
                Euismod magna id purus eget nunc ligula suspendisse dui. Condimentum blandit rutrum at mauris enim pulvinar duis etiam duis. Euismod magna id purus eget nunc.
            </p>
        </div>
    </div>
</div>

                <div class="flex flex-col space-y-8 max-w-5xl mx-auto">
    
    <div class="flex flex-col lg:flex-row items-start lg:space-x-8 space-y-8 lg:space-y-0">
        
        <div class="lg:w-1/2 w-full rounded-xl overflow-hidden shadow-xl border-2 border-green-300 order-2 lg:order-1">
            <img 
                :src="group" 
                alt="Project 2 Image" 
                class="w-full h-auto object-cover"
            />
        </div>

        <div class="lg:w-1/2 w-full order-1 lg:order-2 lg:ml-8">
            <h4 class="text-xl font-normal text-gray-900 mb-4">Project 2</h4>
            
            <p class="text-gray-600 mb-8 text-sm">
                Euismod magna id purus eget nunc ligula suspendisse dui
            </p>
            </div>
        
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        
        <div>
            <h5 class="font-normal text-lg text-gray-900 mb-2">Problem</h5>
            <p class="text-gray-600 text-sm">
                Euismod magna id purus eget nunc ligula suspendisse dui. Condimentum blandit rutrum at mauris enim pulvinar duis etiam duis. Euismod magna id purus eget nunc.
            </p>
        </div>
        
        <div>
            <h5 class="font-normal text-lg text-gray-900 mb-2">Solution</h5>
            <p class="text-gray-600 text-sm">
                Euismod magna id purus eget nunc ligula suspendisse dui. Condimentum blandit rutrum at mauris enim pulvinar duis etiam duis. Euismod magna id purus eget nunc.
            </p>
        </div>
        
        <div>
            <h5 class="font-normal text-lg text-gray-900 mb-2">Goals & Expected Outcome</h5>
            <p class="text-gray-600 text-sm">
                Euismod magna id purus eget nunc ligula suspendisse dui. Condimentum blandit rutrum at mauris enim pulvinar duis etiam duis. Euismod magna id purus eget nunc.
            </p>
        </div>
    </div>
</div>
            </section>

            <section class="max-w-5xl mx-auto pt-8"> 
    <h3 class="text-2xl font-normal text-gray-800 mb-2">Past Initiatives</h3>
    <p class="text-gray-600 mb-10">
        Euismod magna id purus eget nunc ligula suspendisse dui metus. Condimentum blandit rutrum at mauris enim pulvinar duis etiam duis. Euismod magna id purus eget nunc
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div class="flex flex-col">
            <div class="w-full h-48 mb-4 rounded-xl overflow-hidden border-2 border-green-400/50 shadow-md">
                <img 
                    :src="hands" 
                    alt="Project XYZ Image 1" 
                    class="w-full h-full object-cover"
                />
            </div>

            <h4 class="text-lg font-semibold text-gray-900 mb-2">Project XYZ</h4>
            <p class="text-gray-600 text-sm mb-3">
                Euismod magna id purus eget nunc ligula suspendisse dui metus. Condimentum blandit rutrum at mauris enim pulvinar duis etiam duis. Euismod magna id purus eget nunc
            </p>
            <a href="#" class="text-orange-600 text-sm font-medium hover:text-orange-700 transition">
                Learn more...
            </a>
        </div>

        <div class="flex flex-col">
            <div class="w-full h-48 mb-4 rounded-xl overflow-hidden border-2 border-green-400/50 shadow-md">
                <img 
                    :src="hands" 
                    alt="Project XYZ Image 2" 
                    class="w-full h-full object-cover"
                />
            </div>

            <h4 class="text-lg font-semibold text-gray-900 mb-2">Project XYZ</h4>
            <p class="text-gray-600 text-sm mb-3">
                Euismod magna id purus eget nunc ligula suspendisse dui metus. Condimentum blandit rutrum at mauris enim pulvinar duis etiam duis. Euismod magna id purus eget nunc
            </p>
            <a href="#" class="text-orange-600 text-sm font-medium hover:text-orange-700 transition">
                Learn more...
            </a>
        </div>

        <div class="flex flex-col">
            <div class="w-full h-48 mb-4 rounded-xl overflow-hidden border-2 border-green-400/50 shadow-md">
                <img 
                    :src="hands" 
                    alt="Project XYZ Image 3" 
                    class="w-full h-full object-cover"
                />
            </div>

            <h4 class="text-lg font-semibold text-gray-900 mb-2">Project XYZ</h4>
            <p class="text-gray-600 text-sm mb-3">
                Euismod magna id purus eget nunc ligula suspendisse dui metus. Condimentum blandit rutrum at mauris enim pulvinar duis etiam duis. Euismod magna id purus eget nunc
            </p>
            <a href="#" class="text-orange-600 text-sm font-medium hover:text-orange-700 transition">
                Learn more...
            </a>
        </div>
        
    </div>
</section>
        </main>
    </div>
</template>

<script setup>
import latest from "@/assets/latest_news.png";
import hands from "@/assets/hands.png";
import group from "@/assets/group.png";

</script>
