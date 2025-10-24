<template>
<div class="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
  <div class="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
    <div class="space-y-8">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-[var(--t-gray)] mb-2">
        Bagaimana Perasaan Anda Hari ini?
        </h2>
        <p class="text-[var(--t-gray)]">
         Geser slider untuk mengekspresikan suasana hati anda saat ini.
        </p>
      </div>
  <MoodSlider/>
      <button
        class="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
      >
        Continue to Assessment
      </button>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import MoodSlider from "@/components/MoodSlider.vue";

const moodValue = ref(5)
</script>