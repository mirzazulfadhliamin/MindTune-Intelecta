<template>
  <div class="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-background min-h-screen">
    <div class="bg-background-white rounded-2xl shadow-full-blur p-8 max-w-3xl mx-auto">
      <div class="space-y-8">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-text-black mb-2">
            Bagaimana Perasaan Kamu Saat Ini?
          </h2>
          <p class="text-text-gray">
            Masukan Anda membantu kami mempersonalisasi perjalanan penyembuhan Anda dengan lebih baik. Luangkan waktu sejenak untuk merenungkan keadaan Anda saat ini
          </p>
        </div>
        
        <MoodSlider/>
        
        <div class="space-y-2">
          <label class="font-normal text-text-gray">
            Deskripsi Tambahan (Opsional)
          </label>
          <textarea
            v-model="description"
            placeholder="Bagikan bagaimana perasaan Anda saat ini atau pikiran apa pun yang ingin Anda ungkapkan..."
            rows="4"
            maxlength="500"
            class="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-primary focus:border-transparent resize-none outline-none transition-colors"
          ></textarea>
          <div class="text-right text-sm text-text-silver">
            {{ description.length }}/500 karakter
          </div>
        </div>
        
        <button
          class="w-full py-4 bg-primary text-text-white rounded-lg font-medium hover:shadow-lg transition-all hover:bg-primary-dark"
        >
          Continue to Assessment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MoodSlider from "@/components/MoodSlider.vue";

const moodValue = ref(5);
const description = ref("");

const submitMood = () => {
  console.log("Nilai mood:", moodValue.value);
  console.log("Deskripsi:", description.value);

};
</script>