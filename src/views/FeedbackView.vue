<template>
<div class="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
  <div class="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
    <div class="space-y-8">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-[var(--t-grey)] mb-2">
        Bagaimana Perasaan Kamu Saat Ini?
        </h2>
        <p class="text-[var(--t-gray)]">
        Masukan Anda membantu kami mempersonalisasi perjalanan penyembuhan Anda dengan lebih baik. Luangkan waktu sejenak untuk merenungkan keadaan Anda saat ini
        </p>
      </div>
  <MoodSlider v-model="moodValue"/>
  <div class="space-y-2">
          <label class="font-normal text-[var(--t-gray)]">
            Deskripsi Tambahan (Opsional)
          </label>
          <textarea
            v-model="feedback"
            placeholder="Bagikan bagaimana perasaan Anda saat ini atau pikiran apa pun yang ingin Anda ungkapkan..."
            rows="4"
            maxlength="500"
            class="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none outline-none"
          ></textarea>
          <div class="text-right text-sm text-gray-500">
            {{ feedback.length }}/500 karakter
          </div>
        </div>
      <button
        @click="submitFeedback"
        class="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Mengirim...' : 'Kirim Feedback' }}
      </button>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import MoodSlider from "@/components/MoodSlider.vue";
import { playlistService } from "@/services/playlistService";

const router = useRouter();
const route = useRoute();

const moodValue = ref(5);
const feedback = ref("");
const isSubmitting = ref(false);
const playlistId = ref(null);

onMounted(() => {
  // Scroll to top when component is mounted
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  
  // Get playlistId from route query
  if (route.query.playlistId) {
    playlistId.value = route.query.playlistId;
  } else {
    console.error('No playlist ID provided');
    router.push({ name: 'dashboard' });
  }
});

const submitFeedback = async () => {
  if (!playlistId.value) {
    console.error('No playlist ID available');
    return;
  }
  
  try {
    isSubmitting.value = true;
    
    await playlistService.submitFeedback(
      playlistId.value,
      moodValue.value,
      feedback.value
    );
    
    // Navigate to dashboard after successful submission
    router.push({ name: 'dashboard' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    alert('Gagal mengirim feedback. Silakan coba lagi.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>