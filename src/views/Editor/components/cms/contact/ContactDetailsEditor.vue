<script setup>
import { ref, watch } from "vue";

const getDefaultSectionData = () => ({
  address: {
    text: "",
    googleMapsUrl:
      "",
  },

  phone: "",

  emails: [
    {
      label: "",
      address: "",
    },
  ],

  socialMedia: [
    {
      platform: "",
      url: "",
      icon: "",
    },
    {
      platform: "",
      url: "",
      icon: "",
    },
    {
      platform: "",
      url: "",
      icon: "",
    },
    {
      platform: "",
      url: "",
      icon: "",
    },
  ],
});

const currentSectionData = ref(getDefaultSectionData());

const addEmail = () => {
  currentSectionData.value.emails.push({
    label: "",
    address: "",
  });
};

const deleteEmail = (index) => {
  currentSectionData.value.emails.splice(index, 1);
};

const emit = defineEmits(["update:modelValue"]);

watch(
  currentSectionData,
  (val) => {
    emit("update:modelValue", val);
  },
  { deep: true }
);
</script>

<template>

            <div class="space-y-6">
              <!-- Address -->
              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Address
                </label>
                <textarea
                  v-model="currentSectionData.address.text"
                  rows="2"
                  class="w-full text-sm border-none focus:ring-0 p-0 m-0 resize-none"
                />
              </div>

              <!-- Phone -->
              <div class="border border-gray-300 rounded-lg p-3 space-y-2">
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Phone Number
                </label>
                <input
                  v-model="currentSectionData.phone"
                  type="text"
                  class="w-full text-sm border-none focus:ring-0 p-0 m-0"
                />
              </div>

              <!-- Email -->
              <div
                v-for="(email, index) in currentSectionData.emails"
                :key="index"
                class="border border-gray-300 rounded-lg p-3 space-y-2"
              >
                <label
                  class="block text-xs font-semibold uppercase text-gray-500"
                >
                  Email {{ index + 1 }}
                </label>
                <input
                  v-model="email.address"
                  type="text"
                  class="w-full text-sm border-none focus:ring-0 p-0 m-0"
                />
              </div>
            </div>

</template>  
