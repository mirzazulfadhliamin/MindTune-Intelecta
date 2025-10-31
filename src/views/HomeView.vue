<template>
  <div class="absolute top-4 left-4 z-20">
    <div class="animate-float-slow transition-colors duration-500"
         :class="mode === 'healing' ? 'text-blue-500' : 'text-orange-500'">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
           fill="currentColor" class="drop-shadow-lg">
        <!-- testing svg bintang -->
        <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"/>
        <path d="M8.67,14.33L7.3,19.69l4.37-2.55l4.37,2.55l-1.37-5.36l4.55-3.95l-5.98-0.51L12,5.5l-2.32,5.37l-5.98,0.51L8.67,14.33z" 
              opacity="0.3"/>
      </svg>
    </div>
  </div>

   <div
      v-for="note in musicNotes"
      :key="note.id"
      class="absolute text-[var(--main-color)] opacity-80"
      :style="{
        left: note.left,
        top: note.top,
        animationDelay: note.delay,
        animationDuration: note.duration,
      }"
      :class="note.animation"
    >
      <component :is="note.icon" :size="note.size" />
    </div>

  <div
    class="relative overflow-hidden min-h-screen flex items-center justify-center"
  >
    <div
      class="absolute inset-0 pointer-events-none bg-[length:50px_50px] bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]"
    ></div>
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        v-for="star in floatingStars"
        :key="'star-' + star.id"
        class="absolute transition-colors"
        :class="[
          mode === 'healing' ? 'text-blue-400/60' : 'text-orange-400/60',
          star.animation,
        ]"
        :style="{
          left: star.left,
          top: star.top,
          animationDelay: star.delay,
          animationDuration: star.duration,
        }"
      >
        <svg :width="star.size" :height="star.size" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"/>
        </svg>
          <!-- <svg :width="star.size" :height="star.size" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10.5,27c2.5,0,4.5-1.5,4.5-3.5c0-0.1,0-0.2,0-0.3c0-0.1,0-0.1,0-0.2v-9.5l9-5.7v7.8c-0.7-0.4-1.6-0.6-2.5-0.6C19,15,17,16.5,17,18.5s2,3.5,4.5,3.5s4.5-1.5,4.5-3.5c0-0.1,0-0.2,0-0.3c0-0.1,0-0.1,0-0.2V6c0-0.4-0.2-0.7-0.5-0.9c-0.3-0.2-0.7-0.2-1,0l-11,7C13.2,12.3,13,12.7,13,13v7.6c-0.7-0.4-1.6-0.6-2.5-0.6C8,20,6,21.5,6,23.5S8,27,10.5,27z"/>
    </svg> -->
      </div>
      <div
        v-for="note in musicNotes"
        :key="note.id"
        class="absolute transition-colors"
        :class="[
          mode === 'healing' ? 'text-blue-500/50' : 'text-orange-500/50',
          note.animation,
        ]"
        :style="{
          left: note.left,
          top: note.top,
          animationDelay: note.delay,
          animationDuration: note.duration,
        }"
      >
        <component :is="note.icon" :size="note.size" />
      </div>
    </div>

    <div class="max-w-2xl w-full relative z-10 px-4">
      <div
        class="bg-white/80 backdrop-blur-sm rounded-[25px] p-12 text-center animate-card-entrance transition-shadow duration-500"
        :class="
          mode === 'healing'
            ? 'shadow-[0_10px_25px_rgba(47,128,237,0.3)]'
            : 'shadow-[0_10px_25px_rgba(239,108,0,0.3)]'
        "
      >
        <h1
          class="text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500"
          :class="mode === 'healing' ? 'text-blue-500' : 'text-orange-500'"
        >
          {{
            mode === "healing"
              ? "Heal Through Music"
              : "Your Perfect Soundtrack"
          }}
        </h1>

        <p class="text-[var(--main-color)] text-base font-normal mb-10">
          Evidence-based music therapy to support your mental wellness journey.
          Create playlists scientifically designed to improve your mood.
        </p>

        <button
          class="cursor-pointer text-white px-8 py-4 rounded-[10px] text-lg font-semibold flex items-center justify-center space-x-3 mx-auto transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1.5"
          :class="
            mode === 'healing'
              ? 'bg-gradient-to-r from-[var(--main-color)] to-[#2F3FED]'
              : 'bg-gradient-to-r from-[var(--main-color)] to-[#FF6B00]'
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="23"
            viewBox="0 0 24 23"
            fill="none"
          >
            <path
              d="M18.5232 11.5952L13.6875 9.88281L11.9063 5.24508C11.8008 4.97045 11.6099 4.73344 11.3595 4.56603C11.109 4.39861 10.811 4.30885 10.5057 4.30885C10.2003 4.30885 9.90227 4.39861 9.65182 4.56603C9.40136 4.73344 9.21051 4.97045 9.10503 5.24508L7.31253 9.88281L2.47315 11.5898C2.18659 11.6909 1.93927 11.8738 1.76458 12.1138C1.58988 12.3539 1.49622 12.6395 1.49622 12.9321C1.49622 13.2248 1.58988 13.5103 1.76458 13.7504C1.93927 13.9904 2.18659 14.1733 2.47315 14.2744L7.31253 15.9922L9.09378 20.6299C9.19926 20.9045 9.39011 21.1416 9.64056 21.309C9.89102 21.4764 10.189 21.5662 10.4944 21.5662C10.7998 21.5662 11.0978 21.4764 11.3482 21.309C11.5987 21.1416 11.7895 20.9045 11.895 20.6299L13.6875 15.9922L18.5269 14.2852C18.8135 14.1841 19.0608 14.0012 19.2355 13.7612C19.4102 13.5211 19.5038 13.2355 19.5038 12.9429C19.5038 12.6502 19.4102 12.3647 19.2355 12.1246C19.0608 11.8846 18.8135 11.7017 18.5269 11.6006L18.5232 11.5952ZM12.8438 14.7541C12.742 14.7901 12.6495 14.8468 12.5728 14.9203C12.4961 14.9938 12.4369 15.0824 12.3994 15.18L10.5 20.1115L8.6044 15.1836C8.56694 15.085 8.50741 14.9955 8.43 14.9213C8.35258 14.8471 8.25915 14.79 8.15628 14.7541L3.01409 12.9375L8.15628 11.1209C8.25915 11.085 8.35258 11.0279 8.43 10.9537C8.50741 10.8795 8.56694 10.79 8.6044 10.6914L10.5 5.76348L12.3957 10.6914C12.4332 10.789 12.4923 10.8776 12.5691 10.9511C12.6458 11.0246 12.7382 11.0813 12.84 11.1173L17.986 12.9375L12.8438 14.7541ZM13.5 3.59375C13.5 3.40313 13.579 3.22031 13.7197 3.08552C13.8603 2.95073 14.0511 2.875 14.25 2.875H15.75V1.4375C15.75 1.24688 15.829 1.06406 15.9697 0.929267C16.1103 0.794475 16.3011 0.71875 16.5 0.71875C16.6989 0.71875 16.8897 0.794475 17.0304 0.929267C17.171 1.06406 17.25 1.24688 17.25 1.4375V2.875H18.75C18.9489 2.875 19.1397 2.95073 19.2804 3.08552C19.421 3.22031 19.5 3.40313 19.5 3.59375C19.5 3.78437 19.421 3.96719 19.2804 4.10198C19.1397 4.23677 18.9489 4.3125 18.75 4.3125H17.25V5.75C17.25 5.94062 17.171 6.12344 17.0304 6.25823C16.8897 6.39302 16.6989 6.46875 16.5 6.46875C16.3011 6.46875 16.1103 6.39302 15.9697 6.25823C15.829 6.12344 15.75 5.94062 15.75 5.75V4.3125H14.25C14.0511 4.3125 13.8603 4.23677 13.7197 4.10198C13.579 3.96719 13.5 3.78437 13.5 3.59375ZM23.25 7.90625C23.25 8.09687 23.171 8.27969 23.0304 8.41448C22.8897 8.54927 22.6989 8.625 22.5 8.625H21.75V9.34375C21.75 9.53437 21.671 9.71719 21.5304 9.85198C21.3897 9.98677 21.1989 10.0625 21 10.0625C20.8011 10.0625 20.6103 9.98677 20.4697 9.85198C20.329 9.71719 20.25 9.53437 20.25 9.34375V8.625H19.5C19.3011 8.625 19.1103 8.54927 18.9697 8.41448C18.829 8.27969 18.75 8.09687 18.75 7.90625C18.75 7.71563 18.829 7.53281 18.9697 7.39802C19.1103 7.26323 19.3011 7.1875 19.5 7.1875H20.25V6.46875C20.25 6.27813 20.329 6.09531 20.4697 5.96052C20.6103 5.82573 20.8011 5.75 21 5.75C21.1989 5.75 21.3897 5.82573 21.5304 5.96052C21.671 6.09531 21.75 6.27813 21.75 6.46875V7.1875H22.5C22.6989 7.1875 22.8897 7.26323 23.0304 7.39802C23.171 7.53281 23.25 7.71563 23.25 7.90625Z"
              fill="white"
            />
          </svg>
          <span>Create Playlist Now</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useTheme } from "@/composables/useTheme";
