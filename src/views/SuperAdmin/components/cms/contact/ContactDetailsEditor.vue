<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue"]);

const getDefaultSectionData = () => ({
  address: { text: "", googleMapsUrl: "" },
  phone: "",
  emails: [{ label: "", address: "" }],
  socialMedia: [],
});


const mergeData = (incoming = {}) => {
  const defaults = getDefaultSectionData();
  const data = incoming || {};
  
  return {
    address: {
      text: data?.address?.text || "",
      googleMapsUrl: data?.address?.googleMapsUrl || "",
    },
    phone: data?.phone || "",
    emails: Array.isArray(data?.emails) && data.emails.length ? [...data.emails] : [...defaults.emails],
    socialMedia: Array.isArray(data?.socialMedia) ? [...data.socialMedia] : [],
  };
};
const currentSectionData = ref(mergeData(props.modelValue));

watch(
  () => props.modelValue,
  (newVal) => {
    const merged = mergeData(newVal);
    if (JSON.stringify(merged) !== JSON.stringify(currentSectionData.value)) {
      currentSectionData.value = merged;
    }
  },
  { deep: true, immediate: true }
);

watch(
  currentSectionData,
  (newVal) => {
    emit("update:modelValue", JSON.parse(JSON.stringify(newVal)));
  },
  { deep: true }
);
</script>

<template>
  <div class="space-y-6 bg-white p-4">
    <pre class="text-[10px] bg-gray-100 p-2 overflow-auto max-h-32">
      DEBUG: {{ currentSectionData }}
    </pre>

    <div class="border border-gray-300 rounded-lg p-3">
      <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Address</label>
      <textarea
        v-model="currentSectionData.address.text"
        rows="3"
        class="w-full text-sm border-none focus:ring-0 p-0 m-0 bg-transparent text-black"
        placeholder="Enter address..."
      />
    </div>

    <div class="border border-gray-300 rounded-lg p-3">
      <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Phone</label>
      <input
        v-model="currentSectionData.phone"
        type="text"
        class="w-full text-sm border-none focus:ring-0 p-0 m-0 bg-transparent text-black"
      />
    </div>

    <div v-for="(email, index) in currentSectionData.emails" :key="index" class="border border-gray-300 rounded-lg p-3 space-y-1">
      <input 
        v-model="email.label" 
        class="text-[10px] uppercase font-bold text-gray-400 w-full border-none p-0 focus:ring-0" 
        placeholder="Label"
      />
      <input
        v-model="email.address"
        class="w-full text-sm border-none focus:ring-0 p-0 text-black"
        placeholder="Email address"
      />
    </div>
  </div>
</template>