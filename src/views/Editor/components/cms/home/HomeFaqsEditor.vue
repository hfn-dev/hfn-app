<script>
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