const MusicIcon = {
  props: ["size"],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round">
      <path d="M9 18V5l12-2v13"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <circle cx="18" cy="16" r="3"></circle>
    </svg>`,
};

const ToneIcon = {
  props: ["size"],
  template: `
    <svg :width="size" :height="size" viewBox="0 0 32 32" fill="currentColor">
      <path d="M10.5,27c2.5,0,4.5-1.5,4.5-3.5c0-0.1,0-0.2,0-0.3c0-0.1,0-0.1,0-0.2v-9.5l9-5.7v7.8c-0.7-0.4-1.6-0.6-2.5-0.6C19,15,17,16.5,17,18.5s2,3.5,4.5,3.5s4.5-1.5,4.5-3.5c0-0.1,0-0.2,0-0.3c0-0.1,0-0.1,0-0.2V6c0-0.4-0.2-0.7-0.5-0.9c-0.3-0.2-0.7-0.2-1,0l-11,7C13.2,12.3,13,12.7,13,13v7.6c-0.7-0.4-1.6-0.6-2.5-0.6C8,20,6,21.5,6,23.5S8,27,10.5,27z"/>
    </svg>`,
};

const NoteDoubleIcon = {
  props: ["size"],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round">
      <path d="M9 18V5l12-2v13"></path>
      <circle cx="6" cy="18" r="3"></circle>
    </svg>`,
};

