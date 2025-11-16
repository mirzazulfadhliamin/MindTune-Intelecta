<template>
  <div class="min-h-screen bg-gray-50">
    <div class="px-4 py-8 mx-auto mt-16 max-w-7xl">
      <!-- Header -->
      <h1
          class="mb-8 text-4xl font-bold transition-colors duration-500"
          :class="mode === 'healing' ? 'text-blue-600' : 'text-orange-600'"
      >
        Dashboard
      </h1>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <!-- Total Sessions -->
        <div class="flex justify-between items-center p-6 bg-white rounded-2xl border-2 border-gray-200">
          <div>
            <p class="mb-1 text-sm text-gray-600">Total Sessions</p>
            <p v-if="isLoading" class="text-gray-500">Loading...</p>
            <p
                v-else
                class="text-3xl font-bold transition-colors duration-500"
                :class="mode === 'healing' ? 'text-blue-600' : 'text-orange-600'"
            >
              {{ stats.total_sessions }}
            </p>
          </div>
          <div
              class="flex justify-center items-center w-16 h-16 rounded-2xl transition-colors duration-500"
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
        <div class="flex justify-between items-center p-6 bg-white rounded-2xl border-2 border-gray-200">
          <div>
            <p class="mb-1 text-sm text-gray-600">Avg Mood Improvement</p>
            <p v-if="isLoading" class="text-gray-500">Loading...</p>
            <p
                v-else
                class="text-3xl font-bold transition-colors duration-500"
                :class="mode === 'healing' ? 'text-blue-600' : 'text-orange-600'"
            >
              +{{ stats.avg_mood_improvement }}
            </p>
          </div>
          <div
              class="flex justify-center items-center w-16 h-16 rounded-2xl transition-colors duration-500"
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
                class="text-primary"
                stroke="currentColor"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
          </div>
        </div>

        <!-- Most Frequent Genre -->
        <div class="flex justify-between items-center p-6 bg-white rounded-2xl border-2 border-gray-200">
          <div>
            <p class="mb-1 text-sm text-gray-600">Most Frequent Genre</p>
            <p v-if="isLoading" class="text-gray-500">Loading...</p>
            <p
                v-else
                class="text-3xl font-bold transition-colors duration-500"
                :class="mode === 'healing' ? 'text-blue-600' : 'text-orange-600'"
            >
              {{ stats.most_frequent_genre }}
            </p>
          </div>
          <div
              class="flex justify-center items-center w-16 h-16 rounded-2xl transition-colors duration-500"
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
      <div class="p-8 bg-white rounded-2xl border-2 border-gray-200">
        <div class="flex items-center mb-6 space-x-2">
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
        <div v-if="isLoading" class="p-8 text-center text-gray-500">
          <p>Loading session history...</p>
        </div>
        <div v-else-if="sessions.length === 0" class="p-8 text-center text-gray-500">
          <p>No session history available</p>
        </div>
        <div v-else class="space-y-4">
          <div
              v-for="session in sessions"
              :key="session.id"
              @click="goToDetail(session.originalId)"
              class="flex justify-between items-center p-5 rounded-xl border-2 border-gray-200 transition-colors cursor-pointer hover:border-gray-300"
          >
            <div class="flex flex-1 items-center space-x-4">
              <!-- Session Number -->
              <div
                  class="flex justify-center items-center w-12 h-12 text-lg font-bold rounded-xl transition-colors duration-500"
                  :class="mode === 'healing' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'"
              >
                {{ session.displayId }}
              </div>

              <!-- Session Info -->
              <div class="flex-1">
                <h3 class="mb-1 font-bold text-gray-900">{{ session.title }}</h3>
                <div class="flex items-center space-x-4 text-sm text-gray-600">
                  <div class="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{{ session.time }}</span>
                  </div>
                  <span class="px-2 py-1 text-xs text-gray-700 bg-gray-200 rounded">{{ session.level }}</span>
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
            <div class="flex items-center mr-4 space-x-6">
              <div class="text-right">
                <p class="mb-1 text-xs text-gray-600">Pre Mood</p>
                <p
                    class="text-lg font-bold transition-colors duration-500"
                    :class="mode === 'healing' ? 'text-blue-600' : 'text-orange-600'"
                >
                  {{ session.preMood }}/10
                </p>
              </div>

              <!-- Arrow Up/Down/Dash -->
              <svg
                  v-if="session.postMood === null"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-gray-400"
                  stroke="currentColor"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <svg
                  v-else-if="session.moodChange > 0"
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
                <p class="mb-1 text-xs text-gray-600">Post Mood</p>
                <p
                    class="text-lg font-bold"
                    :class="session.postMood !== null ? (session.moodChange > 0 ? 'text-green-600' : 'text-red-600') : 'text-gray-600'"
                >
                  {{ session.postMood !== null ? `${session.postMood}/10` : 'Belum disubmit' }}
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
import { dashboardService } from "@/services/dashboardService"

export default {
  name: 'DashboardPage',
  setup() {
    const { mode } = useTheme()
    return { mode }
  },
  data() {
    return {
      sessions: [],
      stats: {
        total_sessions: 0,
        avg_mood_improvement: 0,
        most_frequent_genre: ''
      },
      isLoading: true
    }
  },
  mounted() {
    this.fetchDashboardData()
  },
  methods: {
    async fetchDashboardData() {
      this.isLoading = true
      try {
        // Fetch playlists data
        const playlistsData = await dashboardService.getPlaylists()
        
        // Map data dan urutkan berdasarkan ID secara menurun (descending)
        const mappedData = playlistsData.map(playlist => {
          // Format genres as comma-separated string
          const genreString = playlist.genres.map(g => g.name).join(', ')
          
          return {
            originalId: playlist.id, // Simpan ID asli untuk keperluan navigasi
            id: playlist.id, // Tetap simpan ID asli untuk pengurutan
            title: playlist.name,
            time: playlist.time_ago,
            level: playlist.depression_level,
            genre: genreString,
            preMood: parseInt(playlist.pre_mood),
            postMood: playlist.post_mood ? parseInt(playlist.post_mood) : null,
            moodChange: playlist.post_mood ? parseInt(playlist.post_mood) - parseInt(playlist.pre_mood) : null,
            link: playlist.link_playlist
          }
        }).sort((a, b) => b.id - a.id) // Urutkan secara descending berdasarkan ID
        
        // Ambil maksimal 10 data dan tambahkan displayId
        const slicedData = mappedData.slice(0, 10)
        
        // Tambahkan displayId berformat #1, #2, #3, dst.
        this.sessions = slicedData.map((session, index) => {
          // Hitung displayId berdasarkan jumlah total data
          const displayId = `#${slicedData.length - index}`
          return { ...session, displayId }
        })
        
        // Fetch dashboard stats
        this.stats = await dashboardService.getDashboardStats()
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        this.isLoading = false
      }
    },
    
    goToDetail(id) {
      this.$router.push(`/playlist-detail?id=${id}`)
    }
  }
}
</script>

<style scoped>
/* No additional styles needed */
</style>