<template>
  <div class="p-8 bg-white rounded-2xl border-1 border-silver">
    <div class="flex items-center mb-6 space-x-2">
      <img src="/src/assets/session.svg" alt="Session Icon" class="w-6 h-6 text-primary-health" />
      <h2 class="text-xl md:text-2xl font-medium text-primary-health">Session History</h2>
    </div>

    <!-- Session List -->
    <div v-if="isLoading" class="p-8 text-center text-gray">
      <p>Loading session history...</p>
    </div>
    <div v-else-if="sessions.length === 0" class="p-8 text-center text-gray">
      <p>No session history available</p>
    </div>
    <div v-else class="space-y-4">
      <div
        v-for="session in sessions"
        :key="session.id"
        @click="$emit('select', session.originalId)"
        class="p-5 rounded-xl transition-colors cursor-pointer border-1 border-silver hover:border-gray flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <!-- Left: badge + info -->
        <div class="flex items-start gap-4 md:flex-1">
          <!-- Session Number -->
          <div class="flex justify-center items-center w-12 h-12 text-base md:text-lg font-normal rounded-full transition-colors duration-500 text-primary-health bg-primary-health/15 shrink-0">
            #{{ session.sequence_number }}
          </div>

          <!-- Session Info -->
          <div class="flex-1">
            <h3 class="mb-2 md:mb-3 text-base md:text-lg font-normal text-gray">{{ session.title }}</h3>
            <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray">
              <div class="flex items-center space-x-1">
                <img src="/src/assets/calendar.svg" alt="Clock Icon" class="w-4 h-4 text-gray" />
                <span>{{ session.time }}</span>
              </div>
              <span class="px-2 py-1 text-xs bg-gray-200 rounded text-gray">{{ session.level }}</span>
              <div class="flex items-center space-x-1">
                <img src="/src/assets/genre.svg" alt="Genre Icon" class="w-4 h-4 text-gray" />
                <span class="break-words">{{ session.genre }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: mood change + arrow -->
        <div class="flex items-center gap-4 md:gap-6 md:mr-4">
          <div class="text-right">
            <p class="mb-1 text-xs md:text-sm font-normal text-gray-600">Pre Mood</p>
            <p class="text-base md:text-lg font-medium transition-colors duration-500 text-primary-health">
              {{ session.preMood }}/10
            </p>
          </div>

          <span v-if="session.postMood === null" class="text-xl md:text-2xl select-none text-gray">—</span>
          <img v-else-if="session.moodChange > 0" src="/src/assets/chart-up-green.svg" alt="Mood up icon" class="w-5 h-5 md:w-6 md:h-6" />
          <img v-else src="/src/assets/chart-down-red.svg" alt="Mood down icon" class="w-5 h-5 md:w-6 md:h-6" />

          <div class="text-right">
            <p class="mb-1 text-xs text-gray-600">Post Mood</p>
            <p
              class="text-base md:text-lg font-bold"
              :class="session.postMood !== null ? (session.moodChange > 0 ? 'text-green-600' : 'text-red-600') : 'text-gray-600'"
            >
              {{ session.postMood !== null ? `${session.postMood}/10` : 'Belum disubmit' }}
            </p>
          </div>

          <!-- Arrow Right (hide on small screens) -->
          <img src="/src/assets/arrow-right.svg" alt="Arrow Right Icon" class="w-5 h-5 md:w-6 md:h-6 text-text-silver hidden md:block" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isLoading: { type: Boolean, default: false },
  sessions: { type: Array, default: () => [] },
})

defineEmits(['select'])
</script>