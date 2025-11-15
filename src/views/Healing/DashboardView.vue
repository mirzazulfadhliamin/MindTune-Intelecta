<template>
  <div class="min-h-screen bg-background">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Header -->
      <h1 class="text-4xl font-bold mb-8 text-primary">
        Dashboard
      </h1>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Total Sessions -->
        <div class="bg-background-white rounded-2xl border-2 border-gray-200 p-6 flex items-center justify-between">
          <div>
            <p class="text-sm text-text-gray mb-1">Total Sessions</p>
            <p class="text-4xl font-bold text-primary">
              18
            </p>
          </div>
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center bg-primary/10">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-primary"
                stroke="currentColor"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
        </div>

        <!-- Avg Mood Improvement -->
        <div class="bg-background-white rounded-2xl border-2 border-gray-200 p-6 flex items-center justify-between">
          <div>
            <p class="text-sm text-text-gray mb-1">Avg Mood Improvement</p>
            <p class="text-4xl font-bold text-primary">
              +2.9
            </p>
          </div>
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center bg-primary/10">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-primary"
                stroke="currentColor"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
          </div>
        </div>

        <!-- Most Frequent Genre -->
        <div class="bg-background-white rounded-2xl border-2 border-gray-200 p-6 flex items-center justify-between">
          <div>
            <p class="text-sm text-text-gray mb-1">Most Frequent Genre</p>
            <p class="text-4xl font-bold text-primary">
              Classical
            </p>
          </div>
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center bg-primary/10">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-primary"
                stroke="currentColor"
            >
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          </div>
        </div>
      </div>

      <!-- Session History -->
      <div class="bg-background-white rounded-2xl border-2 border-gray-200 p-8">
        <div class="flex items-center space-x-2 mb-6">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-primary"
              stroke="currentColor"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <h2 class="text-2xl font-bold text-primary">
            Session History
          </h2>
        </div>

        <!-- Session List -->
        <div class="space-y-4">
          <div
              v-for="session in sessions"
              :key="session.id"
              @click="goToDetail(session.id)"
              class="cursor-pointer flex items-center justify-between p-5 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
          >
            <div class="flex items-center space-x-4 flex-1">
              <!-- Session Number -->
              <div class="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg bg-primary/10 text-primary">
                #{{ session.id }}
              </div>

              <!-- Session Info -->
              <div class="flex-1">
                <h3 class="font-bold text-text-black mb-1">{{ session.title }}</h3>
                <div class="flex items-center space-x-4 text-sm text-text-gray">
                  <div class="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{{ session.time }}</span>
                  </div>
                  <span class="px-2 py-1 bg-gray-200 text-text-gray rounded text-xs">{{ session.level }}</span>
                  <div class="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 7.3v6"></path>
                      <circle cx="9.9" cy="15.2" r="2.3"></circle>
                      <path d="M12.6 7.3h3"></path>
                    </svg>
                    <span>{{ session.genre }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mood Change -->
            <div class="flex items-center space-x-6 mr-4">
              <div class="text-right">
                <p class="text-xs text-text-gray mb-1">Pre Mood</p>
                <p class="font-bold text-lg text-primary">
                  {{ session.preMood }}/10
                </p>
              </div>

              <!-- Arrow Up/Down -->
              <svg
                  v-if="session.moodChange > 0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-green-500"
                  stroke="currentColor"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-danger"
                  stroke="currentColor"
              >
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                <polyline points="17 18 23 18 23 12"></polyline>
              </svg>

              <div class="text-right">
                <p class="text-xs text-text-gray mb-1">Post Mood</p>
                <p
                    class="font-bold text-lg"
                    :class="session.moodChange > 0 ? 'text-green-600' : 'text-danger'"
                >
                  {{ session.postMood }}/10
                </p>
              </div>
            </div>

            <!-- Arrow Right -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-silver">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTheme } from "@/composables/useTheme"

export default {
  name: 'DashboardPage',
  setup() {
    const { mode } = useTheme()
    return { mode }
  },
  data() {
    return {
      sessions: [
        {
          id: 10,
          title: 'Deep Relaxation',
          time: '2 hours ago',
          level: 'Mild Depression',
          genre: 'Lo-fi Chill, Acoustic',
          preMood: 3,
          postMood: 7,
          moodChange: 4
        },
        {
          id: 9,
          title: 'Deep Relaxation',
          time: '2 hours ago',
          level: 'Mild Depression',
          genre: 'Lo-fi Chill, Acoustic',
          preMood: 8,
          postMood: 6,
          moodChange: -2
        },
        {
          id: 8,
          title: 'Deep Relaxation',
          time: '2 hours ago',
          level: 'Mild Depression',
          genre: 'Lo-fi Chill, Acoustic',
          preMood: 3,
          postMood: 7,
          moodChange: 4
        }
      ]
    }
  },
  methods: {
    goToDetail(id) {
      this.$router.push(`/playlist/${id}`)
    }
  }
}
</script>

<style scoped>
/* No additional styles needed */
</style>