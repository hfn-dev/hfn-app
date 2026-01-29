<template>
<div class="max-w-lg mx-auto bg-white p-8 rounded-xl shadow">
  <h2 class="text-2xl font-bold mb-4">Complete Registration</h2>

  <div class="flex justify-between mb-6">
    <span>Registration Fee</span>
    <span class="font-semibold">₦10,000</span>
  </div>

  <button
    @click="payNow"
    class="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
  >
    Pay & Complete Registration
  </button>
</div>
</template>  

<script>

const joinNow = async () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;

  try {
    const payload = {
      payment_type: "subscription",
      subscription_id: 0,
      course_id: 0,
      payment_method: "cash",
    };

    const response = await paymentApi.memberPayment(payload);

    console.log("Payment intent created:", response);
  } catch (error) {
    console.error("Failed to initiate membership payment", error);
  } finally {
    isSubmitting.value = false;
  }
};

  
  
</script>  
