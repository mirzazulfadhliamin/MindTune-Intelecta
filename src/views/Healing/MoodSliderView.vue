<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import MoodSlider from "@/components/MoodSlider.vue";

const router = useRouter();
const moodValue = ref(5);

const goToQuestionnaire = () => {
  router.push({
    name: "questionnaire",
  });
};
</script>

<template>
  <div class="px-4 pt-24 pb-12 sm:px-6 lg:px-8">
    <div
        class="p-8 mx-auto max-w-3xl rounded-2xl bg-background-white shadow-full-blur font-poppins"
    >
      <div class="space-y-8">
        <div class="text-center">
          <h2 class="mb-2 text-2xl font-bold text-gray">
            Bagaimana Perasaan Anda Hari ini?
          </h2>
          <p class="text-muted">
            Geser slider untuk mengekspresikan suasana hati anda saat ini.
          </p>
        </div>

        <MoodSlider />

        <button
            @click="goToQuestionnaire"
            class="py-4 w-full text-lg font-medium text-white bg-gradient-to-r rounded-lg transition-all cursor-pointer bg-primary-health hover:bg-primary-health-hover"
        >
          Continue to Assessment
        </button>
      </div>
    </div>
  </div>
</template>
