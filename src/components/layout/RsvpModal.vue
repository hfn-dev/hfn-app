<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl p-6 w-full max-w-md">
      <h3 class="text-xl font-bold mb-4">
        RSVP for {{ event.title }}
      </h3>

      <form @submit.prevent="submitRsvp" class="space-y-4">
        <input
          v-model="form.name"
          type="text"
          placeholder="Full name"
          required
          class="w-full p-3 border rounded-lg"
        />

        <input
          v-model="form.email"
          type="email"
          placeholder="Email address"
          required
          class="w-full p-3 border rounded-lg"
        />

        <input
          v-model="form.phone"
          type="text"
          placeholder="Phone number (optional)"
          class="w-full p-3 border rounded-lg"
        />

        <input
          v-model="form.organization"
          type="text"
          placeholder="Organization (optional)"
          class="w-full p-3 border rounded-lg"
        />

        <div class="flex justify-end gap-3 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            :disabled="loading"
            class="px-5 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:opacity-50"
          >
            {{ loading ? 'Submitting...' : 'Confirm RSVP' }}
          </button>
        </div>
      </form>

      <p v-if="success" class="text-green-600 text-sm mt-4">
        RSVP successful!.
      </p>
    </div>
  </div>
</template>
