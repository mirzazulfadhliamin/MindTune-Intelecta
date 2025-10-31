<template>
  <div>
    <!-- Grid Background -->
    <div class="overflow-hidden absolute inset-0 bg-white pointer-events-none">
      <div
          class="absolute inset-0 transition-opacity duration-500"
          :style="{
          backgroundImage: mode === 'healing'
            ? 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)'
            : 'linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }"
      ></div>
    </div>

    <!-- Pulsing Music Notes -->
    <div class="overflow-hidden absolute inset-0 pointer-events-none">
      <div
          v-for="note in musicNotes"
          :key="note.id"
          class="absolute transition-colors animate-pulse"
          :class="mode === 'healing' ? 'text-blue-500' : 'text-orange-500'"
          :style="{
          left: note.left,
          top: note.top,
          animationDelay: note.delay,
          animationDuration: note.duration,
          opacity: 0
        }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" :width="note.size" :height="note.size" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      </div>
    </div>

    <div class="flex justify-center items-center px-4 mt-60 h-fit">
      <div class="w-full max-w-2xl">
        <!-- Card -->
        <div class="p-12 text-center rounded-3xl backdrop-blur-sm bg-white/80 animate-card-entrance"
             :class="mode === 'healing' ? 'shadow-[0_0_50px_25px_rgba(59,130,246,0.15)]' : 'shadow-2xl shadow-orange-500/20'"
        >
          <h1
              class="mb-6 text-4xl font-bold transition-colors duration-500 md:text-5xl"
              :class="mode === 'healing' ? 'text-blue-500' : 'text-orange-500'"
          >
            {{ mode === 'healing' ? 'Heal Through Music' : 'Your Perfect Soundtrack' }}
          </h1>
          <template v-if="mode === 'healing'">
            <p class="mb-10 text-lg text-gray-600">
              Evidence-based music therapy to support your mental wellness journey.
              Create playlists scientifically designed to improve your mood.
            </p>
          </template>
          <template v-else>
            <p class="mb-10 text-lg text-gray-600">
              AI-powered playlists that match your vibe, context, and mood. Every moment deserves the perfect
              soundtrack.
            </p>
          </template>
          <button
              @click="navigateToMoodSlider"
              class="flex items-center px-8 py-4 mx-auto space-x-3 text-lg font-semibold text-white rounded-full transition-all duration-300 transform cursor-pointer hover:-translate-y-1.5"
              :class="mode === 'healing' ? 'bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60' : 'bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 shadow-lg shadow-orange-500/50 hover:shadow-xl hover:shadow-orange-500/60'"
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
              <path
                  d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
              <path d="M5 3v4"></path>
              <path d="M19 17v4"></path>
              <path d="M3 5h4"></path>
              <path d="M17 19h4"></path>
            </svg>
            <span>Create Playlist Now</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useTheme} from "@/composables/useTheme"
import {useRouter} from "vue-router"

export default {
  name: 'HomePage',
  setup() {
    const {mode} = useTheme()
    const router = useRouter()
    
    const navigateToMoodSlider = () => {
      router.push('/mood-slider')
    }
    
    return {mode, navigateToMoodSlider}
  },
  data() {
    return {
      musicNotes: []
    }
  },
  mounted() {
    const notes = [];
    const minDistance = 15;
    const totalNotes = 30;

    const isTooClose = (newLeft, newTop, existingNotes) => {
      return existingNotes.some(note => {
        const distanceX = Math.abs(parseFloat(newLeft) - parseFloat(note.left));
        const distanceY = Math.abs(parseFloat(newTop) - parseFloat(note.top));
        return distanceX < minDistance && distanceY < minDistance;
      });
    };

    for (let i = 0; i < totalNotes; i++) {
      let left, top;
      let attempts = 0;
      const maxAttempts = 100;

      do {
        left = `${Math.random() * 100}%`;
        top = `${Math.random() * 100}%`;
        attempts++;
      } while (isTooClose(left, top, notes) && attempts < maxAttempts);

      const duration = `${2 + Math.random() * 3}s`;

      notes.push({
        id: i,
        left: left,
        top: top,
        delay: `${Math.random() * 5}s`,
        duration: duration,
        size: 24 + Math.random() * 24
      });
    }

    this.musicNotes = notes;
  }
}
</script>

<style scoped>
@keyframes card-entrance {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-card-entrance {
  animation: card-entrance 0.8s ease-out;
}
</style>