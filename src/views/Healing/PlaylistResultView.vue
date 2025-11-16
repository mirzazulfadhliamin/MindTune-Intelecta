<script>
import { playlistService } from "@/services/playlistService";
import { getMoodEmoji, getMoodLabel, formatDuration } from "@/utils/utils";

export default {
  name: "PlaylistResult",
  data() {
    return {
      playlist: null,
      loading: true,
      error: null,
    };
  },
  computed: {
    moodEmoji() {
      return this.playlist ? getMoodEmoji(this.playlist.pre_mood) : "😐";
    },
    moodLabel() {
      return this.playlist ? getMoodLabel(this.playlist.pre_mood) : "Neutral";
    },
    formattedDuration() {
      return this.playlist ? formatDuration(this.playlist.duration) : "0 minutes";
    },
    formattedGenres() {
      if (!this.playlist || !this.playlist.genres || this.playlist.genres.length === 0) {
        return "Unknown";
      }
      const genreNames = this.playlist.genres.slice(0, 2).map((genre) => genre.name);
      return genreNames.join(", ");
    },
  },
  methods: {
    async fetchPlaylistData() {
      try {
        const playlistId = this.$route.query.playlistId;
        if (!playlistId) {
          this.error = "No playlist ID provided";
          return;
        }

        const response = await playlistService.getPlaylistById(playlistId);
        this.playlist = response;
      } catch (error) {
        console.error("Error fetching playlist:", error);
        this.error = "Failed to load playlist data";
      } finally {
        this.loading = false;
      }
    },
    createNewPlaylist() {
      this.$router.push({ name: "moodslider" });
    },
  },
  mounted() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (this.$route.params.playlist) {
      this.playlist = this.$route.params.playlist;
      this.loading = false;
    } else {
      this.fetchPlaylistData();
    }
  },
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-background-soft px-4">
    <!-- Card Loaded -->
    <div
        v-if="playlist"
        class="w-full max-w-4xl bg-background-white rounded-2xl shadow-[0_0_20px_0_rgba(0,0,0,0.1)] p-6 sm:p-8 mx-auto"
    >
      <div class="space-y-8">
        <!-- Title & Description -->
        <div class="mb-8 space-y-2 text-center">
          <h1
              class="text-2xl sm:text-3xl font-bold"
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
              class="flex-1 rounded-xl p-4 text-center shadow-sm border"
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
            class="rounded-xl p-6 text-white shadow-lg"
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

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-sm">
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
              class="w-full py-3 bg-white rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 shadow-sm"
              :class="
              playlist.mode === 'healing'
                ? 'text-primary-health hover:bg-primary-health-soft'
                : 'text-primary-everyday hover:bg-primary-everyday-soft'
            "
          >
            <img
                src="../assets/spotify_blue.svg"
                alt="Spotify Icon"
                class="w-6 h-6"
            />
            <span>Open in Spotify</span>
          </a>
        </div>

        <!-- Continue to Feedback -->
        <button
            @click="$router.push({ name: 'Feedback', query: { playlistId: playlist.id } })"
            class="w-full py-3 border text-gray rounded-lg font-medium cursor-pointer transition-all duration-300 bg-background-white border-silver hover:bg-background-soft"
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
