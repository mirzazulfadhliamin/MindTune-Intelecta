<script>
import { playlistService } from "@/services/playlistService";

export default {
  mounted() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    this.createPlaylist();
  },
  methods: {
    async createPlaylist() {
      try {
        const pre_mood = localStorage.getItem("pre_mood") || 5;
        const phq9_score = localStorage.getItem("phq9_score") || 0;

        const playlistData = await playlistService.createPlaylist(
            parseInt(pre_mood),
            parseInt(phq9_score)
        );

        this.$router.push({
          name: "playlistresult",
          query: {
            playlistId: playlistData.id,
          },
        });
      } catch (error) {
        console.error("Failed to create playlist:", error);
        this.$router.push({
          name: "questionnaire",
          query: {
            error: "Failed to create playlist. Please try again.",
          },
        });
      }
    },
  },
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div
        class="w-full max-w-3xl p-20 text-center bg-background-white/80 rounded-3xl shadow-full-blur backdrop-blur-sm font-poppins"
    >
      <div class="relative w-28 h-28 mx-auto mb-12">
        <div
            class="absolute inset-0 border-4 rounded-full opacity-70 border-primary-health-light animate-ping"
        ></div>

        <div
            class="absolute inset-0 flex items-center justify-center w-28 h-28 m-auto p-6 bg-background-white rounded-full border-4 border-primary-health animate-pulse"
        >
          <img
              src="@/assets/brain.svg"
              alt="Brain Icon"
              class="w-16 h-16 text-primary-health"
          />
        </div>
      </div>

      <h3 class="mb-3 text-2xl font-medium text-black animate-fade-in">
        Menganalisis tanggapan Anda...
      </h3>

      <p
          class="text-base font-normal text-muted animate-fade-in animation-delay-300"
      >
        Membuat playlist yang disesuaikan dengan kebutuhan anda
      </p>
    </div>
  </div>
</template>
