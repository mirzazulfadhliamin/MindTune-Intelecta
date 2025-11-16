<template>
  <div class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
    <!-- Total Sessions -->
    <div class="flex justify-between items-center p-6 bg-white rounded-2xl border-1 border-silver">
      <div>
        <p class="mb-1 text-sm text-gray">Total Sessions</p>
        <p v-if="isLoading" class="text-gray">Loading...</p>
        <p v-else class="text-3xl font-normal transition-colors duration-500 text-primary-health">
          {{ stats.total_sessions }}
        </p>
      </div>
      <div class="flex justify-center items-center w-16 h-16 rounded-2xl transition-colors duration-500 bg-primary-health/25">
        <img src="/src/assets/session.svg" alt="Session Icon" class="w-8 h-8 text-primary-health" />
      </div>
    </div>

    <!-- Avg Mood Improvement -->
    <div class="flex justify-between items-center p-6 bg-white rounded-2xl border-1 border-silver">
      <div>
        <p class="mb-1 text-sm text-gray">Avg Mood Improvement</p>
        <p v-if="isLoading" class="text-gray">Loading...</p>
        <p v-else class="text-3xl font-normal transition-colors duration-500 text-primary-health">
          +{{ stats.avg_mood_improvement }}
        </p>
      </div>
      <div class="flex justify-center items-center w-16 h-16 rounded-2xl transition-colors duration-500 bg-primary-health/25">
        <img src="/src/assets/chart-up-blue.svg" alt="Chart Up Icon" class="w-8 h-8 text-primary-health" />
      </div>
    </div>

    <!-- Most Frequent Genre -->
    <div class="flex justify-between items-center p-6 bg-white rounded-2xl border-1 border-silver">
      <div>
        <p class="mb-1 text-sm text-gray">Most Frequent Genre</p>
        <p v-if="isLoading" class="text-gray">Loading...</p>
        <p v-else class="text-3xl font-normal transition-colors duration-500 text-primary-health">
          {{ stats.most_frequent_genre }}
        </p>
      </div>
      <div class="flex justify-center items-center w-16 h-16 rounded-2xl transition-colors duration-500 bg-primary-health/25">
        <img src="/src/assets/music-note.svg" alt="Music Note Icon" class="w-8 h-8 text-primary-health" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isLoading: { type: Boolean, default: false },
  stats: {
    type: Object,
    required: true,
  },
})
</script>