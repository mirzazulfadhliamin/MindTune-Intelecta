<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { playlistDetailService } from '@/services/playlistDetailService'
import { getMoodEmoji as getMoodEmojiUtil } from '@/utils/utils'
import { formattedDuration as formatDurationUtil, formattedGenres as formatGenresUtil } from '@/utils/utils'

const router = useRouter()
const route = useRoute()

const showDeleteModal = ref(false)
const isLoading = ref(true)
const playlistId = ref(null)
const playlist = ref({
  id: '',
  spotify_id: '',
  name: '',
  phq9_score: 0,
  depression_level: '',
  pre_mood: 0,
  post_mood: 0,
  duration: 0,
  total_tracks: 0,
  link_playlist: '',
  feedback: '',
  mode: 'healing',
  created_at: '',
  time_ago: '',
  tracks: [],
  genres: []
})

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })

  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')
  playlistId.value = id

  if (id) {
    fetchPlaylistDetail()
  } else {
    console.error('No playlist ID provided')
    router.push('/dashboard')
  }
})

const formattedDuration = computed(() => formatDurationUtil(playlist.value?.duration || 0))

const formattedGenres = computed(() => formatGenresUtil(playlist.value?.genres || []))

const fetchPlaylistDetail = async () => {
  isLoading.value = true
  try {
    const data = await playlistDetailService.getPlaylistDetail(playlistId.value)
    playlist.value = data
  } catch (error) {
    console.error('Error fetching playlist detail:', error)
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.push('/dashboard')
}

const deleteSession = () => {
  console.log('Session deleted')
  showDeleteModal.value = false
  router.push('/dashboard')
}

const formatTrackDuration = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const openInSpotify = () => {
  const link = playlist.value?.link_playlist
  if (link) {
    window.open(link.trim(), '_blank')
  }
}

const goToFeedback = () => {
  router.push({ path: '/Feedback', query: { playlistId: playlistId.value } })
}

const getMoodEmoji = (mood) => getMoodEmojiUtil(mood)
</script>

<template>
  <div class="mt-16 min-h-screen bg-background-soft">
    <div class="px-4 py-8 mx-auto max-w-6xl">
      <!-- Back Button -->
      <button
          @click="goBack"
          class="flex items-center mb-6 space-x-2 transition-colors cursor-pointer text-gray hover:text-black"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span class="font-medium">Back to dashboard</span>
      </button>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div
            class="w-12 h-12 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"
        ></div>
      </div>

      <div v-else>
        <!-- Main Card -->
        <div
            class="p-8 mb-6 rounded-3xl border-2 bg-background-white border-border md:p-10 animate-card-entrance"
        >
          <div class="flex justify-between items-start mb-8">
            <!-- Left Side: Icon and Info -->
            <div class="flex items-start space-x-6">
              <!-- Playlist Icon -->
              <div
                  class="flex flex-shrink-0 justify-center items-center w-20 h-20 rounded-2xl transition-colors duration-500"
                  :class="playlist.mode === 'healing' ? 'bg-blue-500' : 'bg-orange-500'"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
              </div>

              <!-- Playlist Info -->
              <div>
                <h1 class="mb-3 text-3xl text-gray font-regular">
                  {{ playlist.name }}
                </h1>
                <div class="flex items-center space-x-3">
                  <span
                      class="px-3 py-1 text-sm font-medium rounded-lg text-gray bg-background-soft"
                  >
                    {{ playlist.depression_level }}
                  </span>
                  <div class="flex items-center space-x-2 text-sm text-muted">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>Created at {{ playlist.created_at }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Side: Mood Indicators -->
            <div class="flex items-start space-x-8">
              <div class="text-center">
                <p class="mb-2 text-sm text-muted">Pre Mood</p>
                <div class="mb-1 text-3xl">
                  {{ getMoodEmoji(parseInt(playlist.pre_mood)) }}
                </div>
                <p
                    class="text-lg font-medium transition-colors duration-500"
                    :class="playlist.mode === 'healing' ? 'text-blue-500' : 'text-orange-500'"
                >
                  {{ playlist.pre_mood }}/10
                </p>
              </div>
              <div class="flex items-center">
                <svg
                    v-if="
                    playlist.post_mood &&
                    parseInt(playlist.post_mood) > parseInt(playlist.pre_mood)
                  "
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
                    v-else-if="
                    playlist.post_mood &&
                    parseInt(playlist.post_mood) <= parseInt(playlist.pre_mood)
                  "
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-red-500"
                    stroke="currentColor"
                >
                  <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                  <polyline points="17 18 23 18 23 12"></polyline>
                </svg>
              </div>
              <div class="text-center">
                <p class="mb-2 text-sm text-muted">Post Mood</p>
                <div class="mb-1 text-3xl">
                  {{
                    playlist.post_mood
                        ? getMoodEmoji(parseInt(playlist.post_mood))
                        : "❓"
                  }}
                </div>
                <p
                    :class="
                    playlist.post_mood
                      ? parseInt(playlist.post_mood) > parseInt(playlist.pre_mood)
                        ? 'text-green-500'
                        : 'text-red-500'
                      : 'text-muted'
                  "
                    class="text-lg font-medium transition-colors duration-500"
                >
                  {{ playlist.post_mood ? `${playlist.post_mood}/10` : "Belum diisi" }}
                </p>
                <button
                    v-if="!playlist.post_mood"
                    @click="goToFeedback"
                    class="px-4 py-2 mt-2 text-sm font-medium text-white rounded-lg transition-colors duration-300 cursor-pointer"
                    :class="
                    playlist.mode === 'healing'
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-orange-500 hover:bg-orange-600'
                  "
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>

          <!-- Details Grid -->
          <div class="grid grid-cols-3 gap-8 mb-6">
            <div>
              <p class="mb-1 text-sm text-muted">Duration</p>
              <p class="text-xl font-medium text-gray">
                {{ formattedDuration }}
              </p>
            </div>
            <div>
              <p class="mb-1 text-sm text-muted">Genre</p>
              <p class="text-xl font-medium text-gray">
                {{ formattedGenres }}
              </p>
            </div>
            <div>
              <p class="mb-1 text-sm text-muted">Total Tracks</p>
              <p class="text-xl font-medium text-gray">
                {{ playlist.total_tracks }}
              </p>
            </div>
          </div>

          <!-- Open in Spotify Button -->
          <button
              @click="openInSpotify"
              class="flex justify-center items-center px-6 py-4 space-x-2 w-full font-semibold text-white rounded-xl shadow-md transition-all duration-300 cursor-pointer"
              :class="
              playlist.mode === 'healing'
                ? 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg'
                : 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg'
            "
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
            >
              <path
                  d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12
                   12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9
                   4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9
                   15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381
                   4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
              />
            </svg>
            <span>Open in Spotify</span>
          </button>
        </div>

        <!-- Tracks Card -->
        <div
            class="p-8 mb-6 rounded-3xl border-2 bg-background-white border-border md:p-10 animate-card-entrance"
        >
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
                :class="playlist.mode === 'healing' ? 'text-blue-500' : 'text-orange-500'"
                class="transition-colors duration-500"
            >
              <path d="M9 18V5l12-2v13" stroke="currentColor"></path>
              <circle cx="6" cy="18" r="3" stroke="currentColor"></circle>
              <circle cx="18" cy="16" r="3" stroke="currentColor"></circle>
            </svg>
            <h2 class="text-2xl font-bold text-black">Tracks</h2>
          </div>

          <div class="space-y-3">
            <div
                v-for="(track, index) in playlist.tracks"
                :key="index"
                class="flex justify-between items-center p-4 rounded-xl transition-colors bg-background-soft hover:bg-border-light"
            >
              <div class="flex items-center space-x-4">
                <div
                    class="flex justify-center items-center w-10 h-10 font-semibold rounded-lg transition-colors duration-500 text-gray"
                    :class="
                    playlist.mode === 'healing' ? 'bg-blue-100' : 'bg-orange-100'
                  "
                >
                  {{ index + 1 }}
                </div>
                <div>
                  <p class="font-semibold text-black">
                    {{ track.name }}
                  </p>
                  <p class="text-sm text-muted">
                    {{ track.artist }}
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-2 text-muted">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span class="text-sm">
                  {{ formatTrackDuration(track.duration) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Button -->
      <button
          v-if="!isLoading"
          @click="showDeleteModal = true"
          class="flex justify-center items-center px-6 py-4 space-x-2 w-full font-semibold text-red-600 rounded-2xl border-2 border-red-300 transition-all duration-300 cursor-pointer bg-background-white hover:bg-red-50 hover:shadow-md"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2
               2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
          ></path>
        </svg>
        <span>Delete Session</span>
      </button>
    </div>

    <!-- Delete Modal -->
    <div
        v-if="showDeleteModal"
        @click="showDeleteModal = false"
        class="flex fixed inset-0 z-50 justify-center items-center px-4 animate-fade-in"
        style="background-color: rgba(0, 0, 0, 0.2);"
    >
      <div
          @click.stop
          class="p-8 w-full max-w-md rounded-2xl shadow-2xl bg-background-white animate-modal-entrance"
      >
        <!-- Icon -->
        <div class="flex justify-center mb-6">
          <div
              class="flex justify-center items-center w-16 h-16 bg-red-100 rounded-full"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc2626"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path
                  d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3
                   0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
              ></path>
            </svg>
          </div>
        </div>

        <!-- Close Button -->
        <button
            @click="showDeleteModal = false"
            class="absolute top-4 right-4 transition-colors cursor-pointer text-silver hover:text-gray"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- Content -->
        <div class="mb-6 text-center">
          <h2 class="mb-3 text-2xl font-bold text-black">Delete Session</h2>
          <p class="text-muted">
            Are you sure you want to delete this session? This action cannot be
            undone.
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-3">
          <button
              @click="showDeleteModal = false"
              class="flex-1 px-6 py-3 font-semibold rounded-lg border-2 transition-all duration-300 cursor-pointer text-gray bg-background-white border-border hover:bg-background-soft hover:shadow-md"
          >
            Cancel
          </button>
          <button
              @click="deleteSession"
              class="flex-1 px-6 py-3 font-semibold text-white bg-red-600 rounded-lg transition-all duration-300 cursor-pointer hover:bg-red-700 hover:shadow-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes card-entrance {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modal-entrance {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-card-entrance {
  animation: card-entrance 0.6s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-modal-entrance {
  animation: modal-entrance 0.3s ease-out;
}
</style>
