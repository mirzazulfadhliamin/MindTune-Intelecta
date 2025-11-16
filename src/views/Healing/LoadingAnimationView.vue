<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { playlistService } from '@/services/playlistService'

const router = useRouter()

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  createPlaylist()
})

const createPlaylist = async () => {
  try {
    const preMood = Number(localStorage.getItem('pre_mood') ?? 5)
    const phq9Score = Number(localStorage.getItem('phq9_score') ?? 0)

    const playlistData = await playlistService.createPlaylist(preMood, phq9Score)

    router.push({
      name: 'playlistresult',
      query: { playlistId: playlistData.id },
    })
  } catch (error) {
    console.error('Failed to create playlist:', error)
    router.push({
      name: 'questionnaire',
      query: { error: 'Failed to create playlist. Please try again.' },
    })
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div
        class="p-20 w-full max-w-3xl text-center rounded-3xl backdrop-blur-sm bg-background-white/80 shadow-full-blur font-poppins"
    >
      <div class="relative mx-auto mb-12 w-28 h-28">
        <div
            class="absolute inset-0 rounded-full border-4 opacity-70 animate-ping border-primary-health-light"
        ></div>

        <div
            class="flex absolute inset-0 justify-center items-center p-6 m-auto w-28 h-28 rounded-full border-4 animate-pulse bg-background-white border-primary-health"
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
