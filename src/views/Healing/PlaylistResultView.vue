<template>
  <div
    class="bg-[var(--bg-white)] rounded-2xl shadow-[0_0_20px_0_rgba(0,0,0,0.1)] p-8 max-w-4xl mx-auto mt-4"
    v-if="playlist"
  >
    <div class="space-y-8">
      <div class="mb-8 space-y-2 text-center">
        <h1 class="text-2xl sm:text-3xl font-bold text-[var(--main-color)]">
          Your Personalized {{ playlist.mode === 'healing' ? 'Healing' : 'Energizing' }} Playlist
        </h1>
        <p class="text-[var(--t-gray)]">
          Based on your mental wellness assessment, we've curated these tracks for you.
        </p>
      </div>
      <div class="flex flex-col gap-4 mx-4 sm:flex-row">
        <div
          class="flex-1 rounded-xl border border-[#FFA500]/20 bg-[#FFA500]/10 p-4 text-center shadow-sm"
        >
          <div class="flex flex-col items-center space-y-1.7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-[#FFA500]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm font-medium text-[var(--t-gray)]">Tingkat Depresi</p>
            <p class="text-2xl font-bold text-[#FFA500]">{{ playlist.phq9_score }}/27</p>
            <p class="text-sm font-medium text-[#FFA500]">{{ playlist.depression_level }}</p>
          </div>
        </div>
        <div
          class="flex-1 rounded-xl border border-[var(--main-color)]/20 bg-[var(--main-color)]/10 p-4 text-center shadow-sm"
        >
          <div class="flex flex-col items-center space-y-1.5">
            <span class="text-3xl">{{ moodEmoji }}</span>
            <p class="text-sm font-medium text-[var(--t-gray)]">Mood Anda</p>
            <p class="text-xl font-bold text-[var(--main-color)]">
              {{ moodLabel }}
            </p>
          </div>
        </div>
      </div>
      <div class="bg-[var(--main-color)] rounded-xl p-6 text-[var(--t-white)] shadow-lg">
        <div class="flex items-center mb-4 space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-[var(--t-white)]/80"
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

        <p class="mb-4 opacity-80">{{ playlist.mode === 'healing' ? 'Healing' : 'Energizing' }} Journey — {{ playlist.created_at }}</p>

        <div class="grid grid-cols-3 gap-4 mb-6 text-sm">
          <div>
            <p class="opacity-70">Durasi</p>
            <p class="font-semibold">{{ formattedDuration }}</p>
          </div>
          <div>
            <p class="opacity-70">Genre</p>
            <p class="font-semibold">{{ formattedGenres }}</p>
          </div>
          <div>
            <p class="opacity-70">Mood Score</p>
            <p class="font-semibold">{{ playlist.pre_mood }}/10</p>
          </div>
        </div>

        <a
          :href="playlist.link_playlist"
          target="_blank"
          class="w-full py-3 bg-[var(--t-white)] text-[var(--main-color)] rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center justify-center space-x-2 shadow-sm"
        >
          <img 
            src="../assets/spotify_blue.svg" 
            alt="Spotify Icon" 
            class="w-6 h-6"
          >
          <span>Open in Spotify</span>
        </a>
      </div>
      <button
        @click="$router.push({ name: 'Feedback' })"
        class="w-full py-3 border-1 border-[var(--silver)] text-[var(--t-gray)] rounded-lg font-medium cursor-pointer transition-all duration-300 hover:bg-gray-100"



        >
        Continue To Feedback
      </button>
    </div>
  </div>
  <div v-else class="flex justify-center items-center min-h-screen">
    <div class="p-8 text-center">
      <div class="inline-flex items-center space-x-2">
        <svg class="w-5 h-5 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-blue-600">Loading playlist data...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { playlistService } from "@/services/playlistService";
import { getMoodEmoji, getMoodLabel, formatDuration } from "@/utils/utils";

export default {
  data() {
    return {
      playlist: null,
      loading: true,
      error: null
    };
  },
  computed: {
    moodEmoji() {
      return this.playlist ? getMoodEmoji(this.playlist.pre_mood) : '😐';
    },
    moodLabel() {
      return this.playlist ? getMoodLabel(this.playlist.pre_mood) : 'Neutral';
    },
    formattedDuration() {
      return this.playlist ? formatDuration(this.playlist.duration) : '0 minutes';
    },
    formattedGenres() {
      if (!this.playlist || !this.playlist.genres || this.playlist.genres.length === 0) {
        return 'Unknown';
      }
      
      // Take first two genres
      const genreNames = this.playlist.genres.slice(0, 2).map(genre => genre.name);
      return genreNames.join(', ');
    }
  },
  methods: {
    async fetchPlaylistData() {
      try {
        const playlistId = this.$route.query.playlistId;
        if (!playlistId) {
          this.error = 'No playlist ID provided';
          return;
        }
        
        // Fetch playlist data from API
        const response = await playlistService.getPlaylistById(playlistId);
        this.playlist = response;
      } catch (error) {
        console.error('Error fetching playlist:', error);
        this.error = 'Failed to load playlist data';
      } finally {
        this.loading = false;
      }
    },
    createNewPlaylist() {
      // Navigate back to mood slider page
      this.$router.push({ name: 'moodslider' });
    }
  },
  mounted() {
    // Scroll to top of page when component is mounted
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // If we have playlist data in route params, use it
    if (this.$route.params.playlist) {
      this.playlist = this.$route.params.playlist;
      this.loading = false;
    } else {
      // Otherwise fetch it
      this.fetchPlaylistData();
    }
  }
};
</script>
