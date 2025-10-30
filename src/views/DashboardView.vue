<template>
    <div class="max-w-7xl mx-auto px-4 py-8">
      <h1
          class="text-4xl font-bold mb-8 transition-colors duration-500"
          :class="mode === 'healing' ? 'text-blue-600' : 'text-orange-600'"
      >
        Dashboard
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Total Sessions</p>
            <p
                class="text-4xl font-bold transition-colors duration-500"
                :class="mode === 'healing' ? 'text-blue-600' : 'text-orange-600'"
            >
              18
            </p>
          </div>
          <div
              class="w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-500"
              :class="mode === 'healing' ? 'bg-blue-100' : 'bg-orange-100'"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                :class="mode === 'healing' ? 'text-blue-600' : 'text-orange-600'"
                class="transition-colors duration-500"
                stroke="currentColor"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Avg Mood Improvement</p>
            <p
                class="text-4xl font-bold transition-colors duration-500"
                :class="mode === 'healing' ? 'text-blue-600' : 'text-orange-600'"
            >
              +2.9
            </p>
          </div>
          <div
              class="w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-500"
              :class="mode === 'healing' ? 'bg-blue-100' : 'bg-orange-100'"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                :class="mode === 'healing' ? 'text-blue-600' : 'text-orange-600'"
                class="transition-colors duration-500"
                stroke="currentColor"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Most Frequent Genre</p>
            <p
                class="text-4xl font-bold transition-colors duration-500"
                :class="mode === 'healing' ? 'text-blue-600' : 'text-orange-600'"
            >
              Classical
            </p>
          </div>
          <div
              class="w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-500"
              :class="mode === 'healing' ? 'bg-blue-100' : 'bg-orange-100'"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                :class="mode === 'healing' ? 'text-blue-600' : 'text-orange-600'"
                class="transition-colors duration-500"
                stroke="currentColor"
            >
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-md p-8">
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
              :class="mode === 'healing' ? 'text-blue-600' : 'text-orange-600'"
              class="transition-colors duration-500"
              stroke="currentColor"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <h2
              class="text-2xl font-bold transition-colors duration-500"
              :class="mode === 'healing' ? 'text-blue-600' : 'text-orange-600'"
          >
            Session History
          </h2>
        </div>

        <div class="space-y-4">
          <div
              v-for="session in sessions"
              :key="session.id"
              @click="goToDetail(session.id)"
              class="cursor-pointer flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center space-x-4 flex-1">
              <div
                  class="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-colors duration-500"
                  :class="mode === 'healing' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'"
              >
                #{{ session.id }}
              </div>

              <div class="flex-1">
                <h3 class="font-bold text-gray-900 mb-1">{{ session.title }}</h3>
                <div class="flex items-center space-x-4 text-sm text-gray-600">
                  <div class="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{{ session.time }}</span>
                  </div>
                  <span class="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">{{ session.level }}</span>
                  <div class="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                    <span>{{ session.genre }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center space-x-6 mr-4">
              <div class="text-right">
                <p class="text-xs text-gray-600 mb-1">Pre Mood</p>
                <p
                    class="font-bold text-lg transition-colors duration-500"
                    :class="mode === 'healing' ? 'text-blue-600' : 'text-orange-600'"
                >
                  {{ session.preMood }}/10
                </p>
              </div>

              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  :class="session.moodChange > 0 ? 'text-green-500' : 'text-red-500'"
                  stroke="currentColor"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline :points="session.moodChange > 0 ? '12 5 19 12 12 19' : '12 19 5 12 12 5'"></polyline>
              </svg>

              <div class="text-right">
                <p class="text-xs text-gray-600 mb-1">Post Mood</p>
                <p
                    class="font-bold text-lg"
                    :class="session.moodChange > 0 ? 'text-green-600' : 'text-red-600'"
                >
                  {{ session.postMood }}/10
                </p>
              </div>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
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