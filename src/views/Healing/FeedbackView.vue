<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from 'vue-router'
import MoodSlider from "@/components/MoodSlider.vue";
import { playlistService } from '@/services/playlistService'

const moodValue = ref(5);
const description = ref("");
const router = useRouter()
const route = useRoute()
const isSubmitting = ref(false)

const handleSubmit = async () => {
  try {
    if (isSubmitting.value) return
    isSubmitting.value = true
    const playlistId = route.query.playlistId
    if (!playlistId) {
      console.error('playlistId tidak ditemukan di query URL')
      isSubmitting.value = false
      return
    }

    await playlistService.submitFeedback(
      playlistId,
      Number(moodValue.value),
      description.value || ''
    )

    router.push({ name: 'dashboard' })
  } catch (error) {
    console.error('Gagal submit feedback:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="px-4 pt-24 pb-12 min-h-screen sm:px-6 lg:px-8 bg-background-white">
    <div class="p-8 mx-auto max-w-3xl rounded-2xl bg-background-white shadow-full-blur">
      <div class="space-y-8">
        <div class="text-center">
          <h2 class="mb-2 text-2xl font-bold text-black">
            Bagaimana Perasaan Kamu Saat Ini?
          </h2>
          <p class="text-text-gray">
            Masukan Anda membantu kami mempersonalisasi perjalanan penyembuhan Anda dengan lebih baik. Luangkan waktu sejenak untuk merenungkan keadaan Anda saat ini
          </p>
        </div>
        
        <MoodSlider v-model="moodValue"/>
        
        <div class="space-y-1">
          <label class="font-normal text-gray">
            Deskripsi Tambahan (Opsional)
          </label>
          <textarea
            v-model="description"
            placeholder="Bagikan bagaimana perasaan Anda saat ini atau pikiran apa pun yang ingin Anda ungkapkan..."
            rows="4"
            maxlength="500"
            :disabled="isSubmitting"
            class="p-4 mt-2 w-full rounded-xl border border-gray-300 transition-colors outline-none resize-none focus:ring-2 focus:ring-silver focus:border-silver disabled:bg-background-soft disabled:text-text-silver disabled:cursor-not-allowed"
          ></textarea>
          <div class="text-sm text-right text-text-silver">
            {{ description.length }}/500 karakter
          </div>
        </div>
        
        <button
          @click="handleSubmit"
          :disabled="isSubmitting"
          class="py-3 w-full text-base font-medium text-white bg-gradient-to-r rounded-lg transition-all cursor-pointer bg-primary-health hover:bg-primary-health-hover disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span v-if="!isSubmitting">Submit Masukan</span>
          <span v-else class="inline-flex items-center gap-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Mengirim...
          </span>
        </button>
      </div>
    </div>
  </div>
</template>