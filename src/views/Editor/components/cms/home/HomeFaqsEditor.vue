<script>
const addFaq = () => {
  currentSectionData.value.push({
    question: "",
    answer: "",
  });
};

const removeFaq = (index) => {
  currentSectionData.value.splice(index, 1);
};

  
const addNewFaq = () => {
  const section = activePage.value.sections["section5"];
  if (section && section.faqs) {
    const newId = Math.max(...section.faqs.map((f) => f.id), 0) + 1;
    section.faqs.push({
      id: newId,
      question: `Question ${newId}: New FAQ Question here...`,
      response: "New answer text here...",
    });
  }
  console.log("Added new FAQ item.");
};

const deleteFaq = (faqId) => {
  const section = activePage.value.sections["section5"];
  if (section && section.faqs) {
    section.faqs = section.faqs.filter((faq) => faq.id !== faqId);
    console.log(`Deleted FAQ with ID: ${faqId}`);
  }
};

</script>  
<template>

            <div class="space-y-6">
              <button
                class="bg-black text-white px-3 py-2 rounded"
                @click="addFaq"
              >
                + Add FAQ
              </button>

              <div
                v-for="(faq, index) in currentSectionData"
                :key="index"
                class="border rounded p-4 space-y-3"
              >
                <input
                  v-model="faq.question"
                  placeholder="Question"
                  class="w-full border-none focus:ring-0"
                />

                <textarea
                  v-model="faq.answer"
                  rows="3"
                  placeholder="Answer"
                  class="w-full border-none focus:ring-0 resize-none"
                />

                <button class="text-red-500 text-sm" @click="removeFaq(index)">
                  Remove
                </button>
              </div>
            </div>
          
 </template> 
