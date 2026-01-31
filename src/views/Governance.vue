<template>
  <div class="bg-[#f8fdf9] min-h-screen">
    <section class="py-20 bg-[#004d33] text-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 class="text-4xl md:text-6xl font-black mb-6">Governance & Leadership</h1>
        <p class="max-w-3xl mx-auto text-lg md:text-xl text-green-100/80 leading-relaxed font-medium">
          HFN is guided by a Board of Trustees and an Executive Committee that provide
          strategic direction, oversight, and leadership for the Federation’s policy, advocacy and
          stakeholder engagement work.
        </p>
      </div>
      <div class="absolute -bottom-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
    </section>

    <section class="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-4 mb-16">
        <h2 class="text-3xl font-black text-gray-900 uppercase tracking-tight">Board of Trustees</h2>
        <div class="h-[2px] flex-grow bg-gray-200"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div class="lg:col-span-3 flex justify-center mb-10">
          <div class="group relative w-full max-w-md bg-white p-8 rounded-[3rem] shadow-2xl border-2 border-orange-400/30 transform hover:-translate-y-2 transition-all duration-500">
             <div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-orange-400 text-white px-6 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                Chair
             </div>
             <div class="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-6">
                <div class="w-full h-full flex items-center justify-center text-gray-300">
                  <svg class="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
             </div>
             <div class="text-center">
               <h3 class="text-2xl font-black text-[#004d33]">Bola Adesola</h3>
               <p class="text-orange-600 font-bold text-sm uppercase tracking-widest mt-1">Chair, Board of Trustees</p>
             </div>
          </div>
        </div>

        <div v-for="trustee in trustees" :key="trustee.name" 
             class="bg-white p-6 rounded-[2.5rem] shadow-lg border border-gray-100 hover:shadow-xl transition-all group">
          <div class="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 mb-6">
             <div class="w-full h-full flex items-center justify-center text-gray-200 group-hover:scale-110 transition-transform duration-700">
                <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
             </div>
          </div>
          <div class="text-center">
            <h4 class="text-xl font-bold text-gray-900">{{ trustee.name }}</h4>
            <p class="text-gray-500 font-medium text-sm">{{ trustee.title }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-4 mb-16 justify-end text-right">
          <div class="h-[2px] flex-grow bg-gray-100"></div>
          <h2 class="text-3xl font-black text-[#004d33] uppercase tracking-tight">Executive Committee</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="exec in executives" :key="exec.name" 
               class="flex flex-col sm:flex-row gap-6 p-6 rounded-[2rem] bg-[#f8fdf9] border border-gray-100 hover:bg-[#f2f9f3] transition-colors group">
            
            <div class="w-full sm:w-40 h-48 rounded-2xl overflow-hidden bg-gray-200 shrink-0">
               <div class="w-full h-full flex items-center justify-center text-white/50 bg-[#004d33]/10 group-hover:bg-[#004d33]/20 transition-colors">
                  <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
               </div>
            </div>

            <div class="flex flex-col justify-center">
              <h4 class="text-xl font-black text-gray-900">{{ exec.name }}</h4>
              <p class="text-[#004d33] font-bold text-sm uppercase tracking-tighter mb-3">{{ exec.role }}</p>
              <div class="h-[1px] w-12 bg-orange-400 mb-3"></div>
              <p class="text-gray-600 text-sm leading-relaxed font-medium">
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
const trustees = [
  { name: 'Richardson Ajayi', title: 'Trustee' },
  { name: 'Benson Ayodele-Cole', title: 'Trustee' },
  { name: 'Grace Delano', title: 'Trustee' },
  { name: 'Ifeanyi Okoye', title: 'Trustee' },
  { name: 'Clare Omatseye', title: 'Trustee' },
];

const executives = [
  {
    name: 'Njide Ndili',
    role: 'President',
    profile: 'Country Director, PharmAccess'
  },
  {
    name: 'Dr. Ayodele Benson Cole',
    role: '1st Vice President',
    profile: 'CEO, Benson Coleman and Associates'
  },
  {
    name: 'Jennifer Anyanti, FAPH',
    role: '2nd Vice President',
    profile: 'Deputy Managing Director, Society for Family Health'
  },
  {
    name: 'Olayode Babarinde',
    role: 'Financial Secretary',
    profile: 'Healthcare System Partner – Policy, Roche'
  },
  {
    name: 'Chinyere Okorocha',
    role: 'Public Relations Secretary',
    profile: 'Head of Sectors, Jackson, Etti & Edu'
  },
  {
    name: 'Mr. Reagan Rowland',
    role: 'Treasurer',
    profile: 'Founder/CEO, OneClick Med'
  }
];
</script>
