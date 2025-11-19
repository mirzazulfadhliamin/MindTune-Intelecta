<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { dashboardService } from '@/services/dashboardService'
import { formattedGenres } from '@/utils/utils'
import SessionHistory from '@/views/Healing/Dashboard/dashboard-component/SessionHistory.vue'
import ChartMoodProgress from '@/views/Healing/Dashboard/dashboard-component/ChartMoodProgress.vue'
import CardSummary from './dashboard-component/CardSummary.vue'

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

// Chart Mood State
const chartMoodData = ref([])
const isChartLoading = ref(false)
const chartError = ref('')

const fetchDashboardData = async () => {
  isLoading.value = true
  try {
    const playlistsData = await dashboardService.getPlaylists()
    const mappedData = playlistsData.map((playlist) => {
      const genreString = formattedGenres(playlist.genres || [])

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
  isChartLoading.value = true
  chartError.value = ''
  try {
    const chartData = await dashboardService.getChartMood()
    // Normalize data: ensure integers and sort by sequence_number
    const normalized = (Array.isArray(chartData) ? chartData : [])
      .map((d) => ({
        sequence_number: Number(d.sequence_number),
        pre_mood: Number(d.pre_mood),
        post_mood: Number(d.post_mood),
      }))
      .sort((a, b) => a.sequence_number - b.sequence_number)

    chartMoodData.value = normalized
  } catch (error) {
    console.error('Error fetching chart mood:', error)
    chartError.value = 'Gagal memuat data mood.'
  } finally {
    isChartLoading.value = false
  }
}

const goToDetail = (id) => {
  router.push(`/playlist-detail?id=${id}`)
}
</script>

<template>
  <div class="min-h-screen bg-background-white">
    <div class="px-4 py-8 mx-auto mt-16 max-w-7xl">
      <!-- Header -->
      <h1 class="mb-8 text-4xl font-bold transition-colors duration-500 text-primary-health">
        Dashboard
      </h1>

      <!-- Card Summary -->
      <CardSummary :is-loading="isLoading" :stats="stats" />

      <!-- Mood Chart -->
      <ChartMoodProgress
        :mood-data="chartMoodData"
        :is-loading="isChartLoading"
        :error="chartError"
      />

      <!-- Session History -->
      <SessionHistory :is-loading="isLoading" :sessions="sessions" @select="goToDetail" />
    </div>
  </div>
</template>