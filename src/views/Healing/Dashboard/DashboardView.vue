<template>
  <div class="min-h-screen bg-background-white">
    <div class="px-4 py-8 mx-auto mt-16 max-w-7xl">
      <!-- Header -->
      <h1 class="mb-8 text-4xl font-bold transition-colors duration-500 text-primary-health">
        Dashboard
      </h1>

      <!-- Stats Cards -->
      <StatsCards :is-loading="isLoading" :stats="stats" />

      <!-- Session History -->
      <SessionHistory :is-loading="isLoading" :sessions="sessions" @select="goToDetail" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { dashboardService } from '@/services/dashboardService'
import StatsCards from '@/views/Healing/dashboard/dashboard-component/StatsCards.vue'
import SessionHistory from '@/views/Healing/dashboard/dashboard-component/SessionHistory.vue'

onMounted(() => {
  fetchDashboardData()
  getChartMood()
})

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

const getChartMood = async () => {
  try {
    const chartData = await dashboardService.getChartMood()
    console.log('Chart Mood Data:', chartData)
  } catch (error) {
    console.error('Error fetching chart mood:', error)
  }
}

const goToDetail = (id) => {
  router.push(`/playlist-detail?id=${id}`)
}
</script>