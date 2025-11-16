<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { playlistService } from '@/services/playlistService'
import { getMoodEmoji, getMoodLabel } from '@/utils/utils'
import { formattedDuration as formatDurationUtil, formattedGenres as formatGenresUtil } from '@/utils/utils'

const router = useRouter()
const route = useRoute()

const playlist = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  if (route.params.playlist) {
    playlist.value = route.params.playlist
    loading.value = false
  } else {
    fetchPlaylistData()
  }
})

const moodEmoji = computed(() =>
  playlist.value ? getMoodEmoji(playlist.value.pre_mood) : '😐'
)
const moodLabel = computed(() =>
  playlist.value ? getMoodLabel(playlist.value.pre_mood) : 'Neutral'
)
const formattedDuration = computed(() =>
  playlist.value ? formatDurationUtil(playlist.value.duration) : '0 minutes'
)
const formattedGenres = computed(() => {
  const p = playlist.value
  if (!p || !p.genres || p.genres.length === 0) return 'Unknown'
  return formatGenresUtil(p.genres, 2)
})

const fetchPlaylistData = async () => {
  try {
    const playlistId = route.query.playlistId
    if (!playlistId) {
      error.value = 'No playlist ID provided'
      return
    }
    const response = await playlistService.getPlaylistById(playlistId)
    playlist.value = response
  } catch (e) {
    console.error('Error fetching playlist:', e)
    error.value = 'Failed to load playlist data'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex justify-center items-center px-4 mt-12 min-h-screen bg-background-soft">
    <!-- Card Loaded -->
    <div
        v-if="playlist"
        class="p-6 mx-auto w-full max-w-4xl rounded-2xl bg-background-white shadow-full-blur sm:p-8"
    >
      <div class="space-y-8">
        <!-- Title & Description -->
        <div class="mb-8 space-y-2 text-center">
          <h1
              class="text-2xl font-bold sm:text-3xl"
              :class="playlist.mode === 'healing' ? 'text-primary-health' : 'text-primary-everyday'"
          >
            Your Personalized
            {{ playlist.mode === "healing" ? "Healing" : "Energizing" }} Playlist
          </h1>
          <p class="text-muted">
            Based on your mental wellness assessment, we've curated these tracks for you.
          </p>
        </div>

        <!-- Summary Cards -->
        <div class="flex flex-col gap-4 mx-2 sm:mx-4 sm:flex-row">
          <!-- Depression Level -->
          <div
              class="flex-1 rounded-xl border border-[#FFA500]/20 bg-[#FFA500]/10 p-4 text-center shadow-sm"
          >
            <div class="flex flex-col items-center space-y-1.5">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8 text-[#FFA500]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p class="text-sm font-medium text-muted">Tingkat Depresi</p>
              <p class="text-2xl font-bold text-[#FFA500]">
                {{ playlist.phq9_score }}/27
              </p>
              <p class="text-sm font-medium text-[#FFA500]">
                {{ playlist.depression_level }}
              </p>
            </div>
          </div>

          <!-- Mood -->
          <div
              class="flex-1 p-4 text-center rounded-xl border shadow-sm"
              :class="
              playlist.mode === 'healing'
                ? 'border-primary-health-light bg-primary-health-soft'
                : 'border-primary-everyday-light bg-primary-everyday-soft'
            "
          >
            <div class="flex flex-col items-center space-y-1.5">
              <span class="text-3xl">{{ moodEmoji }}</span>
              <p class="text-sm font-medium text-muted">Mood Anda</p>
              <p
                  class="text-xl font-bold"
                  :class="
                  playlist.mode === 'healing'
                    ? 'text-primary-health'
                    : 'text-primary-everyday'
                "
              >
                {{ moodLabel }}
              </p>
            </div>
          </div>
        </div>

        <!-- Main Playlist Card -->
        <div
            class="p-6 text-white rounded-xl shadow-lg"
            :class="playlist.mode === 'healing' ? 'bg-primary-health' : 'bg-primary-everyday'"
        >
          <div class="flex items-center mb-4 space-x-3">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-white/80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            <h3 class="text-xl font-bold">{{ playlist.name }}</h3>
          </div>

          <p class="mb-4 opacity-80">
            {{ playlist.mode === "healing" ? "Healing" : "Energizing" }} Journey —
            {{ playlist.created_at }}
          </p>

          <div class="grid grid-cols-1 gap-4 mb-6 text-sm sm:grid-cols-3">
            <div>
              <p class="opacity-70">Durasi</p>
              <p class="font-semibold">
                {{ formattedDuration }}
              </p>
            </div>
            <div>
              <p class="opacity-70">Genre</p>
              <p class="font-semibold">
                {{ formattedGenres }}
              </p>
            </div>
            <div>
              <p class="opacity-70">Mood Score</p>
              <p class="font-semibold">
                {{ playlist.pre_mood }}/10
              </p>
            </div>
          </div>

          <!-- Open in Spotify -->
          <a
              :href="playlist.link_playlist"
              target="_blank"
              class="flex justify-center items-center py-3 space-x-2 w-full font-semibold bg-white rounded-lg shadow-sm transition-all"
              :class="
              playlist.mode === 'healing'
                ? 'text-primary-health hover:bg-primary-health-soft'
                : 'text-primary-everyday hover:bg-primary-everyday-soft'
            "
          >
            <img
                src="/src/assets/spotify_blue.svg"
                alt="Spotify Icon"
                class="w-6 h-6"
            />
            <span>Open in Spotify</span>
          </a>
        </div>

        <!-- Continue to Feedback -->
        <button
            @click="$router.push({ name: 'Feedback', query: { playlistId: playlist.id } })"
            class="py-3 w-full font-medium rounded-lg border transition-all duration-300 cursor-pointer text-gray bg-background-white border-silver hover:bg-background-soft"
        >
          Continue To Feedback
        </button>
      </div>
    </div>

    <!-- Loading / No Playlist -->
    <div v-else class="p-8 text-center">
      <div class="inline-flex items-center space-x-2">
        <svg
            class="w-5 h-5 text-blue-500 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
          <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
          ></circle>
          <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042
               1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span class="text-primary-health">Loading playlist data...</span>
      </div>
    </div>
  </div>
</template>
