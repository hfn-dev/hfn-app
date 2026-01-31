<template>
  <div class="bg-[#f8fdf9] min-h-screen">
    
    
    <section class="bg-[#F2F9F3] py-16 lg:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
        <div class="mb-12 lg:mb-0">
          <h2
            class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4"
          >
            <span class="text-orange-500 block"
              >Governance & Leadership</span
            >
            <span class="text-green-700 block mt-2"
              >A coalition driving policy and innovation.</span
            >
          </h2>
          <p class="mt-6 text-lg text-gray-600 max-w-xl">
           HFN is guided by a Board of Trustees and an Executive Committee providing strategic oversight and leadership for Nigeria’s private health sector.
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

    <section class="py-24 max-w-7xl mx-auto px-4">
      <div class="flex items-center gap-4 mb-16">
        <h2 class="text-3xl font-black text-gray-900 uppercase tracking-tight">Board of Trustees</h2>
        <div class="h-[2px] flex-grow bg-gray-100"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div class="lg:col-span-3 flex justify-center mb-10">
          <div class="group relative w-full max-w-md bg-white p-8 rounded-[3.5rem] shadow-2xl border-2 border-orange-400/20 transform hover:-translate-y-2 transition-all duration-500">
             <div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-orange-400 text-white px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg z-20">
                Chair
             </div>
             <div class="aspect-square rounded-[2.5rem] overflow-hidden bg-gray-100 mb-6 border-4 border-[#f2f9f3]">
                <img :src="chairImage" alt="Bola Adesola" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
             </div>
             <div class="text-center">
               <h3 class="text-3xl font-black text-[#004d33]">Bola Adesola</h3>
               <p class="text-orange-600 font-bold text-sm uppercase tracking-[0.2em] mt-2">Chair, Board of Trustees</p>
             </div>
          </div>
        </div>

        <div v-for="trustee in trustees" :key="trustee.name" 
             class="bg-white p-6 rounded-[3rem] shadow-lg border border-gray-50 hover:shadow-2xl transition-all group">
          <div class="aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-100 mb-6">
             <img :src="trustee.image" :alt="trustee.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div class="text-center">
            <h4 class="text-xl font-black text-gray-900">{{ trustee.name }}</h4>
            <p class="text-gray-500 font-bold text-xs uppercase tracking-widest mt-1">{{ trustee.title }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-white rounded-t-[5rem] shadow-[-20px_0_60px_rgba(0,0,0,0.05)]">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center gap-4 mb-16 justify-end text-right">
          <div class="h-[2px] flex-grow bg-gray-100"></div>
          <h2 class="text-3xl font-black text-[#004d33] uppercase tracking-tight">Executive Committee</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="exec in executives" :key="exec.name" 
               class="flex flex-col sm:flex-row gap-8 p-8 rounded-[2.5rem] bg-[#f8fdf9] border border-gray-50 hover:bg-white hover:shadow-xl transition-all group">
            
            <div class="w-full sm:w-44 h-56 rounded-[2rem] overflow-hidden bg-gray-200 shrink-0 shadow-md">
               <img :src="exec.image" :alt="exec.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>

            <div class="flex flex-col justify-center">
              <h4 class="text-2xl font-black text-gray-900 leading-tight">{{ exec.name }}</h4>
              <p class="text-orange-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-1 mb-4">{{ exec.role }}</p>
              <p class="text-gray-600 text-sm leading-relaxed font-medium italic">
                {{ exec.profile }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// You can import images here or use URLs
  const handsJoining = 'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769896360/IMG_9238_vxq385.jpg';
const chairImage = "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894247/Bola_Adesola_lr8vif.png";

const trustees = [
  { name: 'Richardson Ajayi', title: 'Trustee', image: 'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894246/Richardson_Ajayi_jg3lc3.jpg' },
  { name: 'Benson Ayodele-Cole', title: 'Trustee', image: 'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894247/Ayodele_Benson_na4t72.jpg' },
  { name: 'Grace Delano', title: 'Trustee', image: 'url_here' },
  { name: 'Ifeanyi Okoye', title: 'Trustee', image: 'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894246/Ifeanyi-Okoye-Head-shot_jlf9zt.jpg' },
  { name: 'Clare Omatseye', title: 'Trustee', image: 'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894246/Clare_Omatseye_xzvcbm.jpg' },
];

const executives = [
  {
    name: 'Njide Ndili',
    role: 'President',
    profile: 'Country Director, PharmAccess',
    image: 'url_here'
  },
  {
    name: 'Dr. Benson Ayodele-Cole',
    role: '1st Vice President',
    profile: 'CEO, Benson Coleman and Associates',
    image: 'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894247/Ayodele_Benson_na4t72.jpg'
  },
  {
    name: 'Jennifer Anyanti, FAPH',
    role: '2nd Vice President',
    profile: 'Deputy Managing Director, Society for Family Health',
    image: 'url_here'
  },
  {
    name: 'Olayode Babarinde',
    role: 'Financial Secretary',
    profile: 'Healthcare System Partner – Policy, Roche',
    image: 'url_here'
  },
  {
    name: 'Chinyere Okorocha',
    role: 'Public Relations Secretary',
    profile: 'Head of Sectors, Jackson, Etti & Edu',
    image: 'url_here'
  },
  {
    name: 'Mr. Reagan Rowland',
    role: 'Treasurer',
    profile: 'Founder/CEO, OneClick Med',
    image: 'url_here'
  }
];
</script>
