<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Back Button -->
      <button
          @click="goBack"
          class="cursor-pointer flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span class="font-medium">Back to dashboard</span>
      </button>

      <!-- Main Card -->
      <div class="bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-10 mb-6 animate-card-entrance">
        <div class="flex items-start justify-between mb-8">
          <!-- Left Side: Icon and Info -->
          <div class="flex items-start space-x-6">
            <!-- Playlist Icon -->
            <div
                class="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-500"
                :class="mode === 'healing' ? 'bg-blue-500' : 'bg-orange-500'"
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
              <h1 class="text-3xl font-bold text-gray-900 mb-3">Deep Relaxation</h1>
              <div class="flex items-center space-x-3">
                <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg">
                  Mild Depression
                </span>
                <div class="flex items-center space-x-2 text-gray-600 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>Created at 16/05/2025 19:43</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side: Mood Indicators -->
          <div class="flex items-start space-x-8">
            <div class="text-center">
              <p class="text-sm text-gray-600 mb-2">Pre Mood</p>
              <div class="text-3xl mb-1">😐</div>
              <p
                  class="font-bold text-lg transition-colors duration-500"
                  :class="mode === 'healing' ? 'text-blue-500' : 'text-orange-500'"
              >
                3/10
              </p>
            </div>
            <div class="flex items-center">
              <svg
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
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-600 mb-2">Post Mood</p>
              <div class="text-3xl mb-1">😊</div>
              <p
                  class="text-green-500 font-bold text-lg transition-colors duration-500"
              >
                7/10
              </p>
            </div>
          </div>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-3 gap-8 mb-6">
          <div>
            <p class="text-sm text-gray-600 mb-1">Duration</p>
            <p class="text-xl font-bold text-gray-900">15 minutes</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-1">Genre</p>
            <p class="text-xl font-bold text-gray-900">Lo-fi Chill, Acoustic</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-1">Total Tracks</p>
            <p class="text-xl font-bold text-gray-900">19</p>
          </div>
        </div>

        <!-- Open in Spotify Button -->
        <button
            class="cursor-pointer w-full px-6 py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 shadow-md"
            :class="mode === 'healing' ? 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg' : 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span>Open in Spotify</span>
        </button>
      </div>

      <!-- Tracks Card -->
      <div class="bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-10 mb-6 animate-card-entrance">
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
              :class="mode === 'healing' ? 'text-blue-500' : 'text-orange-500'"
              class="transition-colors duration-500"
          >
            <path d="M9 18V5l12-2v13" stroke="currentColor"></path>
            <circle cx="6" cy="18" r="3" stroke="currentColor"></circle>
            <circle cx="18" cy="16" r="3" stroke="currentColor"></circle>
          </svg>
          <h2 class="text-2xl font-bold text-gray-900">Tracks</h2>
        </div>

        <div class="space-y-3">
          <div
              v-for="(track, index) in tracks"
              :key="index"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center space-x-4">
              <div
                  class="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 font-semibold transition-colors duration-500"
                  :class="mode === 'healing' ? 'bg-blue-100' : 'bg-orange-100'"
              >
                {{ index + 1 }}
              </div>
              <div>
                <p class="font-semibold text-gray-900">{{ track.title }}</p>
                <p class="text-sm text-gray-600">{{ track.artist }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span class="text-sm">{{ track.duration }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Button -->
      <button
          @click="showDeleteModal = true"
          class="cursor-pointer w-full px-6 py-4 bg-white border-2 border-red-300 text-red-600 rounded-2xl font-semibold transition-all duration-300 hover:bg-red-50 hover:shadow-md flex items-center justify-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
        <span>Delete Session</span>
      </button>
    </div>

    <!-- Delete Modal -->
    <div
        v-if="showDeleteModal"
        @click="showDeleteModal = false"
        class="fixed inset-0 flex items-center justify-center z-50 px-4 animate-fade-in"
        style="background-color: rgba(0, 0, 0, 0.2);"
    >
      <div
          @click.stop
          class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-modal-entrance"
      >
        <!-- Icon -->
        <div class="flex justify-center mb-6">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </div>
        </div>

        <!-- Close Button -->
        <button
            @click="showDeleteModal = false"
            class="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- Content -->
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-3">Delete Session</h2>
          <p class="text-gray-600">
            Are you sure you want to delete this session? This action cannot be undone.
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-3">
          <button
              @click="showDeleteModal = false"
              class="cursor-pointer flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-50 hover:shadow-md"
          >
            Cancel
          </button>
          <button
              @click="deleteSession"
              class="cursor-pointer flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTheme } from "@/composables/useTheme"

export default {
  name: 'PlaylistDetail',
  setup() {
    const { mode } = useTheme()
    return { mode }
  },
  data() {
    return {
      showDeleteModal: false,
      tracks: [
        { title: 'Deep Relaxation', artist: 'Martin Timberlake', duration: '8:09' },
        { title: 'Deep Relaxation', artist: 'Martin Timberlake', duration: '8:09' },
        { title: 'Deep Relaxation', artist: 'Martin Timberlake', duration: '8:09' }
      ]
    }
  },
  methods: {
    goBack() {
      this.$router.push('/dashboard')
    },
    deleteSession() {
      console.log('Session deleted')
      this.showDeleteModal = false
      this.$router.push('/dashboard')
    }
  }
}
</script>

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