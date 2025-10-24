<template>
  <div
    class="flex items-center space-x-4 cursor-pointer select-none"
    @click="toggleTheme"
  >
    <div
      class="relative w-16 h-8 rounded-full transition-colors duration-300 hover:shadow-md"
      :class="mode === 'healing' ? 'bg-[var(--bg)]' : 'bg-[var(--bg)]'"
    >
      <div
        class="absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-300"
        :style="{
          transform: mode === 'healing' ? 'translateX(0px)' : 'translateX(32px)',
        }"
      >
        <svg
          v-if="mode === 'healing'"
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 text-[var(--main-color)]"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 text-[var(--main-color)]"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          viewBox="0 0 24 24"
        >
          <path
            d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
          />
        </svg>
      </div>
    </div>
    <div
      class="hidden sm:block text-xs font-medium transition-colors duration-300 text-[var(--main-color)]"
    >
      {{ mode.charAt(0).toUpperCase() + mode.slice(1) }}
    </div>
  </div>
</template>

<script setup>
import { useTheme } from "@/composables/useTheme";
const { mode, toggleTheme } = useTheme();
</script>