export default {
  name: "HomePage",
  components: {
    MusicIcon,
    ToneIcon,
    NoteDoubleIcon,
  },
  setup() {
    const { mode } = useTheme();
    return { mode };
  },
  data() {
    return {
      musicNotes: [],
      floatingStars: [],
    };
  },
  mounted() {
    this.generateMusicNotes();
    this.generateFloatingStars();
  },
  methods: {
    generateMusicNotes() {
      const icons = [MusicIcon, ToneIcon, NoteDoubleIcon];
      const animations = [
        "animate-float-slow",
        "animate-float-medium",
        "animate-float-fast",
      ];
      const notes = [];
      const totalNotes = 25;

      const gridSize = 5;
      const getGridPosition = (index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        return { row, col };
      };

      for (let i = 0; i < totalNotes; i++) {
        const { row, col } = getGridPosition(i);
        const left = `${(col / gridSize) * 80 + 10 + Math.random() * 5}%`;
        const top = `${(row / gridSize) * 80 + 10 + Math.random() * 5}%`;

        const duration = 6 + Math.random() * 4;
        const icon = icons[Math.floor(Math.random() * icons.length)];
        const animation = animations[Math.floor(Math.random() * animations.length)];

        notes.push({
          id: i,
          left,
          top,
          delay: `${Math.random() * 5}s`,
          duration: `${duration}s`,
          size: 16 + Math.random() * 24,
          icon,
          animation,
        });
      }

      this.musicNotes = notes;
    },

    generateFloatingStars() {
      const stars = [];
      const totalStars = 8; // Jumlah bintang melayang

      for (let i = 0; i < totalStars; i++) {
        const left = `${10 + Math.random() * 80}%`;
        const top = `${10 + Math.random() * 80}%`;
        
        const duration = 8 + Math.random() * 8; // Lebih lambat dari notes
        const animation = `animate-float-${['slow', 'medium', 'fast'][Math.floor(Math.random() * 3)]}`;

        stars.push({
          id: i,
          left,
          top,
          delay: `${Math.random() * 10}s`,
          duration: `${duration}s`,
          size: 20 + Math.random() * 30, // Ukuran bintang lebih bervariasi
          animation,
        });
      }

      this.floatingStars = stars;
    },
  },
};
</script>

<style scoped>
/* Animasi yang sudah ada */
@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
    opacity: 0.7;
  }
  25% {
    transform: translateY(-25px) translateX(15px) rotate(90deg);
    opacity: 1;
  }
  50% {
    transform: translateY(-15px) translateX(-10px) rotate(180deg);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-20px) translateX(10px) rotate(270deg);
    opacity: 0.9;
  }
}

@keyframes float-medium {
  0%,
  100% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
    opacity: 0.6;
  }
  33% {
    transform: translateY(-20px) translateX(12px) rotate(120deg);
    opacity: 1;
  }
  66% {
    transform: translateY(-12px) translateX(-12px) rotate(240deg);
    opacity: 0.8;
  }
}

@keyframes float-fast {
  0%,
  100% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-15px) translateX(8px) rotate(180deg);
    opacity: 1;
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

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 5s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 3s ease-in-out infinite;
}

.animate-card-entrance {
  animation: card-entrance 0.8s ease-out;
}
</style>