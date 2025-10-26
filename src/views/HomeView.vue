<template>
  <div>
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div
          v-for="note in musicNotes"
          :key="note.id"
          class="absolute animate-rain transition-colors"
          :class="mode === 'healing' ? 'text-blue-500' : 'text-orange-500'"
          :style="{
          left: note.left,
          animationDelay: note.delay,
          animationDuration: note.duration
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

    <div class="flex items-center justify-center h-fit px-4 mt-60">
      <div class="max-w-2xl w-full">
        <!-- Card -->
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center animate-card-entrance">
          <h1
              class="text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500"
              :class="mode === 'healing' ? 'text-blue-500' : 'text-orange-500'"
          >
            {{ mode === 'healing' ? 'Heal Through Music' : 'Your Perfect Soundtrack' }}
          </h1>
          <template v-if="mode === 'healing'">
            <p class="text-gray-600 text-lg mb-10">
              Evidence-based music therapy to support your mental wellness journey.
              Create playlists scientifically designed to improve your mood.
            </p>
          </template>
          <template v-else>
            <p class="text-gray-600 text-lg mb-10">
              AI-powered playlists that match your vibe, context, and mood. Every moment deserves the perfect
              soundtrack.
            </p>
          </template>
          <button
              class="cursor-pointer text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center space-x-3 mx-auto transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1.5"
              :class="mode === 'healing' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'"
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

export default {
  name: 'HomePage',
  setup() {
    const {mode} = useTheme()
    return {mode}
  },
  data() {
    return {
      musicNotes: []
    }
  },
  mounted() {
    const notes = [];
    const minDistance = 5;
    const totalNotes = 100;

    const isTooClose = (newLeft, existingNotes) => {
      return existingNotes.some(note => {
        const distance = Math.abs(parseFloat(newLeft) - parseFloat(note.left));
        return distance < minDistance;
      });
    };

    for (let i = 0; i < totalNotes; i++) {
      let left;
      let attempts = 0;
      const maxAttempts = 100;

      do {
        left = `${Math.random() * 100}%`;
        attempts++;
      } while (isTooClose(left, notes) && attempts < maxAttempts);

      const duration = 15 + Math.random() * 10;

      notes.push({
        id: i,
        left: left,
        delay: `${i * 0.3}s`,
        duration: `${duration}s`,
        size: 32 + Math.random() * 32
      });
    }

    this.musicNotes = notes;
  }
}
</script>

<style scoped>
@keyframes rain {
  0% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0;
  }
  5% {
    opacity: 0.5;
  }
  95% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(calc(100vh + 100px)) rotate(1440deg);
    opacity: 0;
  }
}

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

.animate-rain {
  animation: rain linear infinite;
}

.animate-card-entrance {
  animation: card-entrance 0.8s ease-out;
}
</style>