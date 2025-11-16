<template>
  <div class="min-h-screen bg-background-white">
    <div class="px-4 py-8 mx-auto mt-16 max-w-7xl">
      <!-- Header -->
      <h1
          class="mb-8 text-4xl font-bold transition-colors duration-500 text-primary-health"
      >
        Dashboard
      </h1>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <!-- Total Sessions -->
        <div class="flex justify-between items-center p-6 bg-white rounded-2xl border-1 border-silver">
          <div>
            <p class="mb-1 text-sm text-gray">Total Sessions</p>
            <p v-if="isLoading" class="text-gray">Loading...</p>
            <p
                v-else
                class="text-3xl font-normal transition-colors duration-500 text-primary-health"
            >
              {{ stats.total_sessions }}
            </p>
          </div>
          <div
              class="flex justify-center items-center w-16 h-16 rounded-2xl transition-colors duration-500 bg-primary-health/25"
          >
            <img
                src="/src/assets/session.svg"
                alt="Session Icon"
                class="w-8 h-8 text-primary-health"
            />
          </div>
        </div>

        <!-- Avg Mood Improvement -->
        <div class="flex justify-between items-center p-6 bg-white rounded-2xl border-1 border-silver">
          <div>
            <p class="mb-1 text-sm text-gray">Avg Mood Improvement</p>
            <p v-if="isLoading" class="text-gray">Loading...</p>
            <p
                v-else
                class="text-3xl font-normal transition-colors duration-500 text-primary-health"
            >
              +{{ stats.avg_mood_improvement }}
            </p>
          </div>
          <div
              class="flex justify-center items-center w-16 h-16 rounded-2xl transition-colors duration-500 bg-primary-health/25"
          >
            <img
                src="/src/assets/chart-up-blue.svg"
                alt="Chart Up Icon"
                class="w-8 h-8 text-primary-health"
            />
          </div>
        </div>

        <!-- Most Frequent Genre -->
        <div class="flex justify-between items-center p-6 bg-white rounded-2xl border-1 border-silver">
          <div>
            <p class="mb-1 text-sm text-gray">Most Frequent Genre</p>
            <p v-if="isLoading" class="text-gray">Loading...</p>
            <p
                v-else
                class="text-3xl font-normal transition-colors duration-500 text-primary-health"
            >
              {{ stats.most_frequent_genre }}
            </p>
          </div>
          <div
              class="flex justify-center items-center w-16 h-16 rounded-2xl transition-colors duration-500 bg-primary-health/25"
          >
            <img
                src="/src/assets/music-note.svg"
                alt="Music Note Icon"
                class="w-8 h-8 text-primary-health"
            />
          </div>
        </div>
      </div>

      <!-- Session History -->
      <div class="p-8 bg-white rounded-2xl border-1 border-silver">
        <div class="flex items-center mb-6 space-x-2">
          <img
                src="/src/assets/session.svg"
                alt="Session Icon"
                class="w-6 h-6 text-primary-health"
          />
          <h2 class="text-xl font-medium text-primary-health">
            Session History
          </h2>
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
              @click="goToDetail(session.originalId)"
              class="flex justify-between items-center p-5 rounded-xl transition-colors cursor-pointer border-1 border-silver hover:border-gray"
          >
            <div class="flex flex-1 items-center space-x-4">
              <!-- Session Number -->
              <div
                  class="flex justify-center items-center w-12 h-12 text-lg font-normal rounded-full transition-colors duration-500 text-primary-health bg-primary-health/15"
              >
                #{{ session.sequence_number }}
              </div>

              <!-- Session Info -->
              <div class="flex-1">
                <h3 class="mb-3 text-lg font-normal text-gray">{{ session.title }}</h3>
                <div class="flex items-center space-x-4 text-sm text-gray">
                  <div class="flex items-center space-x-1">
                    <img
                        src="/src/assets/calendar.svg"
                        alt="Clock Icon"
                        class="w-4 h-4 text-gray"
                    />
                    <span>{{ session.time }}</span>
                  </div>
                  <span class="px-2 py-1 text-xs bg-gray-200 rounded text-gray">{{ session.level }}</span>
                  <div class="flex items-center space-x-1">
                    <img
                        src="/src/assets/genre.svg"
                        alt="Genre Icon"
                        class="w-4 h-4 text-gray"
                    />
                    <span>{{ session.genre }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mood Change -->
            <div class="flex items-center mr-4 space-x-6">
              <div class="text-right">
                <p class="mb-1 text-sm font-normal text-gray-600">Pre Mood</p>
                <p
                    class="text-lg font-medium transition-colors duration-500 text-primary-health"
                >
                  {{ session.preMood }}/10
                </p>
              </div>

              <span
                v-if="session.postMood === null"
                class="text-2xl select-none text-gray"
              >
                —
              </span>
              <img
                v-else-if="session.moodChange > 0"
                src="/src/assets/chart-up-green.svg"
                alt="Mood up icon"
                class="w-6 h-6"
              />
              <img
                v-else
                src="/src/assets/chart-down-red.svg"
                alt="Mood down icon"
                class="w-6 h-6"
              />

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
            <img
                src="/src/assets/arrow-right.svg"
                alt="Arrow Right Icon"
                class="w-6 h-6 text-text-silver"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { dashboardService } from '@/services/dashboardService'

const sessions = ref([])
const stats = ref({
  total_sessions: 0,
  avg_mood_improvement: 0,
  most_frequent_genre: ''
})
const isLoading = ref(true)

const router = useRouter()

const fetchDashboardData = async () => {
  isLoading.value = true
  try {
    const playlistsData = await dashboardService.getPlaylists()
    const mappedData = playlistsData.map((playlist) => {
      const genreString = playlist.genres.map((g) => g.name).join(', ')

      return {
        originalId: playlist.id,
        id: playlist.id,
        sequence_number: playlist.sequence_number,
        title: playlist.name,
        time: playlist.time_ago,
        level: playlist.depression_level,
        genre: genreString,
        preMood: parseInt(playlist.pre_mood),
        postMood: playlist.post_mood ? parseInt(playlist.post_mood) : null,
        moodChange: playlist.post_mood
          ? parseInt(playlist.post_mood) - parseInt(playlist.pre_mood)
          : null,
        link: playlist.link_playlist,
      }
    })

    sessions.value = mappedData
    stats.value = await dashboardService.getDashboardStats()
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  } finally {
    isLoading.value = false
  }
}

const goToDetail = (id) => {
  router.push(`/playlist-detail?id=${id}`)
}

onMounted(() => {
  fetchDashboardData()
})
</script>